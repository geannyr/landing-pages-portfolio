(function () {
  "use strict";

  // Preencha com os destinos reais antes de publicar. Enquanto vazio, os links
  // permanecem visíveis porém inativos, sem apontar para URLs inventadas.
  const CONTACT_LINKS = {
    github: "",
    linkedin: "",
    email: ""
  };

  const selectors = {
    navToggle: ".nav-toggle",
    nav: "#site-nav",
    currentYear: "#current-year",
    contactLinks: "[data-contact]",
    globalStatus: ".global-status"
  };

  function announce(message) {
    const status = document.querySelector(selectors.globalStatus);

    if (status) {
      status.textContent = message;
    }
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(selectors.navToggle);
    const nav = document.querySelector(selectors.nav);

    if (!toggle || !nav) {
      return;
    }

    function setMenuState(isOpen) {
      const accessibleText = toggle.querySelector(".sr-only");

      toggle.setAttribute("aria-expanded", String(isOpen));
      nav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);

      if (accessibleText) {
        accessibleText.textContent = isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação";
      }
    }

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.matches("a") && !event.target.hasAttribute("aria-disabled")) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        toggle.focus();
      }
    });

    const desktopViewport = window.matchMedia("(min-width: 1024px)");

    desktopViewport.addEventListener("change", function (event) {
      if (event.matches) {
        setMenuState(false);
      }
    });
  }

  function setupContactLinks() {
    document.querySelectorAll(selectors.contactLinks).forEach(function (link) {
      const key = link.dataset.contact;
      const url = CONTACT_LINKS[key];

      if (url) {
        link.href = url;
        link.removeAttribute("aria-disabled");

        if (key !== "email") {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }

        return;
      }

      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", function (event) {
        event.preventDefault();
        announce("Link de contato ainda não configurado.");
      });
    });
  }

  function updateCurrentYear() {
    const yearElement = document.querySelector(selectors.currentYear);

    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  function init() {
    setupMobileMenu();
    setupContactLinks();
    updateCurrentYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
