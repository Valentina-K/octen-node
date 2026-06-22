const fs = require('node:fs');
const afs = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline/promises');

const start = async () => {
    const sourceFilePath = path.join(process.cwd(), 'emails.txt');

    const filestream = fs.createReadStream(sourceFilePath, 'utf-8');
    const rl = readline.createInterface({input:filestream});
    try {
        for await (const line of rl) {
            const email = line.split(/[\t ]+/)[1];
            if(typeof(email) !== 'string') continue;
            const host = email.split('@');
            if (host.length < 2) {
                continue;
            }
            const targetFilePath = path.join(process.cwd(), 'emails', `${host[1].split('.')[0]}.txt`);
            await afs.appendFile(targetFilePath, `${email}\n`);
        }
    } finally {
        rl.close();
    }
}

start();