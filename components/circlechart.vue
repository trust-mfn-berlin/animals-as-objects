// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue

<template>
  <div>
    <div id="d3"></div>
    <!-- <svg id="d3"></svg> -->
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      attr : {
        width: 500,
        height: 500,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }
      },
      gdp: [
        {country: "USA", value: 20.5 },
        {country: "China", value: 13.4 },
        {country: "Germany", value: 4.0 },
        {country: "Japan", value: 4.9 },
        {country: "France", value: 2.8 }
      ],
      nodes : [
        { id: 'Lorem' },
        { id: 'Ipsum' },
        { id: 'Dolor' },
        { id: 'Sit' },
        { id: 'Amet' },
        { id: 'Buzz' },
        { id: 'Wup' },
        { id: 'Testtesttest' },
        { id: '123' }
      ],
      links : [
        { source: 'Lorem', target: 'Sit', relation: '', value: 1.3 },
        { source: 'Sit', target: 'Amet', relation: '', value: 1 },
        { source: 'Sit', target: 'Buzz', relation: '', value: 1 },
        { source: 'Sit', target: '123', relation: '', value: 1 },
        { source: 'Ipsum', target: 'Buzz', relation: '', value: 2 },
        { source: 'Wup', target: 'Amet', relation: '', value: 0.9 },
        { source: 'Testtesttest', target: 'Sit', relation: '', value: 1 },
        { source: 'Amet', target: 'Testtesttest', relation: '', value: 1.6 },
        { source: 'Buzz', target: '123', relation: '', value: 0.7 },
        { source: 'Buzz', target: 'Wup', relation: '', value: 2 }
      ]
    }
  },
  methods:{
    init(){
      const svg = d3
       .select("#d3")
       .append("svg")
         .attr("width", this.attr.width)
         .attr("height", this.attr.height);
      
      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const color = d3.scaleOrdinal(d3.schemeDark2);

      const max_gdp = d3.max(sortedGDP, o => o.value);
      
      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, 1.5 * Math.PI]);

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) *25)
        .outerRadius((d, i) => (i + 2) *25)
        .startAngle(angleScale(0))
        .endAngle(d => angleScale(d.value));

      const g = svg.append("g");

      g.selectAll("path")
        .data(sortedGDP)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#000")
        .attr("stroke-width", "1px")
        .on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
        });

      g.selectAll("text")
        .data(this.gdp)
        .enter()
        .append("text")
        .text(d => `${d.country} -  ${d.value} Trillion`)
        .attr("x", -150)
        .attr("dy", -8)
        .attr("y", (d, i) => -(i + 1) * 25);

        g.attr("transform", "translate(250,300)")
    },
    mouseEnter(t){
      d3.select(t).transition().duration(200).attr("opacity", 0.5);
    },
    mouseOut(t){
      d3.select(t).transition().duration(200).attr("opacity", 1);
    }
  },
  mounted(){
    this.init();
    
  }
}
</script>
<style scoped>
</style>
