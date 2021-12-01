<template>
  <ol>
    <li v-for="i in 18" :key="i" :style="{backgroundColor:'var(--scheme-'+(i-1)+'-bg)', color:'var(--scheme-'+(i-1)+'-fg)'}">Colour Scheme #{{i-1}}</li>
  </ol>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  li{
    padding: @space-l;
    width: 25%;
    height: 15rem;
  }
  ol{
    display: flex;
    flex-wrap: wrap;
  }
</style>