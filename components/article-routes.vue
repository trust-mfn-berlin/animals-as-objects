<template>
  <div class="article-routes">
    <h3>Your current route</h3>
    <your-current-route :routes="matchedRoutes" :max="9"/>
    <h3>Least visited from here</h3>
    <h3>Most visited from here</h3>
  </div>
</template>

<script>
export default {
name:'article-routes',
  props:{
    routes:{
      type: Array,
      required: true
    }
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
.article-routes{
  margin-top:5rem;
}
</style>