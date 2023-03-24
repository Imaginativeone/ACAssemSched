import { count } from 'console';
import fs from 'fs';
import readline from 'readline'
// const readline = require("readline");


const readFileLocation = "../../uploadedFiles/file.txt"
const writeFileLocation = "../../uploadedFiles/Answer.txt"


const readProp = () => {
    
    const text = fs.createReadStream(readFileLocation, "utf-8");
    
    const rl = readline.createInterface({
        input: text,
    });

    let counter = 0;
    let spider = 0;
    rl.on("line", (res) => {
        // console.log (counter + "  " + res + " " + spider); // to help see line numbers inorder to locate data indexes
            if(counter != 0 || counter != 1 || counter != 2 || counter != 3){
                const resList = res.split("|");
                // Column in file
                const projNo = resList[0];
                const customizedItem = resList[1];
                const updGrp = resList[2];
                const updSeq = resList[3];
                const planFinDate = resList[4];
                const sort1 = resList[5];
                const sort2 = resList[6];
                const sort3 = resList[7];
                const sort4 = resList[8];
                const sort5 = resList[9];
                const sort6 = resList[10];
                const feat1 = resList[11];
                const feat2 = resList[12];
                const feat3 = resList[13];
                const feat4 = resList[14];
                const feat5 = resList[15];
                const feat6 = resList[16];
                const feat7 = resList[17];
                const lino = resList[18];
                const prpQty = resList[19];
                console.log(counter + " " + projNo + " " + customizedItem + " " + sort1)

                // if(counter === 0){
                //     writeFileToDatabse(answer + os.EOL);
                // }
            }
            counter++;
            spider++;
 });
};
readProp();

const writeFileToDatabse = (data) => {
    fs.appendFile(writeFileLocation, data, "utf-8", (err) => {
        if(err) console.log(err);
    })
}