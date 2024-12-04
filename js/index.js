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
      window.location.href = 'index.html'; 
    }, 500); 
  });

  
  const buttonActions = [
    { buttonClass: '.home', url: 'index.html' },
   
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
const aboutSection = document.querySelector('.about_section');
const aboutTitle = document.querySelector('.about_title');
const aboutText = document.querySelector('.about_text');
const h5 = document.querySelector('h5');


const toggleMode = () => {
  const currentMode = localStorage.getItem('lightmode');
  if (currentMode) {
    localStorage.removeItem('lightmode');
  } else {
    localStorage.setItem('lightmode', 'enabled');
  }
};


const applyMode = () => {
  const isLightMode = localStorage.getItem('lightmode');

  if (isLightMode) {
    toggle.classList.remove(`dark`);
    headerMode.classList.add('header_back');
    footerMode.classList.add('footer_back');
    aboutSection.classList.replace('about_section', 'about_section_back');
    aboutTitle.style.color = 'black';
    aboutText.style.color = 'black';
    h5.style.color = 'black';
  } else {
    toggle.classList.add(`dark`);
    headerMode.classList.remove('header_back');
    footerMode.classList.remove('footer_back');
    aboutSection.classList.replace('about_section_back', 'about_section');
    aboutTitle.style.color = 'white';
    aboutText.style.color = 'white';
    h5.style.color = 'white';
  }
};


toggle.addEventListener(`click`,()=>{
  toggleMode()
  applyMode()
})

applyMode();




// Slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider_item');
    let currentIndex = 0;
  
    const changeSlide = () => {
      slides.forEach(slide => slide.classList.remove('slider_item_active'));
      slides[currentIndex].classList.add('slider_item_active');
    };
  
    document.querySelector('.arrow.left').addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      changeSlide();
    });
  
    document.querySelector('.arrow.right').addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      changeSlide();
    });
  
    setInterval(() => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      changeSlide();
    }, 5000);
  });