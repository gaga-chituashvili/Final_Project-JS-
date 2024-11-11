
// header

const logo = document.querySelector(`.logo`);
logo.addEventListener(`click`, (e) => {
  console.log(e);
  
  location.reload();
});

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


