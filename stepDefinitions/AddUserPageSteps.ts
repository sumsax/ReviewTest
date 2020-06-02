import {Given, When, Then} from 'cucumber'
import { AddUserPage } from '../pageObjects/AddUserPage';
import { element,by, browser, ElementFinder, ExpectedConditions } from 'protractor';
import { CommonUtils } from '../utils/CommonUtils';
import chai = require('chai');
chai.use(require('chai-smoothie'));
const expect = chai.expect;

const addUserPage = new AddUserPage();
const commonUtils = new CommonUtils();

Then(/^User lists out the number of recent users$/,{timeout: 180 * 1000}, async ()=> {
    console.log("User list out the number of recent orders");
    var size = await addUserPage.UserListOnHomePage.count();
  
    return (await addUserPage.UserListOnHomePage.count().then(function(noOfUsers:number){
           
    }));
}); 


Then(/^User waits for User "([^"]*)" name "([^"]*)" to get displayed in User Table$/, async (elementReference:string, userName:string)=>{
    console.log("User wait for "+ elementReference +" to get displayed on home page");
    return (await addUserPage.waitForDynamicElementToDisplay(elementReference, addUserPage.getTestData(userName), 30000)).getText().then(function(text:string){
    console.log(text + " displayed on page and pass");
    });
});  