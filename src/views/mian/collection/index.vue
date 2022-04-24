<template>
  <!-- 我的收藏 -->
  <div class="collection">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="box">
      <div class="head">我的收藏</div>
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
    </div>
  </div>
</template>

<script>
import { listAction } from "@/api/mian";
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getList() {
      listAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.goodsList = res.data.collectGoodsList;
      });
    },
    opendetails(id) {
      this.$router.push({ path: "/good", query: { id } });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.collection {
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .box {
    margin-top: 46px;
    .head {
      padding: 10px 0;
      background-color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
    .list {
      width: 365px;
      margin: auto;
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