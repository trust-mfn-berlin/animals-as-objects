'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var micromarkExtensionWikiLink = require('micromark-extension-wiki-link');
var mdastUtilWikiLink = require('mdast-util-wiki-link');

var warningIssued;

function wikiLinkPlugin() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = this.data();

  // console.log('TESTESTESTSETSTE');

  function add(field, value) {
    // console.log(field, value)
    if (data[field]) data[field].push(value);else data[field] = [value];
  }

  if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
    warningIssued = true;
    console.warn('[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin');
  }

  add('micromarkExtensions', micromarkExtensionWikiLink.syntax(opts));
  add('fromMarkdownExtensions', mdastUtilWikiLink.fromMarkdown(opts));
  add('toMarkdownExtensions', mdastUtilWikiLink.toMarkdown(opts));

  // console.log(data.micromarkExtensions[2].text['91'].tokenize);
}

module.exports = wikiLinkPlugin;
