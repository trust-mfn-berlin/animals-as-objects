// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue
// https://www.d3indepth.com/force-layout/
// https://observablehq.com/@d3/force-directed-graph

// Docs
// https://github.com/d3/d3-force#simulation_on

// https://github.com/d3/d3-zoom

  // Variables tester
// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03

<template>
  <div id="d3-main" :style="{height: attr.height + 'px'}"></div>
</template>

<script>
import * as d3 from 'd3'

import featuredGraphData from '~/temp/graphdata.json';

const graphData = featuredGraphData[0];

export default {  
  data () {
    return {
      attr : {
        width: 1000,
        height: 900,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        nodeSize: 75
      },
      
    }
  },
  methods:{
    navigate(event, d){
      this.$router.push('/' + d.slug);
    },
    init(){
      const that = this;
      const svg = d3
        .select("#d3-main")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

      const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.slug).distance(function(d) {if(d.relation == 'text'){console.log(d.relation); return 1} else {return 200}}))
        .force("charge", d3.forceManyBody().strength(-600).distanceMin(1).distanceMax(500))
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2))
        .force("radial", d3.forceRadial(this.attr.height / 2))
        .force("collide", d3.forceCollide(80).strength(0.2))

      let colorScale = d3.scaleOrdinal()
        .domain(d3.range(graphData.nodes.length))
        .range(["#84E3B0","#FA9129","#C64C4C","#EE9389","#9A7051","#0047FF","#DD3821","#6E2E60","#F5C721"])

      const link = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 1)
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("stroke-width", d => d.value);

      const node = svg.append("g")
        
        .selectAll("rect")
        .data(graphData.nodes)
        .enter()
        .append('g')
        .attr('transform', function (d) {
          // let cirX = d.x
          // let cirY = d.y
          // return 'translate(' + cirX + ',' + cirY + ')'
        })
        .attr('id', function(d) {
          return d.slug
        })
        .call(this.drag(simulation))
      
        

        node.append("rect")
          // .attr("r", function(d) {
          //   if(d.radius == 'big'){
          //     return 70
          //   } else {
          //     return 37.5
          //   }
          // })
          .attr('x', function(d , i){
            if(d.letter && d.width){
              return that.attr.nodeSize*d.width/2 * -1
            } else {
              return that.attr.nodeSize/2 * -1
            }
          })
          .attr('y', that.attr.nodeSize/2 * -1)
          .attr('width', function (d, i) {
            if(d.letter && d.width){
              return 80 * d.width
            } else if(d.radius == 'big') {
              return 120
            } else {
              return that.attr.nodeSize
            }
          })
          .attr('height', function (d, i) {
            if(d.letter){
              return 80
            } else if(d.radius == 'big') {
              return 120
            } else {
              return that.attr.nodeSize
            }
          })
          .attr('fill', function (d, i) {
            if(d.letter == true){
              return '#000'
            } else {
              // return colorScale(i)
              console.log(d.colour_scheme);
              return 'var(--scheme-'+ d.colour_scheme +'-bg)'
            }
            
          })
          .attr('rx', function (d, i) {
            if(d.letter == true){
              return 25
            } else if (d.tao_type == 'material'){
              return 50
            } else if (d.tao_type == 'story'){
              return 20
            } else if (d.tao_type == 'theme'){
              return 0
            }
          })

        node.append("text")
          
          .attr("dy", this.attr.nodeSize + 'px')
          .attr("font-family", "CentSchbook Mono BT")
          .attr('font-size', function (d, i) {
            if(d.letter == true){
              return '56px'
            }
            return '0.5rem'
          })
          .attr('fill', function (d, i) {
            if(d.letter == true){
              return '#000'
            }
            return '#000'
          })
          .text(function(d) { return d.title })
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})


          node.on('mouseover', function(event, d) {
            d3.select(this).selectAll('rect')
              .transition()
              .duration(150)
              .ease(d3.easeQuadOut)
              .attr("transform", "scale(2)")

            // d3.select(this)
            //   .transition()
            //   .duration(200)
            //   .attr("transform", "scale(2)");

            link.style('stroke', function(l) {
              if (d === l.source || d === l.target){
                return "black";
              }
              else {
                return "#fff";
              }
            });
          });

          node.on('click', function(event, d){
            that.navigate(event, d)
          })

          

          // Set the stroke width back to normal when mouse leaves the node.
          node.on('mouseout', function() {
            
            d3.select(this).selectAll('rect')
              .transition()
              .duration(100)
              .ease(d3.easeQuadOut)
              .attr("transform", "scale(1)")
            link.style('stroke', "#fff");

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
        if (!event.active) simulation.alphaTarget(0.0001);
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

    if(window){
      // console.log(window.innerWidth);
      this.attr.width = window.innerWidth
    }
    this.init();
    
  }
}
</script>
<style lang="less" scoped>
#d3-main{
  margin-top: -8rem;
}

</style>
