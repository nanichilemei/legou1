<template>
  <div class="topic-detail">
    <div class="upper">
      <van-nav-bar
        title="分类详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content" v-html="topidContent"></div>
    <div class="more">
      <div class="title">专题推荐</div>
      <ul class="list">
        <li class="item" v-for="item in topicList" :key="item.id">
          <img :src="item.scene_pic_url" alt="" class="img" />
          <div class="info">{{ item.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { detailaction } from "@/api/topic/index";

export default {
  data() {
    return {
      topicId: "",
      topidContent: "",
      topicList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getDetail() {
      detailaction({
        id: this.topicId,
      }).then((res) => {
        console.log(res);
        this.topidContent = res.data.data.content;
        this.topicList = res.data.recommendList;
      });
    },
  },
  created() {
    this.topicId = this.$route.query.id;
    this.getDetail();
  },
};
</script>

<style lang="scss" scoped>
.upper {
  width: 100%;
  position: fixed;
  top: 0;
}
.content {
  margin-top: 46px;
  ::v-deep img {
    width: 100%;
    height: auto;
  }
}
.more {
  width: 345px;
  margin: 0 auto;
  .title {
    color: #999;
    font-size: 16px;
    margin: 15px;
    padding: 15px;
  }
  .list {
    .item {
      padding: 15px;
      background-color: #fff;
      margin-bottom: 15px;
      .img {
        width: 100%;
        height: 139px;
      }
      .info {
        font-size: 15px;
        margin: 15px 0;
        text-align: left;
      }
    }
  }
}
</style>