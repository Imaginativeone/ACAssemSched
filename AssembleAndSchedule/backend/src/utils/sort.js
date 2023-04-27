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



// Range find method
// Load the workbook and select the worksheet
// var workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('filename.xlsx')
  .then(function() {
    var worksheet = workbook.getWorksheet('Sheet1');

    // Find the last non-blank cell in the worksheet
    var lastCell = worksheet.lastRow.lastCell;
    while (lastCell.type === ExcelJS.ValueType.Null || lastCell.type === ExcelJS.ValueType.Merge) {
      lastCell = lastCell._prev;
    }
    
    var lRow = lastCell.row;
    var lCol = lastCell.col;

    // Log the last row to the console
    console.log('Last Row: ' + lRow);
  });


// split functions 1 and 2
//Split1
worksheet.columns(1).eachCell((cell) => {
    cell.text = cell.text.split("|").join("\t");
});

//Split2
worksheet.columns(2).eachCell((cell) => {
    cell.text = cell.text.split("|").join("\t");
});

//Insert column to the left of Column F
worksheet.columns('F:F').insertBefore('E', 1);
console.log('worksheet', worksheet);

// Paste RangeT
// Load the workbook and select the worksheet
// Note that you'll need to install and import the ExcelJS library in your project before running this code. 
// Also, make sure to replace 'filename.xlsx' and 'Sheet1' with the appropriate values for your Excel file and worksheet.
// const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('filename.xlsx');
const worksheet = workbook.getWorksheet('Sheet1');

// Cut and paste the range U:U to F:F
worksheet.getColumn('U').moveTo('F');

// Clear the clipboard
worksheet.unsetPrintArea('U:U');

// Cut and paste the range O:O to G:G
worksheet.getColumn('O').moveTo('G');

// Clear the clipboard
worksheet.unsetPrintArea('O:O');

// Copy the range G:G to AN:AN
worksheet.getColumn('G').eachCell((cell, rowNumber) => {
  worksheet.getCell('AN' + rowNumber).value = cell.value;
});

// Save the workbook
await workbook.xlsx.writeFile('filename.xlsx');


/* 
'Sub Modifications()

'Sub VBA_Clear_Contents_Range()
'Range("E:E").ClearContents
'End Sub
*/
const ExcelJS = require('exceljs'); // import exceljs library
// const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('path/to/your/workbook.xlsx') // open workbook
    .then(function() {
        const worksheet = workbook.getWorksheet('Sheet1'); // select worksheet
        worksheet.getColumn('E').eachCell({ includeEmpty: true }, function(cell) { // loop through cells in column E
            cell.value = null; // set cell value to null
        });
        return workbook.xlsx.writeFile('path/to/your/workbook.xlsx'); // save changes
    })
    .catch(function(error) {
        console.log(error);
    });

/* 
Columns("G:G").Select
    Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
    Range("G2").Select
    ActiveCell.FormulaR1C1 = "=LEFT(RC[-5],2)"
    Range("G2").Select
    Selection.AutoFill Destination:=Range("G2:G1500")
    Range("G2:G1500").Select
    
    Columns("H:H").Select
    Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
*/

// const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('input.xlsx')
    .then(function() {
        const worksheet = workbook.getWorksheet('Sheet1');
        
        // Insert new column G and populate with formula
        const columnG = worksheet.getColumn('G');
        columnG.eachCell(function(cell, rowNumber) {
            if (rowNumber === 1) {
                cell.value = 'G Header';
            } else {
                cell.value = `=LEFT(${worksheet.getRow(rowNumber).getCell(3).address}, 2)`;
            }
        });
        columnG.copyTo('H');

        // Set formula to all the rows of G
        const columnGRange = worksheet.getColumn('G').getCell(2);
        columnGRange.fillDown(1499);

        // Save the changes
        return workbook.xlsx.writeFile('output.xlsx');
    })
    .catch(function(error) {
        console.log(error);
    });


