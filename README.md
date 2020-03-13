# npScript
Command line script built in Node.js that automates the project creation process.  
This script will only work on **UNIX-style command lines**.  
In order to have this work on windows, you need to download gitbash or something similar.

#Getting Started
- Clone or download the repo, then run `npm i` to initialize the project with dependencies.
- Create a new file in the parent directory named `config.js` and from this file export the following:
  - `GITHUB_USER`
  - `GITHUB_PASS`
  - `DEST_FOLDER`
- Import config.js into index.js

#Running The Script
- Command can be run in the terminal from any directory
- Command Structure: `np -n <projectName> -t <projectType> -r <createRepo>`
  - -n and -t flags require input value directly after the flag, -r requires no value
- Example command: `np -n javaProject -t java -r`
  - This command would create a new folder in your DEST_FOLDER named javaProject (of type java), and it would create a repo
