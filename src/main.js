//入口文件
//引入Vue
import Vue from 'vue'
//引入App跟组件
import app from './App.vue'
//引入mintUI的header
import { Header,Swipe,SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
//引入mui的样式
import './lib/mui/css/mui.min.css'
//引入mui扩展样式
import './lib/mui/css/icons-extra.css'
//引入路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//引入自己的router.js路由模块
import router from './router.js'
//引入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)
//引入app根组件
var vm = new Vue({
	el:'#app',
	render:c => c(app),
	router //挂载路由对象到VM实例上
})