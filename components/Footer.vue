<template>
  <footer>
    <small class="f-mono spiel" v-if="$store.getters.siteLanguage == 'de'">
      <em>Tiere als Objekte?</em> <span class="mob-hidden">Eine Website des Forschungsprojekts "Tiere als Objekte. Zoologische Gärten und Naturkundemuseum Berlin, 1810 bis 2020"</span>
    </small>
    <small class="f-mono spiel" v-else>
      <em>Animals as Objects?</em> <span class="mob-hidden">A website by the research project "Animals as Objects. Zoological Gardens and Natural History Museum Berlin, 1810 to 2020"</span>
    </small>
    <small class="f-mono">
      <nuxt-link :to="$store.getters.siteLanguage == 'de' ? '/de/datenschutz' : '/datenschutz'">{{$store.getters.siteLanguage == "de" ? 'Datenschutzerklärung' : 'Data privacy policy'}}</nuxt-link> |
      <nuxt-link :to="$store.getters.siteLanguage == 'de' ? '/de/imprint' : '/imprint'">Imprint</nuxt-link>
      </small>
    
    <!-- <icon-button icon="arrow-up" tao_type="material" @click.native="scrollToY(0, 800)"></icon-button> -->
  </footer>
</template>

<script>
export default {
  name:"tao-footer"
}
</script>

<style lang="less" scoped>
footer{
  flex-grow: 1;
  position: relative;
  background-color: @bg;
  display: flex;
  align-items: flex-end;
  // width: calc(100vw - @space-s*2);
  width: 100%;
  justify-content: space-between;
  padding: @space-l @space-s @space-s @space-s;
}
small{
  font-size: @fs-xxs;
  line-height: @lh-short;
}

.spiel{
  max-width: 60%;
}
</style>