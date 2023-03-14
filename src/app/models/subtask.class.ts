export class Subtask {
    text: string;
    done: boolean;

    constructor(subtask?: any) {
        this.text = subtask ? subtask.text : '';
        this.done = false;
    }

    public toJSON() {
        return {
            text: this.text,
            done: this.done
        }
    }
}