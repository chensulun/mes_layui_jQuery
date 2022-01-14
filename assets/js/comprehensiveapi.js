// sockt host localhost


//host 
//var socktHost = 'ws://183.230.164.56:8025/';
//var host= 'http://183.230.164.56:8025';
//var socktHost = 'ws://183.230.164.56:8025/';
//var host= 'http://183.230.164.56:8025';
//var socktHost = 'ws://183.230.164.56:8025/';
//var host= 'http://183.230.164.56:8025';

//var socktHost = 'ws://localhost:8025/';
//var host= 'http://localhost:8025';
var socktHost = 'ws://183.230.164.56:8025/';
var host = 'http://183.230.164.56:8025';



//判断站点  选择后台服务
var station = localStorage.getItem("station");
//var single = sessionStorage.getItem("single");
host = getServerUrl(station);
socktHost = getServerSocketUrl(station);

function indexvideo() {
	var deviceWidth = document.documentElement.clientWidth;
	var playwidth = 210;
	var playheight = 210;
	if (deviceWidth < 1500) {
		playwidth = 145.55;
		playheight = 140.52;
	}
	$("#zhanvideo").html("");
	$.get(url + video_api_url, {
		zhandian: station,
		model_name: "综合展示-综合监控",
		type: "pc"
	}, function(res) {
		for (var i = 0; i < res.length; i++) {
			var playerid = "player" + i;
			var html = '<div class="index-video" >';
			html += '<video id=' + playerid + ' controls muted></video>';
			html + '</div>';
			$("#zhanvideo").append(html);
			setVideoFlvJsPlayer(playerid, res[i].url, playwidth, playheight);
		}

	})

}

function proMontitorvideo() {
	var deviceWidth = document.documentElement.clientWidth;
	var playwidth = '100%';
	var playheight = 448;
	if (deviceWidth < 1500) {
		playwidth = "100%";
		playheight = 310;
	}
	$("#player").html("");
	$.get(url + video_api_url, {
		zhandian: station,
		model_name: "综合展示/生产管理-生产监控",
		type: "pc"
	}, function(res) {
		for (var i = 0; i < res.length; i++) {
			var playerid = "player" + i;
			var html = '<video id=' + playerid + ' controls></video>';
			$("#player").append(html);
			setVideoFlvJsPlayer(playerid, res[i].url, playwidth, playheight);
		}
	})


}


function bishansheji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'eight',
					title: '沥青'
				}, {
					field: 'tjjsl',
					title: '添加剂'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function bishanchengchankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + '</span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'tjjsl',
					title: '添加剂'
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);

			if (data.change) {
				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}

function cqlqsheji(layui, data) {
	// 设计配比
	var table = layui.table;
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'seven_1_S',
					title: '仓7'
				}, {
					field: 'six_S',
					title: '新粉'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'huiShou_S',
					title: '回收料'
				}, {
					field: 'eight',
					title: '沥青',
					width: '69px'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

	//$(".peibi .laytable-cell-1-eight").css("width","69px !important");

}

function cqlqshengchankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven_1',
					title: '仓7',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_1_S + ' </span>'
						}
						var lv = (lastItemPB.seven_1_S == 0 ? 0 : parseFloat(lastItemPB.seven_1_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_1_S == 0 ? 0 : parseFloat(d.seven_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓7', lastItemPB.seven_1, d.seven_1, lv, nv) + ';"> ' + d.seven_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'huiShou',
					title: '回收料',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.huiShou_S + ' </span>'
						}
						var lv = (lastItemPB.huiShou_S == 0 ? 0 : parseFloat(lastItemPB.huiShou_S.split('(')[1].split(')')[0]));
						var nv = (d.huiShou_S == 0 ? 0 : parseFloat(d.huiShou_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('回收粉', lastItemPB.huiShou, d.huiShou, lv, nv) + ';"> ' + d.huiShou_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + '</span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);

			if (data.change) {

				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});
}

function shuangshishenji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'eight',
					title: '沥青'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function shuangshichankanban(layui, data, productList) {

	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				},
				{
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				},
				{
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + '</span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);


			if (data.change) {

				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}

function zhutuoshenji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'seven_1_S',
					title: '仓7'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'eight',
					title: '沥青'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}
//列少1
function zhutuochankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven_1',
					title: '仓7',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_1_S + ' </span>'
						}
						var lv = (lastItemPB.seven_1_S == 0 ? 0 : parseFloat(lastItemPB.seven_1_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_1_S == 0 ? 0 : parseFloat(d.seven_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓7', lastItemPB.seven_1, d.seven_1, lv, nv) + ';"> ' + d.seven_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青(油石比)',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + '(' + (d.ysb.toFixed(2)) + ') </span>'
						}
						var lv = lastItemPB.ysb.toFixed(2);
						var nv = d.ysb.toFixed(2);
						var html = '<span style="color: ' + setColor('沥青(油石比)', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), lv,
							nv) + ';"> ' + d.eight.toFixed(2) + '(' + (d.ysb.toFixed(2)) + ' </span>';
						return html;
					},
					width: 80
				}
			]
		],
		data: productList,
		even: true
	});

}

