<template>
  <div>
    <graph />
    <section>
      <p class="intro f-mono">Animals as Objects? is an online publication produced by the Museum für Naturkunde Berlin and Zoo-Berlin. Learn more about the unique connections between some of Berlin’s most beloved animals by viewing articles: <span class="theme">Themes</span> are large topics that contain many <span class="story">Stories</span>, and <span class="material">Materials</span> are focused explorations into these emergent connections.</p>
      <Cascade :articles="articles" />
      <text-button linkto="/articles">View All Articles</text-button>
    </section>

    <section>
      <h2>Curated routes</h2>
      <curated-routes-list :routes="routes" />
      <text-button linkto="/routes">View more routes</text-button>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content().without(['body', 'body_de']).fetch();
    const routes = await $content('/netlify/pathways').fetch();
    // console.log(routes);
    var articles = [];

    const max = 6;
    var t = [];
    var m = [];
    var s = [];
    
    content.forEach(article => {
      if(article.archived != true){
        if(article.tao_type == "theme"){
          t.push(article);
        } else 
        if(article.tao_type == "material"){
          m.push(article);
        } else
        if(article.tao_type == "story"){
          s.push(article);
        }
      }
    });

    for (let index = 0; index < max; index++) {
      const rngT = Math.floor(Math.random() * (t.length -1))
      const randomTheme = t[rngT]
      articles.push(randomTheme)

      const rngM = Math.floor(Math.random() * (m.length -1))
      const randomMaterial = m[rngM]
      articles.push(randomMaterial)

      const rngS = Math.floor(Math.random() * (s.length -1))
      const randomStory = s[rngS]
      articles.push(randomStory)
    }

    var currentIndex = articles.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [articles[currentIndex], articles[randomIndex]] = [
        articles[randomIndex], articles[currentIndex]];
    }

    return {
      articles, routes
    };
  },
  methods:{
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
  padding:@space-s;
  margin-bottom: 2rem;
}

p.intro{
  margin-bottom: 1rem;

  span::before{
    content:'';
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    background-color: @black;
    margin-right: @space-xs;
  }
  span.material::before{
    border-radius: @radius-max;
  }
  span.story::before{
    border-radius: @radius-s;
  }
}

</style>
