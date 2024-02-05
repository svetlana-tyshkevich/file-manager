import {access, constants, readdir, stat} from "node:fs/promises";
import {isAbsolute, join} from "node:path";

export const getUpperLevel = (currentLocation) => {
    const pathParts = currentLocation.split('\\');
    if (pathParts.length > 1) {
        currentLocation = pathParts.slice(0, -1).join('\\');
        if (pathParts.length === 2) {
            currentLocation += '\\';
        }
    }
    return currentLocation;
}

export const goToDirectory = async (line, currentLocation) => {
    const userPathToDir = line.split(' ')[1];
    const newPath = isAbsolute(userPathToDir) ? userPathToDir : join(currentLocation, userPathToDir);
    const isDir = (await stat(newPath)).isDirectory();
    if (!isDir) throw new Error
    await access(newPath, constants.F_OK);
    return newPath;
};

export const getType = (item) => {
    if (item.isFile()) return 'file';
    if (item.isDirectory()) return 'directory';
    if (item.isSymbolicLink()) return 'symbolicLink';
    return 'unknown';
};


export const printList = async (currentLocation) => {
    const files = await readdir(currentLocation, { withFileTypes: true }, );
    const filesTableData = files.map(item => ({'Name': item.name, 'Type': getType(item)}));
    return filesTableData.sort((a, b) => a['Type'] < b['Type'] ? -1 : 1);
};