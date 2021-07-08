<template>
  <div id="d3-timeline"></div>
</template>

<script>
// https://observablehq.com/@d3/beeswarm

import * as d3 from 'd3'
import timelineData from '~/temp/dates.json';


export default {  
  data () {
    return {
      attr : {
        width: 1200,
        height: 900,
        lineWidth: 16,
        padding:5,
        ticks: 20,
        margin: {
          top: 20,
          right: 40,
          left: 40,
          bottom: 40,
        },
        spaceMultiplier: 25
      },
    }
  },
  computed:{
    x(){
      // console.log(timelineData);
      return d3.scaleTime()
        .domain([d3.min(timelineData, d => new Date(d.date_start)), d3.max(timelineData, d => new Date(d.date_end))])
        .range([this.attr.margin.left, this.attr.width - this.attr.margin.right])
    }
  },
  methods:{
    init(){

      var svg;

      const that = this;

      svg = d3
        .select("#d3-timeline")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

        svg.append("g").call(this.xAxis);

        svg.append("g")
          .selectAll("line")
          .data(this.dodge(timelineData, {x0: d => this.x(new Date(d.date_start)), x1: d => this.x(new Date(d.date_end))}))
          .join("g")
            .classed("d3-timeline-line", true)
            .append("line")
              .attr("x1", d => d.x0)
              .attr("x2", d => d.x1)
              .attr("y1", d => d.y)
              .attr("y2", d => d.y)
              .attr("stroke", function(d){
                return 'var(--scheme-' + d.data.colour_scheme + '-bg)'
                })
              .attr('stroke-width', this.attr.lineWidth)
              .attr('stroke-linecap', 'round')
        
        d3.selectAll('.d3-timeline-line')
          .append("title")
            .text(d => d.data.title);


        // d3.selectAll('.d3-timeline-line')
        //   .append("text")
        //     .text(d => d.data.title)
        //     .attr('font-size', '12px')
        //     .attr("font-family", "CentSchbook Mono BT")
        //     .attr("dy", function(d, i) { return d.y + 3})
        //     .attr("dx", function(d) { return (d.x0 + (d.x1 - d.x0)/2) - (d.data.title.length*7)/2})
            // .attr("fill", function(d){
            //   return 'var(--scheme-' + d.data.colour_scheme + '-fg)'
            // })

        const tooltip = svg.append("text")
          .attr("class", "tooltip")
          .style("pointer-events", "none")
          .attr("dy", -20)

        d3.selectAll('.d3-timeline-line').on('mouseover', function(event, d) {
          tooltip.text(d.data.title)
          .attr('transform', `translate(${event.offsetX},${event.offsetY})`)
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})
          .style("visibility", "visible")

          // d3.select(this).selectAll('text').style("visibility", "hidden")

        }).on('mousemove', function(event, d) {
          tooltip.text(d.data.title)
          .attr('transform', `translate(${event.offsetX},${event.offsetY})`)
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})
        }).on('mouseout', function(event, d){
          tooltip.style("visibility", "hidden")
          // d3.select(this).selectAll('text').style("visibility", "visible")
        })
          
          
    },
    dodge(data, {x0 = d => d, x1 = d => d} = {}) {


      const lines = data.map((d, i, data) => ({
        x0: x0(d, i, data), 
        x1: x1(d, i, data), 
        index: i,
        // y: this.attr.height - this.attr.margin.bottom - 5 - i*this.attr.spaceMultiplier,
        data: d}))

      var head = null, tail = null;

      var space = 0;

      function intersects(start, end, itemToCompare) {
        let a = itemToCompare;
        while (a) {
          if (a.x0 < end && a.x1 > start) {
            console.log('intersect')
            return true;
          } else {
            console.log('no intersect')
          }
          a = a.next;
        }
        return false;
      }
      
      for (let l = 0; l < lines.length; l++) {
        const b = lines[l];
        
        // Remove circles from the queue that can’t intersect the new circle b.
        // while (head && head.x < b.x - radius2) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if(lines[l+1]){
        
          if (intersects(b.x0, b.x1, lines[l+1])) {

            space++;
            b.y = this.attr.height - this.attr.margin.bottom - space*this.attr.spaceMultiplier            

          } else if (intersects(b.x0, b.x1, lines[l-1])){
            space++;
            b.y = this.attr.height - this.attr.margin.bottom - space*this.attr.spaceMultiplier            
          }
          else {
            b.y = this.attr.height - this.attr.margin.bottom - space*this.attr.spaceMultiplier
          }

        } else {
          space++;
          b.y = this.attr.height - this.attr.margin.bottom - space*this.attr.spaceMultiplier            
        }

        // console.log(space);

        // // Add b to the queue.
        // b.next = null;
        // if (head === null) head = tail = b;
        // else tail = tail.next = b;
      }

      // console.log(lines);
      
      return lines;
    },
    xAxis(g){
      g.attr("transform", `translate(0,${this.attr.height - this.attr.margin.bottom + 5})`)
      .call(d3.axisBottom(this.x))
    },
  },
  mounted(){
    if(window){
      this.attr.height = timelineData.length * this.attr.spaceMultiplier - this.attr.margin.top;
      this.attr.width = window.innerWidth - 48;
      this.attr.ticks = Math.floor(window.innerWidth / 80)
    }
    this.init(); 

    // Responsive Guide
    // https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
  },
}
</script>

<style lang="less" scoped>
::v-deep svg{
  background-color: @bg-2;
  // border-radius: @radius-l;

  .domain{
    stroke:none;
  }
  .tick{
    line{
      stroke: none;
    }
    text{
      font-family: @f-mono;
      font-size: @fs-s;
    }
  }
}
</style>