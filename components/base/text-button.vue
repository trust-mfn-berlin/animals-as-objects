<template>
  <span>

  <a v-if="type == 'anchor'" class="text-button f-mono subheading" :href="linkto" :class="{active : isActive, disabled : isDisabled}">
    <slot></slot>
  </a>

  <button v-else-if="type == 'button'" class="text-button f-mono subheading" :class="{active : isActive, disabled : isDisabled}">
    <slot></slot>
  </button>

  <nuxt-link 
    v-else
    :to="linkto" 
    :aria-disabled="isDisabled"
    :active="isActive"
    :class="{active : isActive, disabled : isDisabled}"
    class="text-button f-mono subheading"
  >
    <slot></slot>
  </nuxt-link>

  
  </span>
</template>

<script>
export default {
  name:'text-button',
  props:{
    type:{
      type: String,
      required: false
    },
    linkto:{
      type: String,
      required: false
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
  color: @black;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    min-height: 44px;
    padding: 0.72rem 0.8rem 0.7rem;
  }

  .animatemedium(all);

  &.subheading{
    line-height: @lh-xs;
  }
  
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

button.text-button{
  border-style: none;
  cursor: pointer;
}
</style>