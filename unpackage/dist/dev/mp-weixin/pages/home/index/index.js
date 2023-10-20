"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../network/request.js");
require("../../../stores/index.js");
const utils_time = require("../../../utils/time.js");
const stores_modules_user = require("../../../stores/modules/user.js");
require("../../../config/global-config.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_notice_bar2 + _easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    stores_modules_user.useUserStore();
    common_vendor.ref("yuzhong");
    const loginName = common_vendor.ref(common_vendor.index.getStorageSync("user").name);
    const bannerList = common_vendor.ref([
      // '/static/images/banner/tu1.jpg',
      // '/static/images/banner/tu2.jpg',
      // '/static/images/banner/tu3.jpg',
      "http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/677c64b3-61e3-435e-85b2-80b1f42db95b.png",
      "http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/232b6e84-3a2e-427d-b465-20dbb237d3ad.png",
      "http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/6471d835-4f86-4000-91f6-3500ee534639.png"
    ]);
    const toUrl = (item) => {
      common_vendor.index.navigateTo({
        url: item.pageurl
      });
    };
    const shu = common_vendor.ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
    const gridlist1 = common_vendor.ref([
      {
        name: "农事标准查看",
        imgurl: "/static/images/icon3/jilu2.png",
        // imgurl: '/static/images/icon2/tu1.png',
        pageurl: "/pagesZhongzhi/nsbzck/nsbzck",
        show: true,
        id: 7
      },
      {
        name: "采摘标准查看",
        imgurl: "/static/images/icon3/jilu3.png",
        // imgurl: '/static/images/icon2/tu2.png',
        pageurl: "/pagesZhongzhi/czbzck/czbzck",
        show: true,
        id: 8
      },
      {
        name: "商品标准查看",
        imgurl: "/static/images/icon3/jilu5.png",
        // imgurl: '/static/images/icon2/tu3.png',
        pageurl: "/pagesZhongzhi/spbzck/spbzck",
        id: 9
      },
      {
        name: "生产计划",
        imgurl: "/static/images/icon3/chaxun2.png",
        // imgurl: '/static/images/icon2/tu4.png',
        pageurl: "/pagesZhongzhi/scjh/scjh",
        show: true,
        id: 10
      },
      {
        name: "农事任务下发",
        imgurl: "/static/images/icon3/chaxun3.png",
        // imgurl: '/static/images/icon2/tu5.png',
        pageurl: "/pagesZhongzhi/nsrwxf/nsrwxf",
        show: true,
        id: 11
      },
      {
        name: "农事任务",
        imgurl: "/static/images/icon3/chaxun4.png",
        // imgurl: '/static/images/icon2/tu6.png',
        pageurl: "/pagesZhongzhi/nsrw/nsrw",
        show: true,
        id: 12
      },
      {
        name: "农事任务执行",
        imgurl: "/static/images/icon3/chaxun5.png",
        // imgurl: '/static/images/icon2/tu7.png',
        pageurl: "/pagesZhongzhi/nsrwzx/nsrwzx",
        show: true,
        id: 13
      },
      {
        name: "生成商品",
        imgurl: "/static/images/icon3/jilu8.png",
        // imgurl: '/static/images/icon2/tu8.png',
        pageurl: "/pagesZhongzhi/shengchengsp/shengchengsp",
        show: true,
        id: 14
      },
      {
        name: "农资入库",
        imgurl: "/static/images/icon3/jilu6.png",
        // imgurl: '/static/images/icon2/tu10.png',
        pageurl: "/pagesZhongzhi/nzruku/nzruku",
        show: true,
        id: 16
      },
      {
        name: "农资出库",
        imgurl: "/static/images/icon3/yaowu.png",
        // imgurl: '/static/images/icon2/tu9.png',
        pageurl: "/pagesZhongzhi/nzchuku/nzchuku",
        show: true,
        id: 15
      },
      ,
      {
        name: "作物入库",
        imgurl: "/static/images/icon3/jilu6.png",
        // imgurl: '/static/images/icon2/tu10.png',
        pageurl: "/pagesZhongzhi/zwruku/zwruku",
        show: true,
        id: 18
      },
      {
        name: "作物出库",
        imgurl: "/static/images/icon3/yaowu.png",
        // imgurl: '/static/images/icon2/tu9.png',
        pageurl: "/pagesZhongzhi/zwchuku/zwchuku",
        show: true,
        id: 17
      }
    ]);
    const gridlist2 = common_vendor.ref([
      {
        name: "生产计划",
        imgurl: "/static/images/icon3/chaxun1.png",
        // imgurl: '/static/images/icon2/tu1.png',
        pageurl: "/pagesJiagong/scjh/scjh",
        show: true,
        id: 1
      },
      {
        name: "加工流程查看",
        imgurl: "/static/images/icon3/chaxun11.png",
        // imgurl: '/static/images/icon2/tu2.png',
        pageurl: "/pagesJiagong/jglcck/jglcck",
        show: true,
        id: 2
      },
      {
        name: "加工溯源采集",
        imgurl: "/static/images/icon3/chaxun2.png",
        // imgurl: '/static/images/icon2/tu3.png',
        pageurl: "/pagesJiagong/jgsycj/jgsycj",
        show: true,
        id: 3
      },
      {
        name: "检测记录",
        imgurl: "/static/images/icon3/chaxun3.png",
        // imgurl: '/static/images/icon2/tu4.png',
        pageurl: "/pagesJiagong/jcjilu/jcjilu",
        show: true,
        id: 4
      },
      {
        name: "生成商品",
        imgurl: "/static/images/icon3/chaxun4.png",
        // imgurl: '/static/images/icon2/tu5.png',
        pageurl: "/pagesJiagong/scsp/scsp",
        show: true,
        id: 5
      },
      {
        name: "生产调度",
        imgurl: "/static/images/icon3/chaxun5.png",
        // imgurl: '/static/images/icon2/tu6.png',
        // pageurl: '/pagesJiagong/jgruku/jgruku',
        pageurl: "/pagesJiagong/scdd/scdd",
        show: true,
        id: 6
      },
      {
        name: "原辅料查看",
        imgurl: "/static/images/icon3/chaxun3.png",
        // imgurl: '/static/images/icon2/tu4.png',
        pageurl: "/pagesJiagong/yflck/yflck",
        show: true,
        id: 4
      },
      {
        name: "加工入库",
        imgurl: "/static/images/icon3/chaxun5.png",
        // imgurl: '/static/images/icon2/tu6.png',
        pageurl: "/pagesJiagong/jgruku/jgruku",
        show: true,
        id: 6
      },
      {
        name: "加工出库",
        imgurl: "/static/images/icon3/chaxun4.png",
        // imgurl: '/static/images/icon2/tu5.png',
        pageurl: "/pagesJiagong/jgchuku/jgchuku",
        show: true,
        id: 5
      },
      {
        name: "成品入库",
        imgurl: "/static/images/icon3/chaxun5.png",
        // imgurl: '/static/images/icon2/tu6.png',
        pageurl: "/pagesJiagong/cpruku/cpruku",
        show: true,
        id: 6
      },
      {
        name: "成品出库",
        imgurl: "/static/images/icon3/chaxun4.png",
        // imgurl: '/static/images/icon2/tu5.png',
        pageurl: "/pagesJiagong/cpchuku/cpchuku",
        show: true,
        id: 5
      }
    ]);
    const gridlist3 = common_vendor.ref([
      {
        name: "配送",
        // imgurl: '/static/images/icon3/jilu8.png',
        imgurl: "/static/images/icon2/tu7.png",
        pageurl: "/pagesPeisong/map/map",
        show: true,
        id: 17
      }
    ]);
    const list1 = common_vendor.computed(() => {
      const arr = [];
      gridlist1.value.forEach((item) => {
        shu.value.forEach((item1) => {
          if (item1 === item.id) {
            arr.push(item);
          }
        });
      });
      return arr;
    });
    const list2 = common_vendor.computed(() => {
      return gridlist2.value.filter((item) => shu.value.includes(item.id)) || [];
    });
    const list3 = common_vendor.computed(() => {
      return gridlist3.value.filter((item) => shu.value.includes(item.id)) || [];
    });
    const outLogin = () => {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确定要退出登录吗",
        success(res) {
          console.log(res);
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
              // url: '/pages/relogin/relogin'
            });
          }
        }
      });
    };
    const togonggao = () => {
      common_vendor.index.navigateTo({
        url: "/pagesGonggao/home/home"
      });
    };
    const textValue = common_vendor.ref("");
    const getData = async () => {
      const data = {
        "username": common_vendor.index.getStorageSync("user").phone
        //登录账号
      };
      const res = await common_vendor.index.$post("/newNotice", data);
      const list = res.data;
      textValue.value = list[0].noticeTitle || "";
    };
    common_vendor.onShow(() => {
    });
    const time = common_vendor.ref();
    const timer = common_vendor.ref();
    common_vendor.onUnmounted(() => {
      clearInterval(timer.value);
    });
    const safeBtm = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      getData();
      safeBtm.value = common_vendor.index.getSystemInfoSync().safeAreaInsets.bottom;
      timer.value = setInterval(() => {
        time.value = utils_time.getDate();
      }, 1e3);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.t(loginName.value || "张小会"),
        c: common_vendor.t(time.value || "2021年1月28日"),
        d: textValue.value
      }, textValue.value ? {
        e: common_vendor.o(togonggao),
        f: common_vendor.p({
          speed: 50,
          ["more-text"]: "查看更多",
          ["show-get-more"]: true,
          ["show-icon"]: true,
          scrollable: true,
          text: textValue.value
        })
      } : {}, {
        g: common_vendor.unref(list1).length > 0
      }, common_vendor.unref(list1).length > 0 ? {
        h: common_vendor.p({
          type: "line",
          title: "种植",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        i: common_vendor.f(common_vendor.unref(list1), (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.name),
            c: common_vendor.o(($event) => toUrl(item), index),
            d: "5f34eaac-3-" + i0 + ",5f34eaac-2",
            e: common_vendor.p({
              index: item.id
            }),
            f: index
          };
        }),
        j: common_vendor.p({
          column: 3,
          showBorder: false
        })
      } : {}, {
        k: common_vendor.unref(list2).length > 0
      }, common_vendor.unref(list2).length > 0 ? {
        l: common_vendor.p({
          type: "line",
          title: "加工",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        m: common_vendor.f(common_vendor.unref(list2), (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.name),
            c: common_vendor.o(($event) => toUrl(item), index),
            d: "5f34eaac-6-" + i0 + ",5f34eaac-5",
            e: common_vendor.p({
              index: item.id
            }),
            f: index
          };
        }),
        n: common_vendor.p({
          column: 3,
          showBorder: false
        })
      } : {}, {
        o: common_vendor.unref(list3).length > 0
      }, common_vendor.unref(list3).length > 0 ? {
        p: common_vendor.p({
          type: "line",
          title: "标准库",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        q: common_vendor.f(common_vendor.unref(list3), (item, index, i0) => {
          return {
            a: item.imgurl,
            b: common_vendor.t(item.name),
            c: common_vendor.o(($event) => toUrl(item), index),
            d: "5f34eaac-9-" + i0 + ",5f34eaac-8",
            e: common_vendor.p({
              index: item.id
            }),
            f: index
          };
        }),
        r: common_vendor.p({
          column: 3,
          showBorder: false
        })
      } : {}, {
        s: common_vendor.o(outLogin)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pages/home/index/index.vue"]]);
wx.createPage(MiniProgramPage);
