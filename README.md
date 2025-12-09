### Dev environment setup guide
[install pakku](https://juraj-hrivnak.github.io/Pakku/installing-pakku.html) (or use `java -jar pakku.jar` in minecraft folder, but pakku jar could be outdated and java could be setup wrong)

[git](https://git-scm.com/)

1. Create a prism launcher instance for minecraft 1.20.1, on forge 47.4.0
2. Open the newly create instance folder with a terminal `instances/(instancename)` and run `git clone https://github.com/Deepacat/Empyrea.git`
3. Rename the cloned git repo folder to `minecraft` so it follows `instances\(instancename)\minecraft\`
4. Open `(instancename)\minecraft\` in terminal and run `git switch dev` to switch to the developement branch.
5. Also in the terminal, run `pakku fetch` to download existing mods in repo from pakku manifest. If pakku is not locally installed use `java -jar pakku.jar fetch` instead
6. Copy the contents inside of `(instancename)\minecraft\.pakku\prism-overrides` into your `(instancename)` folder, and `(instancename)\minecraft\.pakku\overrides` to `(instancename)\minecraft\`
7. You now have a functioning repo/game instance to run, modify and commit from

Use `pakku sync` and commit changes to the `pakku-lock.json` file to update your mod edits

To pull changes without committing all files, you should run `git stash`, `git pull`, then `git stash pop`. 
It is also recommended after pulling changes you run `pakku fetch` to retrieve any pulled mod changes.

for more IMPORTANT info on panpack template, read [panpack readme](https://github.com/Deepacat/Empyrea/blob/dev/panpackREADME.md)
