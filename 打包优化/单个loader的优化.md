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

