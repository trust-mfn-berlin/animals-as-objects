<template>
  <div>About test</div>
</template>

<script>
export default {
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
}
</script>