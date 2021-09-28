"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mtcaptcha = _interopRequireDefault(require("./mtcaptcha"));

var _reactAsyncScript = _interopRequireDefault(require("react-async-script"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const callbackName = "onloadcallback";
const globalName = "mtcaptcha";

function getOptions() {
  return typeof window !== "undefined" && window.mtcaptchaconfiguration || {};
}

function getURL() {
  const dynamicOptions = getOptions();
  const mt_service = document.createElement("script");
  mt_service.src = "https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js";
  mt_service.async = true;
  document.body.appendChild(mt_service);
  const mt_service2 = document.createElement("script");
  mt_service2.src = "https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js";
  mt_service2.async = true;
  document.body.appendChild(mt_service2);
  return mt_service.src;
}

var _default = (0, _reactAsyncScript.default)(getURL, {
  globalName
})(_mtcaptcha.default);

exports.default = _default;