<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
      <!-- 图片列表区域    -->
      <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li" >
          <img v-lazy="item.img_url"/>
          <div class="info">
            <p class="info-title">{{item.title}}</p>
            <div class="info-body">{{item.zhaiyao}}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//引入mui的js文件
import mui from "../../lib/mui/js/mui.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  mounted() {
    //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    //如果要操作元素了，最好在mounted里面，因为，这时候的DOM元素是最新的
    //初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); //默认进入页面，就主动请求所有图片列表的数据
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          //手动拼接出一个最完整的分类列表
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      //根据分类Id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("图片加载失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: none;
}

.photo-list {
  margin: 0;
  padding: 0 10px;
  li {
    background-color: #ccc;
    text-align: center;
    list-style-type: none;
    margin: 10px 0;
    box-shadow: 0 0 9px #999;
    position: relative;
    img{
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
      color: white;
      text-align: left;
      max-height: 92px;
      overflow: hidden;
      .info-title{
        font-size: 14px;
        color: white;
      }
      .info-body{
        font-size: 13px;
      }
    }
  }
}
</style>