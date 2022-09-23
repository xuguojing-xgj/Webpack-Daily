###### 动态与静态

- CommonJS与ES6 Module 最本质的区别在于 CommonJS 对模块的依赖解决是**动态的**, 而ES6 Module 则是 **静态的**
- '动态'的含义是: 模块依赖关系的建立发生在代码运行阶段
- '静态'的含义是: 模块依赖关系的建立发生在代码编译阶段

> CommonJS例子:

```
// calculator.js
module.exports = {name : 'calculator'}
// index.js
const name = require('./calculator.js').name;
```

- 模块index.js加载calculator.js会执行calculator.js中的代码, 并将其module.exports对象作为require函数的返回值返回
- require的模块路径可以动态指定 文档地址: https://webpack.docschina.org/guides/dependency-management/#require-with-expression
- 支持传入一个表达式, 甚至可以通过if语句判断是否加载某个模块
- 因此在CommonJS模块被执行前, 我们并没有办法明确依赖关系,模块的导入以及导出发生在代码运行阶段

> ES6 Module例子:

```
// calculator.js
export name = 'calculator';
// index.js
import { name } from './calculator.js';

```

- ES6 Module的导入,导出语句都是声明式的,他不支持将表达式作为导入路径
- 并且导入, 导出语句必须位于模块的顶层作用域
- 因此, 我们说ES6 Module是一种静态的模块结构, 在ES6 Module代码编译阶段就可以分析出模块的依赖关系
- 它相比于CommonJS有以下几点优势
- 死代码检测和排除(未被调用的代码, 打包时去掉未曾使用过的模块, 以减小打包体积)
- 模块变量类型检查
- 编译器优化 

