(function () {
  "use strict";

  // Só entra no estado "oculto antes de revelar" (.js-reveal, ver style.css)
  // quando o navegador suporta IntersectionObserver — sem isso, o conteúdo
  // nunca é escondido, então nunca fica permanentemente invisível.
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
  }

  const selectors = {
    navToggle: ".nav-toggle",
    nav: "#site-nav",
    objectionButtons: ".objection-item button",
    pipelineColumnHeaders: ".pipeline__col-header",
    trialForm: ".trial-form",
    currentYear: "#current-year",
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
      if (event.target.matches("a")) {
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

  function setupObjections() {
    document.querySelectorAll(selectors.objectionButtons).forEach(function (button) {
      button.addEventListener("click", function () {
        const contentId = button.getAttribute("aria-controls");
        const content = contentId ? document.getElementById(contentId) : button.nextElementSibling;
        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isOpen));

        if (content) {
          content.hidden = isOpen;
        }
      });
    });
  }

  // Realce visual de uma etapa do pipeline ao clicar no cabeçalho da coluna —
  // reforça a leitura do funil sem simular drag-and-drop real.
  function setupPipelineFocus() {
    const headers = document.querySelectorAll(selectors.pipelineColumnHeaders);

    if (headers.length === 0) {
      return;
    }

    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        const isPressed = header.getAttribute("aria-pressed") === "true";

        headers.forEach(function (other) {
          other.setAttribute("aria-pressed", "false");
        });

        header.setAttribute("aria-pressed", String(!isPressed));
      });
    });
  }

  function setFieldError(field, message) {
    const errorId = field.getAttribute("aria-describedby");
    const error = errorId ? document.getElementById(errorId) : null;

    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (error) {
      error.textContent = message;
    }
  }

  function validateEmail(field) {
    const value = field.value.trim();

    if (!value) {
      setFieldError(field, "Preencha este campo.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldError(field, "Informe um e-mail válido.");
      return false;
    }

    setFieldError(field, "");
    return true;
  }

  function validateField(field) {
    if (field.type === "email") {
      return validateEmail(field);
    }

    if (field.required && !field.value.trim()) {
      setFieldError(field, "Preencha este campo.");
      return false;
    }

    setFieldError(field, "");
    return true;
  }

  function setupTrialForm() {
    const form = document.querySelector(selectors.trialForm);

    if (!form) {
      return;
    }

    const fields = Array.from(form.querySelectorAll("[required]"));
    const status = form.querySelector(".form-status");

    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        validateField(field);
      });

      field.addEventListener("change", function () {
        validateField(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const isValid = fields.map(validateField).every(Boolean);

      if (!isValid) {
        const firstInvalid = form.querySelector("[aria-invalid='true']");

        if (status) {
          status.textContent = "Revise os campos destacados antes de continuar.";
        }

        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;
      }

      const message = "Conta demonstrativa criada. Nenhum dado foi enviado a um servidor.";

      if (status) {
        status.textContent = message;
      }

      announce(message);
      form.reset();
    });
  }

  function updateCurrentYear() {
    const yearElement = document.querySelector(selectors.currentYear);

    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  // Entrada suave e discreta: observa os elementos .reveal e adiciona
  // .is-visible quando entram na viewport. Não interfere no menu, no
  // acordeão nem no formulário — só lê/observa elementos, nunca captura
  // eventos deles.
  function setupReveal() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const elements = document.querySelectorAll(".reveal:not(.is-visible)");

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function setupAnchorNavigation() {
    document.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target = document.querySelector(targetId);

        if (target) {
          target.setAttribute("tabindex", "-1");
          target.addEventListener("blur", function () {
            target.removeAttribute("tabindex");
          }, { once: true });
        }
      });
    });
  }

  function init() {
    setupMobileMenu();
    setupObjections();
    setupPipelineFocus();
    setupTrialForm();
    setupAnchorNavigation();
    setupReveal();
    updateCurrentYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
