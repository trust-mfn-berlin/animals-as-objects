
export default function ({store, app, context, route}) {
  
  // https://www.npmjs.com/package/uuid

  if(process.server){
    // console.log('yo server');
  }

  if(process.client){
    console.log('middleware on client');
    if(app.$cookies.get('tao-uid') && store.getters.isTrackingEnabled && route.params.slug){

      // MATOMO STUFF
      if(window._paq){
        window._paq.push(['setConsentGiven', 24]);
      }else{
        console.warn('Matomo not available');
      }

      // Dont add Duplicate Routes
      if(route.params.slug == store.getters.currentRouteLastPage){
        console.log("dupe!!!, skipping");
        return
      }

      // Don't add Curated Routes 
      if(route.name != 'routes-slug'){

      // console.log(route.name);
        
      const postObject = {
        uniqueId: app.$cookies.get('tao-uid'),
        route: route.params.slug,
        prevRoute: store.getters.currentRouteLastPage ? store.getters.currentRouteLastPage : null 
      }

      app.$axios.post(`?uniqueId=${postObject.uniqueId}&route=${postObject.route}&prevRoute=${postObject.prevRoute}`)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      store.commit('addRoute', {route:route.path.substring(1)});

      }

    } else {
      console.log('tracking not enabled yet')
    }
  }
}