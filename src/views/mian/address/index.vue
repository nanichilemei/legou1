<template>
  <!-- 地址列表 -->
  <div class="address">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <ul class="list">
      <li class="item" v-for="item in addressList" :key="item.id">
        <div class="left">
          <p>{{ item.name }}</p>
          <div v-if="item.is_default" class="moren">默认</div>
        </div>
        <div class="center" @click="changeAddress(item.id)">
          <p>{{ item.mobile }}</p>
          <p>{{ item.address }}{{ item.address_detail }}</p>
        </div>
        <div class="right" @click="editAddress(item.id)"></div>
      </li>
    </ul>
    <div class="footer">
      <div @click="addAddress">+新建地址</div>
    </div>
  </div>
</template>

<script>
import { getListAction } from "@/api/mian/address";
export default {
  data() {
    return {
      addressList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取到地址列表
    getList() {
      getListAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.addressList = res.data.data;
      });
    },
    // 编辑地址
    editAddress(id) {
      this.$router.push({ path: "/mian/editaddress", query: { id } });
    },
    // 添加地址
    addAddress() {
      this.$router.push("/mian/editaddress");
    },
    // 点击修改收货地址
    changeAddress(id) {
      this.$store.commit("changeAddressId", id);
      this.$router.go(-1);
    },
  },
  activated() {
    this.getList();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.address {
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .list {
    margin-top: 46px;
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: #fff;
    .item {
      padding: 15px 0;
      width: 355px;
      // height: 65px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d9d9d9;
      .left {
        width: 50px;
        align-self: flex-start;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 12px 0;
        }
        .moren {
          width: 0.8rem;
          height: 0.4rem;
          border: 1px solid #b4282d;
          text-align: center;
          line-height: 0.4rem;
          color: #b4282d;
          margin: 0.13333rem auto 0 auto;
        }
      }
      .center {
        width: 240px;
        padding: 0 10px;
        p {
          margin: 12px 0;
          text-align: left;
        }
        p:nth-child(2) {
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .right {
        width: 25px;
        height: 25px;
        margin: 0 10px;
        background: url("http://jinglins.gitee.io/legou/img/edit.d508a455.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .footer {
    width: 345px;
    padding: 15px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    div {
      width: 90%;
      height: 35px;
      border: 1px solid #b4282d;
      color: #b4282d;
      margin: 0 auto;
      line-height: 35px;
    }
  }
}
</style>