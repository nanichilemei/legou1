<template>
  <div class="brand">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="head">
      <img
        class="hdimg"
        src="http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png"
        alt=""
      />
      <div class="title">{{ title }}</div>
    </div>
    <div class="content">{{ desc }}</div>
  </div>
</template>

<script>
import { detailaction } from "@/api/home/brand";
export default {
  data() {
    return {
      title: "",
      desc: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取页面信息
    getInfo() {
      detailaction({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.title = res.data.data.name;
        this.desc = res.data.data.simple_desc;
      });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.brand {
  background-color: #f4f4f4;
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
  }
  .head {
    margin-top: 46px;
    position: relative;
    .hdimg {
      width: 100%;
      height: 145px;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 20px;
      color: #fff;
      border-bottom: 0.06667rem solid #fff;
    }
  }
  .content {
    padding: 21px 16px;
    background-color: #fff;
    font-size: 15px;
  }
}
</style>