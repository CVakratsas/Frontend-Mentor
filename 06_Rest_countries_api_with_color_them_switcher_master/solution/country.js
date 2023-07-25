const countryName = localStorage.getItem("countryName");
const countryContainer = document.querySelector(".country-container");
countryContainer.innerHTML = `
    <button>Back</button>
`;
loadCountryInfo(countryName);

function loadCountryInfo(name) {
  fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=flag,name,population,region,subregion,capital,tld,currencies,languages,borders"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   const flag = data[0].flags.svg;
      const name = data[0].name.common;
      // const nativeName = data[0].name.nativeName[0].common;
      //   const population = data[0].population;
      //   const region = data[0].region;
      //   const subRegion = data[0].subregion;
      //   const capital = data[0].capital;
      //   const tld = data[0].tld;
      //   const currencies = data[0].currencies[0].name;
      //   const languages = data[0].languages[0];
      //   const borders = data[0].borders[0];

      countryContainer.innerHTML += `
        <h1>${name}</h1>;
        `;
      //      <img src="${flag}" alt="Flag of ${name}"></img>
      //      <span>Native Name: </span>;
      //     <span>Population: </span>
      //     <span>Region: </span>
      //     <span>Sub Region: </span>
      //     <span>Capital: </span>
      //     </br>
      //     </br>
      //     <span>Top Level Domain: </span>
      //     <span>Currencies: </span>
      //     <span>Languages: </span>
      //     </br>
      //     </br>
      //     <span>Border Countries: </span>
      //   `;
    });
}
