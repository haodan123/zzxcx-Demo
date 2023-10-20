"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  (_easycom_uv_tabs2 + _easycom_uni_search_bar2 + _easycom_uv_empty2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uni_search_bar + _easycom_uv_empty)();
}
const _sfc_main = {
  __name: "yflck",
  setup(__props) {
    const searchValue = common_vendor.ref();
    const clear = () => {
      searchValue.value = "";
    };
    const search = () => {
      console.log("搜索");
      getData();
    };
    const blur = () => {
      console.log("失去");
      if (searchValue.value == "") {
        getData();
        console.log("搜索");
      }
    };
    const dataList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getData();
    });
    const current = common_vendor.ref(0);
    const list = common_vendor.ref([{
      name: "今日",
      value: 1
    }, {
      name: "本周",
      value: 2
    }, {
      name: "本月",
      value: 3
    }]);
    const clickTab = (e) => {
      console.log(e, current.value);
    };
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
    const preImage = (item) => {
      common_vendor.index.previewImage({
        urls: item
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(clickTab),
        b: common_vendor.p({
          list: list.value,
          activeStyle: {
            color: "#3c9cff",
            fontWeight: "bold",
            transform: "scale(1.05)"
          },
          lineWidth: "70px",
          scrollable: false,
          current: current.value
        }),
        c: common_vendor.o(blur),
        d: common_vendor.o(search),
        e: common_vendor.o(clear),
        f: common_vendor.o(($event) => searchValue.value = $event),
        g: common_vendor.p({
          placeholder: "请输入商品名称",
          modelValue: searchValue.value
        }),
        h: dataList.value.length == 0
      }, dataList.value.length == 0 ? {
        i: common_vendor.p({
          mode: "data",
          icon: "https://cdn.uviewui.com/uview/empty/data.png"
        })
      } : {}, {
        j: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.qyname),
            b: common_vendor.t(item.unitname || "暂无"),
            c: common_vendor.t(item.enclosurename || "暂无"),
            d: common_vendor.t(item.enclosurename || "暂无"),
            e: common_vendor.t(item.number || item.id),
            f: common_vendor.t(item.enclosurename || "暂无"),
            g: common_vendor.t(item.number || item.id),
            h: common_vendor.o(($event) => preImage(item.picture), item.id),
            i: item.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/yflck/yflck.vue"]]);
wx.createPage(MiniProgramPage);
