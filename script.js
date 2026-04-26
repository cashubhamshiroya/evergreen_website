const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("[data-year]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navToggle.setAttribute("aria-expanded", String(!isOpen));
  document.body.classList.toggle("nav-open", !isOpen);
  header?.classList.toggle("is-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLAnchorElement)) {
    return;
  }

  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  header?.classList.remove("is-open");
});

const revealItems = document.querySelectorAll(".reveal");
const shouldReplayReveal = (element) => element.classList.contains("service-card");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          if (!shouldReplayReveal(entry.target)) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (shouldReplayReveal(entry.target)) {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
