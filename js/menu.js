
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
      window.location.href = 'menu.html';  
    }, 500); 
  });

 
  const buttonActions = [
    { buttonClass: '.menus', url: 'menu.html' },
    
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


const scrollUp=document.querySelector(`.scroll_up`);

scrollUp.addEventListener(`click`,()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})
// Show the scroll button when user scrolls down a certain distance
window.addEventListener('scroll', function() {
  let scrollUpBtn = document.querySelector('.scroll_up');
  if (window.scrollY > 200) {  // When user scrolls down 200px
      scrollUpBtn.style.display = 'block';
  } else {
      scrollUpBtn.style.display = 'none';
  }
});

// Hide the scroll button after 3 seconds
setTimeout(function() {
  document.querySelector('.scroll_up').classList.add('hide');
}, 3000);

// Scroll to top when clicked
document.querySelector('.scroll_up').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
const lightIcon = document.querySelector('.light');
const darkIcon = document.querySelector('.dark');


const toggleModeInLocalStorage = () => {
  const currentMode = localStorage.getItem('lightmode');
  if (currentMode) {
    localStorage.removeItem('lightmode'); 
  } else {
    localStorage.setItem('lightmode', true); 
  }
};


const applyMode = () => {
  const isLightMode = localStorage.getItem('lightmode');

  if (isLightMode) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
};


const enableLightMode = () => {
  lightIcon.style.display = 'none'; 
  darkIcon.style.display = 'block'; 
  headerMode.classList.add('header_back');
  footerMode.classList.add('footer_back');
  cardBox.classList.add('card_box_back');
};


const enableDarkMode = () => {
  darkIcon.style.display = 'none'; 
  lightIcon.style.display = 'block'; 
  headerMode.classList.remove('header_back');
  footerMode.classList.remove('footer_back');
  cardBox.classList.remove('card_box_back');
};


lightIcon.addEventListener('click', () => {
  toggleModeInLocalStorage();
  applyMode();
});

darkIcon.addEventListener('click', () => {
  toggleModeInLocalStorage();
  applyMode();
});


applyMode();





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