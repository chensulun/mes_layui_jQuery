/** EasyWeb iframe v3.1.4 date:2019-08-05 License By http://easyweb.vip */

// 以下代码是配置layui扩展模块的目录，每个页面都需要引入
layui
	.config({
		version: true,
		base: getProjectUrl() + "assets/module/"
	})
	.extend({
		formSelects: "formSelects/formSelects-v4",
		treetable: "treetable-lay/treetable",
		dropdown: "dropdown/dropdown",
		notice: "notice/notice",
		step: "step-lay/step",
		dtree: "dtree/dtree",
		citypicker: "city-picker/city-picker",
		tableSelect: "tableSelect/tableSelect",
		Cropper: "Cropper/Cropper",
		zTree: "zTree/zTree",
		introJs: "introJs/introJs",
		fileChoose: "fileChoose/fileChoose",
		tagsInput: "tagsInput/tagsInput",
		CKEDITOR: "ckeditor/ckeditor",
		Split: "Split/Split",
		cascader: "cascader/cascader"
	})
	.use(["layer", "admin"], function() {
		var $ = layui.jquery;
		var layer = layui.layer;
		var admin = layui.admin;

		// 移除loading动画
		setTimeout(
			function() {
				admin.removeLoading();
			},
			window == top ? 600 : 100
		);
	});

// 获取本地时间
function timeFn() {
	var nowdate = new Date();
	var y = nowdate.getFullYear();
	var m = nowdate.getMonth() + 1;
	var um = nowdate.getMonth();
	var d = nowdate.getDate();
	var h = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	var s = nowdate.getSeconds();
	m = m < 10 ? "0" + m : m;
	um = um < 10 ? "0" + um : um;
	d = d < 10 ? "0" + d : d;
	h = h < 10 ? "0" + h : h;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	s = s < 10 ? "0" + s : s;

	return {
		y: y,
		m: m,
		um: um,
		d: d,
		h: h,
		min: minutes,
		s: s
	};
}

function getQueryString(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	const urlObj = window.location;
	var r =
		urlObj.href.indexOf("#") > -1 ?
		urlObj.hash.split("?")[1].match(reg) :
		urlObj.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
// 项目名称
var projectName = 'guangzhou';
//图片地址，前端本地地址
var imgUrl = 'http://www.zgdrkj.cn:8082/';
//后台接口地址
var url = 'http://www.zgdrkj.cn:8081/CjManager/';
 // var url = 'http://localhost:8081';
var serverUrl = url;
var uploadurl = imgUrl+"/upload";
//这里是接口地址，mangodb数据库外部接口
var api_url = "http://www.zgdrkj.cn/";
//这里是sockect接口地址
var socket_url = "ws://www.zgdrkj.cn/";
//上传文件路径
var file_path="D:\\web\\前端\\upload";
//视频动态url
var video_api_url="/shebei/getvideoList";

// 获取当前项目的根路径，通过获取layui.js全路径截取assets之前的地址
function getProjectUrl() {
	var layuiDir = layui.cache.dir;
	if (!layuiDir) {
		var js = document.scripts,
			last = js.length - 1,
			src;
		for (var i = last; i > 0; i--) {
			if (js[i].readyState === "interactive") {
				src = js[i].src;
				break;
			}
		}
		var jsPath = src || js[last].src;
		layuiDir = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	}
	return layuiDir.substring(0, layuiDir.indexOf("assets"));
}
//station_ck()
function station() {
	var zd = localStorage.getItem("station_list");
	switch (zd) {
		case "两江站":
			break;
		case "璧山站":
			break;
		case "双石站":
			break;
		case "朱沱站":
			break;
	}
}
// ajax数据请求
function ajaxData(url, params, callback) {
	$.ajax({
		type: "get",
		url: url,
		data: params,
		success: function(res) {
			callback(res);
		}
	});
}
// websocket函数
function WebSocketFn(url, callback) {
	if ("WebSocket" in window) {
		// console.log("您的浏览器支持 WebSocket!");
		// 打开一个 web socket
		var ws = new WebSocket(url);

		ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
			//ws.send("发送数据");
			//alert("数据发送中...");
		};

		ws.onmessage = function(evt) {
			var received_msg = evt.data;
			//console.log(received_msg);
			callback(received_msg);
			//alert("数据已接收...");
		};

		ws.onclose = function() {
			// 关闭 websocket
			console.log("连接已关闭...");
		};
	} else {
		// 浏览器不支持 WebSocket
		alert("您的浏览器不支持 WebSocket!");
	}
}
function setVideoFlvJsPlayer(playerid,url,playerwidth,playerheight){
	 new window.FlvJsPlayer({
	        id: playerid,
	        isLive: false,
	        playsinline: true,
	        url: url,
	        autoplay: true,
	        height:playerheight,
	        width:playerwidth
	    });
}