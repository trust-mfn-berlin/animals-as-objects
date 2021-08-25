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
    async getRoutes(){

      var uid = this.$cookies.get('tao-uid');

      const getObject = {
        uniqueid: uid
      };

      try {
        const res = await this.$axios.get('', {params: {uniqueid: uid}})

        console.log(res);
        var sortedRoutes = res.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

        console.log(sortedRoutes);
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