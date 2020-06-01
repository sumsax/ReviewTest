import { ElementFinder, ElementArrayFinder, element, by } from 'protractor'
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {

   public newAddedUserInfo : ElementArrayFinder;
 

   constructor() {
    super();
     this.newAddedUserInfo  =  element.all(by.xpath(' //table[@table-title="Smart Table example"]/tbody/tr[1]/td'));
    
   }



}