function yuanfenglinsheji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'seven_1_S',
					title: '仓7'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'huiShou_S',
					title: '回收粉'
				}, {
					field: 'ysb',
					title: '沥青'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function yuanfenglinchengchankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'seven_1',
					title: '仓7',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_1_S + ' </span>'
						}
						var lv = (lastItemPB.seven_1_S == 0 ? 0 : parseFloat(lastItemPB.seven_1_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_1_S == 0 ? 0 : parseFloat(d.seven_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓7', lastItemPB.seven_1, d.seven_1, lv, nv) + ';"> ' + d.seven_1_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'huiShou',
					title: '回收粉',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.huiShou_S + ' </span>'
						}
						var lv = (lastItemPB.huiShou_S == 0 ? 0 : parseFloat(lastItemPB.huiShou_S.split('(')[1].split(')')[0]));
						var nv = (d.huiShou_S == 0 ? 0 : parseFloat(d.huiShou_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('回收粉', lastItemPB.huiShou, d.huiShou, lv, nv) + ';"> ' + d.huiShou_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);

			if (data.change) {
				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}


function fengdushenji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'eight',
					title: '沥青'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function fengduchankanban(layui, data, productList) {

	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						var sz = d.one_S.split('(')[1].split(')')[0];
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				},
				//										
				{
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				},
				{
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + '</span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);


			if (data.change) {

				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}


function guangzhoushenji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'seven_1_S',
					title: '仓7'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'huiShou_S',
					title: '回收粉'
				}, {
					field: 'eight',
					title: '沥青'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function guangzhouchankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven_1',
					title: '仓7',
					templet: function(d) {
						if (d.seven_1_S == undefined) {
							return '<span></span>'
						}
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_1_S + ' </span>'
						}
						var lv = (lastItemPB.seven_1_S == 0 ? 0 : parseFloat(lastItemPB.seven_1_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_1_S == 0 ? 0 : parseFloat(d.seven_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓7', lastItemPB.seven_1, d.seven_1, lv, nv) + ';"> ' + d.seven_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'huiShou',
					title: '回收粉',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.huiShou_S + ' </span>'
						}
						var lv = (lastItemPB.huiShou_S == 0 ? 0 : parseFloat(lastItemPB.huiShou_S.split('(')[1].split(')')[0]));
						var nv = (d.huiShou_S == 0 ? 0 : parseFloat(d.huiShou_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('回收粉', lastItemPB.huiShou, d.huiShou, lv, nv) + ';"> ' + d.huiShou_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('沥青', lastItemPB.eight.toFixed(2), d.eight.toFixed(2), 0, 0) +
							';"> ' + d.eight.toFixed(2) + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true
	});

}

/////////////////查



function yuanfenglinsheji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_1_S',
					title: '仓6'
				}, {
					field: 'seven_1_S',
					title: '仓7'
				}, {
					field: 'six_S',
					title: '新粉1'
				}, {
					field: 'seven_S',
					title: '新粉2'
				}, {
					field: 'ysb',
					title: '油石比'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function yuanfenglinchengchankanban(layui, data, productList) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var lv = (lastItemPB.six_1_S == 0 ? 0 : parseFloat(lastItemPB.six_1_S.split('(')[1].split(')')[0]));
						var nv = (d.six_1_S == 0 ? 0 : parseFloat(d.six_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, lv, nv) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'seven_1',
					title: '仓7',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_1_S + ' </span>'
						}
						var lv = (lastItemPB.seven_1_S == 0 ? 0 : parseFloat(lastItemPB.seven_1_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_1_S == 0 ? 0 : parseFloat(d.seven_1_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓7', lastItemPB.seven_1, d.seven_1, lv, nv) + ';"> ' + d.seven_1_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'six',
					title: '新粉1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var lv = (lastItemPB.six_S == 0 ? 0 : parseFloat(lastItemPB.six_S.split('(')[1].split(')')[0]));
						var nv = (d.six_S == 0 ? 0 : parseFloat(d.six_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, lv, nv) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'seven',
					title: '新粉2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var lv = (lastItemPB.seven_S == 0 ? 0 : parseFloat(lastItemPB.seven_S.split('(')[1].split(')')[0]));
						var nv = (d.seven_S == 0 ? 0 : parseFloat(d.seven_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, lv, nv) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 100
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.guanci == '配比') {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {

			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);

			if (data.change) {
				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}



// function xinfengshenji(layui, data) {
// 	var table = layui.table;
// 	var list1=data.lastItemPB;
	
// 	// var model={
// 	// 	titlegs:"设计",
// 	// 	one_S:list1.one_S+"",
// 	// 	two_S:list1.two_S+"",
// 	// 	three_S:list1.three_S+"",
// 	// 	four_S:list1.four_S+"",
// 	// 	five_S:list1.five_S+"",
// 	// 	six_S:list1.six_S+"",
// 	// 	seven_S:list1.seven_S+"",
// 	// 	six_1_S:list1.six_1_S+"",
// 	// 	huiShou_S:list1.huiShou_S+"",
// 	// 	huiShouLiao:list1.huiShouLiao+"",
// 	// 	eight:list1.eight+""
// 	// }
// 	var model={
// 		titlegs:"设计",
// 		one_S:list1.one_S,
// 		two_S:list1.two_S,
// 		three_S:list1.three_S,
// 		four_S:list1.four_S,
// 		five_S:list1.five_S,
// 		six_S:list1.six_S,
// 		seven_S:list1.seven_S,
// 		six_1_S:list1.six_1_S,
// 		huiShou_S:list1.huiShou_S,
// 		huiShouLiao:list1.huiShouLiao,
// 		eight:list1.eight
// 	}
	
// 	//查询配比单
// 	$.ajax(
// 	{
// 	    url: url+"/dispatch/getPlcp",
// 	    type: 'GET',
// 	    dataType: 'json',
// 	    async: true,
// 	    data:{idzhandian:localStorage.getItem("station_id")},
// 	    success:function (res) {
// 			var list=[];
// 	        if(res.data!=null){
// 				var list2=res.data;
// 				var model1={
// 					titlegs:"配比单",
// 					one_S:list2.one,
// 					two_S:list2.two,
// 					three_S:list2.three,
// 					four_S:list2.four,
// 					five_S:list2.five,
// 					six_S:list2.six_1,
// 					seven_S:list2.six,
// 					six_1_S:list2.seven,
// 					huiShou_S:list2.huiShou,
// 					huiShouLiao:list2.huiShouLiao,
// 					eight:list2.eight
// 				}
// 				model1.eight=list2.eight+ '%';
// 				$(".ratiopb").text(list2.eight+ '%');
				
// 				list.push(model1);
// 			}
			
// 			list.push(model);
// 			// 设计配比
// 			table.render({
// 				elem: '#sheji',
// 				cols: [
// 					[ //标题栏
// 						{
// 							field: 'titlegs',
// 							title: ''
// 						},
// 						{
// 							field: 'one_S',
// 							title: '仓1'
// 						}, {
// 							field: 'two_S',
// 							title: '仓2'
// 						}, {
// 							field: 'three_S',
// 							title: '仓3'
// 						}, {
// 							field: 'four_S',
// 							title: '仓4'
// 						}, {
// 							field: 'five_S',
// 							title: '仓5'
// 						}, {
// 							field: 'six_S',
// 							title: '仓6'
// 						}, {
// 							field: 'seven_S',
// 							title: '粉料1'
// 						}, {
// 							field: 'six_1_S',
// 							title: '粉料2'
// 						}, {
// 							field: 'huiShou_S',
// 							title: '回收粉'
// 						}, {
// 							field: 'huiShouLiao',
// 							title: '回收料'
// 						}, {
// 							field: 'eight',
// 							title: '沥青'
// 						}
// 					]
// 				],
// 				data: list,
// 				even: true
// 			});
// 	    }
// 	})
	

// }


function xinfengshenji(layui, data) {
	var table = layui.table;
 	var list1=data.lastItemPB;
	
	var model={
 	guanci:"配比单",
 	one_S:list1.one_S,
    two_S:list1.two_S,
	three_S:list1.three_S,
    four_S:list1.four_S,
	five_S:list1.five_S,
 	six_S:list1.six_S,
	seven_S:list1.seven_S,
 	six_1_S:list1.six_1_S,
 	zsl_S:list1.zsl_S,
 	eight_S:list1.eight_S
	}
	var list=[];
	list.push(model);
	list.push(list1);
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'guanci',
					title: ''
				},
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_S',
					title: '仓6'
				}, {
					field: 'seven_S',
					title: '粉料1'
				}, {
					field: 'six_1_S',
					title: '粉料2'
				}, {
					field: 'zsl_S',
					title: '再生料'
				}, {
					field: 'eight_S',
					title: '沥青'
				}
			]
		],
		data: list,
		even: true
	});
	

}

function renqiushenji(layui, data) {
	var table = layui.table;
 	var list1=data.lastItemPB;
	
	var model={
 	guanci:"配比单",
 	one_S_B:list1.one_S_B,
    two_S_B:list1.two_S_B,
	three_S_B:list1.three_S_B,
    four_S_B:list1.four_S_B,
	five_S_B:list1.five_S_B,
 	six_S_B:list1.six_S_B,
	seven_S_B:list1.seven_S_B,
 	six_1_S_B:list1.six_1_S_B,
 	zsl_S:list1.zsl_S,
 	eight_S:list1.eight_S
	}
	var list=[];
	list.push(model);
	list.push(list1);
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'guanci',
					title: ''
				},
				{
					field: 'one_S_B',
					title: '仓1'
				}, {
					field: 'two_S_B',
					title: '仓2'
				}, {
					field: 'three_S_B',
					title: '仓3'
				}, {
					field: 'four_S_B',
					title: '仓4'
				}, {
					field: 'five_S_B',
					title: '仓5'
				}, {
					field: 'six_S_B',
					title: '仓6'
				}, {
					field: 'seven_S_B',
					title: '粉料1'
				}, {
					field: 'six_1_S_B',
					title: '粉料2'
				}, {
					field: 'zsl_S',
					title: '再生料'
				}, {
					field: 'eight_S',
					title: '沥青'
				}
			]
		],
		data: list,
		even: true
	});
	

}


