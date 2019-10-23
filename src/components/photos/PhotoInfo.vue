<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbsfather">
      <vue-preview :slides="list" @close="handleClose" class="thumbs"></vue-preview>
      <div style="height=300px;"></div>
    </div>
    <div class="clear1"></div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
//导入评论子组件
import comment from "../subcomponents/comment.vue";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片ID
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(element => {
            element.w = 600;
            element.h = 400;
            element.msrc = element.src;
          });
          this.list = result.body.message;
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
//   .thumbs {
//     width: 200px;
//     border: 1px #000 solid;
//   }
}
</style>