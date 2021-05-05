import Vuex from 'vuex';

// If we have animalsasobjects.com/de/.... 
// Then we do not need language in the store.

const defaultLanguage = 'en';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPages: [],
      siteLanguage: defaultLanguage,
      currentPathway: []
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
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        const pages = await context.app.$content().only(['slug', 'title', 'title_de', 'id']).fetch();
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
    }
  })
}

export default createStore
