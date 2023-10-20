"use strict";
const getDate = () => {
  let data = /* @__PURE__ */ new Date();
  let year = data.getFullYear();
  let month = data.getMonth() + 1;
  let day = data.getUTCDate();
  let hours = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  let min = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  let second = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  let datepage = year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + second;
  return datepage;
};
exports.getDate = getDate;
