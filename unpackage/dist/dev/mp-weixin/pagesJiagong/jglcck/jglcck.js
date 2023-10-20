"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_select2 + _easycom_uni_section2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "jglcck",
  setup(__props) {
    const showOrNot = common_vendor.ref(true);
    const slelectData = common_vendor.ref({
      standardcontent: "",
      standardpic: ""
    });
    const mcvalue = common_vendor.ref("");
    const range1 = common_vendor.ref([
      {
        //名称数组
        value: "1",
        text: "口蹄疫疫苗"
      },
      {
        value: "2",
        text: "口蹄疫疫苗2"
      }
    ]);
    const lxvalue = common_vendor.ref("");
    const range = common_vendor.ref([
      {
        //类型数组
        value: "1",
        text: "养殖"
      },
      {
        value: "2",
        text: "防疫"
      }
    ]);
    const changeLx = () => {
      console.log("真改啊");
      getmcData();
    };
    const changeMc = () => {
      slelectData.value = range1.value.find((item) => item.id === mcvalue.value);
      if (slelectData.value.standardpic) {
        slelectData.value.standardpic = slelectData.value.standardpic.split(",");
      }
      console.log("真改啊", slelectData.value);
    };
    const getlxData = async () => {
    };
    const getmcData = async () => {
      const data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        "type": "1",
        //1:养殖2：育种
        "standardtype": lxvalue.value
      };
      const res = await common_vendor.index.$post("/yzbz", data);
      range1.value = res.data.map((item) => {
        return {
          ...item,
          text: item.standardname,
          value: item.id
        };
      });
    };
    common_vendor.onShow(async () => {
      if (showOrNot.value) {
        getlxData();
      }
    });
    const preImage = (item) => {
      showOrNot.value = false;
      common_vendor.index.previewImage({
        current: 0,
        urls: [item]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeLx),
        b: common_vendor.o(($event) => lxvalue.value = $event),
        c: common_vendor.p({
          clear: false,
          localdata: range.value,
          modelValue: lxvalue.value
        }),
        d: common_vendor.o(changeMc),
        e: common_vendor.o(($event) => mcvalue.value = $event),
        f: common_vendor.p({
          clear: false,
          localdata: range1.value,
          modelValue: mcvalue.value
        }),
        g: common_vendor.p({
          type: "line",
          title: "规范要求:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        h: common_vendor.t(slelectData.value.standardcontent || "暂无"),
        i: common_vendor.p({
          type: "line",
          title: "标准示例:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        j: common_vendor.f(slelectData.value.standardpic, (item, index, i0) => {
          return {
            a: item,
            b: item,
            c: common_vendor.o(($event) => preImage(item), item)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/jglcck/jglcck.vue"]]);
wx.createPage(MiniProgramPage);
