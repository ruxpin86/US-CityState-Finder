const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((info) => info.json())
  .then((data) => cities.push(...data));

//Function to find if the city/state matches what was searched by the user
function findMatch(wordMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatch() {
  const matchArray = findMatch(this.value, cities);
  const html = matchArray.map((place) => {
    return `
        <li>
            <span class="name">${place.city}, ${place.state}</span>           
            <span class="population">${place.population}</span>           
        </li>
    `;
  });
  suggestions.innerHTML = html;
}

const searchField = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchField.addEventListener("change", displayMatch);
searchField.addEventListener("keyup", displayMatch);
