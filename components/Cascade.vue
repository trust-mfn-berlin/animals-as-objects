<template>
  <div class="cascade-container">
    <ul>
      <li v-for="article of articles" :key="article.id">
        <Block :article="article"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cascade",
  props:{
    articles:{
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.cascade-container{
  ul{
    display: flex;
    flex-wrap: wrap;
    gap: @space-s;
  }
}
</style>