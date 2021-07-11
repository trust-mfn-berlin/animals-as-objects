---
title: Markdown Editing Checklist
title_de: Markdown Editing Checklist
created: 1622627917398
updated: 1624524387946
id: 59e1cb96-c297-425b-8a8a-1979955cf849
author: SLP
desc: xx
desc_de: xx
short_desc: xx
short_desc_de: xx
tao_type: theme
date_start: ""
date_end: ""
---
Here is what I noted so far, where the postdocs potentially have some inconsistency:

## Images

* `/` in image links `![description](/images/cmw/example.jpg)`
* Images and captions should be wrapped in `<figure>` tags. Captions should be wrapped in `<figcaption>` tags. **IMPORTANT**: these need an **empty line** between them, as below.

```
<figure> 

![Alt text description](/images/cmw/example.jpg)

<figcaption>

_Lorem ipsum whatever caption you want. Can include footnotes and backlinks._

</figcaption>

</figure>
```

- Image series

If you want several images to share a caption inside a figure- you can wrap them in a div with the class 'series' – this way they will display in a row [] [] [] on desktop and in vertical column ≡ on mobile  

```
<figure>

<div class="series">

![Titelseite von Der Zoologische Garten mit Foto von Tier XYZ](/images/cmw/ZG_1933.jpg)

![Titelseite von Der Zoologische Garten mit Foto von Nashorn](/images/cmw/ZG_1961.jpg)

![Titelseite von Der Zoologische Garten mit Foto von Gleitbeutler](/images/cmw/ZG_2015.jpg)

</div>

<figcaption>

_Titelseiten der Zeitschrift_ Der Zoologische Garten _von 1933, 1961 und 2015._

</figcaption>

</figure>
```

* Cover images should be uploaded in the backend with descriptions for accessibility and SEO

## Footnotes

* Footnotes should have semantics removed, and have a number instead.  _Note: In Dendron preview the footnotes may stop functioning correctly for multi-language documents._

```
Here's some text with a citation [^1]
Here's another [^2]

[^1]: Here's the reference
[^2]: And once again
```



## Headings

* Heading levels in the text (only ## and ###). There must be a whitespace between `##` and Heading text: `## Heading`.

## Backlinks

* Backlinks. When necessary to make the text flow better the title can be 'aliased' like so:

[[this will be displayed|material.animals caught in the wild]]

## Special characters

* Escape asterisk character with slash `\*` for DE gendered terms: Besucher\*innen 

## Bilingual content

* Splitting :::EN::: :::DE::: correctly

```
:::EN::: 

English Content must live between these two markers

:::DE:::

Deutsch Kontent must live after :::DE::: marker
```

