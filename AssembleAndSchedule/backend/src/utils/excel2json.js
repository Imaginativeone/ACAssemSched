import * as xlsx from 'xlsx'

// var xlsx = require("xlsx")
// var dataPathExcel = "../../uploadedFiles/7272e2862a775923a9d690d84fde39bc_CS010623a.xlsx"
// var wb = readFile(dataPathExcel)
// var sheetName = wb.SheetNames[0]
// var sheetValue = wb.Sheets[sheetName]
// console.log(sheetValue)
// var excelData = utils.sheet_to_json(sheetValue)
// console.log(excelData)

console.log("Line before function starts")
function excel2json() {
    var dataPathExcel = "../../uploadedFiles/7272e2862a775923a9d690d84fde39bc_CS010623a.xlsx"
    // var wb = xlsx.readFile(dataPathExcel)  // Why am I getting an error here that xlsx.readFile() is not a function?
    xlsx.readFile(dataPathExcel)
    var sheetName = wb.SheetNames[0]
    var sheetValue = wb.Sheets[sheetName]
    console.log(sheetValue)
    var excelData = utils.sheet_to_json(sheetValue)
    console.log(excelData)
}
excel2json()

export default {excel2json}