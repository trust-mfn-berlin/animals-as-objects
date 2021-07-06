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
        height: 600,
        nodeRadius: 15,
        padding:5,
        ticks: 20,
        margin: {
          top: 20,
          right: 40,
          left: 40,
          bottom: 40,
        }
      },
      data : [
        {
          title:'Finding Cycladophora',
          value:1859,
          colour_scheme:0
        },
        {
          title:'Using Cycladophora start',
          value:1950,
          colour_scheme:1
        },
        {
          title:'Using Cycladophora end',
          value:2021,
          colour_scheme:1
        },
        {
          title:'Industrial Micropaleontology start',
          value:1921,
          colour_scheme:4
        },
        {
          title:'Industrial Micropaleontology end',
          value:1950,
          colour_scheme:4
        },
        {
          title:'Taxonomical Orders start',
          value:1753,
          colour_scheme:5
        },
        {
          title:'Taxonomical Orders end',
          value:2021,
          colour_scheme:5
        },
        {
          title:'Chaotic origins start',
          value:1766,
          colour_scheme:6
        },
        {
          title:'Cycladophora davisiana start',
          value:1859,
          colour_scheme:7
        },
        {
          title:'Cycladophora davisiana end',
          value:2021,
          colour_scheme:7
        },
        {
          title:'Knut born',
          value:2006,
          colour_scheme:11
        },
        {
          title:'Knut died',
          value:2011,
          colour_scheme:11
        },
        {
          title:'Steinmetz-index start',
          value:1930,
          colour_scheme:13
        },
        {
          title:'Steinmetz-index end',
          value:1945,
          colour_scheme:13
        }
      ]
    }
  },
  computed:{
    x(){
      // console.log(timelineData);
      return d3.scaleTime()
        .domain(d3.extent(timelineData, d => new Date(d.date_start)))
        .range([this.attr.margin.left, this.attr.width - this.attr.margin.right])
    }
  },
  methods:{
    init(){

      var svg;

      svg = d3
        .select("#d3-timeline")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

        svg.append("g").call(this.xAxis);

        svg.append("g")
          .selectAll("circle")
          .data(this.dodge(timelineData, {radius: this.attr.nodeRadius * 2 + this.attr.padding, x: d => this.x(new Date(d.date_start))}))
          .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => this.attr.height - this.attr.margin.bottom - this.attr.nodeRadius - this.attr.padding - d.y)
            .attr("r", this.attr.nodeRadius)
            .attr("style", function(d){
              return 'fill: var(--scheme-' + d.data.colour_scheme + '-bg)'
              })
          .append("title")
            .text(d => d.data.title);
    },
    dodge(data, {radius = 1, x = d => d} = {}) {

      // console.log(data.map((d, i, data) => ({
      //   x: +x(d, i, data), 
      //   data: d
      // }
      // )));

      // console.log(x(data[0]))
      // console.log(this.x(data[0]));


      const radius2 = radius ** 2;
      const circles = data.map((d, i, data) => ({x: + x(d, i, data), data: d})).sort((a, b) => a.x - b.x);
      const epsilon = 1e-3;
      let head = null, tail = null;

      // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
      function intersects(x, y) {
        let a = head;
        while (a) {
          if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
            return true;
          }
          a = a.next;
        }
        return false;
      }

      // Place each circle sequentially.
      for (const b of circles) {
        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && head.x < b.x - radius2) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if (intersects(b.x, b.y = 0)) {
          let a = head;
          b.y = Infinity;
          do {
            let y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
            if (y < b.y && !intersects(b.x, y)) b.y = y;
            a = a.next;
          } while (a);
        }

        // Add b to the queue.
        b.next = null;
        if (head === null) head = tail = b;
        else tail = tail.next = b;
      }

      // console.log(circles);
      
      return circles;
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