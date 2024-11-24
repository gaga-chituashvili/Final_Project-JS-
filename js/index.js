// Reload the page when logo is clicked
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => window.location.reload(true));

// Navigate to respective pages when buttons are clicked
document.addEventListener('DOMContentLoaded', () => {
  const buttonActions = [
    { buttonClass: '.home', url: 'index.html' },
  ];

  buttonActions.forEach(({ buttonClass, url }) => {
    const button = document.querySelector(buttonClass);
    if (button) {
      button.addEventListener('click', () => location.href = url);
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