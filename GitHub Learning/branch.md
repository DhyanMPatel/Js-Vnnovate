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
