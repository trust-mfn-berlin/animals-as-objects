export default function ({store, context, route}) {
  
  // https://www.npmjs.com/package/uuid

  if(process.server){
    console.log('yo server');
  }

  if(process.client){
    console.log('middleware on client');
    if(store.getters.isTrackingEnabled){
      
      console.log('added route', route.path);
      store.commit('addRoute', route.path.substring(1));
    } else {
      console.log('tracking not enabled yet')
    }
  }
}