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


###### 值赋值和动态映射

- 在导入一个模块时, 对CommonJS来说获取的是一份导出值的副本； 
- 而在ES6 Module中则是值的动态映射,并且这个映射是只读的
> CommonJS 中的值赋值
```
// calculator.js
var count = 0
module.exports = {
  count: count,
  add: function(a,b) {
    count += 1
    return a+b
  }
}

// index.js 
var count = require('./calculator.js').count;
var add = require('./calculator.js').add;
console.log(count) // 0 (这里的count是calculator.js 中 count 值的副本)
add(2,3)
console.log(count) // 0 (calculator.js中的count 值改变 不会对这里的count 副本造成影响)

// 而
count += 1
console.log(count) // 1 (副本的值可以改变)

```
- index.js 中的count 是 calculator.js 中count 的一个副本, 因此在调用add函数时, 虽然更改了原本的calculator.js中的count 值
- 但是并不会对 index.js 中导入时创建的副本造成影响
- 然额, 在CommonJS 中允许对 导入的值进行更改, 我们可以在 index.js 中更改 count 和 add 将其赋予新值, 
- 同样, 由于是在index.js 创建副本, 更改之后不会影响calculator.js本身

> ES6 Module 中的动态映射

```
// calculator.js 命名导出
let count = 0
const add = function (a,b) { 
    count += 1
    return a + b
}
export {count, add}

// index.js
import {count, add} from './calculator.js'
console.log(count) // 0 (对calculator.js中的值映射)
add(2,3)
console.log(count) // 1 (实时反映 calculator.js中 count 值变化)

// count += 1; // 不可更改,会抛出 SyntaxError: "count" is read-only
```

- 在ES6 Module 中导入的变量其实是对原有值的动态映射
- index.js 中的count 是对calculator.js 中 count 值的实时反映
- 当我们通过add 函数调用更改了 calculator.js 中的 count 值时
- index.js中的count也会随之变化,并且在ES6 Module 规定不能对导入的变量进行修改, 当我们尝试修改时它会抛出一个错误
- 该变量只读错误 : SyntaxError: "count" is read-only

###### 循环依赖

- 循环依赖是指: 模块A依赖于模块B, 同时模块B又依赖于模块A
- 比如: 

```
// a.js
import { foo } from './b.js'
foo()
// b.js
import { bar } from './a.js'
bar()
```
- 一般来说在工程中应该尽量避免循环依赖的产生, 因为从软件设计的角度来说,单向的依赖关系更加清晰,循环依赖则会带来一定的复杂度.
- 但是在实际开发中, 循环依赖有时会在我们不经意之间产生. 因为当工程的复杂度上升到足够大时, 就容易出现隐藏的循环依赖关系
- 简单说 : A和B模块之间是否直接存在循环依赖的关系是容易发现的
- 但实际情况往往是A依赖于B,B依赖于C,C依赖于D,最后绕了一大圈,D又依赖于A
- 当中间模块太多时我们就很难发现A和B之间存在隐式的循环依赖了

> CommonJS 模块中的循环依赖

```
 
