// 地图初始化
var map = new BMap.Map("map"); // 创建Map实例
var point = new BMap.Point(106.278022,29.682351);
map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
if(projectName=="guangzhou"){
	point = new BMap.Point(113.41370944660196, 23.34191249371705);
	map.centerAndZoom(point, 11); // 初始化地图,设置中心点坐标和地图级别
}
var station = localStorage.getItem("station");
if(station == '鑫丰站'){
	point = new BMap.Point(117.390471, 38.448497);
	map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别
}
if(station == '任丘站'){
	point = new BMap.Point(116.171438, 38.77867);
	map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别
}
if(station == '新基地'){
	point = new BMap.Point(116.996768, 38.437637);
	map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别
}
map.enableScrollWheelZoom(true); // 缩放地图
map.centerAndZoom(point, 16);
var marker = new BMap.Marker(point); // 创建标注
map.addOverlay(marker);
var opts = {
	position: point, // 指定文本标注所在的地理位置
	offset: new BMap.Size(10, -20) //设置文本偏移量
}
var label = new BMap.Label("搅拌站", opts); // 创建文本标注对象
label.setStyle({
	color: "red",
	fontSize: "12px",
	height: "20px",
	lineHeight: "20px",
	fontFamily: "微软雅黑"
});
map.addOverlay(label);
var overlays = {};

// 添加标注函数
function addMarker(point,icon,label,InfoWindow){
  	var marker1 = new BMap.Marker(point,{icon:icon});
  
  	map.addOverlay(marker1);
	overlays[label] = marker1;
	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30,-5)    //设置文本偏移量
	}
	
	var label = new BMap.Label(label, opts);  // 创建文本标注对象
	label.setStyle({
		 color : "red",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"微软雅黑"
	});
  
 	marker1.setLabel(label);
 	
 	marker1.addEventListener('click',function(){
 		map.openInfoWindow(InfoWindow,point); //开启信息窗口
 	})
}

function removeOverlay(label){
	var marker = overlays[label];
	if(marker){
		map.removeOverlay(marker)
		overlays[label] = undefined
	}
}