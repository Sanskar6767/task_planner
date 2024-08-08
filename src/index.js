import './style/style.css';
import './style/allproject.css';
import './images'; //images.js
import './allproject';
import './style/singleproject.css';
import { createAllProjectsPage } from './allproject';
import { formSubmitNew } from './allproject';
import { navLinkActivate } from './images';
import './singleproject';
import flatpickr from 'flatpickr';
import { singleProjectLoad } from './singleproject';
import { Project } from './project';
import { TodoItem } from './todo';
import { createSingleProject } from './singleproject';


const project1 = new Project('Project_1');
project1.addTask(new TodoItem('Task 1', 'Details of Task 1', '2024-06-30', true, false));
project1.addTask(new TodoItem('Task 2', 'Details of Task 2', '2024-07-01', false, false));

const project2 = new Project('Project_2');
project2.addTask(new TodoItem('Task 21', 'Details of Task 21', '2024-06-30', true, false));
project2.addTask(new TodoItem('Task 22', 'Details of Task 22', '2024-07-01', false, false));

const project3 = new Project('Project_3');
project3.addTask(new TodoItem('Task 31', 'Details of Task 31', '2024-06-29', false, false));
project3.addTask(new TodoItem('Task 32', 'Details of Task 32', '2024-07-02', true, false));

export let allProjects = [project1, project2, project3];


createAllProjectsPage(); 
// createSingleProject('Project_1');
// formSubmitNew();

document.querySelector('.all-pro').addEventListener('click', function() {
    createAllProjectsPage();
});

