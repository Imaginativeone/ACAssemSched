<template>
    <header>
      <h1 class="header">DG1 Scheduler</h1>
    </header>
      <div class="container">   
        <ButtonComponent text="Test Button" color="grey" />
        <ButtonComponent text="Fresh Start" color="green"/>
        <ButtonComponent text="Clean-UP" color="blue" />
        <ButtonComponent text=" Batch/Bin " color="red" />
        <ButtonComponent text=" Save Completed File" color="magenta" />
        <ButtonComponent text=" Resort " color="orange" />
    </div>
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
      name: 'DG1View',
      props: {
        file: String,
      },
      components: { ButtonComponent, SimpleUpload },
    }
  </script>
  
  <style>
  
  </style>