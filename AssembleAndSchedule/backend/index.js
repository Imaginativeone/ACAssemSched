import express from 'express';
import multer from 'multer';
import cors from 'cors'
import Excel from 'exceljs'
import {readdir, readFile} from 'fs/promises';

import * as fs from "fs";

// import assemFile from "./src/models/assemFile.js";
// import './src/routes.js';


const app = express();
import bodyParser from 'body-parser';

const fileFilter = function(req, file, cb){
    const allowedTypes = ["text/csv", "text/plain", "image/gif", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }

    cb(null, true)
};

const MAX_SIZE = 20000000;
const upload = multer({
    dest: './uploadedFiles/',
    fileFilter,
    limits: {
        filesSize: MAX_SIZE
    }
});

/* Imports */
import "dotenv/config";
// import router from "./src/routes";



/* Middleware  */
app.use(express.json());
app.use(cors()) // need to configure before going production!!
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//     req.context = {
//       models,
//       // me: models.users[1],  // TODO: Look up the user
//     };
//     next();
//   });

// app.use(function(err, req, res, next){
//     if(err.code === "LIMIT_FILE_TYPES"){
//         res.status(422).json({ error: "Only CVS or Excel files allowed"});
//         return;
//     }

//     if(err.code === "LIMIT_FILE_SIZE"){
//         res
//         .status(422)
//         .json({error: `Too large. Max sizeis ${MAX_SIZE / 1000}kb`})
//         return;
//     }
// });

/* Routes */

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname,"index.html"))
// })

app.post('/uploadedFiles', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.json()
    }

    //create new db entry with result as filename then return ID of file
    const fileID = req.file.filename
    const fileName = req.file.originalname
    console.log('file input to backend', JSON.stringify(req.file))
    fs.renameSync(`./uploadedFiles/${fileID}`, `./uploadedFiles/${fileID}_${fileName}`)
    await cleanUp(`${fileID}_${fileName}`)
    res.json({message: "done", fileID, fileName, })
});

// app.get('./uploadedFiles', (req, res) => { 
//     async function readFilesFromDir() {
//         const filesDir =  './uploadedFiles'
//         const files = await readdir(filesDir);

//         // check for files
//         console.log('Contents of files', files);

//         const filesContent = await Promise.all(files.map((file) => {
//           return readFile(filesDir + '/' + file, 'utf8');
//         }));

//         const arr = filesContent.reduce((acc, data) => {
//           acc.push(data.toString().split('\n'))
//           return acc;
//         }, [])
      
//         return new Set(arr);
//       }
      
//       readFilesFromDir().then((values) => {
//         console.log(values);
//       })
// })

app.get('/uploadedFiles', (req, res) => {
    const filedir = './uploadedFiles'
    const files = fs.readdirSync(filedir);
    const filesContent = fs.lstatSync(filedir)
    // console.log(files, filesContent)

    console.log("in GET")
    res.json({message: "done", 
        files: files.filter(f => f.match(/.xlsx$/)).map(f => ({
            fileID: f.substring(0, f.indexOf('_')), 
            fileName: f.substring(f.indexOf('_')+1)
    })), filesContent})    
});

// app.get('uploadedFiles', (req, res) => {
//     const filedir = './uploadedFiles'
//     const isFile = fileName => {
//         return fs.lstatSync(fileName).isFile();
//       };
      
//       fs.readdirSync(filedir)
//         .map(fileName => {
//             console.log(fileName);
//           return path.join(filedir, fileName);
//         })
//         .filter(isFile);
//     res.json(fileName)      
// })

app.get('/cleanUp', async (req, res) => {
    console.log("got fileID to cleanup: " + req.query.fileID)

    try {
        await cleanUp(req.query.fileID)
        res.json({status: "ok"})
    } catch (ex) {
        res.json({status: "error", message: ex.message})
    }
})

