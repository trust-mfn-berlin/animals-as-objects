<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <hgroup class="heading article-header" :style="{background:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <div class="heading-inner"><h1>{{article.title}}</h1>
      <h3 class="lead subheading f-mono">
        <span class="type" :class="article.tao_type" >{{article.tao_type}}</span>
        <span v-if="article.short_desc">{{article.short_desc}}</span>
        <span v-else>I need a short description!</span>
      </h3>
      </div>
    </hgroup>

    <section>
      <nuxt-content id="articlebody" :document="article" :class="article.tao_type" ref="articlebody"/>
    </section>  

    <section id="license">
      <article-license-footer :license="article.license"/>
    </section>  
    
    <section id="article-routes">
      <article-routes/>
    </section>

    
  </main>
  <sidebar :article="article" :footnotes="footnotes" :activeFootnote="activeFootnote"/>
  </div>
</template>

<script>

export default {
  name:'article-page',
  layout:'article',
  data(){
    return{
      footnotes:"",
      activeFootnote:""
    }
  },
  methods:{
    addFootnoteListener(){
      const footnotes = document.getElementsByClassName('footnote-ref');
      const that = this;

      for (let i = 0; i < footnotes.length; i++) {
        const footnote = footnotes[i];

        footnote.addEventListener("click", function(e){
          // console.log(e);
          e.preventDefault();
          that.onFootnoteClick(footnote.hash);
        })
        
      }

    },
    removeEventListeners(){
      // console.log('destroy');
      const footnotes = document.getElementsByClassName('footnote-ref');
      const that = this;
      for (let i = 0; i < footnotes.length; i++) {
        const footnote = footnotes[i];
        footnote.removeEventListener("click", function(){
          that.onFootnoteClick(footnote.hash)
        })
      }
    },
    onFootnoteClick(hash){
      if(!this.$store.getters.isSidebarOpen) this.$store.commit('toggleSidebar', true)
      this.activeFootnote = hash.replace('#','sidebar-')
      // console.log(hash)
    }

  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },
  },
  created(){
    // make sure correct language
    this.$store.commit('setSiteLanguage', 'en')
    // set current tao-type in store
    this.$store.commit('setArticleTaoType', this.article.tao_type);
  },
  mounted(){

    // update colour scheme
    document.documentElement.style.setProperty("--current-scheme-bg", "var(--scheme-"+this.article.colour_scheme+"-bg)");
    document.documentElement.style.setProperty("--current-scheme-fg", "var(--scheme-"+this.article.colour_scheme+"-fg)");

    // copy footnotes into sidebar
    if(document.getElementsByClassName('footnotes')[0]){
      this.footnotes = document.getElementsByClassName('footnotes')[0].innerHTML;
    }

    // remove footnotes from dom(?) 
    // document.getElementsByClassName('footnotes')[0].remove()

    this.addFootnoteListener();
    
    
  },
  beforeDestroy(){
    this.removeEventListeners();
  },
  async asyncData({ $content, params, error, payload }) {
    var article = {};

    // console.log(payload);

    if(payload){
      article = await payload
      // console.log('PAYLOAD', article);
      return { article }
    } else {
      // console.log('no payload, fetching fresh data')
    try {
      const data = await $content(params.slug).fetch();
      article = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      article,
    };
    }
  },
};
</script>

<style lang="less" scoped>

// Vars

@article-width:calc(90vw - 20rem - @space-s);
@article-width-mobile:calc(100% - @space-s*2);
@container-width-open: calc(100vw - 20rem);

@article-max-width: 1000px;

// Primary Layout

.article-container{

}

main{

  // max-width: 100vw;
  // width: calc(100% - @space-s);
  width: 100%;
  overflow-x:hidden;

  .animateslow(width);
  
  
  section{
    width: @article-width;
    max-width: @article-max-width;
    margin: 0 auto;

    @media screen and (max-width: @mq-s) /* Mobile */ {
      width: @article-width-mobile;
    }
  }
  &.open{

    width: @container-width-open;
    // margin: 0 auto;
    
    hgroup{
      .heading-inner{
        // width: @article-width;
        margin-right: auto;
      }
    }


    figure{
      img{
        max-width: calc(90vw - 20rem - @space-s);

        @media screen and (max-width: @mq-s) /* Mobile */ {
          max-width: @article-width-mobile;
        }
      }
    }
    
    #articlebody figure:first-child{

      width: @article-max-width;
      img{
        max-width: 100% !important;
      }
      
    }
    

    
  }
}

