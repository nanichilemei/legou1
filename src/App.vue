<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.query.id" />
    </keep-alive>

    <van-tabbar
      v-if="isshow"
      route
      active-color="#b4282d"
      inactive-color="#000"
    >
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        replace
        to="/topic"
        icon="description
"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/classify" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/mian" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
    };
  },
  watch: {
    $route(to) {
      // console.log(to);
      const arr = ["/home", "/topic", "/classify", "/cart", "/mian"];
      if (arr.includes(to.path)) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
  },
  created() {
    var userInfo = {
      openId: "170",
      nickName: "jia",
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
    };
    var openId = userInfo.openId;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    localStorage.setItem("openId", openId);
  },
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
    Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f4f4;
}
* {
  margin: 0;
  padding: 0;
}
</style>
