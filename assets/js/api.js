
var host=getServerUrl(localStorage.getItem("station"));
var socktHost =getServerSocketUrl(localStorage.getItem("station"));
//选择站点
var isClosed = true;
$('.area span:nth-child(2)').click(function(){
	    if(isClosed){
	    	$('.area-box').slideDown(200);
			isClosed = false;
	    }else{
	    	$('.area-box').slideUp(200);
	    	isClosed = true;
	    }
});

// GPS
var gpsUrl = socktHost + 'gps';

// 生产数据
var productUrl = socktHost + 'product';

// 称重过磅
var weightUrl = socktHost + 'weight';








	
// 获取材料类型
var pbUrl = host +'/api/data/ajaxGetPB';

// 获取油石比页面的材料类型
var pbhUrl = host + '/api/data/ajaxGetPBH';

// 获取车辆列表
var carList = host + '/api/location/ajaxGet';

//获取材料类型和批次(选择时间)
var PBHByDateUrl = host + '/api/data/ajaxGetPBHByDate';


//获取材料类型和批次(选择时间)
var WLByDateUrl = host + '/api/data/ajaxGetWLByDate';

//获取材料类型和批次(选择类型)
var BatchByDateAndPBHUrl = host + '/api/data/ajaxGetBatchByDateAndPBH';

//获取材料类型和批次(选择批次)
var GetYSBUrl = host + '/api/data/ajaxGetYSB';

// 车辆历史轨迹
var carTrail = host + '/api/location/history/ajaxGet';

/*统计分析*/
// 生产动态表
var produceStsteUrl = host + '/api/data/ajaxList';

// 生产动态表
var produceStsteAllUrl = host + '/api/data/ajaxListAll';

// 月报
var monthListUrl = host + '/api/data/ajaxMonthList';
// 月报生成
var monthCreateUrl = host + '/api/data/ajaxMonthCreate';

// 生产量分析
var produceNumUrl = host + '/api/data/ajaxSCL';

// 核算量分析
var produceHSUrl = host + '/api/data/ajaxHSL';
// 消耗量统计
var xhlUrl = host + '/api/data/ajaxXHL';

//消耗量统计
var xhlTotal = host + '/api/data/ajaxXiaoHaoLiangTotal';



// 温度波动
var tempUrl = host + '/api/temperature/out/ajaxList';


// 温度波动
var tempPBUrl = host + '/api/temperature/out/ajaxGetTempPB';

// 油石比波动分析
var ysbUrl = host + '/api/data/ajaxGetYSB';

//登陆
var loginUrl = host + '/api/data/ajaxLogin';

//获取所有项目名称
var projectUrl = host + '/api/data/ajaxGetProject';

//获取所有项目名称
var carsUrl = host + '/api/data/ajaxGetCar';

//获取项目详情
var projectDetailUrl = host + '/api/data/ajaxGetProjectDetail';

//增加项目
var projectPushUrl = host + '/api/data/ajaxPushProject';



//运距统计
var distanceUrl = host + '/api/data/ajaxGetAllDistance';


//库存统计
var kucunUrl = host + '/api/data/ajaxGetKuCun';
var kucunUrl_lilun = host + '/api/data/ajaxGetKuCun_lilun';

//进料统计
var jinliaoUrl = host + '/api/data/ajaxGetJinLiao';

//出料统计
var chuliaoUrl = host + '/api/data/ajaxGetChuLiao';

//出料统计
var chuliaoUrl_lilun = host + '/api/data/ajaxGetChuLiao_lilun';



$(document).ready(function () {
	
	var role ="0"; //sessionStorage.getItem("role");
	
	
	if(role=="0"){
	}else if(role=="1"){
		//2 3 8 12 13
		$(".nav a").each(function(index,element){
			switch(index){
				case 0:
				case 1:
				case 3:
				case 4:				
					$(this).remove();
				break;
			}
			
		});
		
		$(".subnav li").each(function(index,element){
			switch(index){
				case 1:
				case 2:
				case 3:
				case 6:$(this).remove();
				break;
			}
			
		});
		
	}else if(role=="2"){
		
		$(".nav a").each(function(index,element){
			switch(index){
				case 0:
				case 2:
				case 4:
					$(this).remove();
				break;
			}
			
		});
		
		$(".subnav li").each(function(index,element){
			switch(index){
				case 0:
				case 4:
				case 5:
				case 6:$(this).remove();
				break;
			}
			
		});
	}else if(role=="3"){
		
		/**
		 * 首页，称重过磅，车辆调度，库存盘点，视频监控，统计分析中的生产量，消耗量，核算量，运距统计
		 */
		$(".nav a").each(function(index,element){
			switch(index){
				case 2:$(this).remove();
				break;
			}
			
		});
		
		$(".subnav li").each(function(index,element){
			switch(index){
				case 0:
				case 4:
				case 5:$(this).remove();
				break;
			}
			
		});
		
	}else if(role=="4"){
		
		/**
		 * 首页，称重过磅，车辆调度，库存盘点，视频监控，统计分析中的生产量，消耗量，核算量，运距统计
		 */
		$(".nav a").each(function(index,element){
			switch(index){
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				
					$(this).remove();
				break;
			}
			
		});
		
		$("#tongji").hide()
		
	}else{
		
		//未登陆 
		alert("请登陆！");
		window.location="admin.html" 
		
	}
	
});

// ajax数据请求
function ajaxData(url,params,callback){
	$.ajax({
		type:"get",
		url:url,
		data:params,
		success:function(res){
			callback(res)
		}
	});
}

// websocket函数
function WebSocketFn(url,callback){
    if ("WebSocket" in window){
       // console.log("您的浏览器支持 WebSocket!");
       // 打开一个 web socket
       var ws = new WebSocket(url);
        
       ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          //ws.send("发送数据");
          //alert("数据发送中...");
       };
        
       ws.onmessage = function (evt) { 
          var received_msg = evt.data;
          //console.log(received_msg);
          callback(received_msg);
          //alert("数据已接收...");
       };
        
       ws.onclose = function(){ 
          // 关闭 websocket
          console.log("连接已关闭..."); 
       };
    }else{
       // 浏览器不支持 WebSocket
       alert("您的浏览器不支持 WebSocket!");
    }
}

// 获取本地时间
function timeFn() {
	var nowdate = new Date();
	var y = nowdate.getFullYear();
	var m = nowdate.getMonth() + 1;
	var d = nowdate.getDate();
	var h = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	var s = nowdate.getSeconds();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	s = s < 10 ? '0' + s : s;

	return {
		y:y,
		m:m,
		d:d,
		h:h,
		min:minutes,
		s:s
	}
	
}

timeFn();
