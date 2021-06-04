<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <section class="heading">
    <h1 :style="{boxShadow:'inset 0 -0.175em var(--background-1), inset 0 -0.2em var(--scheme-'+schemeNumber+'-bg)'}">{{article.title}}</h1>
    <h3 class="lead subheading f-mono">
      <span class="type" :class="article.tao_type" :style="{backgroundColor:'var(--scheme-'+schemeNumber+'-bg)', color:'var(--scheme-'+schemeNumber+'-fg)'}">{{article.tao_type}}</span>
      Lorem ipsum dolor sit amet
    </h3>
    </section>
    <section>
    <nuxt-content :document="article" />
    </section>    
  </main>
  <sidebar :article="article"/>
  </div>
</template>

<script>

export default {
  name:'article-page',
  layout:'article',
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
  },
  mounted(){
    this.$store.commit('addPathway', this.$route.params.slug)
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
.article-container{

}

main{
  counter-reset: footnote; 
  width: 60%;
  margin: 0 auto;
  &.open{
    margin: 0;
  }
}

::v-deep sup::after{
  counter-increment: footnote +1;
  content:counter(footnote);
}

section.heading{
  text-align: center;
}

h1{
  margin-bottom: 1rem;
  line-height: @lh-short;

  background-size: 1px 1em;
  // box-shadow:
  //   inset 0 -0.175em @bg,
  //   inset 0 -0.2em #000;
  display: inline;

  text-shadow:
    -2px -2px @bg,
    -2px 2px @bg,
    2px -2px @bg,
    2px 2px @bg;
}

p{
  line-height: @lh-long;
}

img{
  max-width: 100%;
  margin: 0 auto;
  display: block;
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

</style>