<template>
  <div v-if="page">
    <main>
    <section class="current-route">
      <h2>Your current route</h2>
      <your-current-route :routes="matchedRoutes" :max="9"/>
      <small class="f-mono caption">This is your current route through the content. Don’t worry, all information is anonymous.</small>
    </section>
    <section class="routes-intro">
      <h2>Curated Routes</h2>
      <nuxt-content :document="page"/>
    </section>
    <section class="routes">
      <curated-routes-list :routes="routes" />
    </section>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    var page = {};
    var routes = [];
    try {
      page = await $content('netlify', 'route_intro_de').fetch();
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
main{

}

section{ 
  padding: 0 @space-s;
  h2{
    margin: 1rem 0;
  }
}

section.current-route{
  margin-bottom: 4rem;
}

section.routes-intro{
  width: 60vw;

  p{
    line-height: @lh-long;
  }
}

section.routes{
  padding :@space-s;
  background-color: @bg-2;
}

</style>