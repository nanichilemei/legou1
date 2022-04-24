<template>
  <div class="bran">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="list">
          <li
            class="item"
            v-for="item in list"
            :key="item.id"
            @click="openBrand(item.id)"
          >
            <img class="img" :src="item.app_list_pic_url" alt="" />
            <div class="title">{{ item.name }}|{{ item.floor_price }}元起</div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import { listaction } from "@/api/home/brand";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.getList();
    },
    // 获取制造商品牌
    getList() {
      listaction({
        page: this.page,
      }).then((res) => {
        this.list.push(...res.data.data);
        this.loading = false;
        this.page++;
        if (this.page > res.data.total) {
          this.finished = true;
        }
      });
    },
    // 跳转到品牌制造商页面
    openBrand(id) {
      let page = "/home/brand?id=" + id;
      this.$router.push(page);
    },
  },
};
</script>

<style lang="scss" scoped>
.bran {
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .list {
    margin-top: 46px;
    .item {
      position: relative;
      margin-bottom: 2px;
      .img {
        width: 100%;
        height: 208px;
      }
      .title {
        position: absolute;
        width: fit-content;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>