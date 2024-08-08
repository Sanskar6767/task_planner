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
            console.log(selectedProject);
        } 
    });
    if (!selectedProject) {
        console.log('Project not found!');
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

    selectedProject.tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('taskItem');
        taskItem.dataset.taskIndex = index; // Store the index in a data attribute
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


    // all the eventlisteners for the task items
    const tasks = document.querySelectorAll('.taskItem');
    tasks.forEach(task => {
        task.addEventListener('click', function() {
            if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') { // Ignore clicks on the checkbox and buttons to open the task
                const tasknumber = this.dataset.taskIndex;
                taskOpener(selectedProject, tasknumber);
            } else if (event.target.tagName === 'INPUT') { 
                if (event.target.id === 'completed'){   // Handle clicks on the completion checkbox
                    const tasknumber = this.dataset.taskIndex;
                    changeCompletionStatus(selectedProject, tasknumber);
                } else if (event.target.id === 'priority') { // Handle clicks on the priority checkbox
                    const tasknumber = this.dataset.taskIndex;
                    changePriorityStatus(selectedProject, tasknumber);
                }
            } else if (event.target.tagName === 'BUTTON') { // Handle clicks on the edit and remove buttons
                if (event.target.classList.contains('edit')) {
                    const tasknumber = this.dataset.taskIndex;
                    editTaskForm(selectedProject, tasknumber);
                } else if (event.target.classList.contains('remove')) {
                    const tasknumber = this.dataset.taskIndex;
                    removeTask(selectedProject, tasknumber);
                }
            }
        });
    });
    
}


function taskOpener(selectedProject, tasknumber) {  // Function to open the task in a modal
    const task = selectedProject.tasks[tasknumber];
    console.log(task);
    //  write the js code to create this Modal Structure
    // <div id="taskModal" class="modal">
    //     <div class="modal-content">
    //         <span class="close-button">&times;</span>
    //         <h2 id="modalTaskTitle">Task Title</h2>
    //          <div class="content">
        //         <p id="modalTaskDesc">Task Description</p>
        //         <p id="modalTaskDueDate">Due Date: <span></span></p>
        //         <p id="modalTaskPriority">Priority: <span></span></p>
        //         <p id="modalTaskCompleted">Completed: <span></span></p>
                //</div>
    //     </div>
    // </div>

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'taskModal';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';

    const h2 = document.createElement('h2');
    h2.id = 'modalTaskTitle';
    h2.textContent = task.title;

    const content = document.createElement('div');
    content.classList.add('content')

    const p1 = document.createElement('p');
    p1.id = 'modalTaskDesc';
    p1.textContent = task.desc;

    const p2 = document.createElement('p');
    p2.id = 'modalTaskDueDate';
    p2.textContent = `Due Date: ${task.duedate}`;

    const p3 = document.createElement('p');
    p3.id = 'modalTaskPriority';
    p3.textContent = `Priority: ${task.priority}`;

    const p4 = document.createElement('p');
    p4.id = 'modalTaskCompleted';
    p4.textContent = `Completed: ${task.completed}`; 

    modalContent.appendChild(closeButton);
    modalContent.appendChild(h2);
    content.appendChild(p1);
    content.appendChild(p2);
    content.appendChild(p3);
    content.appendChild(p4);
    modalContent.appendChild(content);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const close = document.querySelector('.close-button');
    close.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
}

function changeCompletionStatus(selectedProject, tasknumber) { // Function to change the completion status of a task
    const task = selectedProject.tasks[tasknumber];
    task.toggleCompletion();
    createSingleProject(selectedProject.name );
}

function changePriorityStatus(selectedProject, tasknumber) { // Function to change the priority status of a task
    const task = selectedProject.tasks[tasknumber];
    task.changePriority();
    createSingleProject(selectedProject.name);
}

