<template>
  <footer>
  <!-- <h1 class="footer">Select An Option To Continue </h1> -->
  <router-link class="footer" to="/">Assemble and Schedule</router-link>
  </footer>
</template>

<script>

export default {
  name: 'FooterComponent',
  props: {
    title: String,
  },
  components: {   
         
}

}
</script>

<style>
.footer {
  display: inline-block;
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
