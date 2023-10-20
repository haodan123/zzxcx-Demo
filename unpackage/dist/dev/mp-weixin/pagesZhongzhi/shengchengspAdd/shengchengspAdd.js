"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
  __name: "shengchengspAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      name: common_vendor.index.getStorageSync("user").zname || "",
      dkname: "",
      //地块名称
      spfl: "",
      //商品分类
      spname: "",
      //商品名称
      spdj: "",
      //商品等级
      spzl: "",
      //商品重量
      zmsl: "",
      //子码数量
      picture: []
      //图片
    });
    const dkList = common_vendor.ref([]);
    const spflList = common_vendor.ref([]);
    const spnameList = common_vendor.ref([]);
    const spdjList = common_vendor.ref([
      { text: "一级", value: 0 },
      { text: "二级", value: 1 },
      { text: "三级", value: 2 }
    ]);
    const ssnsSelect = (e) => {
      console.log(e);
      if (!e.value) {
        common_vendor.index.showToast({
          title: "未找到该地块",
          icon: "none"
        });
      }
      formData.value.qsid = "";
      formData.value.lzid = "";
      formData.value.lzbh = "";
      quansheList.value = [];
      getQuanshe();
      console.log("圈舍", formData.value.qsid);
    };
    const ssnsSelect2 = (e) => {
      formData.value.lzid = "";
      formData.value.lzbh = "";
      lzList.value = [];
      getLuzhi();
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
    const getDk = async () => {
      let data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid
      };
      const res = await common_vendor.index.$post("/unitlist", data);
      dkList.value = res.data;
    };
    const getSpfl = async () => {
      const data = {
        "qyid": common_vendor.index.getStorageSync("user").qyid,
        //企业id
        "type": "1",
        //1:养殖2：育种
        "standardtype": 2
        //标准类型1养殖？育种2防疫
      };
      const res = await common_vendor.index.$post("/yzbz", data);
      spflList.value = res.data;
    };
    const getSpdj = async () => {
      ({
        "qyid": common_vendor.index.getStorageSync("user").qyid
        //企业id
      });
    };
    common_vendor.onShow(() => {
      getDk();
      getSpfl();
      getSpdj();
    });
    const saoma = (type) => {
      common_vendor.index.scanCode({
        success: async function(res) {
          let qrCode;
          if (type == "quanshe")
            ;
          else {
            qrCode = res.result;
          }
          console.log(qrCode);
          if (!qrCode)
            return;
          if (type == "dikuai") {
            qrCode = JSON.parse(qrCode);
            formData.value.dkname = qrCode.dkname;
          } else if (type == "fudai") {
            formData.value.fbianhao = qrCode;
          }
        },
        fail: function(err) {
          console.log(err);
          common_vendor.index.showToast({
            title: "请扫描正确的二维码！",
            icon: "none",
            duration: 2e3
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(ssnsSelect),
        b: common_vendor.o(($event) => formData.value.dkname = $event),
        c: common_vendor.p({
          localdata: dkList.value,
          placeholder: "请选择",
          modelValue: formData.value.dkname
        }),
        d: common_vendor.o(($event) => saoma("dikuai")),
        e: common_assets._imports_0,
        f: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择地块名称"
          }],
          label: "地块名称:",
          name: "dkname",
          required: true
        }),
        g: common_vendor.o(ssnsSelect2),
        h: common_vendor.o(($event) => formData.value.spfl = $event),
        i: common_vendor.p({
          localdata: spflList.value,
          placeholder: "请选择",
          modelValue: formData.value.spfl
        }),
        j: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择商品分类"
          }],
          label: "商品分类:",
          name: "spfl",
          required: true
        }),
        k: common_vendor.o(ssnsSelect3),
        l: common_vendor.o(($event) => formData.value.spname = $event),
        m: common_vendor.p({
          localdata: spnameList.value,
          placeholder: "请选择",
          modelValue: formData.value.spname
        }),
        n: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择商品名称"
          }],
          label: "商品名称:",
          name: "spname",
          required: true
        }),
        o: common_vendor.o(ssnsSelect4),
        p: common_vendor.o(($event) => formData.value.spdj = $event),
        q: common_vendor.p({
          localdata: spdjList.value,
          placeholder: "请选择",
          modelValue: formData.value.spdj
        }),
        r: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择商品等级"
          }],
          label: "商品等级:",
          name: "spdj",
          required: true
        }),
        s: common_vendor.o(($event) => formData.value.spzl = $event),
        t: common_vendor.p({
          type: "digit",
          placeholder: "请输入商品重量,单位kg",
          modelValue: formData.value.spzl
        }),
        v: common_vendor.p({
          label: "商品重量:",
          name: "spzl",
          rules: [{
            required: true,
            errorMessage: "请输入商品重量"
          }],
          required: true
        }),
        w: common_vendor.o(($event) => formData.value.zmsl = $event),
        x: common_vendor.p({
          type: "digit",
          placeholder: "请输入子码数量",
          modelValue: formData.value.zmsl
        }),
        y: common_vendor.p({
          label: "子码数量:",
          name: "zmsl",
          rules: [{
            required: true,
            errorMessage: "请输入子码数量"
          }],
          required: true
        }),
        z: common_vendor.sr(form, "4cf24e83-0", {
          "k": "form"
        }),
        A: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px",
          ["label-align"]: "left"
        }),
        B: loading.value,
        C: loading.value,
        D: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesZhongzhi/shengchengspAdd/shengchengspAdd.vue"]]);
wx.createPage(MiniProgramPage);
