import express from 'express';
import multer from 'multer';
import cors from 'cors'
import Excel from 'exceljs'
import * as fs from "fs";
import Papa from 'papaparse'
import './src/utils/read.js'

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
import { col } from 'sequelize';
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
        row.eachCell({includeEmpty: false}, function(cell, cellNumber){
            content.push(row.values, cell.value)
        })
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values) + 'Column cell' + cell.value + '=' + JSON.stringify(cell.value) )
    })
    
    res.json(content) 
})

async function cleanUp(fileName) { 
    // const csvOptions = {
    //     parserOptions: {
    //         delimiter: '|',
    //         quote: true,
    //       },
    // }

    const dataFile = readCreateData(`./uploadedFiles/${fileName}`)

     const parsedData = Papa.parse(fileName, {
        delimiter: "|",
        header: true,
    });

    // Create a new Excel workbook
    const workbook = new Excel.Workbook();
    // const worksheet = await workbook.csv.readFile(`${dataFile}`);

    // const worksheet = workbook.addWorksheet("");

    // Write the header row
    const headers = parsedData.meta.fields;
    headers.forEach((header, index) => {
        worksheet.getColumn(index + 1).key = header;
        worksheet.getCell(1, index + 1).value = header;
    });


    // Write the data rows
    parsedData.data.forEach((row, rowIndex) => {
        // Check the value of the first column using the first header name
        if (!["Date ", "Renewal", "----", " "].includes(row[headers[0]])) {
            headers.forEach((header, colIndex) => {
                // const cellValue = row[header];
                worksheet.getCell(rowIndex + 2, colIndex + 1).value = cellValue;
            });
        } else {
            console.log(" ---> removed", row);
        }
        return worksheet
    });

    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

    // const workbook = new Excel.Workbook();
    // const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
    // const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`).workbook.addWorksheet("Sheet1");

    await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);
}

app.listen(5001, () => console.log("Running on localhost:5001"));

export default app;