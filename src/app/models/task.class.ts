export class Task {
    id: number;
    title: string;
    description: string;
    category: string;
    assignedTo: string[]=[];
    dueDate: string;
    priority: string;
    subtasks: string[] = [];
    createdAt: number;
    status: string;

    constructor(task?: any) {
        this.id = task ? task.id : '';
        this.title = task ? task.title : '';
        this.description = task ? task.description : '';
        this.category = task ? task.category : '';
        this.assignedTo = task ? task.assignedTo : '';
        this.dueDate = task ? task.dueDate : '';
        this.priority = task ? task.priority : '';
        this.subtasks = task ? task.subtasks : [];
        this.createdAt = task ? task.createdAt : '';
        this.status = 'toDo';
    }
}