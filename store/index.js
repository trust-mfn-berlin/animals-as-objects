import Vuex from 'vuex';

import importColours from '../assets/colours.json'

const defaultLanguage = 'en';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedArticles: [],
      loadedRoutes: [],
      siteLanguage: defaultLanguage,
      currentRoute: [],
      leastCommonRoutes: [],
      mostCommonRoutes: [],
      searchBarIsOpen: false,
      activeFilter: 'type',
      sidebarIsOpen: false,
      mobileMenuIsOpen: false,
      colours: importColours,
      articleTaoType: '',
      citationModal: {isOpen:false, article:{}},
      trackingEnabled: false,
      rngArticles:[]
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
      addRoute(state, route) {
        console.log('Route added: ' + route.route);
        state.currentRoute.push(route);
      },
      setRoutes(state, routes) {
        state.currentRoute = routes
      },
      setLeastCommonRoutes(state, routes){
        state.leastCommonRoutes = routes
      },
      setMostCommonRoutes(state, routes){
        state.mostCommonRoutes = routes
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
      toggleMobileMenu(state, isOpen){
        state.mobileMenuIsOpen = isOpen
      },
      setArticleTaoType(state, type){
        state.articleTaoType = type
      },
      toggleCitationModal(state, citation){
        state.citationModal = citation
      },
      enableTracking(state){
        state.trackingEnabled = true
      },
      setRngArticles(state, articles){
        state.rngArticles = articles
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const articles = await context.app.$content().only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme', 'cover_image']).fetch();
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
      currentRoute(state) {
        // return array of user's current route
        return state.currentRoute
      },
      leastCommonRoutes(state){
        // return least visited route
        return state.leastCommonRoutes
      },
      mostCommonRoutes(state){
        return state.mostCommonRoutes
      },
      currentRouteLastPage(state){
        if(state.currentRoute[state.currentRoute.length - 1]){
          return state.currentRoute[state.currentRoute.length - 1].route
        }
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
      isMobileMenuOpen(state){
        return state.mobileMenuIsOpen
      },
      siteColours(state){
        return state.colours
      },
      articleTaoType(state){
        return state.articleTaoType
      },
      isCitationModal(state){
        return state.citationModal
      },
      isTrackingEnabled(state){
        return state.trackingEnabled
      },
      rngArticles(state){
        return state.rngArticles
      }
    }
  })
}

export default createStore
