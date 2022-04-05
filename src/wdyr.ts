import React from "react";
// 只用于开发环境
if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 跟踪所有的函数组件
  });
}
