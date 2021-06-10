<template>
  <div class="searchbar-container" role="search" aria-label="Find articles on this website">
    <input
      ref="searchbar"
      class="f-mono subheading"
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="Search Articles"
      
    />
    <ul class="searchbar-results" v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <Inline 
          :article="article"
          @click.native="closeSearchBar"
        />
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
    focusSearchBar(){
      this.$refs.searchbar.focus();
    },
    expandSearchBar(){
      this.$store.commit('toggleSearchBar', true)
    },
    closeSearchBar(){
      console.log('emptying searchbar...');
      // this.$store.commit('toggleSearchBar', false);
      this.articles = [];
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

  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);

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
  // width:100%;
  width:5rem;

  .animatemedium(all);

  &:focus{
    width:20rem;
  }

  &::-webkit-search-cancel-button{
    position:relative;
    right:-@space-xs;  
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    // border-radius:10px;
    // background: red;
    cursor: pointer;
    background-image: url('~assets/icons/cross-small.svg');
    background-position: center;
    background-repeat: no-repeat;
  }
}

.searchbar-results{
  padding: 0.625rem 0.8rem 0.7rem;
  // display: flex;

  li{
    margin-bottom: @space-xs;
  }

}
</style>