function renqiushenji3000(layui, data) {
	var table = layui.table;
 	var list1=data.lastItemPB;
	
	var model={
 	guanci:"配比单",
 	one_S_B:list1.one_S_B,
    two_S_B:list1.two_S_B,
	three_S_B:list1.three_S_B,
    four_S_B:list1.four_S_B,
	five_S_B:list1.five_S_B,
 	six_S_B:list1.six_S_B,
	seven_S_B:list1.seven_S_B,
 	six_1_S_B:list1.six_1_S_B,
 	eight_S:list1.eight_S
	}
	var list=[];
	list.push(model);
	list.push(list1);
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'guanci',
					title: ''
				},
				{
					field: 'one_S_B',
					title: '仓1'
				}, {
					field: 'two_S_B',
					title: '仓2'
				}, {
					field: 'three_S_B',
					title: '仓3'
				}, {
					field: 'four_S_B',
					title: '仓4'
				}, {
					field: 'five_S_B',
					title: '仓5'
				}, {
					field: 'six_S_B',
					title: '仓6'
				}, {
					field: 'seven_S_B',
					title: '粉料1'
				}, {
					field: 'six_1_S_B',
					title: '粉料2'
				}, {
					field: 'eight_S',
					title: '沥青'
				}
			]
		],
		data: list,
		even: true
	});
	

}


