<template>
  <article class="block" :class="article.tao_type">
    <nuxt-link :to="'/'+article.slug">
    <figure>
      <nuxt-img v-if="article.cover_image" quality="80" width="600" height="600" fit="cover" :src="article.cover_image.image" :alt="article.cover_image.alt" />
      <img v-else :src="'https://loremflickr.com/600/600/leaf?random=' + article.id" />
    </figure>

    <div class="text" :style="{backgroundColor:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <hgroup>
        <h2 class="f-serif">{{article.title}}</h2>
        <h3 class="f-mono caption" 
          v-if="article.tao_type == 'material' && article.date_start || article.date_end">
          <span v-if="article.date_start">
            {{article.date_start}}
          </span>
          <span v-if="article.date_start && article.date_end">–</span>
          <span v-if="article.date_end">
            {{article.date_start}}
          </span>
        </h3>
      </hgroup>
      <p class="f-serif description" v-if="article.tao_type != 'material' && article.desc">{{article.desc}}</p>
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

  .text{
    margin-left:-3.5rem;
    background-color: @white;
    width: 100%;
    box-shadow: @shadow;
    padding: @space-l;

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

    p.description{
      margin-top: @space-s;
      max-width: calc(30vw - 4rem);
      max-height: 7rem;
      overflow: hidden;
      text-overflow: ellipsis;
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