<template>
  <nuxt-link :to="'/routes/' + route.slug" class="curated-route">
    <h4 class="subheading">{{titleBilingual}}</h4>
    <div class="thumbnail-wrapper" v-for="(article, index) in fetchedArticles" :key="index" :class="article.tao_type" >
      <nuxt-img  
        v-if="article.cover_image && article.cover_image.image" 
        
        width="64" height="64" :src="article.cover_image.image"
        
      ></nuxt-img>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name:'sidebar-curated-route',
  props:{
    route:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
      fetchedArticles:[]
    }
  },
  computed:{
    titleBilingual(){
      if(this.$store.getters.siteLanguage == 'de' && this.route.title_de){
        return this.route.title_de
      } else {
        return this.route.title
      }
    }
  },
  methods:{
    async fetchArticle(slug){
      const article = await this.$content(slug).only(['cover_image','tao_type','colour_scheme']).fetch()
      return article
    },
    async fetchArticles(){
      for (let i = 0; i < this.route.articles.length; i++) {
        const a = this.route.articles[i].article;
        // console.log(this.fetchArticle(a));   
        const fa = await this.fetchArticle(a);
        if(fa.cover_image){
          this.fetchedArticles.push(fa)
        }     
      }
    }
  },
  mounted(){
    this.fetchArticles();
  }
}
</script>

<style lang="less" scoped>
.curated-route{

    // border: 1px solid black;
    // padding: 0.4rem 0.5rem;
    // background-color: @white;
    // box-shadow: @shadow;

    width: fit-content;
  
    display: flex;
    align-items: center;
    max-width: 100%;
    // overflow-x: hidden;
    // overflow-y: auto;

    .animatefast(all);

    &:hover{
      // transform: translateY(-2px);
      h4{
        box-shadow: @shadow-hover;
      }
    }
  
    h4{
      .animatefast(all);
      white-space: nowrap;
      margin-right: @space-xs;
      height: 1.3333rem;
      background-color: @white;
      padding: 0.35rem 0.4rem;
      box-shadow: @shadow;
    }

    .thumbnail-wrapper{
      height: 1.33333rem;
      width:  1.33333rem;
      background-color: @black;
      margin-right: @space-xs;
      overflow:hidden;

      &.story{
        border-radius: @radius-s;
      }

      &.material{
        border-radius: @radius-max;
      }
    }

    img{
      opacity: 0.97;
      height: 1.33333rem;
      width: 1.33333rem;

      
    }

    
  
}
</style>