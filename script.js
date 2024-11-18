
const logo=document.querySelector(`.logo`);
logo.addEventListener(`click`,()=>{
  window.location.reload(true);
})


document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.querySelector('.home');
  
  if (homeButton) {  
    homeButton.addEventListener('click', () => {
      location.href = 'index.html';
    });
  } else {
    console.error('Home button not found');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menusButton = document.querySelector('.menus');
  
  if (menusButton) {  
    menusButton.addEventListener('click', () => {
      location.href = 'menu.html';
    });
  } else {
    console.error('Menu button not found');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contactButton = document.querySelector('.contact');
  
  if (contactButton) {  
    contactButton.addEventListener('click', () => {
      location.href = 'contact.html';
    });
  } else {
    console.error('Contact button not found');
  }
});




//header//
const header = document.querySelector('.header');

function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('transparent_header');
    } else {
        header.classList.remove('transparent_header');
    }
}


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


window.addEventListener('scroll', handleScroll);



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









//menus//

const fetchProduct = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    if (!response.ok) throw new Error("Network response was not ok");
    const result = await response.json();
    return result.recipes || [];   
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; 
  }
};



const createCards = async (recipes) => {
  const container = document.querySelector('.card_box');

  if (container)
  {
    container.innerHTML = '';
  }

  if (recipes.length === 0) {
    if (container)
    {
      container.innerHTML = '<p class="no_recipe">No Recipes Found</p>'; 
    }
    return;
  }

  

  recipes.forEach(item => {
    const card = `
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
      </section>`;

    if (container)
    {
      container.innerHTML += card;
    }
    
  });

  const xmarks = document.querySelectorAll(".xmark");
  const instructions = document.querySelectorAll(".instructions");
  const btn = document.querySelectorAll(".button_information");

  btn.forEach((desc, index) => {
    desc.addEventListener("click", () => {
      desc.style.display = "none";
      instructions[index].style.display = "block";
      xmarks[index].style.display = "block";
    });
  });

  xmarks.forEach((xmark, index) => {
    xmark.addEventListener("click", () => {
      xmark.style.display = "none";
      instructions[index].style.display = "none";
      btn[index].style.display = "block";
    });
  });
};

const renderCards = async () => {
  const recipes = await fetchProduct();
  createCards(recipes);
};

renderCards();

const search = document.querySelector('.search');
if (search)
{
  search.addEventListener('input', async (event) => {
    const recipes = await fetchProduct();
    const filter = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    createCards(filter); 
  });
}


//slider//


document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".slider_item");
  let currentIndex = 0;
  
  
  function changeSlide() {

    slides.forEach(slide => {
      slide.classList.remove("slider_item_active");
    });
    
  
    slides[currentIndex].classList.add("slider_item_active");
  }
  
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  leftArrow.addEventListener("click", function() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    changeSlide();
  });

  rightArrow.addEventListener("click", function() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    changeSlide();
  });

  
  setInterval(function() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    changeSlide();
  }, 5000); 
  
});





//contact//

const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

const patterns = {
  Firstname: /^[a-z\d]{1,12}$/i,
  Email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  Textarea: /^[\d\w@-]{1,150}$/i,
};

function validateInput(field) {
  const pattern = patterns[field.name];
  if (pattern) {
    if (pattern.test(field.value)) {
      field.className = "valid";
    } else {
      field.className = "invalid";
    }
  }
}


inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    validateInput(event.target);
  });
});

textarea.addEventListener("keyup", (event) => {
  validateInput(event.target);
});


