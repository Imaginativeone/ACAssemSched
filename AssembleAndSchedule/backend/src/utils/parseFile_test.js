import * as fs from 'fs'
import { count } from 'console';
import readline from 'readline'

/* 
Business logic that will read file line-by-line then update the database with a json obect for each project number.
*/

class ParseFile {
    constructor(){
        
        const readFileLocation = "../uploadedFiles/file.txt"
        function readProp() {
            const text = fs.createReadStream(readFileLocation, "utf-8");
            const rl = readline.createInterface({
                input: text,
            });
            let counter = 0;
            let spider = 0;
            let CSCount = 0;
            let CTCount = 0;
            let CDCount = 0;
            let ANCount = 0;
            let FWCount = 0;

            let WHWHColorCount = 0;
            let BKWHColorCount = 0;
            let WHPNColorCount = 0;
            let WHOKColorCount = 0;
            let WHCVColorCount = 0;
            let STWHColorCount = 0;
            let STSTColorCount = 0;
            let STOKColorCount = 0;
            let STPNColorCount = 0;
            let TTWHColorCount = 0;


            rl.on("line", (res) => {
                let projects = [];
                const resList = [res.split("|")];
                const projList = resList.length > 19 ? resList.split("\r\n") : res.split("|");
                console.log('Project list from first function', projList);
                if (resList.length > 19) {
                    console.log(counter + "  " + res + " " + spider); // to help see line numbers inorder to locate data indexes
                    const projNo = resList[0].lastIndexOf('|');
                    const customizedItem = resList[1];
                    // console.log(customizedItem.substring(0,2)) // testing index
                    const updGrp = resList[2];
                    const updSeq = resList[3];
                    const planFinD = resList[4];
                    const sort1 = resList[5];
                    const sort2 = resList[6];
                    const sort3 = resList[7];
                    const sort4 = resList[8];
                    const sort5 = resList[9];
                    const sort6 = resList[10];
                    const feat1 = resList[11];
                    const feat2 = resList[12];
                    const feat3 = resList[13];
                    const feat4 = resList[14];
                    const feat5 = resList[15];
                    const feat6 = resList[16];
                    const feat7 = resList[17];
                    const lino = resList[18];
                    const prpQty = resList[19];

                    // Counters for order type
                    if (customizedItem.substring(0, 2).includes('CS')) { CSCount++; /*console.log('CS', CSCount)*/ }
                    if (customizedItem.substring(0, 2).includes('CT')) { CTCount++; /*console.log('CT', CTCount)*/ }
                    if (customizedItem.substring(0, 2).includes('CD')) { CDCount++; /*console.log('CDCount', CDCount)*/ }
                    if (customizedItem.substring(0, 2).includes('AN')) { ANCount++; /*console.log('ANCount', ANCount)*/ }
                    if (customizedItem.substring(0, 2).includes('FW')) { FWCount++; /*console.log('FWCount', FWCount)*/ }

                    // // Counters for Color Options
                    if (customizedItem.substring(4, 8).includes('WHWH')) { WHWHColorCount++; /*console.log('WhiteWhite Color', WHWHColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('BKWH')) { BKWHColorCount++; /*console.log('BackWhite color', BKWHColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('WHPN')) { WHPNColorCount++; /*console.log('WHPN', WHPNColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('WHOK')) { WHOKColorCount++; /*console.log('WHOK', WHOKColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('WHCV')) { WHCVColorCount++; /*console.log('WHCV', WHCVColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('STWH')) { STWHColorCount++; /*console.log('STWH', STWHColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('STST')) { STSTColorCount++; /*console.log('STST', STSTColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('STOK')) { STOKColorCount++; /*console.log('STOK', STOKColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('STPN')) { STPNColorCount++; /*console.log('STPN', STPNColorCount)*/ }
                    if (customizedItem.substring(4, 8).includes('STPN')) { TTWHColorCount++; /*console.log('TTWH', TTWHColorCount)*/ }

                    counter++;
                    spider++;

                    // console.log(counter + " " + projNo + " " + customizedItem + " " + spider) 
                    // Find the index for the color designation
                    const secondLastPipe = res.lastIndexOf("|") - 10;
                    const projNo1 = `${res.substring(
                        0,
                        7
                    ).split('|')}`;
                    const proNo2 = `${res.substring(0, 7)}`;
                    const customizeOne = customizedItem.substring(4, 8).includes('WHWH');

                    // console.log('ResList first function', resList);
                    // console.log(customizeOne,  'CS', CSCount, 'CT', CTCount, 'CD',CDCount, 'AN', ANCount,'FW', FWCount, 'WHCV', WHCVColorCount, 'WHWH', WHWHColorCount, 'BKWH \n', BKWHColorCount, 'WHPN', WHPNColorCount, 'WHOK', WHOKColorCount, 'STWH', STWHColorCount, 'STOK \n', STOKColorCount, 'STPN', STPNColorCount,'TTWH', TTWHColorCount)
                    return (customizeOne, CSCount, CTCount, CDCount, ANCount, FWCount, WHCVColorCount, WHWHColorCount, BKWHColorCount, WHPNColorCount, WHOKColorCount, STWHColorCount, STOKColorCount, STPNColorCount, TTWHColorCount);
                }
              
            });
        }
        
        function translateXLSX2JSON() {
            var xlsx = require("xlsx")
            var dataPathExcel = "../../uploadedFiles/7272e2862a775923a9d690d84fde39bc_CS010623a.xlsx"
            var wb = xlsx.readFile(dataPathExcel)
            var sheetName = wb.SheetNames[0]
            var sheetValue = wb.Sheets[sheetName]
            console.log(sheetValue)
            var excelData = xlsx.utils.sheet_to_json(sheetValue)
            console.log(excelData)
        }
    }

}


readProp();

// function parseFile(){
//     // Assign local file to var
//     //Read the file

//     const fileToParse = fs.readdir('../../uploadedFiles', (err, data) => {
//         // let projObj = {};
//         // const fileDir = [];
//         if (err) return console.log(err)
       
//         console.log('There be a list of files in the var data: \n', data);
      
//         const uploadDirSize = data.length;
//         const dataType = typeof(data);
//         console.log('The length of the files directory and dataType:', data.length, dataType);
       
//         for(let i=0; i < uploadDirSize; i++){
//           if(!data){
//             console.log('No files found')
//             } 
//             else{
      
//             // console.log('list of files in dir----->', data) // uploaded is UNDEFINED here
      
//             const filePath = '../../uploadedFiles/';
            
//             fs.readFile(filePath+data[0], 'utf8', (err, data) => {
//                 if (err) return console.error(err)
//                 console.log('This is the contents of the file----->\n', data)
//                 // console.log('Matched data from file', data.match('N51845'))
//                 // console.log('This is the contents of the file----->\n', data)
//             })

//             fs.open(filePath+data[0], 'r', (err, fd) => {
//                 console.log('OPening file with fs.open', fd)
//             })
//             // console.log('Data----->', data[0]);
//             // projObj = data.match('I')
            
//             // console.log('Line no. 41ish Value of project', projObj) //
//           }
//           return fileToParse
//         }
// });

export default {ParseFile}