###### CommonJS模块

- CommonJS 中规定每个文件是一个模块. 每个模块都有自己的作用域

```
// calculator.js
var name = 'calculator.js'

// index.js
var name = 'index.js'
require('./calculator.js')
console.log(name) // index.js
```
###### CommonJS导出

- 导出是一个模块向外暴露自身唯一的方式. 在CommonJS中通过module.exports 可以导出模块中的内容, 如下:
```
// 导出 一个对象 包含 name 和 add 两个属性
module.exports = {
  name: 'calculator',
  add: function(a,b) {
    return a + b;
  }
}

module.exports = {...} // 模块自身逻辑
```
- module.exports 用来指定模块要对外暴露的哪些内容, CommonJS 也支持另一种简化的导出方式 -> exports
```
exports.name = 'calculator'
exports.add = function(a,b) {return a + b;}
```

- 上面代码可以理解为 在机制内将 exports 指向 module.exports, 而 module.exports 在初始化时是一个空对象

``` 
var module = {
  exports: {},
}

var exports = module.exports

// exports.add 就相当于 在 module.exports 对象上添加一个属性
```
###### CommonJS导入

- 在CommonJS中使用require 语法进行模块导入

```
// calculator.js
module.exports = {
  add: function (a,b) {return a + b}
};
// index.js
const calculator = require('./calculator.js')
cosnt num = calculator.add(2,3)
console.log(num) // 5
```
