export class Task {
    id: number;
    title: string;
    description: string;
    category: string;
    assignedTo: any[] = [];
    dueDate: string;
    priority: string;
    subtasks: any[] = [];
    createdAt: number;
    status: string;
    visible: boolean;

    constructor(task?: any) {
        this.id = task ? task.id : '';
        this.title = task ? task.title : '';
        this.description = task ? task.description : '';
        this.category = task ? task.category : '';
        this.assignedTo = task ? task.assignedTo : [];
        this.dueDate = task ? task.dueDate : '';
        this.priority = task ? task.priority : '';
        this.subtasks = task ? task.subtasks : [];
        this.createdAt = task ? task.createdAt : '';
        this.status = 'toDo';
        this.visible = false;
    }

    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            assignedTo: this.assignedTo,
            dueDate: this.dueDate,
            priority: this.priority,
            subtasks: this.subtasks,
            createdAt: this.createdAt,
            status: this.status,
            visible: this.visible
        }
    }
}