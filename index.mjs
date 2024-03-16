import {stdin as input, stdout as output} from 'node:process';
import * as readline from 'node:readline/promises';
import * as os from "os";
import {log} from "./colorfulLog.mjs";
import * as filesOperation from './filesOperation.mjs';
import {hashFileInput} from "./hash.mjs";
import {greet, sayBye} from "./helpers.mjs";
import * as navigation from './navigation.mjs';
import {getOSData} from "./osModule.mjs";
import * as zipModule from './zip.mjs';


const rl = readline.createInterface({ input, output });

const homedir = os.homedir();
let currentLocation = homedir;
const locationString = () =>  log.cyan(`You are currently in ${currentLocation}`);
const closeAction = () => {
    sayBye();
    rl.close();
}

greet();
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
        else if (line.trim().startsWith('os ')) getOSData(line);
        else if (line.trim().startsWith('hash ')) await hashFileInput(line, currentLocation);
        else if (line.trim().startsWith('compress ')) await zipModule.compress(line, currentLocation);
        else if (line.trim().startsWith('decompress ')) await zipModule.decompress(line, currentLocation);
        else if (line) {
            log.red('Invalid input')
        }
    } catch {
        log.red('Operation failed');
    } finally {
        locationString();
    }


});

rl.on('SIGINT', () => {
    closeAction();
});