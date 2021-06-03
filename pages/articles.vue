<template>
  <div>
    <article-filter />

    <main>
      <template v-if="activeFilter == 'alphabetical'">
      <ul>
        <li v-for="article in articlesAlphabetical" :key="article.id">
          <Inline :article="article" />
        </li>
      </ul>
      </template>

      <template v-if="activeFilter == 'type'">
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
      </template>
    </main>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeFilter:"type"
    }
  },
  async asyncData({ $content }) {
    const results = await $content().sortBy('title').fetch();
    var articlesAlphabetical = [];
    var articlesType = {
      theme: [],
      material: [],
      story: []
    };

    results.forEach(article => {
      if(article.tao_type){
        articlesAlphabetical.push(article);
        articlesType[article.tao_type].push(article);
      }
    });

    return {
      articlesAlphabetical, articlesType
    };
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
}
</script>

<style lang="less" scoped>
main{
  margin-top:1rem;
}
ul{
  display: flex;
  flex-wrap: wrap;
  gap:@space-s;
}
</style>