/*  
'Private Sub NameCell()
With ActiveSheet
Range("G1").Value = "Product Type"
Range("H1").Value = "Int/Ext"
Range("I1").Value = "Unit Type"
Range("L1").Value = ""
Range("T1").Value = "Grille Type"


Range("AK1").Value = "Unique ID"
Range("AL1").Value = "New Batch"
Range("AM1").Value = "New Bin"
Range("AN1").Value = " "
Range("AO1").Value = " "
Range("AP1").Value = "Orig Type"

End With

'End Sub

*/
// const worksheet = workbook.getWorksheet('Sheet1'); // Replace 'Sheet1' with the name of your worksheet
worksheet.getCell('G1').value = 'Product Type';
worksheet.getCell('H1').value = 'Int/Ext';
worksheet.getCell('I1').value = 'Unit Type';
worksheet.getCell('L1').value = '';
worksheet.getCell('T1').value = 'Grille Type';
worksheet.getCell('AK1').value = 'Unique ID';
worksheet.getCell('AL1').value = 'New Batch';
worksheet.getCell('AM1').value = 'New Bin';
worksheet.getCell('AN1').value = '';
worksheet.getCell('AO1').value = '';
worksheet.getCell('AP1').value = 'Orig Type';

/* 
Columns("G:G").Insert Shift:=xlToRight, _
      CopyOrigin:=xlFormatFromLeftOrAbove 'or xlFormatFromRightOrBelow

Range("J:J").Cut Range("G:G")
 
    Application.CutCopyMode = False
    
'Range("Q:Q").Cut Range("I:I")
 
 '   Application.CutCopyMode = Fal

*/
// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('Sheet1');

// Insert a new column G and shift existing columns to the right
worksheet.columns.insert(7, 1, {key: 'G'});
 
// Copy the format from the column to the left of G to column G
worksheet.getColumn('G').copyFrom(worksheet.getColumn('F'));

// Cut the data from column J and paste it to column G
worksheet.getColumn('J').moveTo(7);

// Clear the cut-copy mode
worksheet.workbook.application.cutCopyMode = false;

// Cut the data from column Q and paste it to column I (optional)
//worksheet.getColumn('Q').moveTo(9);

// Clear the cut-copy mode (optional)
//worksheet.workbook.application.cutCopyMode = false;

// Save the workbook
workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('File has been written');
  });


/* 
'Sub sbVBS_To_Delete_EntireColumn()
Columns("J").EntireColumn.Delete
Columns("U:V").EntireColumn.Delete
Columns("M:S").EntireColumn.Delete
Columns("J:K").EntireColumn.Delete

Range("E:E").Cut Range("L:L")
 
    Application.CutCopyMode = False

Columns("E").EntireColumn.Delete

'End Sub

*/
worksheet.columns("J").eachCell({ includeEmpty: true }, function(cell, colNumber) {
    worksheet.spliceColumns(colNumber, 1);
});

worksheet.columns("U","V").eachColumn(function(column, columnNumber) {
    worksheet.spliceColumns(columnNumber, 1);
});

worksheet.columns("M","S").eachColumn(function(column, columnNumber) {
    worksheet.spliceColumns(columnNumber, 1);
});

worksheet.columns("J","K").eachColumn(function(column, columnNumber) {
    worksheet.spliceColumns(columnNumber, 1);
});

worksheet.getColumn("E").moveTo(12);

worksheet.columns("E").eachCell({ includeEmpty: true }, function(cell, colNumber) {
    worksheet.spliceColumns(colNumber, 1);
});



/*  
'identifying FF windows

Columns("I").Replace _
 What:="ff", Replacement:="if", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
'identifying Lines
 
 Columns("F").Replace _
 What:="    sag2", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="    sag1", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash3", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash2", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash1", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="  frame", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True

 Columns("F").Replace _
 What:="    full", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
'Sub CellFit()
 
 Columns("E:W").HorizontalAlignment = xlCenter
' With Range("J:K").Font
'    .ColorIndex = 1
'    .Bold = True
'End With
'End Sub

*/

