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
        canvasWidth: 1200,
        canvasHeight: 800,
        nodeRadius: 15,
        padding:1.5,
        margin: {
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }
      },
      data : [
        {
          name:'Finding Cycladophora',
          value:1859
        },
        {
          name:'Using Cycladophora start',
          value:1950
        },
        {
          name:'Using Cycladophora end',
          value:2021
        },
        {
          name:'Industrial Micropaleontology start',
          value:1921
        },
        {
          name:'Industrial Micropaleontology end',
          value:1950
        },
        {
          name:'Taxonomical Orders start',
          value:1753
        },
        {
          name:'Taxonomical Orders end',
          value:2021
        },
        {
          name:'Chaotic origins start',
          value:1766
        },
        {
          name:'Cycladophora davisiana start',
          value:1859
        },
        {
          name:'Cycladophora davisiana end',
          value:2021
        },
        {
          name:'Knut born',
          value:2006
        },
        {
          name:'Knut died',
          value:2011
        },
        {
          name:'Steinmetz-index start',
          value:1930
        },
        {
          name:'Steinmetz-index end',
          value:1945
        }
      ]
    }
  },
  computed:{
    x(gg){
      console.log(this.data);
      return d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.value))
        .range([this.attr.margin.left, this.attr.canvasWidth - this.attr.margin.right])
    }
  },
  methods:{
    init(){

      
      const that = this;
      const svg = d3
        .select("#d3-timeline")
        .append("svg")
        .attr("width", this.attr.canvasWidth)
        .attr("height", this.attr.canvasHeight);

        svg.append("g").call(this.xAxis);

        svg.append("g")
          .selectAll("circle")
          .data(this.dodge(this.data, {radius: this.attr.nodeRadius * 2 + this.attr.padding, x: d => this.x(d.value)}))
          .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => this.attr.canvasHeight - this.attr.margin.bottom - this.attr.nodeRadius - this.attr.padding - d.y)
            .attr("r", this.attr.nodeRadius)
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
        console.log(b);
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
      console.log(this.x);
      g.attr("transform", `translate(0,${this.attr.canvasHeight - this.attr.margin.bottom})`)
      .call(d3.axisBottom(this.x).tickSizeOuter(0))
    },
  },
  mounted(){
    this.init(); 
  }
}
</script>

<style lang="less" scoped>

</style>