<template>
  <div class="search">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search
      v-model.trim="keyword"
      @click="getgoodsList"
      show-action
      placeholder="商品搜索"
      @cancel="onCancel"
    />
    <!-- 默认界面 包含历史搜索和热门搜索 -->
    <div class="default" v-if="status == 'default'">
      <div v-if="hisList.length" class="history">
        <div class="hd">
          <div class="record">历史记录</div>
          <van-icon @click="delRecord" size="20px" name="delete-o" />
        </div>
        <ul class="list">
          <li
            class="item"
            v-for="item in hisList"
            :key="item.id"
            @click="addHis(item.keyword)"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
      <div class="hot">
        <div class="hd">热门搜索</div>
        <ul class="list">
          <li
            class="item"
            v-for="item in hotList"
            :key="item.id"
            @click="addHis(item.keyword)"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 与搜索字相关的产品列表 -->
    <div class="searchlist" v-else-if="status == 'list'">
      <ul class="list">
        <li
          @click="addHis(item.name)"
          class="item"
          v-for="item in searchList"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 搜索到的商品展示 -->
    <div class="goods" v-else>
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
      <ul class="list">
        <li class="item" v-for="item in goods" :key="item.id">
          <img class="gdimg" :src="item.list_pic_url" alt="" />
          <div class="title">{{ item.name }}</div>
          <div class="price">${{ item.retail_price }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  indexaction,
  clearhistoryAction,
  helperaction,
  addhistoryaction,
} from "@/api/home/search";
export default {
  data() {
    return {
      keyword: "",
      status: "default", //显示哪个页面
      hisList: [], //历史记录
      hotList: [], //热门搜索
      searchList: [], //搜索列表
      goods: null, //商品展示
      current: 0, //当前选中
      statu: "default", //排序默认上下
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
      ], //排序种类
    };
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取搜索历史记录
    getHistory() {
      indexaction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.hisList = res.data.historyData;
        this.hotList = res.data.hotKeywordList;
      });
    },
    // 删除搜索历史记录
    delRecord() {
      clearhistoryAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.hisList = [];
      });
    },
    // 进行搜索 显示与之匹配的商品
    searchGoods(keyword) {
      helperaction({
        keyword,
      }).then((res) => {
        this.searchList = res.data.keywords;
      });
    },
    // 将点击的商品添加至历史搜索 并单独显示此商品
    addHis(name) {
      addhistoryaction({
        keyword: name,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.getGood(name);
      });
    },
    // 将产品渲染到页面上
    getGood(keyword) {
      helperaction({
        keyword,
      }).then((res) => {
        // console.log(res);
        if (res.data.keywords.length) {
          this.status = "goods";
          this.goods = res.data.keywords;
        } else {
          this.status = "default";
          this.getHistory();
        }
      });
    },
    // 当搜索框再次被点击时 展示与搜索框与之匹配的商品列表
    getgoodsList() {
      if (this.keyword) {
        this.status = "list";
        this.searchGoods(this.keyword);
      } else {
        this.status = "default";
      }
    },
    // 点击取消
    onCancel() {
      this.$router.go(-1);
    },
    // 点击以什么方式排序
    whatSort(index) {
      this.current = index;
      if (index == 1) {
        if (this.statu == "default") {
          this.statu = "up";
        } else if (this.statu == "up") {
          this.statu = "down";
        } else if (this.statu == "down") {
          this.statu = "up";
        }
      } else {
        this.statu = "default";
      }
    },
  },
  watch: {
    // 监听输入框的值 有值就调用搜索方法
    keyword(newval) {
      if (newval) {
        this.status = "list";
      } else {
        this.status = "default";
        this.getHistory();
      }
      this.searchGoods(newval);
    },
    // 判断statu这个值为什么的时候 updown呈现哪张图片
    statu(newval) {
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
  created() {
    // 获取历史记录
    this.getHistory();
  },
};
</script>

<style lang="scss" scoped>
.search {
  // 默认展示页面
  .default {
    // 历史记录
    .history,
    .hot {
      background-color: #fff;
      padding: 16px;
      .hd {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .record {
          line-height: 27px;
        }
      }
      .list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item {
          width: fit-content;
          border: 1px solid #999;
          padding: 5px;
          margin-right: 15px;
          margin-bottom: 10px;
        }
      }
    }
    // 热门搜索
    .hot {
      margin-top: 10px;
      .item:nth-child(1) {
        border: 1px solid #b4282d;
        color: #b4282d;
      }
    }
  }
  // 搜索列表
  .searchlist {
    .list {
      background-color: #fff;
      padding: 0px 16px;
      .item {
        padding: 10px 0px;
        text-align: left;
      }
    }
  }
  .goods {
    // 商品列表
    .list {
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        box-sizing: border-box;
        width: 50%;
        text-align: center;
        background: #fff;
        padding: 7px 0px;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        .gdimg {
          width: 151px;
          height: auto;
        }
        .title {
          margin: 7px 0px 11px;
        }
        .price {
          color: #b4282d;
          font-size: 15px;
          margin: 15px 0;
        }
      }
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
  }
}
</style>