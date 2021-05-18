// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue
// https://www.d3indepth.com/force-layout/
// https://observablehq.com/@d3/force-directed-graph

// Docs
// https://github.com/d3/d3-force#simulation_on

// https://github.com/d3/d3-zoom

  // Variables tester
// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03

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
        width: 1400,
        height: 1000,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }
      },
      nodes : [
        { slug: 'Lorem', frontmatter:{ tao_type: 'material', title: 'Lorem' }, radius: 'big' },
        { slug: 'Ipsum', frontmatter:{ tao_type: 'material', title: 'Ipsum' } },
        { slug: 'Dolor', frontmatter:{ tao_type: 'story', title: 'Dolor' } },
        { slug: 'Sit', frontmatter:{ tao_type: 'material', title: 'Sit' } },
        { slug: 'Amet', frontmatter:{ tao_type: 'theme', title: 'Amet' } },
        { slug: 'Buzz', frontmatter:{ tao_type: 'material', title: 'Buzz' } },
        { slug: 'Wup', frontmatter:{ tao_type: 'story', title: 'Wup' } },
        { slug: '123', frontmatter:{ tao_type: 'material', title: '123' } },
        { slug: 'Testtesttest', frontmatter:{ tao_type: 'material', title: 'Testtesttest' } },
        { slug: 'Animals-A', frontmatter:{ title: 'A' }, letter: true, width: 0.9 },
        { slug: 'Animals-n', frontmatter:{ title: 'n' }, letter: true, width: 0.8 },
        { slug: 'Animals-i', frontmatter:{ title: 'i' }, letter: true, width: 0.6 },
        { slug: 'Animals-m', frontmatter:{ title: 'm' }, letter: true, width: 0.9 },
        { slug: 'Animals-a', frontmatter:{ title: 'a' }, letter: true, width: 0.8 },
        { slug: 'Animals-l', frontmatter:{ title: 'l' }, letter: true, width: 0.6 },
        { slug: 'Animals-s', frontmatter:{ title: 's' }, letter: true, width: 0.7 },
        { slug: 'as-a', frontmatter:{ title: 'a' }, letter: true, width: 0.9 },
        { slug: 'as-s', frontmatter:{ title: 's' }, letter: true, width: 0.9 },
        { slug: 'Objects-O', frontmatter:{ title: 'O' }, letter: true, width: 1 },
        { slug: 'Objects-b', frontmatter:{ title: 'b' }, letter: true, width: 0.9 },
        { slug: 'Objects-j', frontmatter:{ title: 'j' }, letter: true, width: 0.6 },
        { slug: 'Objects-e', frontmatter:{ title: 'e' }, letter: true, width: 0.9 },
        { slug: 'Objects-c', frontmatter:{ title: 'c' }, letter: true, width: 0.9 },
        { slug: 'Objects-t', frontmatter:{ title: 't' }, letter: true, width: 0.9 },
        { slug: 'Objects-s', frontmatter:{ title: 's' }, letter: true, width: 0.9 },
        { slug: 'Objects-?', frontmatter:{ title: '?' }, letter: true, width: 0.9 }

      ],
      links : [
        { source: 'Lorem', target: 'Sit', relation: 'a', value: 4 },
        { source: 'Sit', target: 'Amet', relation: 'b', value: 1 },
        { source: 'Sit', target: 'Buzz', relation: 'c', value: 1 },
        { source: 'Sit', target: '123', relation: 'd', value: 1 },
        { source: 'Ipsum', target: 'Buzz', relation: 'e', value: 1 },
        { source: 'Wup', target: 'Amet', relation: 'f', value: 2 },
        { source: 'Testtesttest', target: 'Sit', relation: 'g', value: 1 },
        { source: 'Amet', target: 'Testtesttest', relation: 'h', value: 1.6 },
        { source: 'Dolor', target: '123', relation: 'i', value: 0.7 },
        { source: 'Buzz', target: 'Wup', relation: 'j', value: 3 },
        { source: 'Lorem', target: 'Wup', relation: 'x', value: 1 },
        { source: 'Lorem', target: 'Animals-n', relation: 'x', value: 1 },
        { source: 'Animals-A', target: 'Animals-n', relation: 'text', value: 1 },
        { source: 'Animals-n', target: 'Animals-i', relation: 'text', value: 1 },
        { source: 'Animals-i', target: 'Animals-m', relation: 'text', value: 1 },
        { source: 'Animals-m', target: 'Animals-a', relation: 'text', value: 1 },
        { source: 'Animals-a', target: 'Animals-l', relation: 'text', value: 1 },
        { source: 'Animals-l', target: 'Animals-s', relation: 'text', value: 1 },
        { source: 'Animals-s', target: 'Animals-A', relation: 'text', value: 1 },
        { source: 'Wup', target: 'as-a', relation: 'a', value: 1 },
        { source: 'as-a', target: 'as-s', relation: 'text', value: 1 },
        { source: 'as-a', target: 'as-s', relation: 'text', value: 1 },
        { source: 'Testtesttest', target: 'Objects-O', relation: 'xx', value: 1 },
        { source: 'Objects-O', target: 'Objects-b', relation: 'text', value: 1 },
        { source: 'Objects-b', target: 'Objects-j', relation: 'text', value: 1 },
        { source: 'Objects-j', target: 'Objects-e', relation: 'text', value: 1 },
        { source: 'Objects-e', target: 'Objects-c', relation: 'text', value: 1 },
        { source: 'Objects-c', target: 'Objects-t', relation: 'text', value: 1 },
        { source: 'Objects-t', target: 'Objects-s', relation: 'text', value: 1 },
        { source: 'Objects-s', target: 'Objects-?', relation: 'text', value: 1 },
        { source: 'Objects-?', target: 'Objects-j', relation: 'text', value: 1 },
        { source: 'Objects-t', target: 'Objects-O', relation: 'text', value: 1 },
        { source: 'Objects-b', target: 'Objects-s', relation: 'text', value: 1 },
        { source: 'Objects-e', target: 'Objects-O', relation: 'text', value: 1 },
        { source: 'Objects-j', target: 'Objects-O', relation: 'text', value: 1 },
        { source: 'Objects-?', target: 'Objects-e', relation: 'text', value: 1 },
      ],
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

      const simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink(this.links).id(d => d.slug).distance(function(d) {if(d.relation == 'text'){console.log(d.relation); return 1} else {return 200}}))
        .force("charge", d3.forceManyBody().strength(-600).distanceMin(1).distanceMax(500))
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2))
        .force("radial", d3.forceRadial(750))
        .force("collide", d3.forceCollide(40).strength(0.2))

      let colorScale = d3.scaleOrdinal()
        .domain(d3.range(this.nodes.length))
        .range(["#84E3B0","#FA9129","#C64C4C","#EE9389","#9A7051","#0047FF","#DD3821","#6E2E60","#F5C721"])

      const link = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 1)
        .selectAll("line")
        .data(this.links)
        .join("line")
        .attr("stroke-width", d => d.value);

      const node = svg.append("g")
        
        .selectAll("rect")
        .data(this.nodes)
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
          .attr('x', -37.5)
          .attr('y', -37.5)
          .attr('width', function (d, i) {
            if(d.letter && d.width){
              return 80 * d.width
            } else if(d.radius == 'big') {
              return 120
            } else {
              return 75
            }
          })
          .attr('height', function (d, i) {
            if(d.letter){
              return 80
            } else if(d.radius == 'big') {
              return 120
            } else {
              return 75
            }
          })
          .attr('fill', function (d, i) {
            if(d.letter == true){
              return '#000'
            } else {
              return colorScale(i)
            }
            
          })
          .attr('rx', function (d, i) {
            if(d.letter == true){
              return 25
            } else if (d.frontmatter.tao_type == 'material'){
              return 50
            } else if (d.frontmatter.tao_type == 'story'){
              return 20
            } else if (d.frontmatter.tao_type == 'theme'){
              return 0
            }
          })

        node.append("text")
          
          .attr("dy", "15px")
          .attr("font-family", "Arial")
          .attr('font-size', function (d, i) {
            if(d.letter == true){
              return '56px'
            }
            return '24px'
          })
          .attr('fill', function (d, i) {
            if(d.letter == true){
              return '#fff'
            }
            return '#fff'
          })
          .attr("letter-spacing", '0.1em')
          .text(function(d) { return d.frontmatter.title })
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})


          node.on('mouseover', function(event, d) {
            d3.select(this).selectAll('rect')
              .transition()
              .duration(150)
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
    this.init();
    
  }
}
</script>
<style scoped>
</style>
