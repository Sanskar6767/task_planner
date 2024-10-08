import { format } from "date-fns";

export class TodoItem {
    constructor(title, desc, duedate, priority = false, completed = false) {
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = priority;
        this.completed = completed;
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