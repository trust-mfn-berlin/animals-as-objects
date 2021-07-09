<template>
  <header>
  <nav aria-label="Main">
    <transition name="fade">
    <li class="mob-only" v-if="mobileMenuToggleVisible">
      <icon-button 
        @click.native="toggleMobileMenu"
        :icon="toggleMobileMenuIcon"
        :tao_type="this.$store.getters.articleTaoType"
        :aria-haspopup="isMobileMenuOpen"
      ></icon-button>
    </li>
    </transition>

    <div class="flex-spacer mob-only" aria-hidden="true" ></div>

    <ul class="primary mob-hidden">
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
      <li v-if="sidebarToggleVisible">
        <icon-button 
          @click.native="toggleSidebar"
          :icon="toggleSidebarIcon"
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
    sidebarToggleVisible(){
      if (this.showSidebarToggle && !this.$store.getters.isMobileMenuOpen){
        return true
      } else {
        return false
      }
    },
    toggleSidebarIcon(){
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
    toggleMobileMenuIcon(){
      if(this.$store.getters.isMobileMenuOpen){
        return "close"
      } else {
        return "ham"
      }
    },
    mobileMenuToggleVisible(){
      if (!this.$store.getters.isSidebarOpen){
        return true
      } else {
        return false
      }
    },
    isMobileMenuOpen(){
      return this.$store.getters.isMobileMenuOpen
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
    toggleMobileMenu(){
      if(this.$store.getters.isMobileMenuOpen != true){
        this.$store.commit('toggleMobileMenu', true)
      } else {
        this.$store.commit('toggleMobileMenu', false)
      }
      
    },
    toggleSidebar(){
      
      if(this.$store.getters.isSidebarOpen != true){
        this.$store.commit('toggleSidebar', true)
      } else {
        this.$store.commit('toggleSidebar', false)
      }

      console.log('Sidebar is open', this.$store.getters.isSidebarOpen)
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
  gap: @space-xs;

  display: flex;
  justify-content: space-between;

  pointer-events: none;

  // set height so that searchbar results don't expand hittable area
  height: 2rem;
  min-height: 44px;

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

.flex-spacer{
  flex-grow: 1;
}

.open{
  flex-grow: 1;
}
</style>