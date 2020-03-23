import h from 'vhtml';
import style from "./style.css";

/** @jsx h */

let settingsFallBack = {
  "content":{
    "title": "Internet Explorer isn't supported",
    "explanation": "We don't provide support for this browser",
  },
  "browsers": [
      {
        "name": "Chrome",
        "link": "https://www.google.com/intl/en/chrome/",
        "download_text": "Download Chrome",
        "classes": ["btn","btn-primary"]
      },
      {
        "name": "Firefox",
        "link": "https://www.mozilla.org/firefox/new/",
        "download_text": "Download Firefox",
        "classes": ["btn","btn-primary"]
      }
  ],
  "styles":{
    "wrapper": ["ieblocker__wrapper"],
    "modal": ["ieblocker__modal"],
    "buttons_wrapper": ["ieblocker__buttons-wrapper"]
  }
};

export default function blockIe(config = settingsFallBack){
  const CURRENT_SETTING = (config?.content|| settingsFallBack?.content)
  const IE_WRAPPER_CLASSES = (config?.styles?.wrapper || settingsFallBack.styles.wrapper)
  const IE_MODAL_CLASSES = (config?.styles?.modal || settingsFallBack.styles.modal)
  const IE_BUTTONS_WRAPPER__CLASSES = (config?.styles?.buttons_wrapper || settingsFallBack.styles.buttons_wrapper);
  const BROWSERS = config.browsers || settingsFallBack.browsers;
  let wrapper = document.createElement("div");
  wrapper.innerHTML = (
    <div className={IE_WRAPPER_CLASSES.join(' ')}>
      <div className={IE_MODAL_CLASSES.join(' ')}>
        <h1>{CURRENT_SETTING['title']}</h1>
        <p>{CURRENT_SETTING['explanation']}</p>
        <div className={IE_BUTTONS_WRAPPER__CLASSES.join(' ')}>
          { BROWSERS.map( browser => (
            <a href={browser.link} className={browser.classes.join(' ')}>{browser.download_text}</a>
          )) }
        </div>
      </div>     
    </div>
  );
  
  document.body.appendChild(wrapper);  
}

if(window !== undefined){
  window.blockIe = blockIe;
}

