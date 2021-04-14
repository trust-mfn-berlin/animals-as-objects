---
id: 8e923c6e-cfee-4c70-9f52-646f66dc05e4
title: Markdown Guide
desc: ''
updated: 1618411046245
created: 1618396638023
---

## Adding images

To add a local image, copy your image file to the _Animals as Objects_ repository dendron images folder `/vault/images`. Then put the relative path of the image into the curved brackets `![](here)`. 

The format is as follows:

`![Optional text description](/images/example/hippo.jpg)`

![Alt text description](/images/example/hippo.jpg)

You can also enter a remote URL instead of a local image. This maybe be useful temporarily, but ultimately should be replaced with a local image when publishing.

`![I'm a remote image!](https://images.metmuseum.org/CRDImages/eg/original/23.3.6_front.jpg)`

![I'm a remote image!](https://images.metmuseum.org/CRDImages/eg/original/23.3.6_front.jpg)

_Note: An easy way to get image paths in VSCode is to right-click the image and select `Copy Relative Path`. You can then paste that into the curved brackets `![](here)`._

_Note: Text descriptions are optional, but they are very useful for accessibility so should be added whenever possible._

https://www.markdownguide.org/basic-syntax/#lists-1