<template>
  <header>
    <!-- <h1 class="header1">Assemble and Schedule</h1> -->
    <router-link class="header" to="/">Assemble and Schedule</router-link>
  </header>
</template>

<script>

export default {
  name: 'HeaderComponent',
  props: {
    title: String,
  },
  components: {   
         
}

}
</script>

<style>
.header1 {
  display: grid;
  color: aliceblue;
  background: rgb(80, 150, 231);
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-family: inherit;
  text-decoration: none;
  font-weight: 15px;
  font-size: 1rem;
}

</style>
