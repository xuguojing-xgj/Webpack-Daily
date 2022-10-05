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