// GET /fileContent/:filename
app.get('/fileContent', async (req, res) => {
    console.log("fileContent filename: " + req.query.filename)
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./uploadedFiles/' + req.query.filename);

    const worksheet = workbook.worksheets[0]

    // Getting stats from file contents
    // const numColumns = workbook.worksheets[0].columnCount()

    const content = []
    // Iterate over all rows (including empty rows) in a worksheet
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
        content.push(row.values)
    })


    res.json(content) 
})

// async function cleanUp(fileName) { 
//     const csvOptions = {
//         parserOptions: {
//             delimiter: '|' > 19,
//             quote: false,
//           },
//     }

//     const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

//     const workbook = new Excel.Workbook();
//     const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
//     await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);

// }


/* VBA Code
'Sub DeleteRowWithContents()

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*Date*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*---*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*Renewal*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
        End With
    .AutoFilterMode = False
    End With

    'End Sub
*/
async function cleanUp(fileName) { 
    // const csvOptions = {
    //     parserOptions: {
    //         delimiter: '|',
    //         quote: false,
    //       },
    // }
    

    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

    // Parse the pipe-delimited .txt file
    const parsedData = Papa.parse(fileContent, {
        delimiter: "|",
        header: true,
    });

     // Write the data rows
    parsedData.data.forEach((row, rowIndex) => {
        headers.forEach((header, colIndex) => {
        worksheet.getCell(rowIndex + 2, colIndex + 1).value = row[header];
        });
    });
    
    const workbook = new Excel.Workbook();
    // const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
    const worksheet = await workbook.readFile(`${parsedData}/${fileName}`);
    
    
    
    /* Crude way of deleting rows */
    const workSheetLength = worksheet.rowCount
    
    // const rows = worksheet.getRows(1, workSheetLength )
    // rows.forEach(row => {
        //     const cell = row.getCell('A1')
        //     cell.value == String ? cell.value == null: row.splice()
    // }) 
  
    
    // Iterate over all rows (including empty rows) in a worksheet, find empty row and delete
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.eachCell(function(cell, colNumber){
            if (cell.value == "Date " || cell.value == 'Renewal' || cell.value == '----' || cell.value == " ") row.splice()
            console.log(" ---> removed", cell.value)
        })
    })
   
    await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);
        
    
    /* Below is the VBA code from the macro. It needs to be converted to node  */
       
    /* Duplicate  */
    // 'Sub duplicate1()
    // 'Range("a1").Resize(d.Count) = Application.Transpose(d.keys)
    // 'Sub SortUp() 'Excel VBA for a sort (ascending).
    // Range("A:A").Sort _
    // Key1:=Range("A1"), Order1:=xlAscending
    // 'End Sub

    /* Sort Ascending */
    
    // 'Sub SortUp() 'Excel VBA for a sort (ascending).
    // Range("A:A").Sort _
    // Key1:=Range("A1"), Order1:=xlAscending
    // 'End Sub


    /*  Insert columns into the active worksheet */
    // Columns("F:F").Insert Shift:=xlToRight, _
    //   CopyOrigin:=xlFormatFromLeftOrAbove 'or xlFormatFromRightOrBelow
    // 'End Sub

    /* Paste RangeT 'Cut and Paste a Range of Cells */
//     Range("U:U").Cut Range("F:F")
//     Application.CutCopyMode = False 
//     Range("O:O").Cut Range("G:G")
//     Application.CutCopyMode = False
//     Range("G:G").Copy Range("AN:AN")
//     Application.CutCopyMode = False
// 'End Sub


/* Modifications */
// 
// 'Sub Modifications()

// 'Sub VBA_Clear_Contents_Range()
// 'Range("E:E").ClearContents
// 'End Sub

//     Columns("G:G").Select
//     Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
//     Range("G2").Select
//     ActiveCell.FormulaR1C1 = "=LEFT(RC[-5],2)"
//     Range("G2").Select
//     Selection.AutoFill Destination:=Range("G2:G1500")
//     Range("G2:G1500").Select
    
//     Columns("H:H").Select
//     Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove 
        
//     'Private Sub NameCell()
//     With ActiveSheet
//     Range("G1").Value = "Product Type"
//     Range("H1").Value = "Int/Ext"
//     Range("I1").Value = "Unit Type"
//     Range("L1").Value = ""
//     Range("T1").Value = "Grille Type"


