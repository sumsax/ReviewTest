import {ElementFinder, element, by} from 'protractor'
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
  
    public TxtUserName: ElementFinder; 
    public TxtPassword: ElementFinder; 
    public BtnLogin: ElementFinder;
    public MessageLogout: ElementFinder;

  constructor(){
    super();
    this.TxtUserName = element(by.id('USER'));
    this.TxtPassword = element(by.id('PASSWORD'));
    this.BtnLogin = element(by.id('loginButton'));
    this.MessageLogout = element(by.xpath("//div[text()='You have successfully logged out.']"));
  }

  async clickonloginbutton(){
    return (await this.waitForElementToDisplayPOM(this.BtnLogin, 30000));
   // return (await this.waitForElementToDisplay("BtnLogin", 30000));
  }

}