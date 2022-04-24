<template>
  <div class="goodslist">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="center">
      <van-tabs v-model="activeName" @click="changelist">
        <van-tab
          v-for="item in navData"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <div class="info">
            <div class="title">{{ infoTitle }}</div>
            <div class="desc">{{ infoDesc }}</div>
          </div>
          <ul class="list">
            <li
              class="item"
              v-for="items in goodsList"
              :key="items.id"
              @click="opendetails(items.id)"
            >
              <img :src="items.list_pic_url" alt="" class="listimg" />
              <div class="title">{{ items.name }}</div>
              <div class="price">${{ items.retail_price }}</div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <div></div>
  </div>
</template>

<script>
// import { index } from "@/api/home";
import { categoryNav, goodsList } from "@/api/classify/goodslist";

export default {
  data() {
    return {
      activeName: null,
      newCategoryList: [],
      navData: [],
      goodsList: [],
      infoTitle: "",
      infoDesc: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    changelist(name) {
      this.getList(name);
    },
    // 获取标头
    async gethead() {
      let res = await categoryNav({
        id: this.$route.query.id,
      });
      this.navData = res.data.navData;
    },
    // 获取到当前被点击的商品列表
    getList(categoryId) {
      goodsList({
        categoryId,
      }).then((res) => {
        console.log(res);
        // 将商品页的id传给active;
        this.activeName = res.data.currentNav.id;
        this.goodsList = res.data.data;
        this.infoTitle = res.data.currentNav.name;
        this.infoDesc = res.data.currentNav.front_desc;
      });
    },
    // 打开商品详情
    opendetails(id) {
      this.$router.push({ path: "/good", query: { id } });
    },
  },
  activated() {
    this.getList(this.$route.query.id);
  },
  created() {
    this.gethead();
  },
};
</script>

<style lang="scss" scoped>
.goodslist {
  background-color: #f4f4f4;
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
  }
  .center {
    margin-top: 46px;
    .info {
      margin: 10px 0 2px;
      padding: 15px;
      background-color: #fff;
      .title {
        margin: 15px 0 9px;
        font-size: 16px;
      }
      .desc {
        color: #999;
        margin: 12px 0;
      }
    }
    .list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: calc(100% / 2 - 2px);
        margin-bottom: 2px;
        padding: 7px 0;
        background-color: #fff;
        .listimg {
          width: 151px;
          height: 151px;
        }
        .title {
          margin: 7px 0 11px;
          padding: 0 10px;
          font-size: 12px;
        }
        .price {
          color: #b4282d;
          margin: 15px 0;
          font-size: 15px;
        }
      }
    }
  }
}
</style>