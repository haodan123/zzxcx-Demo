"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "scjhAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //加工厂
      jhbh: "",
      //计划编号
      jhmc: "",
      //计划名称
      jhsj: "",
      //计划时间
      jhjgsl: "",
      //计划加工数量
      scsl: "",
      //生产数量
      wjgsl: "",
      //未加工数量
      picture: []
      //图片
    });
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
    common_vendor.onShow(() => {
      gethpfl();
      getclmc();
      getGuige();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.value.jhbh = $event),
        b: common_vendor.p({
          type: "text",
          disabled: true,
          placeholder: "请输入计划编号",
          modelValue: formData.value.jhbh
        }),
        c: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请输入计划编号"
          }],
          label: "计划编号:",
          name: "jhbh",
          required: true
        }),
        d: common_vendor.o(($event) => formData.value.jhmc = $event),
        e: common_vendor.p({
          type: "text",
          disabled: true,
          placeholder: "请输入计划名称",
          modelValue: formData.value.jhmc
        }),
        f: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请输入计划名称"
          }],
          label: "计划名称:",
          name: "jhmc",
          required: true
        }),
        g: common_vendor.o(($event) => formData.value.jhsj = $event),
        h: common_vendor.p({
          type: "text",
          disabled: true,
          placeholder: "请输入计划时间",
          modelValue: formData.value.jhsj
        }),
        i: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请输入计划时间"
          }],
          label: "计划时间:",
          name: "jhsj",
          required: true
        }),
        j: common_vendor.o(($event) => formData.value.jhjgsl = $event),
        k: common_vendor.p({
          type: "number",
          disabled: true,
          placeholder: "请输入计划加工数量",
          modelValue: formData.value.jhjgsl
        }),
        l: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择计划加工数量"
          }],
          label: "计划加工数量:",
          name: "jhjgsl",
          required: true
        }),
        m: common_vendor.o(($event) => formData.value.scsl = $event),
        n: common_vendor.p({
          type: "number",
          placeholder: "请输入本次生产数量",
          modelValue: formData.value.scsl
        }),
        o: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请输入本次生产数量"
          }],
          label: "本次生产数量:",
          name: "scsl",
          required: true
        }),
        p: common_vendor.o(($event) => formData.value.wjgsl = $event),
        q: common_vendor.p({
          type: "text",
          disabled: true,
          placeholder: "请输入未加工数量",
          modelValue: formData.value.wjgsl
        }),
        r: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请输入未加工数量"
          }],
          label: "未加工数量:",
          name: "wjgsl",
          required: true
        }),
        s: common_vendor.f(4, (item, k0, i0) => {
          return {
            a: item
          };
        }),
        t: common_vendor.sr(form, "7f2a77a3-0", {
          "k": "form"
        }),
        v: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px",
          ["label-align"]: "left"
        }),
        w: loading.value,
        x: loading.value,
        y: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/scjhAdd/scjhAdd.vue"]]);
wx.createPage(MiniProgramPage);
