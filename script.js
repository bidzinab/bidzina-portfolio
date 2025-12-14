/* ============================
   Footer year (safe, simple)
============================ */
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ============================
   Mobile menu toggle
============================ */
const menuBtn = document.querySelector(".menu");
const mobileNav = document.querySelector(".mobile");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

/* ============================
   Subtle reveal-on-scroll
   (professional, not flashy)
============================ */
const revealTargets = document.querySelectorAll(
  "section, .project, .metric, .t-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

/* ============================
   Projects filter (Highlights)
============================ */
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

if (filterButtons.length && projects.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projects.forEach((card) => {
