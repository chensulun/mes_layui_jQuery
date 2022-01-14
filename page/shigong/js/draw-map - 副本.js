/**
 * 新建x,y坐标对象
**/
window.mapToObjectXY = (function () {
    function mapxy(x, y) {
        this.x = x;
        this.y = y;
    }
    mapxy.prototype.toString = function () {
        return this.x + "," + this.y
    }

    return mapxy;
})()

/**
 * GPS Point 三点
 * 
 *      p1
 *   *  |
 * p    |  angle
 *   *  |    
 *      p2
 *     
 * */
window.GPSXYPoint = (function () {
    return function () {
        this.p = new mapToObjectXY();
        this.angle = 0;
        this.p1 = new mapToObjectXY();
        this.p2 = new mapToObjectXY();
    }
})()


/**
 * 初始化canvas
 * */
 window.initCanvas=function(id) {
    var canvas = document.getElementById(id); //画布对象
    var canvasContext = canvas.getContext('2d');//画布显示二维图片
    canvasContext.imageSmoothingEnabled = false; //图像不平滑
    canvasContext.globalCompositeOperation = "source-over"; //图片合成方式
    canvasContext.globalAlpha = 1;
    canvasContext.lineJoin = "round";//线段链接属性为圆

    return canvasContext;
}

/**
 * 边界，最大，最小 坐标 对象(minx,miny,maxx,maxy)
 * **/
var minMaxLimitInfo = (function () {
    function updateMinMax() {
        this.minx = 0;
        this.miny = 0;
        this.maxx = 0;
        this.maxy = 0;
    }

    updateMinMax.prototype.updateBoxFromPoint = function (maxMinXYInfo) {
        if (this.minx > maxMinXYInfo.x) { this.minx = maxMinXYInfo.x };
        if (this.miny > maxMinXYInfo.y) { this.miny = maxMinXYInfo.y };
        if (this.maxx < maxMinXYInfo.x) { this.maxx = maxMinXYInfo.x };
        if (this.maxy < maxMinXYInfo.y) { this.maxy = maxMinXYInfo.y };
    };
    updateMinMax.prototype.updateBoxFromBox = function (boundLimitMinMaxInfo) {
        if (boundLimitMinMaxInfo.minx < this.minx) { this.minx = boundLimitMinMaxInfo.minx };
        if (boundLimitMinMaxInfo.miny < this.miny) { this.miny = boundLimitMinMaxInfo.miny };
        if (boundLimitMinMaxInfo.maxx > this.maxx) { this.maxx = boundLimitMinMaxInfo.maxx };
        if (boundLimitMinMaxInfo.maxy > this.maxy) { this.maxy = boundLimitMinMaxInfo.maxy };
    }

    return updateMinMax;
})()

