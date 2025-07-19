# How to replace previous commit with current one

- **Scenario** : 2 days ago i push a commit to repo and then yesterday i soft reset that commit. now made some changes in files. Now the main problem is that i want to remove 2 days commit and replace with this commit with changes in files. This is the way to do do that,

1. Stage all files that we want to commit.
    ```
    git add .
    ```

2. add your commit message.
    ```
    git commit -m "Message that want to display"
    ```

3. Now push commit with force keyword.

    ```
    git push origin branch_name --force
    ```
    what this commit do?
    - This commit will exact replica of local repo to remote repo.
