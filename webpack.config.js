const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    },
    module: {
        loaders: [ //配置加载器
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                exclude:/(node_modules|bower_components)/,
                loader: "babel-loader",    
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ]
}


