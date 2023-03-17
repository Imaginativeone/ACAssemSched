import express from 'express';
import multer from 'multer';
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
app.use(bodyParser.json());


app.use((req, res, next) => {
    req.context = {
      models,
      // me: models.users[1],  // TODO: Look up the user
    };
    next();
  });

app.use(function(err, req, res, next){
    if(err.code === "LIMIT_FILE_TYPES"){
        res.status(422).json({ error: "Only CVS or Excel files allowed"});
        return;
    }

    if(err.code === "LIMIT_FIL_ESIZE"){
        res
        .status(422)
        .json({error: `Too large. Max sizeis ${MAX_SIZE / 1000}kb`})
        return;
    }
});

/* Routes */

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post('/uploadedFiles', upload.single('file'), (req, res) => {
    //create new db entry with result as filename then return ID of file
    console.log('file in the backend', JSON.stringify(req))
    // setImmediate(parse_file)
    res.json({file: req.file});
});

app.get('/uploadedFiles', (req, res) => {
    res.json({file: req.file[0]})
    console.log("file", {file: req.file[0]})
});




app.listen(3305, () => console.log("Running on localhoat:3305"));

export default app;