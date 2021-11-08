<template>
  <div class="page-container">
    <article-filter />

    <main>
      <section v-show="activeFilter == 'alphabetical'">
      <ol>
        <template v-for="(letter, index) in articlesAlphabetical">
          <h2 :key="index">{{index}}</h2>
          <Inline v-for="article in letter" :key="article.slug" :article="article" />
        </template>
      </ol>
      </section>

      <section v-show="activeFilter == 'author'">
        <div v-for="a in articlesAuthor" :key="a[0].author">
        <h2>{{a[0].author}}</h2>
        <ul>
          <li v-for="article in a" :key="article.slug">
            <Inline :article="article"/>
          </li>
        </ul>
        </div>
      </section>

      <section v-show="activeFilter == 'type'">
      <h2>Thema</h2>
      <ul>
        <li v-for="article in articlesType.theme" :key="article.slug">
          <Inline :article="article"/>
        </li>
      </ul>

      <h2>Story</h2>
      <ul>
        <li v-for="article in articlesType.story" :key="article.slug">
          <Inline :article="article"/>
        </li>
      </ul>

      <h2>Materie</h2>
      <ul>
        <li v-for="article in articlesType.material" :key="article.slug">
          <Inline :article="article"/>
        </li>
      </ul>
      </section>

      <section v-show="activeFilter == 'date'">
        <h2>Zeitstrahl</h2>
        <timeline />
      </section>
    </main>
  </div>
</template>

<script>
import timeline from '@/components/graphs/timeline'

export default {
  components:{
    timeline
  },
  data(){
    return{

    }
  },
  async asyncData({ $content }) {
    const results = await $content().sortBy('title_de').without(['body','body_de']).fetch();
    var articlesAlphabetical = {};
    var articlesType = {
      theme: [],
      material: [],
      story: []
    };
    var articlesAuthor = {};

    results.forEach(article => {
      if(article.archived != true){
        if(article.tao_type == 'material' || article.tao_type == 'theme' || article.tao_type == 'story'){
          // Sort alphabetically
          const firstLetter = article.title_de.charAt(0);
          if(!articlesAlphabetical[firstLetter]){
            articlesAlphabetical[firstLetter] = []
            articlesAlphabetical[firstLetter].push(article)
          } else {
            articlesAlphabetical[firstLetter].push(article)
          }
          // Sort by Type
          articlesType[article.tao_type].push(article);

          // Sort by Author
          if(!articlesAuthor[article.author]){
            articlesAuthor[article.author] = [];
            articlesAuthor[article.author].push(article);
          } else {
            articlesAuthor[article.author].push(article);
          }
        }
      }
    });

    var authorNames = Object.keys(articlesAuthor);
    
    return {
      articlesAlphabetical, articlesType, articlesAuthor, authorNames
    };
  },
  computed:{
    activeFilter(){
      return this.$store.getters.activeFilter
    }
  },
  methods:{
    onUpdateFilter(e){
      console.log(e);
    }
  },
  mounted(){
    this.$store.commit('toggleMobileMenu', false);
  },
  created(){
    this.$store.commit('setSiteLanguage', 'de')
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'de'
      },
      link:[
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Tiere als Objekte? Index'
    };
  },
}
</script>

<style lang="less" scoped>

.page-container{
  padding: 0 @space-s;
}

ul{
  margin:@space-s 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap:@space-s;
}

ol{
  margin:0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap:@space-s;
}

.alphabetical-container{
  h2{
    display: inline-block;
  }
  display: flex;
  flex-wrap: wrap;
  gap:@space-s;
}
</style>