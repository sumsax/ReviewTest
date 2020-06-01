import {Given, When, Then} from 'cucumber'
import {LoginPage} from '../pageObjects/LoginPage'
import { browser } from 'protractor';

const loginPageObj = new LoginPage();

Given(/^User opens the browser and enter url$/,{timeout: 180 * 1000}, async ()=> {
  console.log("User open the browser and enter "+ loginPageObj.getJsonDataForEnvDetails()['url'] + " url");
  return await browser.get(loginPageObj.getJsonDataForEnvDetails()['url']);
});

Then(/^User enter username "([^"]*)" and password "([^"]*)"$/, async (username:string, password:string)=> {
  console.log("User enters username "+ username +" and password "+ password);
  (await loginPageObj.waitForElementToDisplay("TxtUserName", 30000)).clear().sendKeys(loginPageObj.getJsonDataForEnvDetails()[username]);
  return(await loginPageObj.waitForElementToDisplay("TxtPassword", 30000)).clear().sendKeys(loginPageObj.getJsonDataForEnvDetails()[password]);
});

Then(/^User clicks on login button$/, async ()=> {
  return await loginPageObj.executeJavaScriptToClick("BtnLoginName");
}); 

Then(/^oldI enter username "([^"]*)" and password "([^"]*)"$/, async (username:string, password:string)=> {
  console.log("User enters username "+ username +" and password "+ password);  
    await loginPageObj.mouseHover("LnkIronMountainWebsite");
    await loginPageObj.executeJavaScriptToEnterText("TxtUserName",username);
    return await loginPageObj.executeJavaScriptToEnterText("TxtPassword",password);
  //(await loginPageObj.waitForElementToDisplayPOM(loginPageObj.TxtUserName, 30000)).clear().sendKeys(loginPageObj.getJsonDataForEnvDetails().userDetails[0]);
  //(await loginPageObj.waitForElementToDisplayPOM(loginPageObj.TxtPassword, 30000)).clear().sendKeys(loginPageObj.getJsonDataForEnvDetails().userDetails[1]);
});

