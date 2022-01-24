<template>
<button :class="tao_type" :style="{backgroundColor: useColourScheme ? 'var(--current-scheme-bg)' : 'black'}">
<svg class="icon-button-svg-close" v-show="icon === 'close'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.2023 22.3555L12.2023 11.3555M12.2023 11.3555L23.2023 0.355469M12.2023 11.3555L1.20215 0.355469M12.2023 11.3555L1.20215 22.3555" stroke="white"/></svg>
<svg class="icon-button-svg-arrow-left" v-show="icon === 'arrow-left'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'"  viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8627 24.5555L1.7627 12.4554L13.8627 0.355408" /></svg>
<svg class="icon-button-svg-arrow-right" v-show="icon === 'arrow-right'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'"  viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.35871 24.5555L20.4587 12.4554L8.35871 0.355408" /></svg>
<svg class="icon-button-svg-i" v-show="icon === 'i'" :fill="'white'" viewBox="0 0 11 18" xmlns="http://www.w3.org/2000/svg"><path d="M0.078125 16.4922L3.21875 16.4453C3.53125 16.4453 3.74609 16.3867 3.86328 16.2695C3.98047 16.1523 4.03906 15.9141 4.03906 15.5547V8.26562C4.03906 7.89844 3.96094 7.65234 3.80469 7.52734C3.64844 7.39453 3.36328 7.32812 2.94922 7.32812H0.335938V6.39062L6.21875 6.09766V15.5547C6.21875 15.9219 6.27344 16.1641 6.38281 16.2812C6.49219 16.3906 6.71094 16.4453 7.03906 16.4453L10.1094 16.4922V17.5H0.078125V16.4922ZM6.47656 1.5625C6.47656 1.95312 6.33984 2.28906 6.06641 2.57031C5.79297 2.84375 5.46094 2.98047 5.07031 2.98047C4.67188 2.98047 4.33594 2.84375 4.0625 2.57031C3.78906 2.28906 3.65234 1.95312 3.65234 1.5625C3.65234 1.17969 3.78906 0.847656 4.0625 0.566406C4.34375 0.285156 4.67969 0.144531 5.07031 0.144531C5.44531 0.144531 5.77344 0.285156 6.05469 0.566406C6.33594 0.847656 6.47656 1.17969 6.47656 1.5625Z"/></svg>
<svg class="icon-button-svg-arrow-up" v-show="icon === 'arrow-up'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'"  viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.875 13.4489L12.975 1.34888L25.0751 13.4489" /></svg>
<svg class="icon-button-svg-ham" v-show="icon === 'ham'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'"  viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g><line x1="19.5391" y1="0.676758" x2="0.98118" y2="0.676756" stroke="white"/><line x1="19.5391" y1="8.67676" x2="0.98118" y2="8.67676" stroke="white"/><line x1="19.5391" y1="16.6768" x2="0.98118" y2="16.6768" stroke="white"/></g></svg></button>
</template>

<script>
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

export default {
  name:'icon-button',
  props:{
    icon:{
      type: String,
      required: true,
      default:'i'
    },
    useColourScheme:{
      type: Boolean
    },
    tao_type:{
      type: String
    }
    
  }
}
</script>

<style lang="less" scoped>
button{
  display: inline-block;
  background-color: @black;
  box-shadow: @shadow;
  width: auto;
  position: relative;
  height: 2rem;
  width: 2rem;
  border-style: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0px;

  .animatemedium(all);

  // accessible standard
  @media screen and (max-width: @mq-s) /* Mobile */ {
    min-height: 44px;
    min-width: 44px;
  }

  &:hover{
    box-shadow: @shadow-hover !important;
    // background-color: red !important;
  }

  svg{
    margin:auto;
    width: 100%;
    height: 100%;
    // min-width: 1rem;
    // min-height: 1rem;
    padding: 0;
    box-sizing: content-box;
    // fill:@white;
  }

  &.material{
    border-radius: 1.5rem;
  }
  &.story{
    border-radius: @radius-m;
  }

  .hidden-button-text{
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
  }
}
</style>