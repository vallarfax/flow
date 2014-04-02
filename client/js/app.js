$(function() {
    var s = new WebSocket("ws://192.168.33.190:8765");
    console.log(s);

    s.onmessage = function (event) {
        console.log(event.data);
    };

    s.onopen = function (event) {
        s.send('Hello!');
    };

    setTimeout(function() {
        s.close();
    }, 10000);
});
