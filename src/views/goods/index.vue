<template>
  <div class="goods">
    <div class="upper">
      <van-nav-bar
        title="不凡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <!-- banner轮播图 -->
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img :src="item.img_url" alt="" class="bannerimg" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="welfare">
        <div class="it">30天无忧退货</div>
        <div class="it">48小时快速退款</div>
        <div class="it">满88元包邮</div>
      </div>
      <div class="goodsinfo">
        <div class="info-title">{{ info.title }}</div>
        <div class="info-desc">{{ info.desc }}</div>
        <div class="info-price">￥{{ info.price }}</div>
        <div class="brand">
          <div class="words">{{ info.brand }}</div>
        </div>
      </div>
      <!-- 选择规格 -->
      <div class="section" @click="show = true">
        <div class="choose">请选择规格数量</div>
        <div class="img"></div>
      </div>
      <!-- 商品参数 -->
      <div class="attribute">
        <div class="head">商品参数</div>
        <div class="items" v-for="item in attribute" :key="item.name">
          <div class="attName">{{ item.name }}</div>
          <div class="attValue">{{ item.value }}</div>
        </div>
      </div>
      <div class="descImg" v-html="descImg"></div>
      <!-- 常见问题 -->
      <div class="common-problem">
        <div class="heade">
          <div class="line"></div>
          <div class="title1">常见问题</div>
          <div class="line"></div>
        </div>
        <div class="quesList">
          <div class="items" v-for="item in issue" :key="item.id">
            <div class="questop">
              <div class="spot"></div>
              <div class="question">{{ item.question }}</div>
            </div>
            <div class="answer">{{ item.answer }}</div>
          </div>
        </div>
      </div>
      <!-- 大家都在看 -->
      <div class="common-problem">
        <div class="heade">
          <div class="line"></div>
          <div class="title1">大家都在看</div>
          <div class="line"></div>
        </div>
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
    <div class="footer">
      <van-icon
        class="foot-item"
        size="20"
        name="star-o"
        :color="collected ? '#b63136' : ''"
        @click="collection"
      />
      <van-icon
        class="foot-item"
        size="20"
        name="cart-o"
        :badge="allnumber"
        @click="openCart"
      />
      <van-button class="foot-item" type="default">立即购买</van-button>
      <van-button class="foot-item" type="danger" @click="addCart"
        >加入购物车</van-button
      >
    </div>
    <div class="dialog">
      <van-popup v-model="show" position="bottom">
        <div class="box">
          <div class="head">
            <img :src="dialogImg" alt="" class="img" />
            <div class="words">
              <div>
                <div class="price">价格￥{{ info.price }}</div>
                <div class="title">请选择数量</div>
              </div>
            </div>
          </div>
          <div class="center">数量</div>
          <van-stepper v-model="goodsnum" />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { detailaction, addcollect, addCart } from "@/api/goods";
