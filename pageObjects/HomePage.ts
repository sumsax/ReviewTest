import {ElementFinder, element, by} from 'protractor'
import { BasePage } from './BasePage';

export class HomePage extends BasePage{
  
    public BtnLogout: ElementFinder;
    public LnkProfile: ElementFinder;
    public LnkIronMtnInsight: ElementFinder;
    public LblReviewingAccountInventory: ElementFinder;
    public LnkEscrowManagement: ElementFinder;

  constructor(){
    super();
    this.BtnLogout = element(by.css('.auto-test-btnLogout'));
    this.LnkProfile = element(by.css('.auto-test-btnProfile'));
    this.LnkIronMtnInsight = element(by.css('.auto-test-quicklinks-rmaas'));
    this.LblReviewingAccountInventory = element(by.xpath("//li[text()='Reviewing account inventory']"));
    this.LnkEscrowManagement = element(by.css('.auto-test-quicklinks-escrow'));
  }


}