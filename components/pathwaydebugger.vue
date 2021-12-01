<template>
  <aside class="pathways">
    Pathway
    <template v-if="currentPathway.length > 0">
      <ol>
        <li v-for="(p, index) in currentPathway" :key="index">
          {{p}}
          <!-- {{p.title}}<br>
          {{p.id}} -->
        </li>
      </ol>
    </template>
  </aside>
</template>

<script>
export default {
  name:'pathway-debugger',
  computed:{
    currentPathway(){
      return this.$store.getters.currentPathway
    }
  }
}
</script>

<style scoped>
.pathways{
  background-color: #ccc;
  position: fixed;
  top:0;
  right:0;
  padding:1rem;
  width: 200px;
  max-height: 100vh;
  overflow: auto;
}
</style>