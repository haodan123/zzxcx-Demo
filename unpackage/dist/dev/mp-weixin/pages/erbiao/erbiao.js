"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
const _sfc_main = {
  __name: "erbiao",
  setup(__props) {
    const getEb = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        "unitid": dyid.value,
        //单元id
        "qsid": qsid.value,
        //圈舍id
        "status": "1"
        //状态1存栏
      };
      const res = await common_vendor.index.$post("/lufiles", data);
      ebList.value = res.data.map((item) => {
        return {
          ...item,
          text: item.deernum || item.id,
          value: item.deernum || item.id
        };
      });
      console.log(ebList.value);
    };
    const qsid = common_vendor.ref();
    const dyid = common_vendor.ref();
    common_vendor.ref();
    const ebList = common_vendor.ref([
      // {
      // 	name: 'EC00001',
      // 	id: 133
      // },
      // {
      // 	name: 'EC00002',
      // 	id: 222
      // }, {
      // 	name: 'EC00003',
      // 	id: 311
      // }
    ]);
    const selectEb = common_vendor.ref([]);
    const findArr = (arr, e) => {
      if (arr.length < 1) {
        return false;
      } else {
        return arr.find((item) => item.id === e.id);
      }
    };
    const toBack = (e) => {
      const foundObject = findArr(selectEb.value, e);
      if (foundObject) {
        const indexof = selectEb.value.findIndex((inof) => inof.id === e.id);
        console.log(indexof);
        selectEb.value.splice(indexof, 1);
      } else {
        console.log("eb", selectEb.value);
        selectEb.value = [...selectEb.value, e];
      }
      console.log("最后选中", selectEb.value);
    };
    common_vendor.onLoad(({
      eb,
      qsid: qsid1,
      dyid: dyid1
    }) => {
      console.log(dyid, qsid);
      qsid.value = qsid1;
      dyid.value = dyid1;
      if (eb) {
        selectEb.value = JSON.parse(eb);
        console.log(selectEb.value);
      }
    });
    common_vendor.onShow(() => {
      getEb();
    });
    const submit = () => {
      common_vendor.index.setStorage({
        key: "selectAddress",
        // data: e.name,
        // data: data,
        data: selectEb.value,
        success() {
          common_vendor.index.navigateBack();
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ebList.value.length > 0
      }, ebList.value.length > 0 ? {
        b: common_vendor.f(ebList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.deernum || item.id),
            b: findArr(selectEb.value, item) ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => toBack(item), index)
          };
        })
      } : {}, {
        c: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c105fc80"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pages/erbiao/erbiao.vue"]]);
wx.createPage(MiniProgramPage);
