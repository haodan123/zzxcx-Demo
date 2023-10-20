"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const list = common_vendor.ref([]);
    const getData = async () => {
      const data = {
        "username": common_vendor.index.getStorageSync("user").phone
        //登录账号
      };
      const res = await common_vendor.index.$post("/newNotice", data);
      list.value = res.data.map((item) => {
        item.createTime = item.createTime.substring(0, 10);
        return item;
      });
    };
    common_vendor.onShow(() => {
      getData();
    });
    const goXiangqing = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: `/pagesGonggao/xiangqing/xiangqing?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.noticeTitle),
            b: common_vendor.t(item.noticeContent),
            c: common_vendor.t(item.createTime),
            d: item.type != 1
          }, item.type != 1 ? {} : {}, {
            e: common_vendor.o(($event) => goXiangqing(item.noticeId), item.noticeId),
            f: item.noticeId
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93697ff8"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesGonggao/home/home.vue"]]);
wx.createPage(MiniProgramPage);
