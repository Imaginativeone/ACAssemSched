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

  <!-- Upload file -->
  <div class="section">
  <div> 

   <CleanUp />
  
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
import CleanUp from '../components/CleanUp.vue'
// import Dropzone from '../components/DropZone.vue'

// import FileReader from '@/components/FileReader.vue'
// import CleanUp from '@/components/CleanUp.vue'
// import SaveCompletedFile from '@/components/SaveCompletedFile.vue'
// import FreshStart from '@/components/FreshStart.vue'
// import ReSort from '@/components/ReSort.vue'
// import reader from 'readline'

  export default {
    components: { ButtonComponent, SimpleUpload, CleanUp /* Dropzone */ },
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
          console.log('This should display an excel file of sorted data');
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
        }

      
    }
  }
    
</script>

<style>

</style>