// const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Sheet1');

// Identifying FF windows
sheet.getColumn('I').eachCell((cell) => {
  if (cell.value === 'ff') {
    cell.value = 'if';
  }
});

// Identifying Lines
const lines = ['sag2', 'sag1', 'sash3', 'sash2', 'sash1', 'frame', 'full'];
lines.forEach((line) => {
  sheet.getColumn('F').eachCell((cell) => {
    if (cell.value === line) {
      cell.value = 'unit';
    }
  });
});

// Center align columns E to W
sheet.columns('E:W').alignment = { horizontal: 'center' };

// Set font color to white and bold for columns J to K
sheet.columns('J:K').font = { color: { argb: 'FFFFFFFF' }, bold: true };

// Save the workbook
workbook.xlsx.writeFile('output.xlsx');


/* 
'copying existing batch/bin
    
'    Range("J2").Select
'    Application.CutCopyMode = False
'    ActiveCell.FormulaR1C1 = "=RC[-7]"
'    Range("K2").Select
'    Application.CutCopyMode = False
'    ActiveCell.FormulaR1C1 = "=RC[-7]"
'    Range("J2:K2").Select
'    Selection.AutoFill Destination:=Range("J2:K500")
'    Range("J2:K500").Select
    
 'creating color of int/ext
    'Columns("H:H").Select
    'Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
    Range("H2").Select
    ActiveCell.FormulaR1C1 = "=MID(RC[-6],5,4)"
    Range("H2").Select
    Selection.AutoFill Destination:=Range("H2:H1500")
    Range("H2:H1500").Select
*/

// copying existing batch/bin
worksheet.getCell('J2').value = {
formula: 'RC[-7]',
date1904: false,
};
worksheet.getCell('K2').value = {
formula: 'RC[-7]',
date1904: false,
};
worksheet.autoFill('J2:K500', 'fillSeries');

// creating color of int/ext
worksheet.getColumn('H').insertColumn(1);
worksheet.getCell('H2').value = {
formula: 'MID(RC[-6],5,4)',
date1904: false,
};
worksheet.autoFill('H2:H1500', 'fillSeries');

// Select the cell H2
worksheet.getCell("H2").select();

// Set the formula of the active cell to "=MID(RC[-6],5,4)"
worksheet.getCell("H2").value = {
    formula: '=MID(RC[-6],5,4)'
};

// Autofill the formula in the range H2:H1500
worksheet.getCell("H2").autoFill("H2:H1500", {
    // The fill series type (in this case, a linear series)
    series: "auto"
});

// Select the range H2:H1500
worksheet.select("H2:H1500");


/* 'Sub ToText()
'deleting extra rows with "0"

 With ActiveSheet
    .AutoFilterMode = False
    With Range("J1", Range("J" & Rows.Count).End(xlUp))
        .AutoFilter 1, "0"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With
    
'old initial sort

Rows("1:1").Select
   Selection.AutoFilter
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
'    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Clear
'    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Add Key:=Range _
'        ("F1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
'        xlSortNormal
'    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT
'        .Header = xlYes
'        .MatchCase = False
'        .Orientation = xlTopToBottom
'        .SortMethod = xlPinYin
'        .Apply
'    End With
    
    Columns("A:Y").AutoFit
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("K1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("H1"), SortOn:=xlSortOnValues, Order:=xlDescending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
   
    
End Sub  */

// Deleting Extra Rows with "0":
worksheet.autoFilter.commit();
worksheet.autoFilter.clear();
const colJ = worksheet.getColumn('J');
const colJValues = colJ.values;
const colJLastCell = colJ.lastCell;
const colJLastRow = colJLastCell ? colJLastCell.row : 0;
let i = 1;
for (i = 1; i <= colJLastRow; i++) {
  if (colJValues[i] == 0) {
    worksheet.spliceRows(i, 1);
    i--;
    colJLastRow--;
  }
}
worksheet.autoFilter.commit();

