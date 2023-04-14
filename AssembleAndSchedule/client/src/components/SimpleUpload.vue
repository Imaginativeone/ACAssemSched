<template> 
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <div v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-sucess'}`"
        >
        <div class="message-body">{{ message }}</div>
      </div>


       <div class="btn-ch-file">

        <div class="file is-boxed is-secondary">
          <label class="file-label">
            <input
              type="file"
              ref="file"
              @change="selectFile"
              class="file-input"
              />
          
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file ...
                </span>
              </span> 
              <span v-if="file" class="file-name">{{file.name }} </span>
          </label>

        </div>
       </div>

       <div class="field">
        <button class="button is-info">Upload File</button>
       </div>
    
    </form>
</template>

<script>

import axios from 'axios'

export default {
  name: "SimpleUpload",
  
  props: [],

  data(){
    return{
      file: "",
      message: "",
      error: false
    }
  },
  methods: {
    async selectFile(){
      const file = this.$refs.file.files[0];
      const allowedTypes = ["text/csv", "text/xls", "text/xlsm", "text/xlsx", "text/plain", "image/gif", "image/png", "image/jpeg"];
      const MAX_SIZE = 20000000;
      const tooLarge = file.size > MAX_SIZE;

      if(allowedTypes.includes(file.type) && !tooLarge){ 
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message =  tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb`: " Only CVS or Excel files allowed";
      }
      const formData = new FormData();
      formData.append('file', this.file);
      JSON.stringify(this.file);
    },

    async sendFile(){
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/uploadedFiles', formData)
        this.message = "File has been uploaded!";
        this.file = "";
        this.error = false;
      } catch (err){
        this.message = err.respsonse.data.error;
        this.error = true;
      }    
    },
    
    async saveFile(){
        if(this.file){
          try{
            await axios.post('/savedFiles', this.file)
            this.newFile = this.file;
            this.message = this.file ? "File has been uploaded" : "Try Again";
            console.log('This is the saved file', this.newFile);
          }catch(err){
            this.message = !this.file? "File Not Chosen" : "Choose a csv file to upload";
            this.error = true;
          }
        } 
    },
    showFileContents(){
      // This function might not be useful since we're now using Handsontables
          let input = document.querySelector('input');
          let textArea = document.querySelector('textarea');
          
          input.addEventListener('input', () => {
            let files = input.files;

            if(files.length == 0) return;

            const file = this.file[0];

            let reader = new FileReader();

            reader.onload = (e) => {
              const file = e.target.result;
              const lines = file.split(/\r\n|\n/);
              textArea.value = lines.join('\n')
            };

            reader.onerror = (e) => alert(e.target.name);

            reader.readAsText(file);
          })
        },
  }
}
</script>

