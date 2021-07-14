<template>
  <nuxt-link class="inline" :class="article.tao_type" :to="urlBilingual" @mouseover.native="onMouseover" @mouseleave.native="onMouseleave">
    <span class="thumbnail-wrap">
    <nuxt-img v-if="article.cover_image && article.cover_image.image" quality="80" width="64" height="64" fit="cover" :src="article.cover_image.image" role="presentation" />
    </span>
    <span class="text" :style="{backgroundColor:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
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
  methods:{
    onMouseover(){
      console.log('mouseenter')
    },
    onMouseleave(){

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
  }
}
</script>

<style lang="less" scoped>
a{
  display: flex;
  .animatemedium(transform);

  .thumbnail-wrap{
    height: 1.33333rem;
  }

  img{
    height: 1.33333rem;
    width: 1.33333rem;
    box-shadow: @shadow-small;
    margin-right: @space-xs;
  }

  
  
  .text{
    border: 1px solid transparent;
    background-color: @white;
    height: 1.33333rem;
    padding:0.37rem 0.4rem 0;
    box-shadow: @shadow-small;
    // margin-left: @space-xs;
    display: inline-block;
    line-height: unset;

    .subheading{
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 15rem;
      overflow:hidden;
      display: block;
      line-height: @lh-xs;
    }

    .animatefast(all);
  }

  &:hover{
    transform: translateY(-2px);
    .text{
      // transform: scale(1.1);
      box-shadow: @shadow-small-hover;
      background-color: @white !important;
      color: @black !important;
      z-index: 9;
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