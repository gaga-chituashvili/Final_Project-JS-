// Reload the page when logo is clicked
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => window.location.reload(true));

// Navigate to respective pages when buttons are clicked
document.addEventListener('DOMContentLoaded', () => {
  const buttonActions = [
    { buttonClass: '.menu', url: 'menu.html' },
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
const aboutSection=document.querySelector(`.about_section`);

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



// Fetch recipes and display cards
const fetchProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      return result.recipes || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };
  
  const createCards = (recipes) => {
    const container = document.querySelector('.card_box');
    container.innerHTML = recipes.length ? 
      recipes.map(item => `
        <section class="card">
          <article class="imgcard">
            <img class="image" src="${item.image}" alt="${item.name}">
          </article>
          <p class="title">${item.name}</p>
          <p class="ing">${item.ingredients}</p>
          <article class="desc_article">
            <button class="button_information">
              <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
              </svg>
              <span>Information</span>
            </button>
            <img src="image/xmark-circle-svgrepo-com.svg" class="xmark" style="display: none;">
            <p class="instructions" style="display: none;">${item.instructions}</p>
          </article>
        </section>`).join('') : '<p class="no_recipe">No Recipes Found</p>';
  
    // Toggle visibility of instructions
    document.querySelectorAll('.button_information').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btn.style.display = 'none';
        document.querySelectorAll('.instructions')[index].style.display = 'block';
        document.querySelectorAll('.xmark')[index].style.display = 'block';
      });
    });
  
    document.querySelectorAll('.xmark').forEach((xmark, index) => {
      xmark.addEventListener('click', () => {
        xmark.style.display = 'none';
        document.querySelectorAll('.instructions')[index].style.display = 'none';
        document.querySelectorAll('.button_information')[index].style.display = 'block';
      });
    });
  };
  
  const renderCards = async () => {
    const recipes = await fetchProduct();
    createCards(recipes);
  };
  
  renderCards();
  
  // Search functionality
  const search = document.querySelector('.search');
  if (search) {
    search.addEventListener('input', async (event) => {
      const recipes = await fetchProduct();
      const filter = recipes.filter(recipe => recipe.name.toLowerCase().includes(event.target.value.toLowerCase()));
      createCards(filter);
    });
  }