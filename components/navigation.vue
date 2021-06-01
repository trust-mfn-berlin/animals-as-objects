<template>
  <nav aria-label="Main">
    <ul>
      <li>
        <text-button :linkto="rootUrl">Animals as Objects?</text-button>
      </li>
      <li class="flex-spacer"></li>
      <li>
        <text-button :linkto="rootUrl">Search</text-button>
      </li>
      <li>
        <text-button linkto="/index">Index</text-button>
      </li>
      <li>
        <text-button linkto="/about">About</text-button>
      </li>
      <li>
        <text-button :linkto="switchUrlComposed">{{siteLangSwap}}</text-button>
      </li>
    </ul>
  </nav>
</template>

<script>
import textButton from './utils/text-button.vue'
export default {
  components: { textButton },
  name:'navigation',
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
    siteLangSwap(){
      if(this.siteLang == 'en' ){
        return 'Deutsch'
      } else {
        return 'English'
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

<style lang="less" scoped>

nav{
  position: fixed;
  top:@space-s;
  left:@space-s;
  width: calc(100% - @space-s*2);
  z-index: @z-nav;

  li{
    list-style-type: none;
  }

  ul{
    margin: 0;
    padding: 0;
    display: flex;
    gap: @space-xs;

  }
}
</style>