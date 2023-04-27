import express from 'express';
import multer from 'multer';
import cors from 'cors'
import Excel from 'exceljs'
import  XlSX  from 'xlsx';
import * as fs from "fs";
import Papa from 'papaparse'

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
// import { col } from 'sequelize';
// import router from "./src/routes";


/* Middleware  */
app.use(express.json());
app.use(cors()) // need to configure before going production!!
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/uploadedFiles', (req, res) => {
    const filedir = './uploadedFiles'
    const files = fs.readdirSync(filedir);
    const filesContent = fs.lstatSync(filedir)
    // console.log(files, filesContent)
    // const fileName = req

    console.log("in GET")
    res.json({message: "done", 
        files: files.filter(f => f.match(/.xlsx$/)).map(f => ({
            fileID: f.substring(0, f.indexOf('_')), 
            fileName: f.substring(f.indexOf('_')+1)
    })), filesContent})    
});

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




    const content = []
    // Iterate over all rows (including empty rows) in a worksheet
    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
        // Iterate over all cells in a row (including empty cells)
            content.push(row.values)
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values) + 'Column cell' + cell.value + '=' + JSON.stringify(cell.value) )
    })
    
    res.json(content) 
})

// async function cleanUp(fileName) { 
//     const csvOptions = {
//         parserOptions: {
//             delimiter: ' ',
//             quote: true,
//           },
//     }    

//     // const parsedData = parseCustomFormatFile(fileName)
//     const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

//     const workbook = new Excel.Workbook();
//     // const worksheet = await workbook.csv.readFile(`${parsedData}${fileName}`, csvOptions);
//     const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
//     // const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`).workbook.addWorksheet("Sheet1");

//     // await workbook.xlsx.writeFile(`${parsedData}/${newFileName}.xlsx`);
//     await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);
// }

function parseCustomFormatFile(filePath) {
  // Read the .txt file content
  const content = fs.readFileSync(filePath, 'utf8');

  // Split the content into lines
  const lines = content.split('\n');
  // console.log('lines', lines)

  const parsedHeaders = Papa.parse(lines[4], {
    delimiter: "|",
    header: true,
  })


  // Initialize an array to store the parsed data
  const data = [];

  let i = 0;
  while (i < lines.length) {
    // Skip the header lines before each table
    if (lines[i].trim().startsWith('Date')) {
      i += 4;
      continue;
    }

    // Extract headers from the current line
    const headerLine = lines[i];
    const headers = headerLine
      .split('|')
      .map((header) => header.trim())
      .filter((header) => header !== '');
    console.log('header', headers)

    i += 2;

    while (i < lines.length && !lines[i].startsWith('+-----')) {

      const line = lines[i].trim();
      if ([
        '',
        'Date',
        'Renewal',
        '----',
        ' ',
        'Total',
      ].includes(line)) {
        // Skip empty lines and table separators
        i += 2;
        continue;
      }

      // Split the line by '|' and map each value to the corresponding header
      const values = line.split('|').map((value) => value.trim());
      // console.log('values.length', values.length)
      // console.log('headers.length', headers.length)
      const rowData = {};

      headers.forEach((header, index) => {
        rowData[header] = values[index];
      });

      // Add the parsed row data to the data array
      data.push(rowData);

      i++;
    }
    console.log(data)
  }

  return data;
}

async function freshStart(fileName){
    console.log('filename', fileName)

    const parsedData = parseCustomFormatFile(`./uploadedFiles/${fileName}`)
    const workSheet = XlSX.utils.json_to_sheet(parsedData);

    workSheet.autoFilter(1); // Auto filter on the first row of the worksheet
    workSheet.getRange('A1:AZ1').clear(); // Clear the contents of the first row of the worksheet
    workSheet.getRange('A:AZ').clear(); // Clear the contents of all cells in columns A to AZ
    workSheet.spliceColumns(1, 52); // Delete the columns A to AZ
}


async function cleanUp(fileName) { 
    console.log('filename', fileName)
    
    const parsedData = parseCustomFormatFile(`./uploadedFiles/${fileName}`)
    const workSheet = XlSX.utils.json_to_sheet(parsedData);
    // VBA code starts here
    




    const workBook = XlSX.utils.book_new();
    XlSX.utils.book_append_sheet(workBook, workSheet, "parsedData")
    // Generate buffer
    XlSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

    // Binary string
    XlSX.write(workBook, { bookType: "xlsx", type: "binary" })
    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

    await XlSX.writeFile(workBook, `./uploadedFiles/${newFileName}.xlsx`)

    // await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`); not needed temporarily retained for reference
}

app.listen(5001, () => console.log("Running on localhost:5001"));

export default app;