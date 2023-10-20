"use strict";
const common_vendor = require("../../common/vendor.js");
const config_globalConfig = require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uani_datapicker2 = common_vendor.resolveComponent("uani-datapicker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_auploadimg2 = common_vendor.resolveComponent("uni-auploadimg");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uani_datapicker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_auploadimg2 + _easycom_uni_forms2)();
}
const _easycom_uani_datapicker = () => "../../components/uani-datapicker/uani-datapicker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_auploadimg = () => "../../components/uni-auploadimg/uni-auploadimg.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uani_datapicker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_auploadimg + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "jgsycjAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //加工厂
      jcpc: "",
      //检测批次
      pcname: "",
      //批次名称
      czlx: "",
      //操作类型
      czlc: "",
      //操作流程
      picture: []
      //图片
    });
    const jcpcList = common_vendor.ref([]);
    const czlxList = common_vendor.ref([]);
    const czlcList = common_vendor.ref([]);
    const onChange = (e) => {
      formData.value.picture = String(e);
      console.log(String(formData.value.picture));
    };
    const ssnsSelect3 = (e) => {
    };
    const ssnsSelect4 = (e) => {
    };
    const ssnsSelect5 = (e) => {
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
    const gethpfl = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid
      };
      const res = await common_vendor.index.$post("/unitlist", data);
      hpflList.value = res.data;
    };
    const getclmc = async () => {
      const data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        "type": "1",
        //1:养殖2：育种
        "standardtype": 2
        //标准类型1养殖？育种2防疫
      };
      const res = await common_vendor.index.$post("/yzbz", data);
      clmcList.value = res.data;
    };
    const getGuige = async () => {
      const data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        "unitid": formData.value.dyid,
        //单元id
        "qsid": formData.value.qsid,
        //圈舍id
        "status": "1"
        //状态1存栏
      };
      const res = await common_vendor.index.$post("/lufiles", data);
      guigeList.value = res.data;
    };
    common_vendor.onShow(() => {
      gethpfl();
      getclmc();
      getGuige();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(ssnsSelect3),
        b: common_vendor.o(($event) => formData.value.jcpc = $event),
        c: common_vendor.p({
          localdata: jcpcList.value,
          placeholder: "请选择",
          modelValue: formData.value.jcpc
        }),
        d: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择所属批次"
          }],
          label: "所属批次:",
          name: "jcpc",
          required: true
        }),
        e: common_vendor.o(($event) => formData.value.pcname = $event),
        f: common_vendor.p({
          type: "digit",
          disabled: true,
          placeholder: "请输入批次名称",
          modelValue: formData.value.pcname
        }),
        g: common_vendor.p({
          label: "批次名称:",
          name: "pcname",
          rules: [{
            required: true,
            errorMessage: "请输入批次名称"
          }],
          required: true
        }),
        h: common_vendor.o(ssnsSelect4),
        i: common_vendor.o(($event) => formData.value.czlx = $event),
        j: common_vendor.p({
          localdata: czlxList.value,
          placeholder: "请选择",
          modelValue: formData.value.czlx
        }),
        k: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择操作类型"
          }],
          label: "操作类型:",
          name: "czlx",
          required: true
        }),
        l: common_vendor.o(ssnsSelect5),
        m: common_vendor.o(($event) => formData.value.czlc = $event),
        n: common_vendor.p({
          localdata: czlcList.value,
          placeholder: "请选择",
          modelValue: formData.value.czlc
        }),
        o: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择操作流程"
          }],
          label: "操作流程:",
          name: "czlc",
          required: true
        }),
        p: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请上传现场图片"
          }],
          label: "现场图片:",
          name: "picture",
          required: true
        }),
        q: common_vendor.o(onChange),
        r: common_vendor.p({
          action: common_vendor.unref(config_globalConfig.uploadUrl)
        }),
        s: common_vendor.sr(form, "00f8d0aa-0", {
          "k": "form"
        }),
        t: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "100px",
          ["label-align"]: "left"
        }),
        v: loading.value,
        w: loading.value,
        x: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/jgsycjAdd/jgsycjAdd.vue"]]);
wx.createPage(MiniProgramPage);
