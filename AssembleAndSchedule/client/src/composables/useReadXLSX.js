import {read, writeFileXLSX} from "./xlsx.mjs"

function convert2Json(dataFile){
    // Require library
    const reader = require('xlsx')

    // read file
    let dataFile = fetch('./data.xlsx')
    const file = reader.readFile('dataFile')

    let data = []

    const sheets = file.SheetNames

    for(let i=0; i < sheets.length; i++){
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
            data.push(res)
        })
    }
}
// Printing data
console.log(data)

export default {
    convert2Json
}