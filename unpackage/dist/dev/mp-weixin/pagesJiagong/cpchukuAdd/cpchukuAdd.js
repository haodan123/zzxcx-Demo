"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uani_datapicker2 = common_vendor.resolveComponent("uani-datapicker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uani_datapicker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uani_datapicker = () => "../../components/uani-datapicker/uani-datapicker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uani_datapicker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "cpchukuAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //基地名称
      pici: "",
      //批次
      spname: "",
      //商品名称
      rknum: "",
      //出库数量
      kuguany: "",
      //库管员
      picture: []
      //图片
    });
    const piciList = common_vendor.ref([]);
    const spnameList = common_vendor.ref([]);
    const ssnsSelect = (e) => {
      console.log(e);
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
    const getDk = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid
      };
      await common_vendor.index.$post("/unitlist", data);
    };
    const getSp = async () => {
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
    common_vendor.onShow(() => {
      getDk();
      getSp();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.value.jdname = $event),
        b: common_vendor.p({
          type: "digit",
          disabled: true,
          placeholder: "请输入加工厂",
          modelValue: formData.value.jdname
        }),
        c: common_vendor.p({
          label: "加工厂:",
          name: "jdname",
          rules: [{
            required: true,
            errorMessage: "请输入加工厂"
          }],
          required: true
        }),
        d: common_vendor.o(ssnsSelect),
        e: common_vendor.o(($event) => formData.value.pici = $event),
        f: common_vendor.p({
          localdata: piciList.value,
          placeholder: "请选择",
          modelValue: formData.value.pici
        }),
        g: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择批次"
          }],
          label: "批次:",
          name: "pici",
          required: true
        }),
        h: common_vendor.o(ssnsSelect2),
        i: common_vendor.o(($event) => formData.value.spname = $event),
        j: common_vendor.p({
          localdata: spnameList.value,
          placeholder: "请选择",
          modelValue: formData.value.spname
        }),
        k: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择商品名称"
          }],
          label: "商品名称:",
          name: "spname",
          required: true
        }),
        l: common_vendor.o(($event) => formData.value.rknum = $event),
        m: common_vendor.p({
          type: "digit",
          placeholder: "请输入出库数量",
          modelValue: formData.value.rknum
        }),
        n: common_vendor.p({
          label: "出库数量:",
          name: "rknum",
          rules: [{
            required: true,
            errorMessage: "请输入出库数量"
          }],
          required: true
        }),
        o: common_vendor.sr(form, "4c82db3b-0", {
          "k": "form"
        }),
        p: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px",
          ["label-align"]: "left"
        }),
        q: loading.value,
        r: loading.value,
        s: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/cpchukuAdd/cpchukuAdd.vue"]]);
wx.createPage(MiniProgramPage);
