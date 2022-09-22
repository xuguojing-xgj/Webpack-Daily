###### ES6 Module

- 2015年6月 TC39标准委员会正式发布了 ES6(ECMAScript 6.0) JavaScript 语言才具备了模块特性

###### ES6模块

```
// calculator.js
export default {
    name: 'calculator',
    add: function(a,b) {
        return a + b
    }
}

// index.js
import calculator from './calculator.js'
const num = calculator.add(2,3)
console.log(num) // 5
```

- ES6 Module 也是将每个文件作为一个模块, 每个模块都拥有自身的作用域, 不同的是导出和导入语句
- ES6 Module 版本中将 import 和 export 作为保留关键字加了进来

###### ES6 Module导出
- 在ES6 Module中 使用export命令导出模块, export有两种形式: 
- 命名导出  默认导出
``` 
// 写法1
export const name = 'calculator'
export const add = function (a,b) {return a + b}

// 写法2
const name = 'calculator'
const add = function (a,b) {return a + b}
export {
    name, add
}

// 再使用 export {...} 进行命名导出时 可以使用 as 关键字对变量重名名
export {name as MyName , add as getSum} // 在导入时即为 MyName 与 getSum

// 在模块中的默认导出 只能有一个 如: 

export default {
    name: 'calculator',
    add: function (a,b) {return a + b}
}

// 我们可以将 export default 理解为对外输出了一个名为 default 的变量.
// 因此 不需要像命名导出一样进行变量声明, 直接导出值即可

export default 'this is calculator.js' // 导出字符串
export default class {...} // 导出类
export default function () {...} // 导出匿名函数
```
 
