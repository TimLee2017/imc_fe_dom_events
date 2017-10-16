function getByClass(clsName, parent) {
    var oParent = parent ? document.getElementById(parent) : document,
        eles = [],
        elements = oParent.getElementsByTagName('*');

    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].className == clsName) {
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag() {
    // 获取标题区
    var oTitle = getByClass('login_logo_webqq', 'loginPanel')[0];

    // 鼠标拖曳
    oTitle.onmousedown = fnDown;

    // 关闭弹窗
    var oClose = document.getElementById('ui_boxyClose');
    oClose.onclick = function() {
        document.getElementById('loginPanel').style.display = 'none';
    }

    // 切换状态
    var loginState = document.getElementById('loginState');
    var stateList = document.getElementById('loginStatePanel');
    var lis = stateList.getElementsByTagName('li');
    var stateTxt = document.getElementById('login2qq_state_txt');
    var loginStateShow = document.getElementById('loginStateShow');

    loginState.onclick = function(event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble();
        }
        // 点击状态，显示状态列表
        stateList.style.display = 'block';
        event.stopPropagation();
    }

    // 鼠标滑过、离开和点击状态列表时
    for (var i = 0, l = lis.length; i < l; i++) {
        lis[i].onmouseover = function() {
            this.style.background = '#567';
        }
        lis[i].onmouseout = function() {
            this.style.background = '#fff';
        }
        lis[i].onclick = function(event) {
            event = event || window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble();
            }
            var id = this.id;
            stateList.style.display = 'none';
            event.stopPropagation();
            stateTxt.innerHTML = getByClass('stateSelect_text', id)[0].innerHTML;
            loginStateShow.className = '';
            loginStateShow.className = 'login-state-show ' + id;
        }
    }
    document.onclick = function() {
        stateList.style.display = 'none';
    }
}

function fnDown(event) {
    event = event || window.event;

    // 获取弹框
    var oDrag = document.getElementById('loginPanel');

    // 光标按下时，光标和面板之间的距离.
    var disX = event.clientX - oDrag.offsetLeft;
    var disY = event.clientY - oDrag.offsetTop;

    // 移动
    document.onmousemove = function(event) {
        event = event || window.event;
        fnMove(event, disX, disY);
    }

    // 释放鼠标
    document.onmouseup = function(event) {
        document.onmousemove = null;
        document.onmouseup = null;
    }

}

function fnMove(e, posX, posY) {

    var oDrag = document.getElementById('loginPanel');

    var l = e.clientX - posX; // l: left
    var t = e.clientY - posY; // t: top

    // 获取窗口的宽 winW、高 winH。
    winW = document.documentElement.clientWidth || document.body.clientWidth;
    winH = document.documentElement.clientHeight || document.body.clientHeight;
    maxW = winW - oDrag.offsetWidth - 10;
    maxH = winH - oDrag.offsetHeight;

    if (l < 0) {
        l = 0;
    } else if (l > maxW) {
        l = maxW;
    }

    if (t < 0) {
        t = 10;
    } else if (t > maxH) {
        t = maxH;
    }

    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
}