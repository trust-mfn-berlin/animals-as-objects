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
    async getRoutes(){
      const res = await this.$axios.get('');
      console.log(res);
      var sortedRoutes = res.data.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

      console.log(sortedRoutes);
      this.$store.commit('setRoutes', sortedRoutes)
    }
  },
  mounted(){
    if(this.$cookies.get('tao-uid') && !this.$store.getters.isTrackingEnabled){

      console.log('cookie present');
      this.$store.commit('enableTracking');

      this.getRoutes('',{uniqueid:this.$cookies.get('tao-uid')});

      if(this.$route.params.slug){
        this.$store.commit('addRoute', {route:this.$route.params.slug});
      }
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
