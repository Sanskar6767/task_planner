import { allProjects } from ".";
import { Project } from "./project";
import { navLinkActivate } from "./images";
import { createSingleProject } from "./singleproject";
import { updateActiveSidebar } from "./singleproject";



function createAllProjectForm(){
    const main = document.querySelector('.main');
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('form-wrapper')
    const form = document.createElement('form');
    form.classList.add('new-project-form');
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.setAttribute('for', 'projectname');
    label.textContent = 'Create New Project';
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'projectname');
    input.setAttribute('placeholder', 'Project Name');
    input.setAttribute('pattern', '^[A-Za-z][A-Za-z0-9_]*$');
    input.setAttribute('title', 'Must start with a letter and can only have letters, numbers, and underscores');
    input.required = true;
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.id = 'new-project-button';

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
    form.appendChild(button);
    formWrapper.appendChild(form);
    main.appendChild(formWrapper);

    projectFormSubmit();
}

function projectFormSubmit() {
    const form = document.querySelector('.new-project-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputElement = document.querySelector('input[name="projectname"]');
        const name = inputElement.value;
        if (inputElement.validity.typeMismatch) {
            alert('Only lowercase letters, numbers, and underscores are allowed');
        }
        if (allProjects.find(project => project.name === name)) {
            alert('Project with this name already exists');
            return;
        }
        if ((name.trim() !== '') && (name.length > 3)){
            const newProject = new Project(name);
            allProjects.push(newProject);
            console.log('Project added: ', newProject);
            inputElement.value = '';
            createAllProjectsPage();
        } else {
            console.log('Project Name should be atleast 4 characters')
        }
    });
}

function createProjectsList() {
    const main = document.querySelector('.main');
    const temptest = document.querySelector('.project-wrapper')
    if (temptest){
        temptest.remove();
    }
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
    const projectListTitle = document.createElement('div');
    projectListTitle.classList.add('projectlist-title');
    const h1 = document.createElement('h1');
    h1.textContent = 'All Projects';
    projectListTitle.appendChild(h1);
    projectWrapper.appendChild(projectListTitle);

    const projectList = document.createElement('div');
    projectList.classList.add('project-list');
    const ol = document.createElement('ol');

    allProjects.forEach(project => {
        const li = document.createElement('li');
        li.classList.add('project-item');
        li.setAttribute('data-project', project.name)
        const a = document.createElement('a');
        a.href = '#'
        const projectCard = document.createElement('div')
        projectCard.classList.add('projectcard');
        const h2 = document.createElement('h2');
        h2.classList.add('project-name');
        h2.textContent = project.name;
        const button = document.createElement('button');
        button.classList.add('remove-button');
        button.textContent = 'Remove';
        const hr = document.createElement('hr');

        // inserting them 
        projectCard.appendChild(h2);
        projectCard.appendChild(button);
        li.appendChild(projectCard);
        li.appendChild(hr);
        ol.appendChild(li);
    })
    
    projectList.appendChild(ol)
    projectWrapper.appendChild(projectList);
    main.appendChild(projectWrapper);

    // project list is clickable 
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            
            createSingleProject(projectName);
        });
    });

    // remove button
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectName = this.parentElement.querySelector('.project-name').textContent;
            const projectIndex = allProjects.findIndex(project => project.name === projectName);
            allProjects.splice(projectIndex, 1);
            createAllProjectsPage();
        });
    });

}

function sidebarUpdate(){
    const projects = document.querySelector('.projects');
    const listItems = projects.querySelectorAll('li:not(:first-child)');
    listItems.forEach(item => item.remove());

    allProjects.forEach(project => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.setAttribute('href', '#');
        const img = document.createElement('img');
        img.src = '';
        img.alt = '';
        img.classList.add('sideicon');
        img.classList.add('all');
        const span = document.createElement('span');
        span.textContent = project.name;

        a.appendChild(img);
        a.appendChild(span);
        li.appendChild(a);
        projects.appendChild(li);
    })
}



// Execution function 

export function createAllProjectsPage() {
    const main = document.querySelector('.main');
    main.innerHTML = '';
    createAllProjectForm();
    createProjectsList();
    sidebarUpdate();
    updateActiveSidebar();
}




