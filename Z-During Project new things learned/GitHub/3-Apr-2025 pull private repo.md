# How to get Private remote Repository 

1. Check If Remote Repository is Added

        git remote -v

    If there are no any Repository, 

        git remote add origin https://github.com/YourUsername/YourRepo.git

2. If Git has detected a mismatch between the owner of the directory (D:/) and the current user (DHYAN-PATEL/dhyan).
    - Temporarily Allow the Directory (Session Only)

            git config --global --add safe.directory D:/

    - Permanently Allow the Directory

            git config --global safe.directory D:/

3. Clone Repository

        git clone https://github.com/YourUsername/YourRepo.git
