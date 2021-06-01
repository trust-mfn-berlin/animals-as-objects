<template>
  <div class="searchbar-container" role="search" aria-label="Find articles on this website" @click="expandSearchBar">
    <input
      class="f-mono subheading"
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
    />
    <ul class="searchbar-results" v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="article.slug" @click.native="closeSearchBar">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"searchbar",
  data(){
    return{
      searchQuery:'',
      articles: []
    }
  },
  methods:{
    expandSearchBar(){
      this.$store.commit('toggleSearchBar', true)
    },
    closeSearchBar(){
      console.log('alert');
      this.$store.commit('toggleSearchBar', false)
      this.articles = []
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content()
        .limit(12)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>

<style lang="less" scoped>

.searchbar-container{
  width: 100%;
  background-color: @white;
  box-shadow: @shadow;
  border-radius: @radius-s;

  position: relative;
  border: none;
  margin: 0;
  
  &:hover{
    box-shadow: @shadow-hover;
  }

  &:hover:after{
    border: @border-button-focus;
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
    pointer-events: none;
  }

  &:focus{
    box-shadow: @shadow-focus;
  }

  &:focus:after{
    border: @border-button-focus;
  }
}

input[type='search']{
  padding: 0.625rem 0.8rem 0.7rem;
  border: none;
  border-radius: @radius-s;
  // padding: 0;
  margin: 0;
  width:100%
}

.searchbar-results{
  padding: 0.625rem 0.8rem 0.7rem;

  li{
    list-style-type: none;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>