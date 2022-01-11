<template>
  <div class="page-container">
    <article-filter />

    <main>
      <section v-show="activeFilter == 'alphabetical'">
      <ol>
        <template v-for="(letter, index) in articlesAlphabetical">
          <h2 :key="index">{{letter[0]}}</h2>
          <Inline v-for="article in letter[1]" :key="article.slug" :article="article" />
        </template>
      </ol>
      </section>

      <section v-show="activeFilter == 'author'">
        <div v-for="a in authorsSorted" :key="a[0]">
        <ol>
        <h2>{{a[0]}}</h2>
          <li v-for="article in a[1]" :key="article.slug">
            <Inline :article="article"/>
          </li>
        </ol>
        </div>
      </section>

      <section v-show="activeFilter == 'type'">
      <h2>Theme</h2>
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

      <h2>Material</h2>
      <ul>
        <li v-for="article in articlesType.material" :key="article.slug">
          <Inline :article="article"/>
        </li>
      </ul>
      </section>

      <section v-show="activeFilter == 'date'">
        <h2>Timeline</h2>
        <timeline />
      </section>
    </main>
  </div>
</template>

<script>
import timeline from '../components/graphs/timeline'

export default {
  components:{
    timeline
  },
  data(){
    return{

    }
  },
  async asyncData({ $content }) {

    const results = await $content().sortBy('title').only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme', 'cover_image', 'archived', 'author']).fetch();
    var az = {};
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
          const regex = /[^a-z]/gi;
          // Get First letter
          var firstLetter = article.title.charAt(0);

          // Check if first letter is a non-alphabet char
          if(firstLetter.match(regex)){
            firstLetter = article.title.charAt(1);
            if(firstLetter.match(regex)){
              firstLetter = article.title.charAt(2);
            }
          }

          if(!az[firstLetter]){
            az[firstLetter] = []
            az[firstLetter].push(article)
          } else {
            az[firstLetter].push(article)
          }
          // Sort by Type
          articlesType[article.tao_type].push(article);

          // Sort by Author

          // Split off Lastname for later
          article.authorLastname = article.author.split(' ')[1];

          if(!articlesAuthor[article.author]){
            articlesAuthor[article.author] = [];
            articlesAuthor[article.author].push(article);
          } else {
            articlesAuthor[article.author].push(article);
          }
        }
      }
    });

    var articlesAlphabetical = Object.entries(az);
    articlesAlphabetical.sort((a, b) => (a[0] > b[0] ? 1 : -1));


    var authorsSorted = Object.entries(articlesAuthor);
    authorsSorted.sort((a, b) => (a[1][0].authorLastname > b[1][0].authorLastname ? 1 : -1));
    
    return {
      articlesAlphabetical, articlesType, authorsSorted
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
    this.$store.commit('setSiteLanguage', 'en')
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'en'
      },
      link:[
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Animals as Objects? Index'
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