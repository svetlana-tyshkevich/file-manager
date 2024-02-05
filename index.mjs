import {stdin as input, stdout as output} from 'node:process';
import * as readline from 'node:readline/promises';
import * as os from "os";
import {log} from "./colorfulLog";
import * as navigation from './navigation'


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
const locationString = () =>  log.cyan(`You are currently in ${currentLocation}`);


const closeAction = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
}




// rl.write(`Welcome to the File Manager, ${username}!`);
console.log(`Welcome to the File Manager, ${username}!`);
locationString();

rl.on('line', (line) => {
    try {
        if (line.trim()  === '.exit') closeAction();
        if (line.trim() === 'up') navigation.getUpperLevel(currentLocation);
        if (line.trim().startsWith('cd ')) navigation.goToDirectory(line, currentLocation);
        if (line.trim() === 'ls') navigation.printList(currentLocation);
        else {
            log.red('Invalid input')
        }
        locationString();
    } catch {
        log.red('Operation failed')
    }


});

rl.on('SIGINT', () => {
    closeAction();
});