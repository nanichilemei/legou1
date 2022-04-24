<template>
  <div class="newgoods">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img
      class="newimg"
      src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png"
      alt=""
    />
    <!-- 排序 -->
    <ul class="sorting">
      <li
        class="item"
        v-for="(item, index) in tabbar"
        :key="item.name"
        @click="whatSort(index)"
      >
        <div :class="current == index ? 'active' : ''">{{ item.name }}</div>
        <div v-if="index == 1" class="arrow-container">
          <img class="updown" :src="updown" alt="" />
        </div>
      </li>
    </ul>
    <!-- 商品列表 -->
    <ul class="goodsList">
      <li class="item" v-for="item in goodsList" :key="item.id">
        <img class="listimg" :src="item.list_pic_url" alt="" />
        <div class="title">{{ item.name }}</div>
        <div class="price">${{ item.retail_price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { goodsList } from "@/api/home/newgoods/index.js";
export default {
  data() {
    return {
      isHot: "",
      isNew: "",
      order: "",
      goodsList: {},
      current: 0,
      status: "default",
      updown:
        "http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png",
      tabbar: [
        {
          name: "综合",
        },
        {
          name: "价格",
        },
        {
          name: "分类",
        },
      ],
    };
  },
  methods: {
    // 点击返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击以什么方式排序
    whatSort(index) {
      this.current = index;
      if (index == 1) {
        if (this.status == "default") {
          this.status = "up";
          this.order = "asc";
        } else if (this.status == "up") {
          this.status = "down";
          this.order = "desc";
        } else if (this.status == "down") {
          this.status = "up";
          this.order = "asc";
        }
      } else {
        this.status = "default";
        this.order = "";
      }
      this.getLIst();
    },
    // 获取对应的商品
    getLIst() {
      goodsList({
        isHot: this.isHot,
        isNew: this.isNew,
        order: this.order,
      }).then((res) => {
        console.log(res);
        this.goodsList = res.data.data;
      });
    },
  },

  watch: {
    // 判断status这个值为什么的时候 updown呈现哪张图片
    status(newval) {
      if (newval == "default") {
        this.updown =
          "http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png";
      } else if (newval == "up") {
        this.updown =
          "http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png";
      } else if (newval == "down") {
        this.updown =
          "http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png";
      }
    },
  },
  mounted() {},
  created() {
    // 判断由哪个接口点击
    if (this.$route.query.flag == 1) {
      this.isNew = 1;
      this.getLIst();
    } else if (this.$route.query.flag == 2) {
      this.isHot = 1;
      this.getLIst();
    }
  },
};
</script>

<style lang="scss" scoped>
.newgoods {
  .newimg {
    width: 100%;
    height: auto;
  }
  // 排序展示
  .sorting {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 35px;
    background-color: #fff;
    .item {
      line-height: 35px;
      &:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        .updown {
          margin-left: 5px;
          height: 10px;
          width: auto;
        }
      }
      .active {
        color: #b4282d;
      }
    }
  }
  // 商品列表
  .goodsList {
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
    .item {
      width: 186px;
      height: 224px;
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
</style>