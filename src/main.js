//入口文件
//引入Vue
import Vue from 'vue'
//引入App跟组件
import app from './App.vue'
//引入vuex
import Vuex from 'vuex';
Vue.use(Vuex)
/* 每次刚进入网站，肯定会调用main.js在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中*/
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
	// ...
	state:{
		car:car
			//将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子{id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
	},
	mutations:{
		addToCar(state,goodsinfo){
			//点击加入购物车，把商品信息保存到stare的car上
			/* 1.如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
			2.如果没有，则直接把商品数据，push到car中即可 */
			var flag= false //判断购物车中有没有当前要加入的商品的标识符
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count +=parseInt(goodsinfo.count)
					flag=true
					return true
				}
			})
			if (!flag) {
				this.state.car.push(goodsinfo)
			}
			//当更新car之后，把car数组，存储到本地的localstorage中
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			//修改购物车中商品的数量值
			/* 分析 */
			state.car.some(item=>{
				if (item.id==goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			//修改完商品的数量之后，把最新的数据保存到本地存储
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFromCar(state,id){
			//根据Id，从store中的购物车中删除对应的那条商品数据
			state,car.some((item,i)=>{
				if (item.id ==id) {
					state.car.splice(i,1)
					return true
				}
			})
			//删除完毕，将最新的数据保存到本地存储
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id==info.id){
					item.selected=info.selected
				}
			})
			//把最新的购物车商品状态保存到store和本地存储中
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters:{
		//相当于计算属性，也相当于filters
		getAllCount(state){
			var c=0;
			state.car.forEach(item=>{
				c +=item.count
			})
			return c
		},
		getCoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count
			})
			return o
		},
		getGoodsSelected(state){
			var o ={}
			state.car.forEach(item=>{
				o[item.id]=item.selected
			})
			return o
		},
		getGoodsCountAmount(state){
			var o={
				count:0,
				amount:0,
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count
					o.amount+=item.price*item.count
				}
			})
			return o
		}
	},
})
//引入mintUI的header
/* import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button) */
//引入全部的Mint-UI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)
//引入mui的样式
import './lib/mui/css/mui.min.css'
//引入mui扩展样式
import './lib/mui/css/icons-extra.css'
//安装mintUI提供的懒加载
/* Vue.use(Lazyload); */
//引入vue的缩略图预览插件
import VuePreview from 'vue-preview'
// 安装缩略图预览插件
Vue.use(VuePreview)

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
//引入格式化时间的插件
import moment from 'moment';
//引入全局过滤器
Vue.filter('dataFormat', function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})
//引入Vue-Resource请求的全局路径
Vue.http.options.root='http://www.liulongbin.top:3005';
//全局设置post提交时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;
//引入app根组件
var vm = new Vue({
	el:'#app',
	render:c => c(app),
	router, //挂载路由对象到VM实例上
	store,//挂载store状态管理对象
})