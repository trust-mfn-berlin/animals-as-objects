<template>
  <div>
    <!-- <graph /> -->
    <section>
      <Cascade :articles="articles" />
      <text-button linkto="/articles">View All Articles</text-button>
    </section>

    <section>
      <routes-list :routes="routes" />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const results = await $content().fetch();
    const routes = await $content('/netlify/pathways').fetch();
    // console.log(routes);
    var articles = [];
    const max = 5;
    var t = 0;
    var m = 0;
    var s = 0;
    
    results.forEach(article => {
      if(article.tao_type == "theme" && t < max){
        articles.push(article);
        t++
      } else 
      if(article.tao_type == "material" && m < max){
        articles.push(article);
        m++
      } else
      if(article.tao_type == "story" && s < max){
        articles.push(article);
        s++
      }
    });

    return {
      articles, routes
    };
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  mounted(){
    document.documentElement.style.setProperty("--selection-bg", "#ccc");
  },
  head() {
    return {
      // script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>

<style>

</style>
