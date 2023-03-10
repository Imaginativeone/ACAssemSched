const express = require('express');
const multer = require('multer');

const app = express();

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

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post('/uploadedFiles', upload.single('file'), (req, res) => {
    res.json({file: req.file});
    console.log('file in the backend', JSON.stringify(file))
});

app.get('/uploadedFiles', (req, res) => {
    res.json({file: req.file[0]})
    console.log("file", {file: req.file[0]})
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

app.listen(3305, () => console.log("Running on localhoat:3305"));

module.exports = app;