
export default function ({store, app, context, route}) {
  
  // https://www.npmjs.com/package/uuid

  if(process.server){
    console.log('yo server');
  }

  if(process.client){
    console.log('middleware on client');
    if(app.$cookies.get('tao-uid') && store.getters.isTrackingEnabled && route.params.slug){

      var raw = JSON.stringify({"uniqueid":"XXX","route":"YYY"});
      const postObject = {
        uniqueid: app.$cookies.get('tao-uid'),
        route: route.params.slug
      }
      
      console.log(raw, JSON.stringify(postObject));


      app.$axios.post('', postObject);

      store.commit('addRoute', {route:route.path.substring(1)});
    } else {
      console.log('tracking not enabled yet')
    }
  }
}