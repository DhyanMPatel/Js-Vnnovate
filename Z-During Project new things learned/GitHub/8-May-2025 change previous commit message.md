## Just previous commit message change

- Here Latest commit message that i want to change. So steps like,

  1. Go to previous message.

     ```
     git commit --amend
     ```

  2. update in editor, save and close.

  3. Push:

     ```
     git push origin dev_dhyan --force
     ```

## Change any previous commit message

- If any previous commit message that not latest but want to change then what steps,

  1. Find the commit hash

     ```
     git log --online
     ```

  2. Start interactive rebase from the commit before the one you want to edit.

     ```
     git rebase -i <commit -hash>^

     git rebase -i d4e5f6g^
     ```

  3. In the editor change any commit message that want to update, save and close

  4. Push the updated branch

     ```
     git push origin dev_dhyan --force
     ```
