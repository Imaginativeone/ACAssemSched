import Excel from 'exceljs'
import * as fs from "fs";
// import Papa from 'papaparse'

function parseCustomFormatFile(filePath) {
  // Read the .txt file content
  const content = fs.readFileSync(filePath, 'utf8');

  // Split the content into lines
  const lines = content.split('\n');

  // Initialize an array to store the parsed data
  const data = [];

  let i = 0;
  while (i < lines.length) {
    // Skip the header lines before each table
    if (lines[i].startsWith('Date')) {
      i += 3;
      continue;
    }

    // Extract headers from the current line
    const headerLine = lines[i];
    const headers = headerLine
      .split('|')
      .map((header) => header.trim())
      .filter((header) => header !== '');

    i += 2;

    while (i < lines.length && !lines[i].startsWith('+-----')) {
      const line = lines[i].trim();
      if (line === ' ') {
        // Skip empty lines and table separators
        i += 2;
        continue;
      }

      // Split the line by '|' and map each value to the corresponding header
      const values = line.split('|').map((value) => value.trim());
      const rowData = {};

      headers.forEach((header, index) => {
        rowData[header] = values[index * 2 + 1];
      });

      // Add the parsed row data to the data array
      data.push(rowData);

      i++;
    }
  }

  return data;
}(parseCustomFormatFile)

// Usage example
// Replace 'yourfile.txt' with the path to your .txt file with the provided format
const inputFilePath = './uploadedFiles/test.txt';
const parsedData = parseCustomFormatFile(inputFilePath);
console.log(parsedData);