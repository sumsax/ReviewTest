import {Config, browser} from 'protractor';
import * as reporter from 'cucumber-html-reporter';
import {CommonUtils} from './utils/CommonUtils';
let PropertiesReader = require('properties-reader');
let prop = PropertiesReader('./testData/protractor.properties');

const cu = new CommonUtils();
const envUrl = cu.getJsonDataForEnvDetailsForConfig()['envName'];
// An example configuration file
export let config: Config = {
    // The address of a running selenium server.
    // seleniumAddress: prop.get('seleniumAddress'),
       directConnect: true,
       framework : 'custom',
       frameworkPath: require.resolve('protractor-cucumber-framework'), 
       SELENIUM_PROMISE_MANAGER: prop.get('SELENIUM_PROMISE_MANAGER'),
      // restartBrowserBetweenTests : true,
       getPageTimeout : prop.get('getPageTimeout'),
       allScriptsTimeout : prop.get('allScriptsTimeout'), 
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
      "browserName": prop.get('browserName'),
      'maxInstances': 1,
      //'shardTestFiles' : true,
      'nativeEvents': false,
      metadata : {
        'device' : cu.getUserName() + "\'s system",
        platform: {
          name : cu.getOsName(),
          version : cu.getOsVersion()
        } ,
      
      },
    //  chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_81.0.4044.20.exe',
    //  geckoDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.26.0.exe'
    }],
   // Capabilities: 
   //   {"browserName": prop.get('browserName')},
   // restartBrowserBetweenTests: true,
    maxSessions: 1,
    onPrepare: function(){
      browser.driver.manage().timeouts().implicitlyWait(60000); 
    },
    
    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: [prop.get('featureFilePath')],

    cucumberOpts: {
          tags: [prop.get('runTests')],
          format: "json:./.parallelReports/"+cu.getCurrentDate()+"/cucumber_report.json",
        require: [
          prop.get('stepsFilePath') // accepts a glob
        ]},
        "cucumberautocomplete.syncfeatures": prop.get('featureFilePath'),
        "cucumberautocomplete.strictGherkinCompletion": true,
       onComplete :()=> {
         var options = {
               //   theme: 'bootstrap',
                //  jsonFile: './cucumber_report.json',
                 // output: './reports/cucumber_report.html',
                //  reportSuiteAsScenarios: true,
                //  scenarioTimestamp: true,
                //  launchReport: false,
                  metadata: {
                 //     "App Version":"1.0.",
                 //     "Test Environment Name": cu.getJsonDataForEnvDetailsForConfig()['envName'],
                 //     "Browser": "Chrome  77",
                 //     "Platform": "Windows 10",
                 //     "Parallel": "Scenarios",
                 //     "Executed": "Remote",
                 //     "device" : "Local Test Machine",
                  }
              };
            //       reporter.generate(options);
        },
        
        plugins: [{
          package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
          logLevels: ['warning'],
          options:{
            loggingPrefs : {"browser" : "ALL"},  
            automaticallyGenerateReport: true,
            openReportInBrowser: true,
            removeExistingJsonReportFile: true,
            reportName: 'Polaris Automation Tests',
            pageFooter: '<div><p>Polaris Automation Project</p></div>',
            pageTitle: 'AutomationScripts',
            launchReport: true,
            customData:{
              title: 'ExecutionInfo',
              data:[
                {label: 'Project', value: 'CSP Automation'},
                {label: 'Release', value: '1.0'},
                {label: 'Env', value: cu.getJsonDataForEnvDetailsForConfig()['envName']},
                {label: 'URL', value: "<a href ="+cu.getJsonDataForEnvDetailsForConfig()['url']+">"+cu.getJsonDataForEnvDetailsForConfig()['url']+"</a>"},
                {label: 'OS', value: cu.getOsName()},
                {label: 'Version', value: cu.getOsVersion()},
                {label: 'Run By', value: cu.getUserName()},
              ]
            },
            displayDuration: true,
          }
      }],
      baseUrl: 'test',
    
}