function xjdshenji(layui, data) {
	var table = layui.table;
 	var list1=data.lastItemPB;
	
	var model={
 	guanci:"配比单",
 	one_S:list1.one_S,
    two_S:list1.two_S,
	three_S:list1.three_S,
    four_S:list1.four_S,
	five_S:list1.five_S,
 	six_1_S:list1.six_1_S,
	six_S:list1.six_S,
 	seven_S:list1.seven_S,
 	zsl_S:list1.zsl_S,
 	eight_S:list1.eight_S,
	ysb:list1.ysb
	}
	var list=[];
	list.push(model);
	list.push(list1);
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'guanci',
					title: ''
				},
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_S',
					title: '仓6'
				}, {
					field: 'seven_S',
					title: '粉料1'
				}, {
					field: 'six_1_S',
					title: '粉料2'
				}, {
					field: 'zsl_S',
					title: '再生料'
				}, {
					field: 'eight_S',
					title: '沥青'
				}
			]
		],
		data: list,
		even: true
	});
	

}

function xinfengchankanban(layui, data, productList,lastItemPB) {

	var table = layui.table;
	table.render({
		elem: '#produce',
		
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '盘次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓1', 0, 0, lastItemPB.one_S, d.one_S) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓2', 0, 0, lastItemPB.two_S, d.two_S) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓3', 0, 0, lastItemPB.three_S, d.three_S) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 120
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓4', 0, 0, lastItemPB.four_S, d.four_S) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓5', 0, 0, lastItemPB.five_S, d.five_S) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓6', 0, 0, lastItemPB.six_S, d.six_S) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '粉料1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉1', 0, 0, lastItemPB.seven_S, d.seven_S) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '粉料2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉2', 0, 0, lastItemPB.six_1_S, d.six_1_S) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'zsl_S',
					title: '再生料',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.zsl_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'回收料', lastItemPB.zsl_S, d.zsl_S, lastItemPB.zsl_S, d.zsl_S) +
							';"> ' + d.zsl_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight_S',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'沥青', 0, 0, lastItemPB.eight_S, d.eight_S) +
							';"> ' + d.eight_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.ysb + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'油石比', 0, 0,lastItemPB.ysb, d.ysb) +
							';"> ' + d.ysb + ' </span>';
						return html;
					},
				}

			]
		],
		data: productList,
		limit:100,
		even: true,
		done: function(res, curr, count) {
			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);
			var status=""; 
			//if (data.change) {
				if (v4 && v5 && v6) {
					status="配比,油石比,温度";
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
						myAuto2.onended = function() {
							myAuto3.play();
							v6 = false;
						};
					};
					
				} else if (v4 && v5) {
					status="配比,油石比";
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
					
				} else if (v4 && v6) {
					status="配比,温度";
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto3.play();
						v6 = false;
					};
				}else if (v5 && v6) {
					status="油石比,温度";
					myAuto2.play();
					v5 = false;
					myAuto2.onended = function() {
						myAuto3.play();
						v6 = false;
					};
				}else if(v4){
					status="配比";
					myAuto1.play();
					v4 = false;
				}else if(v5){
					status="油石比";
					myAuto2.play();
					v5 = false;
				}else if(v6){
					status="温度";
					myAuto3.play();
					v6 = false;
				}
				
				
				if(status!=""){
					var model={
						station:station,
						product:res.data[0].pbh,
						status:status
					}
					$.ajax({
							url: url + '/dispatch/sendYcSms',
							type: 'post',
							contentType:'application/json',
							async: false,
							dataType: 'json',
							data:JSON.stringify(model),
							success: function(res) {
						
							}
						});
				}
			//}
		}
	});

}

