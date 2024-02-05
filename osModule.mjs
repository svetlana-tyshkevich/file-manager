import * as os from "os";

export const getOSData = (line) => {
    const secondParam = line.split(' ')[1];
    let result;
    const parseCpusInfo = (data) => {
        return data.map(item => ({model: item.model, clock_rate: item.speed}))
    };
    switch (secondParam) {
        case '--EOL': result = JSON.stringify(os.EOL); break;
        case '--cpus': {
            result = parseCpusInfo(os.cpus());
            console.log(`amount of CPUS: ${os.cpus().length}`);
        } break;
        case '--homedir': result = os.homedir(); break;
        case '--username': result = os.userInfo()?.username; break;
        case '--architecture': result = os.arch(); break;
    }
    console.log(result);
};