import * as index from "./index.js";
let darkModeButton = document.getElementById(btnDarkMode);
darkModeButton.addEventListener("click", index.handleDarkMode());
const countryName = localStorage.getItem("countryName");
const countryContainer = document.querySelector(".country-container");

console.log(countryContainer);
