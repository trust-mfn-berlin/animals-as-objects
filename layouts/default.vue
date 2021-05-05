<template>
  <div class='layout-container'>
    <nav><nuxt-link to="/">Home</nuxt-link></nav>
    <Nuxt />
    <pathway />
  </div>
</template>

<script>
export default {
  watch:{
    $route (to, from){
      // console.log(to.path);        
    }
  },
}
</script>

<style>
.layout-container{
  padding-top:3rem;
}

nav{
  position: fixed;
  background-color: #ccc;
  padding:1rem;
  top:0;
  left:0;
}
</style>
