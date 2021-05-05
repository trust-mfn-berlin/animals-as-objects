<template>
  <div>About test DE</div>
</template>

<script>
export default {
  created(){
    this.$store.commit('setSiteLanguage', 'de')
  },
}
</script>