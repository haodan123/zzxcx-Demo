"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uv_tabs2 + _easycom_uv_empty2 + _easycom_uni_section2 + _easycom_uni_popup2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uv_empty + _easycom_uni_section + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "nsrw",
  setup(__props) {
    common_vendor.ref();
    const dataList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getData();
    });
    const workarr = common_vendor.ref([
      {
        ygry: "利长远",
        workTime: "2023",
        workPicture: "tu"
      },
      {
        ygry: "利长远",
        closingTime: "2023",
        closingPicture: "tu"
      }
    ]);
    const standardobj = common_vendor.ref({});
    const current = common_vendor.ref(0);
    const list = common_vendor.ref([{
      name: "待执行",
      value: 0
    }, {
      name: "已开始",
      value: 1
    }, {
      name: "已完成",
      value: 2
    }]);
    const clickTab = (e) => {
      current.value = e.value;
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
    const popupBz = common_vendor.ref();
    const openBz = () => {
      popupBz.value.open();
    };
    const popupRy = common_vendor.ref();
    const openRy = async (item) => {
      popupRy.value.open();
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
        c: dataList.value.length == 0
      }, dataList.value.length == 0 ? {
        d: common_vendor.p({
          mode: "data",
          icon: "https://cdn.uviewui.com/uview/empty/data.png"
        })
      } : {}, {
        e: common_vendor.f(dataList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.qyname),
            b: common_vendor.t(item.unitname || "暂无"),
            c: common_vendor.t(item.unitname || "暂无"),
            d: common_vendor.t(item.enclosurename || "暂无"),
            e: common_vendor.t(item.number || item.id),
            f: common_vendor.t(item.enclosurename || "暂无"),
            g: common_vendor.t(item.number || item.id),
            h: common_vendor.t(item.enclosurename || "暂无"),
            i: common_vendor.t(item.number || item.id)
          }, current.value != 0 ? {
            j: common_vendor.o(openRy, item.id)
          } : {}, {
            k: common_vendor.o(openBz, item.id),
            l: item.id
          });
        }),
        f: current.value != 0,
        g: common_vendor.f(workarr.value, (item, index, i0) => {
          return common_vendor.e({
            a: "cdbeceb9-3-" + i0 + ",cdbeceb9-2",
            b: common_vendor.p({
              type: "line",
              title: item.ygry,
              titleFontSize: "16px",
              titleFontWeight: "bold"
            }),
            c: item.workTime
          }, item.workTime ? {
            d: common_vendor.t(item.workTime || "暂无"),
            e: item.workPicture.split(",")[0],
            f: common_vendor.o(($event) => _ctx.preimg(item.workPicture), index)
          } : {}, {
            g: item.closingTime
          }, item.closingTime ? {
            h: common_vendor.t(workarr.value[0].valuation == "1" ? "(" + item.comtime + "小时)" : ""),
            i: common_vendor.t(workarr.value[0].valuation == "2" ? "(" + item.quantity + "件)" : ""),
            j: common_vendor.t(item.closingTime || "暂无"),
            k: item.closingPicture.split(",")[0],
            l: common_vendor.o(($event) => _ctx.preimg(item.closingPicture), index)
          } : {}, {
            m: index
          });
        }),
        h: common_vendor.sr(popupRy, "cdbeceb9-2", {
          "k": "popupRy"
        }),
        i: common_vendor.o(() => {
        }),
        j: common_vendor.p({
          type: "dialog"
        }),
        k: common_vendor.t(standardobj.value.unit || "暂无"),
        l: common_vendor.t(standardobj.value.unitPrice || "暂无"),
        m: common_vendor.t(standardobj.value.acceptanceCriteria || "暂无"),
        n: common_vendor.t(standardobj.value.defaultTreatment || "暂无"),
        o: common_vendor.o(($event) => _ctx.preimg(standardobj.value.picture)),
        p: common_vendor.sr(popupBz, "cdbeceb9-4", {
          "k": "popupBz"
        }),
        q: common_vendor.o(() => {
        }),
        r: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdbeceb9"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesZhongzhi/nsrw/nsrw.vue"]]);
wx.createPage(MiniProgramPage);
