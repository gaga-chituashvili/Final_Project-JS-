// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
 
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', (e) => {
    e.preventDefault();  

    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    
    setTimeout(() => {
      window.location.href = 'contact.html';  
    }, 500); 
  });

 
  const buttonActions = [
    { buttonClass: '.contact', url: 'contact.html' },
    
  ];

  
  buttonActions.forEach(({ buttonClass, url }) => {
    const button = document.querySelector(buttonClass);
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();  

       
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        
        setTimeout(() => {
          window.location.href = url;
        }, 500);  
      });
    } else {
      console.error(`${buttonClass} button not found`);
    }
  });
});


// Header transparency on scroll
const header = document.querySelector('.header');
function handleScroll() {
  header.classList.toggle('transparent_header', window.scrollY > 50);
}

window.addEventListener('scroll', handleScroll);

// Burger menu toggle
const burger = document.querySelector('.header_burger');
const xmark = document.querySelector('.header_xmark');
const headerNav = document.querySelector('.header_nav');

function toggleMenu() {
  const isMenuVisible = headerNav.classList.contains('show');
  headerNav.classList.toggle('show', !isMenuVisible);
  burger.style.display = isMenuVisible ? 'block' : 'none';
  xmark.style.display = isMenuVisible ? 'none' : 'block';
}

burger.addEventListener('click', toggleMenu);
xmark.addEventListener('click', toggleMenu);




// Light/Dark mode toggle

const toggle=document.querySelector(`.toggle`);
const headerMode = document.querySelector('.header');
const footerMode = document.querySelector('.footer');
const contactBox = document.querySelector('.contact_box');



const isLightMode = () => localStorage.getItem('lightmode') === 'true';


const toggleModeInStorage = () => {
  const currentMode = isLightMode();
  localStorage.setItem('lightmode', !currentMode);
};

const applyMode = () => {
  if (isLightMode()) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
};

const enableLightMode = () => {
  toggle.classList.remove(`dark`);
  headerMode.classList.add('header_back');
  footerMode.classList.add('footer_back');
  contactBox.classList.add('contact_box_back');
};


const enableDarkMode = () => {
  toggle.classList.add(`dark`);
  headerMode.classList.remove('header_back');
  footerMode.classList.remove('footer_back');
  contactBox.classList.remove('contact_box_back');
};

toggle.addEventListener(`click`,()=>{
  toggleModeInStorage()
  applyMode()
})



applyMode();

//validation

const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

const patterns = {
  Firstname: /^[a-z\d]{1,12}$/i,
  Email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  Textarea: /^[\d\w@-]{1,150}$/i,
};

const validateInput = (field) => {
  const pattern = patterns[field.name];
  if (pattern) {
    field.className = pattern.test(field.value) ? 'valid' : 'invalid';
  }
};

inputs.forEach(input => input.addEventListener('keyup', (event) => validateInput(event.target)));
textarea.addEventListener('keyup', (event) => validateInput(event.target));

