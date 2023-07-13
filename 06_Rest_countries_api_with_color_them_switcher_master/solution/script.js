"use strict";

// const dropdown = document.querySelector(".dropdown-container");
// dropdown.addEventListener("click", showDropDown);

// function showDropDown() {
//   if (dropdown.style.display === "none") {
//     dropdown.style.display = "block";
//   } else {
//     dropdown.style.display = "none";
//   }
// }

fetch(
  "https://restcountries.com/v3.1/region/europe?fields=name,population,region,capital,flags"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
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

      // Set the css class for each country container
      divCountry.classList.add("country-box");
      divInfo.classList.add("info-container");

      divCountry.appendChild(divInfo);

      // Append the divCountry to the parent HTML element
      const countriesContainer = document.getElementsByClassName(
        "countries-container"
      )[0];
      countriesContainer.appendChild(divCountry);
    }
  })
  .catch(function (error) {
    console.log("Error:", error);
  });
