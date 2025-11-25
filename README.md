### Contributing to this modpack setup guide
[install pakku](https://juraj-hrivnak.github.io/Pakku/installing-pakku.html) (or use java -jar pakku.jar in minecraft folder, but pakku jar could be outdated)
[git](https://git-scm.com/)

1. Create a prism launcher instance for minecraft 1.20.1, on forge 47.4.0
2. Open the newly create instance folder with a terminal `instances/(instancename)` and run `git clone https://github.com/Deepacat/Empyrea.git`
3. Rename the cloned git repo folder to `minecraft` so it follows `instances/(instancename)/minecraft/`
4. Open `(instancename)\minecraft\` in terminal and run `git switch dev` to switch to the developement branch.
5. Also in the terminal, run `pakku fetch` to download existing mods in repo from pakku manifest. If pakku is not locally installed use `java -jar pakku.jar fetch` instead
6. Copy the contents inside of `(instancename)\minecraft\.pakku\"prism-overrides"` and `"overrides"`into your `(instancename)` folder
7. You now have a functioning repo/game instance to run, modify and commit from

for more IMPORTANT info on panpack template, read [panpack readme](https://github.com/Deepacat/Empyrea/blob/dev/panpackREADME.md)