// Old Initial Sort:
worksheet.autoFilter.commit();
worksheet.autoFilter.clear();
worksheet.getRow(1).filter();
worksheet.autoFilter.sortConditions.clear();
worksheet.autoFilter.sortConditions.add({
  column: 'D',
  sortOn: 'values',
  sortOrder: 'ascending'
});
worksheet.autoFilter.sortConditions.add({
  column: 'C',
  sortOn: 'values',
  sortOrder: 'ascending'
});
worksheet.autoFilter.applyFilter();
worksheet.getColumn('A').width = 'auto';
worksheet.getColumn('Y').width = 'auto';

// Sorting by Column "K":
worksheet.autoFilter.commit();
worksheet.autoFilter.clear();
worksheet.getRow(1).filter();
worksheet.autoFilter.sortConditions.clear();
worksheet.autoFilter.sortConditions.add({
  column: 'K',
  sortOn: 'values',
  sortOrder: 'ascending'
});
worksheet.autoFilter.applyFilter();

// Sorting by Column "H":

worksheet.autoFilter.commit();
worksheet.autoFilter.clear();
worksheet.getRow(1).filter();
worksheet.autoFilter.sortConditions.clear();
worksheet.autoFilter.sortConditions.add({
  column: 'H',
  sortOn: 'values',
  sortOrder: 'descending'
});
worksheet.autoFilter.applyFilter();

/*  
 Sub E_CreateCSV()
 
 'Sub complete()
'
' complete Macro
'
    
    
 'create new file before final modifications
Dim IntialName As String
Dim sFileSaveName As Variant
IntialName = "CSPRESEQXXXXb"
sFileSaveName = Application.GetSaveAsFilename(InitialFileName:=InitialName, fileFilter:="Excel Files (*.xlsm), *.xlsm")
If sFileSaveName <> False Then
ActiveWorkbook.SaveAs sFileSaveName
End If

    'ThisWorkbook.ActiveSheet.Copy _
    'Before:=Workbooks.Add.Worksheets(1)
    
    
    Rows("1:1").Select
    Application.CutCopyMode = False
    Selection.Delete Shift:=xlUp
    Cells.Select
    Selection.NumberFormat = "@"
 
 'End Sub
 'save file as csv in specfic folder
    'ThisWorkbook.ActiveSheet
    'Sheets("Sheet1").Select
    'ActiveWindow.SelectedSheets.Delete

   'Sub sbSaveExcelDialog()
'Saving file to user specified location

Application.DisplayAlerts = False
    Dim Name As String
    Dim FileName As String
    Name = ActiveSheet.Name
    FileName = ThisWorkbook.Path & "\" & ActiveWorkbook.Name & ".csv"
   
   ActiveWorkbook.SaveAs FileName:= _
        ThisWorkbook.Path & "\" & ActiveWorkbook.Name & ".csv", FileFormat:=xlCSV, _
        CreateBackup:=False
    
  MsgBox "File " & Name & " has been Created and Saved under:  " & FileName, , "Copy & Save Report"
  ActiveWorkbook.Close
  Application.DisplayAlerts = True

'End Sub

End Sub
*/

// create new file before final modifications
const ExcelJS = require('exceljs');

// create new file before final modifications
let initialName = "CSPRESEQXXXXb";
// let workbook = new ExcelJS.Workbook();
workbook.xlsx.writeBuffer()
  .then(buffer => {
    let fileSaver = require('file-saver');
    let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    let sFileSaveName = fileSaver.saveAs(blob, initialName + ".xlsx");
    return workbook.xlsx.readFile(sFileSaveName);
  })
  .then(() => {
    let worksheet = workbook.worksheets[0];
    worksheet.getRow(1).delete();
    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.numFmt = "@";
      });
    });

    // save file as csv in specific folder
    let name = worksheet.name;
    let fileName = `${workbook.path}\\${workbook.name}.csv`;
    workbook.csv.writeFile(fileName)
      .then(() => {
        console.log(`File ${name} has been created and saved under: ${fileName}`);
        workbook.csv.writeFile(fileName)
          .then(() => {
            console.log(`File ${name} has been created and saved under: ${fileName}`);
          });
      })
      .catch(error => {
        console.error(error.message);
      });
  })
  .catch(error => {
    console.error(error.message);
  });


