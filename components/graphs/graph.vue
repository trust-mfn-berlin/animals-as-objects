// https://github.com/gywgithub/vue-d3-examples/blob/master/src/components/ForceDirectedGraph.vue
// https://www.d3indepth.com/force-layout/
// https://observablehq.com/@d3/force-directed-graph

// Docs
// https://github.com/d3/d3-force#simulation_on

// https://github.com/d3/d3-zoom

  // Variables tester
// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03

<template>
  <div id="d3-main" :style="{height: attr.height + 'px'}" :class="{cssfade : fadein}">
  <!-- <text-button class="refresh" type="button" @click.native="changeGraph">OK</text-button> -->
  </div>
</template>

<script>
import * as d3 from 'd3'
import featuredGraphData from '~/temp/graphdata.json';
var graphData;

if(featuredGraphData.length > 1){

// Change featured graph based on day of the month
var today = new Date(); //Get todays date
var month = today.getMonth();
var year = today.getUTCFullYear();
var date = today.getDate(); //Get it as a number of the month
var thisMonth = new Date(year, month, 0); //Zero is last day in month
var maxDays = thisMonth.getDate(); //Get the max number of days in this month

// console.log( 'day:', date, 'maxDays:', maxDays, 'num features:', featuredGraphData.length);

var daymap = [];
var daytick = 0;

// Assign a featured article to every day this month
for (let d = 1; d <= maxDays; d++) {
  if(daytick < featuredGraphData.length - 1){
    daymap.push(daytick)
    daytick++
  } else {
    daymap.push(daytick)
    daytick = 0;
  }
}

// Make todays date compatible with a zero-based index
const dateZeroed = date-1;

// console.log(daymap, dateZeroed);

// graphData = featuredGraphData[daymap[dateZeroed]]; //Select the featured article based on the day of the month
// graphData = featuredGraphData[3];
const rng = Math.floor(Math.random() * featuredGraphData.length);
graphData = featuredGraphData[rng];

console.log('Random article no', rng);

} else {
  graphData = featuredGraphData[0]; //If there's only one featured article just skip the whole process
}

const title_nodes = [
  {
    slug:"title_as",
    title:"as",
    title_de:"als",
    isText: true,
    lessSpace: true,
  },
  {
    slug:"title_objects",
    title:"Objects?",
    title_de:"Objekte?",
    isText: true,
  },
  {
    slug:"title_animals",
    title:"Animals",
    title_de:"Tiere",
    isText: true,
  },
]

const title_links = [
  {source:"title_animals", target: graphData.nodes[0].slug, value:1, titleLink:true},
  // {source:"title_animals", target: "title_as", value:1, titleLink:true, interTitleLink: true},
  // {source:"title_as", target: "title_objects", value:1, titleLink:true, interTitleLink: true},
  {source:"title_as", target: graphData.nodes[0].slug, value:1, titleLink:true},
  {source:"title_objects", target: graphData.nodes[0].slug, value:1, titleLink:true},
]

graphData.nodes.push(...title_nodes)
graphData.links.push(...title_links)

