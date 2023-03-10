<template>

    <div class="container">
      <div>
        <h1 class="header"> Picture Window </h1>
        <ButtonComponent text="Clean-UP" color="orange" />
        <ButtonComponent text=" Save Completed File" color="red" />
        <ButtonComponent text=" Resort " color="blue" />
      </div>
    </div>
    
    <!-- Upload file -->
    <div class="section">
      <div class="container">
        <simple-upload />
      </div>
    </div>
  </template>

  <script>
    import ButtonComponent from '../components/ButtonComponent.vue'
    import SimpleUpload from '../components/SimpleUpload.vue'
    
    export default {
      name: 'PictureWindowView',
      components: {
        ButtonComponent, SimpleUpload
      }
    }

  </script>