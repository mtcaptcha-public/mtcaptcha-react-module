"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MTCaptcha", {
  enumerable: true,
  get: function get() {
    return _mtcaptcha.default;
  }
});
exports.default = void 0;

var _mtcaptchaWrapper = _interopRequireDefault(require("./mtcaptcha-wrapper"));

var _mtcaptcha = _interopRequireDefault(require("./mtcaptcha"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _mtcaptchaWrapper.default;
exports.default = _default;