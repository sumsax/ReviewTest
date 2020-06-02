let PropertiesReader = require('properties-reader');
let properties = PropertiesReader('./testData/protractor.properties');
import { browser, element, by, ExpectedConditions, ElementFinder} from 'protractor'
const fs = require('fs');
var chai = require('chai');
chai.use(require('chai-smoothie'));
var expect = chai.expect;
import { CustomLogger } from '../logger/customLogger';
import { error } from 'winston';
var path = require('path');
const environmentData = JSON.parse(fs.readFileSync('./testData/environments.json'));

let EC = ExpectedConditions;

export class BasePage {
  //Hari - Takes url as parameter to open the site
   async enterUrl(text: string) {
    try{
    await browser.get(properties.get(text));
    console.log("Url is " + properties.get(text));
  } catch(error){
    console.error(error.message);
    expect.fail();
  }
}

  async navigateToUrl(text: string) {
   try{
    await browser.get(text);
    console.log("Url is " + text);
  } catch(error){
    console.error(error.message);
    expect.fail();
  }
  }

  getJsonDataForEnvDetails(){
    try{
    var envTypeData = environmentData.environmentVariables;
    var envDataFromJson: any;
    if(envTypeData.production.flag == true){
      envDataFromJson = environmentData.environmentVariables.production;
    } else if(envTypeData.qa1.flag == true){
      envDataFromJson = environmentData.environmentVariables.qa1;
    } else if(envTypeData.qa2.flag == true){
      envDataFromJson = environmentData.environmentVariables.qa2;
    } else if(envTypeData.QA.flag == true){
      envDataFromJson = environmentData.environmentVariables.QA;
    }
    return envDataFromJson;
    } catch (error){
      console.error(error.message + " Could not get environment details");
      expect.fail();
    }
  }

  static AllObjectsPath = [
    
    'AddUserPage'
  ];

  static getObjectData(reference:string){
    try{
    var commonFilePath = 'CommonElements';  
    const objData = JSON.parse(fs.readFileSync('./objectRepo/'+commonFilePath+'.json'));
    if(objData[reference]){
     // console.log("Data reference found in " + commonFilePath + ".json");
       return objData[reference];
    } else {
      for (let file of this.AllObjectsPath) {
        const objData1 = JSON.parse(fs.readFileSync('./objectRepo/'+file+'.json'));
        if(objData1[reference]){
        //  console.log("Data reference found in " + file + ".json");
        return objData1[reference];
      } else {
      //  console.log("Data reference NOT found in " + file + ".json");
      }
    } 
  }
} catch(error){
  console.error(error.message + " failed to fetch data from " + this.AllObjectsPath);
  expect.fail();
}
}
 
    static testCase:string;
    setTestCaseName(testCaseName: string){
      try{
        BasePage.testCase = testCaseName;
      }  catch (error){
        console.error(error.message + testCaseName + " not assigned or not found in json")
        expect.fail();
      }
    }

    //sumit, Get Data from json file, Date:
    getTestData(key:string) {
      try {
      const documentTypeData = fs.readFileSync(this.getJsonDataForEnvDetails()['dataFile']);
      const obj = JSON.parse(documentTypeData);
      var testData = obj[BasePage.testCase][key];
        if(testData != undefined || testData != null){
          console.log("Test Data for "+key+" from file is " + testData);
          return testData;
        } else {
          console.log("Test Data for "+key+" from file is " + testData);
          expect.fail();
        }
    } catch (error){
        console.log(error.message + " could not get testdata for " + key);
        expect.fail();
      }
    }
 
 async getPageTitle(title: string) {
   try {
    await browser.sleep(500);
    return expect(await browser.getTitle()).to.equal(title);
   } catch (error) {
     console.error("Could not get page Title " + error.message);
     expect.fail();
    }
  }

  async clickOnButton(elem: ElementFinder){
    try {
      await browser.sleep(500);
     return (await elem).click();
        } catch (error) {
      console.error("Failed to click on button " + error.message);    
      expect.fail();
    }
    }

  async enterTextInTextBox(elem: ElementFinder, text:string){
    try {
      await browser.sleep(500);
     return await elem.sendKeys(text);
  } catch (error) {
    console.error(error.message + " Failed to enter " + text + "in " + elem);   
    expect.fail();
  }
  }

