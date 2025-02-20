const mobileMenu = document.createElement("i");
mobileMenu.className = "fas fa-bars mobile-menu";
document.querySelector(".terminal-menu").appendChild(mobileMenu);

mobileMenu.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("nav-active");
});
