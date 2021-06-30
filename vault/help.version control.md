---
id: 72a54d9b-e565-4ded-a8a0-129641e1cb88
title: Using Version Control
desc: ''
updated: 1618409219686
created: 1618398668006
colour_scheme: 8
---

We are using Git as a collaboration tool for this project. It's a way to make sure every file is kept in sync across the team and allows us to track changes.

Every time you start a work session in Dendron you need to make sure you are working with the latest version of the files. They may have been updated by someone else since you last worked on them.

## On session start

#### 1. Make sure you're on the right branch

Check the bottom left hand corner of VSCode and make sure you're in the `content-creation` branch. In Git, branches are alternate versions of the same repository. If we aren't working in the same branch, our work will not be synced.

![](/images/help/interface/branch.png)

If it says `master` or something else, click it and select `content-creation` from the dropdown.

#### 2. Pull

After making sure you're in `content-creation`, you will need to `pull` the latest files by clicking the sync icon in the bottom left corner of VSCode.

![](/images/help/interface/sync.png)

#### 3. Reload index

To see any new or renamed files in the Dendron tree, you will need to reload the Dendron index. You can do this by pressing 

On Mac, press `⌘ + Shift + P`
On Windows, press `Ctrl + Shift + P`

And then typing `Dendron: Reload Index` and pressing `Enter`. 

Now you're good to go!

## After you've made some changes

After you finish working on files, you will always need to remember to commit and push them, so that everyone is working in sync.

#### 1. Once again, make sure you're on the right branch: `content-creation`

#### 2. Commit your changes

In Git, new changes must be grouped together with a short message to descibe what's been done, before they can be made a part of the repository. This is called a commit.

To make a commit in VSCode, look to the activity bar and you can see the number of outgoing changes (number of files you've worked on). Click this to take you to the version control menu.

![Version control](/images/help/interface/version-control-icon.png)

**You should now see something like this in the sidebar:**

![Version control](/images/help/interface/version-control-staging.png)

This shows all the files that have been added, modified or deleted since you started your session.

When hovering ovr `Changes` click the `+` to "stage" all of them. This means they are now ready to be committed.

![Stage changes](/images/help/interface/stage.png)

It should now read `Staged Chages` showing a list of files that you have changed. 

To commit we just have to type a short message describing what we have done, and then click the `tick` icon.

![Commit changes](/images/help/interface/commit-new-changes.png)

We're not done yet though, we still need to "push" these changes to our remote repository that everyone will share.

#### 3. Push

It's easy to push once you've commited your changes. Just click the sync button in the bottom left corner of VSCode.

![Push changes](/images/help/interface/push.png)

