<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <h1>{{article.title}}</h1 >
    <nuxt-content :document="article" />    
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

img{
  max-width: 100%;
}
</style>