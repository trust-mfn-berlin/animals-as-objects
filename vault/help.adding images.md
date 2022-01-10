---
title: Adding Images
title_de: Adding Images
created: 1618495642535
updated: 1641483495506
id: ba7e639c-51d0-499d-a3f0-55ee838d64b3
author: Son La
desc: Adding Images
desc_de: Adding Images
short_desc: TEST
short_desc_de: TEST
colour_scheme: 8
tao_type: material
date_start: ""
date_end: ""
published: false
archived: true
---

## Images inside articles

To add a local image, copy your image file to the *Animals as Objects* repository dendron images folder `/vault/images`. Then put the relative path of the image into the curved brackets `![](here)`.

The format is as follows:

<figure>

`![Optional text description](/images/example/hippo.jpg)`

<figcaption>

_Hier ist eine Bildunterschrift._

</figcaption>

</figure>

![Alt text description](/images/example/hippo.jpg)

You can also enter a remote URL instead of a local image. This maybe be useful temporarily, but ultimately should be replaced with a local image when publishing.

`![I'm a remote image!](https://images.metmuseum.org/CRDImages/eg/original/23.3.6_front.jpg)`

![I'm a remote image!](https://images.metmuseum.org/CRDImages/eg/original/23.3.6_front.jpg)

*Note: An easy way to get image paths in VSCode is to right-click the image and select `Copy Relative Path`. You can then paste that into the curved brackets `![](here)`.*

*Note: Text descriptions are optional, but they are very useful for accessibility so should be added whenever possible.*

## Cover image

Should be done in the Netlify CMS. 
https://content-creation.animalsasobjects.org/admin


## Adding audio and video

Video should be handled as external URLs. Youtube / Vimeo. Audio files hosted here. See [[help.audio and video]].



Test

![Test](/images/caspar_david_friedrich_-_the_grosse_gehege_near_dresden_-_google_art_project.jpg "Caspar David Friedrich Dresden")