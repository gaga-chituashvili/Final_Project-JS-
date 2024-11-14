

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




const header = document.querySelector('.header');


function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('transparent_header');
    } else {
        header.classList.remove('transparent_header');
    }
}

window.addEventListener('scroll', handleScroll);









