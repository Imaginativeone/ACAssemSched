/*  The purpose of this service:
    Open the uploaded file for processing
    Read the file line by line
    Create objects of each project with associated characteristics
    Every value of the object is key:value pair
    Return objects to Compents ---> CleanUp/Casement  
*/
import * as fs from 'fs-extra';
import SimpleUpload from '@/client/src/components/SimpleUpload'

function parseFile(file){
    const file = SimpleUpload.file;
    console.log('file from /uploadedFiles dir', file);

    fs.opendir(path='/uploadedfiles/');
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
  
export default {parseFile};