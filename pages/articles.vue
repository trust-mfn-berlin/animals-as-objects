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
    const results = await $content().sortBy('title').fetch();
    var articlesAlphabetical = {};
    var articlesType = {
      theme: [],
      material: [],
      story: []
    };

    results.forEach(article => {
      if(article.archived != true){
        if(article.tao_type == 'material' || article.tao_type == 'theme' || article.tao_type == 'story'){
          const firstLetter = article.title.charAt(0);
          if(!articlesAlphabetical[firstLetter]){
            articlesAlphabetical[firstLetter] = []
            articlesAlphabetical[firstLetter].push(article)
          } else {
            articlesAlphabetical[firstLetter].push(article)
          }
          articlesType[article.tao_type].push(article);
        }
      }
    });

    return {
      articlesAlphabetical, articlesType
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
  created(){
    this.$store.commit('setSiteLanguage', 'en')
    this.$store.commit('setActiveFilter', 'date')
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