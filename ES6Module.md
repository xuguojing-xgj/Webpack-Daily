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
export { name, add }

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
###### ES6 Module导入

- ES6 Module 中使用 `import` 语法导入模块

- 第一种命名导出和命名导入时 (也可以是 按需导出 和 按需导入)
```
// calculator.js
const name = 'calculator'
const add = function (a,b) {return a + b}
export { name, add }

// index.js
import {name , add } from './calculator.js'
add(2,3) // 5

/**
* 与命名导出类似的, 我们可以通过 as 关键字对导入的变量重命名
*/

import {name , add as calculateSum} from './calculator.js'
calculateSum(4,5) // 9

/**
* 在导入多个变量时 我们可以采用整体导入的方式
*/

import * as calculator from './calculator.js'
console.log(calculator.name)
console.log(calculator.add(2,3))

/**
* 使用import * as <myModule> 可以把所有导入的变量作为属性值添加到 <myModule> 
* 对象中, 从而减少对当前作用域的影响
*/
```

- 最后默认导出和导入 
```
// calculator.js
export default {
    name: 'calculator',
    add: function (a,b) {
            return a + b
    }
}

// index.js
import myCalculator from './calculator.js'
myCalculator.add(2,3)

/**
* 对于默认导出来说 import 后面直接跟变量名, 它指代了 calculator.js 中默认导出的值
* 从原理上可以这样理解 : 
*/

import { default as myCalculator } from './calculator.js'
```

- 混合导入例子
- 这里的React 对应的是该模块的默认导出, Component则是其中命名导出的一个变量

```
// index.js
import React, {Component} from 'react'

```

###### 复合写法

- 在工程中,需要把某个模块导入之后立即导出
- 比如专门用来集合所有页面或者组件的入口文件, 此时可以采用复合写法

```
export { name , add } from './calculator.js'
```

- 复合写法目前只支持被导入模块,通过命名导出的方式暴露出来的变量
- 默认导出则没有对应的复合形式, 只能将导入和导出拆开来写

```
import calculator from './calculator.js'
export default calculator
```