window.draw = (function () {

    function DrawCarByGPS(clientWidth, clientHeight, config) {
        this.totalWidth = clientWidth;
        this.totalHeight = clientHeight;

        this.config(config);

        this.center = new mapToObjectXY(0, 0); //中心位置
        this.leftTop = new mapToObjectXY(0, 0);//移动位坐标

        //定义像素大小与zoom,画布'宽高'的关系
        this.pixelSize = 0.06 //默认逻辑上缩放比例0.16
        this.zoomW = this.pixelSize * this.totalWidth;
        this.zoomY = this.pixelSize * this.totalHeight;
        this.zoomRateMin = 0.01; //缩放最小比例
        this.zoomRateMax = 200; //缩放最达比例

        this.gpsDistMin = .2; //最小距离
        this.gpsDistMax = 50; //最大距离

        //是否重绘-默认false
        this.needDraw = true;
        //是否绘制撤了-默认true
        this.needDrawCar = true;
        //是否初始化- 默认 false
        this.isInit = true;
        //是否拖拽- 默认 false
        this.isDrag = false;
        //是否正在刷新
        this.isBusy = false;


        //公路画布
        this.canvasBottom = initCanvas('canvasBottom');
        this.canvasMain = initCanvas('canvasMain');
        this.canvasCalc = initCanvas('canvasCalc')

        this.timesColor = "rgba(255,0,0,0.05)";
        this.timesColorList = [];

        this.boundingBox = new minMaxLimitInfo();//minx,miny,maxx,maxy

        this.timesColorInit();

        var _self = this;
        // this.drawTimer = setInterval(function () {
        //     _self.refresh(true)
        //  }, 500);

        this.resetDraw(true);
        this.isInit = true;

    }


    DrawCarByGPS.prototype.setClientWH = function (wh) {
        this.totalWidth = wh.W;
        this.totalHeight = wh.H;
    }

    DrawCarByGPS.prototype.setCanvasBottomContxt = function (ctxt) {
        this.canvasBottom = ctxt;
    }
    DrawCarByGPS.prototype.setCanvasCanvasMainContxt = function (ctxt) {
        this.canvasMain = ctxt;
    }
    DrawCarByGPS.prototype.setCanvasCalcContxt = function (ctxt) {
        this.canvasCalc = ctxt;
    }
    DrawCarByGPS.prototype.getClientHW = function () {
        return {
            clientWidth: this.totalWidth,
            clientHeight: this.totalHeight
        }
    }

    DrawCarByGPS.prototype.config = function (config) {
        for (var c in config) {
            this[c] = config[c]
        }
    }

    DrawCarByGPS.prototype.WorldtoMap = function (objXY) {
        var newObjXY = new mapToObjectXY();

        newObjXY.x = (objXY.y - this.leftTop.y) / this.pixelSize;
        newObjXY.y = (this.leftTop.x - objXY.x) / this.pixelSize;


        return newObjXY;
    }

    DrawCarByGPS.prototype.MapToWorld = function (objXY) {
        return new mapToObjectXY(this.leftTop.x - objXY.y * this.pixelSize, this.leftTop.y + objXY.x * this.pixelSize)
    }

    DrawCarByGPS.prototype.getLeftTop = function () {
        return this.leftTop
    }
    DrawCarByGPS.prototype.getPixelSize = function () {
        return this.pixelSize
    }
    //放大或者缩小Zoom，主要同时改变pixelSize及边界值-重新渲染
    DrawCarByGPS.prototype.setZoom = function (multipleZoom) {
        var newZoomw = multipleZoom;
        this.zoomW = newZoomw

        var pixelSize = this.zoomW / this.totalWidth;
        console.log("[setZoom] pixelSize 改变:" + pixelSize),
        console.log("[setZoom] 最新 zoomW 宽度:" + this.zoomW);


        var t = until.round(100 * pixelSize);
        if(t>10){
            t = 5 * Math.floor(t / 5)
        }
        var r = t / pixelSize;
        if(Number(r)<6){
            console.warn('最小6米');
            return;
        }else{
            this.pixelSize = pixelSize;
            this.changeBoundingBox()
        }

    }
    //放大或者缩小Zoom，主要同时改变pixelSize及边界值-重新渲染
    DrawCarByGPS.prototype.changeBoundingBox = function (callback) {
        var yzoom = this.totalHeight * this.pixelSize;
        var xzoom = this.totalWidth * this.pixelSize;

        var miny = this.center.y - .5 * xzoom; //y
        var maxx = this.center.x + .5 * yzoom; //x

        var maxy = this.center.y + .5 * xzoom;
        var minx = this.center.x - .5 * yzoom;

        this.leftTop = new mapToObjectXY(maxx, miny);
        console.log("[changeBoundingBox] leftTop 改变:" + JSON.stringify(this.leftTop));

        this.boundingBox.minx = minx;
        this.boundingBox.miny = miny;
        this.boundingBox.maxx = maxx;
        this.boundingBox.maxy = maxy;

        console.log("[changeBoundingBox] 最新边界 改变:" + JSON.stringify(this.boundingBox));

        this.resetDraw(true)

        callback && callback();

    }

    /**
     * 重绘页面数据
     * 
     * isRest 是否重绘
     **/
    DrawCarByGPS.prototype.resetDraw = function (isRest) {

        if (isRest === undefined) {
            isRest = false;
        }
        this.needDraw = true;
        if (isRest) {
            this.refresh()
        }

    }

    DrawCarByGPS.prototype.resetGpsDraw = function () {
        this.needDraw = true;
        this.needDrawCar = false;
    }

    DrawCarByGPS.prototype.refresh = function () {
        //注意 拖动的时候，停止重绘 !this.isDrag && this.needDraw
        if (!this.isDrag && this.needDraw) {
            if (this.isBusy) {
                console.log("绘制太忙了");
            }
            else {
                for (var m in T.machineDic) {

                    this.isBusy = true;
                    this.needDraw = false;
                    this.needDrawCar = true;
                    console.log("清空页面");
                    this.clear(this.canvasBottom);
                    this.clear(this.canvasMain);
                    this.clear(this.canvasCalc);

                    console.log("开始画图-绘制图像");

                    var machine = T.machineDic[m];

                    if (T.monitoringCar == machine.id) {
                        var gpsPoint = machine.gpsPoint || null;
                        if (gpsPoint != null) {
                            this.inBoundingBox(this.boundingBox, gpsPoint.p);
                            this.setCenter(gpsPoint.p);
                        }
                        break
                    }
                }

                if(Object.keys(T.machineDic).length>0){
                    this.drawData();
                    this.drawRule();
                    console.log("完成画图");
                    this.isBusy = false;
                }

            }
        }
    }

    //绘制所有数据-手动清理gpsPoint（车运动轨迹四方形），绘制时重新生产，避免越界
    DrawCarByGPS.prototype.drawData = function () {
        // this.drawRoadBackByRoadDataList(T.roadDataList)
        // this.drawRoadCenterLineByRoadDataList(T.roadDataList);
        for (var e in T.machineDic) {
            T.machineDic[e].gpsPoint = null;
        }
        //车运动轨迹四方形
        this.drawCarDataNew();

        if (this.needDrawCar) {
            this.drawCar()
        }
    }
    /**
     * 绘制 横竖 规格线
    */
    DrawCarByGPS.prototype.drawRule = function () {
        var e = this.getPixelSize()
            , t = until.round(100 * e);
        t > 10 && (t = 5 * Math.floor(t / 5));
        var o = "rgba(100,100,100,0.3)"
            , r = t / e;
        $("#divRule span").html(t + "米"),
            $("#divRule").css("width", r + "px");
        var n = this.totalWidth / 2
            , i = this.totalHeight / 2;
        this.drawLine(this.canvasMain, new mapToObjectXY(n, 0), new mapToObjectXY(n, this.totalHeight), o, 1),
            this.drawLine(this.canvasMain, new mapToObjectXY(0, i), new mapToObjectXY(this.totalWidth, i), o, 1);
        for (var s = 1; ; s++) {
            var a = n - r * s;
            this.drawLine(this.canvasMain, new mapToObjectXY(a, 0), new mapToObjectXY(a, this.totalHeight), o, 1);
            var g = n + r * s;
            if (this.drawLine(this.canvasMain, new mapToObjectXY(g, 0), new mapToObjectXY(g, this.totalHeight), o, 1),
                a < 0)
                break
        }
        for (s = 1; ; s++) {
            var l = i - r * s;
            this.drawLine(this.canvasMain, new mapToObjectXY(0, l), new mapToObjectXY(this.totalWidth, l), o, 1);
            var u = i + r * s;
            if (this.drawLine(this.canvasMain, new mapToObjectXY(0, u), new mapToObjectXY(this.totalWidth, u), o, 1),
                l < 0)
                break
        }
    }

    //绘制线条
    DrawCarByGPS.prototype.drawLine = function (e, t, o, r, n) {
        e.strokeStyle = r,
            e.lineWidth = n,
            e.beginPath(),
            e.moveTo(t.x, t.y),
            e.lineTo(o.x, o.y),
            e.stroke()
    }

    /**
     * 重设中心-->改变 移动坐标 与 边界  -->需要重绘
     * mapToObjectXY 坐标对象
    */
    DrawCarByGPS.prototype.setCenter = function (mapToObjectXY) {

        this.center = mapToObjectXY;

        this.changeBoundingBox();

    }

    DrawCarByGPS.prototype.timesColorInit = function () {
        var e = this.canvasCalc;
        this.clear(this.canvasCalc, "#fff");
        var t = new mapToObjectXY(0, 0);
        e.beginPath(),
            e.fillStyle = this.timesColor;
        for (var o = 0; o < 100; o++)
            e.fillRect(t.x + o, t.y, 100 - o, 1);
        var r = e.getImageData(0, 0, 100, 1)
            , n = [];
        for (o = 0; o < r.data.length; o += 4) {
            n[r.data[o + 1]] = o / 4 + 1
        }
        n[255] = 0;
        var i = 100;
        for (o = 0; o < 256; o++)
            void 0 !== n[o] ? i = n[o] : n[o] = i;
        this.timesColorList = n,
            this.clear(this.canvasCalc)
    }

    DrawCarByGPS.prototype.getZoom = function () {
        return this.zoomW
    }

    /**
     * 检查是边界内容
     * boundingObjXY（maxx/y，minx/y） 边界   objXY 
    */
    DrawCarByGPS.prototype.inBoundingBox = function (boundingObjXY, objXY) {

        return objXY.x > boundingObjXY.minx && objXY.x < boundingObjXY.maxx && objXY.y > boundingObjXY.miny && objXY.y < boundingObjXY.maxy

    }


    // index 1 过滤文案
    DrawCarByGPS.prototype.filterText = function (index) {
        var isFilter = true;
        var pix = this.getPixelSize();

        if (pix > 1) {
            isFilter = index % 32 == 0
        } else {
            if (pix > 0.4) {
                isFilter = index % 16 == 0
            } else {
                if (pix > 0.2) {
                    isFilter = index % 8 == 0
                }
            }
        }

        return isFilter
    }

    //画文本
    DrawCarByGPS.prototype.drawTextCenter = function (e, t, o, r, n, i, s) {
        e.font = r,
            e.fillStyle = n;
        var a = e.measureText(t).width;
        o.x -= a / 2,
            0 != i && (e.lineWidth = i,
                e.strokeStyle = s,
                e.strokeText(t, o.x, o.y)),
            e.fillText(t, o.x, o.y)
    }


    DrawCarByGPS.prototype.drawText = function (e, t, o, r, n, i, s) {
        e.font = r,
            e.fillStyle = n,
            0 != i && (e.lineWidth = i,
                e.strokeStyle = s,
                e.strokeText(t, o.x, o.y)),
            e.fillText(t, o.x, o.y)
    }

    /**
     * 
     * 依据数值获取颜色色系
     * dataIndex 0 温度 1 速度 3 遍速 4 震动 n.data[T.dataIndex]
     * 
     * */
    DrawCarByGPS.prototype.getCarDataColor2 = function (data,dataIndex) {
        //"temperature": "19.62566", "vibrate_max": "0.0673828125", "speed": "1.071"
        if(dataIndex==0){
            //温度大于20为红色，小于20是 绿色
           if(data[dataIndex]>20){
               return "#f33535"; //红色
           }else{
               return "#3df13f"; //绿色
           }
        }else{
             //速度  大于 10 是红色 -> 0.5 绿色 
             if(dataIndex==1){
                if(data[dataIndex]>10){
                    return "#ef562d"; //浅红色
                }else{
                    return "#3ce2c1"; //浅绿色
                }
             }else{
                 //遍数 
                if(dataIndex==2){
                    //0 第一遍
                    if(data[dataIndex]==0){
                        return "#75e2f1"; //天蓝色
                    }else{
                        return "#5bff00"; //深绿色
                    }
                }else{
                    //震动
                    if(Number(data[dataIndex])<2){
                        return "#a675e0"; //浅紫色
                    }else{
                        return "#6e09e6"; //很紫色
                    }
                }
             }
        }
        
    }

    /**
     * 绘制公路
     * roadDataList 坐标对象
    */
    DrawCarByGPS.prototype.drawRoadBackByRoadDataList = function (roadDataList) {

        for (var i = 0, count = roadDataList.length; i < count; i++) {
            var roadInfo = roadDataList[i];
            var centerPtList = roadInfo.centerPtList;
            var leftPtList = roadInfo.leftPtList;
            var rightPtList = roadInfo.rightPtList;

            //临时变量
            var leftRoads = [];
            var rightRoads = [];

            //新建路径
            this.canvasBottom.beginPath();

            if (rightPtList.length > 0) {
                var fristXY = rightPtList[0];
                var frixObjXY = new mapToObjectXY(fristXY.x, fristXY.y);
                var fristWorldXY = this.WorldtoMap(frixObjXY);
                this.canvasBottom.moveTo(fristWorldXY.x, fristWorldXY.y);
                for (var i = 1, rightcount = rightPtList.length; i < rightcount; i++) {
                    var tempObjXY = rightPtList[i];
                    var objXY = new mapToObjectXY(tempObjXY.x, tempObjXY.y);
                    var worldXY = this.WorldtoMap(objXY);
                    this.canvasBottom.lineTo(worldXY.x, worldXY.y);
                    if (this.filterText(i) && this.inBoundingBox(this.boundingBox, tempObjXY)) {
                        rightRoads.push(worldXY)
                    }
                }

                for (var a = leftPtList.length - 1; a >= 0; a--) {
                    var tempObjXY = leftPtList[a];
                    var objXY = new mapToObjectXY(tempObjXY.x, tempObjXY.y);
                    var worldXY = this.WorldtoMap(objXY);
                    this.canvasBottom.lineTo(worldXY.x, worldXY.y);
                    if (this.filterText(a) && this.inBoundingBox(this.boundingBox, tempObjXY)) {
                        leftRoads.push(worldXY)
                    }
                }
                this.canvasBottom.fillStyle = "#eee";
                this.canvasBottom.closePath();
                this.canvasBottom.fill()

                for (var s = 0; s < rightRoads.length; s++) {
                    var rightRoaddata = rightRoads[s];
                    this.drawTextCenter(this.canvasBottom, roadInfo.rightName, rightRoaddata, "14px 黑体", "black", 5, "#fff")
                }
                for (var a = leftRoads.length - 1; a >= 0; a--) {
                    var leftRoaddata = leftRoads[a];
                    var width = this.canvasBottom.measureText(roadInfo.leftName).width;
                    leftRoaddata.x = leftRoaddata.x - width / 2,
                        this.drawTextCenter(this.canvasBottom, roadInfo.leftName, leftRoaddata, "14px 黑体", "black", 5, "#fff")
                }
            }
        }


    }

    DrawCarByGPS.prototype.getMiddleTimes = function (e, t, o) {
        var r = this.getTimes(e, t, o - 1);
        if (r == this.getTimes(e, t, o + 1))
            return r;
        var n = this.getTimes(e, t - 1, o);
        if (n == this.getTimes(e, t + 1, o))
            return n;
        var i = this.getTimes(e, t - 1, o - 1);
        if (i == this.getTimes(e, t + 1, o + 1))
            return i;
        var s = this.getTimes(e, t + 1, o - 1);
        return s == this.getTimes(e, t - 1, o + 1) ? s : this.getTimes(e, t, o)
    }

    DrawCarByGPS.prototype.getTimes = function (e, t, o) {
        var r = 4 * (o * e.width + t);
        return this.timesColorList[e.data[r + 1]]
    }

    /**
     * 绘制公路中线
     * roadDataList 坐标对象
    */
    DrawCarByGPS.prototype.drawRoadCenterLineByRoadDataList = function (roadDataList) {

        for (var i = 0, count = roadDataList.length; i < count; i++) {
            var roadInfo = roadDataList[i];
            var centerPtList = roadInfo.centerPtList;

            if (centerPtList.length > 0) {
                //新建路径
                this.canvasBottom.beginPath();
                var centerPt = centerPtList[0];
                var fristXY = centerPt.pt;
                var fristText = centerPt.k;
                var frixObjXY = new mapToObjectXY(fristXY.x, fristXY.y);
                var fristWorldXY = this.WorldtoMap(frixObjXY);
                this.canvasBottom.moveTo(fristWorldXY.x, fristWorldXY.y);
                this.drawTextCenter(this.canvasMain, fristText, frixObjXY, "14px 黑体", "black", 5, "#fff");
                for (var i = 1, centerCount = centerPtList.length; i < centerCount; i++) {
                    var tempPt = centerPtList[i];
                    var tempObjXY = tempPt.pt;
                    var tempText = tempPt.k;
                    var objXY = new mapToObjectXY(tempObjXY.x, tempObjXY.y);
                    var worldXY = this.WorldtoMap(objXY);
                    this.canvasBottom.lineTo(worldXY.x, worldXY.y);
                    if (this.filterText(i) && this.inBoundingBox(this.boundingBox, tempObjXY)) {
                        this.drawTextCenter(this.canvasMain, tempText, worldXY, "14px 黑体", "black", 5, "#fff")
                    }
                }
                this.canvasBottom.lineWidth = 2,
                    this.canvasBottom.strokeStyle = "black",
                    this.canvasBottom.stroke()
            }
        }


    }

    /**
     * 清除canvas 并填充指定颜色
     * @param {*} canvas  上下对象
     * @param {*} color 填充颜色
     */
    DrawCarByGPS.prototype.clear = function (canvas, color) {
        if (canvas) {
            canvas.clearRect(0, 0, this.totalWidth, this.totalHeight);
            if (color) {
                canvas.fillStyle = color;
                canvas.fillRect(0, 0, this.totalWidth, this.totalHeight)
            }
        }
    }


    DrawCarByGPS.prototype.drawGpsRectNew = function (e, t, o, r, n) {
        T.drawCount++;
        var i = new minMaxLimitInfo;
        if (until.intersect(t.p1, o.p1, t.p2, o.p2)) {
            var s = t.p1;
            t.p1 = t.p2,
                t.p2 = s,
                s = null
        }
        var a = until.getPointDist(t.p1, o.p2);
        //a > .01 && console.log("len :" + a),
        // e.fillStyle = "#333",
        //     e.strokeStyle = "#333",

            e.fillStyle = r,
            e.strokeStyle = r,

            e.beginPath();
        var gxy = new mapToObjectXY(t.p1.x, t.p1.y);
        var g = this.WorldtoMap(gxy);
        e.moveTo(g.x, g.y),
            i.minx = i.maxx = g.x,
            i.miny = i.maxy = g.y;
        var lxy = new mapToObjectXY(t.p2.x, t.p2.y);
        var l = this.WorldtoMap(lxy);
        e.lineTo(l.x, l.y),
            i.updateBoxFromPoint(l);
        var cxy = new mapToObjectXY(o.p2.x, o.p2.y);
        var c = this.WorldtoMap(cxy);
        e.lineTo(c.x, c.y),
            i.updateBoxFromPoint(c);
        var uxy = new mapToObjectXY(o.p1.x, o.p1.y);
        var u = this.WorldtoMap(uxy);
        return e.lineTo(u.x, u.y),
            i.updateBoxFromPoint(u),
            e.closePath(),
            e.fill(),
            n && e.stroke(),
            i
    }

    DrawCarByGPS.prototype.drawCarDataNew = function () {
        //3 == T.drawType && this.clear(this.canvasCalc, "#fff");
        this.clear(this.canvasCalc, "#fff");
        var e = !0
            , t = null;
        T.drawCount = 0;
        for (var o = 0, r = T.carGpsList; o < r.length; o++) {
            var n = r[o]
                , i = T.machineDic[n.id];
            if (void 0 !== i) {
                i.n = n.n,
                    i.e = n.e;
                var s = i.gpsPoint
                    , a = new mapToObjectXY(n.n, n.e)
                    , g = null;
                if (null != s) {
                    var l = i.width / 2;
                    if (s.p1.x == s.p2.x && s.p1.y == s.p2.y) {
                        var c = until.caculSidePoint(a, s.p, l, l);
                        s.p1 = c.p1,
                            s.p2 = c.p2
                    }
                    g = until.caculSidePoint(s.p, a, l, l);
                    var u = until.getPointDist(s.p, g.p);
                    console.log('移动距离:'+u);
                    if (u>.01)
                        if (false)
                            i.gpsPoint = g;
                        else {
                            var p = i.color;
                            n.data && n.data.length > T.dataIndex && (p = this.getCarDataColor2(n.data,T.dataIndex),
                                i.temp = n.data[0],
                                i.speed = n.data[1]);
                            if (i.show)
                                if (until.intersectBox(this.boundingBox, s.p1, s.p2, g.p1, g.p2)) {
                                    if (0 == T.dataIndex)//dataIndex=0 温度
                                        this.drawGpsRectNew(this.canvasBottom, s, g, p, !0);
                                    else if (2 == T.dataIndex){
                                        var y = this.drawGpsRectNew(this.canvasCalc, s, g, this.timesColor, !1);
                                        // e ? (e = !1,
                                        //     t = y) : t.updateBoxFromBox(y)
                                    }else{
                                        this.drawGpsRectNew(this.canvasMain, s, g, p, !0);
                                    }   
                                    i.gpsPoint = g
                                } else
                                    i.gpsPoint = g;
                            else
                                i.gpsPoint = g
                        }
                } else {
                    var b = new GPSXYPoint;
                    b.p = a,
                        i.gpsPoint = b
                }
            }
        }
        console.log("绘制四边形个数：" + T.drawCount);
       
        if (T.dataIndex==2) {

                try{
            var _ = new mapToObjectXY(0, 0)
                , S = this.totalWidth
                , v = this.totalHeight;
            t && (t.minx > 0 && (_.x = t.minx),
                t.miny > 0 && (_.y = t.miny),
                t.maxx < S && (S = t.maxx),
                t.maxy < v && (v = t.maxy));
            var E = Math.ceil(S - _.x)
                , w = Math.ceil(v - _.y)
                , A = this.canvasMain.getImageData(_.x, _.y, E, w)
                , M = this.canvasCalc.getImageData(_.x, _.y, E, w);
            if (0 == this.timesColorList.length)
                A = M;
            else
                for (var D = 1; D < E - 1; D++)
                    for (var x = 1; x < w - 1; x++) {
                        var C = 4 * (x * E + D);
                        if (255 != M.data[C + 1]) {
                            var k, I, O, R = this.getMiddleTimes(M, D, x);
                            R >= T.timesColorList.length && (R = T.timesColorList.length - 1),
                                k = T.timesColorList[R].r,
                                I = T.timesColorList[R].g,
                                O = T.timesColorList[R].b,
                                A.data[C] = k,
                                A.data[C + 1] = I,
                                A.data[C + 2] = O,
                                A.data[C + 3] = 255
                        }
                    }
            this.canvasMain.putImageData(A, _.x, _.y),
                A = null,
                M = null
                }catch(err){
                    
                }


        }
    }

    /**
     * 绘制设备
     */
    DrawCarByGPS.prototype.drawCar = function () {
        /**
         * 
         * @param {*} machine 设备
         * @param {*} draw  画布对象
         */
        var renderMachine = function (machine, draw) {
            if (machine.show) {
                if (T.monitoringCar && T.monitoringCar == machine.id && machine.lon) {
                    console.log("车辆坐标：" + machine.lon.toFixed(2) + "," + machine.lat.toFixed(2));
                }

                var o = machine.gpsPoint || null;

                if (null == o) {
                    o = new GPSXYPoint();
                    o.p = new mapToObjectXY(machine.lon, machine.lat)
                }

                if (null != o) {
                    var rxy = new mapToObjectXY(o.p.x, o.p.y);
                    var r = draw.WorldtoMap(rxy);

                    draw.canvasMain.save();
                    var n = machine.width / draw.getPixelSize();
                    var i = n * machine.image.height / machine.image.width;
                    //var i = n * 50 / 20;
                    draw.canvasMain.translate(r.x, r.y);
                    draw.canvasMain.rotate(o.angle - Math.PI);
                    draw.canvasMain.drawImage(machine.image, -n / 2, 0, n, i);
                    draw.canvasMain.restore();

                    var s = T.monitoringCar === machine.id;
                    var a = "13px 黑体";
                    draw.canvasMain.font = a;
                    var g = draw.canvasMain.measureText(machine.name);
                    var l = new mapToObjectXY(r.x - g.width / 2, r.y - g.actualBoundingBoxAscent - 3);
                    draw.drawText(draw.canvasMain, machine.name, l, a, s ? "#FAAD15" : "black", 4, "#fff");
                    if (machine.speed) {
                        var u = machine.speed;
                        var p = "Km/h "
                        var d = until.round(u, 1) + p;
                        var y = "black"
                        var _ = (g = draw.canvasMain.measureText(d), new mapToObjectXY(r.x - g.width, r.y));
                        draw.drawText(draw.canvasMain, d, _, a, y, 4, "#fff")
                        // if (T.mapTechnics[machine.dataType]) {
                        //     var y = (v = T.mapTechnics[machine.dataType][2].range)[0] <= u && u <= v[1] ? "black" : "#FAAD15";
                        //     var _ = (g = draw.canvasMain.measureText(d), new mapToObjectXY(r.x - g.width, r.y));
                        //     draw.drawText(draw.canvasMain, d, _, a, y, 4, "#fff")
                        // }
                    }
                    if (machine.temp) {
                        var S = machine.temp;
                        var d = until.round(S, 1) + "°C";
                        var _ = new mapToObjectXY(r.x + 5, r.y);
                        var y = "black"
                        draw.drawText(draw.canvasMain, d, _, a, y, 4, "#fff")
                        // if (T.mapTechnics[machine.dataType]) {
                        //     var v;
                        //     y = (v = T.mapTechnics[machine.dataType][1].range)[0] <= S && S <= v[1] ? "black" : "#FAAD15";
                        //     draw.drawText(draw.canvasMain, d, _, a, y, 4, "#fff")
                        // }
                    }
                }
            }


        };

        //读取所有设备
        for (var machine in T.machineDic) {
            renderMachine(T.machineDic[machine], this)
        }

    }

    return DrawCarByGPS;

})()
// 设备  -souce map _
// lon 经度
// lat 纬度
var Machine = (function () {
    return function () {
        this.id = ""; //设备ID
        this.width = 2.3; //设备宽度
        this.type = 0; //设备类型
        this.name = ""; //设备名称
        this.isPaver = true; //是否铺路 isPaver?"m/min" :"Km/h" ()
        this.show = true; //是否显示
        this.isDraw = true; //是否绘制
        this.lon = 0; //经度
        this.lat = 0; //纬度
        this.image = null; //设备图片
    }
})()

