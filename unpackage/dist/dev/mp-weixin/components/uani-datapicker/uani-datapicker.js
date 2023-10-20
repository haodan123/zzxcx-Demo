"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_transition2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_transition)();
}
const _sfc_main = {
  __name: "uani-datapicker",
  props: {
    clear: {
      type: Boolean,
      default: false
    },
    value: {
      //动态key值 取数组对象的value值
      type: [String, Number],
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    defaulttext: {
      //默认显示的文本
      type: [String, Number],
      default: ""
    },
    custext: {
      //自定义显示的文本 数组传custext
      type: Boolean,
      default: false
    },
    placeholder: {
      //默认提示文本
      type: String,
      default: "请选择"
    },
    emptytext: {
      //空数据显示文本
      type: String,
      default: "无 数 据"
    },
    localdata: {
      //动态监听数组
      type: Array,
      default: () => []
    },
    saoma: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ["input", "onSelect", "click", "popupclosed", "update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isOpened = common_vendor.ref(false);
    const showTrans = common_vendor.ref(false);
    common_vendor.ref();
    const poplist = common_vendor.ref([]);
    const inputtext = common_vendor.ref("");
    common_vendor.ref(true);
    common_vendor.ref(false);
    const styles = {
      disableColor: "#fff",
      color: "#000"
      // borderColor: '#2979FF'
    };
    common_vendor.watch(() => props.localdata, (newval, oldval) => {
      poplist.value = newval;
      if (poplist.value.length <= 0) {
        inputtext.value = "";
        emit("input", null);
      }
    }, {
      deep: true
    });
    common_vendor.watch(() => props.modelValue, (newval, oldval) => {
      const findval = poplist.value.find((item) => item.value == newval);
      onchange(findval);
    }, {
      deep: true
    });
    common_vendor.onLoad(() => {
      inputtext.value = props.defaulttext;
    });
    const clearValue = () => {
      emit("input", "");
      emit("update:modelValue", "");
      emit("onSelect", "");
      setTimeout(() => {
        close();
      });
    };
    const onchange = (e) => {
      let content;
      if (!e) {
        inputtext.value = "";
        content = "";
      } else {
        content = e.value;
      }
      if (props.custext) {
        inputtext.value = e.custext;
      } else {
        common_vendor.nextTick$1(() => {
          if (e) {
            inputtext.value = e.text;
          }
        });
      }
      emit("input", content);
      emit("update:modelValue", content);
      emit("onSelect", e);
      close();
    };
    const close = () => {
      isOpened.value = false;
      showTrans.value = false;
      emit("popupclosed");
    };
    const openpop = () => {
      showTrans.value = true;
      isOpened.value = true;
      emit("click");
      poplist.value = props.localdata;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => inputtext.value = $event),
        b: common_vendor.p({
          ["disabled-class"]: "custom-disabled-class",
          styles,
          placeholder: __props.placeholder,
          suffixIcon: "arrowdown",
          disabled: true,
          modelValue: inputtext.value
        }),
        c: __props.clear && inputtext.value
      }, __props.clear && inputtext.value ? {
        d: common_vendor.o(clearValue),
        e: common_vendor.p({
          type: "clear",
          color: "#c0c4cc",
          size: "22"
        })
      } : {}, {
        f: common_vendor.o(($event) => openpop()),
        g: isOpened.value
      }, isOpened.value ? {
        h: common_vendor.o(close)
      } : {}, {
        i: isOpened.value
      }, isOpened.value ? common_vendor.e({
        j: common_vendor.t(__props.placeholder),
        k: poplist.value.length > 0
      }, poplist.value.length > 0 ? {
        l: common_vendor.f(poplist.value, (item, index, i0) => {
          return common_vendor.e({
            a: __props.modelValue == item.value
          }, __props.modelValue == item.value ? {
            b: "0e1bb690-3-" + i0 + ",0e1bb690-2",
            c: common_vendor.p({
              type: "circle-filled",
              color: "#0062ff",
              size: "20"
            })
          } : {
            d: "0e1bb690-4-" + i0 + ",0e1bb690-2",
            e: common_vendor.p({
              type: "circle",
              size: "20",
              color: "#999"
            })
          }, {
            f: common_vendor.t(item.text),
            g: common_vendor.o(($event) => onchange(item), index),
            h: index
          });
        })
      } : {}, {
        m: poplist.value.length <= 0
      }, poplist.value.length <= 0 ? {
        n: common_vendor.t(__props.emptytext)
      } : {}, {
        o: common_vendor.p({
          duration: 200,
          ["mode-class"]: ["slide-bottom"],
          show: showTrans.value
        }),
        p: isOpened.value ? 1 : ""
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/components/uani-datapicker/uani-datapicker.vue"]]);
wx.createComponent(Component);
