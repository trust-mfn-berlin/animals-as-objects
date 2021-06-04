<template>
  <div class="route-container">
    <h1 class="f-serif">{{route.title}}</h1>
    <p class="f-serif">{{route.into_text.text_en}}</p>
    <p class="f-mono">{{route.author_bio.author_bio_en}}</p>

    <main>
      <Cascade :articles="articles"/>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    var route = {};
    var articles = [];

    if(payload){
      route = await payload
      return { route }
    } else {
      console.log('no payload, fetching fresh data')
    try {
      const results = await $content('netlify/pathways/' + params.slug).fetch();
      route = results;

      // console.log(results);
      results.articles.forEach(async article => {
        console.log(article.article)
        const a = await $content(article.article).fetch();
        articles.push(a);
      });

    } catch (e) {
      error({ message: e });
    }

    return {
      route, articles
    };
    }
  },
}
</script>