// menu
const fetchproduct = async () => {
  const response = await fetch(`https://dummyjson.com/recipes`);
  const result = await response.json();
  return result.recipes;
};

const createCards = async (recipes) => {
  const container = document.querySelector(`.card_box`);
  for (let item of recipes) {
    let card = `
          <section class="card">
      <article class="imgcard"><img class="image" src="${item.image}"></article>
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
                           <img src="image/xmark-circle-svgrepo-com.svg" class="xmark">
                          <p class="instructions">${item.instructions}</p>
                          </article>
      </section>`;

    container.innerHTML += card;
  }

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
  const recipes = await fetchproduct();
  createCards(recipes);
};

renderCards();


const search = document.querySelector(`.search`);
search.addEventListener(`change`, async (event) => {
  const recipes = await fetchproduct();
  const filter = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  const container = document.querySelector(`.card_box`);
  container.innerHTML = ``;
  createCards(filter);
});


//contact//




  