function renqiuchankanban(layui, data, productList,lastItemPB) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '盘次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓1', 0, 0, lastItemPB.one_S_B, d.one_S_B) + ';"> ' + d.one_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓2', 0, 0, lastItemPB.two_S_B, d.two_S_B) + ';"> ' + d.two_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓3', 0, 0, lastItemPB.three_S_B, d.three_S_B) + ';"> ' + d.three_S_B +
							' </span>';
						return html;
					},
					width: 120
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓4', 0, 0, lastItemPB.four_S_B, d.four_S_B) + ';"> ' + d.four_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓5', 0, 0, lastItemPB.five_S_B, d.five_S_B) + ';"> ' + d.five_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓6', 0, 0, lastItemPB.six_S_B, d.six_S_B) + ';"> ' + d.six_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '粉料1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉1', 0, 0, lastItemPB.seven_S_B, d.seven_S_B) + ';"> ' + d.seven_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '粉料2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉2', 0, 0, lastItemPB.six_1_S_B, d.six_1_S_B) + ';"> ' + d.six_1_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'zshsl',
					title: '再生料',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.zsl_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'回收料', lastItemPB.zsl_S_B, d.zsl_S, lastItemPB.zsl_S, d.zsl_S) +
							';"> ' + d.zsl_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'沥青', 0, 0, lastItemPB.eight_S, d.eight_S) +
							';"> ' + d.eight_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.ysb + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'油石比', 0, 0,lastItemPB.ysb, d.ysb) +
							';"> ' + d.ysb + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		limit:100,
		even: true,
		done: function(res, curr, count) {
			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);
		}
	});
}

