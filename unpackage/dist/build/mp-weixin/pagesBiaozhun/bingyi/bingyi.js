"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-data-select")+e.resolveComponent("uni-section"))()}Math||((()=>"../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js"))();const t={__name:"bingyi",setup(t){const n=e.ref(""),i=e.ref([{value:"1",text:"口蹄疫疫苗"},{value:"2",text:"口蹄疫疫苗2"}]),l=()=>{console.log("真改啊")},o=e.computed((()=>i.value.find((e=>e.id===n.value))));return e.onShow((()=>{(async()=>{const t={qyid:e.index.getStorageSync("user").qyid},l=await e.index.$post("/bybz",t);i.value=l.data.map((e=>({...e,text:e.bytname,value:e.id}))),n.value=i.value[0].id})()})),(t,a)=>e.e({a:e.o(l),b:e.o((e=>n.value=e)),c:e.p({clear:!1,localdata:i.value,modelValue:n.value}),d:e.unref(o)},e.unref(o)?{e:e.p({type:"line",title:"症状:",titleFontSize:"16px",titleFontWeight:"bold"}),f:e.t(e.unref(o).symptom||"暂无"),g:e.p({type:"line",title:"传播途径:",titleFontSize:"16px",titleFontWeight:"bold"}),h:e.t(e.unref(o).cbtj||"暂无"),i:e.p({type:"line",title:"诊断标准:",titleFontSize:"16px",titleFontWeight:"bold"}),j:e.t(e.unref(o).zdstandard||"暂无"),k:e.p({type:"line",title:"治疗方案:",titleFontSize:"16px",titleFontWeight:"bold"}),l:e.t(e.unref(o).zlfa||"暂无")}:{})}};wx.createPage(t);
