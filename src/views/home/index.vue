<template>
  <div class="home">
    <div class="header">
      <router-link class="posi" tag="div" to="/home/map">
        {{ city }}
      </router-link>
      <div class="serch" @click="openSearch">
        <van-search style="padding: 5px" disabled placeholder="搜索商品" />
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img class="rotate-img" :src="item.image_url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 居家等分类 -->
    <div class="channel">
      <div
        class="item"
        v-for="item in channel"
        :key="item.id"
        @click="openList(item.id)"
      >
        <img class="channel-img" :src="item.icon_url" alt="" />
        <div>{{ item.name }}</div>
      </div>
    </div>
    <!-- 品牌制造商 -->
    <div class="brandList">
      <div class="txt" @click="openbran">品牌制造商直供</div>
      <div
        class="item"
        v-for="item in brandList"
        :key="item.id"
        @click="openBrand(item.id)"
      >
        <img class="brimg" :src="item.new_pic_url" alt="" />
        <div class="text">{{ item.name }}</div>
        <div class="price">{{ item.floor_price }}元起</div>
      </div>
    </div>
    <!-- 新品首发 -->
    <div class="newob" @click="openGoodList(1)">
      <p class="p1">新品首发</p>
      <div class="p2">查看全部</div>
    </div>
    <div class="newgood">
      <ul class="goods">
        <li
          class="item"
          v-for="item in newGoods"
          :key="item.id"
          @click="opendetails(item.id)"
        >
          <img class="newimg" :src="item.list_pic_url" alt="" />
          <div class="p1">{{ item.name }}</div>
          <div class="p2">{{ item.goods_brief }}</div>
          <div class="p3">${{ item.retail_price }}</div>
        </li>
      </ul>
    </div>
    <!-- 人气推荐 -->
    <div class="hotob" @click="openGoodList(2)">
      <p class="p1">人气推荐.好物精选</p>
      <div class="p2">查看全部</div>
    </div>
    <div class="hotgood">
      <ul class="goods">
        <li
          class="item"
          v-for="item in hotGoods"
          :key="item.id"
          @click="opendetails(item.id)"
        >
          <img class="newimg" :src="item.list_pic_url" alt="" />
          <div class="p1">{{ item.name }}</div>
          <div class="p2">{{ item.goods_brief }}</div>
          <div class="p3">${{ item.retail_price }}</div>
        </li>
      </ul>
    </div>
    <!-- 精选专题 -->
    <div class="topicList">
      <div class="head">专题精选 <span class="simg"></span></div>
      <ul class="list">
        <li
          class="item"
          v-for="item in topicList"
          :key="item.id"
          @click="openTopicDetail(item.id)"
        >
          <img class="topimg" :src="item.item_pic_url" alt="" />
          <div class="center">
            <div class="title">{{ item.title }}</div>
            <div class="price">{{ item.price_info }}元起</div>
          </div>
          <div class="subtitle">{{ item.subtitle }}</div>
        </li>
      </ul>
    </div>
    <!-- 首页大分类 -->
    <div class="newCategoryList">
      <div class="list" v-for="item in newCategoryList" :key="item.id">
        <div class="head">{{ item.name }}好物</div>
        <ul class="goodsList">
          <li
            class="sublist"
            v-for="items in item.goodsList"
            :key="items.id"
            @click="opendetails(items.id)"
          >
            <img class="subimg" :src="items.list_pic_url" alt="" />
            <p class="p1">{{ items.name }}</p>
            <p class="p2">${{ items.retail_price }}</p>
          </li>
          <li class="sublist" @click="openList(item.id)">
            <div class="text">{{ item.name }}好物</div>
            <img
              class="right"
              src="../../assets/images/icon_go_more.png"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { index } from "@/api/home";
export default {
  name: "Home",
  data() {
    return {
      banner: null,
      channel: null,
      brandList: null,
      newGoods: null,
      hotGoods: null,
      newCategoryList: null,
      topicList: null,
      city: "",
    };
  },
  methods: {
    getBanner() {
      index().then((res) => {
        // console.log(res);
        this.banner = res.data.banner;
        this.channel = res.data.channel;
        this.brandList = res.data.brandList;
        this.newGoods = res.data.newGoods;
        this.hotGoods = res.data.hotGoods;
        this.newCategoryList = res.data.newCategoryList;
        this.topicList = res.data.topicList;
      });
    },
    // 点击跳转搜索页面
    openSearch() {
      this.$router.push("/home/search");
    },
    // 点击跳转到新品页面
    openGoodList(index) {
      let page = "/home/newgoods?flag=" + index;
      this.$router.push(page);
    },
    //点击跳转到居家等页面
    openList(id) {
      this.$router.push({ path: "/classify/goodslist", query: { id } });
    },
    // 跳转到品牌制造商页面
    openBrand(id) {
      let page = "/home/brand?id=" + id;
      this.$router.push(page);
    },
    // 跳转到品牌列表
    openbran() {
      this.$router.push("/home/bran");
    },
    // 打开专题详情页面
    openTopicDetail(id) {
      this.$router.push({ path: "/topic/detail", query: { id } });
    },
    // 打开商品详情
    opendetails(id) {
      this.$router.push({ path: "/good", query: { id } });
    },
  },
  activated() {
    this.getBanner();
  },
  created() {
    // this.getBanner();
  },
  mounted() {
    // 判断定位是否已改变
    if (this.$store.state.getCity.name) {
      this.city = this.$store.state.getCity.name;
    } else {
      var that = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            that.city = result.city;
            // 查询成功，result即为当前所在城市信息
          }
        });
      });
    }
  },
};
</script>

<style lang="scss" sceped>
@import "./index.scss";
</style>
