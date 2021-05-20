<template>
  <div>
    <map-component />
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
  created(){
    this.$store.commit('setSiteLanguage', 'en')
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
