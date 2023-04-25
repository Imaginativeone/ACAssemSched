import './parseFile_test'
import './read'

/* VBA translated to JavaScript */
/* Start Fresh */
/* In this code, we first apply an autofilter to the first row of the worksheet using the autoFilter() method of the worksheet object. 
Then, we use the clear() method to clear the contents of cells in the range A1:AZ1 and A:AZ. 
Finally, we use the spliceColumns() method to delete all the columns in the range A:AZ.  */

// Assuming that you have already loaded the excelJS library and initialized the workbook and worksheet objects

function freshStart(){
    worksheet.autoFilter(1); // Auto filter on the first row of the worksheet
    worksheet.getRange('A1:AZ1').clear(); // Clear the contents of the first row of the worksheet
    worksheet.getRange('A:AZ').clear(); // Clear the contents of all cells in columns A to AZ
    worksheet.spliceColumns(1, 52); // Delete the columns A to AZ
}

/* Casement cleanup */

// Step 1: Import the required modules
const ExcelJS = require('exceljs');

// Step 2: Load the workbook and select the worksheet
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('file.xlsx')
    .then(function() {
        const worksheet = workbook.getWorksheet('Sheet1');

        // Step 3: Cleanup Casement
        worksheet.autoFilter = false;
        let range = worksheet.getCell('A1').address + ':' + 'A' + worksheet.rowCount;
        worksheet.autoFilterColumn(1, '*Date*');
        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            if (rowNumber > 1 && row.getCell(1).value.toString().includes('Date')) {
                worksheet.spliceRows(rowNumber, 1);
            }
        });
        worksheet.autoFilter = false;

        range = worksheet.getCell('A1').address + ':' + 'A' + worksheet.rowCount;
        worksheet.autoFilterColumn(1, '*---*');
        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            if (rowNumber > 1 && row.getCell(1).value.toString().includes('---')) {
                worksheet.spliceRows(rowNumber, 1);
            }
        });
        worksheet.autoFilter = false;

        range = worksheet.getCell('A1').address + ':' + 'A' + worksheet.rowCount;
        worksheet.autoFilterColumn(1, '*Renewal*');
        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            if (rowNumber > 1 && row.getCell(1).value.toString().includes('Renewal')) {
                worksheet.spliceRows(rowNumber, 1);
            }
        });
        worksheet.autoFilter = false;

        // Step 4: Delete Blank Rows
        let myRange = worksheet.usedRange;
        for (let i = myRange.lastRow.number; i >= myRange.firstRow.number; i--) {
            if (worksheet.getRow(i).cellCount > 0 && worksheet.getRow(i).values.every(function(value) { return value === null || value === ''; })) {
                worksheet.spliceRows(i, 1);
            }
        }

        // Step 5: Save the workbook
        workbook.xlsx.writeFile('file.xlsx');
    });


// const workbook = new ExcelJS.Workbook();

workbook.xlsx.readFile('filename.xlsx')
    .then(function() {
        const worksheet = workbook.getWorksheet('Sheet1');
        const d = new Map([
            ['key1', 'value1'],
            ['key2', 'value2'],
            ['key3', 'value3']
        ]);
        const keys = Array.from(d.keys());

        worksheet.getColumn('A').values = keys;

        worksheet.getColumn('A').sort((a, b) => a - b);

        return workbook.xlsx.writeFile('filename.xlsx');
    })
    .catch(function(error) {
        console.log(error);
    });


/*  Note that this code uses the ExcelJS library to read an Excel workbook and access the lastCell property of a worksheet. 
This property returns an object that represents the last cell of the worksheet that contains data. 
The row and col properties of this object can then be used to determine the row and column number of the last cell.
Also, make sure to install ExcelJS library before using it in the code. You can do this by running npm install exceljs command in the terminal.
*/

// const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('path/to/your/workbook.xlsx')
  .then(function() {
    const worksheet = workbook.getWorksheet('Sheet1');
    
    const lastCell = worksheet.lastCell;

    let lRow = lastCell.row;
    let lCol = lastCell.col;

    console.log('Last Row: ' + lRow);
  });






/* Original Sort Function */
const sort = () =>{
    // Rules for sorting casement projects
    var projectNo = '';
    var customizedItem = []; // example CS WHWH12786837
    var unitType = ''; // example: unit
    var productType = ''; // example: CS, CD, ST, AN
    var int_Ext = ''; // color example: WHWH
    var grille_type = ''; // examples: n, iegbg, sdl, gbg
    var planFinDate = ''; 

    var CSItemCount = 0;
    var CTItemCount = 0;
    var ANItemCount = 0;
    var FWItemCount = 0;
    var CDItemCount = 0;


    var WHWHColorCount = 0;
    var BKWHColorCount = 0;
    var WHPNColorCount = 0;
    var WHOKColorCount = 0;
    var WHCVColorCount = 0;
    var STWHColorCount = 0;
    var STSTColorCount = 0;
    var STOKColorCount = 0;
    var STPNColorCount = 0;
    var STPNColorCount = 0;
    var TTWHColorCount = 0;



    if (sort.value === 1 && customizedItem.value === 'CS' &&  WHWHColorCount > 0){
        // var sortOder = [CS, CS, CS, CS, ]; // arrange vars from res casement customized item
       projList = ''
        for(productType in projList){
            if(CprojNo.customizedItem[0-1] == 'CS' && projectNo.customizedItem[2-5 == 'WHWH']){
                /* Ideal mix order: CT,AN,CS,CD,CS,CS,CD,FW,CS */
                sortOder.push(CT.WHWH, AN.WHWH, CS.WHWH, CD.WHWH, CS.WHWH, CS.WHWH, CD.WHWH, FW.WHWH, CS.WHWH) 
        var sorted = '' //{projNo  customizedItem  updGrp  updSeq  prpQty + unitType + productType + int_Ext + grille_type + planFinDate}
        }   
     }
    }

}
