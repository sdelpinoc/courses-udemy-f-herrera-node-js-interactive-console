import inquirer from 'inquirer';
import colors from 'colors';

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿What would you like to do?',
    choices: [
        {
            value: 1,
            name: `${'1.'.green} Create task`
        },
        {
            value: 2,
            name: `${'2.'.green} List tasks`
        },
        {
            value: 3,
            name: `${'3.'.green} List completed tasks`
        },
        {
            value: 4,
            name: `${'4.'.green} List pending tasks`
        },
        {
            value: 5,
            name: `${'5.'.green} Completed task(s)`
        },
        {
            value: 6,
            name: `${'6.'.green} Delete task`
        },
        {
            value: 0,
            name: `${'0.'.green} Exit`
        }
    ]
}];

const inquirerMenu = async () => {
    console.clear();

    console.log('======================='.green);
    console.log('    Select a option    ');
    console.log('=======================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
};

const pause = async () => {
    const question = [{
        type: 'input',
        name: 'option',
        message: `\n\nPress ${'Enter'.green} to continue\n`,
        choices: []
    }];

    await inquirer.prompt(question);
};

const readInput = async message => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value';
            }

            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

const listDeletedTask = async (tasks = []) => {
    if (tasks.length > 0) {
        const choices = tasks.map((task, index) => {
                
            const idx = `${++index}.`.green;
            
            return {
                value: task.id,
                name: `${idx} ${task.description}`
            }
        });
        
        // console.log(choices);
        choices.unshift({
            value: '0',
            name: '0.'.green + ' Cancel'
        });
        
        const questions = [{
            type: 'list',
            name: 'id',
            message: 'Select the task to delete',
            choices
        }];
        
        const { id } = await inquirer.prompt(questions);
        
        return id;
    } else {
        console.log('There are no tasks to delete');
        return null;
    }
};

const confirm = async message => {
    const question = [{
        type: 'confirm',
        name: 'response',
        message
    }];

    const { response } = await inquirer.prompt(question);

    return response;
};

const showTasksChecklist = async (tasks = []) => {
    if (tasks.length > 0) {
        const choices = tasks.map((task, index) => {
                
            const idx = `${++index}.`.green;
            
            return {
                value: task.id,
                name: `${idx} ${task.description}`,
                checked: (task.completedAt) ? true : false
            }
        });
        
        // console.log(choices);
        // choices.unshift({
        //     value: '0',
        //     name: '0.'.green + ' Cancel'
        // });
        
        const questions = [{
            type: 'checkbox',
            name: 'ids',
            message: 'Select the tasks to completed',
            choices
        }];
        
        const { ids } = await inquirer.prompt(questions);
        
        return ids;
    } else {
        console.log('There are no tasks to show');
        return null;
    }
};

export {
    inquirerMenu,
    pause,
    readInput,
    listDeletedTask,
    confirm,
    showTasksChecklist
};