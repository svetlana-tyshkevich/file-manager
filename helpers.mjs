const getUsername = () => {
    const args = process.argv;
    const usernameArg = args.slice(2).find(item => item.startsWith('--username='));
    if (usernameArg) {
        return usernameArg.split('=')[1];
    } else {
        return 'Username';
    }
};

const username = getUsername();

export const greet = () => console.log(`Welcome to the File Manager, \x1b[35m${username}\x1b[0m!`);

export const sayBye = () => console.log(`Thank you for using File Manager, \x1b[35m${username}\x1b[0m, goodbye!`);
