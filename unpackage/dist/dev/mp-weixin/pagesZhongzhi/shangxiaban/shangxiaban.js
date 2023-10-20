"use strict";
const common_vendor = require("../../common/vendor.js");
const config_globalConfig = require("../../config/global-config.js");
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_auploadimg2 = common_vendor.resolveComponent("uni-auploadimg");
  (_easycom_uni_indexed_list2 + _easycom_uni_drawer2 + _easycom_uni_section2 + _easycom_uni_auploadimg2)();
}
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_auploadimg = () => "../../components/uni-auploadimg/uni-auploadimg.js";
if (!Math) {
  (_easycom_uni_indexed_list + _easycom_uni_drawer + _easycom_uni_section + _easycom_uni_auploadimg)();
}
const __default__ = {
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "shangxiaban",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const title = common_vendor.ref("");
    const latitude = common_vendor.ref("");
    const longitude = common_vendor.ref("");
    const marker = common_vendor.ref([]);
    const mymap = common_vendor.ref(null);
    const popup = common_vendor.ref();
    const outpopshow = common_vendor.ref(false);
    const letterlist = common_vendor.ref([{
      "letter": "A",
      "data": [
        "阿克苏机场",
        "阿拉山口机场",
        "阿勒泰机场",
        "阿里昆莎机场",
        "安庆天柱山机场",
        "澳门国际机场"
      ]
    }, {
      "letter": "B",
      "data": [
        "保山机场",
        "包头机场",
        "北海福成机场",
        "北京南苑机场",
        "北京首都国际机场"
      ]
    }]);
    const locadata = common_vendor.ref([]);
    const selectlocadata = common_vendor.ref([]);
    const formData = common_vendor.ref({
      //表单
      farmId: null,
      //农事关联ID
      personel: null,
      //人员关联ID(多选)
      workPosition: null,
      //上班位置
      imgList: null,
      //上班图片
      valuation: null,
      //计价方式 计时1 计件2
      jwd: null,
      //下班位置
      number: null,
      //完成株数
      personnel: null
      //下班记录id 件数
    });
    common_vendor.onLoad((opt) => {
      console.log("opt", opt);
      title.value = opt.index == 1 ? "上班" : "下班";
      formData.value.farmId = opt.id;
      common_vendor.index.setNavigationBarTitle({
        title: title.value
      });
      mymap.value = common_vendor.index.createMapContext("mymap");
      getpositon();
    });
    const getpositon = () => {
      common_vendor.index.getLocation({
        //返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res) {
          console.log(res, "====postion=====");
          latitude.value = res.latitude;
          longitude.value = res.longitude;
          formData.value.workPosition = res.longitude + "," + res.latitude;
          formData.value.jwd = res.longitude + "," + res.latitude;
          mymap.value.moveToLocation({
            longitude: longitude.value,
            latitude: latitude.value
          });
        },
        type: "gcj02",
        // 默认为 wgs84 
        fail(res) {
          console.log(res, "====postion=====");
        }
      });
    };
    const onChange = (e) => {
      formData.value.picture = String(e);
      console.log(String(formData.value.picture));
    };
    const bindClick = (e) => {
      let parr = [];
      let sarr = [];
      e.select.forEach((item) => {
        parr.push(item.name);
      });
      locadata.value.forEach((item) => {
        if (parr.includes(item.text)) {
          sarr.push(item);
        }
      });
      selectlocadata.value = sarr;
    };
    const submit = async (ref) => {
      loading.value = true;
      if (selectlocadata.value.length <= 0) {
        common_vendor.index.showToast({
          title: "请选择用工人员",
          icon: "none"
        });
        return;
      } else {
        let personarr = [];
        if (title.value == "上班") {
          selectlocadata.value.forEach((item) => {
            personarr.push(item.id);
          });
          fromdata.value.personel = personarr.toString();
        }
        if (title.value == "下班") {
          selectlocadata.value.forEach((item) => {
            if (fromdata.value.valuation == "1") {
              personarr.push({
                jlid: item.id
              });
            } else {
              let formid = "id" + item.id;
              if (fromdata.value.hasOwnProperty(formid)) {
                personarr.push({
                  jlid: item.id,
                  num: fromdata.value[formid]
                });
              }
            }
          });
          fromdata.value.personnel = personarr;
        }
      }
      if (!fromdata.value.imgList) {
        common_vendor.index.showToast({
          title: "请拍摄上传" + title.value + "照片",
          icon: "none"
        });
        return;
      }
      console.log(fromdata.value);
      if (title.value == "上班") {
        addcom();
      }
      if (title.value == "下班") {
        afterWork();
      }
    };
    const addcom = async () => {
      this.$httpRequest.easypost("addcomm", this.fromdata, (res) => {
        common_vendor.index.showToast({
          title: "保存成功"
        });
        loading.value = false;
        common_vendor.index.navigateBack({
          delta: 1
        });
      }, (fail) => {
        console.log(fail);
        loading.value = false;
        common_vendor.index.showToast({
          icon: "none",
          title: fail.data.msg
        });
      });
    };
    const afterWork = async () => {
      this.$httpRequest.easypost("afterWork", this.fromdata, (res) => {
        common_vendor.index.showToast({
          title: "保存成功"
        });
        loading.value = false;
        common_vendor.index.navigateBack({
          delta: 1
        });
      }, (fail) => {
        console.log(fail);
        loading.value = false;
        common_vendor.index.showToast({
          icon: "none",
          title: fail.data.msg
        });
      });
    };
    const open = () => {
      outpopshow.value = true;
      popup.value.open("left");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: outpopshow.value
      }, outpopshow.value ? {
        b: common_vendor.o(bindClick),
        c: common_vendor.p({
          options: letterlist.value,
          ["show-select"]: true
        })
      } : {}, {
        d: common_vendor.sr(popup, "0d64c463-0", {
          "k": "popup"
        }),
        e: common_vendor.p({
          mode: "left"
        }),
        f: longitude.value,
        g: latitude.value,
        h: marker.value,
        i: common_vendor.o(open),
        j: selectlocadata.value.length <= 0
      }, selectlocadata.value.length <= 0 ? {
        k: common_vendor.o(open)
      } : {}, {
        l: common_vendor.p({
          type: "line",
          title: "已选人员",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        m: common_vendor.f(selectlocadata.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text || item.name),
            b: common_vendor.o(open, index),
            c: index
          };
        }),
        n: common_vendor.o(onChange),
        o: common_vendor.p({
          action: common_vendor.unref(config_globalConfig.uploadUrl)
        }),
        p: common_vendor.p({
          type: "line",
          title: "拍摄" + title.value + "照片",
          titleFontSize: "16px",
          titleFontWeight: "bold"
        }),
        q: loading.value,
        r: loading.value,
        s: common_vendor.o(($event) => submit())
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/pagesZhongzhi/shangxiaban/shangxiaban.vue"]]);
wx.createPage(MiniProgramPage);
