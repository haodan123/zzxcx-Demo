"use strict";const e=require("../../../../common/vendor.js"),t=require("./test.js"),n=require("./digit.js");function r(e=undefined){let t=this.$parent;for(;t;){if(!t.$options||t.$options.name===e)return t;t=t.$parent}return!1}function o(e,t=new WeakMap){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);let n;if(e instanceof Date)n=new Date(e.getTime());else if(e instanceof RegExp)n=new RegExp(e);else if(e instanceof Map)n=new Map(Array.from(e,(([e,n])=>[e,o(n,t)])));else if(e instanceof Set)n=new Set(Array.from(e,(e=>o(e,t))));else if(Array.isArray(e))n=e.map((e=>o(e,t)));else if("[object Object]"===Object.prototype.toString.call(e)){n=Object.create(Object.getPrototypeOf(e)),t.set(e,n);for(const[r,i]of Object.entries(e))n[r]=o(i,t)}else n=Object.assign({},e);return t.set(e,n),n}function i(e=null,t="yyyy-mm-dd"){let n;n=e?/^\d{10}$/.test(null==e?void 0:e.toString().trim())?new Date(1e3*e):"string"==typeof e&&/^\d+$/.test(e.trim())?new Date(Number(e)):"string"==typeof e&&e.includes("-")&&!e.includes("T")?new Date(e.replace(/-/g,"/")):new Date(e):new Date;const r={y:n.getFullYear().toString(),m:(n.getMonth()+1).toString().padStart(2,"0"),d:n.getDate().toString().padStart(2,"0"),h:n.getHours().toString().padStart(2,"0"),M:n.getMinutes().toString().padStart(2,"0"),s:n.getSeconds().toString().padStart(2,"0")};for(const o in r){const[e]=new RegExp(`${o}+`).exec(t)||[];if(e){const n="y"===o&&2===e.length?2:0;t=t.replace(e,r[o].slice(n))}}return t}function s(e,t="both"){return e=String(e),"both"==t?e.replace(/^\s+|\s+$/g,""):"left"==t?e.replace(/^\s*/,""):"right"==t?e.replace(/(\s*$)/g,""):"all"==t?e.replace(/\s+/g,""):e}String.prototype.padStart||(String.prototype.padStart=function(e,t=" "){if("[object String]"!==Object.prototype.toString.call(t))throw new TypeError("fillString must be String");const n=this;if(n.length>=e)return String(n);const r=e-n.length;let o=Math.ceil(r/t.length);for(;o>>=1;)t+=t,1===o&&(t+=t);return t.slice(0,r)+n});const a=Object.freeze(Object.defineProperty({__proto__:null,$parent:r,addStyle:function(e,n="object"){if(t.empty(e)||"object"==typeof e&&"object"===n||"string"===n&&"string"==typeof e)return e;if("object"===n){const t=(e=s(e)).split(";"),n={};for(let e=0;e<t.length;e++)if(t[e]){const r=t[e].split(":");n[s(r[0])]=s(r[1])}return n}let r="";for(const t in e){r+=`${t.replace(/([A-Z])/g,"-$1").toLowerCase()}:${e[t]};`}return s(r)},addUnit:function(n="auto",r=((t=>{return null==(t=null==(n=null==(r=e.index)?void 0:r.$uv)?void 0:n.config)?void 0:t.unit;var n,r})()?(t=>{return null==(t=null==(n=null==(r=e.index)?void 0:r.$uv)?void 0:n.config)?void 0:t.unit;var n,r})():"px")){return n=String(n),t.number(n)?`${n}${r}`:n},deepClone:o,deepMerge:function e(t={},n={}){if("object"!=typeof(t=o(t))||null===t||"object"!=typeof n||null===n)return t;const r=Array.isArray(t)?t.slice():Object.assign({},t);for(const o in n){if(!n.hasOwnProperty(o))continue;const t=n[o],i=r[o];t instanceof Date?r[o]=new Date(t):t instanceof RegExp?r[o]=new RegExp(t):t instanceof Map?r[o]=new Map(t):t instanceof Set?r[o]=new Set(t):r[o]="object"==typeof t&&null!==t?e(i,t):t}return r},error:function(e){},formValidate:function(e,t){const n=r.call(e,"uv-form-item"),o=r.call(e,"uv-form");n&&o&&o.validateField(n.prop,(()=>{}),t)},getDuration:function(e,t=!0){const n=parseInt(e);return t?/s$/.test(e)?e:e>30?`${e}ms`:`${e}s`:/ms$/.test(e)?n:/s$/.test(e)?n>30?n:1e3*n:n},getHistoryPage:function(e=0){const t=getCurrentPages();return t[t.length-1+e]},getProperty:function(e,t){if(e){if("string"!=typeof t||""===t)return"";if(-1!==t.indexOf(".")){const n=t.split(".");let r=e[n[0]]||{};for(let e=1;e<n.length;e++)r&&(r=r[n[e]]);return r}return e[t]}},getPx:function(n,r=!1){return t.number(n)?r?`${n}px`:Number(n):/(rpx|upx)$/.test(n)?r?`${e.index.upx2px(parseInt(n))}px`:Number(e.index.upx2px(parseInt(n))):r?`${parseInt(n)}px`:parseInt(n)},guid:function(e=32,t=!0,n=null){const r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[];if(n=n||r.length,e)for(let i=0;i<e;i++)o[i]=r[0|Math.random()*n];else{let e;o[8]=o[13]=o[18]=o[23]="-",o[14]="4";for(let t=0;t<36;t++)o[t]||(e=0|16*Math.random(),o[t]=r[19==t?3&e|8:e])}return t?(o.shift(),`u${o.join("")}`):o.join("")},os:function(){return e.index.getSystemInfoSync().platform.toLowerCase()},padZero:function(e){return`00${e}`.slice(-2)},page:function(){var e;const t=getCurrentPages(),n=null==(e=t[t.length-1])?void 0:e.route;return`/${n||""}`},pages:function(){return getCurrentPages()},priceFormat:function(e,t=0,r=".",o=","){e=`${e}`.replace(/[^0-9+-Ee.]/g,"");const i=isFinite(+e)?+e:0,s=isFinite(+t)?Math.abs(t):0,a=void 0===o?",":o,c=void 0===r?".":r;let u="";u=(s?n.round(i,s)+"":`${Math.round(i)}`).split(".");const l=/(-?\d+)(\d{3})/;for(;l.test(u[0]);)u[0]=u[0].replace(l,`$1${a}$2`);return(u[1]||"").length<s&&(u[1]=u[1]||"",u[1]+=new Array(s-u[1].length+1).join("0")),u.join(c)},queryParams:function(e={},t=!0,n="brackets"){const r=t?"?":"",o=[];-1==["indices","brackets","repeat","comma"].indexOf(n)&&(n="brackets");for(const i in e){const t=e[i];if(!(["",void 0,null].indexOf(t)>=0))if(t.constructor===Array)switch(n){case"indices":for(let n=0;n<t.length;n++)o.push(`${i}[${n}]=${t[n]}`);break;case"brackets":default:t.forEach((e=>{o.push(`${i}[]=${e}`)}));break;case"repeat":t.forEach((e=>{o.push(`${i}=${e}`)}));break;case"comma":let e="";t.forEach((t=>{e+=(e?",":"")+t})),o.push(`${i}=${e}`)}else o.push(`${i}=${t}`)}return o.length?r+o.join("&"):""},random:function(e,t){if(e>=0&&t>0&&t>=e){const n=t-e+1;return Math.floor(Math.random()*n+e)}return 0},randomArray:function(e=[]){return e.sort((()=>Math.random()-.5))},range:function(e=0,t=0,n=0){return Math.max(e,Math.min(t,Number(n)))},setConfig:function({props:t={},config:n={},color:r={},zIndex:o={}}){const{deepMerge:i}=e.index.$uv;e.index.$uv.config=i(e.index.$uv.config,n),e.index.$uv.props=i(e.index.$uv.props,t),e.index.$uv.color=i(e.index.$uv.color,r),e.index.$uv.zIndex=i(e.index.$uv.zIndex,o)},setProperty:function(e,t,n){if(!e)return;const r=function(e,t,n){if(1!==t.length)for(;t.length>1;){const o=t[0];e[o]&&"object"==typeof e[o]||(e[o]={}),t.shift(),r(e[o],t,n)}else e[t[0]]=n};if("string"!=typeof t||""===t);else if(-1!==t.indexOf(".")){const o=t.split(".");r(e,o,n)}else e[t]=n},sleep:function(e=30){return new Promise((t=>{setTimeout((()=>{t()}),e)}))},sys:function(){return e.index.getSystemInfoSync()},timeFormat:i,timeFrom:function(e=null,t="yyyy-mm-dd"){null==e&&(e=Number(new Date)),10==(e=parseInt(e)).toString().length&&(e*=1e3);let n=(new Date).getTime()-e;n=parseInt(n/1e3);let r="";switch(!0){case n<300:r="刚刚";break;case n>=300&&n<3600:r=`${parseInt(n/60)}分钟前`;break;case n>=3600&&n<86400:r=`${parseInt(n/3600)}小时前`;break;case n>=86400&&n<2592e3:r=`${parseInt(n/86400)}天前`;break;default:r=!1===t?n>=2592e3&&n<31536e3?`${parseInt(n/2592e3)}个月前`:`${parseInt(n/31536e3)}年前`:i(e,t)}return r},toast:function(t,n=2e3){e.index.showToast({title:String(t),icon:"none",duration:n})},trim:s,type2icon:function(e="success",t=!1){-1==["primary","info","error","warning","success"].indexOf(e)&&(e="success");let n="";switch(e){case"primary":case"info":n="info-circle";break;case"error":n="close-circle";break;case"warning":n="error-circle";break;default:n="checkmark-circle"}return t&&(n+="-fill"),n}},Symbol.toStringTag,{value:"Module"}));exports.index=a;