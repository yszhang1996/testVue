const path = require('path')
const webpack = require('webpack')//启用热更新的第二步
const htmlWebpackPlugin = require('html-webpack-plugin')//导入在内存中生成HTML页面的插件
//这个插件有两个作用：
//1. 自动在内存中根据指定页面生成一个内存的页面
//2. 自动把打包好的bundle.js追加到页面中去
//只要是插件，都一定要放到plugins节点中去

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  devServer: {
    //配置dev-server命令参数的第二种形式，相对来说，麻烦一点
    // --open --port 10016 --hot
    open: true,//自动打开浏览器
    port: 10016,//设置启动时候的运行端口
    hot: true//启用热更新的第一步
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  //new一个热更新的模块对象，这是启用热更新的第三步
    new htmlWebpackPlugin({
      //创建一个在内存中生成HTML页面的插件
      template: path.join(__dirname, './index.html'),
      //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html' //指定生成的页面的名称
    })
  ],
  module: {
    //这个节点用于配置所有第三方模块加载器
    rules: [
      //所有第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },//配置处理.css文件的第三方loader规则
      /* webpack处理第三方文件类型的过程 
      1.发现这个要处理的文件不是js文件，然后就去配置文件中，查找有没有对应的第三方loader规则
      2.如果能找到对应的规则，就会调用对应的loader处 理这种文件类型
      3.在调用loader的时候，是从后往前调用的，例：上述代码就是先调用css-loader再调用style-loader
      4.当最后一个loader调用完毕，会把处理的结果，直接交给webpack进行打包合并，最终输出到bundle.js中去
      */
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//这是配置处理less文件的第三方loader规则
      {test:/\.(ttf|eot|svg|woff|woff2|jpg|png|webp)$/,use:'url-loader'},//处理字体文件的loader
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//这是配置Babel来转换高级的ES语法
      {test:/\.vue$/,use:'vue-loader'}, //这是处理vue文件的配置项
    ]
  },
  /* resolve:{
		alias:{
			"vue$":"vue/dist/vue.js"
		}
	} */
}

