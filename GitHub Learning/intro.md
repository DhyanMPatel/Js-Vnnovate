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

## .gitignore

- Don't want to track some files
- such as node modules, API key, secret
-

- `Note`:- There are `.gitignore generator` website is available that provide common files that we always ignore during any project for perticular language.

## Branches

- like an alternative timeline
- `Head` always points to where a branch is currently at. means if we switch on another branch then Head point that branch.
- Provide all available branches `git branch`.

- Create branch `git branch branch_name`, but pointer steal pointing to main branch.

- Move pointer to Different branch

  - `git checkout branch_name`
  - `git switch branch_name`
  - Example
    - `git checkout -b b_name` - Also do same create and move there
    - `git switch -c b_name` - create a branch and move there

- Do before switch

  - `commit` before switching to another branch
  - go to `.git` folder & checkout `HEAD` file.

- Mergin the branches

  - There are 2 way to merge branches `fast forward merge` and `not fast forward merge`
  - Example

    ```git
        git merge branch_name

        git branch -d branch_name
    ```

    - d for delete that branch. in future there is not that named file.

  - But in real life there, If we work on same file in different branches?

    - When mearging git will give you option to which changes you want to continue such as `current changes`,`incoming changes`, `both`.
    - Solution: Simply remove all changes that you don't want wather it is from current or from incomming changes.
    - After that just do `git add`, `git commit` command will accept current staged changes.

  - `Note`: before merging check out that you are that branch which will remains after merging 2 branches.

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
