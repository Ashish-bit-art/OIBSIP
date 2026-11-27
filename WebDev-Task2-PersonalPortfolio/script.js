// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

// Theme selector: theme preference is saved in this browser.
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeMenu = document.querySelector(".theme-menu");
const themeOptions = document.querySelectorAll(".theme-option");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const themeColors = {
  midnight: "#0b1220",
  ocean: "#071923",
  forest: "#101d19",
  violet: "#171326",
  light: "#f5f6fa"
};

function applyTheme(themeName) {
  const validTheme = themeColors[themeName] ? themeName : "midnight";
  root.dataset.theme = validTheme;
  themeOptions.forEach((option) => {
    const selected = option.dataset.theme === validTheme;
    option.setAttribute("aria-checked", String(selected));
  });
  themeMeta.setAttribute("content", themeColors[validTheme]);
  try {
    localStorage.setItem("ashish-portfolio-theme", validTheme);
  } catch (error) {
    // The selected theme still works for this page view if storage is unavailable.
  }
}

let savedTheme = "midnight";
try {
  savedTheme = localStorage.getItem("ashish-portfolio-theme") || "midnight";
} catch (error) {
  // Use the default theme if browser storage is unavailable.
}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isOpen = !themeMenu.hidden;
  themeMenu.hidden = isOpen;
  themeToggle.setAttribute("aria-expanded", String(!isOpen));
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.theme);
    themeMenu.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".theme-picker")) {
    themeMenu.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    themeMenu.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
