var serverUrl = '';
//var  serverUrl='http://192.168.0.15:8080';

function getServerUrl(zd) {
	var serverUrl = "";
	switch (zd) {
		case "两江站":
			serverUrl = api_url + 'liangjiang';
			break;
		case "璧山站":
			serverUrl = api_url + 'jbz';
			break;
		case "双石站":
			serverUrl = api_url + 'shuangshi';
			break;
		case "朱沱站":
			serverUrl = api_url + 'zhutuo'
			break;
		case "广州站":
			serverUrl = api_url + 'guangzhou'
			break;
		case "中山站":
			serverUrl = api_url + 'zs'
			break;
		case "宏裕站":
			serverUrl = api_url + 'hongyu'
			break;
		case "源峰林站":
			serverUrl = api_url + 'yuanfenglin'
			break;
		case "沥青一厂":
			serverUrl = api_url + 'lqonechang'
			break;
		case "沥青二厂":
			serverUrl = api_url + 'lqtwochang'
			break;
		case "沥青三厂":
			serverUrl = api_url + 'lqthreechang'
			break;
		case "丰都站":
			serverUrl = api_url + 'fengdu'
			break;
		case "鑫丰站":
			serverUrl = api_url + 'xinfeng'
			break;
		case "任丘站":
			var shebei_name = localStorage.getItem("shebei_name");
			if('SB-A5000' == shebei_name){
				serverUrl = api_url + 'renqiu5000'
			}
			if('SB-A3000'== shebei_name){
				serverUrl = api_url + 'renqiu3000'
			}
			break;
		case "新基地":
			serverUrl = api_url + 'xjz'
			break;
		case "任丘水稳站":
			serverUrl = api_url + 'sw'
			break;
		case "石柱站":
			serverUrl = api_url + 'shizhu'
			break;
		case "江津站":
			serverUrl = api_url + 'jiangjin'
			break;
	}
	return serverUrl;
}

function getServerSocketUrl(zd) {
	var serverUrl = "";
	switch (zd) {
		case "两江站":
			serverUrl = socket_url + 'liangjiang/';
			break;
		case "璧山站":
			serverUrl = socket_url + 'jbz/';
			break;
		case "双石站":
			serverUrl = socket_url + 'shuangshi/';
			break;
		case "朱沱站":
			serverUrl = socket_url + 'zhutuo/'
			break;
		case "广州站":
			serverUrl = socket_url + 'guangzhou/'
			break;
		case "中山站":
			serverUrl = socket_url + 'zs/'
			break;
		case "宏裕站":
			serverUrl = socket_url + 'hongyu/'
			break;
		case "源峰林站":
			serverUrl = socket_url + 'yuanfenglin/'
			break;
		case "沥青一厂":
			serverUrl = socket_url + 'lqonechang/'
			break;
		case "沥青二厂":
			serverUrl = socket_url + 'lqtwochang/'
			break;
		case "沥青三厂":
			serverUrl = socket_url + 'lqthreechang/'
			break;
		case "丰都站":
			serverUrl = socket_url + 'fengdu/'
			break;
		case "鑫丰站":
			serverUrl = socket_url + 'xinfeng/'
			break;
		case "任丘站":
			var shebei_name = localStorage.getItem("shebei_name");
			if('SB-A5000' == shebei_name){
				serverUrl = socket_url + 'renqiu5000/'
			}
			if('SB-A3000'== shebei_name){
				serverUrl = socket_url + 'renqiu3000/'
			}
			break;
		case "新基地":
			serverUrl = socket_url + 'xjz/'
			break;
		case "任丘水稳站":
			serverUrl = socket_url + 'sw/'
			break;
		case "石柱站":
			serverUrl = socket_url + 'shizhu/'
			break;
		case "江津站":
			serverUrl = socket_url + 'jiangjin/'
			break;
	}
	return serverUrl;
}
