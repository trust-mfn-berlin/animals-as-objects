// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue
// https://www.d3indepth.com/force-layout/
// https://observablehq.com/@d3/force-directed-graph

// Docs
// https://github.com/d3/d3-force#simulation_on

// https://github.com/d3/d3-zoom

<template>
  <div id="d3-backlinks"></div>
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
        width: 470,
        height: 340,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        nodeSize: 32,
        labelSpacing: 4,
        fontSize: '0.5rem'
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
      this.nodes = this.backlinks.concat([this.article]); //not sure why but concat seems to avoid errors when clicking footnotes.

      this.links = [];

      for (let i = 0; i < this.backlinks.length; i++) {
        const backlink = this.backlinks[i];

        if(backlink.slug != this.article.slug){

        this.links.push({
          source:this.article.slug,
          target:backlink.slug
        })

        }
        
      }

      if(this.backlinks.length > 18){
        this.attr.nodeSize = 20;
        this.attr.fontSize = '0.4rem';
      }
    },
    init(){

      console.log('init D3');

      const that = this;
      const svg = d3
        .select("#d3-backlinks")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

      const simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink(this.links).id(d => d.slug))
        .force("charge", d3.forceManyBody().strength(-600).distanceMin(1).distanceMax(500))
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2))
        .force("radial", d3.forceRadial(this.attr.width / 2))
        .force("collide", d3.forceCollide(this.attr.nodeSize + 10).strength(0.2))
        

      let colorScale = d3.scaleOrdinal()
        .domain(d3.range(this.nodes.length))
        .range(d3.schemeCategory10)

      const link = svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 1)
        .selectAll("line")
        .data(this.links)
        .join("line")
        .attr("stroke-width", '1');

      const node = svg.append("g")
        .attr('class', 'nodeparent')
        .selectAll("rect")
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
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
            if(d.tao_type == 'material') return that.attr.nodeSize
            if(d.tao_type == 'story') return 5
          })
          .attr('fill', function (d, i) {
            return colorScale(i)
          })

        node.append("text")
          
          .attr("dy", this.attr.nodeSize + this.attr.labelSpacing + "px")
          .attr("font-family", "CentSchbook Mono BT")
          .style("font-size", this.attr.fontSize)
          .attr("fill", "rgba(0,0,0,0.2)")
          .text(function(d) { return d.title })
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})

          node.on('mouseover', function(event, d) {
            // text colour
            d3.select(this).select('text')
            .attr('fill', 'black');

            // order / z-index
            console.log(svg.selectAll('.nodeparent g'));
            svg.selectAll('.nodeparent g').sort(function (a, b) { // select the parent and sort the path's
              
              if (a.slug != d.slug) {
                // console.log(a.slug, 'back');
                return -1; // a is not the hovered element, send "a" to the back
              }
              else {
                // console.log(a.slug, 'forward');
                return 1; // a is the hovered element, bring "a" to the front
              }
            });
            
            link.attr('stroke-width', '1');
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
            link.attr('stroke-width', '1');
            link.style('stroke', "#eee");
            d3.select(this).select('text')
            .attr('fill', 'rgba(0,0,0,0.2)')
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
<style lang="less" scoped>
#d3-backlinks{
  height: 340px;
}

::v-deep g.node{
  cursor: pointer;
}

</style>
