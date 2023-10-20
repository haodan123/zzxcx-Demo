"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  (_easycom_uni_search_bar2 + _easycom_uv_empty2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uv_empty)();
}
const _sfc_main = {
  __name: "zwruku",
  setup(__props) {
    const searchValue = common_vendor.ref();
    const clear = () => {
      searchValue.value = "";
    };
    const search = () => {
      console.log("搜索");
      getData();
    };
    const dataList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getData();
    });
    const getData = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        // "deernum": searchValue.value //鹿只编号?模糊查询
        "ludeernum": searchValue.value
        //鹿只编号
      };
      const res = await common_vendor.index.$post("/fygc", data);
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
        url: "/pagesZhongzhi/zwrukuAdd/zwrukuAdd"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(_ctx.blur),
        b: common_vendor.o(search),
        c: common_vendor.o(clear),
        d: common_vendor.o(($event) => searchValue.value = $event),
        e: common_vendor.p({
          placeholder: "请输入",
          modelValue: searchValue.value
        }),
        f: dataList.value.length == 0
      }, dataList.value.length == 0 ? {
        g: common_vendor.p({
          mode: "data",
          icon: "https://cdn.uviewui.com/uview/empty/data.png"
        })
      } : {}, {
        h: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.qyname),
            b: common_vendor.t(item.ludeernum || item.deernum || "暂无"),
            c: common_vendor.t(item.ludeernum || item.deernum || "暂无"),
            d: common_vendor.t(item.standardid || "暂无"),
            e: common_vendor.t(item.standardcontent || "暂无"),
            f: common_vendor.t(item.sydrug || "暂无"),
            g: item.id
          };
        }),
        i: common_vendor.o(dengji)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesZhongzhi/zwruku/zwruku.vue"]]);
wx.createPage(MiniProgramPage);
