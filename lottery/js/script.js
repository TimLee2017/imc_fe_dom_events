var data = [
    'iPhone 8', 'iPad', '小米笔记本', '佳能相机', '惠普打印机', '谢谢参与', '50元充值卡', '1000元超市购物券'
];

var timer = null;

var flag = 0;   // 抽奖停止状态：0

window.onload = function() {
    var play = document.getElementById('play');
    var stop = document.getElementById('stop');

    // 开始抽奖 
    play.onclick = playFun;
    stop.onclick = stopFun;

    // 键盘事件
    document.onkeyup = function(event) {
        event = event || window.event;
        // console.log(event.keyCode);  // 查看回车键 keyCode == '13';
        // 只能按回车
        if (event.keyCode==13) {
            if (flag==0) {
                flag = 1;
                playFun();
            } else {
                flag = 0;
                stopFun();
            }
        }

    }

}

function playFun() {
    var title = document.getElementById('title');
    var play = document.getElementById('play');

    // 先把原来的定时器关了，防止越来越快
    clearInterval(timer);

    play.style.background = "#999";

    timer = setInterval(function() {
        var random = Math.floor(Math.random() * data.length); 
        title.innerHTML = data[random];
    }, 50)
}

function stopFun() {
    clearInterval(timer);
    var play = document.getElementById('play');
    play.style.background = '#036';
}






















