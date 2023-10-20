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
  __name: "jgchukuAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //加工厂
      leixin: "",
      //类型
      hpfl: "",
      //货品分类
      clname: "",
      //材料名称
      guige: "",
      //规格
      danwei: "",
      //单位
      rknum: "",
      //入库数量
      kuguany: "",
      //库管员
      picture: []
      //图片
    });
    common_vendor.ref([
      {
        text: "入库",
        value: 0
      },
      {
        text: "退用",
        value: 1
      }
    ]);
    const hpflList = common_vendor.ref([]);
    const clmcList = common_vendor.ref([]);
    const guigeList = common_vendor.ref([]);
    const danweiList = common_vendor.ref([]);
    common_vendor.ref([]);
    const ssnsSelect2 = (e) => {
      formData.value.lzid = "";
      formData.value.lzbh = "";
      lzList.value = [];
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
        d: common_vendor.o(ssnsSelect2),
        e: common_vendor.o(($event) => formData.value.hpfl = $event),
        f: common_vendor.p({
          localdata: hpflList.value,
          placeholder: "请选择",
          modelValue: formData.value.hpfl
        }),
        g: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择货品分类"
          }],
          label: "货品分类:",
          name: "hpfl",
          required: true
        }),
        h: common_vendor.o(ssnsSelect3),
        i: common_vendor.o(($event) => formData.value.clname = $event),
        j: common_vendor.p({
          localdata: clmcList.value,
          placeholder: "请选择",
          modelValue: formData.value.clname
        }),
        k: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择材料名称"
          }],
          label: "材料名称:",
          name: "clname",
          required: true
        }),
        l: common_vendor.o(ssnsSelect4),
        m: common_vendor.o(($event) => formData.value.guige = $event),
        n: common_vendor.p({
          localdata: guigeList.value,
          placeholder: "请选择",
          modelValue: formData.value.guige
        }),
        o: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择规格"
          }],
          label: "规格:",
          name: "guige",
          required: true
        }),
        p: common_vendor.o(ssnsSelect5),
        q: common_vendor.o(($event) => formData.value.danwei = $event),
        r: common_vendor.p({
          localdata: danweiList.value,
          placeholder: "请选择",
          modelValue: formData.value.danwei
        }),
        s: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择单位"
          }],
          label: "单位:",
          name: "danwei",
          required: true
        }),
        t: common_vendor.o(($event) => formData.value.rknum = $event),
        v: common_vendor.p({
          type: "digit",
          placeholder: "请输入出库数量",
          modelValue: formData.value.rknum
        }),
        w: common_vendor.p({
          label: "出库数量:",
          name: "rknum",
          rules: [{
            required: true,
            errorMessage: "请输入出库数量"
          }],
          required: true
        }),
        x: common_vendor.sr(form, "4f878d8a-0", {
          "k": "form"
        }),
        y: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px",
          ["label-align"]: "left"
        }),
        z: loading.value,
        A: loading.value,
        B: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/jgchukuAdd/jgchukuAdd.vue"]]);
wx.createPage(MiniProgramPage);
