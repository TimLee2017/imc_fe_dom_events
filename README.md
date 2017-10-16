# DOM事件探秘
DOM事件探秘

## 1. 事件流

* 冒泡（IE提出）
* 捕获（NetScape提出）

## 2. 事件处理程序

### 2.1 HTML 事件处理程序
HTML与JS过分耦合，多不用。

### 2.2 DOM 0级事件处理程序


### 2.3 DOM 2级事件处理程序
定义两个用于处理制定和删除事件处理程序的操作
* addEventListener()
* removeEventListener()

DOM 2级事件接收三个参数：
* 要处理的事件名
* 作为事件处理程序的函数（该事件触发的操作）
* 布尔值
    * `true`：捕获方式
    * `false`：冒泡方式。一般设置`false`。

**注意事项：**

注意绑定的事件名，在 DOM 2级事件中，都不要写 `on`。比如 DOM 0级 `btn.onclick = function(){}` 在 DOM 2级中写成 `btn.addEventListener('click', function(){}, false)`。

另外，通过`addEventListener()`添加的事件，只能通过`removeEventListener()`删除。

### 2.4 DOM 0级与2级的异同：

**相同**

* DOM 0级与 DOM 2级都可以添加多个事件。触发顺序与事件的添加顺序一致。HTML事件处理就只能添加一个事件

**不同**

* DOM 0级兼容性好。IE 8 对 DOM 0级的兼容性不好。IE 要用 IE 自己的事件处理程序。

### 2.5 IE 事件处理程序
* attachEvent()
* detachEvent()

IE 8以及之前版本，只支持事件冒泡。

### 2.6 跨浏览器的事件处理程序

使用**“能力检测”**。

tips: 
0级事件：
`element.onclick === element['onclick'] === element['on'+'click']`

使用封装
```
// 跨浏览器事件处理 
var eventUtil = {
    // 添加句柄
    addHandler: function(element, type, handler){
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on'+type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function(element, type, handler){
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on'+type] = null;
        }
    }
}

var btn3 = document.getElementById('btn3');
eventUtil.addHandler(btn3, 'click', showMessage);

```







