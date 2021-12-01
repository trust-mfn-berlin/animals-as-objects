<template>
  <section id="section-routes" v-if="matchedCuratedRoutes.length > 0">
    <h3 class="f-mono subheading">This page appears in these Curated Routes</h3>  
    <ul>
      <li class="route" v-for="route in matchedCuratedRoutes" :key="route.slug">
        <sidebarCuratedRoute :route="route" />
      </li>
    </ul>
  </section>
</template>

<script>
import sidebarCuratedRoute from './sidebar-curated-route.vue';

export default {
  components: { sidebarCuratedRoute },
  name:'sidebar-curated-routes',
  props:{
    slug:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      matchedCuratedRoutes:[]
    }
  },
  methods:{
    matchCuratedRoutes(link){

      for (let i = 0; i < this.$store.getters.loadedRoutes.length; i++) {
        const storeRoute = this.$store.getters.loadedRoutes[i];
         
        for (let a = 0; a < storeRoute.articles.length; a++) {
          const storeRouteArticle = storeRoute.articles[a].article;

          const s = storeRouteArticle.toLowerCase();
          const l = link.toLowerCase();
          if(s === l){
            this.matchedCuratedRoutes.push(storeRoute);
          }
          
        }
      }
    },
  },
  mounted(){
    this.matchCuratedRoutes(this.slug);
  }
}
</script>

<style lang="less" scoped>
h3{
  margin-bottom: 1rem;
}
.route{
  margin: @space-s 0;
}
</style>