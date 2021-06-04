<template>
  <div class='layout-container'>
    <Navigation />
    
    <Nuxt />

    <Footer />
    
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

</style>
