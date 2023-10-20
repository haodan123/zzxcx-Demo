"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
if (!Array) {
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  _easycom_uv_empty2();
}
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  _easycom_uv_empty();
}
const _sfc_main = {
  __name: "scjh",
  setup(__props) {
    common_vendor.ref();
    const dataList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getData();
    });
    common_vendor.ref(0);
    common_vendor.ref([{
      name: "今日",
      value: 1
    }, {
      name: "本周",
      value: 2
    }, {
      name: "本月",
      value: 3
    }]);
    const getData = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid
        //企业id
      };
      const res = await common_vendor.index.$post("/rljd", data);
      dataList.value = res.data.map((item) => {
        if (item.picture) {
          item.picture = item.picture.split(",");
        }
        return {
          ...item
        };
      });
    };
    const dengji = () => {
      common_vendor.index.navigateTo({
        url: "/pagesJiagong/scjhAdd/scjhAdd"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: dataList.value.length == 0
      }, dataList.value.length == 0 ? {
        b: common_vendor.p({
          mode: "data",
          icon: "https://cdn.uviewui.com/uview/empty/data.png"
        })
      } : {}, {
        c: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.status == 1 ? "存栏中" : "已出栏"),
            b: common_vendor.t(item.qyname),
            c: common_vendor.t(item.unitname || "暂无"),
            d: common_vendor.t(item.enclosurename || "暂无"),
            e: common_vendor.o(dengji, item.id),
            f: item.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5e5fe37c"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/scjh/scjh.vue"]]);
wx.createPage(MiniProgramPage);
