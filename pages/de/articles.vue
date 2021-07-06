<template>
  <div class="page-container">
    <article-filter />

    <main>
      <section v-show="activeFilter == 'alphabetical'">
      <ol>
        <template v-for="(letter, index) in articlesAlphabetical">
          <h2 :key="index">{{index}}</h2>
          <Inline v-for="article in letter" :key="article.id" :article="article" />
        </template>
      </ol>
      </section>

      <section v-show="activeFilter == 'type'">
      <h2>Theme</h2>
      <ul>
        <li v-for="article in articlesType.theme" :key="article.id">
          <Inline :article="article"/>
        </li>
      </ul>

      <h2>Story</h2>
      <ul>
        <li v-for="article in articlesType.story" :key="article.id">
          <Inline :article="article"/>
        </li>
      </ul>

      <h2>Material</h2>
      <ul>
        <li v-for="article in articlesType.material" :key="article.id">
          <Inline :article="article"/>
        </li>
      </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  async asyncData({ $content }) {
    const results = await $content().sortBy('title_de').fetch();
    var articlesAlphabetical = {};
    var articlesType = {
      theme: [],
      material: [],
      story: []
    };

    results.forEach(article => {
      if(article.tao_type == 'material' || article.tao_type == 'theme' || article.tao_type == 'story'){
        const firstLetter = article.title_de.charAt(0);
        if(!articlesAlphabetical[firstLetter]){
          articlesAlphabetical[firstLetter] = []
          articlesAlphabetical[firstLetter].push(article)
        } else {
          articlesAlphabetical[firstLetter].push(article)
        }
        articlesType[article.tao_type].push(article);
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
    this.$store.commit('setSiteLanguage', 'de')
  },
}
</script>

<style lang="less" scoped>

.page-container{
  padding: 0 @space-s;
}

ul, ol{
  margin:@space-s 0 2rem;
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