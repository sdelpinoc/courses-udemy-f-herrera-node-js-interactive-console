import colors from 'colors';
import * as readline from 'node:readline';

const showMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear();

        console.log('======================='.green);
        console.log('    Select a option    '.green);
        console.log('=======================\n'.green);
    
        console.log(`${'1.'.green} Create a task`);
        console.log(`${'2.'.green} List tasks`);
        console.log(`${'3.'.green} List completed tasks`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Complete task(s)`);
        console.log(`${'6.'.green} Delete task`);
        console.log(`${'0.'.green} Exit\n`);
    
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // console.log('realine: ', readLine);

        readLine.question('Select a option: ', option => {
            readLine.close();
            resolve(option);
        });
    });
};

const pause = () => {
    return new Promise((resolve, reject) => {
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(`\n\nPress ${'Enter'.green} to continue\n`, () => {
            readLine.close();
            resolve();
        });
    });
};

export {
    showMenu,
    pause
};