<template>
  <footer>
    <small class="f-mono">Animals as Objects: a project by the Museum für Naturkunde and Zoo Berlin</small>
    <small class="f-mono"><nuxt-link to='/datenschutz'>Datenschutz</nuxt-link> <nuxt-link to='/imprint'>Imprint</nuxt-link></small>
    
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
  display: flex;
  align-items: flex-end;
  width: calc(100vw - @space-s*2);
  justify-content: space-between;
  padding: @space-s;
  margin-top:@space-l;
}
small{
  font-size: @fs-xxs;
  line-height: @lh-short;
}
</style>