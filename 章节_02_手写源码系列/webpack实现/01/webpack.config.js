let path = require("path")
let myPlugin = require("./plugin/myPlugin")
module.exports = {
    mode: "development",  //开发模式
    entry: "./src/index.js",  //打包的入口
    output: { //打包输出目录
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, "loader", "style-loader"),
                    path.resolve(__dirname, "loader", "less-loader")
                    // 从下到上
                    // "style-loader", //把style写入html
                    // "css-loader",   //css--commonjs
                    // "less-loader"  //把less转css
                ]
            }
        ],
        plugins: [
            new myPlugin()
        ]
    }
}