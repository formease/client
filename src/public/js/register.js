"use strict";

// Mode Toggler feature
const REGISTER_SECTION = document.querySelector(".register");
const SIGNIN_SECTION = document.querySelector(".sign-in");
const MODE_SWITCHER_CONTAINER = document.querySelector(".mode-switcher-container");

MODE_SWITCHER_CONTAINER.firstElementChild.addEventListener("click", function () {
  this.parentNode.dataset.currentMode = "register";
  REGISTER_SECTION.classList.remove("hidden");
  SIGNIN_SECTION.classList.add("hidden");
});
MODE_SWITCHER_CONTAINER.lastElementChild.addEventListener("click", function () {
  this.parentNode.dataset.currentMode = "signin";
  REGISTER_SECTION.classList.add("hidden");
  SIGNIN_SECTION.classList.remove("hidden");
});

// Automatic theme change
let defaultDarkMode = window.matchMedia("(prefers-color-scheme:dark)");

if (defaultDarkMode.matches) {
  document.documentElement.dataset.theme = "dark";
}

// PasswOrd length check
const REGISTER_FORM = REGISTER_SECTION.querySelector("form");
const SIGNIN_FORM = SIGNIN_SECTION.querySelector("form");

REGISTER_FORM.addEventListener("submit", passwordLengthCheck);
SIGNIN_FORM.addEventListener("submit", passwordLengthCheck);

function passwordLengthCheck(e) {
  let form = e.currentTarget;
  const passInput = form.querySelector('input[type="password"]');
  const errorBox = form.querySelector(".error-box");

  let valid = passInput.value.length >= 8 ? true : false;

  if (!valid) {
    errorBox.innerHTML = "Password should have least 8 characters.";
    e.preventDefault();
  }
}

// input placeholder effect

const TEXT_INPUTS = document.querySelectorAll('input[type="email"], input[type="password"]');

TEXT_INPUTS.forEach((input) => {
  input.addEventListener("input", inputPlaceholderEffectADD);
  input.addEventListener("blur", inputPlaceholderEffectREMOVE);
});
function inputPlaceholderEffectADD(e) {
  let input = e.currentTarget;

  if (input.value) {
    input.previousElementSibling.classList.add("active");
  }
}
function inputPlaceholderEffectREMOVE(e) {
  let input = e.currentTarget;

  if (!input.value) {
    input.previousElementSibling.classList.remove("active");
  }
}

// change section depending on the url
(function () {
  const currentURL = window.location.href;
  const URLObj = new URL(currentURL);

  let mode = URLObj.searchParams.get("mode");

  if (mode.toLowerCase() == "signin") {
    document.querySelector(".mode-switcher-container").dataset.currentMode = "sigin";
    document.querySelector("[data-signin-switcher]").click();
  }
})();
