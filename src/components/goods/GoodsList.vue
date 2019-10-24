<template>
  <div class="good-list">
    <div class="goods-item">
      <img
        src="https://img.alicdn.com/bao/uploaded/i2/895265428/TB2IdDDqf9TBuNjy1zbXXXpepXa_!!895265428.jpg_240x5000Q50s50.jpg_.webp"
        alt
      />
      <h1 class="title">小米 小米note 16G双网通版本</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥899</span>
          <span class="old">¥1099</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
    <!-- <router-link tag="div" :to="'/home/goodsinfo/'+item.id" class="goods-item" v-for="item in goodslist" :key="item.id">
      <img :src="item.img_url" />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{item.sell_price}}</span>
          <span class="old">¥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->
    <!-- 使用路由跳转的第二种方法 -->
    <!-- 在网页中有两种跳转方式
    1.使用a标签的形式叫做标签跳转
    2.使用window.loaction.href的形式，叫做编程式导航-->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{item.sell_price}}</span>
          <span class="old">¥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img
        src="https://img.alicdn.com/bao/uploaded/i2/895265428/TB2IdDDqf9TBuNjy1zbXXXpepXa_!!895265428.jpg_240x5000Q50s50.jpg_.webp"
        alt
      />
      <h1 class="title">小米 小米note 16G双网通版本</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥899</span>
          <span class="old">¥1099</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1, //分页页数
      goodslist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    getGoodList() {
      //获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
            this.goodslist[8].img_url =
              "https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2200742109405/O1CN01qimRWo2JLXYxOdiMQ_!!0-item_pic.jpg_250x250.jpg";
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodList();
      this.goodslist[10].img_url =
        "https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/595397331/O1CN01oHaBHD241e7clGwQp_!!0-item_pic.jpg_250x250.jpg_.webp";
    },
    goDetail(id) {
      //使用JS的形式进行路由导航并不可取,因为vue-router为我们封装好了一个跳转的方法
      //注意this.$route和this.$router不一样！！！
      //$route是路由【参数对象】，所有路由中的参数，params，query都属于它
      //$router是一个自由【导航对象】，用它可以方便的使用js代码，实现路由的前进、后退、跳转到新的URL地址
      //最简单的
      // this.$router.push("/home/goodsinfo/"+id);
      //传递对象
      // this.$router.push({path:"./home/goodsinfo/"+id});
      //传递一个命名的路由
      this.$router.push({ name: "goodsinfo", params: { id } });
      //如果提供了path，params会被忽略
    }
  }
};
</script>

<style lang="scss" scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>