// 颜色绘制 souce map  d
var colorRGBA = (function () {
    /**
     * 
     * @param {*} r 红色（R）0 到 255 间的整数，代表颜色中的红色成分
     * @param {*} g 绿色（G）0 到 255 间的整数，代表颜色中的绿色成分
     * @param {*} b 蓝色（B）0 到 255 间的整数，代表颜色中的蓝色成分
     * @param {*} a 透明度（A）取值 0~1 之间， 代表透明度
     */
    function crgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a === undefined ? 1 : a;

    }

    crgba.prototype.toString = function () {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }

    return crgba;
})()

//区间颜色变化  souce map S
var rangeColor = (function () {
    /**
     * min
     * max
     * color type--> colorRGBA
     * colorMin type-->colorRGBA
     */
    return function (min, max, color, colorMin) {
        this.min = min;
        this.max = max;
        this.color = color;
        this.colorMin = colorMin;
    }
})()


window.until = {

    round: function (e, t) {
        if (void 0 === t && (t = 0),
            0 == t)
            return Math.round(e);
        var o = Math.pow(10, t);
        return e *= o,
            e = Math.round(e) / o
    },
    /**
     * 根据宽度半径与原点坐标 计算 三坐标，让设备转弯时绘制四边形在范围内
     * @param {*} e lonlatMapToXY
     * @param {*} t gpsPoint.p  原点坐标
     * @param {*} o machineRadius 宽度半径
     * @param {*} r machineRadius 宽度半径
     */
    caculSidePoint: function (e, t, o, r) {
        var n = new GPSXYPoint();
        n.p = t,
            n.angle = Math.atan((t.y - e.y) / (t.x - e.x));
        var i = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
        if (0 == i)
            return n;
        var s = o * (t.y - e.y) / i
            , a = o * (t.x - e.x) / i
            , g = new mapToObjectXY(t.x + s, t.y - a);
        s = r * (t.y - e.y) / i,
            a = r * (t.x - e.x) / i;
        var l = new mapToObjectXY(t.x - s, t.y + a);
        return n.p1 = g,
            n.p2 = l,
            n
    },

    /**
     * 计算两坐标距离
     * @param {*} e 原坐标
     * @param {*} t 新坐标
     */
    getPointDist: function (e, t) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    },

    //this.boundingBox, gpsPoint.p1, gpsPoint.p2, newGpsPoint.p1, newGpsPoint.p2
    inBoundingBox: function (e, t) {
        return t.x > e.minx && t.x < e.maxx && t.y > e.miny && t.y < e.maxy
    }
    ,

    intersectBox: function (t, o, r, n, i) {
        return  true || this.inBoundingBox(t, o) || this.inBoundingBox(t, r) || this.inBoundingBox(t, n) || this.inBoundingBox(t, i)
    },
    /**
     * 
     * @param {*} t 最大最小坐标管控
     * @param {*} o 原坐标 p1 点--具体参看三点坐标 gpsPoint
     * @param {*} r 原坐标 p2 点
     * @param {*} n 新坐标 p2 点
     * @param {*} i 新坐标 p2 点
     */
    isPaverintersectBox: function (t, o, r, n, i) {
        return true || this.inBoundingBox(t, o) || this.inBoundingBox(t, r) || this.inBoundingBox(t, n) || this.inBoundingBox(t, i)
    },
    determinant: function (e, t, o, r) {
        return e * o - t * r
    },
    /**
     * t.p1, o.p1, t.p2, o.p2
     * @param {*} t 原gpsPoint p1
     * @param {*} o 新gpsPoint p1
     * @param {*} r 原gpsPoint p2
     * @param {*} n 新gpsPoint p2
     */
    intersect: function (t, o, r, n) {
        var i = this.determinant(o.x - t.x, n.x - r.x, n.y - r.y, o.y - t.y);
        if (i <= 1e-6 && i >= -1e-6)
            return !1;
        var s = this.determinant(n.x - r.x, t.x - r.x, t.y - r.y, n.y - r.y) / i;
        if (s > 1 || s < 0)
            return !1;
        var a = this.determinant(o.x - t.x, t.x - r.x, t.y - r.y, o.y - t.y) / i;
        return !(a > 1 || a < 0)
    }
}




