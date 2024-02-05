const reset = "\x1b[0m";

export const log = {
    red: (text) => console.log("\x1b[31m" + text + reset),
    cyan: (text) => console.log("\x1b[36m" + text + reset),
};