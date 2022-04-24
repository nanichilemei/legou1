<template>
  <!-- 编辑地址 -->
  <div class="editaddress">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="box">
      <div class="item">
        <input type="text" v-model="uname" placeholder="姓名" />
      </div>
      <div class="item">
        <input type="text" v-model="mobile" placeholder="手机号码" />
      </div>
      <div class="item" @click="show = true">
        <input
          type="text"
          v-model="city"
          placeholder="省份、城市、区县"
          disabled
        />
      </div>
      <div class="item">
        <input
          type="text"
          v-model="detail"
          placeholder="详细地址，如楼道、楼盘号等"
        />
      </div>
      <div class="itemend">
        <van-checkbox v-model="isdefault" checked-color="#b4282d" shape="square"
          >设置为默认地址</van-checkbox
        >
      </div>
      <div class="footer" @click="preservation">保存</div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }">
      <van-area
        title="标题"
        :area-list="areaList"
        @confirm="confirm"
        @cancel="show = false"
    /></van-popup>
  </div>
</template>

<script>
import { detailAction, saveAction } from "@/api/mian/address";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      address: {},
      uname: "",
      mobile: "",
      city: "",
      detail: "",
      isdefault: false,
      show: false,
      areaList,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取地址
    getAddress(id) {
      detailAction({
        id: id,
      }).then((res) => {
        this.uname = res.data.data.name;
        this.mobile = res.data.data.mobile;
        this.city = res.data.data.address;
        this.detail = res.data.data.address_detail;
        this.isdefault = Boolean(res.data.data.is_default);
      });
    },
    // 城市选择确认
    confirm(e) {
      this.show = false;
      this.city = e.map((el) => el.name).join(" ");
    },
    preservation() {
      let addId = this.$route.query.id ? this.$route.query.id : "";
      saveAction({
        address: this.city,
        addressId: addId,
        checked: this.isdefault,
        detailadress: this.detail,
        openId: localStorage.getItem("openId"),
        telNumber: this.mobile,
        userName: this.uname,
      }).then((res) => {
        this.$router.go(-1);
        console.log(addId);

        console.log(res);
      });
    },
  },
  created() {
    if (this.$route.query.id) {
      this.getAddress(this.$route.query.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.editaddress {
  background-color: #fff;
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .box {
    height: 621px;
    background-color: #fff;
    margin-top: 46px;
    .item {
      width: 313px;
      margin: 0 auto;
      padding: 15px 16px;
      border-bottom: 1px solid #f4f4f4;
      input {
        width: 100%;
        height: 24px;
        border: 0px;
        font-size: 14px;
        line-height: 24px;
      }
    }
    .itemend {
      margin: 20px 15px 0;
    }
    .footer {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      line-height: 50px;
      background-color: #b4282d;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>