# GC-FaMS

<img src="https://github.com/paranoid-android12/GC-FAMS/assets/113983506/0c8cdbbc-c991-4115-a591-7386e855b208" align="right" height="160" width="160">

The Gordon College Faculty Monitoring System (GC-FaMS) is a “Faculty Profiling and Development Monitoring'' web-application which provides a centralized system for management, and profiling of faculty members across different programs within the school. This enables a centralized system to consistently monitor the quality and development of multiple areas of programs to be accredited for a higher level of education, which streamlines the entire process of the overall program development.

## Installation:
For easier experience, use GitHub Desktop for simple push and pull functionalities. (I'll update later with more details for Git users).

### 1. GitHub Cloning
  Opening the GitHub link provided on Trello opens the main view of the GC-FMS repository. Click the green <>Code button, and select the "Open with GitHub Desktop" option.
  ![image](https://github.com/paranoid-android12/GC-FAMS/assets/113983506/3e42ce24-65cc-4b84-a838-bef819a96f74)

  A window will appear in your GitHub Desktop application for the repository cloning. Click the "Clone" button.
  ![image](https://github.com/paranoid-android12/GC-FAMS/assets/113983506/93f7a35f-0107-4bfa-a2e7-bbaec1da2f09)

  After the cloning has finished, click the "Current Repository" dropdown, and right-click the GC-FMS repository, then select "Open in Visual Studio Code".

  ![image](https://github.com/paranoid-android12/GC-FAMS/assets/113983506/b90cf0c5-1de7-479e-a85e-abe13aa0914f)

  You now have essentially cloned the latest version of our main repository. Some functionalities are still not available, as you need to install other packages.

### 2. Installing Angular and Node
  In order to prevent bloated file sizes for this repository, the node package itself was included on the .gitignore. This means that you have to manually install the node package in order to do npm-related commands.
  ```
  npm install node
  ```

  The Angular installation guide can be seen [here.](https://angular.io/guide/setup-local) This link also includes all information relating to the framework, so take some time to learn the basic ins and outs.

  Install the Angular CLI by running the following npm command on the terminal with the current repository directory selected.
  ```
  npm install -g @angular/cli
  ```

  In some cases, Windows generally disable the execution of Powershell scripts. In an event that it does on your side, run this line of command.
  ```
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
  Now that the Angular CLI has been installed, you can now run Angular commands that usually aren't available to your side.

### 3. Running GC-FMS Web Application
  Take note that the following commands to be provided will only work if your terminal is currently selecting the GC-FMS directory.

  In order to run the web-application itself, use the serve command on the Angular CLI (Just use the same terminal as before, but you're utilizing Angular commands.)
  ```
  ng serve --open
  ```

  After a few seconds, you will see the initial chunk files rendered as shown in the terminal line.
  ![image](https://github.com/paranoid-android12/GC-FAMS/assets/113983506/1e79434d-08e8-4686-b21c-9fad88015ab8)

  Open the link of the localhost link provided below. This link renders live meaning that all changes done in the codebase will be reflected in real time on the browser.
