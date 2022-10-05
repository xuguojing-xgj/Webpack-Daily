######  多个loader的优化

- 再使用HappyPack 优化多个loader 时, 需要为每个loader 配置一个id
- 否则HappyPack 无法知道 rules 与 plugins 如何一一对应
- 下面例子中 同时对 babel-loader 和 ts-loader 进行了 HappyPack 的替换

```js
const HappyPack = require('happypack')
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=js',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=ts',
            }
        ]
    },
    plugins: {
        new HappyPack({
            id: 'js',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {}, // babel options
                }
            ]
        }),
        new HappyPack({
            id: 'ts',
            loaders: [
                {
                    loader: 'ts-loader',
                    options: {}, // ts options
                }
            ]
        })
    }
}
```

- 使用多个HappyPack loader 也就意味着要插入多个 HappyPack 的插件
- 每个插件加上id 来作为标识,  同时我们也可以为每个插件设置具体不同的配置项
- 如使用的线程数,是否开启debug模式