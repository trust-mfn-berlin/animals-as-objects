<template>
  <div role="radiogroup" aria-labelledby="filter-label">
    <text-button role="radio" aria-checked="false" linkto="" id="filter-label" :isDisabled="true">Sort By</text-button>
    <text-button 
      v-for="(filter, i) in filterOptions"
      :key="filter.name"
      role="radio" 
      linkto=""
      :isActive="activeFilter == filter.name ? true : false"
      :aria-checked="activeFilter == filter.name ? true : false"
      @click.native="selectFilter(i)"
    >{{filter.label}}</text-button>
  </div>
</template>

<script>
export default {
  name:"article-filter",
  data(){
    return{
      filterOptions:[
        {
          name: 'type',
          label: 'Type',
          label_de: 'Typ',
          
        },
        {
          name: 'alphabetical',
          label: 'A-Z',
          label_de: 'A-Z',
          
        },
        {
          name: 'date',
          label: 'Date',
          label_de: 'Datum',
          
        },
      ]
    }
  },
  computed:{
    activeFilter(){
      return this.$store.getters.activeFilter
    }
  },
  methods:{
    selectFilter(i){
      this.$store.commit('setActiveFilter', this.filterOptions[i].name)
    }
  }
}
</script>

<style lang="less" scoped>

</style>