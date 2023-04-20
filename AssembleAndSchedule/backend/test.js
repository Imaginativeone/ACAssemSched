
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

async function cleanUpOne(fileName) {
    // Read the file
    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')
    const fileContent = fs.readFileSync(`./uploadedFiles/${fileName}`, "utf8");

    // Parse the pipe-delimited .txt file
    const parsedData = Papa.parse(fileContent, {
        delimiter: "|",
        header: true,
    });

    // Create a new Excel workbook
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

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
                const cellValue = row[header];
                worksheet.getCell(rowIndex + 2, colIndex + 1).value = cellValue;
            });
        } else {
            console.log(" ---> removed", row);
        }
    });


    // Save the workbook
    await workbook.xlsx.writeFile(`./uploadedFiles/${newFileName}.xlsx`);

    return workbook;
}


async function cleanUp(fileName) { 
    const csvOptions = {
        parserOptions: {
            delimiter: '|',
            quote: true,
          },
    }
    

    const newFileName = fileName.replace(/.csv$/, '').replace(/.txt$/, '')

    // Parse the pipe-delimited .txt file
    // const parsedData = Papa.parse(fileContent, {
    //     delimiter: "|",
    //     header: true,
    // });
    
     // Write the data rows
    // parsedData.data.forEach((row, rowIndex) => {
    //     headers.forEach((header, colIndex) => {
    //         worksheet.getCell(rowIndex + 2, colIndex + 1).value = row[header];
    //     });
    // });
    
    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(`./uploadedFiles/${fileName}`, csvOptions);
    // const worksheet = await workbook.readFile(`${parsedData}/${fileName}`);
    
    
    
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
        
    
