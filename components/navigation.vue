<template>
  <nav>
    <nuxt-link :to="rootUrl">Home</nuxt-link>
    <nuxt-link :to="switchUrlComposed">{{siteLangSwap}}</nuxt-link>
  </nav>
</template>

<script>
export default {
  name:'navigation',
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
    switchUrl(){
      if(this.siteLang == 'en' ){
        return '/de/'
      } else {
        return '/'
      }
    },
    switchUrlComposed(){
      // const url = this.$route.fullPath == '/' || this.$route.fullPath == '/de/' ? null : this.$route.params.slug
      // const url = this.$route.params.slug ? this.$route.params.slug : 

        if(this.$route.params.slug){
          return this.switchUrl + this.$route.params.slug
        } else {
          return this.switchUrl + this.$route.fullPath.replace(this.rootUrl, '')
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