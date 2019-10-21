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
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">1</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
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
  overflow-x: hidden;
  position: absolute;
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
</style>