function renqiuchankanban3000(layui, data, productList,lastItemPB) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '盘次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓1', 0, 0, lastItemPB.one_S_B, d.one_S_B) + ';"> ' + d.one_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓2', 0, 0, lastItemPB.two_S_B, d.two_S_B) + ';"> ' + d.two_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓3', 0, 0, lastItemPB.three_S_B, d.three_S_B) + ';"> ' + d.three_S_B +
							' </span>';
						return html;
					},
					width: 120
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓4', 0, 0, lastItemPB.four_S_B, d.four_S_B) + ';"> ' + d.four_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓5', 0, 0, lastItemPB.five_S_B, d.five_S_B) + ';"> ' + d.five_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓6', 0, 0, lastItemPB.six_S_B, d.six_S_B) + ';"> ' + d.six_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '粉料1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉1', 0, 0, lastItemPB.seven_S_B, d.seven_S_B) + ';"> ' + d.seven_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '粉料2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S_B + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉2', 0, 0, lastItemPB.six_1_S_B, d.six_1_S_B) + ';"> ' + d.six_1_S_B +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'沥青', 0, 0, lastItemPB.eight_S, d.eight_S) +
							';"> ' + d.eight_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.ysb + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'油石比', 0, 0,lastItemPB.ysb, d.ysb) +
							';"> ' + d.ysb + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		limit:100,
		even: true,
		done: function(res, curr, count) {
			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);
		}
	});
}

function xjdchankanban(layui, data, productList,lastItemPB) {
	var table = layui.table;
	table.render({
		elem: '#produce',
		
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '盘次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓1', 0, 0, lastItemPB.one_S, d.one_S) + ';"> ' + d.one_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓2', 0, 0, lastItemPB.two_S, d.two_S) + ';"> ' + d.two_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓3', 0, 0, lastItemPB.three_S, d.three_S) + ';"> ' + d.three_S +
							' </span>';
						return html;
					},
					width: 120
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓4', 0, 0, lastItemPB.four_S, d.four_S) + ';"> ' + d.four_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓5', 0, 0, lastItemPB.five_S, d.five_S) + ';"> ' + d.five_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'仓6', 0, 0, lastItemPB.six_S, d.six_S) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '粉料1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉1', 0, 0, lastItemPB.seven_S, d.seven_S) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '粉料2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'新粉2', 0, 0, lastItemPB.six_1_S, d.six_1_S) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				}, 
				{
					field: 'huiShouLiao',
					title: '再生料',
					templet: function(d) {
						if (d.state == 0 || d.state == 2) {
							lastItemPB = d;
							return '<span> ' + d.zsl_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'回收料', 0, 0, lastItemPB.zsl_S, d.zsl_S) +
							';"> ' + d.zsl_S + ' </span>';
						return html;
					},
					width: 80
				},
				{
					field: 'eight',
					title: '沥青',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.eight_S + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'沥青', 0, 0, lastItemPB.eight_S, d.eight_S) +
							';"> ' + d.eight_S + ' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + xfsetColor(d.pbh,'油石比', 0, 0,lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2)) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		limit:100,
		even: true,
		done: function(res, curr, count) {
			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);
		}
	});
}
function xfsetColor(hhl_type,fileName, setVal, val, setVal1, val1) {
					var gz = JSON.parse(localStorage.getItem("gz")).list;
					var color = "";
					if(hhl_type.indexOf('R')==0 && hhl_type.length>1)
					{
						hhl_type=hhl_type.substring(1,hhl_type.length);
					}
					$.each(gz, function(i, item) {
						if (item.setting_name == fileName && item.hhl_type.toUpperCase()==hhl_type.toUpperCase() && item.yccd=="一般") {
							if (item.settingGroup == "LEFT") //括号外的数字
							{
								if (val - setVal < item.bg_size) {
									color = "blue";
									return false;
								} else if (val - setVal > item.ed_size) {
									color = "red";
									setBjType(gz,hhl_type,fileName, setVal, val, setVal1, val1);
									return false;
								} else {
									color = "";
									return false;
								}
							} else { //括号内的数字
								if (val1 - setVal1 < item.bg_size) {
									color = "blue";
									return false;
								} else if (val1 - setVal1 > item.ed_size) {
									color = "red";
									setBjType(gz,hhl_type,fileName, setVal, val, setVal1, val1);
									return false;
								} else {
									color = "";
									return false;
								}
							}
						}
					});
					return color;
				}

