//header//
const header = document.querySelector('.header');

function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('transparent-header');
    } else {
        header.classList.remove('transparent-header');
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
  container.innerHTML = '';  

  if (recipes.length === 0) {
    container.innerHTML = '<p class="no_recipe">No Recipes Found</p>'; 
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

    container.innerHTML += card;
    
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
search.addEventListener('input', async (event) => {
  const recipes = await fetchProduct();
  const filter = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  createCards(filter); 
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



