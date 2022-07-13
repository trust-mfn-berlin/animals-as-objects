<template>
  <div class='layout-container'>
    <Navigation :showSidebarToggle="true" />

    <transition name="slideleft">
      <mobile-menu v-if="this.$store.getters.isMobileMenuOpen" />
    </transition>

    <div class="citation-modal-wrapper" v-if="this.$store.getters.isCitationModal.isOpen">
      <citation-modal  :article="this.$store.getters.isCitationModal.article"/>
    </div>

    <Nuxt @click.native="closeSearchBar"/>

    <Footer @click.native="closeSearchBar"/>

    <cookie-bar />
    
  </div>
</template>

<script>
export default {
  name:'article-layout',
  computed:{
    trackingEnabled(){
      this.$store.getters.isTrackingEnabled;
    }
  },
  methods:{
    closeSearchBar(){
      if(this.$store.getters.isSearchbarOpen){
        this.$store.commit('toggleSearchBar', false);
      }
    },
    addCurrentRoute(){
      if(this.$route.params.slug){
        if(this.$route.params.slug == this.$store.getters.currentRouteLastPage){
          return
        }
        this.$store.commit('addRoute', {route:this.$route.params.slug});
      }
    },

    async getCommonRoutes(){

      this.$store.commit('setMostCommonRoutes', []);
      this.$store.commit('setLeastCommonRoutes', []);
      
      try{
        const res = await this.$axios.get(`/common?route=${this.$route.params.slug}`);

        if(res.data.followingRoutes){

        
        var sortedRoutes = res.data.followingRoutes.sort((a, b) => (a.count > b.count) ? 1 : -1);
        
        const length = sortedRoutes.length;
        const pool = 2;

        // console.log('common routes sorted',sortedRoutes);
        // console.log('least', sortedRoutes.slice(0, pool));
        // console.log('most', sortedRoutes.slice(length-pool, sortedRoutes.length));

        var most, least;


        if(length > 6){
          most = sortedRoutes.slice(length-pool, sortedRoutes.length);
          least = sortedRoutes.slice(0, pool);
        } else if (length >= 2) {
          most = [sortedRoutes[sortedRoutes.length-1]];
          least = [sortedRoutes[0]];
        } else {
          most = [];
          least = [];
        }

        this.$store.commit('setMostCommonRoutes', most);
        this.$store.commit('setLeastCommonRoutes', least);
        // console.log('common routes', res)
        }
      }
      catch (error) {
        console.log(error)
      }

    },

    async getPrevRoutes(){

      console.log('getting prev routes')

      var uid = this.$cookies.get('tao-uid');


      try {
        const res = await this.$axios.get(`?uniqueId=${uid}`);

        var sortedRoutes = res.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

        this.$store.commit('setRoutes', sortedRoutes);

        this.addCurrentRoute();
      }
      catch (error) {
        console.log(error)
      }
      
      
    }
  },
  mounted(){
    if(this.$cookies.get('tao-uid') && !this.$store.getters.isTrackingEnabled){
      // console.log('cookie present');
      this.$store.commit('enableTracking');
      this.getPrevRoutes();
      this.getCommonRoutes();

      if(window._paq){
        window._paq.push(['setConsentGiven', 24]);
      } else {
        console.warn('Matomo not available');
      }


    }
  },
  watch:{
    $route(){
      this.getCommonRoutes();
    }
  }

  
}
</script>

<style lang='less'>
.citation-modal-wrapper{
  background-color: rgba(0,0,0,0.2);
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: @z-modal;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    min-height: unset;
    display:block;
  }
}
</style>