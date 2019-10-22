<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/pp.1.393d352f.AbwdGkWc4K-2SjVIcBSBIg.jpg"
          />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dataFormat}}</span>
              <span>点击：{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//引入toast
import {Toast} from "mint-ui";

export default {
    data(){
        return {
            newslist:[]//新闻列表
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList(){
            //获取新闻列表
            this.$http.get('api/getnewslist').then(result=>{
                if (result.body.status === 0) {
                    //把数据保存到data
                    this.newslist=result.body.message;
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 18px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content:space-between;
    }
  }
}
</style>