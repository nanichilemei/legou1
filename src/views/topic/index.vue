<template>
  <div class="topic">
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
          @click="openDetailaction(item.id)"
        >
          <img class="itimg" :src="item.scene_pic_url" alt="" />
          <div class="info">
            <div class="titel">{{ item.title }}</div>
            <div class="subtitle">{{ item.subtitle }}</div>
            <div class="price">{{ item.price_info }}元起</div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { listaction } from "@/api/topic/index";
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
    // 打开即执行
    onLoad() {
      this.getList();
    },
    // 打开专题详情
    openDetailaction(id) {
      this.$router.push({ path: "/topic/detail", query: { id } });
    },
    // 获取页面信息
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
  },
};
</script>

<style lang="scss" scoped>
.topic {
  margin-bottom: 40px;
  .list {
    .item {
      background-color: #fff;
      width: 100%;
      height: 323px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .itimg {
        width: 100%;
        height: 207px;
      }
      .titel {
        font-size: 17px;
        margin: 15px 0 17px;
        font-weight: 700;
      }
      .subtitle {
        font-size: 14px;
        margin: 8px 0 12px;
        color: #999;
      }
      .price {
        font-size: 12px;
        color: #b4282d;
        margin: 10px 0 13px;
      }
    }
  }
}
</style>
