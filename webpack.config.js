const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  optimization: {
    minimize: false //关闭代码压缩，可选
  },
  entry: "./src/index.ts",
  // devtool: "inline-source-map",
  // devServer: {
  //   contentBase: './dist'
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false // 关闭webpack的箭头函数，可选
    }
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: "babel-loader",
          options: {
            // 设置定义环境
            presets: [
              [
                // 指定环境的 插件
                "@babel/preset-env",
                {
                  "targets": {
                    "chrome": "58",
                    "ie": "11"
                  },
                  "corejs": "3",
                  "useBuiltIns": "usage" //按需加载
                }
              ]
            ]
          }
        }, {
          loader: "ts-loader",
        }],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            //当加载的图片小于limit时，会直接用url-loader将图片的格式编译成base64格式的
            //当加载图片大于limit时，需要使用file-loader来编译，并且打包到dist文件夹下面
            options: {
              limit: 16000,
              name: 'img/[name].[hash:8].[ext]' // 对打包后的图片命名进行相关的处理，表示在dist文件夹下建一个img文件夹保存图片，同时图片的名字是原来的名字加上8位hash值，再加上图片的扩展名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title: "snake"
      template: './src/style/index.html'
    })
  ]
}