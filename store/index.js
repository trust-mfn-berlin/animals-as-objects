import Vuex from 'vuex';

import importColours from '../assets/colours.json'

const defaultLanguage = 'en';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedArticles: [],
      loadedRoutes: [],
      siteLanguage: defaultLanguage,
      currentPathway: [],
      searchBarIsOpen: false,
      activeFilter: 'type',
      sidebarIsOpen: true,
      colours: importColours,
      articleTaoType: '',
      citationModal: {isOpen:false, article:{}}
    },
    mutations: {
      setLoadedArticles(state, articles) {
        state.loadedArticles = articles;
      },
      setLoadedRoutes(state, routes){
        state.loadedRoutes = routes;
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
        // console.log('sidebar open', isOpen)
        state.sidebarIsOpen = isOpen
      },
      setArticleTaoType(state, type){
        state.articleTaoType = type
      },
      toggleCitationModal(state, citation){
        state.citationModal = citation
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const articles = await context.app.$content().only(['slug', 'title', 'title_de', 'id', 'tao_type']).fetch();
        vuexContext.commit('setLoadedArticles', articles);
        const routes = await context.app.$content('/netlify/pathways').only(['slug', 'title', 'title_de', 'articles']).fetch();
        vuexContext.commit('setLoadedRoutes', routes);
      }
    },
    getters: {
      loadedArticles(state) {
        return state.loadedArticles
      },
      loadedRoutes(state) {
        return state.loadedRoutes
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
      },
      isCitationModal(state){
        return state.citationModal
      }
    }
  })
}

export default createStore
