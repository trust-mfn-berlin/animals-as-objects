<template>
  <div id="d3-timeline"></div>
</template>

<script>
// https://observablehq.com/@d3/beeswarm

import * as d3 from 'd3'

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
          name:'Finding Cycladophora',
          value:1859,
          scheme:0
        },
        {
          name:'Using Cycladophora start',
          value:1950,
          scheme:1
        },
        {
          name:'Using Cycladophora end',
          value:2021,
          scheme:3
        },
        {
          name:'Industrial Micropaleontology start',
          value:1921,
          scheme:4
        },
        {
          name:'Industrial Micropaleontology end',
          value:1950,
          scheme:5
        },
        {
          name:'Taxonomical Orders start',
          value:1753,
          scheme:6
        },
        {
          name:'Taxonomical Orders end',
          value:2021,
          scheme:7
        },
        {
          name:'Chaotic origins start',
          value:1766,
          scheme:8
        },
        {
          name:'Cycladophora davisiana start',
          value:1859,
          scheme:9
        },
        {
          name:'Cycladophora davisiana end',
          value:2021,
          scheme:10
        },
        {
          name:'Knut born',
          value:2006,
          scheme:11
        },
        {
          name:'Knut died',
          value:2011,
          scheme:12
        },
        {
          name:'Steinmetz-index start',
          value:1930,
          scheme:13
        },
        {
          name:'Steinmetz-index end',
          value:1945,
          scheme:14
        }
      ]
    }
  },
  computed:{
    x(gg){
      console.log(this.data);
      return d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.value))
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
          .data(this.dodge(this.data, {radius: this.attr.nodeRadius * 2 + this.attr.padding, x: d => this.x(d.value)}))
          .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => this.attr.height - this.attr.margin.bottom - this.attr.nodeRadius - this.attr.padding - d.y)
            .attr("r", this.attr.nodeRadius)
            .attr("style", function(d){
              return 'fill: var(--scheme-' + d.data.scheme + '-bg)'
              })
          .append("title")
            .text(d => d.data.name);
    },
    dodge(data, {radius = 1, x = d => d} = {}) {

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
      
      return circles;
    },
    xAxis(g){
      g.attr("transform", `translate(0,${this.attr.height - this.attr.margin.bottom + 5})`)
      .call(d3.axisBottom(this.x).tickSizeOuter(0).tickSizeInner(0).tickPadding(5).ticks(this.attr.ticks, "f"))
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