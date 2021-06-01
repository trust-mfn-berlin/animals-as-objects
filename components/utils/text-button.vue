<template>
  <nuxt-link :to="linkto" class="text-button f-mono subheading"><slot></slot></nuxt-link>
</template>

<script>
export default {
  name:'text-button',
  props:{
    linkto:{
      type: String,
    },
    text:{
      type: String,
    },
    

  }
}
</script>

<style lang="less" scoped>
.text-button{
  padding: 0.5rem @space-s;
  background-color: @white;
  // border: @border-button;
  box-shadow: @shadow;
  border-radius: @radius-s;

  position: relative;
  
  &:hover{
    box-shadow: @shadow-focus;
  }
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: calc(@radius-s + 1px);
    border: @border-button;
  }
}
</style>