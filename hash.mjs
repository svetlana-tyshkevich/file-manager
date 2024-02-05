import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import {isAbsolute, join} from "node:path";

export const hashFileInput = async (line, currentLocation) => {
    const path = line.split(' ')[1];
    const absPath = isAbsolute(path) ? path : join(currentLocation, path);
    const text = await readFile(absPath, { encoding: 'utf8' });
    const hashString = createHash('sha256').update(text).digest('hex');
    console.log(hashString );
};