import { count, timeStamp } from "console";
import fs from "fs";
import readline from "readline";
// import { DATE } from "sequelize";
// import AssemFileData from "../../config/assemFileData.js";

// import assemdb from "../database.js";
// import AssemFile from "../../models/assemFile.js";
// import { writeFileAsync } from "xlsx";
// import { fileURLToPath } from "url";

// assemdb.sync(function (err) {
//   console.error("syncerror", err);
// });

// const readFileLocation = "./file.txt";  // Test file location
const readFileLocation = "./testDatafile.txt"; // Test file location
// const text = fs.createReadStream(readFileLocation, "utf-8");
// console.log('contents of text file:', text)

async function readCreateData() {
  const text = fs.createReadStream(readFileLocation, "utf-8");
  const rl = readline.createInterface({
    input: text,
  });

  var counter = 0;
  let endOfLine = 0;
  var projects = [];

  rl.on("line", async (res) => {
    console.log (counter + "  " + res + " " + endOfLine); // to help see line numbers inorder to locate data indexes
    const resList = res.split("|");
    projects.push({resList})
    
    if (resList.length > 19) {
      // Column in file
      // let fileSize = 0;
      // writeFileAsync({text: fileURLToPath})
      try {
        // await AssemFileData.create({
        //   id: Date.UTC(),
        //   proj_no: resList[0],
        //   customized_item: resList[1],
        //   upd_grp: resList[2],
        //   upd_seq: resList[3],
        //   plan_fin_dt: resList[4],
        //   sort1: resList[5],
        //   sort2: resList[6],
        //   sort3: resList[7],
        //   sort4: resList[8],
        //   sort5: resList[9],
        //   sort6: resList[10],
        //   feat1: resList[11],
        //   feat2: resList[12],
        //   feat3: resList[13],
        //   feat4: resList[14],
        //   feat5: resList[15],
        //   feat6: resList[16],
        //   feat7: resList[17],
        //   lino: resList[18],
        //   prp_qty: resList[19],
        //   grille: "",
        //   int_ext: "",
        //   grille_type: "",
        // });
        // projects.push({Data: resList})
        console.log(`${counter} ${lineProj(proj_no)} ${lineProj(customizedItem)} ${lineProj(sort1)} ${res}`);
        counter++;
        endOfLine++;
      } catch (err) {
        console.log(
          "There was an error creating file data",
          JSON.stringify(err)
        );
      }
    }
  });
}
readCreateData();

// const writeFileToDatabse = (data) => {
//   fs.appendFile(readFileLocation, data, "utf-8", (err) => {
//     if (err) console.log(err);
//   });
// };
