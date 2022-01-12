<template>
  <div class="subnav-filter" role="radiogroup" aria-labelledby="filter-label">
    <text-button role="radio" type="button" aria-checked="false" id="filter-label" :isDisabled="true">{{labelText}}</text-button>
    <text-button 
      type="button"
      class="filter"
      v-for="(filter, i) in filterOptions"
      :key="filter.name"
      role="radio"
      :isActive="activeFilter == filter.name ? true : false"
      :aria-checked="activeFilter == filter.name ? true : false"
      @click.native="selectFilter(i)"
    >
    <template v-if="isDe">
      {{filter.label_de}}
    </template>
    <template v-else>
      {{filter.label}}
    </template>
    
    </text-button>
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
          name: 'author',
          label: 'Author',
          label_de: 'Autor:in',       
        },
        {
          name: 'date',
          label: 'Timeline',
          label_de: 'Zeitstrahl',
        }
      ]
    }
  },
  computed:{
    labelText(){
      if(this.isDe) return 'Sortieren nach'
      return 'Sort by'
    },
    activeFilter(){
      return this.$store.getters.activeFilter
    },
    isDe(){
      if(this.$store.getters.siteLanguage == 'de') return true
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
.subnav-filter{
  position: fixed;
  top:3rem;
  z-index: @z-filter;
  @media screen and (max-width: @mq-s) /* Mobile */ {
    right:@space-s;
    top:@space-s;
  }
  
  .filter{
    margin-right: @space-xs;
  }
}

#filter-label{
  @media screen and (max-width: @mq-s) /* Mobile */ {
    display:none;
  }
}
</style>