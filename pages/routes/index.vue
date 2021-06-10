<template>
  <div v-if="page">
    <section>
      <h2>Curated Routes</h2>
      <nuxt-content :document="page"/>
    </section>
    <section>
      <routes-list :routes="routes" />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    var page = {};
    var routes = [];
    try {
      page = await $content('netlify', 'route_intro_en').fetch();
      routes = await $content('netlify/pathways').fetch();
    } catch (e) {
      error({ message: e });
    }
    return {
      page, routes
    };
  }
}
</script>

<style lang="less" scoped>

</style>