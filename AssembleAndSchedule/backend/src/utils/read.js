import { count } from "console";
import fs from "fs";
import readline from "readline";
import AssemFileData from "../config/models/assemFileData.js";


// const readFileLocation = "./file.txt";  // Test file location
const readFileLocation = "../uploadedFiles/test.txt";  // Test file location
// const text = fs.createReadStream(readFileLocation, "utf-8");
// console.log('contents of text file:', text)

async function readCreateData() {
  // const readFileLocation = "../uploadedFiles/test.txt "
  // console.log('readFileLocation:', readFileLocation)
  // const writeFileLocation = "../uploadedFiles/Answer.txt";
 
  const text = fs.createReadStream(readFileLocation, "utf-8");

  const rl = readline.createInterface({
    input: text,
  });

  let counter = 0;
  let spider = 0;

  rl.on("line", async (res) => {
    // console.log (counter + "  " + res + " " + spider); // to help see line numbers inorder to locate data indexes
    const resList = res.split("|");
    if (resList.length > 19) {
      // Column in file
      // let fileSize = 0;
      try {
        const lineProj = await AssemFileData.create({
          proj_no: resList[0].substring(),
          customized_item: resList[1],
          upd_grp: resList[2],
          upd_seq: resList[3],
          plan_fin_dt: resList[4],
          grille: "",
          sort1: resList[5],
          sort2: resList[6],
          sort3: resList[7],
          sort4: resList[8],
          sort5: resList[9],
          sort6: resList[10],
          feat1: resList[11],
          feat2: resList[12],
          feat3: resList[13],
          feat4: resList[14],
          feat5: resList[15],
          feat6: resList[16],
          feat7: resList[17],
          lino: resList[18],
          prp_qty: resList[19],
          int_ext: "",
          grille_type: "",
        });
        console.log(
          `${counter} ${lineProj(proj_no)} ${lineProj(customizedItem)} ${lineProj(sort1)} ${spider}`
        );
        counter++;
        spider++;
        return lineProj;
      } catch (err) {
        console.log(
          "There was an error creating file data",
          JSON.stringify(err)
        );
        // return res.send(err);
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
