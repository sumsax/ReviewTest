const fs = require('fs');
var os = require('os');

export class testFunction {
       getObjectDataNew(reference:string) {
      const objectData = JSON.parse(fs.readFileSync('./objectRepo/PolarisHomePageObjRepo.json'));
         return objectData[reference];   
}

getOsName(){
   return os.type()
}

getOsVersion(){
   return os.release();
}


}

const tf = new testFunction();
//console.log(tf.getObjectDataNew("TxtDocumentTypes")[0]);
//console.log(tf.getObjectDataNew("TxtDocumentTypes")[1]);
