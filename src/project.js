export class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removetask(taskIndex){
        this.tasks.splice(taskIndex, 1);
    }

    getTasks() {
        return this.tasks;
    }
}