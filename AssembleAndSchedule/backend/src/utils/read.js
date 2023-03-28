import { count } from 'console';
import fs from 'fs';
import readline from 'readline';
import { Sequelize } from 'sequelize';
// import '../models/assemFileData.js'
// const readline = require("readline");



const readFileLocation = "../../uploadedFiles/file.txt"
const writeFileLocation = "../../uploadedFiles/Answer.txt"


async function readProp  () {
    const text = fs.createReadStream(readFileLocation, "utf-8");
    
    const rl = readline.createInterface({
        input: text,
    });

    let counter = 0;
    let spider = 0;
    
        rl.on("line", (res) => {
        // console.log (counter + "  " + res + " " + spider); // to help see line numbers inorder to locate data indexes
            const resList = res.split("|");
            if (resList.length > 19){
                // Column in file
                const projNo = resList[0].substring();
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
                const int_ext = '';
                const grille_type = '';
                const grille = ''
                console.log(counter + " " + projNo + " " + customizedItem + " " + sort1)

            //  Sequelize.models.assemFileData
            //     .create({ id, owner, createdAt, projNo, customized_item, updGrp, updSeq, int_ext, grille_type, 
            //         plan_fin_dt, grille, sort1, sort2, sort3, sort4, sort5, sort6, 
            //         feat1, feat2, feat3, feat4, feat5, feat6, feat7, lino, prpQty })
            //     .catch((err) => {
            //       console.log(
            //         "***There was an error creating data in database", err
            //       );
            //     });

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

const createProj=(formatedDataFromFile)=>{
     var project = {};
     let fileSize = 0
     for(projId in formatedDataFromFile /* projId < fileSize; projId++*/){
        project = {
            projNo: formatedDataFromFile.projNo[projId],
            customizedItem: formatedDataFromFile.customizedItem[projId],
            updGrp: formatedDataFromFile.updGrp[projId],
            updSeq: formatedDataFromFile.updSeq[projId],
            planFinDate: formatedDataFromFile.planFinDate[projId],
            sort1: formatedDataFromFile.sort1[projId],
            sort2: formatedDataFromFile.sort2[projId],
            sort3: formatedDataFromFile.sort3[projId],
            sort4: formatedDataFromFile.sort4[projId],
            sort5: formatedDataFromFile.sort5[projId],
            sort6: formatedDataFromFile.sort6[projId],
            feat1: formatedDataFromFile.feat1[projId],
            feat2: formatedDataFromFile.feat1[projId],
            feat3: formatedDataFromFile.feat1[projId],
            feat4: formatedDataFromFile.feat1[projId],
            feat5: formatedDataFromFile.feat1[projId],
            feat6: formatedDataFromFile.feat1[projId],
            feat7: formatedDataFromFile.feat1[projId],
            lino: formatedDataFromFile.lino[projId],
            prpQty: formatedDataFromFile.prpQty[projId],
        }
     }
}