//     Range("AK1").Value = "Unique ID"
//     Range("AL1").Value = "New Batch"
//     Range("AM1").Value = "New Bin"
//     Range("AN1").Value = " "
//     Range("AO1").Value = " "
//     Range("AP1").Value = "Orig Type"

//     End With

//     'End Sub

/*    */
// Columns("G:G").Insert Shift:=xlToRight, _
//       CopyOrigin:=xlFormatFromLeftOrAbove 'or xlFormatFromRightOrBelow

// Range("J:J").Cut Range("G:G")
 
//     Application.CutCopyMode = False
    
    

// 'Range("Q:Q").Cut Range("I:I")
 
//  '   Application.CutCopyMode = Fal

// 'Sub sbVBS_To_Delete_EntireColumn()
// Columns("J").EntireColumn.Delete
// Columns("U:V").EntireColumn.Delete
// Columns("M:S").EntireColumn.Delete
// Columns("J:K").EntireColumn.Delete

// Range("E:E").Cut Range("L:L")
 
//     Application.CutCopyMode = False

// Columns("E").EntireColumn.Delete

// 'End Sub
        
/*'identifying FF windows */

// Columns("I").Replace _
//  What:="ff", Replacement:="if", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
// /* 'identifying Lines */
 
//  Columns("F").Replace _
//  What:="    sag2", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
//  Columns("F").Replace _
//  What:="    sag1", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
//  Columns("F").Replace _
//  What:="   sash3", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
//  Columns("F").Replace _
//  What:="   sash2", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
//  Columns("F").Replace _
//  What:="   sash1", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
 
//  Columns("F").Replace _
//  What:="  frame", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True

//  Columns("F").Replace _
//  What:="    full", Replacement:="unit", _
//  SearchOrder:=xlByColumns, MatchCase:=True
// 'Sub CellFit()
 
//  Columns("E:W").HorizontalAlignment = xlCenter
// ' With Range("J:K").Font
// '    .ColorIndex = 1
// '    .Bold = True
    


//  'copying existing batch/bin
    
// '    Range("J2").Select
// '    Application.CutCopyMode = False
// '    ActiveCell.FormulaR1C1 = "=RC[-7]"
// '    Range("K2").Select
// '    Application.CutCopyMode = False
// '    ActiveCell.FormulaR1C1 = "=RC[-7]"
// '    Range("J2:K2").Select
// '    Selection.AutoFill Destination:=Range("J2:K500")
// '    Range("J2:K500").Select
    
//  'creating color of int/ext
//     'Columns("H:H").Select
//     'Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
//     Range("H2").Select
//     ActiveCell.FormulaR1C1 = "=MID(RC[-6],5,4)"
//     Range("H2").Select
//     Selection.AutoFill Destination:=Range("H2:H1500")
//     Range("H2:H1500").Select

// 'Sub ToText()
// 'deleting extra rows with "0"

//  With ActiveSheet
//     .AutoFilterMode = False
//     With Range("J1", Range("J" & Rows.Count).End(xlUp))
//         .AutoFilter 1, "0"
//         On Error Resume Next
//         .Offset(1).SpecialCells(12).EntireRow.Delete
//     End With
//     .AutoFilterMode = False
//     End With
    
// 'old initial sort

// Rows("1:1").Select
//    Selection.AutoFilter
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
// '    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Clear
// '    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Add Key:=Range _
// '        ("F1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
// '        xlSortNormal
// '    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT
// '        .Header = xlYes
// '        .MatchCase = False
// '        .Orientation = xlTopToBottom
// '        .SortMethod = xlPinYin
// '        .Apply
// '    End With
 
