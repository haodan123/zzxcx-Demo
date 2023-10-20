"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "uni-auploadimg",
  props: {
    //文件列表
    fileLists: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    //上传路径
    action: {
      type: String,
      default: ""
    },
    //最小文件数量
    minsize: {
      type: Number,
      default: 1
    },
    //最大文件数量
    maxsize: {
      type: Number,
      default: 9
    },
    //上传文件类型
    uptype: {
      type: Array,
      default: () => ["image"]
    }
  },
  emits: ["onChange"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.onLoad(() => {
    });
    const popup = common_vendor.ref(null);
    const fileList = common_vendor.ref(props.fileLists);
    const deleteindex = common_vendor.ref(null);
    const delimg = (index) => {
      deleteindex.value = index;
      open();
    };
    const addimg = () => {
      filePic();
    };
    const open = () => {
      popup.value.open();
    };
    const close = () => {
      popup.value.close();
    };
    const confirm = () => {
      if (deleteindex.value != null) {
        fileList.value.splice(deleteindex.value, 1);
      }
      deleteindex.value = null;
      emit("onChange", fileList.value);
      popup.value.close();
    };
    const filePic = () => {
      common_vendor.index.chooseMedia({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        //从相册选择
        mediaType: props.uptype,
        //文件类型
        success: function(res) {
          console.log(res);
          if (res.tempFiles[0].fileType == "video") {
            uploadImg("video", res.tempFiles[0].tempFilePath, res.tempFiles[0].thumbTempFilePath);
          } else {
            uploadImg("image", res.tempFiles[0].tempFilePath);
          }
        }
      });
    };
    const uploadImg = (type, path, videopath) => {
      common_vendor.index.showLoading({
        title: "文件上传中"
      });
      common_vendor.index.uploadFile({
        url: props.action,
        filePath: path,
        name: "file",
        success: (res) => {
          let newRes = JSON.parse(res.data);
          console.log(newRes);
          if (newRes.code == "200") {
            common_vendor.index.showToast({
              title: "上传成功"
            });
            if (type == "video") {
              let videourl = null;
              videourl = newRes.url;
              common_vendor.index.uploadFile({
                url: props.action,
                filePath: videopath,
                name: "file",
                success: (res2) => {
                  let newRes2 = JSON.parse(res2.data);
                  if (newRes2.code == "200") {
                    common_vendor.index.showToast({
                      title: "上传成功"
                    });
                    fileList.value.push({
                      url: videourl,
                      preimg: newRes2.url,
                      type
                    });
                    emit("onChange", fileList.value);
                  } else {
                    common_vendor.index.showToast({
                      icon: "none",
                      title: "网络异常，稍后再试"
                    });
                  }
                  common_vendor.index.hideLoading();
                },
                fail: (res2) => {
                  common_vendor.index.hideLoading();
                }
              });
            } else {
              if (newRes.url.startsWith("http://")) {
                console.log("http开头");
                newRes.url = newRes.url.replace("http://", "https://");
              }
              fileList.value.push(newRes.url);
            }
            emit("onChange", fileList.value);
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "网络异常，稍后再试"
            });
          }
          common_vendor.index.hideLoading();
        },
        fail: (res) => {
          common_vendor.index.hideLoading();
        }
      });
    };
    const preimg = (index) => {
      common_vendor.wx$1.previewMedia({
        sources: fileList.value,
        // 需要预览的资源列表
        current: index,
        // 当前显示的资源序号
        url: fileList.value[index]
        // 当前预览资源的url链接
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(fileList.value, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => preimg(index), index),
            c: common_vendor.o(($event) => delimg(index), index),
            d: "163056dc-0-" + i0,
            e: index
          };
        }),
        b: common_vendor.p({
          type: "minus-filled",
          size: "25",
          color: "red"
        }),
        c: fileList.value.length < __props.maxsize
      }, fileList.value.length < __props.maxsize ? {
        d: common_vendor.p({
          type: "plusempty",
          size: "30",
          color: "#7a7a7a"
        }),
        e: common_vendor.o(addimg)
      } : {}, {
        f: common_vendor.o(close),
        g: common_vendor.o(confirm),
        h: common_vendor.p({
          content: "确定删除此项吗"
        }),
        i: common_vendor.sr(popup, "163056dc-2", {
          "k": "popup"
        }),
        j: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhiyonghuang/Desktop/未命名文件夹/达州/dzzzjgxcx/components/uni-auploadimg/uni-auploadimg.vue"]]);
wx.createComponent(Component);
