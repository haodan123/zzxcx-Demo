"use strict";exports.getDate=()=>{let e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getUTCDate()+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())};
