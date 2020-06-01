var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('../testData/protractor.properties');

// fully qualified name
var getUrl = properties.get('url');
var getBrowser = properties.get('browserName');
console.log(getUrl);
console.log(getBrowser);
