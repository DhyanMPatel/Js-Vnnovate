# Git & GitHub

- Git is Software, Where GitHub is Service.
- It track files for changes.
- Path how Files are traking

  ```
  Working Dir
      --> git add --> staging Area
          --> git commit --> Repo
              --> git push --> Github
  ```

- If you want to Quit from `git log` command then press `Q`

## Repo

- Repo means file that tracking by Git

## Commit

- Check point (like games)
- Commit behind the scene it contain few things
  - Hash - This is basically a head of commit
  - parent - for first commit it null, otherwise it will be previous commit
  - Info

- `-am` for adding and commiting at same time.

## .gitignore

- Don't want to track some files
- such as node modules, API key, secret
-

- `Note`:- There are `.gitignore generator` website is available that provide common files that we always ignore during any project for perticular language.

## Branches

- like an alternative timeline
- `Head` always points to where a branch is currently at. means if we switch on another branch then Head point that branch.

- `Note`: before merging check out that you are that branch which will remains after merging 2 branches.

## Git Diff

- git diff provide difference in same file.
- There are `A` file and `Git diff` will give difference between `staged` or `not staged` content.
- `-` represent content before changes (Also can say represent changes of previous commit files) , `+` represent we changed (Also can say represent changes of after commit files).
- Example
  - `git diff --staged`
  - `git diff 9cdf011 9dd87fa`
  - `git diff 9cdf011..9dd87fa`
  - `git diff branchOne.. branchTwo`

## Git stash
- create a repo, work & commit on main
- switch to another branch & work
- conflicting changes do not allow to switch branch, without commits
- `git stash` will save all changes in stash & allow to switch branch
- `git stash pop` will apply all changes from stash to current branch
- `git stash apply` will apply all changes from stash to current branch but will not remove stash
- `git stash list` display all available stashes. And can pop any stash in any branch.

- `Note`: Stash is not just limited to any perticular branch only it can stash pop in different branch

## Git Rebase
- alternative to merging
- When we are merging that commits still branches are there. if we do changes in both branches then it will show different.
- If we change any thing in same file then it will say for manual resolving. also read all thing in cmd. then add that resolved file and write `git rebase --continue` command to continue holded merging. 

- `Note`: Keep it mind that run `git rebase` command from any branch `exept main branch`. and write command, `git rebase main`

### Commands

- `git --version`
- `git status`
- `git init` (one time per project)
- `.git` --> hidden folder to keep history of all files and sub-folders
- `git log` --> provide commited checkpoints, user and id that pushed, time.
- `git log --oneline` --> In one line commits

- Path
  ```
  ->`touch file1.txt file2.txt...` --> create 2 files.
      ->`git add file1.txt file2.txt...` OR `git add .`
          ->`git commit -m "Some Text"` --> m stands for message
              ->`git push origin main`
  ```
- `git config` - Get and Set repository or global options.

  - `git config --global user.name "User Name"`
  - `git config --global user.email "Email"`
  - `git config --global core.editor "code --wait"`

- `cat .gitconfig` - provide the detail of user on git.

  - There is a catch use this command at root diractory.

- `git branch` - provide branches.
- `git merge` - for merging

- This Command can help to checkout any commit using 
  - `git checkout <Hash>`   -- This will move head to that perticular Hash(such as `9cdf011`)
  - `git checkout main/master` - will comeback to lattest commit. 
  - `git reflog` - This also work like above one.
  - `git checkout HEAD~2` - will look at 2 commit privious.