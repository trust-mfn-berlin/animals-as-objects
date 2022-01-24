<template>
  <aside id="themobilemenu" role="navigation">
    <div class="mob-search-outer">
      <Searchbar />
    </div>

    <h2 class="title f-mono">
        <span>{{siteLang == "de" ? 'Tiere' : 'Animals'}}</span><br>
        <span>{{siteLang == "de" ? 'als' : 'as'}}</span><br>
        <span>{{siteLang == "de" ? 'Objekte?' : 'Objects?'}}</span>
    </h2>
    
    <ul class="primary">

      
      <li>
        <text-button :linkto="switchUrlComposed" :isActive="true">{{siteLangSwap}}</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="rootUrl">{{siteLang == "de" ? 'Startseite' : 'Home'}}</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'articles'">Index</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'about'">{{siteLang == "de" ? 'Über uns' : 'About'}}</text-button>
      </li>
      
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'datenschutz'">{{siteLang == "de" ? 'Datenschutzerklärung' : 'Data privacy policy'}}</text-button>
      </li>
      <li>
        <text-button class="primary-nav-item" :linkto="sameUrl + 'imprint'">Imprint</text-button>
      </li>

      
      
    </ul>
    
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
      if(this.$route.fullPath == '/de' || this.$route.fullPath == '/de/') return '/'
      if(this.$route.fullPath.substring(0,4) == '/de/')
      {
        return this.$route.fullPath.replace('/de/', '/');
      } else {
        return '/de' + this.$route.fullPath
      }
    },
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
  padding:calc(44px + @space-m) @space-s @space-s @space-s;
  z-index: @z-mobilemenu;
}

.title{
  margin: 5.5rem 0;
  
  text-align: center;
  // margin: 7rem 0 5rem;
  font-size: 10.5vw;
  line-height: @lh-xs;

  span{
    // color:@bg;
    // background-color: @bg;
    display: inline-block;
    // padding:@space-xs @space-s;
    // border-radius: @radius-l;
  }

  span:nth-of-type(2){
    // background-color: red;
    padding-top: 0;
    border-radius: 0;
  }

}

ul{
  // margin-top:calc(44px + @space-m);
  text-align: center;
  li{

    display: inline-block;
    margin: @space-s @space-xs 0 0;

    // width: 100%;
    // margin-bottom: @space-s;

    

    ::v-deep{
      .text-button{
        // display: block;
        // text-align: center;
      }
    }
  }
}

.mob-search-outer{
  position: fixed;
  top:@space-s;
  left: calc(44px + @space-s*2);
  right: @space-s;
  z-index: 1;
}

.footer-wrap{
  position: absolute;
  bottom:0;
  left:0;
  right:0;
}

</style>