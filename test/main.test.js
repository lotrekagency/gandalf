import chai from 'chai';
import blockie from "../src/main";
/** @jsx h */
/*global describe,it*/


describe("Gandalf Blocking IE",() => {

  beforeEach("Clean up document body",()=>{
    document.body.innerHTML = "";
  });

  it("Call blockIe function without arg",()=>{
    blockie()    
    let expectedHtml = `
      <div>
        <div class="ieblocker__wrapper">
          <div class="ieblocker__modal">
            <h1>Internet Explorer isn't supported</h1>
            <p>We don't provide support for this browser</p>
            <div class="ieblocker__buttons-wrapper">
              <a href="https://www.google.com/intl/en/chrome/" class="btn btn-primary">Download Chrome</a>
              <a href="https://www.mozilla.org/firefox/new/" class="btn btn-primary">Download Firefox</a>
            </div>
          </div>
      </div>
    </div>`
    expectedHtml = minify(expectedHtml);
    chai.expect(document.body.innerHTML).to.equal(expectedHtml)
  });

  it('Call blockIe with specific content value', () => {
    let settingsFallBack = {
      "content":{
        "title": "Testing Suite | IE Block Title",
        "explanation": "Testing Suite | IE Block Description",
      }
    }
    blockie(settingsFallBack);
    let expectedHtml = `
      <div>
        <div class="ieblocker__wrapper">
          <div class="ieblocker__modal">
            <h1>${settingsFallBack.content.title}</h1>
            <p>${settingsFallBack.content.explanation}</p>
            <div class="ieblocker__buttons-wrapper">
              <a href="https://www.google.com/intl/en/chrome/" class="btn btn-primary">Download Chrome</a>
              <a href="https://www.mozilla.org/firefox/new/" class="btn btn-primary">Download Firefox</a>
            </div>
          </div>
      </div>
    </div>`
    expectedHtml = minify(expectedHtml);
    chai.expect(document.body.innerHTML).to.equal(expectedHtml)
  });

  it('Call blockIe with specific supported browser and classes', () => {
    let settingsFallBack = {
      "browsers": [
        {
          "name": "Vivaldi",
          "link": "https://vivaldi.com/",
          "download_text": "Download Vivaldi",
          "classes": ["btn","btn-primary","btn-primary--vivaldi"]
        },
        {
          "name": "Tor",
          "link": "https://www.torproject.org/download/",
          "download_text": "Download Tor",
          "classes": ["btn","btn-primary"]
        }
      ],
    }
    blockie(settingsFallBack);
    let expectedHtml = `
      <div>
        <div class="ieblocker__wrapper">
          <div class="ieblocker__modal">
            <h1>Internet Explorer isn't supported</h1>
            <p>We don't provide support for this browser</p>
            <div class="ieblocker__buttons-wrapper">
              <a href="${settingsFallBack.browsers[0].link}" class="${(settingsFallBack.browsers[0].classes).join(" ")}">${settingsFallBack.browsers[0].download_text}</a>
              <a href="${settingsFallBack.browsers[1].link}" class="${(settingsFallBack.browsers[1].classes).join(" ")}">${settingsFallBack.browsers[1].download_text}</a>
            </div>
          </div>
      </div>
    </div>`
    expectedHtml = minify(expectedHtml);
    chai.expect(document.body.innerHTML).to.equal(expectedHtml)
  });

  it("Call blockIe function with specific",()=>{
    let settingsFallBack = {
      "styles":{
        "wrapper": ["wrapperBlockIE"],
        "modal": ["wrapperModalIE","text-align-center"],
        "buttons_wrapper": ["ieblockerWrapperButtons","d-flex","justify-content-center"]
      }
    }
    blockie(settingsFallBack)    
    let expectedHtml = `
      <div>
        <div class="${settingsFallBack.styles.wrapper}">
          <div class="${(settingsFallBack.styles.modal).join(" ")}">
            <h1>Internet Explorer isn't supported</h1>
            <p>We don't provide support for this browser</p>
            <div class="${(settingsFallBack.styles.buttons_wrapper).join(" ")}">
              <a href="https://www.google.com/intl/en/chrome/" class="btn btn-primary">Download Chrome</a>
              <a href="https://www.mozilla.org/firefox/new/" class="btn btn-primary">Download Firefox</a>
            </div>
          </div>
      </div>
    </div>`
    expectedHtml = minify(expectedHtml);
    chai.expect(document.body.innerHTML).to.equal(expectedHtml)
  });

})



function minify( s ){
  return s
    .replace(/\>[\r\n ]+\</g, "><")
    .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')
    .trim()
}