function othershenji(layui, data) {
	var table = layui.table;
	// 设计配比
	table.render({
		elem: '#sheji',
		cols: [
			[ //标题栏
				{
					field: 'one_S',
					title: '仓1'
				}, {
					field: 'two_S',
					title: '仓2'
				}, {
					field: 'three_S',
					title: '仓3'
				}, {
					field: 'four_S',
					title: '仓4'
				}, {
					field: 'five_S',
					title: '仓5'
				}, {
					field: 'six_S',
					title: '仓6'
				}, {
					field: 'seven_S',
					title: '粉料1'
				}, {
					field: 'six_1_S',
					title: '粉料2'
				}, {
					field: 'huiShou_S',
					title: '回收粉'
				}
			]
		],
		data: [data.lastItemPB],
		even: true
	});

}

function otherchankanban(layui, data, productList) {

	var table = layui.table;
	table.render({
		elem: '#produce',
		cols: [
			[ //标题栏
				{
					field: 'dateTime',
					title: '时间'
				}, {
					field: 'guanci',
					title: '锅次'
				}, {
					field: 'one',
					title: '仓1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.one_S + ' </span>'
						}
						var lv = (lastItemPB.one_S == 0 ? 0 : parseFloat(lastItemPB.one_S.split('(')[1].split(')')[0]));
						var nv = (d.one_S == 0 ? 0 : parseFloat(d.one_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓1', lastItemPB.one, d.one, lv, nv) + ';"> ' + d.one +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'two',
					title: '仓2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.two_S + ' </span>'
						}
						var lv = (lastItemPB.two_S == 0 ? 0 : parseFloat(lastItemPB.two_S.split('(')[1].split(')')[0]));
						var nv = (d.two_S == 0 ? 0 : parseFloat(d.two_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓2', lastItemPB.two, d.two, lv, nv) + ';"> ' + d.two +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'three',
					title: '仓3',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.three_S + ' </span>'
						}
						var lv = (lastItemPB.three_S == 0 ? 0 : parseFloat(lastItemPB.three_S.split('(')[1].split(')')[0]));
						var nv = (d.three_S == 0 ? 0 : parseFloat(d.three_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓3', lastItemPB.three, d.three, lv, nv) + ';"> ' + d.three +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'four',
					title: '仓4',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.four_S + ' </span>'
						}
						var lv = (lastItemPB.four_S == 0 ? 0 : parseFloat(lastItemPB.four_S.split('(')[1].split(')')[0]));
						var nv = (d.four_S == 0 ? 0 : parseFloat(d.four_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓4', lastItemPB.four, d.four, lv, nv) + ';"> ' + d.four +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'five',
					title: '仓5',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.five_S + ' </span>'
						}
						var lv = (lastItemPB.five_S == 0 ? 0 : parseFloat(lastItemPB.five_S.split('(')[1].split(')')[0]));
						var nv = (d.five_S == 0 ? 0 : parseFloat(d.five_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('仓5', lastItemPB.five, d.five, lv, nv) + ';"> ' + d.five +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six_1',
					title: '仓6',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six_1 + ' </span>'
						}
						var html = '<span style="color: ' + setColor('仓6', lastItemPB.six_1, d.six_1, 0, 0) + ';"> ' + d.six_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'six',
					title: '粉料1',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.six + ' </span>'
						}
						var html = '<span style="color: ' + setColor('新粉1', lastItemPB.six, d.six, 0, 0) + ';"> ' + d.seven_S +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'seven',
					title: '粉料2',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.seven + ' </span>'
						}
						var html = '<span style="color: ' + setColor('新粉2', lastItemPB.seven, d.seven, 0, 0) + ';"> ' + d.six_1_S +
							' </span>';
						return html;
					},
					width: 80
				},
				{
					field: 'huiShou',
					title: '回收粉',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							return '<span> ' + d.huiShou_S + ' </span>'
						}
						var lv = (lastItemPB.huiShou_S == 0 ? 0 : parseFloat(lastItemPB.huiShou_S.split('(')[1].split(')')[0]));
						var nv = (d.huiShou_S == 0 ? 0 : parseFloat(d.huiShou_S.split('(')[1].split(')')[0]));
						var html = '<span style="color: ' + setColor('回收粉', lastItemPB.huiShou, d.huiShou, lv, nv) + ';"> ' + d.huiShou +
							' </span>';
						return html;
					},
					width: 80
				}, {
					field: 'ysb',
					title: '油石比',
					templet: function(d) {
						if (d.state == 0) {
							lastItemPB = d;
							if(d.ysb_1==null){
								d.ysb_1=0;
							}
							return '<span> ' + d.ysb.toFixed(2) + ' </span>'
						}
						var html = '<span style="color: ' + setColor('油石比', lastItemPB.ysb.toFixed(2), d.ysb.toFixed(2), 0, 0) +
							';"> ' + d.ysb.toFixed(2) + ' </span>';
						return html;
					},
				}
			]
		],
		data: productList,
		even: true,
		done: function(res, curr, count) {
			console.log(v4 + "-" + v5 + "-" + v1 + "-" + v2 + "-" + v3);

			if (data.change) {
				if (v4 && v5) {
					myAuto1.play();
					v4 = false;
					myAuto1.onended = function() {
						myAuto2.play();
						v5 = false;
					};
				} else if (v4) {
					myAuto1.onended = function() {

					};
					myAuto1.play();
					v4 = false;
				} else if (v5) {
					myAuto2.play();
					v5 = false;
				}
			}
		}
	});

}


