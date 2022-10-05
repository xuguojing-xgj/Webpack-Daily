######  单个loader 的优化

- 在实际使用中
- 我们要用HappyPack 提供的loader 替换原来的 loader 
- 并将原有的 loader 通过 HappyPack 插件传进去

~~~js
// 初始 webpack 配置 (使用 HappyPack 前)
module.exports = {
    //...
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react'],
                }
            }
        ]
    }
}

// 使用 HappyPack 的配置

const HappyPack = require('happypack')
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'happypack/loader',
            }
        ]
    },
    plugins: {
        new HappyPack({
            loaders: {
                {
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
                },
            }
        })
    }
}
~~~

- 在 module.rules 中 使用 happypack/loader 替换了原有的babel-loader 
- 并在 plugins 中添加了 HappyPack 的插件, 将原有的babel-loader 连同它的配置一起插入了进去
