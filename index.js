import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States

let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  return data;
}

const items = await fetchCharacters();
const maxPage = items.info.pages;

console.log(maxPage);
console.log(items.info);

function showCharacter(items) {
  cardContainer.innerHTML = "";
  items.results.forEach((item) =>
    CharacterCard(item.image, item.name, item.status)
  );
}

showCharacter(items);

nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    const items = await fetchCharacters();
    showCharacter(items);
    pagination.textContent = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", async () => {
  if (1 < page) {
    page--;
    const items = await fetchCharacters();
    showCharacter(items);
    pagination.textContent = `${page} / ${maxPage}`;
  }
});
