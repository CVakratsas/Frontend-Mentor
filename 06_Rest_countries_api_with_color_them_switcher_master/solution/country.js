const countryName = localStorage.getItem("countryName");
const countryContainer = document.querySelector(".country-container");
loadCountryInfo(countryName);

// Dark mode button code section
const darkModeButton = document.getElementById("btnDarkMode");
darkModeButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  console.log(document.body.classList.contains("dark").toString());
  sessionStorage.setItem(
    "darkThemeEnabled",
    document.body.classList.contains("dark").toString()
  );
}

document.addEventListener("DOMContentLoaded", loadDarkModeOption);

export function loadDarkModeOption() {
  const darkThemeEnabled = sessionStorage.getItem("darkThemeEnabled");

  // Check if the preference exists in sessionStorage and if it's true enable it
  if (darkThemeEnabled === "true") {
    toggleDarkMode();
  }
}

const backButton = document.querySelector("main button.back");
backButton.addEventListener("click", () => {
  history.back();
});

function loadCountryInfo(name, typeOfFilter) {
  const url = new URL("https://restcountries.com/v3.1/name/" + name);
  url.searchParams.set(
    "fields",
    "flag,flags,name,population,region,subregion,capital,tld,currencies,languages,borders"
  );
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Emptying container
      countryContainer.innerHTML = "";

      // Settings tab flag
      const flagIcon = data[0].flag;
      document.title = countryName + " " + flagIcon;

      const flag = data[0].flags.svg;
      const flagAlt = data[0].flags.alt;
      const name = data[0].name.common;
      const nativeNames = data[0].name.nativeName;
      const nativeNamesList = Object.keys(nativeNames).map(
        (countryCode) => nativeNames[countryCode].common
      );
      const nativeNamesString = nativeNamesList.join(", ");

      const population = data[0].population;
      const region = data[0].region;
      const subRegion = data[0].subregion;
      const capital = data[0].capital;
      const tld = data[0].tld.join(", ");
      const currencies = data[0].currencies;
      const currenciesList = Object.keys(currencies).map(
        (curr) => currencies[curr].name
      );
      const currenciesString = currenciesList.join(", ");
      const languages = data[0].languages;
      const languagesList = Object.keys(languages).map(
        (langCode) => languages[langCode]
      );
      const languagesString = languagesList.join(", ");
      const borderCountriesList = data[0].borders;

      // Creating divs
      const detailsContainer = document.createElement("div");
      const generalDetailsContainer = document.createElement("div");
      const moreDetailsContainer = document.createElement("div");
      const borderCountriesContainer = document.createElement("div");
      const borderCountriesButtons = document.createElement("div");

      countryContainer.innerHTML = `
        <img src="${flag}" alt="${flagAlt}" />
      `;
      countryContainer.appendChild(detailsContainer);
      detailsContainer.innerHTML = `
        <h1>${name}</h1>
      `;
      detailsContainer.appendChild(generalDetailsContainer);
      detailsContainer.appendChild(moreDetailsContainer);
      detailsContainer.appendChild(borderCountriesContainer);

      generalDetailsContainer.innerHTML = `
        <h3><strong>Native Name:</strong> ${nativeNamesString}</h3>
        <h3><strong>Population:</strong> ${population}</h3>
        <h3><strong>Region:</strong> ${region}</h3>
        <h3><strong>Sub Region:</strong> ${subRegion}</h3>
        <h3><strong>Capital:</strong> ${capital}</h3>
      `;

      moreDetailsContainer.innerHTML = `
        <h3><strong>Top Level Domain:</strong> ${tld}</h3>
        <h3><strong>Currencies:</strong> ${currenciesString}</h3>
        <h3><strong>Languages:</strong> ${languagesString}</h3>
      `;

      borderCountriesContainer.innerHTML = `
        <h2>Border Countries:</h2>
      `;
      borderCountriesContainer.appendChild(borderCountriesButtons);
      borderCountriesList.forEach((borderCountryCode) => {
        fetchCountryName(borderCountryCode)
          .then((fullName) => {
            const borderCountryButton = document.createElement("button");
            borderCountryButton.setAttribute("type", "button");
            borderCountryButton.textContent = fullName; // Use the fetched full name instead of the code

            borderCountryButton.addEventListener("click", () => {
              loadCountryInfo(fullName);
            });

            borderCountriesButtons.appendChild(borderCountryButton);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      detailsContainer.classList.add("details-container");
      generalDetailsContainer.classList.add("general-details-container");
      moreDetailsContainer.classList.add("more-details-container");
      borderCountriesContainer.classList.add("border-countries-container");
      borderCountriesButtons.classList.add("border-countries-buttons");
    });
}

function fetchCountryName(countryCode) {
  return fetch(
    "https://restcountries.com/v3.1/alpha/" + countryCode + "?fields=name"
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      return jsonData.name.common; // Return the full name from this .then() block
    })
    .catch((error) => {
      console.log(error);
      throw error; // Rethrow the error to be handled in the caller
    });
}
