const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu");
const mobileNav = document.querySelector(".mobile");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });

  // close on click
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}
