"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const longitude = common_vendor.ref("116.31");
    const latitude = common_vendor.ref("40.04");
    const polyline = common_vendor.ref([]);
    const isDisabled = common_vendor.ref(false);
    const coordinate = common_vendor.ref([]);
    const playIndex = common_vendor.ref(1);
    const map = common_vendor.ref();
    const isStart = common_vendor.ref(false);
    const covers = [
      {
        id: 1,
        width: 42,
        height: 47,
        rotate: 270,
        latitude: 39.78,
        longitude: 114.65,
        iconPath: "http://cdn.zhoukaiwen.com/car.png",
        callout: {
          content: "陕A·88888",
          // 车牌信息
          display: "ALWAYS",
          fontWeight: "bold",
          color: "#5A7BEE",
          //文本颜色
          fontSize: "12px",
          bgColor: "#ffffff",
          //背景色
          padding: 5,
          //文本边缘留白
          textAlign: "center"
        },
        anchor: {
          x: 0.5,
          y: 0.5
        }
      },
      {
        latitude: 30.3,
        longitude: 104.28,
        id: 2,
        width: 42,
        height: 47,
        rotate: 270,
        iconPath: "http://cdn.zhoukaiwen.com/car.png",
        callout: {
          content: "终点",
          // 车牌信息
          display: "ALWAYS",
          fontWeight: "bold",
          color: "#5A7BEE",
          //文本颜色
          fontSize: "12px",
          bgColor: "#ffffff",
          //背景色
          padding: 5,
          //文本边缘留白
          textAlign: "center"
        },
        anchor: {
          x: 0.5,
          y: 0.5
        }
      }
    ];
    common_vendor.onLoad(() => {
      map.value = common_vendor.index.createMapContext("myMap");
      console.log(common_vendor.index.$QQMapWX);
      const qqmapsdk = new common_vendor.index.$QQMapWX({
        key: "OYMBZ-A6F6V-XAWPF-UQT3N-S4LVO-FEBYJ"
        // 必填
      });
      qqmapsdk.direction({
        mode: "driving",
        //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
        //from参数不填默认当前地址
        from: "39.78,114.65",
        //此处经纬好像是反的  什么问题暂时未知
        to: "30.30,104.28",
        success: function(res) {
          console.log(res);
          var ret = res;
          var coors = ret.result.routes[0].polyline, pl = [];
          var kr = 1e6;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            });
          }
          console.log(pl);
          coordinate.value = pl;
          latitude.value = pl[0].latitude;
          longitude.value = pl[0].longitude;
          polyline.value = [{
            points: pl,
            color: "#FF0000DD",
            width: 4
          }];
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    });
    const start = () => {
      isStart.value = true;
      isDisabled.value = true;
      let data = coordinate.value;
      let len = data.length;
      let datai = data[playIndex.value];
      map.value.translateMarker({
        markerId: 1,
        autoRotate: true,
        destination: {
          longitude: datai.longitude,
          // 车辆即将移动到的下一个点的经度
          latitude: datai.latitude
          // 车辆即将移动到的下一个点的纬度
        },
        duration: 700,
        complete: function() {
          playIndex.value++;
          if (playIndex.value < len) {
            start(playIndex.value);
          } else {
            console.log("okokok");
            common_vendor.index.showToast({
              title: "播放完成",
              duration: 1400,
              icon: "none"
            });
            playIndex.value = 0;
            isStart.value = false;
            isDisabled.value = false;
          }
        },
        animationEnd: function() {
          playIndex.value++;
          if (playIndex.value < len) {
            start(playIndex.value);
          } else {
            console.log("okokok");
            common_vendor.index.showToast({
              title: "播放完成",
              duration: 1400,
              icon: "none"
            });
            playIndex.value = 0;
            isStart.value = false;
            isDisabled.value = false;
          }
        },
        fail(e) {
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: covers,
        b: longitude.value,
        c: latitude.value,
        d: polyline.value,
        e: isDisabled.value,
        f: common_vendor.o(start)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-033d9986"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesPeisong/map/map.vue"]]);
wx.createPage(MiniProgramPage);
