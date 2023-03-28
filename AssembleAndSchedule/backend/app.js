const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('sequelize')

const dotenv = require("dotenv");

dotenv.config();
const app = express();

sequelize.AsyncQueueError({force: false}).then(()=> {
    app.listen(process.env.DB_PORT, () => console.log('now listening'))
})

/* Middleware  */
app.use(bodyParser.json())

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


/* API Routes */

app.get("/*", (res, req) => {
    res.sendFile(path.join(__dirname, "index.html"))
})


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


app.listen(3305, () => console.log("Running on localhoat:3305"))

module.exports = app;