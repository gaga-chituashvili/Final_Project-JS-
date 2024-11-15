//header//

const header = document.querySelector('.header');


function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('transparent_header');
    } else {
        header.classList.remove('transparent_header');
    }
}

window.addEventListener('scroll', handleScroll);


//burger icon//

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


//slider//

const left = document.querySelector('.left');
const right = document.querySelector('.right');
const sliderItem = document.querySelectorAll('.slider_item');
let activeIndex = 0;

function updateActiveItem() {
  sliderItem.forEach(item => item.classList.remove('slider_item_active'));
  sliderItem[activeIndex].classList.add('slider_item_active');
}


left.addEventListener('click', () => {
  activeIndex = (activeIndex > 0) ? activeIndex - 1 : sliderItem.length - 1;
  updateActiveItem();
});

right.addEventListener('click', () => {
  activeIndex = (activeIndex < sliderItem.length - 1) ? activeIndex + 1 : 0;
  updateActiveItem();
});





//mode//

const cardBox = document.querySelector('.card_box');
const headerMode = document.querySelector('.header');
const footerMode = document.querySelector('.footer');
const light = document.querySelector('.light');
const dark = document.querySelector('.dark');


const toggleModeInStorage = () => {
  const isLightMode = localStorage.getItem('lightmode');
  if (isLightMode) {
    localStorage.removeItem('lightmode');
  } else {
    localStorage.setItem('lightmode', true);
  }
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
  cardBox.classList.toggle('card_box_back', !isLightMode);
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


















