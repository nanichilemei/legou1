<template>
  <!-- 意见反馈 -->
  <div class="feedback">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="box">
      <div class="title">意见与反馈</div>
      <div class="message">
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="留言"
          type="textarea"
          maxlength="150"
          placeholder="请填写你的意见和反馈"
          show-word-limit
        />
      </div>
      <div class="message">
        <van-field
          v-model="tel"
          label="联系方式"
          placeholder="邮箱/手机号/微信号"
        />
      </div>
      <div class="bottom" @click="sumbit">提交</div>
    </div>
  </div>
</template>

<script>
import { submitAction } from "@/api/mian/index.js";
export default {
  data() {
    return {
      message: "",
      tel: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    sumbit() {
      submitAction({
        content: this.message,
        name: "123",
        openId: localStorage.getItem("openId"),
        phone: this.tel,
      }).then((res) => {
        console.log(res);
        this.message = "";
        this.tel = "";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  background-color: #fff;
  height: 100vh;
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .box {
    width: 355px;
    padding: 0 10px;
    margin-top: 46px;
    .title {
      padding: 10px 0;
      text-align: left;
      border-bottom: 1px solid #d9d9d9;
    }
    .message {
      border-bottom: 1px solid #d9d9d9;
    }
    .bottom {
      width: 95%;
      height: 50px;
      border-radius: 5px;
      line-height: 50px;
      background: #b4282d;
      color: #fff;
      font-size: 16px;
      margin: 50px auto 0;
    }
  }
}
</style>