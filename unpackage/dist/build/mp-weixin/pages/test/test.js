"use strict";const e=require("../../common/vendor.js"),o=require("../../utils/throttle.js"),t={__name:"test",setup(t){const l=e.ref("goods"),s=e.ref(0),c=e.ref([{label:"商品",value:"goods",to:"detail-swiper-selector"},{label:"评价",value:"comment",to:"detail-comment-selector"},{label:"详情",value:"detail",to:"detail-content-selector"}]),a=e.index.getSystemInfoSync(),n=a.statusBarHeight+44;console.log("divce",a);const r=a.statusBarHeight;let u={top:0,bottom:0};return e.onPageScroll((t=>{s.value=t.scrollTop>n?1:.01*t.scrollTop,0===u.top&&o.throttle((()=>{new Promise(((o,t)=>{e.index.createSelectorQuery().select(".detail-comment-selector").boundingClientRect((e=>{e?(u.top=e.top,u.bottom=e.top+e.height,o(e)):o(null)})).exec()}))}),50),t.scrollTop<u.top-n?l.value="goods":t.scrollTop>=u.top-n&&t.scrollTop<=u.bottom-n?l.value="comment":l.value="detail"})),e.onLoad((async()=>{e.index.onThemeChange((e=>{console.log("改变的",e.theme)})),e.index.getSystemInfo({success:e=>{console.log(e);const o=e.theme;console.log(o)}})})),(o,t)=>({a:e.f(c.value,((o,t,s)=>({a:e.t(o.label),b:e.o((t=>(o=>{let t=0;"comment"===o.value?t=u.top-n+1:"detail"===o.value&&(t=u.bottom-n+1),console.log(t),e.index.pageScrollTo({scrollTop:t,duration:200})})(o)),o.to),c:e.n(l.value===o.value?"current":""),d:o.to}))),b:e.s({height:e.unref(n)-e.unref(r)+"px",opacity:s.value})})}},l=e._export_sfc(t,[["__scopeId","data-v-29a71122"]]);t.__runtimeHooks=1,wx.createPage(l);