   async clickOnElement(objElement:ElementFinder) {
    try {
      await browser.sleep(500);
      let condition = EC.elementToBeClickable(objElement);
      await browser.wait(condition, 30000);
      return await objElement.click();
    } catch (e) {
      e.message;
    }
  }

 async enterValue(objElement:ElementFinder, value:string) {
	try {
    await browser.sleep(500);
		let condition = EC.visibilityOf(objElement);
		await browser.wait(condition, 30000);
		return await objElement.sendKeys(value);
	} catch (e) {
    e.message;
	}
}

async getText(objElement:ElementFinder, text:string){
  try {
    await browser.sleep(500);
    let condition = EC.visibilityOf(objElement);
    await browser.wait(condition, 30000);
    return (await expect(objElement.getText).toEqual(text));
   } catch (e){
    e.message
  }
}
 
// New Generic method which reads data from feature file and gets values from data files and passed accordingly
async waitForElementToDisplay(objElement:string, timeInSeconds:number){
try{
  await browser.sleep(500);
  var elemArray = BasePage.getObjectData(objElement);
    var webelement = this.findWebElement(elemArray[0], elemArray[1]);
  let condition = EC.visibilityOf(webelement);
  await browser.wait(condition, timeInSeconds);
  return await webelement;
  } catch (error){
    console.error(error.message + " element not found on the page");
    expect.fail();
  }
}

//New Generic method -2 which reads data from feature file and gets values from data files (concatenate split locators)and passed accordingly
async waitForDynamicElementToDisplay(objElement:string, text:any, timeInSeconds:number){
  try{
    await browser.sleep(250);
    var elemArray = BasePage.getObjectData(objElement);
    var webelement = this.findWebElement(elemArray[0]+text+elemArray[1], elemArray[2]);
    let condition = EC.visibilityOf(webelement);
    await browser.wait(condition, timeInSeconds);
    return await webelement;
    } catch (error){
      console.error(error.message + " element not found on the page");
      expect.fail();
    }
  }

// New Generic method which reads data from feature file and gets values from data files and passed accordingly
async waitForElementToDisplayFromTestEnvData(objElement:string, timeInSeconds:number){
  try{
    await browser.sleep(500);
    var elemArray = this.getTestData(objElement);
      var webelement = this.findWebElement(elemArray[0], elemArray[1]);
    let condition = EC.visibilityOf(webelement);
    await browser.wait(condition, timeInSeconds);
    return await webelement;
    } catch (error){
      console.error(error.message + " element not found on the page");
      expect.fail();
    }
  }
  
// Generic method which reads data from page file and gets values passed accordingly
async waitForElementToDisplayPOM(objElement:ElementFinder, timeInSeconds:number){
  try {
    await browser.sleep(500);
    let condition = EC.visibilityOf(objElement);
    await browser.wait(condition, timeInSeconds);
    return await objElement;
  } catch (error){
    console.error(error.message + " element not found on the page");
    expect.fail();
  }
}

findWebElement(elementName:string, findBy:string){
  try {
  var elem = null;
  switch (findBy.toLowerCase()) {
    case "binding":
      elem = element(by.binding(elementName)); 
        break;
        case "exactbinding":
        elem = element(by.exactBinding(elementName)); 
        break;
        case "model":
        elem = element(by.model(elementName)); 
        break;
        case "buttontext":
        elem = element(by.buttonText(elementName)); 
        break;
        case "partialbuttontext":
        elem = element(by.partialButtonText(elementName)); 
        break;
        case "repeater":
        elem = element(by.repeater(elementName)); 
        break;
        case "exactrepeater":
        elem = element(by.exactRepeater(elementName)); 
        break;
        case "xpath":
        elem = element(by.xpath(elementName)); 
        break;
      case "options":
        elem = element(by.options(elementName));
        break;
      case "deepcss":
        elem = element(by.deepCss(elementName));
        break;
      case "classname":
        elem = element(by.className(elementName));
        break;
      case "css":
        elem = element(by.css(elementName));
        break;
      case "id":
        elem = element(by.id(elementName));
        break;
      case "linktext":
        elem = element(by.linkText(elementName));
        break;
      case "js":
        elem = element(by.js(elementName));
        break;
        case "name":
        elem = element(by.name(elementName));
        break;
        case "partiallinktext":
        elem = element(by.partialLinkText(elementName));
        break;
        case "tagname":
        elem = element(by.tagName(elementName));
        break;  
      default:
    console.log("WebElement specified in data file  " + element + " is not available");
   break;
  }
  return elem;
} catch (error){
console.error(error + " failed in identifying web element on the page");
expect.fail();
}
}
//switches to window based on index value passed from feature file
   async switchToWindow(index:number){
     try {
    let windowHandles = browser.getAllWindowHandles();
    await windowHandles.then(function(handles){
     browser.switchTo().window(handles[index]).then(function(){
     browser.getTitle().then(function(text){
        console.log("New window title is " + text)
      })
    })
    });
    await browser.sleep(5000);
  } catch (error){
    console.error(error.message + " failed to switch window by index " + index);
    expect.fail();
  }
  }

