import { ElementFinder, ElementArrayFinder, element, by } from 'protractor'
import { BasePage } from './BasePage';
const basePage = new BasePage();


//const environmentData = JSON.parse(fs.readFileSync('./testData/environments.json'));
export class AddUserPage extends BasePage {

   public usrRoleDropDown : ElementArrayFinder;
 
   constructor() {
    super();
     this.usrRoleDropDown  =  element.all(by.options(BasePage.getObjectData("BtnRole")));
    
   }



}