<template>
  <div class="classify">
    <div class="search" @click="openSearch">
      <div class="ser">
        <span class="img"></span>
        <span>商品搜索,共239款好物</span>
      </div>
    </div>
    <div class="content">
      <!-- 左侧侧边栏 -->
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="item in ltlist"
            :key="item.id"
            @click="change(item.id)"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <!-- 右侧商品栏 -->
      <div class="right">
        <img :src="banner" alt="" class="banner" />
        <div class="title">--{{ title }}分类--</div>
        <ul class="list">
          <li
            class="item"
            v-for="item in rtList"
            :key="item.id"
            @click="opengoods(item.id)"
          >
            <img :src="item.wap_banner_url" alt="" class="img" />
            <div class="uname">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { indexaction, currentaction } from "@/api/classify";
export default {
  data() {
    return {
      activeKey: "",
      ltlist: [],
      rtList: [],
      banner: "",
      title: "",
    };
  },
  methods: {
    // 点击切换到另一个侧边栏分页 调用获取右侧商品的接口
    change(id) {
      this.getList(id);
    },
    // 获取到左侧侧边栏的信息 商品类
    async getSide() {
      let res = await indexaction();
      this.ltlist = res.data.categoryList;
      // 调用获取商品的接口 默认打开第一个
      this.getList(this.ltlist[0].id);
    },
    // 获取右侧商品
    getList(id) {
      currentaction({
        id,
      }).then((res) => {
        this.rtList = res.data.data.currentOne.subList;
        this.banner = res.data.data.currentOne.banner_url;
        this.title = res.data.data.currentOne.name;
      });
    },
    // 去往更细分类的界面
    opengoods(id) {
      let page = "/classify/goodslist?id=" + id;
      this.$router.push(page);
    },
    // 打开搜索界面
    openSearch() {
      this.$router.push("/home/search");
    },
  },
  created() {
    this.getSide();
  },
};
</script>

<style lang="scss" scoped>
.classify {
  position: relative;
  .search {
    position: fixed;
    top: 0;
    width: 345px;
    height: 44px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    z-index: 9;
    .ser {
      width: 100%;
      height: 28px;
      border-radius: 5px;
      background-color: #ededed;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
      }
      .img {
        background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png")
          no-repeat;
        background-size: 14px 14px;
        margin-right: 5px;
        width: 14px;
        height: 14px;
      }
    }
  }
  .content {
    background-color: #fff;
    margin-top: 45px;
    width: 100%;
    height: 680px;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .left {
      width: 80px;
      position: fixed;
      left: 0;
      background-color: #fff;
      ::v-deep .van-sidebar {
        .van-sidebar-item {
          height: 45px;
          padding: 0;
          background-color: #fff;
          .van-sidebar-item__text {
            line-height: 45px;
            // transform: translateY(-20px);
          }
        }
        .van-sidebar-item--select {
          font-size: 20px;
          color: red;
        }
        .van-sidebar-item--select::before {
          height: 45px;
          top: 0;
          transform: translateY(0);
        }
      }
    }
    .right {
      width: 265px;
      padding: 0 15px;
      .banner {
        width: 100%;
        height: 111px;
        margin-top: 10px;
      }
      .title {
        padding: 25px 0;
      }
      .list {
        width: 100%;
        display: flex;
        justify-content: baseline;
        flex-wrap: wrap;
        .item {
          width: calc(100% / 3);
          height: 88px;
          margin-bottom: 10px;
          .img {
            width: 72px;
            height: auto;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
