import Vuex from 'vuex';

// If we have animalsasobjects.com/de/.... 
// Then we do not need language in the store.

const defaultLanguage = 'en';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPages: [],
      siteLanguage: defaultLanguage,
      currentPathway: [],
      searchBarIsOpen: false,
      activeFilter: 'type'
    },
    mutations: {
      setPages(state, pages) {
        state.loadedPages = pages;
      },
      setSiteLanguage(state, lang) {
        // console.log('set language to: ' + lang);
        state.siteLanguage = lang;
      },
      addPathway(state, path) {
        console.log('Path added: ' + path);
        state.currentPathway.push(path);
      },
      toggleSearchBar(state, isOpen){
        console.log('Is search open:', isOpen)
        state.searchBarIsOpen = isOpen
      },
      setActiveFilter(state, filter){
        state.activeFilter = filter
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const pages = await context.app.$content().only(['slug', 'title', 'title_de', 'id', 'tao_type']).fetch();
        vuexContext.commit('setPages', pages)
      }
    },
    getters: {
      loadedPages(state) {
        return state.loadedPages
      },
      siteLanguage(state) {
        return state.siteLanguage
      },
      currentPathway(state) {
        return state.currentPathway
      },
      isSearchBarOpen(state){
        return state.searchBarIsOpen
      },
      activeFilter(state){
        return state.activeFilter
      }
    }
  })
}

export default createStore
