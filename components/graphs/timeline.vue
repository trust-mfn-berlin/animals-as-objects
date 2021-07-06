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
        lineWidth: 30,
        padding:5,
        ticks: 20,
        margin: {
          top: 20,
          right: 40,
          left: 40,
          bottom: 40,
        },
        spaceMultiplier: 30
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
            .classed("timeline", true)
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
        
        d3.selectAll('.timeline')
          .append("title")
            .text(d => d.data.title);

        d3.selectAll('.timeline')
          .append("text")
            .text(d => d.data.title)
            .attr('font-size', '12px')
            .attr("font-family", "CentSchbook Mono BT")
            .attr("dy", function(d, i) { return that.attr.height - that.attr.margin.bottom - i*that.attr.spaceMultiplier})
            .attr("dx", function(d) { return (d.x0 + (d.x1 - d.x0)/2) - this.getBoundingClientRect().width*0.5})
            // .attr("fill", function(d){
            //   return 'var(--scheme-' + d.data.colour_scheme + '-fg)'
            // })
          
          
    },
    dodge(data, {x0 = d => d, x1 = d => d} = {}) {


      const lines = data.map((d, i, data) => ({
        x0: x0(d, i, data), 
        x1: x1(d, i, data), 
        y: this.attr.height - this.attr.margin.bottom - 5 - i*this.attr.spaceMultiplier,
        data: d}))

      console.log(lines);
      
      return lines;
    },
    xAxis(g){
      g.attr("transform", `translate(0,${this.attr.height - this.attr.margin.bottom + 5})`)
      .call(d3.axisBottom(this.x))
    },
  },
  mounted(){
    if(window){
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

  .domain{
    // stroke:none;
  }
  .tick{
    line{
      // stroke: none;
    }
    text{
      font-family: @f-mono;
      font-size: @fs-s;
    }
  }
}
</style>