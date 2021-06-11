<template>
  <div >
    ..
  </div>
</template>

<script>
// import wikilink from '@/components/base/wikilink'
// export default {
//   name:'page',
//   components:{
//     wikilink
//   },
//   created(){
//     this.$store.commit('setSiteLanguage', 'de')
//   },
//   async asyncData({ $content, params, error, payload }) {
//     var page = {};

//     // console.log(payload);

//     if(payload){
//       page = await payload
//       // console.log('PAYLOAD', page);
//       return { page }
//     } else {
//       console.log('no payload, fetching fresh data')
//     try {
//       const data = await $content(params.slug).fetch();
//       page = data;
//     } catch (e) {
//       error({ message: e });
//     }

//     return {
//       page,
//     };
//     }
//   },
//   head() {
//     return {
//       htmlAttrs: {
//         lang: 'de'
//       },
//     };
//   },
// };
</script>

<style scoped>
</style>