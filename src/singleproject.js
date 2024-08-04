import { allProjects } from ".";
import { Project } from "./project";
import { TodoItem } from "./todo";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



export function singleProjectLoad(projectname) {
    let selectedProject;
    allProjects.forEach(project => {
        if (projectname === project.name){
            selectedProject = project;
        } 
    });
    if (!selectedProject) {
        console.log('Project not found');
        return;
    };
    const main = document.querySelector('.main');
    main.innerHTML = '';
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title-wrapper');
    const h1 = document.createElement('h1');
    h1.textContent = selectedProject.name;
    titleWrapper.appendChild(h1);
    projectWrapper.appendChild(titleWrapper);

    const tasklistWrapper = document.createElement('div');
    tasklistWrapper.classList.add('tasklist-wrapper');

    selectedProject.tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('taskItem');
        const leftTask = document.createElement('div');
        leftTask.classList.add('left-task');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'Completed');
        input.id = 'completed';
        if (task.completed){
            input.checked = true;
        }
        const h2 = document.createElement('h2');
        h2.textContent = task.title;
        const rightTask = document.createElement('div');
        rightTask.classList.add('right-task');
        const input2 = document.createElement('input');
        input2.setAttribute('type', 'checkbox');
        input2.setAttribute('name', 'Priority');
        input2.id = 'priority';
        if (task.priority){
            input2.checked = true;
        }
        const date = document.createElement('p');
        date.textContent = task.duedate;
        const edit = document.createElement('button');
        edit.classList.add('edit');
        edit.textContent = 'Edit'
        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.textContent = 'Remove';

        leftTask.appendChild(input);
        leftTask.appendChild(h2);
        rightTask.appendChild(input2);
        rightTask.appendChild(date);
        rightTask.appendChild(edit);
        rightTask.appendChild(remove);
        taskItem.appendChild(leftTask);
        taskItem.appendChild(rightTask);
        tasklistWrapper.appendChild(taskItem);

        const hr = document.createElement('hr');
        tasklistWrapper.appendChild(hr);

    })
    projectWrapper.appendChild(tasklistWrapper);
    main.appendChild(projectWrapper);
    const taskaddWrapper = document.createElement('div');
    taskaddWrapper.classList.add('taskadd-wrapper');
    main.appendChild(taskaddWrapper);
    
}


export function makeTaskForm(projectName) {
    
    const main = document.querySelector('.main');
    const taskaddWrapper = document.querySelector('.taskadd-wrapper');

    const section = document.createElement('section');
    section.classList.add('task-container');

    const taskAddDiv = document.createElement('div');
    taskAddDiv.classList.add('task-add-div');
    
    const form = document.createElement('form');
    form.id = 'add-task-form';

    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const ltaskname = document.createElement('label');
    ltaskname.textContent = 'Task Name* :'
    ltaskname.setAttribute('for', 'task-name');

    const tinput = document.createElement('input');
    tinput.setAttribute('type', 'text');
    tinput.id ='task-name';
    tinput.setAttribute('name' ,'task-name');
    tinput.required = true;

    formGroup1.appendChild(ltaskname);
    formGroup1.appendChild(tinput);

    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const taskdesc = document.createElement('label');
    taskdesc.textContent = 'Task Description (Optional) :';
    taskdesc.setAttribute('for', 'task-desc');

    const textarea = document.createElement('textarea');
    textarea.id = 'task-desc';
    textarea.setAttribute('name', 'task-desc');

    formGroup2.appendChild(taskdesc);
    formGroup2.appendChild(textarea);

    const formGroup3 = document.createElement('div');
    formGroup3.classList.add('form-group');

    const taskDeadline = document.createElement('label');
    taskDeadline.textContent = 'Deadline:';
    taskDeadline.setAttribute('for', 'task-deadline');

    const idate = document.createElement('input');
    idate.id = 'task-deadline';
    idate.setAttribute('name', 'task-deadline');
    idate.setAttribute('type', 'date');


    formGroup3.appendChild(taskDeadline);
    formGroup3.appendChild(idate);

    const formGroup4 = document.createElement('div');
    formGroup4.classList.add('form-group');

    const taskImp = document.createElement('label');
    taskImp.textContent = 'Priority:';
    taskImp.setAttribute('for', 'task-important');

    const ipriority = document.createElement('input');
    ipriority.id = 'task-priority';
    ipriority.classList.add('star');
    ipriority.setAttribute('name', 'task-priority');
    ipriority.setAttribute('type', 'checkbox');


    formGroup4.appendChild(taskImp);
    formGroup4.appendChild(ipriority);

    const formButton = document.createElement('div');
    formButton.classList.add('form-buttons');

    const button1 = document.createElement('button');
    button1.setAttribute('type', 'submit');
    button1.textContent = 'Add Task';
    button1.id = 'submit-button';

    const button2 = document.createElement('button');
    button2.setAttribute('type', 'button');
    button2.textContent = 'Cancel';
    button2.id = 'cancel-button';

    formButton.appendChild(button1);
    formButton.appendChild(button2);

    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(formGroup3);
    form.appendChild(formGroup4);
    form.appendChild(formButton);

    taskAddDiv.appendChild(form);
    section.appendChild(taskAddDiv);
    taskaddWrapper.appendChild(section);

    flatpickr("#task-deadline", {
        dateFormat: "Y-m-d",
        minDate: "today", // Disables past dates
      });
        
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = tinput.value;
        if (name.length< 4 || name.length >28){
            alert('Task name should be with 4-28 characters');
            return
        }
        let description = 'No description mentioned'
        if (textarea.value){
            description = textarea.value;
        }
        const deadline = document.getElementById('task-deadline').value;
        if (!deadline) {
            alert('Deadlines or duedates are necessary');
            return;
        }

        const isPriority = document.getElementById('task-priority').checked;
        let priority = false;
        if (isPriority){
            priority = true;
        }

        const task = new TodoItem(name, description, deadline, priority);
        const project = allProjects.find(p => p.name === projectName);
        project.addTask(task);
        console.log('it worked');
        createSingleProject(projectName);
        console.log(project);

    }); 
}


export function createSingleProject(projectname) {
    singleProjectLoad(projectname);
    makeTaskForm(projectname);
}