function setBjType(gz,hhl_type,fileName, setVal, val, setVal1, val1){
	$.each(gz, function(i, item) {
		if (item.setting_name == fileName && item.hhl_type==hhl_type && (item.yccd=="严重"|| item.yccd=="一般") && item.is_yybj==1) {
			if (item.settingGroup == "LEFT") //括号外的数字
			{
				if (val - setVal > item.ed_size) {
					if(fileName=="仓1" || fileName=="仓2" || fileName=="仓3" || fileName=="仓4" ||
					fileName=="仓5" || fileName=="仓6" || fileName=="粉料1" || fileName=="粉料2" ||  fileName=="回收粉" ||
					 fileName=="回收料" || fileName=="沥青"){
						 v4=true;
					 }else if(fileName=="油石比"){
						 v5=true;
					 }else if(fileName=="混合料出料"){
						 v6=true;
					 }
				} 
			} else { //括号内的数字
				if (val1 - setVal1 > item.ed_size) {
					if(fileName=="仓1" || fileName=="仓2" || fileName=="仓3" || fileName=="仓4" ||
					fileName=="仓5" || fileName=="仓6" || fileName=="粉料1" || fileName=="粉料2" ||  fileName=="回收粉" ||
					 fileName=="回收料" || fileName=="沥青"){
						 v4=true;
					 }else if(fileName=="油石比"){
						 v5=true;
					 }else if(fileName=="混合料出料"){
						 v6=true;
					 }
				} 
			}
		}
	});
	
}

function setColor(fileName, setVal, val, setVal1, val1) {
					var gz = JSON.parse(localStorage.getItem("gz")).list;
					var color = "";
					$.each(gz, function(i, item) {
						if (item.setting_name == fileName) {
							if (item.settingGroup == "LEFT") //括号外的数字
							{
								if (val - setVal < item.bg_size) {
									color = "blue";
									return false;
								} else if (val - setVal > item.ed_size) {
									color = "red";
									setBjType(item);
									return false;
								} else {
									color = "";
									return false;
								}
							} else { //括号内的数字
								if (val1 - setVal1 < item.bg_size) {
									color = "blue";
									return false;
								} else if (val1 - setVal1 > item.ed_size) {
									color = "red";
									setBjType(item);
									return false;
								} else {
									color = "";
									return false;
								}
							}
						}
					});
					return color;
				}
// GPS
var gpsUrl = socktHost + 'gps';

// 生产数据
var productUrl = socktHost + 'product';

// 称重过磅
var weightUrl = socktHost + 'weight';









// 获取材料类型
var pbUrl = host + '/api/data/ajaxGetPB';

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



// ajax数据请求
function ajaxData(url, params, callback) {
	$.ajax({
		type: "get",
		url: url,
		data: params,
		success: function(res) {
			callback(res)
		}
	});
}

// websocket函数
function WebSocketFn(url, callback) {
	if ("WebSocket" in window) {
		// console.log("您的浏览器支持 WebSocket!");
		// 打开一个 web socket
		try {
			var ws = new WebSocket(url);
		} catch (e) {

			// debugger;
			console.log(e);
			//TODO handle the exception
		}


		ws.onopen = function(e) {
			// debugger;
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

		ws.onerror = function(e) {
			// debugger;
			//连接报错
		};

		ws.onclose = function(e) {
			//debugger;
			// 关闭 websocket
			console.log("连接已关闭...");
		};
	} else {
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
		y: y,
		m: m,
		d: d,
		h: h,
		min: minutes,
		s: s
	}

}

timeFn();
