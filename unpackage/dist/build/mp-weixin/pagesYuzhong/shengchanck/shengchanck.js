"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-data-select")+e.resolveComponent("uni-section"))()}Math||((()=>"../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js"))();const t={__name:"shengchanck",setup(t){const n=e.ref(""),i=e.ref([{value:"1",text:"种鹿标准"},{value:"2",text:"口蹄疫疫苗2"}]),o=()=>{console.log("真改啊")},l=e.computed((()=>i.value.find((e=>e.id===n.value))||""));return e.onShow((()=>{(async()=>{let t={qyid:e.index.getStorageSync("user").qyid};const o=await e.index.$post("/sccs",t);i.value=o.data.map((e=>({...e,text:e.bzname,value:e.id}))),n.value=i.value[0].id})()})),(t,a)=>({a:e.o(o),b:e.o((e=>n.value=e)),c:e.p({clear:!1,localdata:i.value,modelValue:n.value}),d:e.p({type:"line",title:"种鹿选择标准:",titleFontSize:"16px",titleFontWeight:"bold"}),e:e.t(e.unref(l).bzvariety||"暂无"),f:e.p({type:"line",title:"环境标准:",titleFontSize:"16px",titleFontWeight:"bold"}),g:e.t(e.unref(l).bzenvironment||"暂无"),h:e.p({type:"line",title:"备注:",titleFontSize:"16px",titleFontWeight:"bold"}),i:e.t(e.unref(l).remarks||"暂无")})}};wx.createPage(t);