//     Columns("A:Y").AutoFit
    
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("K1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
    
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("H1"), SortOn:=xlSortOnValues, Order:=xlDescending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
   
    
// End Sub


// Sub D_SortforCasement()
// 'sort commands for buttons
// ' SortforSequence Macro
// '

// '
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
    
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortNormal
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With
    
    
    
// End Sub

/* Batch Bin  */


// Sub C_BatchBin()

// 'current sequence for casement is:
// '   100)  CT
// '   200)  FW
// '   300)  CS
// '   400)  CD
// '   500)  CS
// '   600)  CS
// '   700)  CD
// '   800)  AN
// '   900)  CS
// '   950)  Sash/Frame


// 'unique ID
// 'labels all CT, FW, and AN witn specific number
//         Range("M2").Select
//     ActiveCell.FormulaR1C1 = _
//         "=IF(RC[-6]=""CT"",100,IF(RC[-6]=""FW"",800,IF(RC[-6]=""AN"",200,0)))"
// 'trims frame type
//     Range("N2").Select
//     ActiveCell.FormulaR1C1 = "=TRIM(RC[-5])"
// 'concatenates UNIT TYPE, INT/EXT, FRAME TYPE, and SPECIFIC #
//     Range("O2").Select
//     ActiveCell.FormulaR1C1 = _
//         "=CONCATENATE((TRIM(RC[-4])),RC[-8],RC[-7],RC[-1],RC[-2])"
// 'counts specific unit types
//     Range("Q2").Select
//     ActiveCell.FormulaR1C1 = "=COUNTIF(R2C15:RC[-2],RC[-2])&RC[-2]"
// 'ID's number in characters of column N
//     Range("U2").Select
//     ActiveCell.FormulaR1C1 = _
//         "=MIN(SEARCH({0,1,2,3,4,5,6,7,8,9},RC[-6]&""0123456789""))"
// 'extracts number from Column N
//     Range("V2").Select
//     ActiveCell.FormulaR1C1 = "=RIGHT(RC[-7], LEN(RC[-7])-RC[-1]+1)"
// 'creates number based on a max 9 digit length sequence
//     Range("W2").Select
//     ActiveCell.FormulaR1C1 = "=SUM(COUNTIF(R2C15:RC[-8],RC[-8])+100)"
// 'creates UNIQUE ID for each line
//     Range("Y2").Select
//     ActiveCell.FormulaR1C1 = "=CONCATENATE(RC[-5],RC[-2],RC[-12])"
// 'copy and pastes all formulas throughout file
//     Range("M2:Y2").Select
//     Selection.AutoFill Destination:=Range("M2:Y1500"), Type:=xlFillDefault
//     Range("M2:Y1500").Select
// 'concatenates Int/Ext and Frame type
//     Range("S2").Select
//     ActiveCell.FormulaR1C1 = "=CONCATENATE((TRIM(RC[-8])),RC[-11],RC[-10])"
// 'identifies each similar color and frame type into a group
//     Range("T2").Select
//     ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
//     Range("S2:T2").Select
//     Selection.AutoFill Destination:=Range("S2:T1500"), Type:=xlFillDefault
//     Range("S2:T1500").Select

    
//    Dim myRng As Range, cell As Range
// Set myRng = Range("M2:M1500")

// For Each cell In myRng

// 'CS
//     If Range("G" & cell.Row) = "CS" Then Range("M" & cell.Row) = "300"
//     If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "300" Then Range("M" & cell.Row) = "500"
//     If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "500" Then Range("M" & cell.Row) = "600"
//     If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "600" Then Range("M" & cell.Row) = "900"

// 'CD
//     If Range("G" & cell.Row) = "CD" Then Range("M" & cell.Row) = "400"
//     If Range("G" & cell.Row) = "CD" And Range("M" & cell.Row - 1) = "400" Then Range("M" & cell.Row) = "700"
//     'Else: Range("L" & cell.Row) = 7
    
// 'Sash/Frame
//     If Range("F" & cell.Row) = "NonF" Then Range("M" & cell.Row) = "950"

    
//     Next cell
    
    
// 'deletes empty rows
    
//      With ActiveSheet
//     .AutoFilterMode = False
//     With Range("M1", Range("M" & Rows.Count).End(xlUp))
//         .AutoFilter 1, "0"
//         On Error Resume Next
//         .Offset(1).SpecialCells(12).EntireRow.Delete
//     End With
//     .AutoFilterMode = False
//     End With
    
// 'sorts based on UNIQUE ID (COLUMN w)


// Range("A1:AD1").Select
//     Selection.AutoFilter
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
//     ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
//         ("Y1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
//         xlSortTextAsNumbers
//     With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
//         .Header = xlYes
//         .MatchCase = False
//         .Orientation = xlTopToBottom
//         .SortMethod = xlPinYin
//         .Apply
//     End With

// 'Assign values to batch and bin

//     Range("Z2").Select
//     ActiveCell.FormulaR1C1 = "2"
//     Range("AA2").Select
//     ActiveCell.FormulaR1C1 = "2"
//     Range("Z3").Select
//     ActiveCell.FormulaR1C1 = "=R[-1]C+2"
//     Range("AA3").Select
//     ActiveCell.FormulaR1C1 = "=R[-1]C+2"
//     Range("Z3:AA3").Select
//     Selection.AutoFill Destination:=Range("Z3:AA1500"), Type:=xlFillDefault
//     Range("Z3:AA1500").Select

// '    Range("X2").Select
// '    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
// '    Range("Y2").Select
// '    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
// '    Range("X2:Y2").Select
// '    Selection.AutoFill Destination:=Range("X2:Y500"), Type:=xlFillDefault
// '    Range("X2:Y500").Select

// 'hide cells

//     Columns("L:X").Select
//     Range("X1").Activate
//     Selection.EntireColumn.Hidden = True

//     Columns("AC").Select
//     Range("AC1").Activate
//     Selection.EntireColumn.Hidden = True

// 'copy and paste new batch/bin into correct locations

// '   Selection.AutoFilter
//     Columns("Z:AA").Select
//     Selection.Copy
//     Range("C1").Select
//     Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
//         :=False, Transpose:=False
    


//     Columns("G:G").Select
//     Selection.FormatConditions.Add Type:=xlTextString, String:="CT", _
//         TextOperator:=xlContains
//     Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
//     With Selection.FormatConditions(1).Font
//         .Color = -16383844
//         .TintAndShade = 0
//     End With
//     With Selection.FormatConditions(1).Interior
//         .PatternColorIndex = xlAutomatic
//         .Color = 13551615
//         .TintAndShade = 0
//     End With
//     Selection.FormatConditions(1).StopIfTrue = False
//     Selection.FormatConditions.Add Type:=xlTextString, String:="CD", _
//         TextOperator:=xlContains
//     Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
//     With Selection.FormatConditions(1).Font
//         .Color = -16383844
//         .TintAndShade = 0
//     End With
//     With Selection.FormatConditions(1).Interior
//         .PatternColorIndex = xlAutomatic
//         .Color = 13551615
//         .TintAndShade = 0
//     End With
//     Selection.FormatConditions(1).StopIfTrue = False
    
//     Columns("AD:AD").Select
//     Selection.FormatConditions.Add Type:=xlTextString, String:="sash", _
//         TextOperator:=xlContains
//     Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
//     With Selection.FormatConditions(1).Font
//         .Color = -16383844
//         .TintAndShade = 0
//     End With
//     With Selection.FormatConditions(1).Interior
//         .PatternColorIndex = xlAutomatic
//         .Color = 13551615
//         .TintAndShade = 0
//     End With
   


// End Sub

}

/* This function was added to test finding empty cells but Excel.run is not recognized as a function  */
async function RemoveDuplicates(workbook) {
  await Excel.run(async (context) => {    
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    var selectedRange = context.workbook.getSelectedRange();
    var firstCell = selectedRange.getCell(0, 0);
    var surroundingRegion = selectedRange.getSurroundingRegion();
    firstCell.load('columnIndex');
    surroundingRegion.load('address');
    await context.sync();
    var columnIndex = firstCell.columnIndex;
    
    const deleteResult = surroundingRegion.removeDuplicates([columnIndex], true);
    deleteResult.load();
  });
}



app.listen(5001, () => console.log("Running on localhost:5001"));

export default app;