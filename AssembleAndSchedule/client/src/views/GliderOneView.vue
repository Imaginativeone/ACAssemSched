<template>
    <header>
      <h1 class="header">Glider1 Scheduler</h1>
    </header>
      <div class="container">   
        <ButtonComponent text="Test Button" color="grey"/>
        <ButtonComponent text="Fresh Start" color="green"/>
        <ButtonComponent text=" Clean-UP" color="blue" />
        <ButtonComponent text=" Batch/Bin " color="red" />
        <ButtonComponent text=" Save Completed File" color="magenta" />
        <ButtonComponent text=" Resort " color="orange" />
    </div>
    <!-- Upload file -->
    <div class="section">
      <div class="container">
        <simple-upload />
      </div>
    </div>
  </template>
  
  <script>
  import ButtonComponent from '../components/ButtonComponent'
  import SimpleUpload from '../components/SimpleUpload.vue'
  
    export default {
    components: { ButtonComponent, SimpleUpload },
      name: 'GliderOneView',
      props: {
        file: String,
      },
    }
      
  </script>
  
  <style>
  
  </style>