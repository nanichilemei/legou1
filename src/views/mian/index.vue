<template>
  <div class="mian">
    <div class="head">
      <img
        src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"
        alt=""
        class="img"
      />
      <div class="user">用户</div>
    </div>
    <div class="content">
      <van-grid :column-num="3" :gutter="1">
        <van-grid-item text="我的订单" />
        <van-grid-item text="优惠券" />
        <van-grid-item text="我的足迹" />
        <van-grid-item text="我的收藏" @click="opencollection" />
        <van-grid-item text="地址管理" @click="openAddress" />
        <van-grid-item text="联系客服" />
        <van-grid-item text="帮助中心" />
        <van-grid-item text="意见反馈" @click="openfeedback" />
        <van-grid-item />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    opencollection() {
      this.$router.push("/mian/collection");
    },
    openAddress() {
      this.$router.push("/mian/address");
    },
    openfeedback() {
      this.$router.push("/mian/feedback");
    },
  },
};
</script>

<style lang="scss" scoped>
.mian {
  .head {
    width: 100%;
    height: 140px;
    background-color: #333;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    align-items: center;
    .img {
      width: 74px;
      height: 74px;
      border-radius: 50%;
    }
    .user {
      margin-left: 15px;
      color: #fff;
      font-size: 16px;
    }
  }
  .content {
    ::v-deep.van-grid-item {
      .van-grid-item__content {
        padding: 25px 0;
        .van-grid-item__text {
          font-size: 12px;
          line-height: 20px;
          color: #000;
        }
      }
    }
  }
}
</style>
