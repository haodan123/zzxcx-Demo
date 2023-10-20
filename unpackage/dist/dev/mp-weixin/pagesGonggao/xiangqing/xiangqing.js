"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_bctos_rich_text2 = common_vendor.resolveComponent("bctos-rich-text");
  _easycom_bctos_rich_text2();
}
const _easycom_bctos_rich_text = () => "../../components/bctos-rich-text/bctos-rich-text.js";
if (!Math) {
  _easycom_bctos_rich_text();
}
const _sfc_main = {
  __name: "xiangqing",
  setup(__props) {
    const news = common_vendor.ref({});
    const id = common_vendor.ref("");
    common_vendor.onLoad((e) => {
      id.value = e.id;
      console.log(e);
      getNews();
    });
    const getNews = async () => {
      const data = {
        "noticeId": id.value,
        "username": common_vendor.index.getStorageSync("user").phone
        //登录账号
      };
      console.log(data);
      const res = await common_vendor.index.$post("/NoticeUserBy", data);
      news.value = res.data;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(news.value.noticeTitle),
        b: common_vendor.t(news.value.createTime),
        c: common_vendor.p({
          nodes: news.value.noticeContent
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a84427f3"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesGonggao/xiangqing/xiangqing.vue"]]);
wx.createPage(MiniProgramPage);
