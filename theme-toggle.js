const themeMap = {
  parchment: "theme-parchment.css",
  frazetta: "theme-frazetta.css",
  dark: "theme-dark.css",
  snow: "theme-snow.css"
};

const themeSelector = document.getElementById("themeSelector");
const stylesheetLink = document.getElementById("themeStylesheet");

themeSelector.addEventListener("change", () => {
  const selected = themeSelector.value;
  stylesheetLink.href = themeMap[selected] || "theme-parchment.css";
});

window.addEventListener("DOMContentLoaded", () => {
  const defaultTheme = "parchment";
  themeSelector.value = defaultTheme;
  stylesheetLink.href = themeMap[defaultTheme];
});
