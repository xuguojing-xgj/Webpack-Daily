##### Webpack-Daily webpack file 入门、进阶、与调优

 * webpack 是一个开源的 JavaScript 模块打包工具
 * 其中核心功能就是 :
 * 解决模块之间的依赖, 把各个模块按照特定的规则和顺序组织在一起, 最终合并为一个js 文件 (或多个) 
 * 这个过程就叫 '模块打包'

###### 何为模块

- 在项目工程中引入一个日期处理的npm包 或者 编写一个提供方法的JS文件 这些包和文件 都可以称为模块


###### Webpack 优势

- Webpack 默认支持多种模块标准, 包括 AMD, CommonJS, 以及最新的ES6模块 
- Webpack 有完备的代码分片解决方案, 它可以分割打包后的资源,在首屏只加载必要的部分, 将不太重要的功能放到后面动态加载
对于较大体积的项目来说尤为重要, 可以有效的减小资源体积, 提升首页渲染速度
- Webpack 可以处理各种类型的资源, 除了js之外 Webpack 还可以处理 样式, 图片, 模板等.. 

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
