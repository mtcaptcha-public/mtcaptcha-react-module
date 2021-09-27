# react-mtcaptcha


React component for [MTCaptcha][mtcaptcha].

## Installation

```shell
npm install --save react-mtcaptcha
```

## Usage

All you need to do is [sign up for an API key pair][signup]. You will need the client key then you can use `<MTCaptcha />`.

The default usage imports a wrapped component that loads the mtcaptcha script asynchronously then instantiates a `MTCaptcha` the user can then interact with.

Code Example:
```jsx
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

ReactDOM.render(
  <ReCAPTCHA
    sitekey="Your client site key"
    onChange={onChange}
  />,
  document.body
);
```

### Component Props

Properties used to customise the rendering:

| Name | Type | Description |
|:---- | ---- | ------ |
| sitekey | string | The API client key |
| onChange | func | The function to be called when the user successfully completes the captcha |
| theme | enum | *optional*  The theme of the widget *(__defaults:__ `basic`)*. See [example][docs_theme]
| type | enum | *optional* `standard` or `imageonly` The type of initial captcha *(__defaults:__ `image`)*
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |
| onErrored | func | *optional* callback when the challenge errored, most likely due to network issues. |
| lang | string | *optional* set the lang parameter, which allows the captcha to be used from different languages, see [lang] |
| widgetSize | enum | *optional* `standard`or `modern mini`. This allows you to change the size or do an invisible captcha |



[mtcaptcha]: https://www.mtcaptcha.com/
[signup]: https://admin.mtcaptcha.com/signup/
[docs]: https://www.mtcaptcha.com/dev-guide-quickstart
[docs_theme]: https://service.mtcaptcha.com/mtcv1/demo/index.html?tab=2
[js_api]: https://www.mtcaptcha.com/dev-guide-js-apis
[lang]: https://www.mtcaptcha.com/dev-guide-custom-messages