/* 
Sub D_SortforCasement()
'sort commands for buttons
' SortforSequence Macro
'

'
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With    
End Sub

*/
// Import the required modules
const ExcelJS = require('exceljs');

// Create a new workbook instance
// const workbook = new ExcelJS.Workbook();

// Load the workbook from file
workbook.xlsx.readFile('path/to/workbook.xlsx')
    .then(() => {
        // Get the Sheet1 worksheet
        const worksheet = workbook.getWorksheet('Sheet1');

        // Clear existing sort fields
        worksheet.autoFilter.sort.sortFields.clear();

        // Add sort field for column D
        worksheet.autoFilter.sort.sortFields.add({
            key: 'D1',
            sortOn: ExcelJS.Worksheet.AutoFilter.SortValues.values,
            order: ExcelJS.Worksheet.AutoFilter.SortValues.ascending,
            dataOption: ExcelJS.Worksheet.AutoFilter.DataOptions.normal
        });

        // Apply sort for column D
        worksheet.autoFilter.sort.apply();

        // Clear existing sort fields
        worksheet.autoFilter.sort.sortFields.clear();

        // Add sort field for column C
        worksheet.autoFilter.sort.sortFields.add({
            key: 'C1',
            sortOn: ExcelJS.Worksheet.AutoFilter.SortValues.values,
            order: ExcelJS.Worksheet.AutoFilter.SortValues.ascending,
            dataOption: ExcelJS.Worksheet.AutoFilter.DataOptions.normal
        });

        // Apply sort for column C
        worksheet.autoFilter.sort.apply();

        // Save the changes to the workbook
        return workbook.xlsx.writeFile('path/to/workbook.xlsx');
    })
    .then(() => {
        console.log('Sort applied successfully!');
    })
    .catch((error) => {
        console.log('An error occurred:', error);
    });


