---
title: Content Management
title_de: Content Management
created: 1620129568099
updated: 1623742320747
id: 55fcb7a1-c62e-4485-9c53-cec9c0094c94
desc: test
desc_de: test
published: true
colour_scheme: 12
---
## Reviews

1. Authors copy their own markdown texts into a google doc
    - Add images back in from preview "view in browser", if they want.
2. Editors and other authors comment and edit in the google doc (track changes); 1 person takes the lead as primary reviewer per author for a more in-depth comment
    - Webeditor (WE = Therese) does formal edits
        - check markdown and styleguide
        - enter image descriptions
        - show missing 'desc' for summary box
        - add in option for dates at the top
        - check use of backlinks
3. All meet for thorough text workshop
    - start with author talking about some of their intentions, potentially any changes since last discussion, and open questions
    - in depth comment by primary reviewer, shorter comments by the others
    - discussion
4. Authors work in changes
5. Reviewers read and comment on edited texts to give feedback on the changes
6. Authors deliver finalized google docs

## Translations, DOIs, CM

1. WE does pre-translation check on the finalized google docs
    - check markdown and style guide
    - check footnote style, and edit them to be consecutively numbered
    - check image descriptions and captions
    - check 'desc' for summary box
    - check for 2-5 word desc
    - check titles for length and changes
        - if titles changed, potentially change note title in Dendron as well to match
    - check backlinks:
        - take out backlinks to notes that will not be written
        - change titles of backlinks where the title has changes
    - check attached dates
    - take out any comments to each other
    - add in any necessary comments for the translators
    - send docs to translators in Word

2. Receive corrected and translated texts
    - WE adds in nec. markdown notation, and checks for completeness of all dendron fields and image descriptions, etc.
    - match new language to style guide
    - Then send to authors and editors for review and release of the corrected and translated texts
        - ask authors to designate title image

3. WE enters corrected and translated texts into Dendron once okayed by authors
    - go via online markdown editor https://stackedit.io/app# first, then enter into Dendron
    - for German notes that have EN title for the first time, change note title, and then check for any alt-name-backlink synchronization issues
    - check preview for any problems
    - keep authors out of dendron, to avoid synchronization problems
    - enter Netlify fields:
        - doi (see below)
        - translator name (pick correct direction)
        - 2-5 word short descriptions
        - optional start and end dates
    - select title images with description
    - check frontend for problems last
        - desktop: check newest version of Safari, Firefox, Chrome
        - mobile: check Android and iOS
    - collect any bugs or questions for Trust to send in one go after CM for the batch of texts is complete, to minimize hours

4. WE applies for DOI for each individual text on intranet survey at https://survey.naturkundemuseum-berlin.de/en/doi-application-form
    - 1 application for each DE + EN text together, so they have the same doi
    - Put both EN and DE descriptions in the Abstract fields
    - Once doi gets issued, enter into Netlify field
    - Once available on the frontend, download and send EN and DE as separate PDFs to doi@mfn.berlin

5. Send frontend view to authors for final okay

## Editing in the Netlify (CMS) versus Dendron

1. Netlify
    - these fields only exist in Netlify:
      - doi
      - translator
    - 2-5 word short description
    - start and end date
    - images are easier to edit in Netlify in general
    - title images have to be selected in Netlify

2. Dendron
    - new notes should always be created in Dendron
    - note name changes should take place in Dendron, so it can auto-update
    - backlinks are more elegantly managed in Dendron, but _can_ be managed in Netlify too, just with extra frontend check precautions that the edit was successful
    - notes should be renamed and deleted in Dendron
