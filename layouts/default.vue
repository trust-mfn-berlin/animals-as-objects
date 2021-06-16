<template>
  <div class='layout-container'>
    <Navigation />
    
    <Nuxt />

    <Footer />

    <cookie-bar />
    
  </div>
</template>

<script>
export default {
  computed:{

  },
  methods:{

  },
  mounted(){
    if(this.$cookies.get('tao-uid') && !this.$store.getters.isTrackingEnabled){
      console.log('cookie present');
      // this.enableTracking();
      this.$store.commit('enableTracking');

      console.log('added route', this.$route.params.slug);
    }
  },
  watch:{
    $route (to, from){
      // console.log(to.path);        
    }
  },
}
</script>

<style>

</style>
