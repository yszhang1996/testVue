import VueRouter from 'vue-router'
//引入对应的路由组件
import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import Search from './components/tabbar/Search.vue'
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';

var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home },
		{ path: '/member', component: Member },
		{ path: '/shopcar', component: Shopcar },
		{ path: '/search', component: Search },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo },
		{ path: '/home/photolist', component: PhotoList },
		{ path: '/home/photoinfo/:id', component: PhotoInfo },
		{ path: '/home/goodslist', component: GoodsList }
	],
	linkActiveClass: 'mui-active'
})

//把路由对象暴露出去
export default router
