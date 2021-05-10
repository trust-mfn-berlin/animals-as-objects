<template>
  <article>
    {{titleBilingual}}<br>
    {{data.author}}<br>
    {{data.date}}
  </article>
</template>

<script>
export default {
  name: 'pathway',
  props:{
    data:{
      type:Object,
      required: true
    }
  },
  computed:{ 
    titleBilingual(){
      if(this.$store.getters.siteLanguage == 'de' && this.storePage.title_de){
        return this.data.title_de
      } else {
        return this.data.title
      }
    }
  },
}
</script>