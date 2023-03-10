const reader = require('xlsx')

//reading test file
const file = reader.readFile('./test1.xlsx')

// Sample data set

const ws = reader.utils.json_to_sheet(part_data)

reader.utils.book_append_sheet(file,ws, "Sheet1")

//Writing to our file
reader.writeFile(file, './test.xlsx')

document.getElementById('inputfile').addEventListener('change', function(){

    var fr=new FileReader();
    fr.onload=function(){
        document.getElementById('output').tabIndex=fr.result;
    }

    fr.readAsText(this.files[0]);
})