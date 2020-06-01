import {Before, After, Status, BeforeAll, AfterAll} from 'cucumber'
import { browser } from 'protractor';

    BeforeAll({timeout: 100 * 1000}, async ()=>{
      await browser.waitForAngularEnabled(true);
     // await browser.waitForAngularEnabled(false);
    });

  Before(async function () {
    await browser.waitForAngularEnabled(true);
    await browser.manage().window().maximize();
    });

  After(async function(scenarioResult) {
    let self = this;
    if (scenarioResult.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function (screenshot) {
        const decodedImage = new Buffer(screenshot.replace(/^data:image\/png;base64,/, ''), 'base64');
        self.attach(decodedImage, 'image/png');
        console.log("scenarioResult: " + scenarioResult.result.status);
        
    });
}   
    await browser.manage().deleteAllCookies();
    });
