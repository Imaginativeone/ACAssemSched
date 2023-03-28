import * as fs from 'fs'
import { count } from 'console';
import readline from 'readline'

/* Business logic that will read file line-by-line then update the database with a json obect for each project number.

*/

function parseFile(){
    // Assign local file to var
    //Read the file

    fs.readdir('../../uploadedFiles', (err, data) => {
        let projObj = {};
        // const fileDir = [];
        if (err) return console.log(err)
       
        // console.log('There be a list of files in the var data: \n', data);
      
        const uploadDirSize = data.length;
        const dataType = typeof(data);
        console.log('The length of the files directory and dataType:', data.length, dataType);
       
        for(let i=0; i < uploadDirSize; i++){
          if(!data){
            console.log('No files found')
            } 
            else{
      
            // console.log('list of files in dir----->', data) // uploaded is UNDEFINED here
      
            const filePath = '../../uploadedFiles/';
            
            fs.readFile(filePath+data[0], 'utf8', (err, data) => {
                if (err) return console.error(err)
                console.log('This is the contents of the file----->\n', data)
                // console.log('Matched data from file', data.match('N51845'))
                // console.log('This is the contents of the file----->\n', data)
            })

            fs.open(filePath+data[0], 'r', (err, fd) => {
                console.log('OPening file with fs.open', fd)
            })
            // console.log('Data----->', data[0]);
            // projObj = data.match('I')
            
            // console.log('Line no. 41ish Value of project', projObj) //
          }
        }
      });

      const readFileLocation = "../../uploadedFiles/test.txt"
const writeFileLocation = "../../uploadedFiles/Answer.txt"


const readProp = () => {
    
    const text = fs.createReadStream(readFileLocation, "utf-8");
    
    const rl = readline.createInterface({
        input: text,
    });
    let counter = 0;
    let spider = counter - 1;
    rl.on("line", (res) => {
        console.log (counter + "  " + res + " " + spider); // to help see line numbers inorder to locate data indexes
            if(counter != 0 || counter != 1 || counter != 2 || counter != 3){
                const resList = res.split("|");
                const projNo = resList[0];
                const customizedItem = resList[1];
                const updGrp = resList[2];
                const updSeq = resList[3];
                const planFinD = resList[4];
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
                console.log(counter + " " + projNo + " " + customizedItem)

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
      
    
    /* Different ways to use fs with Asyn-Await, Promise, or Callback */
    // With a callback:
    // fs.outputFile(file, 'hello!', err => {
    // console.log(err) // => null

    // fs.readFile(file, 'utf8', (err, data) => {
    //     if (err) return console.error(err)
    //     console.log(data) // => hello!
    //     })
    // })

    // With Promises:
    // fs.outputFile(file, 'hello!')
    // .then(() => fs.readFile(file, 'utf8'))
    // .then(data => {
    //     console.log(data) // => hello!
    //     })
    // .catch(err => {
    //     console.error(err)
    // })

    // // With async/await:
    // async function asyncAwait () {
    // try {
    //     fs.outputFile(file, 'hello!')

    //     const data = fs.readFile(file, 'utf8')

    //     console.log(data) // => hello!
    //     } catch (err) {
    //     console.error(err)
    // }
    // }

    // asyncAwait()
};
parseFile();

export default {parseFile}