const burgerBtn = document.getElementById("burgerBtn");
const menu = document.getElementById("menuNav");

burgerBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});