/**
 * T 设备+GPS+路段 --整个施工信息的集合对象
 * 
*/
window.T = {
    drawCount: 0,// 设备绘制次数
    roadDataList: [], // 路段信息
    machineDic: {}, // 机器设备信息（类型，ID,图片）
    carGpsList: [], //设备GPS列表
    drawType: 1, //渲染类型 1：温度，2：速度 3：遍数，4 ，震动
    paverColor: "rgb(168 165 165)", //摊铺颜色
    minTemperature: {  //最小温度
        pave: 1,  //遍数
        compaction: 1  //压实
    },
    monitoringCar: null, //正在监控的设备
    dataIndex: 0,//温度
    dataColorRange: [],//速度，温度 色泽
    mapTechnics: null,//数据参数映射
    timesColorList: [],//遍数 色泽巨剑
    init: function () {
        var timesOrginColorList = JSON.parse(`[{"colorVal":[186,244,249]},{"colorVal":[41,213,20]},{"colorVal":[255,226,198]},{"colorVal":[255,173,152]},{"colorVal":[255,121,107]},{"colorVal":[255,68,61]},{"colorVal":[255,15,15]}]`)
        var t = [new colorRGBA(0, 0, 0)];
        for (var o = 0; o < timesOrginColorList.length; o++) {
            var r = timesOrginColorList[o];
            t.push(new colorRGBA(r.colorVal[0], r.colorVal[1], r.colorVal[2]))
        }
        this.timesColorList=t;

        //多色系
        //this.timesColorList = [new colorRGBA(204, 0, 0), new colorRGBA(0, 153, 0), new colorRGBA(204, 153, 0), new colorRGBA(51, 0, 153), new colorRGBA(0, 102, 153), new colorRGBA(102, 0, 153), new colorRGBA(204, 204, 0), new colorRGBA(204, 102, 0), new colorRGBA(0, 51, 153), new colorRGBA(153, 0, 102)],
        //区间色块
        this.dataColorRange = [new rangeColor(120, 140, new colorRGBA(0, 0, 255), new colorRGBA(155, 155, 255)), new rangeColor(140, 170, new colorRGBA(0, 155, 0), new colorRGBA(0, 255, 0)), new rangeColor(170, 170, new colorRGBA(255, 155, 155), new colorRGBA(255, 0, 0))]
    },
    //machine 设备相关信息  machineInfo:{"14":{id:14,name:xxx...}}
    addMachine: function (machineInfo) {
        for (var attr in machineInfo) {
            var machine = machineInfo[attr];
            //设备列表是否还有设备，machineDic是个对象，属性名是设备的ID
            // machineDic:{"14":{id:14,name:...},"15":{id:15,name:...}}
            if (!this.machineDic.hasOwnProperty(machine.id)) {
                var newMachine = new Machine();
                newMachine.id = machine.id;
                newMachine.name = machine.name;
                newMachine.type = machine.type;
                newMachine.isPaver = machine.isPaver || true;
                newMachine.lon = machine.lon;
                newMachine.lat = machine.lat;
                newMachine.width = machine.width;
                newMachine.image = machine.img;
                //newMachine.image = new Image;
                //newMachine.image.src = '../../images/shebei.png';
                //newMachine.image.src = 'https://bgl.zbjimg.com/bgl/bjclound/tip-icon.png/origine/ae9f8a2a-afcf-43f4-9aa2-82a76a53e50c?imageMogr2/auto-orient/strip/quality/90'
                newMachine.image.crossOrigin = "anonymous";

                //加入新设备
                this.machineDic[machine.id] = newMachine;
            }
        }
    },
    /**
     * 更新设备 是否显示或者绘制
     * @param {*} machineId 设备ID
     * @param {*} isShow 是否显示
     * @param {*} isDraw 是否重绘
     */
    updateMachine: function (machineId,updateDate) {

        var machine = this.machineDic[machineId];
        if (machine) {
            for(var a in updateDate){
                machine[a]=updateDate[a]
            }
            this.machineDic[machineId] = machine
        }
    },
    /**
     * 更新设备GPS列表
     * @param {*} carGpsList socket 推送的信息
     */
    appendGpsList: function (carGpsList) {
        this.carGpsList = this.carGpsList.concat(carGpsList)
    }
};
