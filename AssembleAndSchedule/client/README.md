# assem_schedule

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


Libraries In Use

Handsontable
Filesystem

Read the CSV file: You can use the fs module in Node.js to read the CSV file and convert it to a string. For example, you can use the following code to read a file called 'data.csv':

const fs = require('fs');

const csvString = fs.readFileSync('data.csv', 'utf8');

Convert the CSV string to a JSON object: You can use a package like csvtojson to convert the CSV string to a JSON object. Here's an example code snippet:

const csv = require('csvtojson');

csv()
  .fromString(csvString)
  .then((jsonObj) => {
    console.log(jsonObj);
  });

Display the JSON object in a table using Vue.js: Once you have the JSON object, you can use Vue.js to display it in a table. You can use the v-for directive to loop through the JSON object and display the data in the table. Here's an example code snippet:

<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in jsonObj">
      <td>{{ row.column1 }}</td>
      <td>{{ row.column2 }}</td>
      <td>{{ row.column3 }}</td>
    </tr>
  </tbody>
</table>

Export the table to an Excel spreadsheet: To export the table to an Excel spreadsheet, you can use a package like exceljs. Here's an example code snippet:

const Excel = require('exceljs');

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('My Sheet');

// Add the table headers
worksheet.addRow(['Column 1', 'Column 2', 'Column 3']);

// Add the table data
for (const row of jsonObj) {
  worksheet.addRow([row.column1, row.column2, row.column3]);
}

// Save the workbook as an Excel file
workbook.xlsx.writeFile('data.xlsx');

This code will create an Excel file called 'data.xlsx' in the current directory, with the data from the table.

1

Message "Hi Anyone here with Vue node experience"
