<template>
  <div class='graph-outer'>
    <div id="d3-timeline" :style="{'height': attr.containerHeight + 'px'}">
    </div>
    <div id="d3-xaxis"></div>
  </div>
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
        lineWidth: 24, //Thickness of timelines
        padding:5,
        ticks: 20,
        margin: {
          top: 1,
          right: 40,
          left: 40,
          bottom: 40,
        },
        spaceMultiplier: 28, //Space between lines
        computedLines: 0,
        containerHeight: 900,
        timelineHeight: 35
      },
    }
  },
  computed:{
    isDe(){
      if(this.$store.getters.siteLanguage == 'de') return true
    },
    x(){
      // console.log(timelineData);
      return d3.scaleTime()
        .domain([d3.min(timelineData, d => new Date(d.date_start)), d3.max(timelineData, d => new Date(d.date_end))])
        .range([this.attr.margin.left, this.attr.width - this.attr.margin.right])
    }
  },
  methods:{
    navigate(event, d){
      this.$router.push('/' + d.data.slug);
    },
    mediaQuery(){
      if(window){

        if(window.innerWidth < 501){
          this.attr.width = window.innerWidth*2;
          this.attr.lineWidth = 20;
          this.attr.spaceMultiplier = 25;
        } else {
          this.attr.width = window.innerWidth - this.attr.lineWidth;
          // this.attr.lineWidth = 32;
          // this.attr.spaceMultiplier = 40;
        }

        this.attr.height = timelineData.length * this.attr.spaceMultiplier - this.attr.margin.top;
        this.attr.ticks = Math.floor(window.innerWidth / 80)

      }
    },
    init(){

      this.mediaQuery();

      var svg;


      const that = this;

      d3.selectAll("svg > *").remove();
      d3.selectAll("svg").remove();

      var xaxis = d3.select("#d3-xaxis")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.timelineHeight);
        
        

      svg = d3
        .select("#d3-timeline")
        .append("svg")
        .attr("class", "timeline-main")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height);

        xaxis.append("g").call(this.xAxis);
        svg.append("g").call(this.xAxisBg);


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
            .text(d => d.title);


        d3.selectAll('.d3-timeline-line')
          .append("text")
            .text(d => d.title)
            .text(function(d){
              if((d.title.length*7) > d.x1 - d.x0){
                return d.title.substring(0,5) + '...'
              } else {
                return d.title
              }
            })
            .attr('font-size', '12px')
            .attr("font-family", "century-mono")
            .attr("dy", function(d, i) { return d.y + 3})
            .attr("dx", function(d) { 
              if((d.title.length*7) > d.x1 - d.x0){
                return (d.x0 + (d.x1 - d.x0)/2) - (8*7)/2
              } else {
                return (d.x0 + (d.x1 - d.x0)/2) - (d.title.length*7)/2
              }
            })
            .attr("fill", function(d){
              return 'var(--scheme-' + d.data.colour_scheme + '-fg)'
            })
            .style("pointer-events", "none");

        // const defs = svg.append("defs");
        // defs.append("filter")
        //   .attr("id", "solid")
        //   .attr("x", 0)
        //   .attr("y", 0)
        //   .attr("width", 1)
        //   .attr("height", 1)
        //   .append("feFlood")
        //     .attr("flood-color", "white")

        // d3.selectAll('#solid')
        //   .append("feComposite")
        //     .attr("in", "SourceGraphic")
        //     .attr("operator", "xand")
          

        const tooltip = svg.append("g")
          .attr("class", "tooltip")
            .append("text")
              .style("pointer-events", "none")
              .attr('font-size', '1rem')
              .attr("font-family", "century-mono")
              .attr("dy", -10)
              // .attr("filter", "url(#solid)")

        d3.selectAll('.d3-timeline-line').on('mouseover', function(event, d) {
          tooltip.text(d.title)
          .attr('transform', `translate(${event.offsetX},${event.offsetY})`)
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})
          .style("visibility", "visible")

          d3.select(this).selectAll('rect')
            .classed("active", true)
          
          d3.select(this).selectAll('image')
            .classed("active", true)

          d3.select(this).selectAll('text')
            .classed("active", true)

          // d3.selectAll('rect')
          //   .filter(function() {
          //     return !this.classList.contains('active')
          //   })
          //   .transition()
          //   .duration(100)
          //   .ease(d3.easeQuadOut)
          //   .style("opacity", "0")

        }).on('mousemove', function(event, d) {
          tooltip.text(function(){
            if(that.$options.filters.formatDateYear(d.data.date_start) == that.$options.filters.formatDateYear(d.data.date_end)){
              return d.title + ' (' + that.$options.filters.formatDateYear(d.data.date_start) + ')'
            } else if(that.$options.filters.formatDateYear(d.data.date_end) == 2022){
              return d.title + ' (' + that.$options.filters.formatDateYear(d.data.date_start) + '–)'
            } else {
              return d.title + ' (' + that.$options.filters.formatDateYear(d.data.date_start) + '–' + that.$options.filters.formatDateYear(d.data.date_end) + ')'
            }
          })
          .attr('transform', `translate(${event.offsetX},${event.offsetY})`)
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})
        }).on('mouseout', function(event, d){
          tooltip.style("visibility", "hidden")
          // d3.select(this).selectAll('text').style("visibility", "visible")
        }).on('click', function(event, d) {
          that.navigate(event, d)
        });
          
        this.attr.containerHeight = this.attr.computedLines * this.attr.spaceMultiplier - this.attr.margin.top + this.attr.margin.bottom;


    },
    dodge(data, {x0 = d => d, x1 = d => d} = {}) {

      const that = this;


      const lines = data.map((d, i, data) => ({
        x0: x0(d, i, data), 
        x1: x1(d, i, data), 
        index: i,
        title: that.isDe ? d.title_de : d.title,
        // y: this.attr.height - this.attr.margin.bottom - 5 - i*this.attr.spaceMultiplier,
        data: d}))

      var head = null, tail = null;

      var space = 0;

      function intersects(start, end, itemToCompare) {
        let a = itemToCompare;
        while (a) {
          if (a.x0 < end && a.x1 > start) {
            // console.log('intersect')
            return true;
          } else {
            // console.log('no intersect')
          }
          a = a.next;
        }
        return false;
      }
      
      for (let l = 0; l < lines.length; l++) {
        const b = lines[l];
        
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

        this.attr.computedLines = space+1;

        // // Add b to the queue.
        // b.next = null;
        // if (head === null) head = tail = b;
        // else tail = tail.next = b;
      }

      // console.log(lines);
      
      return lines;
    },
    xAxis(g){
      g
      .attr("class", "x-axis")
      .call(d3.axisBottom(this.x).ticks(this.attr.ticks))
      .selectAll('line').remove()

    },
    xAxisBg(g){
      g
      .attr("class", "x-axis-bg")
      .attr("transform", `translate(0,180)`)
      .call(d3.axisBottom(this.x).ticks(this.attr.ticks).tickSize(this.attr.height).tickSizeOuter(0))
      .selectAll('text').remove()
    },
  },
  mounted(){

    this.init(); 
    // this.attr.containerHeight = this.attr.computedLines * this.attr.spaceMultiplier - this.attr.margin.top + this.attr.margin.bottom;
    window.addEventListener('resize', this.init);

  },
  beforeDestroy(){
    window.removeEventListener('resize', this.init);
  }
}
</script>

