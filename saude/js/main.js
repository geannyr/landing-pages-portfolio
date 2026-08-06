(function () {
  "use strict";

  // Substitua por um número real no formato internacional, ex.: "5581999999999".
  const WHATSAPP_NUMBER = "";

  const selectors = {
    navToggle: ".nav-toggle",
    nav: "#site-nav",
    faqButtons: ".faq-item button",
    contactForm: ".contact-form",
    currentYear: "#current-year",
    whatsappLinks: "[data-whatsapp]",
    globalStatus: ".global-status"
  };

  function normalizeWhatsAppNumber(number) {
    return String(number || "").replace(/\D/g, "");
  }

  function createWhatsAppUrl(message) {
    const normalizedNumber = normalizeWhatsAppNumber(WHATSAPP_NUMBER);

    if (normalizedNumber.length < 10) {
      return "";
    }

    return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
  }

  function announce(message) {
    const status = document.querySelector(selectors.globalStatus);

    if (status) {
      status.textContent = message;
    }
  }

  function openWhatsApp(message, statusElement) {
    const url = createWhatsAppUrl(message);

    if (!url) {
      const demoMessage = "Número de WhatsApp não configurado. Mensagem demonstrativa: " + message;

      if (statusElement) {
        statusElement.textContent = demoMessage;
      }

      announce(demoMessage);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
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

  function setupFaq() {
    document.querySelectorAll(selectors.faqButtons).forEach(function (button) {
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

  function setFieldError(field, message) {
    const errorId = field.getAttribute("aria-describedby");
    const error = errorId ? document.getElementById(errorId) : null;

    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (error) {
      error.textContent = message;
    }
  }

  function validatePhone(field) {
    const value = field.value.trim();
    const digits = value.replace(/\D/g, "");

    if (!value) {
      setFieldError(field, "Preencha este campo.");
      return false;
    }

    if (/[A-Za-zÀ-ÿ]/.test(value)) {
      setFieldError(field, "Use apenas números, espaços, parênteses, hífen ou sinal de mais.");
      return false;
    }

    if (digits.length < 10) {
      setFieldError(field, "Informe um telefone com DDD.");
      return false;
    }

    setFieldError(field, "");
    return true;
  }

  function validateField(field) {
    if (field.type === "checkbox" && field.required && !field.checked) {
      setFieldError(field, "Este aceite é obrigatório.");
      return false;
    }

    if (field.name === "telefone") {
      return validatePhone(field);
    }

    if (field.required && !field.value.trim()) {
      setFieldError(field, "Preencha este campo.");
      return false;
    }

    setFieldError(field, "");
    return true;
  }

  function buildFormMessage(form) {
    const data = new FormData(form);
    const parts = [
      "Olá! Gostaria de solicitar um agendamento na Clínica Plena.",
      `Nome: ${String(data.get("nome") || "").trim()}`,
      `Telefone: ${String(data.get("telefone") || "").trim()}`,
      `Especialidade: ${String(data.get("especialidade") || "").trim()}`,
      `Preferência de atendimento: ${String(data.get("preferencia") || "").trim()}`
    ];

    const message = String(data.get("mensagem") || "").trim();

    if (message) {
      parts.push(`Mensagem: ${message}`);
    }

    return parts.join("\n");
  }

  function setupContactForm() {
    const form = document.querySelector(selectors.contactForm);

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

      if (status) {
        status.textContent = "Solicitação validada. Abrindo WhatsApp em uma nova aba.";
      }

      openWhatsApp(buildFormMessage(form), status);
    });
  }

  function setupWhatsAppLinks() {
    document.querySelectorAll(selectors.whatsappLinks).forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openWhatsApp(link.dataset.whatsapp || "Olá! Gostaria de agendar um atendimento na Clínica Plena.");
      });
    });
  }

  function updateCurrentYear() {
    const yearElement = document.querySelector(selectors.currentYear);

    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  function setupAnchorNavigation() {
    document.querySelectorAll("a[href^='#']:not([data-whatsapp])").forEach(function (link) {
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
    setupFaq();
    setupContactForm();
    setupWhatsAppLinks();
    setupAnchorNavigation();
    updateCurrentYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
