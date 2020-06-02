let PropertiesReader = require('properties-reader');
let properties = PropertiesReader('./testData/protractor.properties');
const fs = require('fs');
var chai = require('chai');
chai.use(require('chai-smoothie'));
var expect = chai.expect;
import { CustomLogger } from '../logger/customLogger';
import { error } from 'winston';
var path = require('path');
const testData = JSON.parse(fs.readFileSync('./testData/environments.json'));
import { ElementFinder, ElementArrayFinder, element, by ,browser} from 'protractor'
import { BasePage } from './BasePage';
const basePage = new BasePage();


//const environmentData = JSON.parse(fs.readFileSync('./testData/environments.json'));
export class AddUserPage extends BasePage {

   public RoleDropDown : ElementArrayFinder; 
   public FirstNameTextBox : ElementFinder;
   public LastNameTextBox : ElementFinder;
   public UserNameTextBox : ElementFinder;
   public EmailNameTextBox : ElementFinder;
   public MobileNumberTextBox : ElementFinder;
   public PasswordTextBox : ElementFinder;
   public CompanyRadio: ElementFinder;
   public SaveButton: ElementFinder;
   public UserListOnHomePage: ElementArrayFinder;
 
   constructor() {
    super();
  
    this.UserListOnHomePage =  element.all(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.RoleDropDown =  element.all(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.FirstNameTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.LastNameTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.UserNameTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.EmailNameTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.MobileNumberTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.PasswordTextBox =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.CompanyRadio =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.SaveButton =  element(by.xpath('//table[@table-title="Smart Table example"]/tbody/tr'));
    this.UserListOnHomePage  =  element.all(by.options(BasePage.getObjectData("BtnRole")));
    
   }

   


  async AddCustomer(){
   browser.sleep(1000);
   this.FirstNameTextBox.sendKeys("Example"); 
   this.LastNameTextBox.sendKeys("Example"); 
   this.UserNameTextBox.sendKeys("Example"); 
   this.PasswordTextBox.sendKeys("Example"); 
   this.EmailNameTextBox.sendKeys("Example"); 
   this.LastNameTextBox.sendKeys("Example"); 
   this.MobileNumberTextBox.sendKeys("Example"); 
   this.CompanyRadio.click();
 
 
   await this.SaveButton.click();
}

async veryAddedUserinList(){
   browser.sleep(1000);
   this.FirstNameTextBox.sendKeys("Example"); 
   this.LastNameTextBox.sendKeys("Example"); 
   this.UserNameTextBox.sendKeys("Example"); 
   this.PasswordTextBox.sendKeys("Example"); 
   this.EmailNameTextBox.sendKeys("Example"); 
   this.LastNameTextBox.sendKeys("Example"); 
   this.MobileNumberTextBox.sendKeys("Example"); 
   this.CompanyRadio.click();
 
 
   await this.SaveButton.click();
}

}