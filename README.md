# Vue.js-Practice
基于vue.js框架的个人练习

### 购物车练习

- 添加checkbox，只有选中的商品被纳入总价计算
- 实现二维数组的读取（使用两次v-for），对购物车商品类别进行分类

[预览地址](https://syinho.github.io/Vue.js-Practice/%E8%B4%AD%E7%89%A9%E8%BD%A6%E7%BB%83%E4%B9%A0/%E8%B4%AD%E7%89%A9%E8%BD%A6.html)

### 数字输入框组件练习
- 组件由 数字输入框组件(input-number.js) 、入口页(index.html) 、根实例(index.js) 组成
- 根实例决定入口页渲染时的初始值以及数字输入框的最大值与最小值
- 入口页调用模板，将数据从根实例传送到组件
- 组件需要检查差来自于根实例的数据类型和逻辑（预设值不得大于最大值，不得小于最小值）
- 新值被键入时，检查格式和逻辑，符合条件的话需要同样更改根实例数据
******
- 在输入框聚焦时，增加对键盘上下按键的支持
  - `@keyup.up`与`@keyup.down`
- 增加对输入框加减幅度的控制

[预览地址](https://syinho.github.io/Vue.js-Practice/%E6%95%B0%E5%AD%97%E8%BE%93%E5%85%A5%E6%A1%86%E7%BB%84%E4%BB%B6/index.html)

### 标签页练习
- 一个《哆啦A梦》的人物形象查看页
******
- 添加一个可以在入口页写入的closable属性，增加对pane组件的删除功能。closable接收的是一个布尔值，所以需要使用v-bind进行传值，否则传入值会被视为字符串
*****
- 尝试在切换pane的显示与隐藏时，使用滑动的动画

[预览地址](https://syinho.github.io/Vue.js-Practice/%E6%A0%87%E7%AD%BE%E9%A1%B5%E7%BB%83%E4%B9%A0/index.html)

### 指令练习————开发一个点击外部区域可以令其隐藏的下拉菜单

[预览地址](https://syinho.github.io/Vue.js-Practice/开发一个可从外部关闭的下拉菜单/index.html)
*****
- 扩展clickoutside.js，实现在点击按钮显示下拉菜单后，通过按下键盘的ESC键也可以关闭下拉菜单
- 按下键盘触发`keydown`事件，若是一直按着会不停触发，通过防抖来处理(或者直接监听`keyup`事件？)。通过`e.keyCode`来判断是否是`ESC`,如果是的话就调用`binding.value`的值，即指令绑定的函数
*****

*****
- 将ESC做为可选项，即允许通过v-clickoutside.esc添加对esc按键的支持.
  - 思路：指令钩子函数中的`binding`参数的`modifiers`属性可以获取指令修饰符对象，返回的是一个修饰符对象
*****
### 实时时间转换指令
[预览地址](https://syinho.github.io/Vue.js-Practice/实时时间转换指令v-time/index.html)
- 主要是掌握Date对象的几个方法，诸如Date.parse(),Date.UTC(),Date.now(),Date(),getTime()等获取当前时间戳和任意时间的时间戳的方法
*****
开发一个自定义指令v-birthday,接收一个出生日期时间戳，将它转换为已出生XX天
[预览地址](https://syinho.github.io/Vue.js-Practice/自定义指令v-birthday/index.html)
*****