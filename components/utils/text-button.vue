<template>
  <nuxt-link :to="linkto" class="text-button f-mono subheading"><slot></slot></nuxt-link>
</template>

<script>
export default {
  name:'text-button',
  props:{
    linkto:{
      type: String,
      required: true
    },
    text:{
      type: String,
    },
    

  }
}
</script>

<style lang="less" scoped>
.text-button{
  display: block;
  padding: 0.625rem 0.8rem 0.7rem;
  background-color: @white;
  box-shadow: @shadow;
  border-radius: @radius-s;
  width: auto;
  position: relative;
  
  &:hover{
    box-shadow: @shadow-hover;
  }

  &:hover:after{
    border: @border-button-focus
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

  &:focus{
    box-shadow: @shadow-focus;
  }

  &:focus:after{
    border: @border-button-focus
  }
}
</style>