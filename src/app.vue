<template>
  <div class="app-container">
    <!-- header -->
    <mt-header fixed title="商城项目"></mt-header>

    <!-- 路由 router-view -->
	<transition name="component-fade" mode="out-in">
		<router-view></router-view>
	</transition>

    <!-- 底部tabbar曲序 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">1</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.app-container{
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  position: absolute;
  width: 100%;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: all .5s ease;
}
.component-fade-enter
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
.component-fade-leave-to{
	opacity: 0;
  transform: translateX(-100%);
}
// 改类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mint-header{
  z-index: 99;
}
</style>