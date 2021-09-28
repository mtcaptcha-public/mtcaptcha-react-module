import MTCaptcha from "./mtcaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "mtcaptcha";

function getOptions() {
    return (typeof window !== "undefined" && window.mtcaptchaConfig) || {};
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
    return mt_service.src
}

export default makeAsyncScriptLoader(getURL, {
    globalName,
})(MTCaptcha);
