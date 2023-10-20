"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_throttle = require("../../utils/throttle.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const curTab = common_vendor.ref("goods");
    const tabOpacityVal = common_vendor.ref(0);
    const tabList = common_vendor.ref([
      {
        label: "商品",
        value: "goods",
        to: "detail-swiper-selector"
      },
      {
        label: "评价",
        value: "comment",
        to: "detail-comment-selector"
      },
      {
        label: "详情",
        value: "detail",
        to: "detail-content-selector"
      }
    ]);
    const device = common_vendor.index.getSystemInfoSync();
    const getNavBar = () => {
      return device.statusBarHeight + 44;
    };
    const navbar = getNavBar();
    console.log("divce", device);
    const sys_statusBar = device.statusBarHeight;
    let commentCard = {
      top: 0,
      bottom: 0
    };
    const onTab = (item) => {
      let scrollTop = 0;
      if (item.value === "comment") {
        scrollTop = commentCard.top - navbar + 1;
      } else if (item.value === "detail") {
        scrollTop = commentCard.bottom - navbar + 1;
      }
      console.log(scrollTop);
      common_vendor.index.pageScrollTo({
        scrollTop,
        duration: 200
      });
    };
    const getCommentCardNode = () => {
      return new Promise((res, rej) => {
        common_vendor.index.createSelectorQuery().select(".detail-comment-selector").boundingClientRect((data) => {
          if (data) {
            commentCard.top = data.top;
            commentCard.bottom = data.top + data.height;
            res(data);
          } else {
            res(null);
          }
        }).exec();
      });
    };
    common_vendor.onPageScroll((e) => {
      tabOpacityVal.value = e.scrollTop > navbar ? 1 : e.scrollTop * 0.01;
      if (commentCard.top === 0) {
        utils_throttle.throttle(() => {
          getCommentCardNode();
        }, 50);
      }
      if (e.scrollTop < commentCard.top - navbar) {
        curTab.value = "goods";
      } else if (e.scrollTop >= commentCard.top - navbar && e.scrollTop <= commentCard.bottom - navbar) {
        curTab.value = "comment";
      } else {
        curTab.value = "detail";
      }
    });
    common_vendor.onLoad(async () => {
      common_vendor.index.onThemeChange((res) => {
        console.log("改变的", res.theme);
      });
      common_vendor.index.getSystemInfo({
        success: (res) => {
          console.log(res);
          const themeMode = res.theme;
          console.log(themeMode);
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.o(($event) => onTab(item), item.to),
            c: common_vendor.n(curTab.value === item.value ? "current" : ""),
            d: item.to
          };
        }),
        b: common_vendor.s({
          height: common_vendor.unref(navbar) - common_vendor.unref(sys_statusBar) + "px",
          opacity: tabOpacityVal.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pages/test/test.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
