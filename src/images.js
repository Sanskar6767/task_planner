import logo from './assets/logo.png';
import img from './assets/home-account.svg';

document.querySelector('.logo-wrapper img').src = logo;
document.querySelector('.all').src = img;













// sidebar
const navBar = document.querySelector("nav")
const toggleNavBtn = document.querySelector("#toggle-nav-btn")

toggleNavBtn.addEventListener("click", (event) => {
  toggleNav()
})

function toggleNav() {
  if (navBar.classList.contains("nav-min")){
    openNav()
  } else {
    closeNav()
  }
}

function openNav() {
  navBar.classList.remove("nav-min") 
  navBar.classList.add("nav-max") 
}

function closeNav() {
  navBar.classList.remove("nav-max") 
  navBar.classList.add("nav-min")
}

// Active sidebar 
export function navLinkActivate() {
  
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks) {
    return;
  }
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
        });
        this.parentElement.classList.add('active');
      });
    });
  
}
navLinkActivate();

// Medias
const phone = window.matchMedia("(width <= 480px)")

function media(e) {
  if (e.matches) {
    closeNav()
  } else {
    openNav()
  }
}

phone.addListener(media)
