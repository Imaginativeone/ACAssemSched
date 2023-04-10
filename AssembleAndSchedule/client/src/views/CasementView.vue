<template>
  <header>
    <h1 class="banner">Casement Scheduler</h1>
  </header>
    <div class="container">
      <ButtonComponent 
        text=" Fresh Start" 
        color="green" 
        @click="freshStart()"
      />

      <ButtonComponent 
        text=" Clean-Up plus BatchBin" 
        color="blue" 
        @click="cleanUp_bb()"
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

      <br>
      <br>
      <br>

      <!-- <h1 class="banner">Select An Option To Continue </h1> -->

 </div>

 <div class="section">
  <div class="container">
    <FilesTable ></FilesTable>
  </div>
 </div>

 <div class="section">
  <div class="xcontainer">
    <SpreadSheet ></SpreadSheet>
  </div>
 </div>
 
  
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
  <!-- <div>
     <CleanUp />
 </div> -->
</template>

<script>
import axios from 'axios'
// import { readFile } from 'fs'

import ButtonComponent from '../components/ButtonComponent'
import SimpleUpload from '../components/SimpleUpload.vue'
import FilesTable from '../components/FilesTable.vue'
// import CleanUp from '../components/CleanUp.vue'
// import Dropzone from '../components/DropZone.vue'
import SpreadSheet from '../components/SpreadSheet.vue'

  export default {
    components: { ButtonComponent, SimpleUpload,  FilesTable,  SpreadSheet /* CleanUp, Dropzone */ },
    // components: { ButtonComponent, SimpleUpload,  FilesTable, /*CleanUp /* Dropzone */ },
    name: 'CasementView',
    props: {
      file: String
    },
    methods: {
      cleanUp_bb(){
        var fr = new FileReader();
        fr.onload=function(){
          fr.readAsText(this.file)
        }
        console.log('This is the file, Yeah', this.$file)

        //To show the cleaned-sorted table
        //   document.getElementById('inputfile')
        //     .addEventListener('click', function() {
              
        //     var fr=new FileReader();
        //     fr.onload=function(){
        //         document.getElementById('outputFile')
        //                 .textContent=fr.result;
        //     }
              
        //     fr.readAsText(this.files[0]);
        // })
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
        FilesTable() {

        }
   }
}
    
</script>

<style>
/* div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

textarea {
  margin-top: 15px;
  width:50% ;
} */

.banner {
  display: inline-block;
  color: aliceblue;
  background: black;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-family: inherit;
  text-decoration: none;
  font-weight: 15px;
  font-size: 1rem;
}
</style>