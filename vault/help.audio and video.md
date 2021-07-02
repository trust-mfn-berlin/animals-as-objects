---
id: 19c92258-91ba-4560-81de-4d8d5ea5f98b
title: Audio and Video
desc: ''
updated: 1623242753891
created: 1621507235329
colour_scheme: 3
---

## How to embed audio

Enter this in your markdown file.

`<sound file="/audio/Sample_audio_elefant.mp3">_Audio caption Elephant doing it's thing 1994_</sound>`

Where the the text `"/audio/Sample_audio_elefant.mp3"` will be the path to your audio file that you copied into the audio folder. Don't forget to put it in between quotes `"`

This will not show in the Dendron preview unfortunately.

Captions for audio should live between `<sound file="/audio/..."> Caption </sound>` tags

## How to embed video

On Youtube,
- Click **Share** -> **Embed**
- Scroll down a bit in this popup window.
- Make sure `Show player controls` is not checked `[ ]`
- Make sure `Enable privacy-enhanced` mode is checked `[✓]`
- Copy and paste the Embed code `<iframe width="...`

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lMMPBNzp0Dg?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

On Vimeo,
- Click the **Share** icon 
- Next to **Embed** Click **+ Show Options**
- Uncheck `Show text link underneath this video` `[ ]`
- Copy and paste the Embed code `<iframe width="...`

<iframe src="https://player.vimeo.com/video/126851289" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

These may not show up properly in the Dendron Preview.
