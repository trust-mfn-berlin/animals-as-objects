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
  name:'layout-default',
  methods:{
    addCurrentRoute(){
      if(this.$route.params.slug){
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

<style lang="less" scoped>
.layout-container{
  padding-top: 6rem;
}
</style>
