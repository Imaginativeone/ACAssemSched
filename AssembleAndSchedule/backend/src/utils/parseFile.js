import * as fs from 'fs-extra'
import SimpleUpload from '@client/src/Compents/SimpleUpload'


/* Business logic that will read file line-by-line then update the database with a json obect for each project number.

*/


function parseFile(){
    // Assign local file to var
    const file = fs.opendir(path, '@client/src/components/SimpleUpload/$file');
    console.log('Here is the uploaded file');
    
    //Read the file
    dataToParse = fs.readFile(file)

    /* Different ways to use fs with Asyn-Await, Promise, or Callback */
    // With a callback:
    fs.outputFile(file, 'hello!', err => {
    console.log(err) // => null

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.error(err)
        console.log(data) // => hello!
        })
    })

    // With Promises:
    fs.outputFile(file, 'hello!')
    .then(() => fs.readFile(file, 'utf8'))
    .then(data => {
        console.log(data) // => hello!
        })
    .catch(err => {
        console.error(err)
    })

    // With async/await:
    async function asyncAwait () {
    try {
        await fs.outputFile(file, 'hello!')

        const data = await fs.readFile(file, 'utf8')

        console.log(data) // => hello!
        } catch (err) {
        console.error(err)
    }
    }

    asyncAwait()
}

export default {parseFile}