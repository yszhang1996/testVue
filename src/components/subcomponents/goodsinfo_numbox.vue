<template>
  <!-- 问题：max的值是通过父组件传递过来的，父组件通过异步请求得到的max，有可能当前组件渲染完成了，max还没有被获取到，会报undefine，d所以我们不知道什么时候能够拿到max，但是总归有一刻，会得到一个真正的max值
  我们可以使用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，肯定是一个合法的max数值-->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 分析 -->
</template>

<script>
//引入mui
import mui from "../../lib/mui/js/mui.js";

export default {
  mounted() {
    //初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      //每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    },
  },
  props: ["max"],
  watch:{
    //属性监听
    'max':function(newVal,oldVal){      
      mui(".mui-numbox").numbox().setOption('max',this.max);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>