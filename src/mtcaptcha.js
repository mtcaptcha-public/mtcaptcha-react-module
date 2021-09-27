import React from "react";
import PropTypes from "prop-types";

export default class MTCaptcha extends React.Component {
  componentDidMount() {
    // window.mtcaptchaConfig = { "sitekey": "MTPublic-J46lvEOJn" };
  }

  constructor() {
    super();
    // window.mtcaptchaConfig = { "sitekey": "MTPublic-J46lvEOJn" };
    this.handleExpired = this.handleExpired.bind(this);
    this.handleErrored = this.handleErrored.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleVerified=this.handleVerified.bind(this);
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
    const { mtcaptcha } = this.props;

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
      this.handleChange(null);
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

  handleChange(token) {
    if (this.props.onChange) {
      this.props.onChange(token);
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
      wrapper.id=this.props.sitekey;
      this._widgetId = this.props.mtcaptcha.renderUI(wrapper.id, {
        sitekey: this.props.sitekey,
        domId:this.props.id,
        theme:this.props.theme,
        widgetSize:this.props.widgetSize,
        lang: this.props.language,
        type: this.props.type,
        "verified-callback":this.handleChange,
        "verifyexpired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
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
    temporaryNode.style.display = "none";

    // move of the recaptcha to a temporary node
    while (this.captcha.firstChild) {
      temporaryNode.appendChild(this.captcha.firstChild);
    }

    // delete the temporary node after reset will be done
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
    const {
      sitekey,
      onChange,
      theme,
      type,
      onExpired,
      onErrored,
      widgetSize,
      mtcaptcha,
      language,
      ...childProps
    } = this.props;
    /* eslint-enable no-unused-vars */
    return <div {...childProps} ref={this.handleRecaptchaRef} />;
  }
}

MTCaptcha.displayName = "MTCaptcha";
MTCaptcha.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  mtcaptcha: PropTypes.object,
  theme: PropTypes.string,
  type: PropTypes.oneOf(["standard", "imageonly"]),
  onExpired: PropTypes.func,
  onErrored: PropTypes.func,
  widgetSize: PropTypes.string,
  language: PropTypes.string,
};
MTCaptcha.defaultProps = {
  onChange: () => { },
};