  async switchToSiteType(siteType:string){
    try{
    if(siteType == "angular"){
    return await browser.waitForAngularEnabled(true);
  } else if (siteType == "nonangular"){
    return await browser.waitForAngularEnabled(false);
  }
} catch (error){
  console.error(error.message + " check the website type for angular or non-angular");
  expect.fail();
}
  }

  // closes opned window by index value passed from feature file
  async closeWindowByIndex(index:number){
   try{
    let windowHandles = await browser.getAllWindowHandles();
    if (windowHandles.length > 1) {
      for (let windowHandlerIndex = 1; windowHandlerIndex < windowHandles.length; windowHandlerIndex++) {
        const windowHandler = windowHandles[windowHandlerIndex];
        await browser.switchTo().window(windowHandler);
        return await browser.close();
      }
    }
  await browser.switchTo().window(windowHandles[index-1]);
  } catch (error){
    console.error(error.message + " failed to close window");
    expect.fail();
  }
}

  //Accepts OK, Cancel from feature file to perform action on alert popup
  async handleAlert(action:string){
    try {
    var alertPopup = await browser.switchTo().alert();
    await alertPopup.getText().then (function(alertText){
      console.log("Text from popup " + alertText);
    });
    await browser.sleep(500);
    if(action.toLowerCase() == "ok"){
      return await alertPopup.accept();
    } else if (action.toLowerCase() == "cancel"){
      return await alertPopup.dismiss();
    } else {
      return console.log("Alert could not be dismissed")
    }
  } catch (error){
    console.error(error.message + " Failed to handle alert")
    expect.fail();
  }
  }

  //Scroll to specific element on page
  async scrollToElement(elementReference:string){
    try{
    var element = await this.waitForElementToDisplay(elementReference, 30000);
    return (await browser.actions().mouseMove(element).perform());
    } catch (error){
      console.error("Failed to scroll " + error.message);
      expect.fail();
    }
  }

  //switches to frame by name or id passed from feature file, and data read from data file
  async switchToFrameByNameOrID(elementReference:string){
    try{
    return await browser.switchTo().frame((await this.waitForElementToDisplay(elementReference, 30000)).getWebElement());    
  } catch (error){
    console.error("Failed to switch to frame " + elementReference  + error.message);
  }
}

  async switchToDefaultContent(){
    try{
    return await browser.switchTo().defaultContent();    
  }catch (error){
    console.error(error.message + "Failed to switch to default content or parent frame");
    expect.fail();
  }
}

 //Sumit - switch to frame by index
    async switchToFrameByIndex(index: string) {
     try {
       var y = +index;
      await browser.switchTo().frame(y);        
     } catch (error) {
       CustomLogger.logger.log('error', "2 ***"+ error);  
       error.message;
      }
    }
 
    //Sumit - Upload file 
    // async uploadFile(fileToUpload: string){
    //  try {
    //    let absolutePath = path.resolve(__dirname,fileToUpload);
    //    return absolutePath;
    //  } catch (error) {
    //    CustomLogger.logger.log('error', "2 ***"+ error);  
    //    error.message;
    //   }
    // }

    //Enter text by id using javascript executor
    async executeJavaScriptByIdToEnterText(webelement:string, elemRef:string){
      try{
      return await browser.executeScript("document.getElementById(\'"+webelement+"\').value=\'"+elemRef+"\'");
    }catch (error){
      console.error("Failed to enter " +elemRef+ " in " + webelement);
      error.message;
      expect.fail();
    }
   }
   
