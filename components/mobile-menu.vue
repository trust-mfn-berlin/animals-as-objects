<template>
  <aside id="themobilemenu" role="navigation">
    
    <ul class="primary">
      <li>
        <Searchbar />
      </li>

      <li>
        <h2 class="title f-mono">Animals as Objects?</h2>
      </li>
      
      <li>
        <text-button class="primary-nav-item" :linkto="rootUrl">Home</text-button>
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
        <text-button class="primary-nav-item" :linkto="sameUrl + 'datenschutz'">Datenschutz</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'imprint'">Imprint</text-button>
      </li>
      
    </ul>

    <!-- <your-current-route :max="5" /> -->

    <div class="footer-wrap">
      <Footer />
    </div>
    
  </aside>
</template>

<script>
export default {
  name:'mobile-menu',
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
  }

}
</script>

<style lang="less" scoped>
#themobilemenu{
  width: 100%;
  position: fixed;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  background-color: @white;
  overflow-x: hidden;
  overflow-y: auto;
  padding:@space-s;
  z-index: @z-mobilemenu;
}

ul{
  li{

    h2{
      text-align: center;
      margin: 5rem 1rem;
      // margin: 7rem 0 5rem;
      font-size: 10.5vw;
      line-height: @lh-xs;
    }
    width: 100%;
    margin-bottom: @space-s;

    &:first-of-type{
      padding-left: calc(44px + @space-s);
    }

    ::v-deep{
      .text-button{
        display: block;
        text-align: center;
      }
    }
  }
}

.footer-wrap{
  position: absolute;
  bottom:0;
  left:0;
  right:0;
}

</style>