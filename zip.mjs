import {isAbsolute, join} from "node:path";
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

const absPath = (path, currentLocation) => isAbsolute(path) ? path : join(currentLocation, path);

export const compress = async (line, currentLocation) => {
    const filePath = absPath(line.split(' ')[1], currentLocation);
    const destinationPath = absPath(line.split(' ')[2], currentLocation);
    await pipeline(
        createReadStream(filePath),
        createBrotliCompress(),
        createWriteStream(destinationPath),
    );
};

export const decompress = async (line, currentLocation) => {
    const filePath = absPath(line.split(' ')[1], currentLocation);
    const destinationPath = absPath(line.split(' ')[2], currentLocation);
    await pipeline(
        createReadStream(filePath),
        createBrotliDecompress(),
        createWriteStream(destinationPath),
    );
};