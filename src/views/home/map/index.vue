<template>
  <div class="map">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 搜索框 -->
    <div class="serch">
      <van-search v-model="keyword" left-icon placeholder="搜索" />
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="item in tips"
        :key="item.id"
        @click="itemEvent(item)"
      >
        {{ item.name }} <span>地址:{{ item.address }}</span>
      </li>
    </ul>
    <!-- 地图 -->
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      keyword: "",
      tips: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    itemEvent(item) {
      this.$store.commit("changeCity", item);
      this.$router.push("/home");
      this.keyword = "";
    },
  },
  watch: {
    // 监听输入的地点 进行搜索
    keyword(newval) {
      let that = this;
      AMap.plugin("AMap.AutoComplete", function () {
        //city 限定城市，默认全国
        var autoOptions = {
          city: that.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(that.keyword, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          that.tips = result.tips;
        });
      });
    },
  },
  mounted() {
    // 生成一个地图
    var map = new AMap.Map("container", {
      zoom: 10, //级别 0-20
      //
    });
    // 如果位置被修改 则执行一下操作
    if (this.$store.state.getCity.name) {
      var map2 = new AMap.Map("container", {
        zoom: 16,
        center: [
          this.$store.state.getCity.location.lng,
          this.$store.state.getCity.location.lat,
        ], //中心点坐标
      });
      var marker = new AMap.Marker({
        position: [
          this.$store.state.getCity.location.lng,
          this.$store.state.getCity.location.lat,
        ], //位置
      });
      map2.add(marker); //添加到地图
    }

    //获取当前城市 以便于在当前城市搜索地点
    var that = this;
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          console.log(result);
          that.city = result.city;
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.map {
  background-color: #fff;
  #container {
    width: 100%;
    height: 180px;
    position: absolute;
    bottom: 0;
  }
  .serch {
    margin: 5px 16px;
    height: 50px;
    box-sizing: border-box;
    border: 2px solid rgb(195, 195, 195);
    border-radius: 0.13333rem;
  }
  .list {
    width: 100%;
    height: 350px;
    overflow: auto;
    .item {
      padding: 10px 20px;
      text-align: left;
      font-size: 12px;
    }
  }
}
::v-deep .van-search {
  padding: 1px;
  width: 337px;
  height: 44px;
}

::v-deep.van-search__content {
  box-sizing: border-box;
  padding: 0.1rem 0.42667rem;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
</style>