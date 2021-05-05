<template>
  <nav>
    <nuxt-link :to="rootUrl">Home</nuxt-link>
    <nuxt-link :to="swapUrl + $route.params.slug">{{siteLangSwap}}</nuxt-link>
  </nav>
</template>

<script>
export default {
  name:'nav',
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
    siteLangSwap(){
      if(this.siteLang == 'en' ){
        return 'de'
      } else {
        return 'en'
      }
    },
    rootUrl(){
      if(this.siteLang == 'en' ){
        return '/'
      } else {
        return '/de/'
      }
    },
    swapUrl(){
      if(this.siteLang == 'en' ){
        return '/de/'
      } else {
        return '/'
      }
    }
  }
  
}
</script>

<style scoped>
nav{
  position: fixed;
  background-color: #ccc;
  padding:1rem;
  top:0;
  left:0;
}
</style>