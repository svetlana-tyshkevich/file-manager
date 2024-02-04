import { readdir } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import * as os from "os";
import { access, constants } from 'node:fs/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getUsername = () => {
    const args = process.argv;
    const usernameArg = args.slice(2).find(item => item.startsWith('--username='));
    if (usernameArg) {
        return usernameArg.split('=')[1];
    } else {
        return 'Username'
    }
};

const rl = readline.createInterface({ input, output });

const username = getUsername();
const homedir = os.homedir();
let currentLocation = homedir;

const getUpperLevel = () => {
    const pathParts = currentLocation.split('\\');
    if (pathParts.length > 1) {
        currentLocation = pathParts.slice(0, -1).join('\\');
        if (pathParts.length === 2) {
            currentLocation += '\\';
        }

    }
    console.log(`You are currently in ${currentLocation}`);
}

const closeAction = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
}
// TODO: add abs path handling
const goToDirectory = async (line) => {
    const userPathToDir = line.split(' ')[1];
    const newPath = join(currentLocation, userPathToDir);
   await access(newPath, constants.F_OK).then(() => {
        console.log(currentLocation);
        currentLocation = newPath;
        console.log(`You are currently in ${currentLocation}`);
    })
};

const getType = (item) => {
    if (item.isFile()) return 'file';
    if (item.isDirectory()) return 'directory';
    if (item.isSymbolicLink()) return 'symbolicLink';
    return 'unknown';
};

const printList = async () => {
    const files = await readdir(currentLocation, { withFileTypes: true }, );
    const filesTableData = files.map(item => ({'Name': item.name, 'Type': getType(item)}));
    const sortedTableData = filesTableData.sort((a, b) =>  a['Type'] < b['Type'] ? -1 : 1);
    console.table(sortedTableData);
};

// rl.write(`Welcome to the File Manager, ${username}!`);
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentLocation}`);

rl.on('line', (line) => {
    if (line.trim() === 'up') getUpperLevel();
    if (line.trim()  === '.exit') closeAction();
    if (line.trim().startsWith('cd ')) goToDirectory(line);
    if (line.trim() === 'ls') printList();
});

rl.on('SIGINT', () => {
    closeAction();
});