<style lang="less" scoped>

.graph-outer{
  padding: @space-s 0;
  background-color: @bg-2;
  border-radius: @radius-l;
  position: relative;
}

#d3-timeline{
  margin-left: -@space-s;
  // overflow: hidden;
  position: relative;
  // margin-bottom: 2rem;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    overflow-x:scroll;
    margin-right: -@space-s;
  }
}

#d3-timeline ::v-deep svg{

  position: absolute;
  bottom:0;
  z-index: 0;
  
  .tooltip{
    // background-color: @white;
    pointer-events: none;
  }

  .d3-timeline-line{
    
    line{
      cursor: pointer;
      .animatefast(all);
    }
    line:hover{
      stroke: white !important;
      stroke-width: 32;
    }
    &:hover{
      text{
        fill: transparent;
      }
    }

    @media screen and (max-width: @mq-s) /* Mobile */ {
      text{
        // display: none;
        max-width: 10px;
        overflow: hidden;
      }
    }
  }

  .x-axis-bg{
    .domain{
      stroke:none;
    }
    .tick{
      line{
        // stroke: none;
      stroke: @white;
      }
      
    }
  }
}

#d3-xaxis{

  position: sticky;
  margin-left: -@space-s;
  z-index: 1;

  bottom: 0px;
  // background-color: @white;

  padding-top: 1rem;
  padding-right: @space-s;
  
  height: auto;
  display: block;
  pointer-events: none;

}

#d3-xaxis ::v-deep svg{ 

  position: relative;
  left:0;
  filter: drop-shadow(0 0 5px @bg);

  .domain{
    stroke:none;
  }
  .tick{
    line{
      stroke: none;
    // stroke: @white;
    }
    text{
      font-family: @f-mono;
      font-size: @fs-s;
    }
  }
}
</style>