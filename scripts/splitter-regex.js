const languageSplitterRegex = /:::(.*):::(.*):::(.*):::(.*)/s;
const frontMatterRegex = /---(.*?)---/sg;

export {frontMatterRegex, languageSplitterRegex}