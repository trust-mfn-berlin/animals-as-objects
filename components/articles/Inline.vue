<template>
  <nuxt-link class="inline" :class="article.tao_type" :to="urlBilingual">
    <img :src="'https://loremflickr.com/64/64/butterfly?random=' + article.id" alt="" />
    <span class="text" :style="{backgroundColor:'var(--scheme-'+schemeNumber+'-bg)', color:'var(--scheme-'+schemeNumber+'-fg)'}">
      <span class="f-serif subheading" v-html="alias ? alias : titleBilingual"></span>
    </span>
  </nuxt-link>
</template>

<script>
// can we lazy load thumbnails? or fade in?

export default {
  name:"inline",
  props:{
    article:{
      type:Object,
      required: true
    },
    alias:{
      type:String,
      required: false
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
    schemeNumber(){
      return Math.floor(Math.random() * 15)
    }
  
  }
}
</script>

<style lang="less" scoped>
a{
  display: flex;
  
  img{
    height: 1.33333rem;
    width: 1.33333rem;
  }
  
  .text{
    background-color: @white;
    height: 1.33333rem;
    padding:0.37rem 0.4rem 0;
    box-shadow: @shadow-small;
    margin-left: @space-xs;
    display: inline-block;
    line-height: unset;

    .subheading{
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 15rem;
      overflow:hidden;
      display: block;
    }
  }

  &:hover{
    .text{
      box-shadow: @shadow-small-hover;
    }
  }

  &.theme{

  }

  &.material{
    img{
      border-radius: @radius-max;
    }
    .text{
      border-radius: @radius-max;
    }
  }

  &.story{
    img{
      border-radius: @radius-m;
    }
    .text{
      border-radius: @radius-m;
    }
  }
}
</style>