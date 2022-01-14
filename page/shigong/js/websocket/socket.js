window.httpSGSocket={

    connect:function(url,subscribeUrl,sendPath,messageBody,subscribeCallback){
        //连接地址： http://test.zgdrkj.cn:8081/CjManager/gs-guide-websocket

        // 监听地址：/user/{userid}/topic/getsb

        
        var socket = new SockJS(url,subscribeUrl,sendPath,messageBody,subscribeCallback)
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.send(sendPath, {}, JSON.stringify(messageBody));

            stompClient.subscribe(subscribeUrl, function (greeting) {
                subscribeCallback&&subscribeCallback(greeting.body);
            });
        });

        return stompClient;

    },

    disconnect:function(stompClient){
        if (stompClient !== null) {
            stompClient.disconnect();
        }
    },

    sendMessagage:function(stompClient,path,messageBody){
        // 请求地址：/app/sbsendMsg
        //JSON.stringify({'userId': $("#name").val(), 'sbId': ['sb_0001']})
        stompClient.send(path, {}, JSON.stringify(messageBody));
    }
}