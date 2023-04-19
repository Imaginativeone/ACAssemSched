/* A function to convert any text file contents to json objects  */

function convertToJson(res){
    // Read text file and split on new lines
    const lines = fs.readFileSync('file.txt').toString().split("\r\n");
    console.log('contents of res', res);

    // Parse projects
    let projects = [];

    // for each project in file
    for(let index = 0; index < lines.length; index++){
        //extract project information out of text file
        // console.log("Current job ", lines[index])
        projects.push({
            proj: lines[index],
            // customizedItem: lines[index],
            // updGrp: lines[index],
            // updSeq: lines[index],
            // planFi: lines[index],
            // sort1 : lines[index],
            // sort2 : lines[index],
            // sort3 : lines[index],
            // sort4 : lines[index],
            // sort5 : lines[index],
            // sort6 : lines[index],
            // feat1 : lines[index],
            // feat2 : lines[index],
            // feat3 : lines[index],
            // feat4 : lines[index],
            // feat5 : lines[index],
            // feat6 : lines[index],
            // feat7 : lines[index],
            // lino : lines[index],
            // prpQty: lines[index]
        });
        // console.log('Contents of Projects', projects)
        // Write project to database. For now save extracted data to json file
        fs.writeFileSync("fileOut.txt", `${projects}`)
    }
 }

convertToJson();


