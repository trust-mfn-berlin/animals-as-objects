<template>
  <div>
    <ul>
    <li v-for="page of pages" :key="page.slug">
      <Nuxt-link :to="'/de/'+ page.slug" class="article-link">
      <h3>{{ page.title_de }}</h3>
      <p>{{ page.slug }}</p>
      <p>{{ page.tao_type }}</p>
      </Nuxt-link>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const results = await $content().sortBy('tao_type').fetch();
    var pages = []
    results.forEach(page => {
      pages.push(page);
    });

    return {
      pages,
    };
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>

<style>

</style>
