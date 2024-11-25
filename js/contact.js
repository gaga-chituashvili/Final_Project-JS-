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
const cardBox = document.querySelector('.card_box');
const headerMode = document.querySelector('.header');
const footerMode = document.querySelector('.footer');
const light = document.querySelector('.light');
const dark = document.querySelector('.dark');

const toggleModeInStorage = () => {
  const isLightMode = localStorage.getItem('lightmode');
  localStorage.setItem('lightmode', isLightMode ? '' : 'true');
};

const applyMode = () => {
  const isLightMode = localStorage.getItem('lightmode');
  light.style.display = isLightMode ? 'block' : 'none';
  dark.style.display = isLightMode ? 'none' : 'block';
  headerMode.classList.toggle('header_back', !isLightMode);
  footerMode.classList.toggle('footer_back', !isLightMode);
};

const applyCardBoxMode = () => {
  const isLightMode = localStorage.getItem('lightmode');
  if (cardBox) {
    cardBox.classList.toggle('card_box_back', !isLightMode);
  }
};

light.addEventListener('click', () => {
  toggleModeInStorage();
  applyMode();
  applyCardBoxMode();
});

dark.addEventListener('click', () => {
  toggleModeInStorage();
  applyMode();
  applyCardBoxMode();
});

applyMode();
applyCardBoxMode();



// Contact form validation
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

