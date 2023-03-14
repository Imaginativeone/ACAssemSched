import 'convert-csv-to-json' 


function convertCSV(){
const csvToJson = require('convert-csv-to-json');

const fileInputName = '{{file}}.csv'; 
const fileOutputName = 'assemData.json';

const json = csvToJson.getJsonFromCsv("myInputFile.csv");

for(let i=0; i<json.length;i++){
    console.log(json[i]);
}
return csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
}

export default {
    convertCSV
}