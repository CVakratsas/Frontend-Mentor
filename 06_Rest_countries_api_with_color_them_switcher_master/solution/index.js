"use strict";
// Declare variables
const SEARCH_FILTER = "name";
const CONTINENT_FILTER = "region";

// Load europe countries as default
loadCountries("europe", CONTINENT_FILTER);

// Dark mode button code section
const darkModeButton = document.getElementById("btnDarkMode");
darkModeButton.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkThemeEnabled",
    document.body.classList.contains("dark").toString()
  );
}

// Loading dark theme from browser memory
document.addEventListener("DOMContentLoaded", loadDarkModeOption);

function loadDarkModeOption() {
  const darkThemeEnabled = localStorage.getItem("darkThemeEnabled");
  if (darkThemeEnabled === "true") {
    toggleDarkMode();
  }
}

// Drop down code section
const filterButton = document.getElementById("filterButton");
const dropdown = document.querySelector(".options");
const dropdownOptions = document.querySelectorAll(".options h3");

filterButton.addEventListener("click", () => {
  toggleDropdown();
});

// Add event listeners to each continent option
dropdownOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    let lowercaseContinent = option.textContent.toLowerCase();
    loadCountries(lowercaseContinent, CONTINENT_FILTER);
    toggleDropdown();
  });
});

const toggleDropdown = () => {
  dropdown.classList.toggle("open");
};

// Event listener for the document to close the dropdown when focus is lost
document.addEventListener("click", (event) => {
  const filterButton = document.getElementById("filterButton");
  const dropdown = document.querySelector(".options");
  // Check if the clicked element is within the dropdown
  if (
    !filterButton.contains(event.target) &&
    !dropdown.contains(event.target)
  ) {
    dropdown.classList.remove("open");
  }
});

// Search bar code section
const searchButton = document.getElementById("searchButton");
const searchBar = document.querySelector(".search-bar input");

// Adding event listeners to the search image and to the enter key
searchButton.addEventListener("click", () => {
  handleSearch();
});

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Function to search the country
const handleSearch = () => {
  const lowercaseCountryName = searchBar.value.toLowerCase();
  loadCountries(lowercaseCountryName, SEARCH_FILTER);
};

/*
Function that sends the request to the server and populates
the countries section with the divs of each country
*/
function loadCountries(filter, typeOfFilter) {
  const url = new URL(
    "https://restcountries.com/v3.1/" + typeOfFilter + "/" + filter
  );
  url.searchParams.set("fields", "name,population,region,capital,flags");
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Empty the countries section before loading the new ones
      const countriesContainer = document.querySelector(".countries-container");
      countriesContainer.innerHTML = "";

      for (let country of data) {
        // Access the required information from the response
        const name = country.name.common;
        const region = country.region;
        const capital = country.capital;
        const population = country.population;
        const flag = country.flags.svg;
        const flagAlt = country.flags.alt;

        // Create the div element
        const divInfo = document.createElement("div");
        const divCountry = document.createElement("div");

        // Set the innerHTML of the divCountry and the divInfo
        divCountry.innerHTML = `
          <img src="${flag}" alt="${flagAlt}" />
        `;

        divInfo.innerHTML = `
        <h1>${name}</h1>
        <h3><strong>Population:</strong> ${population}</h3>
        <h3><strong>Region:</strong> ${region}</h3>
        <h3><strong>Capital:</strong> ${capital}</h3>
        `;

        // Set the css class for each container
        divCountry.classList.add("country-box", "shadow");
        divInfo.classList.add("info-container");

        // Construct country element
        divCountry.appendChild(divInfo);

        // Append it to the parent container
        countriesContainer.appendChild(divCountry);

        divCountry.addEventListener("click", () => {
          localStorage.setItem("countryName", name);
          window.location.href = "country.html";
        });
      }
    })
    .catch(() => {
      const countriesContainer = document.querySelector(".countries-container");
      const gifImage = document.createElement("img");
      gifImage.src = "gifs/planet_error.gif";
      gifImage.classList.add("gif-error");
      countriesContainer.appendChild(gifImage);
    });
}

function loadCountry(countryName) {
  window.location.href = "country.html";
  const name = localStorage.getItem("countryName");
  console.log(name);
}