function editTaskForm(selectedProject, tasknumber) { // Function to edit a task
    const task = selectedProject.tasks[tasknumber];
    // Write the js code to create this form structure that would be able to change the description and duedate only
    // <form id="edit-task-form">
    //     <div class="form-group">
    //         <label for="task-desc">Task Description:</label>
    //         <textarea id="task-desc" name="task-desc"></textarea>
    //     </div>
    //     <div class="form-group">
    //         <label for="task-deadline">Deadline:</label>
    //         <input type="date" id="task-deadline" name="task-deadline">
    //     </div>
    //     <div class="form-buttons">
    //         <button type="submit" id="submit-button">Submit</button>
    //         <button type="button" id="cancel-button">Cancel</button>
    //     </div>
    // </form>

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const form = document.createElement('form');
    form.id = 'edit-task-form';

    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const ltaskdesc = document.createElement('label');
    ltaskdesc.textContent = 'Task Description:';
    ltaskdesc.setAttribute('for', 'task-desc');
    

    const tinput = document.createElement('textarea');
    tinput.id = 'task-desc';
    tinput.setAttribute('name', 'task-desc');
    tinput.textContent = task.desc;

    formGroup1.appendChild(ltaskdesc);
    formGroup1.appendChild(tinput);

    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const taskDeadline = document.createElement('label');
    taskDeadline.textContent = 'Deadline:';
    taskDeadline.setAttribute('for', 'task-deadline');

    const idate = document.createElement('input');
    idate.id = 'task-deadline';
    idate.setAttribute('name', 'task-deadline');
    idate.setAttribute('type', 'date');
    idate.value = task.duedate;

    formGroup2.appendChild(taskDeadline);
    formGroup2.appendChild(idate);

    const formButton = document.createElement('div');
    formButton.classList.add('form-buttons');

    const button1 = document.createElement('button');
    button1.setAttribute('type', 'submit');
    button1.textContent = 'Submit';
    button1.id = 'submit-button';

    const button2 = document.createElement('button');
    button2.setAttribute('type', 'button');
    button2.textContent = 'Cancel';
    button2.id = 'cancel-button';

    formButton.appendChild(button1);
    formButton.appendChild(button2);

    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(formButton);

    modal.appendChild(form);
    document.body.appendChild(modal);

    flatpickr("#task-deadline", {
        dateFormat: "Y-m-d",
        minDate: "today", // Disables past dates
    });

    button2.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        updateTaskForm(selectedProject, tasknumber, tinput.value, idate.value);
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });

}

function updateTaskForm(selectedProject, tasknumber, desc, date) { // Function to update the task from edit task form
    const task = selectedProject.tasks[tasknumber];
    task.changeDesc(desc);
    task.changeDuedate(date);
    createSingleProject(selectedProject.name);
}

function removeTask(selectedProject, tasknumber) { // Function to remove a task
    selectedProject.tasks.splice(tasknumber, 1);
    createSingleProject(selectedProject.name);
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
    tinput.setAttribute('placeholder', 'Enter Task Name');
    tinput.setAttribute('pattern', '^[A-Za-z][A-Za-z0-9_]*$');

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
    
    validateTaskForm(projectName);
    
}

function validateTaskForm(projectName) {
    const form = document.getElementById('add-task-form');
    const tinput = document.getElementById('task-name');
    const textarea = document.getElementById('task-desc');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = tinput.value;
        if (name.length< 4 || name.length >28){
            alert('Task name should be with 4-28 characters');
            return;
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

        const task = new TodoItem(name, description, deadline, priority, false);
        const project = allProjects.find(p => p.name === projectName);
        if (project.tasks.find(t => t.title === name)){
            alert('Task with this name already exists');
            return;
        }
        project.addTask(task);
        console.log('it worked');
        createSingleProject(projectName);
        console.log(project);

    }); 
}


export function updateActiveSidebar(projectname) {
    const projects = document.querySelector('.projects');
    const listItems = projects.querySelectorAll('li:not(:first-child)');
    const allProject = document.querySelector('.all-pro');
    allProject.addEventListener('click', function() {
        allProActive('active');
    });

    listItems.forEach(list => {
        list.addEventListener('click', function() {
            const projectlink = list.querySelector('a');
            const projectName = projectlink.querySelector('span').textContent;
            createSingleProject(projectName);
        });
    });
    if(!projectname) {
        allProActive('active');
        return;
    }
    listItems.forEach(list => {
        let span = list.querySelector('span').textContent;
        if (span === projectname) {
            list.classList.add('active');
            allProActive('inactive');
        } else {
            list.classList.remove('active');
        }
    });



}

function allProActive(status){
    const allProject = document.querySelector('.all-pro');
    if (status === 'active'){
        allProject.parentElement.classList.add('active');
    } else {
        allProject.parentElement.classList.remove('active');
    }
}







export function createSingleProject(projectname) {
    updateActiveSidebar(projectname);
    singleProjectLoad(projectname);
    makeTaskForm(projectname);
}