import { ElementFinder, ElementArrayFinder, element, by } from 'protractor'
import { BasePage } from './BasePage';
const basePage = new BasePage();


//const environmentData = JSON.parse(fs.readFileSync('./testData/environments.json'));
export class AddUserPage extends BasePage {

   public UserRoleDropDown : ElementArrayFinder;
   public UserListOnHomePage: ElementArrayFinder;
 
   constructor() {
    super();
    this.UserListOnHomePage =  element.all(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
     this.UserListOnHomePage  =  element.all(by.options(BasePage.getObjectData("BtnRole")));
    
   }



}