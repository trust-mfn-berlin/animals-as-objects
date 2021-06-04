import Vuex from 'vuex';

import importColours from '../assets/colours.json'

const defaultLanguage = 'en';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPages: [],
      siteLanguage: defaultLanguage,
      currentPathway: [],
      searchBarIsOpen: false,
      activeFilter: 'type',
      sidebarIsOpen: true,
      colours: importColours,
      articleTaoType: ''
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
      },
      toggleSidebar(state, isOpen){
        console.log('sidebar open', isOpen)
        state.sidebarIsOpen = isOpen
      },
      setArticleTaoType(state, type){
        state.articleTaoType = type
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
      isSearchbarOpen(state){
        return state.searchBarIsOpen
      },
      activeFilter(state){
        return state.activeFilter
      },
      isSidebarOpen(state){
        return state.sidebarIsOpen
      },
      siteColours(state){
        return state.colours
      },
      articleTaoType(state){
        return state.articleTaoType
      }
    }
  })
}

export default createStore
