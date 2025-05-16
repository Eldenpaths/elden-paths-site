document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("themeSelect");
  const link = document.getElementById("themeStylesheet");

  const stored = localStorage.getItem("eldenTheme") || "default";
  selector.value = stored;

  const applyTheme = (theme) => {
    if (theme === "default") {
      link.href = "style.css";
    } else {
      link.href = `theme-${theme}.css`;
    }
    localStorage.setItem("eldenTheme", theme);
  };

  selector.addEventListener("change", () => {
    applyTheme(selector.value);
  });

  applyTheme(stored);
});
