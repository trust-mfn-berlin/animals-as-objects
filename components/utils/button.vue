<template>
  <button></button>
</template>

<script>
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

export default {
  name:'button',
  props:{
    label:{
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>