// import { showMenu, pause } from './helpers/messages.js';
import {
    inquirerMenu,
    pause,
    readInput,
    listDeletedTask,
    confirm,
    showTasksChecklist
} from './helpers/inquirer.js';
import { saveDb, readDb } from './helpers/connectionFile.js';

import Tasks from './models/tasks.js';

const main = async () => {
    console.clear();

    let selectedOption;

    const tasks = new Tasks();
    console.log(tasks);

    const taskDb = readDb();

    if (taskDb) {
        tasks.loadTaskFromFile(taskDb);
    }

    do {
        selectedOption = await inquirerMenu();
        // console.log('\n\nselectedOption: ', selectedOption);
        // console.log('typeof(selectedOption): ', typeof(selectedOption));

        switch (selectedOption) {
            case 1:
                const description = await readInput('Description:');
                console.log(description);
                tasks.createTask(description);
                break;

            case 2:
                // console.log(tasks.getListArray);
                tasks.tasksList();
                break;

            case 3:
                tasks.completedPendingTask(true);
                break;

            case 4:
                tasks.completedPendingTask(false);
                break;

            case 5:
                const ids = await showTasksChecklist(tasks.getListArray);
                console.log({ ids });
                tasks.toogleTaskStatus(ids);
                break;

            case 6:
                const id = await listDeletedTask(tasks.getListArray);
                // console.log({ id });

                if (id && id !== '0') {
                    const confirmDelete = await confirm('Confirm the deletion?');
                    // console.log({ confirmDelete });

                    if (confirmDelete) {
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }

                break;

            default:
                break;
        }

        saveDb(tasks.getListArray);

        if (selectedOption !== 0) await pause();

    } while (selectedOption !== 0);
};

main();