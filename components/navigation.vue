<template>
  <header>
  <nav aria-label="Main">
    <ul class="primary">
      <li>
        <text-button class="primary-nav-item" :linkto="rootUrl">Animals as Objects?</text-button>
      </li>
      
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'articles'">Index</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'about'">About</text-button>
      </li>
      <li>
        <text-button :linkto="switchUrlComposed">{{siteLangSwap}}</text-button>
      </li>
      <li>
        <Searchbar />
      </li>
    </ul>
    <transition name="fade">
      <li v-if="showSidebarToggle">
        <icon-button 
          @click.native="toggleSidebar"
          :icon="toggleIcon"
          :tao_type="this.$store.getters.articleTaoType"
          :aria-haspopup="isSidebarOpen"
          :useColourScheme="this.$store.getters.isSidebarOpen"
        >{{toggleButtonText}}</icon-button>
      </li>
    </transition>
    
  </nav>
  </header>
</template>

<script>

export default {
  name:'navigation',
  props:{
    showSidebarToggle:{
      type: Boolean
    }
  },
  computed:{
    toggleIcon(){
      if(this.$store.getters.isSidebarOpen){
        return "arrow-right"
      } else {
        return "i"
      }
    },
    toggleButtonText(){
      if(this.$store.getters.isSidebarOpen){
        return "Hide Sidebar"
      } else {
        return "Open Sidebar"
      }
    },
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
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
    sameUrl(){
      if(this.siteLang == 'de' ){
        return '/de/'
      } else {
        return '/'
      }
    },
    switchUrlComposed(){
      if(this.$route.fullPath.substring(0,4) == '/de/')
      {
        return this.$route.fullPath.replace('/de/', '/');
      } else {
        return '/de' + this.$route.fullPath
      }
    }
  },
  methods:{
    toggleSidebar(){
      
      if(this.$store.getters.isSidebarOpen != true){
        this.$store.commit('toggleSidebar', true)
      } else {
        this.$store.commit('toggleSidebar', false)
      }

      // console.log(this.$store.getters.isSidebarOpen)
    }
  }
  
}
</script>

<style lang="less" scoped>

header{
  // margin-bottom: 8rem;
}

nav{
  position: fixed;
  top:@space-s;
  left:@space-s;
  width: calc(100% - @space-s*2);
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