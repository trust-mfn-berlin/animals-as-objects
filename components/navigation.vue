<template>
  <header>
  <nav aria-label="Main">
    <ul class="secondary">
      <li>
        <text-button :linkto="rootUrl">Animals as Objects?</text-button>
      </li>
    </ul>
    <ul class="primary" :class="{open : isSearchBarOpen}">
      <li :class="{open : isSearchBarOpen}">
        <Searchbar />
      </li>
      <li>
        <text-button linkto="/articles">Index</text-button>
      </li>
      <li>
        <text-button linkto="/about">About</text-button>
      </li>
      <li>
        <text-button :linkto="switchUrlComposed">{{siteLangSwap}}</text-button>
      </li>
    </ul>
  </nav>
  </header>
</template>

<script>

export default {
  name:'navigation',
  computed:{
    isSearchBarOpen(){
      return this.$store.getters.isSearchBarOpen
    },
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

header{
  margin-bottom: 8rem;
}

nav{
  position: fixed;
  top:@space-s;
  left:@space-s;
  width: calc(100vw - @space-s*2);
  z-index: @z-nav;
  gap: @space-xs;

  display: flex;
  justify-content: space-between;

  pointer-events: none;

  li{
    list-style-type: none;
    pointer-events: all;
  }

  ul{
    margin: 0;
    padding: 0;
    display: flex;
    gap: @space-xs;

  }


}

.open{
  flex-grow: 1;
}
</style>