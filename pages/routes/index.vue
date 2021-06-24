<template>
  <div v-if="page">
    <section>
      <h2>Your current route</h2>
      <your-current-route :routes="matchedRoutes" :max="9"/>
    </section>
    <section>
      <h2>Curated Routes</h2>
      <nuxt-content :document="page"/>
    </section>
    <section>
      <routes-list :routes="routes" />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    var page = {};
    var routes = [];
    try {
      page = await $content('netlify', 'route_intro_en').fetch();
      routes = await $content('netlify/pathways').fetch();
      
    } catch (e) {
      error({ message: e });
    }
    return {
      page, routes
    };
  },
  data(){
    return{
      matchedRoutes:[]
    }
  },
  computed:{
    storeArticles(){
      return this.$store.getters.loadedArticles;
    },
    currentRoute(){
      return this.$store.getters.currentRoute;
    },
  },
  methods:{
    matchRoutes(){

      for (let i = 0; i < this.currentRoute.length; i++) {
        const storeRouteSingle = this.currentRoute[i];
         
        for (let a = 0; a < this.storeArticles.length; a++) {
          const storeArticle = this.storeArticles[a];

          const s = storeArticle.slug.toLowerCase();
          const l = storeRouteSingle.toLowerCase();
          if(s === l){
            this.matchedRoutes.push(storeArticle);
          }
          
        }
      }
    },
  },
  mounted(){
    this.matchRoutes();
  }
}
</script>

<style lang="less" scoped>

</style>