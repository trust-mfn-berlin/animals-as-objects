// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue
// https://www.d3indepth.com/force-layout/
// https://observablehq.com/@d3/force-directed-graph

// Docs
// https://github.com/d3/d3-force#simulation_on

// https://github.com/d3/d3-zoom

<template>
  <div id="d3"></div>
</template>

<script>
import * as d3 from 'd3'

import graphdata from '~/temp/graphdata.json';

export default {  
  data () {
    return {
      attr : {
        width: 1000,
        height: 800,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }
      },
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
        { source: 'Lorem', target: 'Sit', relation: 'a', value: 1.3 },
        { source: 'Sit', target: 'Amet', relation: 'b', value: 1 },
        { source: 'Sit', target: 'Buzz', relation: 'c', value: 1 },
        { source: 'Sit', target: '123', relation: 'd', value: 1 },
        { source: 'Ipsum', target: 'Buzz', relation: 'e', value: 2 },
        { source: 'Wup', target: 'Amet', relation: 'f', value: 0.9 },
        { source: 'Testtesttest', target: 'Sit', relation: 'g', value: 1 },
        { source: 'Amet', target: 'Testtesttest', relation: 'h', value: 1.6 },
        { source: 'Dolor', target: '123', relation: 'i', value: 0.7 },
        { source: 'Buzz', target: 'Wup', relation: 'j', value: 2 }
      ]
    }
  },
  methods:{
    navigate(event, d){
      this.$router.push('/' + d.slug);
    },
    init(){
      const that = this;
      const svg = d3
        .select("#d3")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

      const simulation = d3.forceSimulation(graphdata.nodes)
        .force("link", d3.forceLink(graphdata.links).id(d => d.slug))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2))
        .force("radial", d3.forceRadial(500))
        .force("collide", d3.forceCollide(20))

      let colorScale = d3.scaleOrdinal()
        .domain(d3.range(graphdata.nodes.length))
        .range(d3.schemeCategory10)

      const link = svg.append("g")
        .attr("stroke", "#eee")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(graphdata.links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

      const node = svg.append("g")
        
        .selectAll("circle")
        .data(graphdata.nodes)
        .enter()
        .append('g')
        .attr('transform', function (d) {
          let cirX = d.x
          let cirY = d.y
          return 'translate(' + cirX + ',' + cirY + ')'
        })
        .attr('id', function(d) {
          return d.slug
        })
        .call(this.drag(simulation));

        node.append("circle")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("r", 4.5)
          .attr('fill', function (d, i) {
            return colorScale(i)
          })

        node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .attr("font-family", "Optician Sans")
          .style("font-size", "10px")
          .attr("fill", "#ccc")
          .attr("letter-spacing", '0.1em')
          .text(function(d) { return d.frontmatter.title })
          .on("mouseenter", function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "black");
          })
          .on("mouseout", function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#ccc")
          });

          node.on('mouseover', function(event, d) {
            link.style('stroke', function(l) {
              if (d === l.source || d === l.target){
                return "black";
              }
              else {
                return "#eee";
              }
              });
          });

          node.on('click', function(event, d){
            that.navigate(event, d)
          })

          // Set the stroke width back to normal when mouse leaves the node.
          node.on('mouseout', function() {
            link.style('stroke', "#eee");
          });

        


      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' });
      });
    },
    drag(simulation){
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    }
  },
  mounted(){
    this.init();
    
  }
}
</script>
<style scoped>
</style>
