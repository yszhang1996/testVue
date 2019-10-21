//入口文件
//引入Vue
import Vue from 'vue'
//引入App跟组件
import app from './App.vue'
//引入mintUI的header
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
//引入mui的样式
import './lib/mui/css/mui.min.css'

var vm = new Vue({
	el:'#app',
	render:c => c(app)
})