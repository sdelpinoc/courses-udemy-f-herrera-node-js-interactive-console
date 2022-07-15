import Task from './task.js';
import colors from 'colors';

export default class Tasks {
    list = {};

    get getListArray() {
        // const list = [];

        // Object.keys(this.list).forEach(key => {
        //     list.push(this.list[key]);
        // });

        // return list;

        return [...Object.values(this.list)];
    }

    constructor() {
        this.list = {};
    }

    createTask(description = '') {
        const task = new Task(description);

        this.list[task.id] = task;
    }

    loadTaskFromFile(tasks = []) {
        this.list = {};
        
        tasks.forEach(task => {
            this.list[task.id] = task;
        });
    }

    tasksList(list) {
        console.log('');

        let listTask = list || this.getListArray;

        listTask.forEach((task, index) => {

            const { description, completedAt} = task;

            let message = `${(++index)}. `.green + `${description} :: `;

            message += (completedAt !== null) 
                ? `${completedAt}`.green
                : 'Pending'.red;

            console.log(message);
        });
    }

    completedPendingTask(completed) {

        const list = this.getListArray.filter(task => completed ? task.completedAt : !task.completedAt);

        this.tasksList(list);
    }

    deleteTask(id = '') {
        if (this.list[id]) {
            delete this.list[id];
        }
    }

    toogleTaskStatus(ids = []) {
        ids.forEach(id => {
            // Is passing by reference, if 'task' is modified, 'this.list' also change
            const task = this.list[id];

            if (!task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
        });

        this.getListArray.forEach(task => {
            if (!ids.includes(task.id)) {
                this.list[task.id].completedAt = null;
            }
        });
    }
}