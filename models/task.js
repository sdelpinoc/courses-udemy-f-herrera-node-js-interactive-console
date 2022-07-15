import { nanoid } from 'nanoid';

export default class Task {
    id = '';
    description = '';
    completedAt = null;

    constructor(description) {
        this.id = nanoid();
        this.description = description;
        this.completedAt = null;
    }
}