import Excel from 'exceljs'
import * as fs from "fs";
import Papa from 'papaparse'


function parseCustomFormatFile(filePath) {
  // Read the .txt file content
  const content = fs.readFileSync({filePath}, 'utf8');

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

    i += 1;

    while (i < lines.length) {

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
        i += 1;
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

// module.exports = {parseCustomFormatFile}
export default {parseCustomFormatFile}
// Usage example
// Replace 'yourfile.txt' with the path to your .txt file with the provided format
// const inputFilePath = './src/utils/testDatafile.txt';
// const parsedData = parseCustomFormatFile(inputFilePath);
// console.log(parsedData);
