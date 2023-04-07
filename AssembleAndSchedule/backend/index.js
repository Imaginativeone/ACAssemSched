import express from 'express';
import multer from 'multer';
import cors from 'cors'
import Excel from 'exceljs'
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

app.post('/uploadedFiles', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.json()
    }

    //create new db entry with result as filename then return ID of file
    const fileID = req.file.filename
    console.log('file input the backend', JSON.stringify(req.file))
    res.json({message: "done", fileID})
});

app.get('/uploadedFiles', (req, res) => {
    // res.json({file: req.file[0]})
    // console.log("file", {file: req.file[0]})
    console.log("in GET")
    res.json({files: []})
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



async function cleanUp(fileID) { 
    const csvOptions = {
        parserOptions: {
            delimiter: '|',
            quote: false,
          },
    }

    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileID}`, csvOptions);
    await workbook.xlsx.writeFile(`./uploadedFiles/${fileID}.xlsx`);

}


app.listen(5001, () => console.log("Running on localhost:5001"));

export default app;