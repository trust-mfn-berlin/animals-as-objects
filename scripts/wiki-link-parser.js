const wikiLinkRegex = /\[\[(.*?)\]\]/g;
const wikiLinkComponentName = 'wikilink'

const aliasSplitterRegex = /\[\[(.*)\|(.*)\]\]/;

function wikiLinkReplacer(match) {
  const hasAlias = match.match(aliasSplitterRegex)
  if(!hasAlias){
    return `<${wikiLinkComponentName} link="${match.slice(2, -2)}"></${wikiLinkComponentName}>`
  } else {
    return `<${wikiLinkComponentName} link="${hasAlias[2]}" alias="${hasAlias[1]}"></${wikiLinkComponentName}>`
  }
}

export {wikiLinkComponentName, wikiLinkRegex, wikiLinkReplacer}