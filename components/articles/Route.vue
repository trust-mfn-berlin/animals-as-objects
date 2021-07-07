<template>
  <article>
    <nuxt-link class="text" :to="urlBilingual">
      <hgroup>
        <h2 class="f-serif">{{titleBilingual}}</h2>
        <h3 class="f-mono caption">{{route.author}}</h3>
      </hgroup>
    </nuxt-link>
    <div class="route-images" >
      <figure 
        v-for="(article, i) in articles" 
        :key="i" 
        :style="{zIndex : 100-i, backgroundColor :'var(--scheme-' + article.colour_scheme + '-bg)'}"
        :class="article.tao_type"
      >
        <nuxt-img 
          quality="80" width="600" height="600" fit="cover"
          :src="article.cover_image.image"
          :alt="article.cover_image.alt"
        />
      </figure>
      
    </div>
  </article>
</template>

<script>
export default {
  name:'route-big',
  props:{
    route:{
      type:Object,
      required: true
    }
  },
  data(){
    return{
      nodeId: '',
      articles: []
    }
  },
  computed:{
    urlBilingual(){
      if(this.$store.getters.siteLanguage == 'de'){
        return '/de/routes/' + this.route.slug
      } else {
        return '/routes/' + this.route.slug
      }
    },
    titleBilingual(){
      if(this.$store.getters.siteLanguage == 'de' && this.route.title_de){
        return this.route.title_de
      } else {
        return this.route.title
      }
    },

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
          this.articles.push(fa)
        }     
      }
    }
  },
  mounted(){
    this.fetchArticles()
  }
 
}
</script>

<style lang="less" scoped>
article{
  height: 12rem;
  display: flex;

  .text{
    height: 100%;
    display: flex;
    background-color: @white;
    width: 12rem;
    height: 12rem;
    min-width: 12rem;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: row;
    box-shadow: @shadow;
    padding: @space-l;

    z-index: 101;
  
    // .animatepop(all);
    .animatefast(all);

    hgroup{
      max-width: 100%;
      margin:0 auto;
    }
    h2{
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h3{
      margin-top:@space-xs;
      transform: translateY(0.4rem);
    }
    

    p{
      margin-top: @space-s;
      max-width: calc(30vw - 4rem);
    }

    &:hover{
      transform: scale(1.05);
      box-shadow: @shadow-hover;    
    }
  }

  .route-images{
    height: 12rem;
    display: flex;
    flex-wrap: nowrap;

    figure{
      height: 12rem;
      width: 12rem;
      margin-left: -3.5rem;
      overflow: hidden;
      box-shadow: @shadow;
      &.story{
        border-radius: @radius-l;
      }
      &.material{
        border-radius: 600px;
      }
    }
    img{
      height: 12rem;
      width: 12rem;
      &:hover{
        // z-index: 99;
        // transform: scale(1.2);
      }
      
      
    }
  }

  
}
</style>