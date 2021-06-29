<template>
  <nuxt-link 
    :to="linkto" 
    :aria-disabled="isDisabled"
    :active="isActive"
    :class="{active : isActive, disabled : isDisabled}"
    class="text-button f-mono subheading"
  >
    <slot></slot>
  </nuxt-link>
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
    isDisabled:{
      type: Boolean,
      default: false
    },
    isActive:{
      type: Boolean,
    }

  }
}
</script>

<style lang="less" scoped>
.text-button{
  display: inline-block;
  padding: 0.625rem 0.8rem 0.7rem;
  background-color: @white;
  box-shadow: @shadow;
  border-radius: @radius-s;
  width: auto;
  position: relative;
  height: 2rem;

  .animatemedium(all);
  
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

  &.disabled{
    background-color: @bg;
    &::after{
      cursor: default;
    }
    &:hover{
      box-shadow: @shadow;
      &::after{
        border: @border-button;
      }
    }
    &:focus{
      box-shadow: @shadow;
      &::after{
        border: @border-button;
      }
    }
  }




  &.active, &.primary-nav-item.nuxt-link-exact-active{
    background-color: @black;
    color:@white;

    &::after{
      border-color: @black;
    }
  }
  
}
</style>