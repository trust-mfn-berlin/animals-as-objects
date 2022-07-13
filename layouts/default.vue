<template>
  <div class='layout-container'>
    <Navigation />

    <transition name="slideleft">
      <mobile-menu v-if="this.$store.getters.isMobileMenuOpen" />
    </transition>
    
    <Nuxt @click.native="closeSearchBar"/>

    <Footer @click.native="closeSearchBar"/>

    <cookie-bar />
    
  </div>
</template>

<script>
export default {
  name:'layout-default',
  methods:{
    closeSearchBar(){
      if(this.$store.getters.isSearchbarOpen){
        this.$store.commit('toggleSearchBar', false);
      }
    },
    addCurrentRoute(){
      if(this.$route.params.slug){
        if(this.$route.name == 'routes-slug'){
          return
        }
        this.$store.commit('addRoute', {route:this.$route.params.slug});
      }
    },
    async getRoutes(){

      var uid = this.$cookies.get('tao-uid');

      const getObject = {
        uniqueid: uid
      };

      // CAN WE JUST STORE ROUTES ON LOCALSTORAGE AND ONLY 'GET' ROUTE RELATIONSHIPS from SERVER?

      try {
        const res = await this.$axios.get('', {params: {uniqueId: uid}})

        // console.log(res);
        var sortedRoutes = res.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

        // console.log(sortedRoutes);
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
      console.log('cookie present');
      this.$store.commit('enableTracking');
      this.getRoutes();

      if(window._paq){
        window._paq.push(['setConsentGiven', 24]);
      } else {
        console.warn('Matomo not available');
      }

    }
  }
}
</script>

<style lang="less" scoped>
.layout-container{
  padding-top: 6rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    min-height: unset;
    display:block;
  }
}
</style>
