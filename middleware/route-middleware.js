
export default function ({store, app, context, route}) {
  
  // https://www.npmjs.com/package/uuid

  if(process.server){
    // console.log('yo server');
  }

  if(process.client){
    console.log('middleware on client');
    if(app.$cookies.get('tao-uid') && store.getters.isTrackingEnabled && route.params.slug){

      // Dont add Duplicate Routes
      if(route.params.slug == store.getters.currentRouteLastPage){
        console.log("dupe!!!, skipping");
        return
      }

      // Don't add Curated Routes 
      if(route.name != 'routes-slug'){

      console.log(route.name);
        
      const postObject = {
        uniqueid: app.$cookies.get('tao-uid'),
        route: route.params.slug
      }

      app.$axios.post('', postObject);
      store.commit('addRoute', {route:route.path.substring(1)});

      }

    } else {
      console.log('tracking not enabled yet')
    }
  }
}