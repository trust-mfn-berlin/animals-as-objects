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
  mounted(){
    if(this.$cookies.get('tao-uid') && !this.$store.getters.isTrackingEnabled){
      console.log('cookie present');
      // this.enableTracking();
      this.$store.commit('enableTracking');

      // console.log('added route', this.$route.params.slug);
      this.$store.commit('addRoute', this.$route.params.slug);
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