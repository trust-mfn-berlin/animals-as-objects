// https://css-tricks.com/how-to-modify-nodes-in-an-abstract-syntax-tree/

const visit = require('unist-util-visit');

module.exports = options => tree => {
  // console.log(tree);
  visit(
    tree,
    node =>
      node.tagName === 'img' ,
    node => {
      console.log(node)
      node.tagName = 'nuxt-img'
      // node.properties.width = options.width
      // node.properties.fit = options.fit
      node.properties.quality = options.quality
    }
  );
};