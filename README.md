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
```JavaScript
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


## 3. 事件对象

在触发DOM上的事件是都会产生一个对象。

**事件对象event**

### 3.1 DOM中的事件对象

#### (1) `type`属性

用于获取事件类型

```JavaScript
function showMessage(event) {
    alert(event.type);
}
```
点击可以显示 `click`

#### (2) `target`属性
用于获取事件目标

#### (3) `stopPropagation()`方法
阻止事件冒泡
```javascript
function showMessage(event) {
    alert(event.target.nodeName);
    event.stopPropagation();
}
```

#### (4) `preventDefault()`方法
阻止事件的默认行为
```html
<a href="#">超链接</a>
```


### 3.2 IE中的事件对象

#### (1) `type`属性
用于获取事件类型

#### (2) `srcElement`属性
用于获取事件目标

#### (3) `cancelBubble`属性
设置为`true`表示阻止事件冒泡，`false`不阻止。

#### (4) `returnValue`属性
设置为`false`表示阻止事件的默认行为。



### 3.3 兼容DOM与IE的封装处理
```javascript
var eventUtil = {
    // 添加句柄
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 获取事件
    getEvent: function(event) {
        return event ? event : windown.event;
    },
    // 获取事件的类型
    getType: function(event){
        return event.type;
    },
    // 获取事件的元素
    getElement: function(event){
        return event.target || event.srcElement;
    },
    // 阻止事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble=true;
        }
    }
}
```


## 4. 鼠标事件

以QQ面板拖拽效果为例。

### 4.1 步骤
* 在标题区域按下
* 在页面中移动
* 释放鼠标时停止移动

鼠标的两个视口中的位置信息（不包括页面滚动距离）：
```
clientX
clientY
```

`mousemove`当鼠标指针在元素内部移动时重复地触发。


## 5. 键盘事件

以抽奖为例。

### 5.1 键盘事件

* keyDown：按住键盘不放开，会重复触发。（针对任何键）
* keyPress：仅按下字符键时有效。按住不放会重复触发。（针对字符键）
* keyUp：当用户释放键盘上的键是触发。




