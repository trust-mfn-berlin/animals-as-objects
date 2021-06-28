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
    async matchRoutes(){

        for (let i = 0; i < this.currentRoute.length; i++) {
          const storeRouteSingle = this.currentRoute[i].route;


          if(storeRouteSingle){

            // console.log(storeRouteSingle)

            const article = await this.$content(storeRouteSingle).only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme']).fetch()
            .catch((err) => {
              console.warn('page not found', err)
            })
            
            // console.log(article);
            if(article){
              this.matchedRoutes.push(article)
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