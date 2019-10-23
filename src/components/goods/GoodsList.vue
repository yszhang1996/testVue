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
  </div>
</template>

<script>
export default {};
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