/* 
Sub C_BatchBin()

'current sequence for casement is:
'   100)  CT
'   200)  FW
'   300)  CS
'   400)  CD
'   500)  CS
'   600)  CS
'   700)  CD
'   800)  AN
'   900)  CS
'   950)  Sash/Frame


'unique ID
'labels all CT, FW, and AN witn specific number
        Range("M2").Select
    ActiveCell.FormulaR1C1 = _
        "=IF(RC[-6]=""CT"",100,IF(RC[-6]=""FW"",800,IF(RC[-6]=""AN"",200,0)))"
'trims frame type
    Range("N2").Select
    ActiveCell.FormulaR1C1 = "=TRIM(RC[-5])"
'concatenates UNIT TYPE, INT/EXT, FRAME TYPE, and SPECIFIC #
    Range("O2").Select
    ActiveCell.FormulaR1C1 = _
        "=CONCATENATE((TRIM(RC[-4])),RC[-8],RC[-7],RC[-1],RC[-2])"
'counts specific unit types
    Range("Q2").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R2C15:RC[-2],RC[-2])&RC[-2]"
'ID's number in characters of column N
    Range("U2").Select
    ActiveCell.FormulaR1C1 = _
        "=MIN(SEARCH({0,1,2,3,4,5,6,7,8,9},RC[-6]&""0123456789""))"
'extracts number from Column N
    Range("V2").Select
    ActiveCell.FormulaR1C1 = "=RIGHT(RC[-7], LEN(RC[-7])-RC[-1]+1)"
'creates number based on a max 9 digit length sequence
    Range("W2").Select
    ActiveCell.FormulaR1C1 = "=SUM(COUNTIF(R2C15:RC[-8],RC[-8])+100)"
'creates UNIQUE ID for each line
    Range("Y2").Select
    ActiveCell.FormulaR1C1 = "=CONCATENATE(RC[-5],RC[-2],RC[-12])"
'copy and pastes all formulas throughout file
    Range("M2:Y2").Select
    Selection.AutoFill Destination:=Range("M2:Y1500"), Type:=xlFillDefault
    Range("M2:Y1500").Select
'concatenates Int/Ext and Frame type
    Range("S2").Select
    ActiveCell.FormulaR1C1 = "=CONCATENATE((TRIM(RC[-8])),RC[-11],RC[-10])"
'identifies each similar color and frame type into a group
    Range("T2").Select
    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
    Range("S2:T2").Select
    Selection.AutoFill Destination:=Range("S2:T1500"), Type:=xlFillDefault
    Range("S2:T1500").Select
    
    
    
   Dim myRng As Range, cell As Range
Set myRng = Range("M2:M1500")

For Each cell In myRng

'CS
    If Range("G" & cell.Row) = "CS" Then Range("M" & cell.Row) = "300"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "300" Then Range("M" & cell.Row) = "500"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "500" Then Range("M" & cell.Row) = "600"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "600" Then Range("M" & cell.Row) = "900"

'CD
    If Range("G" & cell.Row) = "CD" Then Range("M" & cell.Row) = "400"
    If Range("G" & cell.Row) = "CD" And Range("M" & cell.Row - 1) = "400" Then Range("M" & cell.Row) = "700"
    'Else: Range("L" & cell.Row) = 7
    
'Sash/Frame
    If Range("F" & cell.Row) = "NonF" Then Range("M" & cell.Row) = "950"

    
    Next cell
    
    
'deletes empty rows
    
     With ActiveSheet
    .AutoFilterMode = False
    With Range("M1", Range("M" & Rows.Count).End(xlUp))
        .AutoFilter 1, "0"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With
    
'sorts based on UNIQUE ID (COLUMN w)


Range("A1:AD1").Select
    Selection.AutoFilter
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("Y1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortTextAsNumbers
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
'Assign values to batch and bin

    Range("Z2").Select
    ActiveCell.FormulaR1C1 = "2"
    Range("AA2").Select
    ActiveCell.FormulaR1C1 = "2"
    Range("Z3").Select
    ActiveCell.FormulaR1C1 = "=R[-1]C+2"
    Range("AA3").Select
    ActiveCell.FormulaR1C1 = "=R[-1]C+2"
    Range("Z3:AA3").Select
    Selection.AutoFill Destination:=Range("Z3:AA1500"), Type:=xlFillDefault
    Range("Z3:AA1500").Select

'    Range("X2").Select
'    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
'    Range("Y2").Select
'    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
'    Range("X2:Y2").Select
'    Selection.AutoFill Destination:=Range("X2:Y500"), Type:=xlFillDefault
'    Range("X2:Y500").Select

'hide cells

    Columns("L:X").Select
    Range("X1").Activate
    Selection.EntireColumn.Hidden = True

    Columns("AC").Select
    Range("AC1").Activate
    Selection.EntireColumn.Hidden = True

'copy and paste new batch/bin into correct locations

'   Selection.AutoFilter
    Columns("Z:AA").Select
    Selection.Copy
    Range("C1").Select
    Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
        :=False, Transpose:=False
    


    Columns("G:G").Select
    Selection.FormatConditions.Add Type:=xlTextString, String:="CT", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
    Selection.FormatConditions(1).StopIfTrue = False
    Selection.FormatConditions.Add Type:=xlTextString, String:="CD", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
    Selection.FormatConditions(1).StopIfTrue = False
    
    Columns("AD:AD").Select
    Selection.FormatConditions.Add Type:=xlTextString, String:="sash", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
   
End Sub

*/


/* first translation */
// const workbook = new ExcelJS.Workbook();

