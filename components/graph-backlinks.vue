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

// import graphdata from '~/temp/graphdata.json';

export default {  
  props:{
    backlinks:{
      type: Array
    },
    article:{
      type: Object
    }
  },
  data () {
    return {
      attr : {
        width: 340,
        height: 340,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        nodeSize: 25,
        labelSpacing: 0
      },
      nodes:[],
      links:[]
    }
  },
  methods:{
    navigate(event, d){
      this.$router.push('/' + d.slug);
    },
    createLinks(){

      this.nodes = [];
      this.nodes = this.backlinks;
      this.nodes.push(this.article);

      this.links = []

      for (let i = 0; i < this.backlinks.length; i++) {
        const backlink = this.backlinks[i];

        this.links.push({
          source:this.article.slug,
          target:backlink.slug
        })
        
      }
    },
    init(){

      const that = this;
      const svg = d3
        .select("#d3")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

      const simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink(this.links).id(d => d.slug))
        .force("charge", d3.forceManyBody().strength(-600).distanceMin(1).distanceMax(500))
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2))
        .force("radial", d3.forceRadial(200))
        .force("collide", d3.forceCollide(50).strength(0.2))
        

      let colorScale = d3.scaleOrdinal()
        .domain(d3.range(this.nodes.length))
        .range(d3.schemeCategory10)

      const link = svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(this.links)
        .join("line")
        .attr("stroke-width", '1');

      const node = svg.append("g")
        .selectAll("rect")
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('transform', function (d) {
          // let cirX = d.width * -0.5
          // let cirY = 0
          // return 'translate(' + -50 + ',' + -5 + ')'
        })
        .attr('id', function(d) {
          return d.slug
        })
        .call(this.drag(simulation));

        node.append("rect")
          // .attr("r", this.attr.nodeSize)
          .attr("x", this.attr.nodeSize*-0.5)
          .attr("y", this.attr.nodeSize*-0.5)
          .attr("width", this.attr.nodeSize)
          .attr("height", this.attr.nodeSize)
          .attr("rx", function(d){ 
            if(d.tao_type == 'material') return 15
            if(d.tao_type == 'story') return 5
          })
          .attr('fill', function (d, i) {
            return colorScale(i)
          })

        node.append("text")
          
          .attr("dy", this.attr.nodeSize + this.attr.labelSpacing + "px")
          .attr("font-family", "CentSchbook Mono BT")
          .style("font-size", "0.5rem")
          .attr("fill", "#000")
          .text(function(d) { return d.title })
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})

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
          .attr('transform', function (d) { 
            return 'translate(' + d.x + ',' + d.y + ')' 
          });
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
    this.createLinks();
    this.init();
  }
}
</script>
<style scoped>
</style>
