// Theme toggle with localStorage persistence
(function () {
  const storageKey = "site-theme";
  const html = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const osDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    html.classList.remove("theme-light", "theme-dark");
    if (theme === "dark") html.classList.add("theme-dark");
    if (theme === "light") html.classList.add("theme-light");
  }

  // Initial theme: stored -> OS preference (implicit via CSS) -> none
  const saved = localStorage.getItem(storageKey);
  if (saved === "dark" || saved === "light") applyTheme(saved);
  else applyTheme(osDark ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      const current = html.classList.contains("theme-dark") ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(storageKey, next);
      toggle.setAttribute("aria-label", `Use ${current} theme`);
    });
  }
})();
