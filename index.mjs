import {stdin as input, stdout as output} from 'node:process';
import * as readline from 'node:readline/promises';
import * as os from "os";
import {log} from "./colorfulLog.mjs";
import * as navigation from './navigation.mjs';
import * as filesOperation from './filesOperation.mjs';
import * as osModule from './osModule.mjs';

const getUsername = () => {
    const args = process.argv;
    const usernameArg = args.slice(2).find(item => item.startsWith('--username='));
    if (usernameArg) {
        return usernameArg.split('=')[1];
    } else {
        return 'Username';
    }
};

const rl = readline.createInterface({ input, output });

const username = getUsername();
const homedir = os.homedir();
let currentLocation = homedir;
const locationString = () =>  log.cyan(`You are currently in ${currentLocation}`);
const closeAction = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
}

console.log(`Welcome to the File Manager, \x1b[35m${username}\x1b[0m!`);
locationString();

rl.on('line', async (line) => {
    try {
        if (line.trim()  === '.exit') closeAction();
        else if (line.trim() === 'up') currentLocation = navigation.getUpperLevel(currentLocation);
        else if (line.trim().startsWith('cd ')) currentLocation = await navigation.goToDirectory(line, currentLocation);
        else if (line.trim() === 'ls') console.table(await navigation.printList(currentLocation));
        else if (line.trim().startsWith('cat ')) await filesOperation.catAction(line, currentLocation);
        else if (line.trim().startsWith('add ')) await filesOperation.addFile(line, currentLocation);
        else if (line.trim().startsWith('rn ')) await filesOperation.renameFile(line, currentLocation);
        else if (line.trim().startsWith('cp ')) await filesOperation.copyFile(line, currentLocation);
        else if (line.trim().startsWith('mv ')) await filesOperation.moveFile(line, currentLocation);
        else if (line.trim().startsWith('rm ')) await filesOperation.deleteFile(line, currentLocation);
        else if (line.trim().startsWith('os ')) osModule.getOSData(line);
        else if (line) {
            log.red('Invalid input')
        }
        locationString();
    } catch {
        log.red('Operation failed');
    }


});

rl.on('SIGINT', () => {
    closeAction();
});