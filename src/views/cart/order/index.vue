<template>
  <div class="order">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="address" @click="openAddress">
      <div class="item" v-if="address.name">
        <div class="left">{{ address.name }}</div>
        <div class="center">
          <p>{{ address.mobile }}</p>
          <p>{{ address.address }}</p>
        </div>
        <div class="right"></div>
      </div>
      <div class="addadd" v-else-if="!address.name">请添加收货地址</div>
    </div>
    <div class="order-box">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{ allPrise }}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <!-- 下单商品列表 -->
    <div class="goods">
      <ul class="list">
        <li class="item" v-for="item in goodsList" :key="item.id">
          <div class="left">
            <img :src="item.list_pic_url" alt="" class="img" />
            <div class="word">
              <div class="p1">{{ item.goods_name }}</div>
              <div class="p1">￥{{ item.retail_price }}</div>
            </div>
          </div>
          <div class="right">×{{ item.number }}</div>
        </li>
      </ul>
    </div>
    <div class="foot">
      <div class="left">￥{{ allPrise }}</div>

      <div class="right">
        <div class="p2" @click="pay">支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailAction } from "@/api/cart/order";
export default {
  data() {
    return {
      address: {},
      allPrise: "",
      goodsList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取地址和商品信息
    getOrder() {
      detailAction({
        openId: localStorage.getItem("openId"),
        addressId: this.$store.state.addressId,
      }).then((res) => {
        console.log(this.$store.state.addressId);
        this.address = res.data.address;
        this.allPrise = res.data.allPrise;
        this.goodsList = res.data.goodsList;
        // console.log(this.address);
      });
    },
    // 打开地址列表
    openAddress() {
      this.$router.push("/mian/address");
    },
    // 点击支付
    pay() {
      this.$toast("支付功能暂未开发");
    },
  },
  activated() {
    this.getOrder();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.order {
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .address {
    margin-top: 46px;
    background: url(~@/views/cart/img/address-bg-bd.png) 0 0 repeat-x #fff;
    padding: 25px 0 15px;
    margin-bottom: 10px;
    .item {
      padding: 0 10px;
      width: 355px;
      height: 65px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-self: flex-start;
        margin: 12px 0;
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
        background: url(~@/views/cart/img/address_right.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .addadd {
      margin: 12px 0;
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      padding: 20px 0;
    }
  }
  .order-box {
    background-color: #fff;
    width: 345px;
    padding: 0 15px;
    .item {
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d9d9d9;
    }
    .item:nth-child(3) {
      border-bottom: 0px solid #d9d9d9;
    }
  }
  .goods {
    margin: 10px 0 55px;
    background-color: #fff;
    .list {
      padding: 0 10px;
      background-color: #fff;
      .item {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          width: 80%;
          img {
            width: 62px;
            height: 62px;
            margin-left: 10px;
            background-color: #f4f4f4;
          }
          .word {
            padding: 10px 10px 0;
            width: 142px;
            height: 76px;
            .p1 {
              margin: 12px 0;
              text-align: left;
            }
          }
        }
        .right {
          padding-right: 25px;
        }
      }
    }
  }
  .foot {
    background-color: #fff;
    width: 375px;
    height: 50px;
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      padding-left: 10px;
    }
    .right {
      line-height: 50px;
      width: 100px;
      height: 100%;
      background-color: #b4282d;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>