const wikiLinkRegex = /\[\[(.*?)\]\]/g;
const wikiLinkComponentName = 'wikilink'

function wikiLinkReplacer(match) {
  return '<'+wikiLinkComponentName+'>'+match+'</'+wikiLinkComponentName+'>'
}

export {wikiLinkComponentName, wikiLinkRegex, wikiLinkReplacer}