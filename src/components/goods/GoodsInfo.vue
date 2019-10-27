<template>
  <div class="goodsinfo-container">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <swiper :swipelist="Swipes" :isfull="false"></swiper>
    </div>
    <!-- 商品购买区域 -->

    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            <span>
              市场价：¥
              <del>{{goodsinfo.market_price}}</del>
            </span>
            <span>
              销售价：¥
              <span class="now_price">{{goodsinfo.sell_price}}</span>
            </span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="this.goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量
            1.经过分析发现：按钮属于goodsinfo页面，数字属于numberbox组件
            2.由于涉及到了父子组件的潜逃了，所以无法直接在goodsinfo页面中获取到选中的商品数量值
            3.怎么解决这个问题：设计到了子组件像父组件传值（事件调用机制）
            4.事件调用的本质，父向子传递方法，子调用这个方法，同事吧数据当做参数传递给这个方法
             -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->

    <div class="mui-card">
      <div class="mui-card-header">
        <span>商品参数</span>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time|dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//引入轮播图组件
import swiper from "../subcomponents/swiper.vue";
//引入数字选择框组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //路由参数中的id挂在到data上，方便调用
      Swipes: [], //轮播图的数据
      goodsinfo: {}, //获取到的商品的信息
      ballFlag:false,//控制小球显示隐藏
      selectedCount:1//保存用户选中的商品数量，默认购买一件
    };
  },
  created() {
    this.getSwipe();
    this.getGoodsInfo();
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
    },
    getGoodsInfo() {
      //获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id){
      //点击使用编程式导航跳转到图文介绍页面
      this.$router.push({name:"goodsdesc",params:{id}})
    },
    goComment(id){
      //点击跳转到评论页面
      this.$router.push({name:"goodscomment",params:{id}})
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag;
      //拼接出一个，要保存到store中car数组里的商品信息对象
      var goodsinfo1={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
      //调用store中的mutations，来讲商品加入购物车
      this.$store.commit("addToCar",goodsinfo1);
    },
    beforeEnter(el){
      el.style.transform ="translate(0,0)";
    },
    enter(el,done){
      el.offsetWidth;
      /* 小球动画优化思路
      1.先分析导致动画不准确的本质原因：我们把小球最终位移到的位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      2.只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
      3.因此，我们经过分析的到结论：不能把位置的横纵坐标直接写死，而是应该根据不同情况动态计算这个坐标值；
      4.经过分析。得出解题思路：先得到徽标（购物车）的横纵坐标，再得到小球的横纵坐标，然后让其XY值求差，得到的结果，就是横纵坐标要位移的距离
      5.如何获取徽标和小球的位置，domObject.getBoundingClientRect();
      */
     //获取小球的位置
      const ballPosition=this.$refs.ball.getBoundingClientRect();
      const badgePosition=document.getElementById('badge').getBoundingClientRect();
      const xDist=badgePosition.left-ballPosition.left;
      const yDist=badgePosition.top-ballPosition.top;
      console.log(xDist,yDist);
      
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition="all 0.5s cubic-bezier(.52,-0.15,.63,.14) ";
      done();
    },
    afterEnter(el){
      this.ballFlag=!this.ballFlag;      
    },
    getSelectedCount(count){
      //当子组件吧选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount=count;
    },
    gettest(){
      console.log(this.goodsinfo.stock_quantity);
      
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball{
    width: 15px;
    height: 15px;
    border-radius:50%;
    background-color: red; 
    position: absolute;
    z-index: 99;
    top: 480px;
    left: 150px;
  }
}
</style>