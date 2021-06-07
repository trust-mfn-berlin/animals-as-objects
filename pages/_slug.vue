<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <hgroup class="heading">
      <h1 :style="{boxShadow:'inset 0 -0.175em var(--background-1), inset 0 -0.2em var(--scheme-'+schemeNumber+'-bg)'}">{{article.title}}</h1>
      <h3 class="lead subheading f-mono">
        <span class="type" :class="article.tao_type" :style="{backgroundColor:'var(--scheme-'+schemeNumber+'-bg)', color:'var(--scheme-'+schemeNumber+'-fg)'}">{{article.tao_type}}</span>
        Lorem ipsum dolor sit amet
      </h3>
    </hgroup>

    <section>
      <nuxt-content :document="article" :class="article.tao_type" />
    </section>    
  </main>
  <sidebar :article="article" :footnotes="footnotes"/>
  </div>
</template>

<script>

export default {
  name:'article-page',
  layout:'article',
  data(){
    return{
      footnotes:""
    }
  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },
    schemeNumber(){
      return Math.floor(Math.random() * 15)
    }
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
    this.$store.commit('setArticleTaoType', this.article.tao_type);

  },
  mounted(){
    this.$store.commit('addPathway', this.$route.params.slug);

    document.documentElement.style.setProperty("--current-scheme-bg", "var(--scheme-"+this.schemeNumber+"-bg)");
    document.documentElement.style.setProperty("--current-scheme-fg", "var(--scheme-"+this.schemeNumber+"-fg)");

    if(document.getElementsByClassName('footnotes')[0]){
      this.footnotes = document.getElementsByClassName('footnotes')[0].innerHTML;
    }
    // document.getElementsByClassName('footnotes')[0].remove()
  },
  async asyncData({ $content, params, error, payload }) {
    var article = {};

    // console.log(payload);

    if(payload){
      article = await payload
      // console.log('PAYLOAD', article);
      return { article }
    } else {
      console.log('no payload, fetching fresh data')
    try {
      const data = await $content(params.slug).fetch();
      article = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      article,
    };
    }
  },
};
</script>

<style lang="less" scoped>

// Vars

@article-width:60vw;

// Primary Layout

.article-container{

}

main{
  width: @article-width;
  margin: 0 auto;
  &.open{
    margin: 0;
  }
}

// Typography

hgroup.heading{
  text-align: center;

  h1{
    margin-bottom: 1rem;
    line-height: @lh-short;

    background-size: 1px 1em;
    display: inline;

    // text-shadow:
    //   -2px -2px @bg,
    //   -2px 2px @bg,
    //   2px -2px @bg,
    //   2px 2px @bg;
  }

  .lead.subheading{
  text-align: center;
  margin:2rem 0 3rem;

    .type{
      background-color: @black;
      color: @white;
      padding:@space-xs 10px;
      &.theme{

      }
      &.material{
        border-radius: @radius-max;
      }
      &.story{
        border-radius: @radius-s;
      }
    }

  }
}

p{
  line-height: @lh-long;
}

// Footnotes

.nuxt-content{
  &.story{
    a.footnote-ref{
      border-radius: @radius-m;
    } 
  }

  &.theme{

  }

  &.material{
    a.footnote-ref{
      border-radius: @radius-max;
    }
  }

  .footnotes{
    display: none;
  }
}

sup{

  display: inline-block;
  margin: 0 @space-xs;
  font-family: @f-mono;
  top:-@space-xs;
  
  a.footnote-ref{
    background-color: @white;
    padding: 0.4rem 0.5rem 0.3rem;
    font-size: @fs-s;
    box-shadow: @shadow-small;

    &:hover{
      box-shadow: @shadow-small-hover;
    }
  }

}

// Images

figure{
  margin: 5rem auto;
  max-width: 100%;
  width: fit-content;

  img{
    max-width: @article-width;
    max-height: 800px;
  }

  p{
    width: max-content;
    margin: 0;
    line-height: 1;
  }

  figcaption{
    // max-width: max-content;
    margin-top:@space-s;
    display: flex;
    p{
      flex-grow: 1;
      width: 0;
    }
  }
}

// Audio

.audio-container{
  display: block;
  width: 50%;
  margin: 5rem auto;
}

// Video

iframe{
  display: block;
  width: 100%;
  min-height: 20rem;
  margin: 5rem auto;
}




</style>