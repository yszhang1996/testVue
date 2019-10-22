<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入内容（限30字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormat}}</div>
        <div class="cmt-body">{{item.content === 'undefined' ? '此用户很懒，什么都没留下' : item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页评论
      comments: [], //评论数据
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论信息失败！");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      //校验评论内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空");
      }
      //post提交参数1：url地址，参数2：提交给服务器的数据对象（content：this.msg）
      //参数3：定义提交时，表单中数据的格式（emulateJSON.true）
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg
        })
        .then(function(result) {
          /* if (result.body.status === 0) {
            //1.拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg='';
          } */ //上面的方法虽然可以让用户自己的评论显示在一楼，但是有一个小bug，除非手动刷新，
          //不然无法看到与自己评论时间相近的评论，下面是解决方法，同时也有一个问题，之前翻看过得评论需要再次加载，各有利弊，自行选择
          this.msg = "";
          Toast("评论成功");
          this.pageIndex = 1;
          this.$http
            .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
            .then(result => {
              if (result.body.status === 0) {
                this.comments=null;
                this.comments = result.body.message;
              } else {
                Toast("获取评论信息失败！");
              }
            });
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  margin-bottom: 5px;
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 10px;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>