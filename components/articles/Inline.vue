<template>
  <nuxt-link class="inline" :class="article.tao_type" :to="urlBilingual">
    <img src='https://via.placeholder.com/32' />
    <div class="text">
      <h6 class="f-serif subheading">{{titleBilingual}}</h6>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name:"inline",
  props:{
    article:{
      type:Object,
      required: true
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
    }
  }
}
</script>

<style lang="less" scoped>
a{
  display: flex;
  
  img{
    height: 1.33333rem;
  }
  
  .text{
    background-color: @white;
    height: 1.33333rem;
    padding:0.37rem 0.4rem 0;
    box-shadow: @shadow-small;
    margin-left: @space-xs;
    
    h6{
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 15rem;
      overflow:hidden;
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