<template>
  <article class="block" :class="article.tao_type">
    <nuxt-link :to="urlBilingual">
    <figure v-if="article.cover_image && article.cover_image.image">
      <img width="600" height="600" :src="article.cover_image.image.replace('/images/','/thumbnails/l/')" :alt="article.cover_image.alt ? article.cover_image.alt : ''" />
    </figure>

    <div class="text" :style="{backgroundColor:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <hgroup>
        <h2 class="f-serif">{{titleBilingual}}</h2>
        <h3 class="f-mono caption" 
          v-if="article.tao_type == 'material' && article.date_start || article.tao_type == 'material' && article.date_end">
          <span v-if="article.date_start">{{article.date_start | formatDateYear}}</span>
          <span v-if="article.date_start && article.date_end">–</span>
          <span v-if="article.date_end">{{isToday}}</span>
        </h3>

      </hgroup>
      <div class="description-wrap">
        <p class="f-serif description" v-if="article.tao_type != 'material' && article.desc" :class="{long:descIsLong}">{{descBilingual}}</p>
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
    isToday(){
      const endDate = this.$options.filters.formatDateYear(this.article.date_end)
      if(endDate == '2021' || endDate == 2021 || endDate == '2022' || endDate == 2022 || endDate == '2023' || endDate == 2023){
        if(this.$store.getters.siteLanguage == 'de'){
          return "Heute"
        } else {
          return "Today"
        }
      } else {
        return endDate
      }
    },
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
    descIsLong(){
      // console.log(this.descBilingual.length);
      if(this.descBilingual.length > 380){
        return true
      } else {
        return false
      }
    }
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
    overflow-y: hidden;

    // .animatepop(transform);
    .animatefast(all);

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
      // line-height: @lh-default;
      // overflow-y:hidden;
      // text-overflow: ellipsis;
      &.long{
        font-size: @fs-xxs;
        line-height: 1.65;
      }
    }

    
  }

  &:hover{
    .text{
    transform: scale(1.05);
    // transform: translateY(-5px);
    background-color: @white !important;
    color: @black !important;
    box-shadow: @shadow-hover;
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
      max-width: 750px;
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

  @media screen and (max-width: @mq-s) /* Mobile */ {
    height: 50vw;
    figure{
      width: 50vw;
      min-width: 50vw;
      max-width: 50vw;
    }

    &.material{
      .text{
        width: calc(50vw + 3.5rem - @space-s*2);  
      } 
    }
      

    &.theme , &.story{
      height: auto;
      width: 100%;

      a{
        flex-direction: column;
      }

      figure{
        width: 100%;
        max-width: 100%;
        min-width: none;
        height: calc(50vw + 1rem);

        img{
          object-fit: cover;
          object-position: center;
        }
      }

      figure + .text {
        margin-left:0;
        margin-top: -3rem;
      }

      .text{
        width: 100%;
        max-width: 100%;
        min-width: 100%;

        .description-wrap{
          p.description{
            max-height: none;
            font-size: @fs-s;
            margin-bottom: 0;
          }
        }
      }
    }

  }
}
</style>