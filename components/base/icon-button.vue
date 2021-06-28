<template>
  <button :class="tao_type" :style="{backgroundColor: useColourScheme ? 'var(--current-scheme-bg)' : 'black'}">
    <span class="hidden-button-text"><slot></slot></span>
    <svg v-if="icon == 'close'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.1003 25.1L13.0003 13M13.0003 13L25.1003 0.899963M13.0003 13L0.900146 0.899963M13.0003 13L0.900146 25.1" />
    </svg>
    <svg v-if="icon == 'arrow-left'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'" width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8627 24.5555L1.7627 12.4554L13.8627 0.355408" />
    </svg>
    <svg v-if="icon == 'arrow-right'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'" width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.35871 24.5555L20.4587 12.4554L8.35871 0.355408" />
    </svg>
    <svg v-if="icon == 'i'" :fill="'white'" width="11" height="18" viewBox="0 0 11 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.078125 16.4922L3.21875 16.4453C3.53125 16.4453 3.74609 16.3867 3.86328 16.2695C3.98047 16.1523 4.03906 15.9141 4.03906 15.5547V8.26562C4.03906 7.89844 3.96094 7.65234 3.80469 7.52734C3.64844 7.39453 3.36328 7.32812 2.94922 7.32812H0.335938V6.39062L6.21875 6.09766V15.5547C6.21875 15.9219 6.27344 16.1641 6.38281 16.2812C6.49219 16.3906 6.71094 16.4453 7.03906 16.4453L10.1094 16.4922V17.5H0.078125V16.4922ZM6.47656 1.5625C6.47656 1.95312 6.33984 2.28906 6.06641 2.57031C5.79297 2.84375 5.46094 2.98047 5.07031 2.98047C4.67188 2.98047 4.33594 2.84375 4.0625 2.57031C3.78906 2.28906 3.65234 1.95312 3.65234 1.5625C3.65234 1.17969 3.78906 0.847656 4.0625 0.566406C4.34375 0.285156 4.67969 0.144531 5.07031 0.144531C5.44531 0.144531 5.77344 0.285156 6.05469 0.566406C6.33594 0.847656 6.47656 1.17969 6.47656 1.5625Z"/>
    </svg>
    <!-- <svg v-if="icon == 'i'" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10.3157" y1="17.0267" x2="0.284424" y2="17.0267" />
      <line x1="5.49243" y1="6.67859" x2="0.284431" y2="6.67859" />
      <line x1="5.36377" y1="17.0501" x2="5.36377" y2="6.17857" />
      <line x1="5.36377" y1="3.11841" x2="5.36377" y2="0.144485" />
    </svg> -->
    <svg v-if="icon == 'arrow-up'" :stroke="useColourScheme ? 'var(--current-scheme-fg)' : 'white'" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.875 13.4489L12.975 1.34888L25.0751 13.4489" />
    </svg>
  </button>
</template>

<script>
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

export default {
  name:'icon-button',
  props:{
    icon:{
      type: String,
      required: true
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

  border-radius: 0px;

  .animatemedium(all);

  svg{
    margin:auto;
    // fill:@white;
  }

  &.material{
    border-radius: 1rem;
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