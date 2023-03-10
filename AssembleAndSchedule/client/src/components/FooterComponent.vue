<template>
  <footer>
  <h1 class="footer">Select An Option To Continue </h1>
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
  background: black;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-family: inherit;
  text-decoration: none;
  font-weight: 15px;
  font-size: 1rem;
  ;
}



</style>
