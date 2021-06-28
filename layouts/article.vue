<template>
  <div class='layout-container'>
    <Navigation :showSidebarToggle="true" />

    <div class="citation-modal-wrapper" v-if="this.$store.getters.isCitationModal.isOpen">
      <citation-modal  :article="this.$store.getters.isCitationModal.article"/>
    </div>

    <Nuxt />

    <Footer />

    <cookie-bar />
    
  </div>
</template>

<script>
export default {
  computed:{
    trackingEnabled(){
      this.$store.getters.isTrackingEnabled;
    }
  },
  methods:{
    async getRoutes(){
      const res = await this.$axios.get('');
      console.log(res);
      var sortedRoutes = res.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

      console.log(sortedRoutes);
      this.$store.commit('setRoutes', sortedRoutes)
      // console.log('test');
    }
  },
  mounted(){
    if(this.$cookies.get('tao-uid') && !this.$store.getters.isTrackingEnabled){
      console.log('cookie present');
      // this.enableTracking();
      this.$store.commit('enableTracking');

      const getObject = {
        uniqueid: this.$cookies.get('tao-uid')
      }

      this.getRoutes('', JSON.stringify(getObject));

    

      // console.log('added route', this.$route.params.slug);
      if(this.$route.params.slug){
        this.$store.commit('addRoute', {route:this.$route.params.slug});
      }
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
</style>