---
id: ac5d5dff-790a-460f-b936-be5aa19c233a
title: File Structure
desc: ''
updated: 1618486890340
created: 1618405159823
---

## Filename
The filename will determine the URL on the live site. So it's important to choose a reasonable length name without any unusual characters in it, so no `ü`, `ö`, `:` or `%`. This should also be in English. Don't worry though- we can always rename the file. To read about renaming files, view [[help.dendron commands]]

## Frontmatter

![Frontmatter](/images/help/interface/editor-frontmatter.jpg)

At the beginning of the file, we have a collection of fields that contain meta-information about our file. This "Frontmatter" is wrapped inside the `---` dividers present at the top and bottom of this section. The contents of these fields can be edited later in the CMS. **Important: Do not insert any new line breaks or move the dividers `---` here, or the file won't be readable by the CMS**

|Field name|Description|
|----------|-----------|
|`title`     |the English title of the article. This will NOT be the URL. It will be the displayed title and can have any type of character in it. So `ü` and `ö` are okay here.|
|`title_de`  |the German title of the article. |
|`desc`      |the English description of the article. Should be 50-100 words|
|`desc_de`   |the German description of the article.|
|`author`   |Name of author(s)|
|`published` |either `true` or `false`. Determines whether the page will be visible on the site or not.|
|`license`   |License code for the text content i.e. `CC BY-SA`|
|`cover_image`|The path to a cover image for the page i.e. `/images/example.jpg`

The other fields shouldn't be changed.

## Body

![Body](/images/help/interface/editor-body.jpg)

Everything after the frontmatter of the file is considered the body of the file. This is where we will write the content. We have special separators to split the content of the page into english and german.

```
:::EN:::

English content lives here!

:::DE:::

German content lives here!
```