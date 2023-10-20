"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../network/request.js");
require("../../config/global-config.js");
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
  __name: "login",
  setup(__props) {
    const form = common_vendor.ref(null);
    const loading = common_vendor.ref(false);
    const formData = common_vendor.ref({
      phone: "",
      password: ""
    });
    const submitForm = async () => {
      try {
        console.log("denlu");
        await form.value.validate();
        loading.value = true;
        const res = await common_vendor.index.$post("/loginIng", formData.value);
        console.log(res);
        if (res.msg == "账号或密码输入错误") {
          loading.value = false;
          return common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
        common_vendor.index.setStorageSync("user", res.data);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/home/index/index"
          });
        }, 500);
      } catch (e) {
        console.log("shibai");
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      const user = common_vendor.index.getStorageSync("user");
      console.log(user);
      if (user.phone) {
        common_vendor.index.reLaunch({
          url: "/pages/home/index/index"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.value.phone = $event),
        b: common_vendor.p({
          prefixIcon: "person",
          type: "text",
          placeholder: "请输入账号",
          modelValue: formData.value.phone
        }),
        c: common_vendor.p({
          ["label-width"]: "55px",
          label: "账号:",
          required: true,
          name: "phone",
          rules: [{
            required: true,
            errorMessage: "请输入账号"
          }]
        }),
        d: common_vendor.o(($event) => formData.value.password = $event),
        e: common_vendor.p({
          prefixIcon: "locked",
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.password
        }),
        f: common_vendor.p({
          ["label-width"]: "55px",
          required: true,
          label: "密码:",
          name: "password",
          rules: [{
            required: true,
            errorMessage: "请输入密码"
          }]
        }),
        g: common_vendor.sr(form, "e4e4508d-0", {
          "k": "form"
        }),
        h: common_vendor.p({
          modelValue: formData.value
        }),
        i: common_vendor.o(submitForm),
        j: loading.value,
        k: loading.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
