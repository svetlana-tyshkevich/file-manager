import { pipeline } from 'node:stream/promises';
import {createReadStream, createWriteStream } from 'node:fs';
import {writeFile, rename, rm, access, constants} from 'node:fs/promises';
import { isAbsolute, join, sep} from "node:path";
import {stdout as output} from 'node:process';
import * as os from "os";
import {log} from "./colorfulLog.mjs";

export const catAction = async (line, currentLocation) => {
    const userPath = line.split(' ')[1];
    const path = isAbsolute(userPath) ? userPath : join(currentLocation, userPath);
    await access(path, constants.F_OK);
    const readableStream = createReadStream(path);
    readableStream.on('readable', () => {
        readableStream.read();

    });
    readableStream.on('data', (chunk) => {
        output.write(chunk + os.EOL);
        log.cyan(`You are currently in ${currentLocation}`);
    });
}

export const addFile = async (line, currentLocation) => {
    const newFileName = line.split(' ')[1];
    const filePath = join(currentLocation, newFileName);
    await writeFile(filePath, '' );
};

export const copyFile = async (line, currentLocation) => {
    const path = line.split(' ')[1];
    const newFilePath = line.split(' ')[2];
    const absPath = isAbsolute(path) ? path : join(currentLocation, path);
    const newFileAbsPath = isAbsolute(newFilePath) ? newFilePath : join(currentLocation, newFilePath);
    await pipeline(
        createReadStream(absPath),
        createWriteStream(newFileAbsPath),
    );
};

export const moveFile = async (line, currentLocation) => {
    const path = line.split(' ')[1];
    const newFilePath = line.split(' ')[2];
    const absPath = isAbsolute(path) ? path : join(currentLocation, path);
    const newFileAbsPath = isAbsolute(newFilePath) ? newFilePath : join(currentLocation, newFilePath);
    await pipeline(
        createReadStream(absPath),
        createWriteStream(newFileAbsPath),
    );
    await rm(absPath);
};

export const deleteFile = async (line, currentLocation) => {
    const path = line.split(' ')[1];
    const absPath = isAbsolute(path) ? path : join(currentLocation, path);
    await rm(absPath);
};

export const renameFile = async (line, currentLocation) => {
    const path = line.split(' ')[1];
    const newFileName = line.split(' ')[2];
    const oldAbsPath = isAbsolute(path) ? path : join(currentLocation, path);
    const newAbsPath = oldAbsPath.split(sep).slice(0, -1).join(sep) + sep + newFileName;
    await rename(oldAbsPath, newAbsPath);
};