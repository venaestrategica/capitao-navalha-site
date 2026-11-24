(function () {
  "use strict";

  /* ===== Animação do título: só na primeira carga ===== */
  var title = document.getElementById("title");

  function isFirstLoad() {
    if (window.location.hash) return false;
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      if (nav) return nav.type === "navigate";
      // Fallback para navegadores antigos (API Navigation Timing nível 1)
      if (performance.navigation) return performance.navigation.type === 0;
    } catch (e) {}
    return true;
  }

  if (title && isFirstLoad() &&
      window.matchMedia("(min-width: 1218px) and (min-height: 511px)").matches) {
    title.classList.add("is-animated");
    title.addEventListener("animationend", function () {
      title.classList.remove("is-animated");
    }, { once: true });
  }

  /* ===== Aviso de cookies (LGPD) ===== */
  var KEY = "eleven_cookie_choice";
  var bar = document.getElementById("cookie-bar");
  if (!bar) return;

  function getChoice() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function saveChoice(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) {}
  }

  function hide() {
    bar.hidden = true;
  }

  if (!getChoice()) bar.hidden = false;

  bar.addEventListener("click", function (event) {
    var target = event.target.closest("button");
    if (!target) return;
    if (target.classList.contains("cookie__close")) {
      hide();
    } else if (target.dataset.choice) {
      saveChoice(target.dataset.choice);
      hide();
    }
    // "Customize" não faz nada.
  });
})();