// Typography



// There are pop-in issues because scheme-bg is set on mounted hook.
// Maybe it could be set during Generate somehow? 
hgroup.heading{

  .lead.subheading{
    .type{
      background-color: var(--current-scheme-fg);
      color: var(--current-scheme-bg);
      padding:@space-xs 10px;

      &.material{
        border-radius: @radius-max;
      }
      &.story{
        border-radius: @radius-s;
      }
    }

  }
}

#articlebody {
  p:first-child{
    margin-top: 2rem;
  }
}


p{
  line-height: @lh-long;
}

h2{
  margin-bottom: @space-s;
  margin-top: 4rem;
}

blockquote{
  margin: 2.5rem auto;
  width: 90%;
}

// Footnotes

.nuxt-content{
  &.story{
    a.footnote-ref{
      // border-radius: @radius-m;
    } 
  }

  &.theme{

  }

  &.material{
    a.footnote-ref{
      // border-radius: @radius-max;
    }
  }

  .footnotes{
    display: none;
  }
}

sup{

  display: inline-block;
  // margin: 0 @space-xs;
  font-family: @f-mono;
  // color: var(--current-scheme-fg);
  // background-color: var(--current-scheme-bg);
  // position: relative;
  // top:1.33333rem;
  
  a.footnote-ref{
    // padding:0.37rem 0.4rem 0;
    // height: 1.33333rem;
    // background-color: @bg;
    padding: 0.1rem;
    border-bottom: 1px solid grey;
    font-size: @fs-s;
    // background-color: white;
    // border:1px solid @bg-2;
    // box-shadow: @shadow-small;

    .animatefast(all);
    &:hover{
      // border:1px solid @white;
      // background-color: @white;
      // box-shadow: @shadow-small-hover;
    }
  }

}

figcaption{
  sup{
    display: inline;
    top:unset;
    margin:0;
    a.footnote-ref{
      margin: 0;
      padding: 0 4px;
      font-size: inherit;
    }
  }
}

// Images



#articlebody figure:first-child{
  position: relative;

  width: @article-max-width;
  margin-top:0;

  p{
    position: relative;
    line-height: 0;
    margin-top: 0;  
  }
  p::before{
    content:'';
    position: absolute;
    background-color: var(--current-scheme-bg);
    // background-color: inherit;
    // background-color: red;
    height: 100%;
    top:0;
    left:-100vw;
    width: 200vw;
    z-index: -99;
  }

  figcaption p::before{
    content: unset;
    background-color: blue;
  }

}

figure{
  margin: 5rem auto;
  max-width: @article-width;
  width: fit-content;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    max-width: @article-width-mobile;
  }
  // Fucking.. markdown wraps everything in a P tag!
  p{
    max-width: 100%;
  }
  img{
    max-width: 100%;
    max-height: 1000px;
  }


  p{
    width: max-content;
    margin: 0;
    line-height: 1.2;
  }

  div.series{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    // width: calc(60vw + 4rem);
    width: 100%;
    // transform: translateX(-2rem);
    p{
      flex-grow: 1;
      margin: 0 0.25rem;
    }
    img{
      // width: 30%;
      width: 100%;
    }

    @media screen  and (min-width: @mq-xs) and (max-width: @mq-m) /* Tablet Portrait */ {
      flex-direction: column;
    }
  }

  figcaption{
    // max-width: max-content;
    margin-top:@space-s;
    display: flex;
    p{
      margin-top:0 !important;
      line-height: @lh-short !important;
      flex-grow: 1;
      width: 0;
    }

    ::v-deep span.wiki-link-component{
      bottom:0;
      a{
        border-bottom: none;
        img{
          display: none;
        }
        .text{
          box-shadow: none;
          border-radius: 0;
          margin: 0;
          height: auto !important;
          padding: 0 !important;
          .subheading{
            font-size:@fs-xs;
          }
        }
      }
    }
  }
}

// Remove margin for images following headings

h2+figure {
  margin-top: 0rem;
}

// Audio

.audio-container{
  display: block;
  width: 50%;
  margin: 5rem auto;
}

// Video

iframe{
  display: block;
  width: 100%;
  min-height: 20rem;
  margin: 5rem auto;
}

</style>