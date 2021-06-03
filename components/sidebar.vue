<template>
  <aside>
    <section id="section-details">
      <h3 class="f-mono subheading">Details</h3>
      <ul>
        <li>Article type: <span>{{article.tao_type}}</span></li>
        <li>Author: <span>{{article.author}}</span></li>
        <li>Text License: <span>{{article.license}}</span></li>
        <li>DOI: <span>{{article.id}}</span></li>
        <li>Last updated: <span>{{article.updatedAt}}</span></li>
      </ul>
      <div class="button-array">
        <text-button linkto="">Download PDF</text-button>
        <text-button linkto="">Cite this Article</text-button>
      </div>
    </section>
    <section id="section-toc" v-if="article.toc.length > 0">
      <h3 class="f-mono subheading">Table of Contents</h3>  
      <ol>
        <li v-for="link in article.toc" :key="link.id">
          <a :href="'#'+link.id">{{link.text}}</a>
        </li>
      </ol>
    </section>
    <section id="section-backlinks" v-if="article.backlinks.length > 0">
      <h3 class="f-mono subheading">Pages that link here</h3>  
      <ol>
        <li v-for="link in article.backlinks" :key="link.id">
          <a :href="'/'+link">{{link}}</a>
        </li>
      </ol>
    </section>
    <section id="section-routes">
      <h3 class="f-mono subheading">This page appears in these Curated Routes</h3>  
    </section>
    <section id="section-footnotes">
      <h3 class="f-mono subheading">Footnotes</h3>  
    </section>
  </aside>
</template>

<script>
export default {
  name:'sidebar',
  props:{
    article:{
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
aside{
  display: block;
  position: fixed;
  width: 33vw;
  height: 100%;
  background-color: @white;
  top:0;
  right: 0;
  // padding: @space-m 0;
  z-index: @z-sidebar;

  overflow:auto;

  section{
    border-bottom: 1px solid grey;
    padding: @space-m;

    &#section-details{
      ul{
        margin: 1rem 0;
      }
    }
  }
}
</style>