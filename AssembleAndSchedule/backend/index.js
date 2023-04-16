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

//     if(err.code === "LIMIT_FIL_ESIZE"){
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
    // const fileName = req

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
    // console.log("file content json: ", JSON.stringify(workbook.model))

    const worksheet = workbook.worksheets[0]

    console.log("xxxx => " + JSON.stringify(worksheet.model))

    const content = []
    // Iterate over all rows (including empty rows) in a worksheet
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
        content.push(row.values)
    })

    // console.log("entire content: " + JSON.stringify(content))
  
})



async function cleanUp(fileName) { 
    const csvOptions = {
        parserOptions: {
            delimiter: '|',
            quote: false,
          },
    }

    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
    await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);

}


app.listen(5001, () => console.log("Running on localhost:5001"));

export default app;