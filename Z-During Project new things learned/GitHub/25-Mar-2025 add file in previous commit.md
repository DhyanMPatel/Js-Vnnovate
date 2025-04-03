# Add file in previous file

- There is a file where i forgot to add in previous commit. So what i do...

  ```bash
  Stap - 1 => Add forgot file

    "git add file-you-forgot.ext"

  Stap - 2 => Amend the last commit

    "git commit --amend --no-edit"

  Stap - 3 => Force push the updated commit to the remote branch:
           => --force-with-lease is safer than --force, as it 'only pushes if no one else has updated the branch'.

    "git push --force-with-lease"

          => If others have already pulled your previous commit, inform them to sync their branch using:

    "git pull --rebase"
  ```