"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uani_datapicker2 = common_vendor.resolveComponent("uani-datapicker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uani_datapicker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uani_datapicker = () => "../../components/uani-datapicker/uani-datapicker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uani_datapicker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "scspAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //加工厂
      jcpc: "",
      //检测批次
      pcname: "",
      //批次名称
      spname: "",
      //商品名称
      spnum: "",
      //商品数量
      spguige: "",
      //商品规格
      spzl: "",
      //商品重量
      czlx: "",
      //操作类型
      czlc: "",
      //操作流程
      picture: []
      //图片
    });
    const jcpcList = common_vendor.ref([]);
    common_vendor.ref([]);
    common_vendor.ref([]);
    const ssnsSelect3 = (e) => {
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
          type: "text",
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
        h: common_vendor.o(($event) => formData.value.spname = $event),
        i: common_vendor.p({
          type: "text",
          placeholder: "请输入商品名称",
          modelValue: formData.value.spname
        }),
        j: common_vendor.p({
          label: "商品名称:",
          name: "spname",
          rules: [{
            required: true,
            errorMessage: "请输入商品名称"
          }],
          required: true
        }),
        k: common_vendor.o(($event) => formData.value.spnum = $event),
        l: common_vendor.p({
          type: "digit",
          placeholder: "请输入商品数量",
          modelValue: formData.value.spnum
        }),
        m: common_vendor.p({
          label: "商品数量:",
          name: "spnum",
          rules: [{
            required: true,
            errorMessage: "请输入商品数量"
          }],
          required: true
        }),
        n: common_vendor.o(($event) => formData.value.spguige = $event),
        o: common_vendor.p({
          type: "text",
          placeholder: "请输入商品规格",
          modelValue: formData.value.spguige
        }),
        p: common_vendor.p({
          label: "商品规格:",
          name: "spguige",
          rules: [{
            required: true,
            errorMessage: "请输入商品规格"
          }],
          required: true
        }),
        q: common_vendor.o(($event) => formData.value.spzl = $event),
        r: common_vendor.p({
          type: "digit",
          placeholder: "请输入商品重量,单位kg",
          modelValue: formData.value.spzl
        }),
        s: common_vendor.p({
          label: "商品重量:",
          name: "spzl",
          rules: [{
            required: true,
            errorMessage: "请输入商品重量"
          }],
          required: true
        }),
        t: common_vendor.sr(form, "51b8fab6-0", {
          "k": "form"
        }),
        v: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "100px",
          ["label-align"]: "left"
        }),
        w: loading.value,
        x: loading.value,
        y: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/scspAdd/scspAdd.vue"]]);
wx.createPage(MiniProgramPage);
