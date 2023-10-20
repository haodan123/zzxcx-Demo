"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "relogin",
  setup(__props) {
    const tologin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tologin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7db70ff"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pages/relogin/relogin.vue"]]);
wx.createPage(MiniProgramPage);
