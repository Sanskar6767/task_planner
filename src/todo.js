import { format } from "date-fns";

export class TodoItem {
    constructor(title, desc, duedate, priority) {
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = false;
        this.completed = false
    }

    changeTitle(name){
        this.title = name;
    }
    changePriority() {
        this.priority = !this.priority;
    }
    changeDuedate(duedate){
        this.duedate = duedate;
    }
    changeDesc(desc){
        this.desc = desc;
    }
    getFormattedDate() {
        return format(this.duedate, 'PP');
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
    setCompletion(status) {
        this.completed = status
    }
}