export default {  
  data () {
    return {
      fadein: false,
      attr : {
        width: 1000,
        height: 1200,
        margin: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        linkDistance:{
          inter: 100,
          title: 310,
          node: 280
        },
        collisionSize:{
          s: 80,
          m: 100,
          l: 120
        },
        verticalOffset: 100,
        nodeSize: 75,
        rootNodeSize: 180,
        storyRadius: 15,
        titleTextSize: 72,
        alphaTarget:{
          drag: 0.3,
          rest: 0.00005
        },
        radialForceStrength: 0,
        yForceStrength: 0.2,
        xForceStrength: 0,
        renderNodeLabels: true
      },
      
    }
  },
  computed:{
    isDe(){
      if(this.$store.getters.siteLanguage == 'de') return true
    },
  },
  methods:{
    navigate(event, d){
      if(this.isDe) {
      this.$router.push('/de/' + d.slug);
      } else {
        this.$router.push('/' + d.slug);
      }
    },
    changeGraph(){
      const that = this;
      this.fadein = false;
      setTimeout(function(){ 
        d3.select("#d3-main").select("svg").remove();
        graphData = featuredGraphData[0];
        graphData.nodes.push(...title_nodes);
        graphData.links.push(...title_links);
        that.init();
        that.fadein = true;
      }, 500);
    },
    mediaQuery(){
      
      if(window){

        console.log('nodes:', graphData.nodes.length);
        console.log(window.innerWidth , 'px wide');

        this.attr.width = window.innerWidth;

        

        // For mobile
        if(window.innerWidth < 501){
        console.log('Graph Mobile');

          this.attr.height = 550;
          // Center force vertical offset
          this.attr.verticalOffset = 0;


          this.attr.nodeSize = 30;
          this.attr.rootNodeSize = 72;

          this.attr.linkDistance ={
            inter: 30,
            title: 50,
            node: 70
          }

          this.attr.collisionSize = {
            s: 48,
            m: 40,
            l: 48 //title text
          }
          
          // Rounded corners
          this.attr.storyRadius = 9;

          // Font size
          this.attr.titleTextSize = 40;

          // Portrait boundary forces instead of landscape
          this.attr.radialForceStrength = 1;
          this.attr.yForceStrength = 0;
          this.attr.xForceStrength = 0.05;


          // if big graph
          if(graphData.nodes.length > 20){
            this.attr.renderNodeLabels = false;
            console.log('Graph Mobile Many Nodes');
            this.attr.nodeSize = 30;

            this.attr.linkDistance = {
              inter: 5,
              title: 15,
              node: 8
            }

            this.attr.collisionSize = {
              s: 8,
              m: 8,
              l: 50 //title text
            }
          }

        } else if (window.innerWidth > 501 && window.innerWidth < 1280) {
          console.log('Graph Small Desktop');
          this.attr.height = window.innerHeight;
          this.attr.verticalOffset = 100;
          this.attr.renderNodeLabels = true;
          this.attr.nodeSize = 30;
          this.attr.rootNodeSize = 50;

          this.attr.linkDistance = {
              inter: 100,
              title: 100,
              node: 300
            }
  
          this.attr.collisionSize = {
            s: 60,
            m: 60,
            l: 70
          }
          
          // Rounded corners
          this.attr.storyRadius = 9;

          // Font size
          this.attr.titleTextSize = 50;

          this.attr.yForceStrength = 0.1;
          
        } else {
          this.attr.height = window.innerHeight;
          this.attr.verticalOffset = 100;
          this.attr.renderNodeLabels = true;

          // if big graph
          if(graphData.nodes.length > 35){
            console.log('Graph Desktop Many Nodes');
            this.attr.nodeSize = 50;

            this.attr.collisionSize = {
              s: 60,
              m: 80,
              l: 100
            }
          }
        }
      }
    },
    resize(){
      d3.select("#d3-main").select("svg").remove();
      this.init();
    },
    init(){

      console.log('Articles:', featuredGraphData.length);
      
      this.mediaQuery();


      const that = this;
      const svg = d3
        .select("#d3-main")
        .append("svg")
        .attr("width", this.attr.width)
        .attr("height", this.attr.height); 

      const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.slug).distance(function(d) {if(d.interTitleLink){ return that.attr.linkDistance.inter} else if(d.titleLink){ return that.attr.linkDistance.title }else {return that.attr.linkDistance.node}}))
        .force("charge", d3.forceManyBody().strength(function(d){if (d.index === 0){ return -6000 } else { return -600}}).distanceMin(1).distanceMax(500))
        .force("center", d3.forceCenter(this.attr.width / 2, this.attr.height / 2 - this.attr.verticalOffset))
        .force("radial", d3.forceRadial(this.attr.width * 0.5).strength(0))
        .force("collide", d3.forceCollide(function(d){
          if(d.lessSpace){
            return that.attr.collisionSize.s
          } else if(d.isText){
            return that.attr.collisionSize.l
          } else {
            return that.attr.collisionSize.m
          }
        }).strength(0.3))
        .force("y0", d3.forceY(this.attr.height + 20).strength(this.attr.yForceStrength)) //bounds bottom
        .force("y1", d3.forceY(-20).strength(this.attr.yForceStrength)) //bounds bottom
        .force("x0", d3.forceX(this.attr.width + 80).strength(this.attr.xForceStrength)) //bounds left
        .force("x1", d3.forceX(-80).strength(this.attr.xForceStrength)) //bounds right

      const link = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 1)
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("stroke-width", d => d.value);

      const node = svg.append("g")
        .attr('class', 'nodeparent')
        .selectAll("rect")
        .data(graphData.nodes)
        .enter()
        .append('g')
        .attr('class', function(d){
          if(d.isText) {
            return 'nodechild title'
          } else {
            return 'nodechild'
          }
        })
        .attr('id', function(d) {
          return d.slug
        })
        .call(this.drag(simulation))
      
        

        node.append("rect")
          .attr('x', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize*-0.5
            } else if(d.isText){
              if(that.isDe){
                return (d.title_de.length * that.attr.titleTextSize*0.74)* -0.5
              }
              return (d.title.length * that.attr.titleTextSize*0.74)* -0.5
            } else {
              return that.attr.nodeSize*-0.5
            }
          })
          .attr('y', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize*-0.5
            } else if (d.isText){
              return that.attr.titleTextSize *-0.5 - 3
            } else {
              return that.attr.nodeSize*-0.5
            }
          })
          .attr('width', function (d, i) {
            if(d.index === 0){
              return that.attr.rootNodeSize
            } else if(d.isText) {
              if(that.isDe){
                return d.title_de.length * that.attr.titleTextSize*0.74
              }
              return d.title.length * that.attr.titleTextSize*0.74
            } else {
              return that.attr.nodeSize
            }
          })
          .attr('height', function (d, i) {
            if(d.index === 0){
              return that.attr.rootNodeSize
            } else if(d.isText){
              return that.attr.titleTextSize*1.4
            } else {
              return that.attr.nodeSize
            }
          })
          .attr('fill', function (d, i) {
            if(d.isText == true){
              return '#000'
            } else {
              // return colorScale(i)
              // console.log(d.colour_scheme);
              return 'var(--scheme-'+ d.colour_scheme +'-bg)'
            }
            
          })
          .attr('rx', function (d, i) {
            if(d.isText == true){
              return that.attr.titleTextSize * 0.3;
            } else if (d.tao_type == 'material'){
              return 500
            } else if (d.tao_type == 'story'){
              return 20
            } else if (d.tao_type == 'theme'){
              return 0
            }
          })

        node.append("image")
          .attr("xlink:href", function(d, i){
            if(i % 3 != 0 || i === 0) // Skip every third image 
            if (d.cover_image && d.cover_image.image){
              return d.cover_image.image.replace('/images/','/thumbnails/l/');
            }
          })
          .attr('x', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize * -0.5
            } else {
              return that.attr.nodeSize * -0.5
            }
          })
          .attr('y', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize * -0.5
            } else {
              return that.attr.nodeSize * -0.5
            }
          })
          .attr('width', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize
            } else {
              return that.attr.nodeSize
            }
          })
          .attr('height', function(d , i){
            if(d.index === 0){
              return that.attr.rootNodeSize
            } else {
              return that.attr.nodeSize
            }
          })
          .attr("clip-path", function(d){
            if(d.index === 0){
              if(d.tao_type == 'story') return "url(#story-clip-big)"
              if(d.tao_type == 'material') return "url(#material-clip-big)"
              if(d.tao_type == 'theme') return "url(#theme-clip-big)"
            } else {
              if(d.tao_type == 'story') return "url(#story-clip)"
              if(d.tao_type == 'material') return "url(#material-clip)"
              if(d.tao_type == 'theme') return "url(#theme-clip)"
            }
          })

        node.append("text")
          .attr("dy", function(d){
            if(d.index === 0){
              return that.attr.rootNodeSize*0.8 + 'px'
            } else if(d.isText){
              return that.attr.titleTextSize*0.555 - 5 + 'px'
              // return "0px"
            } else {
              return that.attr.nodeSize + 'px'
            }
          })
          .attr("font-family", "century-mono")
          .attr('font-size', function (d, i) {
            if(d.isText == true){
              return that.attr.titleTextSize + 'px'
            }
            return '0.5rem'
          })
          .attr('fill', function (d, i) {
            if(d.isText == true){
              return '#fff'
            }
            return '#000'
          })
          .text(function(d) { 
            if(that.isDe){
              return d.title_de
            }
            if(d.isText || d.index === 0){
              return d.title
            }
            if(that.attr.renderNodeLabels != false){
              return d.title 
            }
            })
          .attr("dx", function(d) { return this.getBoundingClientRect().width/2*-1})

        const defs = svg.append("defs");
        defs.append("clipPath")
          .attr("id", "material-clip")
          .append("rect")
          .attr("x", this.attr.nodeSize*-0.5)
          .attr("y", this.attr.nodeSize*-0.5)
          .attr("width", this.attr.nodeSize)
          .attr("height", this.attr.nodeSize)
          .attr("rx", this.attr.nodeSize)
        
        defs.append("clipPath")
          .attr("id", "story-clip")
          .append("rect")
          .attr("x", this.attr.nodeSize*-0.5)
          .attr("y", this.attr.nodeSize*-0.5)
          .attr("width", this.attr.nodeSize)
          .attr("height", this.attr.nodeSize)
          .attr("rx", this.attr.storyRadius)

        defs.append("clipPath")
          .attr("id", "theme-clip")
          .append("rect")
          .attr("x", this.attr.nodeSize*-0.5)
          .attr("y", this.attr.nodeSize*-0.5)
          .attr("width", this.attr.nodeSize)
          .attr("height", this.attr.nodeSize)

        defs.append("clipPath")
          .attr("id", "material-clip-big")
          .append("rect")
          .attr("x", this.attr.rootNodeSize*-0.5)
          .attr("y", this.attr.rootNodeSize*-0.5)
          .attr("width", this.attr.rootNodeSize)
          .attr("height", this.attr.rootNodeSize)
          .attr("rx", this.attr.rootNodeSize)
        
        defs.append("clipPath")
          .attr("id", "story-clip-big")
          .append("rect")
          .attr("x", this.attr.rootNodeSize*-0.5)
          .attr("y", this.attr.rootNodeSize*-0.5)
          .attr("width", this.attr.rootNodeSize)
          .attr("height", this.attr.rootNodeSize)
          .attr("rx", this.attr.storyRadius)

        defs.append("clipPath")
          .attr("id", "theme-clip-big")
          .append("rect")
          .attr("x", this.attr.rootNodeSize*-0.5)
          .attr("y", this.attr.rootNodeSize*-0.5)
          .attr("width", this.attr.rootNodeSize)
          .attr("height", this.attr.rootNodeSize)

        node.on('mouseover', function(event, d) {

          svg.selectAll('.nodeparent g').sort(function (a, b) { // select the parent and sort the path's
            if(a.isText) return 1;
            
            if (a.slug != d.slug) {
              return -1; // a is not the hovered element, send "a" to the back
            }
            else {
              return 2; // a is the hovered element, bring "a" to the front
            }
          });

          d3.select(this).selectAll('rect')
            .transition()
            .duration(150)
            .ease(d3.easeQuadOut)
            .attr("transform", function(d){
              if(!d.isText) return "scale(1.5)"
            })

          d3.select(this).selectAll('image')
            .transition()
            .duration(150)
            .ease(d3.easeQuadOut)
            .attr("transform", function(d){
              if(!d.isText) return "scale(1.5)"
            })

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

          if(d.isText){return}

          // link.style('stroke', "transparent");

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

          d3.selectAll('rect')
            .filter(function() {
              return !this.classList.contains('active')
            })
            .transition()
            .duration(100)
            .ease(d3.easeQuadOut)
            .attr("fill", "#FFFFFF")


          d3.selectAll('image')
            .filter(function() {
              return !this.classList.contains('active')
            })
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .style("opacity", "0")

          d3.selectAll('text')
            .filter(function() {
              return !this.classList.contains('active')
            })
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .style("opacity", "0")

          

          setTimeout(function(){ that.navigate(event, d) }, 700);
          
        })

        

        // Set the stroke width back to normal when mouse leaves the node.
        node.on('mouseout', function() {
          
          d3.select(this).selectAll('rect')
            .transition()
            .duration(100)
            .ease(d3.easeQuadOut)
            .attr("transform", "scale(1)")
          
          d3.select(this).selectAll('image')
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
      const that = this;
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(that.attr.alphaTarget.drag).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(that.attr.alphaTarget.rest);
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
    this.fadein = true;
    // window.addEventListener('resize', this.resize);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.resize);
  }
}
</script>
<style lang="less" scoped>
#d3-main{
  position: fixed;
  top:0;
  // margin-top: -8rem;
  max-width: 100vw;
  overflow: hidden;

  opacity:0;
  .animateslowest(opacity);

  &.cssfade{
    opacity: 1;
  }

}

::v-deep svg{
  // background-color: red;
  // Fucks up performance
  // -webkit-filter: drop-shadow( 0px 4px 10px rgba(0, 0, 0, 0.05));
  .nodechild{
    cursor: pointer;
    // -webkit-filter: drop-shadow( 0px 4px 10px rgba(0, 0, 0, 0.05));
    &.title{
      cursor: grab;
      // -webkit-filter: drop-shadow( 0px 4px 10px rgba(0, 0, 0, 0.05));
    }
    // &:hover{
    //   -webkit-filter: drop-shadow( 0px 4px 10px rgba(0, 0, 0, 0.5));
    // }
  }
}

.refresh{
  position: absolute;
  top:1rem;
  right:1rem;
}

</style>
