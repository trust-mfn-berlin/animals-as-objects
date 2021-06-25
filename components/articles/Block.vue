<template>
  <article class="block" :class="article.tao_type">
    <nuxt-link :to="'/'+article.slug">
    <img :src="'https://loremflickr.com/600/600/butterfly?random=' + article.id" />
    <div class="text" :style="{backgroundColor:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <h2 class="f-serif">{{article.title}}</h2>
      <p class="f-serif description" v-if="article.tao_type != 'material'">In biology, taxonomy is a formal system to name, define, and classify organisms, regulated and governed by agreed upon rules. Since its beginning biological taxonomy was neither stable nor universal, since controversies emerged, and classifications continue to change still today.</p>
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
}
</script>

<style lang="less" scoped>
article{
  height: 12rem;
  a{
    display: flex;
    height: 100%;
  }

  img{
    height: 100%;
    width: 12rem;
    // filter:grayscale(0.9);
    // z-index: -1;
  }

  .text{
    margin-left:-3.5rem;
    background-color: @white;
    width: 100%;
    box-shadow: @shadow;
    padding: @space-l;

    .animatepop(transform);

    h2{
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p{
      margin-top: @space-s;
      max-width: calc(30vw - 4rem);
    }

    &:hover{
      transform: scale(1.15);
    }
  }

  &.material{
    img{
      border-radius: 500px;
    }

    .text{
      width: 12rem;
      text-align: center;
      border-radius: 500px;
      display: flex;
      align-items: center;
      flex-direction: row;

      h2{
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
    img{
      border-radius: @radius-l;
    }
    .text{
      border-radius: @radius-l;
    }
  }
}
</style>