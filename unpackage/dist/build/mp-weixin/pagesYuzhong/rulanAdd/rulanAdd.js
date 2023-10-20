"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js"),l=require("../../config/global-config.js");if(require("../../network/request.js"),!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uani-datapicker")+e.resolveComponent("uni-auploadimg")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../components/uani-datapicker/uani-datapicker.js")+(()=>"../../components/uni-auploadimg/uni-auploadimg.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const i={__name:"rulanAdd",setup(i){const o=e.ref(),n=e.ref({name:e.index.getStorageSync("user").zname||"",lzbianhao:"",dyid:"",qsid:"",sex:"",weight:"",lid:"",fbianhao:"",mbianhao:"",pinzhong:"",picture:[]}),u=e.ref(!1),t=e.ref([]),s=e.ref([]),r=e.ref([]),d=e.ref([{value:"1",text:"公鹿"},{value:"2",text:"母鹿"}]),p=e=>{n.value.sex=e.value,console.log(n.value.sex)},v=e=>{n.value.picture=String(e),console.log(String(n.value.picture))},c=a=>{console.log(a),a.value||e.index.showToast({title:"未找到该单元",icon:"none"}),n.value.qsid="",n.value.lzid="",n.value.lzbh="",r.value=[],x(),console.log(n.value.lid)},m=e=>{console.log(n.value.lid)},h=e=>{console.log(n.value.pinzhong)},g=()=>{e.index.showLoading(),o.value.validate().then((async a=>{let l={qyid:e.index.getStorageSync("user").qyid,unitid:n.value.dyid,jsid:n.value.qsid,number:n.value.lzbianhao,sex:n.value.sex,variety:n.value.pinzhong,weight:n.value.weight,picture:String(n.value.picture),fnumber:n.value.fbianhao,mnumber:n.value.mbianhao,person:e.index.getStorageSync("user").name};u.value?(l.id=n.value.id,await e.index.$post("/addrljd",l)):await e.index.$post("/addrljd",l),e.index.showToast({title:"操作成功"}),setTimeout((()=>{e.index.navigateBack()}),1e3),e.index.hideLoading()})).catch((a=>{e.index.hideLoading(),console.log("表单错误信息：",a)}))},b=async()=>{let a={qyid:e.index.getStorageSync("user").qyid};const l=await e.index.$post("/unitlist",a);s.value=l.data.map((e=>({value:e.id,text:e.unitname})))},x=async()=>{let a={unitid:n.value.dyid};const l=await e.index.$post("/qslists",a);console.log("获取犬舍信息",l.data),r.value=l.data.map((e=>({value:e.id,text:e.enclosurename})))};e.onLoad((async({item:e})=>{if(e){await b();const a=JSON.parse(e);n.value.dyid=a.unitid,n.value.lzbianhao=a.number,n.value.id=a.id,n.value.weight=a.weight,n.value.picture=a.picture,n.value.fbianhao=a.fnumber,n.value.mbianhao=a.mnumber,await x(),n.value.sex=a.sex,n.value.pinzhong=a.variety,n.value.qsid=a.jsid,console.log("更新性别",a.sex,n.value),u.value=!0}})),e.onShow((()=>{b(),(async()=>{const a=await e.index.$post("/dictType?dictType=breed_status");console.log("获取品种信息",a.data),t.value=a.data.map((e=>({value:e.dictValue,text:e.dictLabel}))),d.value=[{value:"1",text:"公鹿"},{value:"2",text:"母鹿"}]})()}));const f=a=>{e.index.scanCode({success:async function(e){let l=JSON.parse(e.result);console.log(l),l&&("quanshe"==a?(n.value.dyid=l.unitid,await x(),n.value.qsid=l.qsid,console.log("扫码圈舍",n.value.qsid)):"fudai"==a?n.value.fbianhao=l:"mudai"==a?n.value.mbianhao=l:"luzhi"==a&&(n.value.lzbianhao=l))},fail:function(a){console.log(a),e.index.showToast({title:"请扫描正确的二维码！",icon:"none",duration:2e3})}})};return(i,b)=>e.e({a:e.o((e=>n.value.lzbianhao=e)),b:e.p({type:"text",placeholder:"请输入编号",modelValue:n.value.lzbianhao}),c:e.o((e=>f("luzhi"))),d:a._imports_0,e:e.p({label:"鹿只编号:",name:"lzbianhao"}),f:e.o(c),g:e.o((e=>n.value.dyid=e)),h:e.p({localdata:s.value,placeholder:"请选择",modelValue:n.value.dyid}),i:e.p({rules:[{required:!0,errorMessage:"请选择所在单元"}],label:"所在单元:",name:"dyid",required:!0}),j:e.o(m),k:e.o((e=>n.value.qsid=e)),l:e.p({localdata:r.value,placeholder:"请选择",modelValue:n.value.qsid}),m:e.o((e=>f("quanshe"))),n:a._imports_0,o:e.p({rules:[{required:!0,errorMessage:"请选择所在圈舍"}],label:"所在圈舍:",name:"qsid",required:!0}),p:e.o(p),q:e.o((e=>n.value.sex=e)),r:e.p({localdata:d.value,placeholder:"请选择",modelValue:n.value.sex}),s:e.p({rules:[{required:!0,errorMessage:"请选择性别"}],label:"性别:",name:"sex",required:!0}),t:e.o(h),v:e.o((e=>n.value.pinzhong=e)),w:e.p({localdata:t.value,placeholder:"请选择",modelValue:n.value.pinzhong}),x:e.p({rules:[{required:!0,errorMessage:"请输入鹿只品种"}],label:"鹿只品种:",name:"pinzhong",required:!0}),y:e.o((e=>n.value.weight=e)),z:e.p({type:"text",placeholder:"请输入重量,单位kg",modelValue:n.value.weight}),A:e.p({rules:[{required:!0,errorMessage:"请输入重量"}],label:"重量:",name:"weight",required:!0}),B:e.o((e=>n.value.fbianhao=e)),C:e.p({type:"text",placeholder:"请输入父代编号",modelValue:n.value.fbianhao}),D:e.o((e=>f("fudai"))),E:a._imports_0,F:e.p({label:"父代编号:",name:"fbianhao"}),G:e.o((e=>n.value.mbianhao=e)),H:e.p({type:"text",placeholder:"请输入母代编号",modelValue:n.value.mbianhao}),I:e.o((e=>f("mudai"))),J:a._imports_0,K:e.p({label:"母代编号:",name:"mbianhao"}),L:e.p({rules:[{required:!0,errorMessage:"请上传图片"}],label:"鹿只图片:",name:"picture",required:!0}),M:u.value},u.value?{N:e.o(v),O:e.p({fileLists:n.value.picture,action:e.unref(l.uploadUrl)})}:{P:e.o(v),Q:e.p({action:e.unref(l.uploadUrl)})},{R:e.sr(o,"1fcd1f40-0",{k:"form"}),S:e.p({modelValue:n.value,"label-width":"80px","label-align":"left"}),T:e.o(g)})}};wx.createPage(i);
