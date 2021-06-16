export default function ({store, context, route}) {
  
  // https://www.npmjs.com/package/uuid

  if(process.server){
    console.log('yo server');
  }

  if(process.client){
    console.log('middleware on client');
    if(store.getters.isTrackingEnabled){
      
      console.log('added route', route.path);
    } else {
      console.log('tracking not enabled yet')
    }
  }
}