"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uani_datapicker2 = common_vendor.resolveComponent("uani-datapicker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_section2 + _easycom_uani_datapicker2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uani_datapicker = () => "../../components/uani-datapicker/uani-datapicker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uani_datapicker + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_easyinput + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "nsrwxf",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //基地名称
      dkmc: "",
      //地块名称
      zxr: "",
      //执行人
      time: "",
      //执行时间
      rennum: "",
      //所需人数
      zysx: "",
      //注意事项
      sypz: "",
      //适用品种
      nslc: "",
      //农事流程
      picture: []
      //图片
    });
    const dkmcList = common_vendor.ref([]);
    const zxrList = common_vendor.ref([]);
    const sypzList = common_vendor.ref([]);
    const nslcList = common_vendor.ref([]);
    const slelectData = common_vendor.ref({
      standardcontent: "",
      standardpic: ""
    });
    const ssnsSelect = (e) => {
      formData.value.qsid = "";
      formData.value.lzid = "";
      formData.value.lzbh = "";
      quansheList.value = [];
      console.log("圈舍", formData.value.qsid);
    };
    const ssnsSelect2 = (e) => {
      formData.value.lzid = "";
      formData.value.lzbh = "";
      lzList.value = [];
    };
    const ssnsSelect3 = (e) => {
    };
    const ssnsSelect4 = (e) => {
    };
    const loading = common_vendor.ref(false);
    const submit = () => {
      common_vendor.index.showLoading();
      loading.value = true;
      form.value.validate().then(async (res) => {
        let data = {
          "qyid": common_vendor.index.getStorageSync("user").qyid,
          "unitid": formData.value.dyid,
          "qsid": formData.value.qsid,
          // "picture": String(formData.value.picture), //标准图片
          "operator": common_vendor.index.getStorageSync("user").name,
          //操作人
          // "deernum": formData.value.lzbh, //鹿只编号id
          "deernum": formData.value.lzid,
          //鹿只编号id
          "dosage": formData.value.yl,
          //用量
          "sydrug": formData.value.ywname
          //使用药物
        };
        await common_vendor.index.$post("/addfygc", data);
        common_vendor.index.showToast({
          title: "操作成功"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
          loading.value = false;
        }, 1e3);
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
        loading.value = false;
        console.log("表单错误信息：", err);
      });
    };
    const preImage = (item) => {
      showOrNot.value = false;
      common_vendor.index.previewImage({
        current: 0,
        urls: [item]
      });
    };
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "line",
          title: "基本信息:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        b: common_vendor.o(ssnsSelect),
        c: common_vendor.o(($event) => formData.value.dkmc = $event),
        d: common_vendor.p({
          localdata: dkmcList.value,
          placeholder: "请选择",
          modelValue: formData.value.dkmc
        }),
        e: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择地块名称"
          }],
          label: "地块名称:",
          name: "dkmc",
          required: true
        }),
        f: common_vendor.o(ssnsSelect2),
        g: common_vendor.o(($event) => formData.value.zxr = $event),
        h: common_vendor.p({
          localdata: zxrList.value,
          placeholder: "请选择",
          modelValue: formData.value.zxr
        }),
        i: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择执行人"
          }],
          label: "执行人:",
          name: "zxr",
          required: true
        }),
        j: common_vendor.o(_ctx.changTime),
        k: common_vendor.o(($event) => formData.value.time = $event),
        l: common_vendor.p({
          type: "datetime",
          returnType: "date",
          ["clear-icon"]: false,
          modelValue: formData.value.time
        }),
        m: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择执行时间"
          }],
          label: "执行时间:",
          name: "time",
          required: true
        }),
        n: common_vendor.o(($event) => formData.value.rennum = $event),
        o: common_vendor.p({
          type: "digit",
          placeholder: "请输入所需人数",
          modelValue: formData.value.rennum
        }),
        p: common_vendor.p({
          label: "所需人数:",
          name: "rennum",
          rules: [{
            required: true,
            errorMessage: "请输入所需人数"
          }],
          required: true
        }),
        q: common_vendor.o(($event) => formData.value.zysx = $event),
        r: common_vendor.p({
          type: "text",
          placeholder: "请输入注意事项",
          modelValue: formData.value.zysx
        }),
        s: common_vendor.p({
          label: "注意事项:",
          name: "zysx",
          rules: [{
            required: true,
            errorMessage: "请输入注意事项"
          }],
          required: true
        }),
        t: common_vendor.p({
          type: "line",
          title: "任务信息:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        v: common_vendor.o(ssnsSelect3),
        w: common_vendor.o(($event) => formData.value.sypz = $event),
        x: common_vendor.p({
          localdata: sypzList.value,
          placeholder: "请选择",
          modelValue: formData.value.sypz
        }),
        y: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择适用品种"
          }],
          label: "适用品种:",
          name: "sypz",
          required: true
        }),
        z: common_vendor.o(ssnsSelect4),
        A: common_vendor.o(($event) => formData.value.nslc = $event),
        B: common_vendor.p({
          localdata: nslcList.value,
          placeholder: "请选择",
          modelValue: formData.value.nslc
        }),
        C: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择农事流程"
          }],
          label: "农事流程:",
          name: "nslc",
          required: true
        }),
        D: common_vendor.p({
          type: "",
          title: "具体内容:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        E: common_vendor.t(slelectData.value.standardcontent || "暂无"),
        F: common_vendor.p({
          type: "",
          title: "计价方式:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        G: common_vendor.t(slelectData.value.standardcontent || "暂无"),
        H: common_vendor.p({
          type: "",
          title: "单价(元):",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        I: common_vendor.t(slelectData.value.standardcontent || "暂无"),
        J: common_vendor.p({
          type: "",
          title: "验收标准:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        K: common_vendor.t(slelectData.value.standardcontent || "暂无"),
        L: common_vendor.p({
          type: "",
          title: "标准示例:",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        M: common_vendor.f(slelectData.value.standardpic, (item, index, i0) => {
          return {
            a: item,
            b: item,
            c: common_vendor.o(($event) => preImage(item), item)
          };
        }),
        N: common_vendor.sr(form, "61c061ce-0", {
          "k": "form"
        }),
        O: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px",
          ["label-align"]: "left"
        }),
        P: loading.value,
        Q: loading.value,
        R: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesZhongzhi/nsrwxf/nsrwxf.vue"]]);
wx.createPage(MiniProgramPage);
