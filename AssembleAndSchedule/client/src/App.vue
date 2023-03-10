<template>
  <div class="header">
    <HeaderComponent />
    <br>
    <br>
  </div>
  <router-view/>
  <br>
  <FooterComponent />
</template>
<script>
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 300px;
  margin: 30px auto;
  overflow: auto;
  min-height: 200px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #50575b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn-ch-file {
  display: inline-block;
  /* background: rgba(15, 73, 182, 0.847); */
  margin: 5px;
  border-width: 5px;
  border-color: #1f97e1;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
}

.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
.header {
  display: inline-block;
  width: 100%;
  font-weight: bolder;
}

.footer {
  display: inline;
  width: 100%;
  font-weight: bolder;
  /* padding: 50%; */
  margin-top: 100px;
}

</style>
