<template>
  <div id="map-wrap">
  <client-only>
    <l-map ref="myMap" :zoom=4 :center="[points[activePoint].geometry.coordinates[1],points[activePoint].geometry.coordinates[0]]">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- <l-marker :lat-lng="[points[activePoint].geometry.coordinates[0],points[activePoint].geometry.coordinates[1]]"></l-marker> -->
    </l-map>
  </client-only>
  <button @click='moveMap'>Press me</button>
  {{points[activePoint].caption}}
  </div>
</template>

// https://leafletjs.com/examples/geojson/

<script>
export default {
  name: 'mapcomponent',
  data(){
    return{
      points:[
        {
          caption: "Slide 1 Lorem ipsum dolor sit amet ",
          geometry: {
            type:"Point",
            coordinates:[15.9789276,40.4485147]
          }
        },
        {
          caption: "Slide 2 Lorem ipsum dolor sit aaaaa",
          geometry: {
            type:"Point",
            coordinates:[25.6283569,41.8818314]
          }
        },
        {
          caption: "Slide 3 Lorem ipsum dolor sit aaaaa",
          geometry: {
            type:"Point",
            coordinates:[13.40, 52.544]
          }
        }
      ],
      activePoint:0
    }
  },
  methods:{
    moveMap(){
      this.activePoint ++
      this.$refs.myMap.mapObject.flyTo(
      [
        this.points[this.activePoint].geometry.coordinates[1],
        this.points[this.activePoint].geometry.coordinates[0]
      ], 6
      )
    }
  },
  mounted(){
      this.$nextTick(() => {
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
            L.geoJSON(point.geometry).addTo(this.$refs.myMap.mapObject);
        }
        // console.log(activeGeoJSON);
        // this.$refs.myMap.mapObject.panTo(activeGeoJSON)
      });
  },
}
</script>

<style scoped>
#map-wrap{
  width:1000px;
  height: 800px;
}
</style>