<template>
  <div>
    <pathway v-for="(path, index) in pathways" :key="index" :data="path"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const results = await $content('netlify', 'pathways').fetch();
    var pathways = []
    results.forEach(pathway => {
      pathways.push(pathway);
    });

    return {
      pathways,
    };
  },
}
</script>