export default {
  data() {
    return {
      bannerList: [],
      info: {
        title: "",
        desc: "",
        price: "",
        brand: "",
      },
      attribute: [],
      descImg: "",
      issue: [],
      goodsList: [],
      collected: "", //判断是否收藏
      allnumber: "", //购物车数量
      show: false, //弹出框是否显示
      goodsnum: "1", //商品数量
      dialogImg: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取商品详情
    getGood() {
      detailaction({
        id: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        console.log(res);
        this.bannerList = res.data.gallery;
        this.info.title = res.data.info.name;
        this.info.desc = res.data.info.goods_brief;
        this.info.price = res.data.info.retail_price;
        this.info.brand = res.data.brand.name;
        this.attribute = res.data.attribute;
        this.descImg = res.data.info.goods_desc;
        this.issue = res.data.issue;
        this.goodsList = res.data.productList;
        this.collected = res.data.collected;
        this.allnumber = res.data.allnumber;
        this.dialogImg = res.data.info.primary_pic_url;
      });
    },
    // 打开商品详情
    opendetails(id) {
      this.$router.push({ path: "/good", query: { id } });
    },
    // 加入收藏
    collection() {
      addcollect({
        goodsId: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // 再次获取一次 获取收藏的数据
        this.getGood();
      });
    },
    // 加入购物车
    addCart() {
      if (this.show) {
        addCart({
          goodsId: this.$route.query.id,
          number: this.goodsnum,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // Vue.prototype.$toast.clear();
          // this.$toast.clear();

          this.$toast({
            message: "已加入购物车",
            icon: "success",
          });
          console.log(Vue.prototype);
          console.log(this.__proto__);
          // 再次获取一次 获取购物车数量的数据
          this.getGood();
          // 将弹出框隐藏
          this.show = false;
        });
      }
      this.show = true;
    },
    // 打开购物车界面
    openCart() {
      this.$router.push("/cart");
    },
  },
  created() {
    this.getGood();
  },
};
</script>

<style lang="scss" scoped>
.goods {
  .upper {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .content {
    margin-top: 46px;
    margin-bottom: 50px;
    .banner {
      .bannerimg {
        width: 100%;
      }
    }
    .welfare {
      width: 355px;
      height: 36px;
      margin: auto;
      display: flex;
      justify-content: space-between;
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
    .goodsinfo {
      margin-top: 20px;
      background-color: #fff;
      .info-title {
        padding: 10px;
        margin-bottom: 20px;
        font-size: 20px;
      }
      .info-desc {
        margin: 12px 0;
        font-size: 12px;
        color: #999;
      }
      .info-price {
        font-size: 16px;
        margin-bottom: 27px;
        color: #b4282d;
      }
      .brand {
        width: 100%;
        .words {
          margin: auto;
          width: fit-content;
          padding: 2px 15px;
          font-size: 12px;
          color: #b1a279;
          border: 1px solid #b1a279;
        }
      }
    }
    // 选择规格
    .section {
      width: 355px;
      padding: 0 10px 20px;
      background-color: #fff;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .choose {
        font-size: 12px;
      }
      .img {
        width: 26px;
        height: 26px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAAAAAA7VNdtAAAA4klEQVRIx+2VPQuCABCG/bVvmgiCfVM0CH2SQdBiEERDNNbk5laTkzREkEMQBRIEhaFprQ0RvNDo7c9w9z53J7zoElIkRT6rVT2xSBfankQCA4pL9hKNIK3I9pM5MhY7MSuDeUIOeS3BjMhcXAVGQEbpadCvZPqnMipnUpirjpxHOhb0oGxILSMTWYc0OZmhQCLPMUoc8hhAdink1oS6o9r3aygeqSEf8qhfqCi3Kto3ShhHxjCktLRFTGJK/iWwoFYsnkK0qUUOh1/M+oncO1C33FFqIH8gT19f99OXlCL/Q97bCIp/pz2QqAAAAABJRU5ErkJggg==");
        background-size: 100% 100%;
      }
    }
    // 商品参数
    .attribute {
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      .head {
        font-size: 20px;
        text-align: left;
      }
      .items {
        margin: 10px;
        display: flex;
        padding: 10px 0;
        background-color: #f7f7f7;
        text-align: left;
        .attName {
          width: 67px;
          color: #999;
          font-size: 13px;
        }
        .attValue {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    // 详情图片
    .descImg {
      ::v-deep img {
        width: 375px;
        display: block;
      }
    }
    // 常见问题
    .common-problem {
      margin-bottom: 50px;
      .heade {
        padding: 17px 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .line {
          display: inline-block;
          width: 50px;
          height: 1px;
          background-color: #ccc;
        }
        .title1 {
          padding: 0 12px;
        }
      }
      .quesList {
        background-color: #fff;
        padding: 0 15px;
        .items {
          padding-bottom: 12px;
          .questop {
            display: flex;
            .spot {
              margin-top: 5px;
              width: 4px;
              height: 4px;
              background-color: #b4282d;
              border-radius: 50%;
            }
            .question {
              color: #303030;
              padding-left: 4px;
              font-size: 13px;
              line-height: 15px;
              padding-bottom: 7px;
            }
          }
          .answer {
            text-align: left;
            padding-left: 8px;
            line-height: 20px;
            font-size: 13px;
            color: #787878;
          }
        }
      }
      // 大家都在看
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
  .footer {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .foot-item {
      flex: 1;
      text-align: center;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-info {
        top: 15px;
        right: 30px;
      }
    }
  }
  .dialog {
    .van-popup--bottom {
      bottom: 50px;
    }
    .box {
      padding: 15px;
      width: 345px;
      height: 170px;
      text-align: left;
      .head {
        width: 100%;
        overflow: hidden;
        margin-bottom: 17px;
        .img {
          width: 88px;
          height: 88px;
          float: left;
          margin-right: 15px;
        }
        .words {
          .price {
            color: #b4282d;
            margin: 22px 0 15px;
          }
          .title {
            line-height: 22px;
          }
        }
      }
      .center {
        margin: 12px 0;
      }
    }
  }
}
</style>