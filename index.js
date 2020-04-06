#!/usr/bin/env node

// Command Struture:
// np -n <Name of project to create> -t <Project Type (Vue, Flutter, HTML, NativeScript, Python)> -r (set up repo boolean)

// Variable Declarations

const { exec } = require('child_process');
const p = require('commander');
const config = require('./config');
let fullPath;

const run = async (command) => {
    return new Promise((accept, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) return reject(err);
            accept();
        });
    })
}

const parseArgs = () => {
    p.option('-n, --name <projectName>', 'Project Name')
    .option('-t, --type <projectType>', 'Project Type (Vue, Flutter, HTML, etc.)')
    .option('-r, --repo', 'If true, sets up a new repo on github')
    .option('-c --curDir', 'If true, create the new project in current directory');
    
    p.parse(process.argv);
    fullPath = p.curDir ? `${process.cwd()}/${p.name}` : `${config.DEST_FOLDER}/${p.name}`;
};

const createNewProject = async () => {
    process.chdir(`${p.curDir ? process.cwd() : config.DEST_FOLDER}`);
    console.log(`Creating ${p.type} Project, Please Wait...`);
    switch (p.type.toLowerCase()) {
        case 'java':
            await newJava();
            break;
        case 'vue':
            await newVue();
            break;
        case 'flutter':
            await newFlutter();
            break;
        case 'html':
            await newHTML();
            break;
        case 'python':
            await newPython();
            break;
        default:
            console.log("Unknown Project Type (-t), Please Check Input");
    }

    if (p.repo) {
        await createRepo(true);
        console.log('Repo Created! Time to start coding...');
    } else {
        process.chdir(fullPath);
    }

    openEditor();
}

const createRepo = async () => {
    return new Promise( async (accept, reject) => {
        console.log('Creating Repo');
        process.chdir(`${fullPath}`);
        await run('git init');
        await run('git add .');
        if (p.type.toLowerCase() !== 'vue') await run('git commit -m "Initial Commit - Created with npScript by Alex"');
        await run(`curl -u '${config.GITHUB_USER}:${config.GITHUB_PASS}' https://api.github.com/user/repos -d '{"name":"${p.name}"}'`);
        await run(`git remote add origin https://github.com/${config.GITHUB_USER}/${p.name}.git`);
        await run('git push -u origin master');
        accept();
    })
}

const newJava = async () => {
    await run(`mkdir ${p.name}`);
    await run(`touch ${p.name}/${p.name}.java`);
};

const newVue = async () => {
    await run(`vue create -d ${p.name}`).catch((err) => console.log(err));
};

const newFlutter = async () => {
    await run (`flutter create ${p.name}`).catch((err) => console.log(err));
};

const newHTML = async () => {
    await run(`mkdir ${p.name}`);
    process.chdir(`${fullPath}`);
    await run(`touch index.html index.css index.js`);
};

const newPython = async () => {
    await run(`mkdir ${p.name}`);
    process.chdir(`${fullPath}`);
    await run(`touch ${p.name}.py`)
}

const openEditor = () => {
    run(`code .`);
}



// Main Code

parseArgs();
createNewProject();
