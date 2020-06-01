import {Given, When, Then} from 'cucumber'
import {HomePage} from '../pageObjects/HomePage'

const homePageObj = new HomePage();

Then(/^User clicks on LnkEscrowManagement link$/, async ()=> {
   return (await homePageObj.waitForElementToDisplayPOM(homePageObj.LnkEscrowManagement, 30000)).click();
 });

 Then(/^User clicks on LnkProfile link$/, async ()=> {
   return (await homePageObj.waitForElementToDisplayPOM(homePageObj.LnkProfile, 30000)).click();
 });

 Then(/^User clicks on BtnLogout link$/, async ()=> {
   return (await homePageObj.waitForElementToDisplayPOM(homePageObj.BtnLogout, 30000)).click();
 });