    //Generic Click method using javascript executor - index may need to be changed if more than one element
    async executeJavaScriptToClick(webelement:string){
      try{
      var element = await this.waitForElementToDisplay(webelement, 30000);
      await browser.executeScript("arguments[0].scrollIntoView();", element);
      return await browser.executeScript("arguments[0].click()",element);
    }catch (error){
      console.error("Failed to click " + webelement);
      expect.fail();
    }
  }

    // Generic Enter text using javascript executor
    async executeJavaScriptToEnterText(webelement:string, text:string){
      try{
        var element = await this.waitForElementToDisplay(webelement, 30000);
        await browser.executeScript("arguments[0].scrollIntoView();", element);
        return await browser.executeScript("arguments[0].setAttribute('value', \'" + text +"\')", await element);
    }catch (error){
      console.error("Failed to enter " +text+ " in " + webelement);
      expect.fail();
    }
   }

  //Anjali for selecting drop down
    async selectTextFromDropDown(dropDownSelector:string,value:string) {
          try {
             await browser.sleep(500);
             (await this.waitForElementToDisplay(dropDownSelector,20000)).click();
             return (await this.waitForElementToDisplay(value,20000)).click();
          } catch (e) {
        console.error("Failed to select " +value+ " in " + dropDownSelector);
         expect.fail();
          }
      }
    //Anjali - pending
     async SuggestionSelectionTextbox(objElement:ElementFinder,value:string,valueResult:string) {
          try {
             await browser.sleep(500);
             (await this.enterValue(objElement,value));
              return (await this.waitForElementToDisplay(valueResult,20000)).click();
          } catch (e) {
            e.message;
          }
        } 
      // Mouse hover on webelement
      async mouseHover(elemReference:string){
        try {
        return await browser.actions().mouseMove(await this.waitForElementToDisplay(elemReference, 30000)).perform();
        } catch (error){
          console.error("Failed in mouseHover " + elemReference);
          expect.fail();
        }
      } 
      

}




/*
//Modified methods, can be used later or removed once framework is stabilized
 // Read data from file in the form of array.  first column is key and remaining are values
  static getObjectDataOld(reference: string) {
    var commonFilePath = 'CommonElements';
    var line = fs.readFileSync('./objectRepo/' + commonFilePath + '.txt', "utf-8").toString().split('\n');
    var array = [];
    for (let i in line) {
      var cols = line[i].split(',');
      if (cols[0] === reference) {
        for (let i = 1; i < cols.length; i++) {
          array.push(cols[i]);
        }
      }
    }
    if (array.length > 0) {
      return array;
    } else {
      for (let file of this.AllObjectsPath) {
        var line = fs.readFileSync('./objectRepo/' + file + '.txt', "utf-8").toString().split('\n');
        for (let i in line) {
          var cols = line[i].split(',');
          if (cols[0] === reference) {
            for (let i = 1; i < cols.length; i++) {
              array.push(cols[i]);
            }
          }
        }
      }
    }
    return array;
  }


// Generic method which reads data from feature file and gets values from data files and passed accordingly
async waitForElementToDisplayOld(objElement:string, timeInSeconds:number){
  try{
    await browser.sleep(500);
    var elemArray = BasePage.getObjectData(objElement);
    if(elemArray[0].toString().includes("contains(") && elemArray[2].toString().toLowerCase().includes("xpath")){
      var webelement = this.findWebElement(elemArray[0]+", "+elemArray[1], elemArray[2]);
      console.log(elemArray[0] + elemArray[1] + " is elemarray")
    } else {
      var webelement = this.findWebElement(elemArray[0], elemArray[1]);
    }
    let condition = EC.visibilityOf(webelement);
    await browser.wait(condition, timeInSeconds);
    return await webelement;
    } catch (e){
      e.message
    }
  }
 
    // Click method using javascript executor - index may need to be changed if more than one element
    async executeJavaScriptByNameToClick(webelement:string){
      try{
      return await browser.executeScript("document.getElementsByName(\'"+webelement+"\')["+0+"].click()");
    }catch (error){
      console.error("Failed to click " + webelement);
      error.message;
    }
  }
*/