<template>
  <div>
    <graph />
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
body{
  background-color: #F3EEE9;
}
</style>
