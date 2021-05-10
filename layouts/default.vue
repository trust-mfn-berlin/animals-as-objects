<template>
  <div class='layout-container'>
    <navigation />
    <Nuxt />
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
</style>
