<template>
  <footer>
    <small class="f-mono">Animals as Objects: a project by the Museum für Naturkunde and Zoo Berlin</small>
    <icon-button icon="arrow-up" tao_type="material"></icon-button>
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
}
small{
  font-size: @fs-xxs;
  line-height: @lh-short;
}
</style>