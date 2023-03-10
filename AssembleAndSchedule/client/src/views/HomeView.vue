<template>
  <div class="container">
    <div>
      <router-link to="/PictureWindow" class="pw">Picture Window</router-link>
      <router-link to="/Casement" class="casement" > Casement </router-link>
      <!-- <ButtonComponent text="Casement" color="blue" /> -->
      <router-link to="/DB1" class="db"> DB1 </router-link>
      <!-- <ButtonComponent text=" DB1 " color="red" /> -->
      <router-link to="/DB2" class="db"> DB2 </router-link>
      <!-- <ButtonComponent text=" DB2 " color="red" /> -->
      <router-link to="/DG1" class="dg"> DG1 </router-link>
      <!-- <ButtonComponent text=" DG1 " color="orange" /> -->
      <router-link to="/DG2" class="dg"> DG2 </router-link>
      <!-- <ButtonComponent text=" DG2 " color="orange" /> -->
      <router-link to="/DG3" class="dg"> DG3 </router-link>
      <!-- <ButtonComponent text=" DG3 " color="orange" /> -->
      <router-link to="/GliderOne" class="glider"> Glider1 </router-link>
      <!-- <ButtonComponent text=" Glider1 " color="black" /> -->
      <router-link to="/GliderTwo" class="glider" > Glider2 </router-link>
      <!-- <ButtonComponent text=" Test " color="green" /> -->
    </div>
  </div>
</template>

<script>
// import ButtonComponent from '../components/ButtonComponent'
// import CasementView from './CasementView.vue';
// import PictureWindowView from '../views/PictureWindowView'
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
<style>
.pw {
  display: inline-block;
  color: aliceblue;
  border: none;
  background-color: seagreen;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font: 15px;
  font-family: inherit;

}
.casement {
  display: inline-block;
  color: aliceblue;
  border: none;
  background-color: blue;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font: 15px;
  font-family: inherit;
}
.db {
  display: inline-block;
  color: aliceblue;
  border: none;
  background-color: orange;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font: 15px;
  font-family: inherit;
}
.dg{
  display: inline-block;
  color: aliceblue;
  border: none;
  background-color: orangered ;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font: 15px;
  font-family: inherit;
}
.glider {
  display: inline-block;
  color: aliceblue;
  border: none;
  background-color: grey;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font: 15px;
  font-family: inherit;
}



</style>