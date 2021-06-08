<template>
  <article>
    <nuxt-link class="text" :to="'/routes/'+route.slug">
      <h2 class="f-serif">{{route.title}}</h2>
    </nuxt-link>
    <div class="route-images" >
      <img 
        v-for="article in route.articles" 
        :key="article.article"
        :src="'https://loremflickr.com/600/600/butterfly?random=' + article.article"
        :class="getFromStore(article.article).tao_type"
      />
      
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
  methods:{
    getFromStore(article){
      for (let i = 0; i < this.$store.getters.loadedArticles.length; i++) {
        const storePage = this.$store.getters.loadedArticles[i];
        const s = storePage.slug.toLowerCase();
        const l = article.toLowerCase();
        if(s === l){
          return storePage;
        }
      }
    }
  }
 
}
</script>

<style lang="less" scoped>
article{
  height: 12rem;
  display: flex;

  a{
    display: flex;
    height: 100%;
  }

  .text{
    // margin-left:-3.5rem;
    background-color: @white;
    width: 12rem;
    height: 12rem;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: row;
    box-shadow: @shadow;
    padding: @space-l;

    z-index: 9;
  
    .animatepop(all);

    h2{
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: auto;
    }

    p{
      margin-top: @space-s;
      max-width: calc(30vw - 4rem);
    }

    &:hover{
      transform: scale(1.15);
    }
  }

  .route-images{
    height: 12rem;
    img{
      height: 12rem;
      margin-left: -3.5rem;
      // z-index: -1;
      &:hover{
        z-index: 99;
      }
      &.story{
        border-radius: @radius-l;
      }
      &.material{
        border-radius: 600px;
      }
      
    }
  }

  
}
</style>