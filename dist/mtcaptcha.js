"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

const _excluded = ["sitekey", "onVerified", "theme", "type", "onExpired", "onErrored", "widgetSize", "mtcaptcha", "language"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

class MTCaptcha extends _react.default.Component {
  constructor() {
    super();
    this.handleExpired = this.handleExpired.bind(this);
    this.handleErrored = this.handleErrored.bind(this);
    this.handleVerified = this.handleVerified.bind(this);
    this.handleRecaptchaRef = this.handleRecaptchaRef.bind(this);
  }

  getValue() {
    if (this.props.mtcaptcha && this._widgetId !== undefined) {
      return this.props.mtcaptcha.getResponse(this._widgetId);
    }

    return null;
  }

  getWidgetId() {
    if (this.props.mtcaptcha && this._widgetId !== undefined) {
      return this._widgetId;
    }

    return null;
  }

  execute() {
    const {
      mtcaptcha
    } = this.props;

    if (mtcaptcha && this._widgetId !== undefined) {
      return mtcaptcha.execute(this._widgetId);
    } else {
      this._executeRequested = true;
    }
  }

  executeAsync() {
    return new Promise((resolve, reject) => {
      this.executionResolve = resolve;
      this.executionReject = reject;
      this.execute();
    });
  }

  reset() {
    if (this.props.mtcaptcha && this._widgetId !== undefined) {
      this.props.mtcaptcha.reset(this._widgetId);
    }
  }

  handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else {
      this.handleVerified(null);
    }
  }

  handleErrored() {
    if (this.props.onErrored) {
      this.props.onErrored("err");
    }

    if (this.executionReject) {
      this.executionReject();
      delete this.executionResolve;
      delete this.executionReject;
    }
  }

  handleVerified(token) {
    if (this.props.onVerified) {
      this.props.onVerified(token);
    }

    if (this.executionResolve) {
      this.executionResolve(token);
      delete this.executionReject;
      delete this.executionResolve;
    }
  }

  explicitRender() {
    if (this.props.mtcaptcha && this.props.mtcaptcha.renderUI && this._widgetId === undefined) {
      const wrapper = document.createElement("div");
      wrapper.id = this.props.sitekey;
      this._widgetId = this.props.mtcaptcha.renderUI(wrapper.id, {
        sitekey: this.props.sitekey,
        domId: this.props.id,
        theme: this.props.theme,
        widgetSize: this.props.widgetSize,
        lang: this.props.language,
        type: this.props.type,
        "verified-callback": this.handleVerified,
        "verifyexpired-callback": this.handleExpired,
        "error-callback": this.handleErrored
      });
      this.captcha.appendChild(wrapper);
    }

    if (this._executeRequested && this.props.mtcaptcha && this._widgetId !== undefined) {
      this._executeRequested = false;
      this.execute();
    }
  }

  componentDidMount() {
    this.explicitRender();
  }

  componentDidUpdate() {
    this.explicitRender();
  }

  componentWillUnmount() {
    if (this._widgetId !== undefined) {
      this.delayOfCaptchaIframeRemoving();
      this.reset();
    }
  }

  delayOfCaptchaIframeRemoving() {
    const temporaryNode = document.createElement("div");
    document.body.appendChild(temporaryNode);
    temporaryNode.style.display = "none"; // move of the recaptcha to a temporary node

    while (this.captcha.firstChild) {
      temporaryNode.appendChild(this.captcha.firstChild);
    } // delete the temporary node after reset will be done


    setTimeout(() => {
      document.body.removeChild(temporaryNode);
    }, 5000);
  }

  handleRecaptchaRef(elem) {
    this.captcha = elem;
  }

  render() {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.

    /* eslint-disable no-unused-vars */
    const _this$props = this.props,
          {
      sitekey,
      onVerified,
      theme,
      type,
      onExpired,
      onErrored,
      widgetSize,
      mtcaptcha,
      language
    } = _this$props,
          childProps = _objectWithoutProperties(_this$props, _excluded);
    /* eslint-enable no-unused-vars */


    return /*#__PURE__*/_react.default.createElement("div", _extends({}, childProps, {
      ref: this.handleRecaptchaRef
    }));
  }

}

exports.default = MTCaptcha;
MTCaptcha.displayName = "MTCaptcha";
MTCaptcha.propTypes = {
  sitekey: _propTypes.default.string.isRequired,
  onVerified: _propTypes.default.func,
  mtcaptcha: _propTypes.default.object,
  theme: _propTypes.default.string,
  type: _propTypes.default.oneOf(["standard", "imageonly"]),
  onExpired: _propTypes.default.func,
  onErrored: _propTypes.default.func,
  widgetSize: _propTypes.default.string,
  language: _propTypes.default.string
};
MTCaptcha.defaultProps = {
  onVerified: () => {}
};