workbook.xlsx.readFile('sample.xlsx')
    .then(function () {
        const worksheet = workbook.getWorksheet('Sheet1');

        // current sequence for casement is:
        // 100) CT
        // 200) FW
        // 300) CS
        // 400) CD
        // 500) CS
        // 600) CS
        // 700) CD
        // 800) AN
        // 900) CS
        // 950) Sash/Frame

        // unique ID
        // labels all CT, FW, and AN with specific number
        worksheet.getCell('M2').value = '=IF(RC[-6]="CT",100,IF(RC[-6]="FW",800,IF(RC[-6]="AN",200,0)))';
        // trims frame type
        worksheet.getCell('N2').value = '=TRIM(RC[-5])';
        // concatenates UNIT TYPE, INT/EXT, FRAME TYPE, and SPECIFIC #
        worksheet.getCell('O2').value = '=CONCATENATE((TRIM(RC[-4])),RC[-8],RC[-7],RC[-1],RC[-2])';
        // counts specific unit types
        worksheet.getCell('Q2').value = '=COUNTIF(R2C15:RC[-2],RC[-2])&RC[-2]';
        // ID's number in characters of column N
        worksheet.getCell('U2').value = '=MIN(SEARCH({0,1,2,3,4,5,6,7,8,9},RC[-6]&"0123456789"))';
        // extracts number from Column N
        worksheet.getCell('V2').value = '=RIGHT(RC[-7], LEN(RC[-7])-RC[-1]+1)';
        // creates number based on a max 9 digit length sequence
        worksheet.getCell('W2').value = '=SUM(COUNTIF(R2C15:RC[-8],RC[-8])+100)';
        // creates UNIQUE ID for each line
        worksheet.getCell('Y2').value = '=CONCATENATE(RC[-5],RC[-2],RC[-12])';

        // copy and pastes all formulas throughout file
        const sourceRange = worksheet.getCell('M2:Y2');
        const targetRange = worksheet.getCell('M2:Y1500');
        targetRange.value = sourceRange.value;

        // concatenates Int/Ext and Frame type
        worksheet.getCell('S2').value = '=CONCATENATE((TRIM(RC[-8])),RC[-11],RC[-10])';
        // identifies each similar color and frame type into a group
        worksheet.getCell('T2').value = '=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))';

        // copy and pastes all formulas throughout file
        const sourceRange2 = worksheet.getCell('S2:T2');
        const targetRange2 = worksheet.getCell('S2:T1500');
        targetRange2.value = sourceRange2.value;

        // CS --> this translation is not complete
        for (let i = 2; i <= 1500; i++) {
            if (worksheet.getCell(`G${i}`).value === 'CS') {
                if (worksheet.getCell(`M${i - 1}`).value === 300) worksheet.getCell
            }
        }

      
/* Second translation */

const workbook = new ExcelJS.Workbook();

// Load the workbook and the worksheet
await workbook.xlsx.readFile('workbook.xlsx');
// const worksheet = workbook.getWorksheet('Sheet1');

// Define the current sequence for casement
const casementSequence = {
    CT: 100,
    FW: 200,
    CS: [300, 500, 600, 900],
    CD: [400, 700],
    AN: 800,
    Sash_Frame: 950
};

// Define the unique IDs for CT, FW, and AN
worksheet.getCell('M2').value = { formula: '=IF(G2="CT",100,IF(G2="FW",800,IF(G2="AN",200,0)))' };

// Trim frame type
worksheet.getCell('N2').value = { formula: '=TRIM(H2)' };

// Concatenate UNIT TYPE, INT/EXT, FRAME TYPE, and SPECIFIC #
worksheet.getCell('O2').value = { formula: '=CONCATENATE(TRIM(B2),C2,N2,E2,F2)' };

// Count specific unit types
worksheet.getCell('Q2').value = { formula: '=COUNTIF($Q$2:Q2,Q2)&Q2' };

// ID's number in characters of column N
worksheet.getCell('U2').value = { formula: '=MIN(SEARCH({0,1,2,3,4,5,6,7,8,9},K2&"0123456789"))' };

// Extracts number from Column N
worksheet.getCell('V2').value = { formula: '=RIGHT(K2,LEN(K2)-U2+1)' };

// Creates number based on a max 9 digit length sequence
worksheet.getCell('W2').value = { formula: '=SUM(COUNTIF($W$2:W2,W2)+100)' };

// Creates UNIQUE ID for each line
worksheet.getCell('Y2').value = { formula: '=CONCATENATE(O2,Q2,W2)' };

// Copy and paste all formulas throughout the file
worksheet.autoFill('M2:Y1500', 'M2:Y2');

// Concatenate INT/EXT and FRAME TYPE
worksheet.getCell('S2').value = { formula: '=CONCATENATE(TRIM(B2),C2,H2)' };

// Identifies each similar color and frame type into a group
worksheet.getCell('T2').value = { formula: '=IF(COUNTIF(T$1:T1,T1)=1,MAX($R$1:R1)+1,VLOOKUP(T1,$R$1:S'+(worksheet.lastRow - 1)+',2,0))' };
worksheet.autoFill('S2:T'+worksheet.lastRow, 'S2:T2');

// Set up variables for loop
let previousCellValue;
let cell;

// Loop through cells and update cell values based on the current sequence for casement
for (let row = 2; row <= worksheet.lastRow; row++) {
    cell = worksheet.getCell('M' + row);
    previousCellValue = worksheet.getCell('M' + (row - 1)).value;
    
    if (worksheet.getCell('G' + row).value === 'CS') {
        if (previousCellValue === casementSequence.CS[0]) {
            cell.value = casementSequence.CS[1];
        } else if (previousCellValue === casementSequence.CS[1]) {
            cell.value = casementSequence.CS[2];
        } else if (previousCellValue === cas

// I broke up the functions a bit
// const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('file.xlsx');
// const worksheet = workbook.getWorksheet('Sheet1');

const myRng = worksheet.getCell('M2:M1500');

myRng.eachCell(async (cell, rowNumber) => {
    // CS
    if (worksheet.getCell(`G${rowNumber}`).value === 'CS') {
        worksheet.getCell(`M${rowNumber}`).value = 300;
        if (worksheet.getCell(`M${rowNumber - 1}`).value === 300) {
            worksheet.getCell(`M${rowNumber}`).value = 500;
        }
        if (worksheet.getCell(`M${rowNumber - 1}`).value === 500) {
            worksheet.getCell(`M${rowNumber}`).value = 600;
        }
        if (worksheet.getCell(`M${rowNumber - 1}`).value === 600) {
            worksheet.getCell(`M${rowNumber}`).value = 900;
        }
    }

    // CD
    if (worksheet.getCell(`G${rowNumber}`).value === 'CD') {
        worksheet.getCell(`M${rowNumber}`).value = 400;
        if (worksheet.getCell(`M${rowNumber - 1}`).value === 400) {
            worksheet.getCell(`M${rowNumber}`).value = 700;
        }
    }

    // Sash/Frame
    if (worksheet.getCell(`F${rowNumber}`).value === 'NonF') {
        worksheet.getCell(`M${rowNumber}`).value = 950;
    }
});

// deletes empty rows
worksheet.autoFilter.clear();
worksheet.autoFilterColumn(13, '0');
worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1 && row.getCell('M').value === 0) {
        row.delete();
    }
});

await workbook.xlsx.writeFile('file.xlsx');

/* 'sorts based on UNIQUE ID (COLUMN w)


Range("A1:AD1").Select
    Selection.AutoFilter
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("Y1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortTextAsNumbers
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
*/
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('file.xlsx');
const worksheet = workbook.getWorksheet('Sheet1');

worksheet.autoFilter.commit();
worksheet.autoFilter.sortConditions.clear();
worksheet.autoFilter.sortConditions.add({
  sortBy: 24, // 24 is the index of column Y (assuming W is the first column)
  sortAscending: true
});

await worksheet.autoFilter.apply();

/* 

*/

        
/* 
'hide cells

    Columns("L:X").Select
    Range("X1").Activate
    Selection.EntireColumn.Hidden = True

    Columns("AC").Select
    Range("AC1").Activate
    Selection.EntireColumn.Hidden = True
*/
















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
