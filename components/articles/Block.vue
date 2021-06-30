<template>
  <article class="block" :class="article.tao_type">
    <nuxt-link :to="urlBilingual">
    <figure v-if="article.cover_image">
      <nuxt-img quality="80" width="600" height="600" fit="cover" :src="article.cover_image.image" :alt="article.cover_image.alt" />
    </figure>

    <figure v-else>
      <img :src="'https://loremflickr.com/600/600/leaf?random=' + article.id" />
    </figure>

    <div class="text" :style="{backgroundColor:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <hgroup>
        <h2 class="f-serif">{{titleBilingual}}</h2>
        <h3 class="f-mono caption" 
          v-if="article.tao_type == 'material' && article.date_start || article.date_end">
          <span v-if="article.date_start">{{article.date_start | formatDateYear}}</span>
          <span v-if="article.date_start && article.date_end">–</span>
          <span v-if="article.date_end">{{article.date_end | formatDateYear}}</span>
        </h3>
      </hgroup>
      <div class="description-wrap">
        <p class="f-serif description" v-if="article.tao_type != 'material' && article.desc">{{descBilingual}}</p>
      </div>
    </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  name:"block",
  props:{
    article:{
      type:Object,
      required: true
    }
  },
  data(){
    return{

    }
  },
  computed:{
    urlBilingual(){
      if(this.$store.getters.siteLanguage == 'de'){
        return '/de/' + this.article.slug
      } else {
        return '/' + this.article.slug
      }
    },
    titleBilingual(){
      if(this.$store.getters.siteLanguage == 'de' && this.article.title_de){
        return this.article.title_de
      } else {
        return this.article.title
      }
    },
    descBilingual(){
      if(this.$store.getters.siteLanguage == 'de' && this.article.desc_de){
        return this.article.desc_de
      } else {
        return this.article.desc
      }
    },
  }
}
</script>

<style lang="less" scoped>
article{
  height: 12rem;
  a{
    display: flex;
    height: 100%;
  }

  figure{
    height: 100%;
    width: 12rem;
    min-width: 12rem;
    max-width: 12rem;
    overflow: hidden; 
    flex-grow: 1;
    img{
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }

  figure + .text {
    margin-left:-3.5rem;
  }

  .text{
    background-color: @white;
    width: 100%;
    box-shadow: @shadow;
    padding: @space-l;
    display: inline-block;

    .animatepop(transform);

    hgroup{
      max-width: 100%;
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

    .description-wrap{
      margin-top: @space-s;
      display: flex;
    }

    p.description{
      max-height: 7rem;
      flex-grow: 1;
      width: 0;
    }

    &:hover{
      transform: scale(1.15);
    }
  }

  &.material{
    figure{
      border-radius: 500px;
    }

    .text{
      width: 12rem;
      text-align: center;
      border-radius: 500px;
      display: flex;
      align-items: center;
      flex-direction: row;

      hgroup{
        margin: auto;
      }
    }
  }

  &.theme , &.story{

    .text{
      min-width: calc(30vw - 1rem);
      max-width: 1000px;
      flex-grow: 1;
    }
  }

  &.story{
    figure{
      border-radius: @radius-l;
    }
    .text{
      border-radius: @radius-l;
    }
  }
}
</style>