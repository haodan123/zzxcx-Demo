"use strict";const e=require("../../common/vendor.js");if(require("../../network/request.js"),require("../../config/global-config.js"),!Array){e.resolveComponent("uni-search-bar")()}Math;const o={__name:"erbiao",setup(o){const a=e.ref(),l=e.ref();e.ref();const s=e.ref([]),n=e.ref([]),u=()=>{searchValue.value=""},c=()=>{console.log("搜索")},d=()=>{console.log("搜索")},r=(e,o)=>!(e.length<1)&&e.find((e=>e.id===o.id));e.onLoad((({eb:e,qsid:o,dyid:s})=>{console.log(l,a),a.value=o,l.value=s,e&&(n.value=JSON.parse(e),console.log(n.value))})),e.onShow((()=>{(async()=>{let o={qyid:e.index.getStorageSync("user").qyid,unitid:l.value,qsid:a.value,status:"1"};const n=await e.index.$post("/lufiles",o);s.value=n.data.map((e=>({...e,text:e.deernum||e.id,value:e.deernum||e.id}))),console.log(s.value)})()}));const t=()=>{e.index.setStorage({key:"selectAddress",data:n.value,success(){e.index.navigateBack()}})};return(o,a)=>({a:e.o(d),b:e.o(c),c:e.o(u),d:e.o((e=>o.searchValue=e)),e:e.p({placeholder:"通过耳标编号查询",modelValue:o.searchValue}),f:e.f(s.value,((o,a,l)=>({a:e.t(o.deernum||o.id),b:r(n.value,o)?1:"",c:a,d:e.o((e=>(e=>{if(r(n.value,e)){const o=n.value.findIndex((o=>o.id===e.id));console.log(o),n.value.splice(o,1)}else console.log("eb",n.value),n.value=[...n.value,e];console.log("最后选中",n.value)})(o)),a)}))),g:e.o(t)})}},a=e._export_sfc(o,[["__scopeId","data-v-6c1e2db4"]]);wx.createPage(a);
