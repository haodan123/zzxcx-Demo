"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./network/request.js");
const stores_index = require("./stores/index.js");
require("./config/global-config.js");
require("./stores/modules/user.js");
if (!Math) {
  "./pages/home/index/index.js";
  "./pages/relogin/relogin.js";
  "./pages/login/login.js";
  "./pages/test/test.js";
  "./pages/erbiao/erbiao.js";
  "./pagesZhongzhi/nsbzck/nsbzck.js";
  "./pagesZhongzhi/czbzck/czbzck.js";
  "./pagesZhongzhi/spbzck/spbzck.js";
  "./pagesZhongzhi/scjh/scjh.js";
  "./pagesZhongzhi/shengchengsp/shengchengsp.js";
  "./pagesZhongzhi/shengchengspAdd/shengchengspAdd.js";
  "./pagesZhongzhi/nzruku/nzruku.js";
  "./pagesZhongzhi/nzrukuAdd/nzrukuAdd.js";
  "./pagesZhongzhi/nzchuku/nzchuku.js";
  "./pagesZhongzhi/nzchukuAdd/nzchukuAdd.js";
  "./pagesZhongzhi/zwruku/zwruku.js";
  "./pagesZhongzhi/zwrukuAdd/zwrukuAdd.js";
  "./pagesZhongzhi/zwchuku/zwchuku.js";
  "./pagesZhongzhi/zwchukuAdd/zwchukuAdd.js";
  "./pagesZhongzhi/nsrwxf/nsrwxf.js";
  "./pagesZhongzhi/nsrw/nsrw.js";
  "./pagesZhongzhi/nsrwzx/nsrwzx.js";
  "./pagesZhongzhi/shangxiaban/shangxiaban.js";
  "./pagesJiagong/jglcck/jglcck.js";
  "./pagesJiagong/cpchuku/cpchuku.js";
  "./pagesJiagong/cpchukuAdd/cpchukuAdd.js";
  "./pagesJiagong/cpruku/cpruku.js";
  "./pagesJiagong/cprukuAdd/cprukuAdd.js";
  "./pagesJiagong/jgruku/jgruku.js";
  "./pagesJiagong/jgrukuAdd/jgrukuAdd.js";
  "./pagesJiagong/jgchuku/jgchuku.js";
  "./pagesJiagong/jgchukuAdd/jgchukuAdd.js";
  "./pagesJiagong/jcjilu/jcjilu.js";
  "./pagesJiagong/jcjiluAdd/jcjiluAdd.js";
  "./pagesJiagong/jgsycj/jgsycj.js";
  "./pagesJiagong/jgsycjAdd/jgsycjAdd.js";
  "./pagesJiagong/scsp/scsp.js";
  "./pagesJiagong/scspAdd/scspAdd.js";
  "./pagesJiagong/yflck/yflck.js";
  "./pagesJiagong/scdd/scdd.js";
  "./pagesJiagong/scddAdd/scddAdd.js";
  "./pagesJiagong/scjh/scjh.js";
  "./pagesJiagong/scjhAdd/scjhAdd.js";
  "./pagesGonggao/home/home.js";
  "./pagesGonggao/xiangqing/xiangqing.js";
  "./pagesPeisong/map/map.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/App.vue"]]);
const QQMapWX = require("/utils/qqmap-wx-jssdk.min.js");
common_vendor.index.$QQMapWX = QQMapWX;
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app,
    pinia: stores_index.pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
