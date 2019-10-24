<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <swiper :swipelist="Swipes"></swiper>
    </div>
    <!-- 商品购买区域 -->

    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
    </div>

    <!-- 商品参数区域 -->

    <div class="mui-card">
      <div
        class="mui-card-header mui-card-media"
        style="height:40vw;background-image:url(../images/cbd.jpg)"
      ></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>Posted on January 18, 2016</p>
          <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">Like</a>
        <a class="mui-card-link">Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
//引入轮播图组件
import swiper from '../subcomponents/swiper.vue';
export default {
  data() {
    return {
        id:this.$route.params.id,//路由参数中的id挂在到data上，方便调用
        Swipes:[],//轮播图的数据

    };
  },
  created() {
      this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.Swipes = result.body.message;
        } else {
          Toast("获取图片详情失败");
        }
      });
    }
  },
  components:{
      swiper
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
</style>