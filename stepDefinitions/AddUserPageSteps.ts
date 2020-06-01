import {Given, When, Then} from 'cucumber'
import { AddUserPage } from '../pageObjects/AddUserPage';
import { element,by, browser, ElementFinder, ExpectedConditions } from 'protractor';
import { CommonUtils } from '../utils/CommonUtils';
import chai = require('chai');
chai.use(require('chai-smoothie'));
const expect = chai.expect;

const addUserPage = new AddUserPage();
const commonUtils = new CommonUtils();

Then(/^User waits for "([^"]*)" of "([^"]*)" to get displayed on home page$/, async (elementReference:string, orderId:string)=>{
    console.log("User wait for "+ elementReference +" to get displayed on home page");
    return (await addUserPage.waitForDynamicElementToDisplay(elementReference, polarisHomePage.getTestData(orderId), 30000)).getText().then(function(text:string){
    console.log(text + " displayed on page and pass");
    });
});  

Then(/^User gets "([^"]*)" of "([^"]*)" from the element "([^"]*)"$/, async (txt:string, OrderId:string, elementReference:string)=>{
    return (await polarisHomePage.waitForDynamicElementToDisplay(elementReference, polarisHomePage.getTestData(OrderId), 30000)).getAttribute(txt).then(function(text:string){
    console.log("User get status as " + text + " from the element " + elementReference);
    });
  });

Then(/^User lists out the number of recent orders$/,{timeout: 180 * 1000}, async ()=> {
    console.log("User list out the number of recent orders");
    var size = await polarisHomePage.OrdersListOnHomePage.count();
    for (let index = 1; index <=size; index++) {
        console.log("Order No - " +index);
        console.log(await (await polarisHomePage.waitForDynamicElementToDisplay("TxtListOfOrdersData", index , 30000)).getText()
        + "  -  " + (await (await polarisHomePage.waitForDynamicElementToDisplay("TxtOfOrderIdStatus", index, 30000)).getAttribute("title"))
        + "  -  " + (await (await polarisHomePage.waitForDynamicElementToDisplay("TxtOfOrderIdDate", index, 30000)).getText())
        );
    }
    return (await polarisHomePage.OrdersListOnHomePage.count().then(function(noOfSearchOrders:number){
    console.log("Number of Search Orders displayed on Home Page is : "+noOfSearchOrders); 
    }));
}); 

Then(/^User verifies the order is sorted by latest on top$/, async ()=>{
   var dates = await addUserPage.newAddedUserInfo.getText();
   var dateArray =[];
    for (let i = 0; i < dates.length; i++) {
        dateArray.push(dates[i]);
      }
      console.log("User verifies the order is sorted by latest on top");
      console.log("Order dates from the application: " + dateArray);
      console.log("Sorted dates from the obtained list: " + commonUtils.dateSortingAsc(dateArray));
   return commonUtils.verifyDatesOrder(dateArray, commonUtils.dateSortingAsc(dateArray));
});  

Then(/^User scrolls down to "([^"]*)"$/, async (elemReference:string)=> {
    var orders = await polarisHomePage.OrderDetails.count();
    console.log("Number of orders present is " + orders);
    var lastOrder = await polarisHomePage.waitForDynamicElementToDisplay("TxtListOfOrdersData", orders, 30000)
   console.log("User scrolls down to " + elemReference);
    await browser.executeScript("arguments[0].scrollIntoView();", lastOrder.getWebElement());
    await browser.executeScript("arguments[0].click()",lastOrder); 
    return await browser.sleep(5000);
});

Then(/^User verifies the color of "([^"]*)"$/, async (elemReference:string)=> {
    console.log("User verifies the color of" + elemReference);
    return expect(await (await polarisHomePage.waitForElementToDisplay(elemReference, 30000)).getCssValue('border-bottom-color')).to.equal(polarisHomePage.getTestData("ColorOfTab"));
});

Then(/^User verifies number of items to be equal in the order details popup$/, async ()=>{
    console.log("User verifies number of items to be equal in the order details popup");
    var items = (await polarisHomePage.waitForElementToDisplay("TxtItemsCount", 30000)).getText().then(function(noOfitems:string){
        return noOfitems.match(/\d+/g)[0];
    });
    var orders = (await polarisHomePage.waitForElementToDisplay("TxtNoOfItems",30000)).getText().then(function(textOnPage:string){
        return textOnPage;
    });
    console.log("items are " + await items + " orders are " + await orders);
    if(await items == await orders){
        return console.log("Number of items matched and test is passed");
    } else {
      expect.fail();
      return console.log("Number of items did NOT match and test is fail");
    }
  });

  Then(/^User verifies the time format for element "([^"]*)"$/, async (elemReference: string) => {
    return (await polarisHomePage.waitForElementToDisplay(elemReference, 30000)).getText().then(function (date: string) {
        commonUtils.verifyDateFormat(date, "DD/MM/YYYY HH:mm a");
        console.log("Date displayed " + date + " in format DD/MM/YYYY HH:mm a");
    });
});

Then(/^User clicks on each order on homepage$/, {timeout: 180 * 1000}, async ()=> {
   
  
    return (await polarisHomePage.waitForElementToDisplay("TxtTrackOrder", 30000));
     
  });

  Then(/^User verifies Order Status display in popup$/, async ()=>{
    var totalNoRows = await polarisHomePage.TxtOrderStatusRowsPopup;
    var array = [];
    for (let i = 1; i <= totalNoRows.length; i++) {
        var text = (await polarisHomePage.waitForDynamicElementToDisplay("TxtOrderStatusRowsPopup", i, 30000)).getText().then(function(text:string){
            return text;
    });
        array.push(text);   
    }
    
    if(totalNoRows.length == 3){

    if(await array[2] == "Order Received" && await array[1] == "Digitization in Process" && (await array[0] == "Order Completed View Assets" || await array[0] == "Order Cancelled")){
        return console.log("Order of display is Last- "+ await array[2], ", Last but one- " + await array[1] + ", Last but two- " + await array[0]);
    } else {
        return expect.fail("Order is not proper and test is failed and no of rows is " + totalNoRows);
    }
    } else if (totalNoRows.length == 2){
       if (await array[1] == "Order Received" && await array[0] == "Digitization in Process"){
        return console.log("Order of display is " + "Last "+ await array[1], "Last but one " + await array[0]);
       } else {
        return expect.fail("Order is not proper and test is failed and no of rows is " + totalNoRows);
       }
    } else if(totalNoRows.length == 1) {
        if(await array[0] == "Order Received"){
            //return expect.fail("No estimated delivery date inside popup");
            return console.log("Order of display is " +await array[0]);
        } else {
            return expect.fail("Not displaying the expected data")
        }
    }
   });  
  