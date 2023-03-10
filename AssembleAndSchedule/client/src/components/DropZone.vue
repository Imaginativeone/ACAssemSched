<template> 
    <form @submit.prevent="uploadFile" enctype="multypart/form-data">
      <div v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-sucess'}`"
        >
        <div class="message-body">{{ message }}</div>
      </div>

      <div class="dropzone">
        <input
            type="file"
            class="input-field"
        />

        <p v-if="!uploading" class="call-to-action"> Drag your files here </p>
        <p v-if="uploading" class="progress-bar"></p>
            
      </div>
    
    </form>
</template>

<script>


import axios from 'axios'

export default {
  name: "DropZone",

  data(){
    return{
      file: "",
      message: "",
      error: false,
      uploading: false
    }
  },
  methods: {
    selectFile(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },

    async sendFile(){
      const formData = new FormData();
      formData.append('file', this.file);
      JSON.stringify(formData);
      // const file = ' ';

      try {

        await axios.post('/dropzone', formData);
        
        // console.log(JSON.stringify(formData));
        console.log('FormData Contents----->',formData);

        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
      } catch (err){
        this.message = err.respsonse.data.error;
        this.error = true;
      }
    
    },

    async uploadFile(){
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/uploadedFiles', formData);
        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
      } catch (err) {
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
  }
}
</script>

