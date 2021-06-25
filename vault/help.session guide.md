---
id: 74ac8278-0b5e-4b78-9929-3e40cfea6986
title: Session Guide
desc: ''
updated: 1618497342590
created: 1618495941372
colour_scheme: 12
---

Here is the process you should complete every time you start and finish a work session.

## Starting a work session

1. Open the Animals as Objects Dendron Workspace in VSCode.[^1]

2. Pull new changes from the remote repository. Make sure that you are in the `content-creation` branch.

![Sync](/images/help/interface/sync.png)

3. Reload the index by pressing `Ctrl + Shift + P` on Windows or `Cmd + Shift + P` on Mac and typing `Dendron: Reload Index` and hit `Enter`

![Reload index](/images/help/interface/reload.png)

You are now ready to work with the latest files!

---

## Saving your changes / ending a work session

1. Open the Source Control panel

![Version control](/images/help/interface/version-control-icon.png)

2. Commit your changes with a short message in the Source Control tab.

![Commit changes](/images/help/interface/commit-new-changes.png)

3. Push your changes by clicking the sync button.

![Push changes](/images/help/interface/push.png)

Now everyone can see the work you've done!

Learn more about version control in this document: [[help.version control]]


[^1]: If you can't find the Animals as Objects workspace, Go to `File` -> `Open Workspace`, then navigate in the file picker box to where you saved the repository, and open the file `dendron.code-workspace`.