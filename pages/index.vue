<template>
  <div>
    <graph />
    <section>
      <p class="intro f-mono">Animals as Objects? is an online publication produced by the Museum für Naturkunde Berlin and Zoo-Berlin. Learn more about the unique connections between some of Berlin’s most beloved animals by viewing articles: Themes are large topics that contain many Stories, and Materials are focused explorations into these emergent connections.</p>
      <Cascade :articles="articles" />
      <text-button linkto="/articles">View All Articles</text-button>
    </section>

    <section>
      <routes-list :routes="routes" />
      <text-button linkto="/routes">View more routes</text-button>
    </section>

    <timeline />
  </div>
</template>

<script>
import timeline from '../components/graphs/timeline'

export default {
  components:{
    timeline
  },
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

<style lang="less" scoped>
body{
  /* background-color: #F3EEE9; */
}

section{
  background-color: @bg-2;
}

p.intro{
  padding: @space-s;
}
</style>
