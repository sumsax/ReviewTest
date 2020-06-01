import {Config, browser} from 'protractor';
import * as reporter from 'cucumber-html-reporter';
import {CommonUtils} from './utils/CommonUtils';
let PropertiesReader = require('properties-reader');
let prop = PropertiesReader('./testData/protractor.properties');

const cu = new CommonUtils();

// An example configuration file
export let config: Config = {
    // The address of a running selenium server.
     seleniumAddress: prop.get('seleniumAddress'),
    //   directConnect: true,
       framework : 'custom',
       frameworkPath: require.resolve('protractor-cucumber-framework'), 
       SELENIUM_PROMISE_MANAGER: prop.get('SELENIUM_PROMISE_MANAGER'),
       getPageTimeout : prop.get('getPageTimeout'),
       allScriptsTimeout : prop.get('allScriptsTimeout'), 
    // Capabilities to be passed to the webdriver instance.
    
    capabilities:{
      "browserName": "firefox",
      "firefoxOptions": {
        args: ["--headless", "--window-size=800x600"]
      },
    },
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
          monochrome: true,
        require: [
          prop.get('stepsFilePath') // accepts a glob
        ]},
        "cucumberautocomplete.syncfeatures": prop.get('featureFilePath'),
        "cucumberautocomplete.strictGherkinCompletion": true,
        
       onComplete :()=> {
         var options = {
                  theme: 'bootstrap',
                  jsonFile: './cucumber_report.json',
                  output: './reports/'+cu.getCurrentDate()+'cucumber_report.html',
                  reportSuiteAsScenarios: true,
                  scenarioTimestamp: true,
                  launchReport: false,
                  metadata: {
                      "App Version":"1.0.",
                      "Test Environment Name": cu.getJsonDataForEnvDetailsForConfig()['envName'],
                      "Browser": "Chrome  77.0.2840.98",
                      "Platform": "Windows 10",
                      "Parallel": "Scenarios",
                      "Executed": "Remote",
                      "device" : "Local Test Machine",
                  }
              };
           
              reporter.generate(options);
        },
        
        plugins: [{
          package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
          options:{
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            reportName: 'Cucumber JS Report',
            pageFooter: '<div><p>Polaris Automation Project</p></div>',
            pageTitle: 'AutomationScripts',
            launchReport: true,
            customData:{
              title: 'ExecutionInfo',
              data:[
                {label: 'Project', value: 'Protractor'},
                {label: 'Release', value: '1.0'},
                {label: 'Environment', value: cu.getJsonDataForEnvDetailsForConfig()['envName'] },
                {label: 'URL', value: cu.getJsonDataForEnvDetailsForConfig()['url'] },
              ]
            },
            displayDuration: true,
          }
      }],
      baseUrl: 'test',
}