<template>
  <div class="license text-links quote f-mono">
    <template v-if="siteLang == 'de'">
      <p v-if="license == 'CC BY-SA'">Dieser Text ist lizensiert unter einer Creative Commons Attribution-ShareAlike 4.0 International Lizenz <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">(CC BY-SA 4.0)</a>. Abweichende Angaben zu Bildrechten stehen in den Bildunterschriften.</p>
      <p v-if="license == 'CC BY-NC-SA'">Dieser Text ist lizensiert unter einer Creative Commons Attribution-NonCommercial-ShareAlike 4.0 Lizenz <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de">(CC BY-NC-SA 4.0)</a>. Abweichende Angaben zu Bildrechten stehen in den Bildunterschriften.</p>
    </template>
    <template v-else>
      <p v-if="license == 'CC BY-SA'">This text is licensed under a Creative Commons Attribution-ShareAlike 4.0 International license <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">(CC BY-SA 4.0)</a>. Differing information about image rights is noted in the captions.</p>
      <p v-if="license == 'CC BY-NC-SA'">This text is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 license <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">(CC BY-NC-SA 4.0)</a>. Differing information about image rights is noted in the captions.</p>
    </template>
  </div>
</template>

<script>
export default {
  name:'article-license',
  props:{
    license:{
      type:String,
      required: true
    }
  },
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
  },
}
</script>

<style lang="less" scoped>
div.license{
  margin: 3rem 0;
  p{
    a{
      white-space: nowrap !important;
    }
  }
}
</style>