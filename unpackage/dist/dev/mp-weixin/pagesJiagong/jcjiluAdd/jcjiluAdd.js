"use strict";
const common_vendor = require("../../common/vendor.js");
const config_globalConfig = require("../../config/global-config.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uani_datapicker2 = common_vendor.resolveComponent("uani-datapicker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_auploadimg2 = common_vendor.resolveComponent("uni-auploadimg");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uani_datapicker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2 + _easycom_uni_auploadimg2 + _easycom_uni_forms2)();
}
const _easycom_uani_datapicker = () => "../../components/uani-datapicker/uani-datapicker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_auploadimg = () => "../../components/uni-auploadimg/uni-auploadimg.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uani_datapicker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_datetime_picker + _easycom_uni_auploadimg + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "jcjiluAdd",
  setup(__props) {
    const form = common_vendor.ref();
    const formData = common_vendor.ref({
      jdname: common_vendor.index.getStorageSync("user").zname || "",
      //加工厂
      jgc: "",
      //加工厂
      jcpc: "",
      //检测批次
      pcname: "",
      //批次名称
      jclb: "",
      //检测类别
      jcjg: "",
      //检测结果
      sctime: "",
      //生产日期
      sjtime: "",
      //送检日期
      jctime: "",
      //检测日期
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
    const jgcList = common_vendor.ref([]);
    const jcpcList = common_vendor.ref([]);
    const jclbList = common_vendor.ref([]);
    const jcjgList = common_vendor.ref([]);
    common_vendor.ref([]);
    const onChange = (e) => {
      formData.value.picture = String(e);
      console.log(String(formData.value.picture));
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
    const ssnsSelect5 = (e) => {
    };
    const changTime = (value) => {
      console.log(value);
      const formattedDate = common_vendor.hooks(value).format("YYYY-MM-DD HH:mm:ss");
      formData.value.jctime = formattedDate;
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
        a: common_vendor.o(ssnsSelect2),
        b: common_vendor.o(($event) => formData.value.jgc = $event),
        c: common_vendor.p({
          localdata: jgcList.value,
          placeholder: "请选择",
          modelValue: formData.value.jgc
        }),
        d: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择加工厂名称"
          }],
          label: "加工厂名称:",
          name: "jgc",
          required: true
        }),
        e: common_vendor.o(ssnsSelect3),
        f: common_vendor.o(($event) => formData.value.jcpc = $event),
        g: common_vendor.p({
          localdata: jcpcList.value,
          placeholder: "请选择",
          modelValue: formData.value.jcpc
        }),
        h: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择检测批次"
          }],
          label: "检测批次:",
          name: "jcpc",
          required: true
        }),
        i: common_vendor.o(($event) => formData.value.pcname = $event),
        j: common_vendor.p({
          type: "digit",
          disabled: true,
          placeholder: "请输入批次名称",
          modelValue: formData.value.pcname
        }),
        k: common_vendor.p({
          label: "批次名称:",
          name: "pcname",
          rules: [{
            required: true,
            errorMessage: "请输入批次名称"
          }],
          required: true
        }),
        l: common_vendor.o(ssnsSelect4),
        m: common_vendor.o(($event) => formData.value.jclb = $event),
        n: common_vendor.p({
          localdata: jclbList.value,
          placeholder: "请选择",
          modelValue: formData.value.jclb
        }),
        o: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择检测类别"
          }],
          label: "检测类别:",
          name: "jclb",
          required: true
        }),
        p: common_vendor.o(ssnsSelect5),
        q: common_vendor.o(($event) => formData.value.jcjg = $event),
        r: common_vendor.p({
          localdata: jcjgList.value,
          placeholder: "请选择",
          modelValue: formData.value.jcjg
        }),
        s: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请选择检测结果"
          }],
          label: "检测结果:",
          name: "jcjg",
          required: true
        }),
        t: common_vendor.o(changTime),
        v: common_vendor.o(($event) => formData.value.sctime = $event),
        w: common_vendor.p({
          type: "datetime",
          returnType: "date",
          ["clear-icon"]: false,
          modelValue: formData.value.sctime
        }),
        x: common_vendor.p({
          label: "生产日期:",
          name: "sctime",
          rules: [{
            required: true,
            errorMessage: "请选择生产日期"
          }],
          required: true
        }),
        y: common_vendor.o(changTime),
        z: common_vendor.o(($event) => formData.value.sjtime = $event),
        A: common_vendor.p({
          type: "datetime",
          returnType: "date",
          ["clear-icon"]: false,
          modelValue: formData.value.sjtime
        }),
        B: common_vendor.p({
          label: "送检日期:",
          name: "sjtime",
          rules: [{
            required: true,
            errorMessage: "请选择送检日期"
          }],
          required: true
        }),
        C: common_vendor.o(changTime),
        D: common_vendor.o(($event) => formData.value.jctime = $event),
        E: common_vendor.p({
          type: "datetime",
          returnType: "date",
          ["clear-icon"]: false,
          modelValue: formData.value.jctime
        }),
        F: common_vendor.p({
          label: "检测日期:",
          name: "jctime",
          rules: [{
            required: true,
            errorMessage: "请选择检测日期"
          }],
          required: true
        }),
        G: common_vendor.p({
          rules: [{
            required: true,
            errorMessage: "请上传检测报告"
          }],
          label: "检测报告:",
          name: "picture",
          required: true
        }),
        H: common_vendor.o(onChange),
        I: common_vendor.p({
          action: common_vendor.unref(config_globalConfig.uploadUrl)
        }),
        J: common_vendor.sr(form, "96449d86-0", {
          "k": "form"
        }),
        K: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "100px",
          ["label-align"]: "left"
        }),
        L: loading.value,
        M: loading.value,
        N: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesJiagong/jcjiluAdd/jcjiluAdd.vue"]]);
wx.createPage(MiniProgramPage);
