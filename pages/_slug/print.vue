<template>
  <div class="article-container">
    <div id="header">
      <h1>Header</h1>
    </div>
    <hgroup class="heading">
      <h1>{{article.title}}</h1>
    </hgroup>
    <div class="article-inner">
    <main v-if="article">
      <nuxt-content id="articlebody" :document="article" :class="article.tao_type" ref="articlebody"/>
    </main>
    <aside>
      <ul>
        <li v-if="article.tao_type">Article type: {{article.tao_type}}</li>
        <li v-if="article.author">Author: {{article.author}}</li>
        <li v-if="article.translator">Translated by: {{article.translator}}</li>
        <li v-if="article.license">Text license: {{article.license}}</li>
        <li v-if="article.doi">DOI: {{article.doi}}</li>
        <li v-if="article.updatedAt">Last updated: {{article.updatedAt}}</li>
      </ul>
    </aside>
    </div>
    <div id="footer">
      <h1>Footer</h1>
    </div>
  </div>
</template>

<script>

export default {
  name:'article-page-print',
  layout:'print',
  data(){
    return{
    }
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
  head() {
    return {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Animals as Objects? ' + this.article.title + ' by ' + this.article.author
    };
  },
};
</script>

<style lang="less" scoped>


// Vars

@article-width:132mm;
@fs-print: 14px;

// Components

::v-deep .wiki-link-component{
  bottom:0;
  
  img{
    display: none;
  }
  span.text{
    height: auto ;
    padding: 3px 5px 2px 5px;
    border:1px solid black !important;
    color:@black !important;
    background-color: transparent !important;
    box-shadow: none ;
    margin:0 2px;
    span{
      font-size: @fs-print * 0.75;
    }
  }
}

// Primary Layout

.article-container{

}

.article-inner{
  display:flex;
}

main{
  font-size:@fs-print;
  width: @article-width;
  margin: 0;
  &.open{
    margin: 0;
  }
}

// Aside

aside{
  .f-mono();
  font-size: @fs-print * 0.75;
  margin-left: 5mm;
  ul{
    padding-left: 0.5rem;
    border-left: 1px solid @black;

    li{
      margin-bottom: 5px;
    }
  }
}

// Typography

hgroup.heading{
  text-align: center;
  margin: 2rem auto;

  h1{
    font-size: @fs-print * 2.5;
    margin-bottom: 1rem;
    line-height: @lh-short;

    background-size: 1px 1em;
    display: inline;

    border-bottom: 1px solid @black;

    // text-shadow:
    //   -2px -2px @bg,
    //   -2px 2px @bg,
    //   2px -2px @bg,
    //   2px 2px @bg;
  }

  .lead.subheading{
  text-align: center;
  margin:2rem 0 3rem;
    .type{
      background-color: var(--current-scheme-bg);
      color: var(--current-scheme-fg);
      padding:@space-xs 10px;
      // background-color: @black;
      // color: @white;
      &.theme{

      }
      &.material{
        border-radius: @radius-max;
      }
      &.story{
        border-radius: @radius-s;
      }
    }

  }
}

p{
  line-height: @lh-default;
}



h2{
  font-size: @fs-print * 1.5;
  margin-bottom: @space-s;
  margin-top: 2rem;
}

blockquote{
  margin: 2.5rem auto;
  width: 90%;
}

// Footnotes

.nuxt-content{
  &.story{
    a.footnote-ref{
      border-radius: @radius-m;
    } 
  }

  &.theme{

  }

  &.material{
    a.footnote-ref{
      border-radius: @radius-max;
    }
  }

  .footnotes{
    margin-top: 1rem;
    &::before{
      content: 'Footnotes';
    }
    hr{
      display: none;
    }
    ol{
      margin-top: 0.5rem;
    }
    li{
      // .f-mono();
      font-size: @fs-print * 0.75;
      list-style-type: decimal;
      margin-left: 10px;
      padding-left: 5px;
      margin-bottom: 5px;

      a{
        text-decoration: underline;
      }
    }
    // display: none;
  }
}

sup{

  font-size: @fs-print * 0.75;
  border-bottom: 1px solid @black;


}

figcaption{
  font-size: @fs-print * 0.6;
  sup{
    
  }
}

// Images

figure{
  margin: 0 auto 2rem auto;
  max-width: 100%;
  width: fit-content;

  img{
    max-width: @article-width;
    // max-height: 1200px;
  }

  p{
    width: max-content;
    margin: 0;
    line-height: 1.2;
  }

  div.series{
    display: flex;
    align-items: center;
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
    margin-top:2mm;
    display: flex;
    p{
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
          color: @black !important;
          .subheading{
            font-size:@fs-print * 0.6;
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