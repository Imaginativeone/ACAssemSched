<template>
  <header>
    <h1 class="header">CASEMENT Scheduler</h1>
  </header>
    <div class="container">
      <ButtonComponent 
        text=" Fresh Start" 
        color="green" 
        @click="freshStart()"
      />

      <ButtonComponent 
        text=" Clean-UP" 
        color="blue" 
        @click="cleanUp()"
      /> 

      <ButtonComponent
        text=" Batch/Bin "
        color="orange"
        @click="batchBin()"
      />

      <ButtonComponent 
        text=" Save Completed File" 
        color="red"
        @click="saveCompletedFile()" 
      />

      <ButtonComponent
        text=" Resort "
        color="blue"
        @click="reSort()"
      />

 </div>
 <input type="file"> {{ this.file }}

  <!-- Upload file -->
  <div class="section">
  <div> 

   <!-- <CleanUp /> -->
   <!-- <input type="file" id="dealCsv" /> -->
  
  </div>
    <div class="container">
      <simple-upload />
    </div>

    <!-- <dropzone /> -->


  </div>
</template>

<script>
// import { OPEN } from 'ws';
import axios from 'axios'
// import { readFile } from 'fs'

import ButtonComponent from '../components/ButtonComponent'
import SimpleUpload from '../components/SimpleUpload.vue'
// import CleanUp from '../components/CleanUp.vue'
import '../composables/convert'

// import Dropzone from '../components/DropZone.vue'

// import FileReader from '@/components/FileReader.vue'
// import CleanUp from '@/components/CleanUp.vue'
// import SaveCompletedFile from '@/components/SaveCompletedFile.vue'
// import FreshStart from '@/components/FreshStart.vue'
// import ReSort from '@/components/ReSort.vue'
// import reader from 'readline'

  export default {
    components: { ButtonComponent, SimpleUpload, /* CleanUp */ /* Dropzone */ },
    name: 'CasementView',
    props: {
      file: String
    },
    methods: {
      exportAsCsv(){
            const format = 'csv'
            // const exportSelectedOnly = true
            const exportTable = true
            const filename = this.$refs.file
            this.$refs.grid.exportTable(format, exportTable, filename);
        },
        exportAsExcel(){
            const format = 'xlsx'
            const exportTable = true
            const filename = this.file;
            this.$refs.grid.exportTable(format, exportTable, filename);
        },
        freshStart(){
          console.log('Reset the page')
        },
        cleanUp(){
          //To show the cleaned-sorted table
        },
        batchBin(){
          console.log('rules for batching');
        },
        saveCompletedFile(){
          const fileToSave = this.file;
          axios.put('./uploads', fileToSave)
          console.log('Saving file', fileToSave);
        },
        reSort(){
          console.log('Resort according to what rules?');
        },
        getData(){
          const schData = this.$refs.file
          console.log('Did we read the file success?', schData);
        },

        // convertCSV(){
        //     const csvToJson = require('convert-csv-to-json');

        //     const fileInputName = '{{this.file}}.csv'; 
        //     const fileOutputName = 'assemData.json';

        //     const json = csvToJson.getJsonFromCsv("this.file");

        //     for(let i=0; i<json.length;i++){
        //         console.log(json[i]);
        //     }
        //     return csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
        // },
        csvJSON(csv) {
            console.log(csv)
            var lines = csv.split('\n')

            var result = []

            var headers = lines[0].split('|')

            for (var i = 1; i < lines.length; i++) {
                var obj = {}
                var currentline = lines[i].split('|')

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j]
                }

                result.push(obj)
            }
            console.log('data', result)
        },

  // /*------ Method for read uploded csv file ------*/
  //       uploadDealcsv.prototype.getCsv = function(e) {
            
  //           let input = document.getElementById('dealCsv');
  //           input.addEventListener('change', function() {

  //             if (this.files && this.files[0]) {

  //                 var myFile = this.files[0];
  //                 var reader = new FileReader();
                  
  //                 reader.addEventListener('load', function (e) {
                      
  //                     let csvdata = e.target.result; 
  //                     parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
  //                 });
                  
  //                 reader.readAsBinaryString(myFile);
  //             }
  //     });
  //   }

  //   /*------- Method for parse csv data and display --------------*/
  //   uploadDealcsv.prototype.getParsecsvdata = function(data) {

  //       let parsedata = [];

  //       let newLinebrk = data.split("\n");
  //       for(let i = 0; i < newLinebrk.length; i++) {

  //           parsedata.push(newLinebrk[i].split(","))
  //       }

  //       console.table(parsedata);
  //   });    
   }
}
    
</script>

<style>

</style>