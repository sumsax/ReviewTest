const fs = require('fs');
const environmentData = JSON.parse(fs.readFileSync('./testData/environments.json'));
var os = require('os');
var chai = require('chai');
var expect = chai.expect;
import moment from 'moment';

var DEBUG_MODE = true; // Set this value to false for production

if(!DEBUG_MODE || typeof(console.log) === 'undefined') {
   // FYI: Firebug might get cranky...
   console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time =    console.timeEnd = console.assert = console.profile = function() {};
}

export class CommonUtils{
    today = new Date();
    timeStamp = null;
        
    getCurrentDate(){
    this.timeStamp =  this.today.getMonth() + 1 + '-' +  this.today.getDate() + '-' +  this.today.getFullYear() + '-' +  this.today.getHours() +  this.today.getMinutes() + this.today.getSeconds();
        return this.timeStamp; 
    }

    getJsonDataForEnvDetailsForConfig(){
        var envTypeData = environmentData.environmentVariables;
        var envDataFromJson: any;
        if(envTypeData.production.flag == true){
          envDataFromJson = environmentData.environmentVariables.production;
        } else if(envTypeData.qa1.flag == true){
          envDataFromJson = environmentData.environmentVariables.qa1;
        } else if(envTypeData.qa1.flag == true){
          envDataFromJson = environmentData.environmentVariables.qa2;
        } else if(envTypeData.QA.flag == true){
          envDataFromJson = environmentData.environmentVariables.QA;
        }
        return envDataFromJson;
      }

      getOsName(){
        if(os.type().includes("Windows")){
        return "Windows"  
        } else {
        return os.type();
        }
     }
     
     getOsVersion(){
        return os.release();
     }

     getUserName(){
       var systemName = os.userInfo().username;
       return systemName;
     }
     
     dateSortingAsc(dateslist: any[]){
      var dates = dateslist.slice().sort((a, b) => Date.parse(b)- Date.parse(a));
      return dates;
   }

   dateSortingDes(dateslist: any[]){
    var dates = dateslist.slice().sort((a, b) => Date.parse(a)- Date.parse(b));
    return dates;
 }
   
   verifyDatesOrder(dates1: string | any[], dates2: string | any[]){
      if(dates1.length != dates2.length){
        console.error("Dates order is different and test is fail");
        expect.fail();
      } 
      for (let index = 0; index < dates1.length; index++) {
        if(dates1[index] != dates2[index]){
          console.error("Dates order is different and test is fail");
          expect.fail();
        }
      }
      console.error("Dates sorted in chronological order and test is pass");
   }

   verifyDateFormat(givenDate:string, formattedDate:string){
    if(moment(givenDate, [formattedDate], true).isValid()){
    console.log("correct format");
    } else {
    expect.fail();
    console.log("wrong format");
    };
 }

}