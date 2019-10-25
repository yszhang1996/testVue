<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for循环一定要使用v-bind绑定 -->
      <!-- 将来谁使用轮播图的组件，谁为我们传递Swipes -->
      <!-- 此时，轮播图应该是父组件向子组件传值 -->
      <mt-swipe-item v-for="item in swipelist" :key="item.id">
        <img :src="item.img||item.src" :class="{full:isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["swipelist","isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 300px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
/*     &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(1) {
      background-color: blue;
    }
    &:nth-child(1) {
      background-color: green;
    } */
  }
}
.full{
  width: 100%;
}
</style>