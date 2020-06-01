import {Given, When, Then, Step} from 'cucumber'
import {browser, element, by, ElementFinder} from 'protractor'
//import {} from 'chai-as-promised';
import {BasePage} from '../pageObjects/BasePage';
const basePage = new BasePage();

import chai = require('chai');
chai.use(require('chai-smoothie'));
const expect = chai.expect;

Then(/^User execute customstep "([^"]*)"$/, async (text)=> {
  console.log("element is "+ await element(by.xpath("//*[@title='Digitization 00793647']/../../div/img")).getAttribute("title"));
});


Given(/^User reads the TestCaseID "([^"]*)"$/, async (TestCaseID:string)=> {
  console.log("Current TestCaseID is " + TestCaseID);
  basePage.setTestCaseName(TestCaseID);
});

Then(/^User enters "([^"]*)" in "([^"]*)"$/, async (text:string, element:string)=> {
  console.log(text+ " entered in " + element);
  return (await basePage.waitForElementToDisplay(element, 30000)).clear().sendKeys(basePage.getTestData(text));
});

Then(/^User clicks on "([^"]*)" button$/, async (elemReference:string)=> {
  console.log("Clicked on " + elemReference);
  await basePage.scrollToElement(elemReference);
  return (await basePage.waitForElementToDisplay(elemReference, 30000)).click();
});

Then(/^User clicks on "([^"]*)"$/, async (elemReference:string)=> {
  console.log("Clicked on " + elemReference);
  await basePage.scrollToElement(elemReference);
  return (await basePage.waitForElementToDisplay(elemReference, 60000)).click();
});

Then(/^User selects "([^"]*)" in popup$/, async (elemReference:string)=> {
  console.log("User selects " + elemReference + " in popup");
  return (await basePage.handleAlert(elemReference));
});

Then(/^User verifies the title "([^"]*)" of the page$/, async (text)=> {
  console.log("User verifies the title of the page " + text);  
  return await basePage.getPageTitle(text);
  });

Then(/^User verifies title "([^"]*)" of the page$/, async (text)=> {
  console.log("Page title: " + (await browser.getTitle()));
  return expect(await browser.getTitle()).to.equal(text);
});

Then(/^User waits for "([^"]*)" to get displayed$/, async (elementReference:string)=>{
  console.log("User waits for "+ elementReference +" to get displayed");
   return (await basePage.waitForElementToDisplay(elementReference,30000)).getText().then(function(text:string){
  console.log(text + " displayed on page and pass");
   });
});

Then(/^User waits for "([^"]*)" text to get displayed from element "([^"]*)"$/, async (text:string, elementReference:string)=>{
  console.log("User waits for "+ elementReference +" to get displayed");
  return (await basePage.waitForElementToDisplay(elementReference,30000)).getText().then(function(textOnPage:string){
    if(textOnPage == basePage.getTestData(text)){
      return console.log(text + " displayed on page and pass");
    } else if(textOnPage != text){
      expect.fail();
      return console.log("Expected " + text + " not displayed on page");
    }
   });
});

Then(/^User verifies the presence of "([^"]*)"$/, async (elementReference:string)=>{
  console.log("User verifies the presence "+ elementReference);
  return expect (await (await basePage.waitForElementToDisplay(elementReference,60000)).isPresent()).to.be.true;
});

Then(/^User switches to frame with name or index "([^"]*)"$/, async (frame)=> {
  console.log("User switches to frame with name or index "+ frame);
  return await basePage.switchToFrameByNameOrID(frame);
});

Then(/^User switches to default content$/, async ()=> {
  console.log("User switches to to default content ");
   return await basePage.switchToDefaultContent();
});

Then(/^User switches to window with index "([^"]*)"$/, async (index)=> {
  console.log("User switches to window with index "+ index);
   return await basePage.switchToWindow(index);
});

Then(/^User closes window with index "([^"]*)"$/, async (index)=> {
  console.log("User closes window with index " + index);
  return await basePage.closeWindowByIndex(index);
});

Then(/^User switches to "([^"]*)" site$/, async (text)=> {
    console.log("User switched to "+text+" site");
    return await basePage.switchToSiteType(text);
});

Given(/^User opens the browser and enter "([^"]*)"$/, async (text)=> {
  return await basePage.enterUrl(text);
  });
  
Then(/^User waits for "([^"]*)" seconds$/, async (time) => {
  for (let i = 0; i < time; i++) {
      await browser.sleep(i * 1000);  
    console.log("Waiting Count: " + i);
  }
  return console.log("User waits for "+ time +" seconds");
});

Then(/^User selects the dropdown "([^"]*)" and value as "([^"]*)"$/, async (element:string,value:string)=> {
      console.log(value+ " selected from " + element);
      return (await basePage.selectTextFromDropDown(element,value));
});

Then(/^User verifies "([^"]*)" to be "([^"]*)"$/, async (element:string,status:string)=> {
      console.log("User verifies "+ element +" to be " +status);
  if(status == "disabled" && await basePage.waitForElementToDisplay(element, 30000)){

  } else if (status == "enabled"){

  }
      
});

Then(/^User clicks on gray area at "([^"]*)"$/, async (elemReference)=> {
  await browser.actions().mouseMove(await basePage.waitForElementToDisplay(elemReference, 30000)).perform(); 
  return await browser.actions().click(await basePage.waitForElementToDisplay(elemReference, 30000)).perform(); 
  });
  

// Then(/^ Enter the text "([^"]*) in autocomplete box "([^"]*) and select the value "([^"]*)$/, async (searchValueField:ElementFinder,SearchValue:string,searchResult:string)=> {
  //   //console.log("Clicked on " + elemReference);
  //   return (await basePage.waitForElementToDisplay(searchValueField, 30000)).clear().sendKeys(SearchValue);
  //   //return (await basePage.SuggestionSelectionTextbox(searchValueField,SearchValue,searchResult)).click();
  // }); 