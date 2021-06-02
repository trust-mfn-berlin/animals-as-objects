<template>
  <article :class="article.tao_type">
    <nuxt-link :to="'/'+article.slug">
    <img src='https://via.placeholder.com/300' />
    <div class="text">
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

  img{
    height: 100%;
  }

  .text{
    margin-left:-3.5rem;
    background-color: @white;
    width: 100%;
    box-shadow: @shadow;
    padding: @space-l;

    transition: 100ms transform cubic-bezier(1,1.76,.52,.92);

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