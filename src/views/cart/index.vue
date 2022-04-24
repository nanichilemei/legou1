<template>
  <div class="cart">
    <div class="welfare">
      <div class="it">30天无忧退货</div>
      <div class="it">48小时快速退款</div>
      <div class="it">满88元包邮</div>
    </div>

    <ul class="goodslist">
      <li class="item" v-for="item in cartList" :key="item.id">
        <van-swipe-cell>
          <div class="box">
            <div class="left">
              <van-checkbox
                v-model="item.checked"
                checked-color="#b4282d"
              ></van-checkbox>
              <img :src="item.list_pic_url" alt="" class="img" />
              <div class="word">
                <div class="p1">{{ item.goods_name }}</div>
                <div class="p1">￥{{ item.retail_price }}</div>
              </div>
            </div>
            <div class="right">×{{ item.number }}</div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="delgoods(item.id)"
            />
          </template>
        </van-swipe-cell>
      </li>
    </ul>
    <div class="foot">
      <van-checkbox v-model="allchecked" checked-color="#b4282d"
        >全选</van-checkbox
      >
      <div class="right">
        <div class="p1">￥{{ totalPrice }}</div>
        <div class="p2" @click="openOrder">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartList, submitAction, deleteAction } from "@/api/cart";
export default {
  data() {
    return {
      cartList: [],
    };
  },
  methods: {
    // 获取购物车信息
    getcartgoods() {
      cartList({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        res.data.data.forEach((element) => {
          element.checked = false;
        });
        this.cartList = res.data.data;

        /* this.cartList = res.data.data
          this.cartList.forEach(element => {
            // element.checked = false
            Vue.set(element,'checked',false)
          }); */
      });
    },
    // 打开订单页面
    openOrder() {
      // 如果有选中商品执行下一步
      if (this.cartList.some((el) => el.checked)) {
        submitAction({
          allPrise: this.totalPrice,
          goodsId: this.cartList
            .filter((el) => el.checked)
            .map((el) => el.goods_id)
            .join(","),
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          console.log(res);
        });
        this.$router.push("/cart/order");
      } else {
        this.$toast("请选择商品");
      }
    },
    // 删除购物车商品
    delgoods(id) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否确定删除",
        })
        .then(() => {
          deleteAction({ id: id }).then((res) => {
            this.getcartgoods();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    // 全选
    allchecked: {
      get() {
        return this.cartList.every((ele) => ele.checked == true);
      },
      set(val) {
        this.cartList.forEach((ele) => {
          ele.checked = val;
        });
      },
    },
    // 总价
    totalPrice() {
      return this.cartList.reduce((total, current) => {
        if (current.checked) {
          return total + current.retail_price * current.number;
        } else {
          return total;
        }
      }, 0);
    },
  },
  activated() {
    this.getcartgoods();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.cart {
  .welfare {
    width: 355px;
    height: 26px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    align-items: center;
    .it {
      padding-left: 7px;
      display: flex;
      align-items: center;
      color: #666;
      font-size: 13px;
      background: url("http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png")
        0 no-repeat;
      background-size: 0.13333rem;
    }
  }
  .goodslist {
    padding: 0 10px;
    background-color: #fff;
    margin-bottom: 100px;
    .item {
      .box {
        padding: 10px 0;
        // height: 96px;
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
    ::v-deep .van-swipe-cell__right {
      height: 100px;
      .van-button {
        height: 100px;
      }
    }
  }
  .foot {
    background-color: #fff;
    padding-left: 10px;
    width: 365px;
    height: 50px;
    position: fixed;
    bottom: 50px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;

      .p1 {
        color: #b4282d;
        margin-right: 20px;
      }
      .p2 {
        width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        background-color: #b4282d;
        color: #fff;
      }
    }
  }
}
</style>
