/* =====================================
    Template Name: Orion Construction - Tailwind HTML5 Template
    Author Name: WebbyCrown
    Description: Orion Construction - Tailwind HTML5 Template.
    Version:1.0
========================================*/

/*======================================
[ JS Table of contents ]
01. General Open JS
    + Mobile menu
    + Mobile menu dropdown
    + AOS
    + Page scroll to Header sticky

02. Slider Open JS
    + What we do slider
    + Testimonial slider
    + Customer Reviews slider
    + Photos Gallery slider
    + Trending Attractions slider
    + Popular Tours slider
    + Testimonial full slider

03. Popup Open JS
    + Cookie popup js
    + Newsletter Popup JS
    + Our Teachers popup
    + Enquiry form Popup JS
04. Preloader JS
05. Isotope JS



========================================*/
// --- ELEMENTS ---
const sidebar = document.getElementById("themeSidebar");
const toggleBtn = document.getElementById("themeToggleBtn");
const header = document.getElementById("mainHeader");
const internalCloseBtn = document.getElementById("themeSidebarClose");
const headerButtons = document.querySelectorAll(".header-options button");
const themeButtons = document.querySelectorAll(".theme-color-button button");

// --- OVERLAY SETUP ---
let themeOverlay = document.getElementById("themeSidebarOverlay");
if (!themeOverlay) {
  themeOverlay = document.createElement("div");
  themeOverlay.id = "themeSidebarOverlay";
  themeOverlay.className =
    "fixed inset-0 bg-[#00000080] opacity-0 pointer-events-none transition-opacity";
  themeOverlay.style.zIndex = "900";
  document.body.appendChild(themeOverlay);
}

// --- HELPER ---
const isSidebarOpen = () =>
  sidebar && !sidebar.classList.contains("translate-x-full");

// --- SIDEBAR OPEN/CLOSE ---
function openThemeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove("translate-x-full");
  sidebar.style.zIndex = "1000";
  sidebar.setAttribute("aria-hidden", "false");
  themeOverlay.classList.remove("pointer-events-none");
  void themeOverlay.offsetWidth;
  themeOverlay.classList.add("opacity-100");
  themeOverlay.classList.remove("opacity-0");
  if (toggleBtn) {
    toggleBtn.style.visibility = "hidden";
    toggleBtn.setAttribute("aria-expanded", "true");
  }
}

function closeThemeSidebar() {
  if (!sidebar) return;
  sidebar.classList.add("translate-x-full");
  sidebar.setAttribute("aria-hidden", "true");
  themeOverlay.classList.add("opacity-0");
  themeOverlay.classList.remove("opacity-100");
  setTimeout(() => themeOverlay.classList.add("pointer-events-none"), 200);
  if (toggleBtn) {
    toggleBtn.style.visibility = "visible";
    toggleBtn.setAttribute("aria-expanded", "false");
  }
}

// Toggle sidebar with button
if (toggleBtn) {
  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isSidebarOpen() ? closeThemeSidebar() : openThemeSidebar();
  });
}

// Close sidebar with overlay or close button
themeOverlay.addEventListener("click", closeThemeSidebar);
if (internalCloseBtn) {
  internalCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeThemeSidebar();
  });
}

// Close sidebar on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isSidebarOpen()) closeThemeSidebar();
});

// --- THEME COLOR LOGIC ---
function setTheme(theme) {
  document.documentElement.className = theme;

  // Toggle active state for theme buttons
  themeButtons.forEach((btn) => btn.classList.remove("active"));
  const activeBtn = [...themeButtons].find((btn) =>
    btn.getAttribute("onclick")?.includes(theme),
  );
  if (activeBtn) activeBtn.classList.add("active");
}

// --- HEADER STICKY/STATIC LOGIC ---
function setHeaderSticky(sticky) {
  if (!header) return;
  if (sticky) {
    header.classList.add("header-sticky");
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "999";
  } else {
    header.classList.remove("header-sticky");
    header.style.position = "";
    header.style.top = "";
    header.style.left = "";
    header.style.right = "";
    header.style.zIndex = "";
  }
}

// Attach click listeners to header option buttons
headerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sticky = btn.dataset.sticky === "true";
    setHeaderSticky(sticky);

    // Toggle active class
    headerButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

(function ($) {
  journea_travel_agency = {
    init: function () {
      // Home one js
      this.general_open();
      this.slider_open();
      this.popup_open();
      this.Isotope_js();
      this.Preloader_js();
    },

    /*======================================
     01. General Open JS
    ========================================*/
    general_open: function () {
      /* Mobile menu */
      $(document).on(
        "click",
        ".toggle-menu-button a, .mobile-menu .menu-close a",
        function () {
          $(".mobile-menu").toggleClass("open");
        },
      );

      // $(document).on("click", ".mobile-toggle", function () {
      //   $("#navbar-default").toggleClass("open");
      //   $(this).toggleClass("active");
      // });

      /* Mobile menu dropdown*/
      if ($(window).width() <= 991) {
        $(".main-menu ul > li").each(function (i) {
          if ($(this).has(".dropdown-menu").length) {
            $(this).find(".dropdown-menu").addClass("sub-menu");
            $(this).find("> a").after('<span class="caret-arrow"></span>');
            // $(this).find("> .sub-menu").css("display", "none");
          }
        });
        $(".main-menu ul li ul li .caret-arrow").click(function () {
          var catSubUl = $(this).next(".sub-menu");
          var catSubli = $(this).closest("li");
          var $caret = $(this);
          // Close other submenus in the same level (accordion behavior)
          $caret
            .closest("ul")
            .find(".sub-menu")
            .not(catSubUl)
            .removeClass("open")
            .prev(".caret-arrow")
            .removeClass("sub-active")
            .closest("li")
            .removeClass("sub-active")
            .find("svg")
            .removeClass("-rotate-90");
          // Toggle current submenu
          catSubUl.toggleClass("open");
          if (catSubUl.hasClass("open")) {
            $caret.addClass("sub-active");
            catSubli.addClass("sub-active");
            $caret.find("svg").addClass("-rotate-90");
          } else {
            $caret.removeClass("sub-active");
            catSubli.removeClass("sub-active");
            $caret.find("svg").removeClass("-rotate-90");
          }
        });
      }

      // =======================
      // Cookie popup Start
      // =======================
      (function () {
        const newsletterOverlay = document.getElementById("newsletterOverlay");
        const cookieOverlay = document.getElementById("cookieOverlay");
        const htmlElement = document.documentElement;

        const categories = [
          "targeting",
          "performance",
          "necessary",
          "functional",
        ];

        // --- Scroll Lock Helpers ---
        let scrollPosition = 0;

        function lockScroll() {
          scrollPosition = window.scrollY;
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollPosition}px`;
          document.body.style.width = "100%";
          document.body.style.overflow = "hidden";
        }

        function unlockScroll() {
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          document.body.style.overflow = "";
          window.scrollTo(0, scrollPosition);
        }

        // --- Accordion Smooth Transition ---
        categories.forEach((category) => {
          const content = document.getElementById(category + "Content");
          if (content) {
            content.style.transition = "max-height 0.3s ease-out";
          }
        });

        // --- Newsletter Popup ---
        function showNewsletter() {
          if (newsletterOverlay) {
            newsletterOverlay.classList.remove("hidden");
            newsletterOverlay.style.pointerEvents = "auto";
            lockScroll(); // lock scroll while newsletter is open
          }
        }

        // Newsletter validation (no labels required)
        function nlEnsureErrorSlot(input) {
          if (!input) return null;
          const container = input.closest(".iti") || input; // place error after intl-tel-input wrapper if present
          // Remove any duplicate error immediately after the raw input
          const afterInput = input.nextElementSibling;
          if (
            afterInput &&
            afterInput.classList &&
            afterInput.classList.contains("error-message") &&
            afterInput !== container.nextElementSibling
          ) {
            afterInput.remove();
          }
          let err = container.nextElementSibling;
          if (
            !err ||
            !err.classList ||
            !err.classList.contains("error-message")
          ) {
            err = document.createElement("div");
            err.className =
              "error-message text-red-600 text-sm mt-1 flex items-center gap-2 opacity-0 hidden";
            // icon
            const icon = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            icon.setAttribute("viewBox", "0 0 20 20");
            icon.setAttribute("fill", "currentColor");
            icon.setAttribute("class", "w-4 h-4 text-red-600");
            const path = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            path.setAttribute(
              "d",
              "M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z",
            );
            icon.appendChild(path);
            err.appendChild(icon);
            const span = document.createElement("span");
            span.className = "error-text";
            err.appendChild(span);
            container.insertAdjacentElement("afterend", err);
          }
          return err;
        }
        function nlShowError(input, message) {
          if (!input) return;
          // Always render newsletter errors right next to the field (or its .iti wrapper)
          input.classList.add(
            "border-red-500",
            "shadow-[0_0_10px_0_#D21C1C26]",
          );
          const err = nlEnsureErrorSlot(input);
          const txt = err.querySelector(".error-text");
          if (txt) txt.textContent = message || "This field is required";
          err.classList.remove("opacity-0", "hidden");
          err.classList.add("opacity-100", "flex");
        }
        function nlClearError(input) {
          if (!input) return;
          input.classList.remove(
            "border-red-500",
            "shadow-[0_0_10px_0_#D21C1C26]",
          );
          const container = input.closest(".iti") || input;
          const err = container.nextElementSibling;
          if (err && err.classList && err.classList.contains("error-message")) {
            const txt = err.querySelector(".error-text");
            if (txt) txt.textContent = "";
            err.classList.add("opacity-0", "hidden");
            err.classList.remove("opacity-100", "flex");
          }
          // Also remove any leftover error right after the raw input
          const afterInput = input.nextElementSibling;
          if (
            afterInput &&
            afterInput.classList &&
            afterInput.classList.contains("error-message")
          ) {
            afterInput.classList.add("opacity-0", "hidden");
            afterInput.classList.remove("opacity-100", "flex");
          }
        }
        function nlFieldLabel(input) {
          return (
            input?.getAttribute("aria-label") ||
            input?.placeholder ||
            input?.name ||
            "This field"
          );
        }
        function nlValidateField(input) {
          if (!input) return { valid: true };
          if (window.contactValidateField) {
            const fieldName = input.name || input.id || "";
            const res = window.contactValidateField(
              fieldName,
              input.value,
              input,
            );
            // Map {isValid, message} -> {valid, message}
            return { valid: !!res?.isValid, message: res?.message };
          }
          // fallback minimal required check
          const required = input.hasAttribute("required");
          const value = (input.value || "").trim();
          if (required && !value)
            return { valid: false, message: "This field is required" };
          return { valid: true };
        }

        window.closeNewsletter = function () {
          if (newsletterOverlay) {
            newsletterOverlay.classList.add("hidden");
            newsletterOverlay.style.pointerEvents = "none";
          }
          showCookiePopup(); // still locked until cookie closes
        };

        window.subscribeNewsletter = function (e) {
          e.preventDefault();
          const form =
            newsletterOverlay?.querySelector("form") || newsletterOverlay;
          const fields =
            form?.querySelectorAll("input, select, textarea") || [];
          let firstInvalid = null;
          let hasError = false;

          fields.forEach((input) => {
            const { valid, message } = nlValidateField(input);
            if (!valid) {
              hasError = true;
              nlShowError(input, message);
              if (!firstInvalid) firstInvalid = input;
            } else {
              nlClearError(input);
            }
          });

          if (hasError) {
            firstInvalid?.focus();
            return;
          }

          alert("Thank you for subscribing!");
          closeNewsletter();
        };

        if (newsletterOverlay) {
          newsletterOverlay.style.pointerEvents = "none"; // default state
          const form =
            newsletterOverlay.querySelector("form") || newsletterOverlay;
          // Normalize newsletter fields to reuse contact validators
          if (form) {
            // Name: prefer fullName
            let nameInput = form.querySelector(
              'input[name="fullName"], input[name="firstName"], input[name="lastName"], input[name="name"]',
            );
            if (!nameInput) {
              nameInput =
                Array.from(form.querySelectorAll('input[type="text"]')).find(
                  (i) => !/email|phone/i.test(i.name || i.placeholder || ""),
                ) || null;
            }
            if (
              nameInput &&
              !/^(fullName|firstName|lastName)$/i.test(nameInput.name || "")
            ) {
              nameInput.name = "fullName";
            }
            // Phone
            let phoneInput = form.querySelector(
              'input[name="phone"], input[type="tel"]',
            );
            if (!phoneInput) {
              phoneInput = form.querySelector('input[placeholder*="phone" i]');
            }
            if (!phoneInput) {
              phoneInput =
                Array.from(form.querySelectorAll('input[type="text"]')).find(
                  (i) => /phone/i.test(i.name || i.placeholder || ""),
                ) || null;
            }
            if (phoneInput && (phoneInput.name || "").toLowerCase() !== "phone")
              phoneInput.name = "phone";
            // Email
            let emailInput = form.querySelector(
              'input[name="email"], input[type="email"]',
            );
            if (emailInput && (emailInput.name || "").toLowerCase() !== "email")
              emailInput.name = "email";
            // Mark required
            [nameInput, phoneInput, emailInput]
              .filter(Boolean)
              .forEach((el) => el.setAttribute("required", "required"));

            // Initialize intl-tel-input if available and not already attached
            const alreadyWrapped = !!phoneInput?.closest(".iti");
            const alreadyInstance = !!(
              window.intlTelInputGlobals?.getInstance &&
              window.intlTelInputGlobals.getInstance(phoneInput)
            );
            if (!window.__newsletterPhoneInit)
              window.__newsletterPhoneInit = false;
            if (
              phoneInput &&
              window.intlTelInput &&
              !alreadyWrapped &&
              !alreadyInstance &&
              phoneInput.dataset.itiInited !== "1" &&
              !window.__newsletterPhoneInit
            ) {
              try {
                window.intlTelInput(phoneInput, {
                  initialCountry: "in",
                  autoHideDialCode: true,
                  nationalMode: false,
                  placeholderNumberType: "NONE",
                });
                phoneInput.dataset.itiInited = "1";
                window.__newsletterPhoneInit = true;
              } catch {}
            }
          }

          const allInputs =
            form?.querySelectorAll("input, select, textarea") || [];
          allInputs.forEach((input) => {
            nlEnsureErrorSlot(input);
            const evt =
              input.tagName.toLowerCase() === "select" ? "change" : "input";
            input.addEventListener(evt, () => {
              const { valid } = nlValidateField(input);
              if (valid) nlClearError(input);
            });
          });

          // Prevent default submission refresh and run our validator
          if (form && form.addEventListener) {
            form.setAttribute("novalidate", "novalidate");
            form.addEventListener("submit", (e) => {
              e.preventDefault();
              if (typeof window.subscribeNewsletter === "function") {
                window.subscribeNewsletter(e);
              }
            });
          }

          // Also intercept explicit submit buttons inside overlay
          const submitBtn = form?.querySelector(
            'button[type="submit"], input[type="submit"]',
          );
          if (submitBtn) {
            submitBtn.addEventListener("click", (e) => {
              // ensure we always prevent navigation
              e.preventDefault();
              if (typeof window.subscribeNewsletter === "function") {
                window.subscribeNewsletter(e);
              }
            });
          }
        }

        // --- Cookie Popup ---
        function showCookiePopup() {
          if (cookieOverlay) {
            cookieOverlay.classList.remove("hidden");
            cookieOverlay.style.pointerEvents = "auto";
            setTimeout(() => {
              cookieOverlay.classList.remove("opacity-0");
            }, 10);
            lockScroll(); // ensure scroll stays locked
          }
        }

        window.closeCookiePopup = function () {
          if (cookieOverlay) {
            cookieOverlay.classList.add("opacity-0");
            cookieOverlay.style.pointerEvents = "none";
            setTimeout(() => {
              cookieOverlay.classList.add("hidden");
              unlockScroll(); // unlock scroll after cookie popup closes
              resetAccordions();
              cookieOverlay.style.pointerEvents = "none";
            }, 300);
          }
        };

        window.acceptCookies = function () {
          console.log("All cookies accepted");
          closeCookiePopup();
        };

        window.rejectAll = function () {
          console.log("All cookies rejected");
          closeCookiePopup();
        };

        window.confirmChoices = function () {
          console.log("User choices confirmed");
          closeCookiePopup();
        };

        // --- Accordion Toggle ---
        window.toggleAccordion = function (category) {
          const content = document.getElementById(category + "Content");
          const icon = document.getElementById(category + "Icon");
          const button = document.querySelector(
            `button[onclick="toggleAccordion('${category}')"]`,
          );
          const box = button ? button.closest(".accordion-box") : null;

          if (!content || !icon || !box) return;

          // Close all others
          categories.forEach((otherCat) => {
            if (otherCat !== category) {
              const otherContent = document.getElementById(
                otherCat + "Content",
              );
              const otherIcon = document.getElementById(otherCat + "Icon");
              const otherButton = document.querySelector(
                `button[onclick="toggleAccordion('${otherCat}')"]`,
              );
              const otherBox = otherButton
                ? otherButton.closest(".accordion-box")
                : null;

              if (otherContent && otherIcon && otherBox) {
                otherContent.style.maxHeight = "0px";
                otherIcon.classList.remove("rotate-180");
                otherBox.classList.remove("border-black");
                otherBox.classList.add("border-gray-300");
              }
            }
          });

          // Toggle clicked one
          if (icon.classList.contains("rotate-180")) {
            content.style.maxHeight = "0px";
            icon.classList.remove("rotate-180");
            box.classList.remove("border-black");
            box.classList.add("border-gray-300");
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add("rotate-180");
            box.classList.add("border-black");
            box.classList.remove("border-gray-300");
          }
        };

        window.updateToggle = function (checkbox) {
          console.log(checkbox.id + " toggled to " + checkbox.checked);
        };

        function setDefaultAccordion() {
          categories.forEach((category) => {
            const content = document.getElementById(category + "Content");
            const icon = document.getElementById(category + "Icon");
            const button = document.querySelector(
              `button[onclick="toggleAccordion('${category}')"]`,
            );
            const box = button ? button.closest(".accordion-box") : null;

            if (content && icon && box) {
              content.style.maxHeight = "0px";
              icon.classList.remove("rotate-180");
              box.classList.remove("border-black");
              box.classList.add("border-gray-300");
            }
          });

          const targetCategory = "targeting";
          const targetContent = document.getElementById(
            targetCategory + "Content",
          );
          const targetIcon = document.getElementById(targetCategory + "Icon");
          const targetButton = document.querySelector(
            `button[onclick="toggleAccordion('${targetCategory}')"]`,
          );
          const targetBox = targetButton
            ? targetButton.closest(".accordion-box")
            : null;

          if (targetContent && targetIcon && targetBox) {
            targetContent.style.maxHeight = targetContent.scrollHeight + "px";
            targetIcon.classList.add("rotate-180");
            targetBox.classList.add("border-black");
            targetBox.classList.remove("border-gray-300");
          }
        }

        window.openSettings = function () {
          const initialPopup = document.getElementById("initialPopup");
          const settingsPanel = document.getElementById("settingsPanel");
          if (initialPopup && settingsPanel) {
            initialPopup.classList.add("hidden");
            settingsPanel.classList.remove("hidden");
            settingsPanel.classList.add("flex", "animate-slide-up");
            setDefaultAccordion();
          }
        };

        function resetAccordions() {
          categories.forEach((category) => {
            const content = document.getElementById(category + "Content");
            const icon = document.getElementById(category + "Icon");
            const button = document.querySelector(
              `button[onclick="toggleAccordion('${category}')"]`,
            );
            const box = button ? button.closest(".accordion-box") : null;

            if (content && icon && box) {
              content.style.maxHeight = "0px";
              icon.classList.remove("rotate-180");
              box.classList.remove("border-black");
              box.classList.add("border-gray-300");
            }
          });
        }

        // --- Initialize ---
        // If newsletter overlay is missing/removed, don't wait — show cookie overlay immediately
        if (newsletterOverlay && document.body.contains(newsletterOverlay)) {
          showNewsletter();
          // If newsletter node gets removed dynamically, fall back to cookie popup
          const nlObserver = new MutationObserver(() => {
            if (!document.body.contains(newsletterOverlay)) {
              showCookiePopup();
              nlObserver.disconnect();
            }
          });
          nlObserver.observe(document.body, { childList: true, subtree: true });
        } else {
          showCookiePopup();
        }
      })();
      // =======================
      // Cookie popup End
      // =======================

      // =======================
      // Navbar Dropdown Start
      // =======================
      document.addEventListener("DOMContentLoaded", () => {
        // --- Elements ---
        const navRight = document.querySelector(".nav-right");
        const headerEl = document.querySelector(".header");
        const searchButton = document.getElementById("searchButton");
        const searchToggleWrapper = document.getElementById(
          "searchToggleWrapper",
        );
        const searchBox = document.getElementById("searchBox");
        const searchInput = document.getElementById("searchInput");
        const closeBtnMobile = document.getElementById("closeSearch");
        const closeBtnDesktop = document.getElementById("searchCloseInside");
        const mobileMenuToggle =
          document.querySelector(".mobile-toggle") ||
          document.getElementById("menuToggle");
        const navbarDefault = document.getElementById("navbar-default");
        const dropdowns = document.querySelectorAll(".dropdown");
        const pageOverlay = document.getElementById("pageOverlay");
        const headerBtn = document.querySelector(".header-btn");

        let searchPanel = null;
        const originalSearchParent = searchBox?.parentElement;
        const suggestionsStaticEl =
          document.getElementById("searchSuggestions") || null;
        const originalSuggestionsParent =
          suggestionsStaticEl?.parentElement || null;

        let isSearchOpen = false;
        let isHeaderStickyEnabled = true;
        let nonStickyPositionClass = "absolute";
        // timer to remove 'relative' from nav-right only after search stays closed
        let navRightRelativeTimer = null;

        if (headerEl) {
          if (headerEl.classList.contains("relative"))
            nonStickyPositionClass = "relative";
          else if (headerEl.classList.contains("absolute"))
            nonStickyPositionClass = "absolute";
          else {
            nonStickyPositionClass = "relative";
            headerEl.classList.add("relative");
          }
          headerEl.classList.remove("fixed", "sticky", "sticky-header");
          headerEl.classList.add("top-0", "left-0", "w-full", "z-50");
        }

        const isDesktop = () => window.innerWidth >= 991;
        const NO_TOGGLE_CLASS = "no-toggle-color";
        function shouldToggleColors() {
          return !(headerEl && headerEl.classList.contains(NO_TOGGLE_CLASS));
        }

        // ---------- Helper Functions ----------
        // robust max-height open/close animation for suggestions
        function animateSuggestions(open = true, onComplete = null) {
          if (!suggestionsStaticEl) {
            if (typeof onComplete === "function") onComplete();
            return;
          }

          const el = suggestionsStaticEl;
          const DURATION = 350; // ms

          // remove previous handler if any
          if (el._suggestionsTransitionHandler) {
            el.removeEventListener(
              "transitionend",
              el._suggestionsTransitionHandler,
            );
            el._suggestionsTransitionHandler = null;
          }

          // ensure overflow hidden during animation
          el.style.overflow = "hidden";

          function transitionEndHandler(e) {
            // listen only for max-height (ignore other property transitions)
            if (e && e.propertyName && e.propertyName !== "max-height") return;

            el.removeEventListener("transitionend", transitionEndHandler);
            el._suggestionsTransitionHandler = null;

            // clear transition & maxHeight so layout becomes natural
            el.style.transition = "";
            el.style.overflow = "";
            el.style.maxHeight = "";
            el.style.opacity = "";

            if (open) {
              el.classList.remove("hidden", "max-h-0");
            } else {
              el.classList.add("hidden", "max-h-0");
            }

            if (typeof onComplete === "function") onComplete();
          }

          el._suggestionsTransitionHandler = transitionEndHandler;
          el.addEventListener("transitionend", transitionEndHandler);

          if (open) {
            // make visible to measure
            el.classList.remove("hidden", "max-h-0");

            // start from 0
            el.style.maxHeight = "0px";
            el.style.opacity = "1";
            // force reflow
            void el.offsetHeight;

            const full = el.scrollHeight || 0;
            el.style.transition = `max-height ${DURATION}ms ease, opacity ${Math.round(
              DURATION * 0.9,
            )}ms linear`;
            // animate to the measured height
            el.style.maxHeight = full + "px";

            // fallback in case transitionend doesn't fire
            setTimeout(() => {
              if (el._suggestionsTransitionHandler) {
                transitionEndHandler({ propertyName: "max-height" });
              }
            }, DURATION + 80);
          } else {
            // closing: animate from current scrollHeight -> 0
            // ensure element is visible and measured
            const full = el.scrollHeight || 0;
            el.style.maxHeight = full + "px";
            // force reflow
            void el.offsetHeight;

            el.style.transition = `max-height ${DURATION}ms ease, opacity ${Math.round(
              DURATION * 0.8,
            )}ms linear`;
            // animate to 0
            el.style.maxHeight = "0px";

            // fallback
            setTimeout(() => {
              if (el._suggestionsTransitionHandler) {
                transitionEndHandler({ propertyName: "max-height" });
              }
            }, DURATION + 80);
          }
        }

        // Mobile menu open/close using CSS class transitions (matches search panel feel)
        function openMobileMenu(onComplete = null) {
          if (!navbarDefault) return;
          const isMobile = window.innerWidth <= 991;
          navbarDefault.classList.remove("hidden");
          navbarDefault.classList.add("block");
          navbarDefault.classList.add("mobile-nav");

          if (isMobile) {
            // Mobile: slide in from right like a sidebar
            navbarDefault.dataset.mobileNavPanel = "1";
            navbarDefault.style.right = "0";
            navbarDefault.style.height = "100vh";
            navbarDefault.style.width = "100%";
            navbarDefault.style.zIndex = "70";
            if (!navbarDefault.style.background)
              navbarDefault.style.background = "#fff";
            navbarDefault.style.transform = "translateX(100%)";
            navbarDefault.style.transition = "transform 300ms ease";
            // Trigger animation
            void navbarDefault.offsetWidth;
            navbarDefault.classList.add("open");
            navbarDefault.style.transform = "translateX(0)";
            const handler = (e) => {
              if (e && e.target !== navbarDefault) return;
              navbarDefault.removeEventListener("transitionend", handler);
              if (typeof onComplete === "function") onComplete();
            };
            navbarDefault.addEventListener("transitionend", handler);
          } else {
            // Fallback (desktop safety): use existing class-based transition
            void navbarDefault.offsetHeight;
            navbarDefault.classList.add("open");
            const handler = (e) => {
              if (e && e.target !== navbarDefault) return;
              navbarDefault.removeEventListener("transitionend", handler);
              if (typeof onComplete === "function") onComplete();
            };
            navbarDefault.addEventListener("transitionend", handler);
          }
        }
        function closeMobileMenu(onComplete = null) {
          if (!navbarDefault) return;
          const isMobile = window.innerWidth <= 991;
          const isMobilePanel = navbarDefault.dataset.mobileNavPanel === "1";

          if (isMobile && isMobilePanel) {
            // Mobile: slide out to right then hide
            navbarDefault.classList.add("closing");
            if (!navbarDefault.style.transition)
              navbarDefault.style.transition = "transform 250ms ease";
            void navbarDefault.offsetWidth;
            navbarDefault.style.transform = "translateX(100%)";

            const done = () => {
              navbarDefault.classList.add("hidden");
              navbarDefault.classList.remove("block", "open", "closing");
              // Clear inline styles
              navbarDefault.style.position = "";
              navbarDefault.style.top = "";
              navbarDefault.style.right = "";
              navbarDefault.style.height = "";
              navbarDefault.style.width = "";
              navbarDefault.style.zIndex = "";
              navbarDefault.style.background = "";
              navbarDefault.style.transform = "";
              navbarDefault.style.transition = "";
              delete navbarDefault.dataset.mobileNavPanel;
              if (typeof onComplete === "function") onComplete();
            };
            const handler = (e) => {
              if (e && e.target !== navbarDefault) return;
              if (
                e &&
                e.propertyName &&
                !["opacity", "transform"].includes(e.propertyName)
              )
                return;
              navbarDefault.removeEventListener("transitionend", handler);
              done();
            };
            navbarDefault.addEventListener("transitionend", handler);
            // Fallback timeout in case transitionend doesn't fire
            setTimeout(done, 350);
          } else {
            // Fallback (desktop): original class-based close
            navbarDefault.classList.remove("open");
            const handler = (e) => {
              if (e && e.target !== navbarDefault) return;
              navbarDefault.removeEventListener("transitionend", handler);
              navbarDefault.classList.add("hidden");
              navbarDefault.classList.remove("block");
              if (typeof onComplete === "function") onComplete();
            };
            navbarDefault.addEventListener("transitionend", handler);
          }
        }

        // Toggle burger/close icons inside the mobile menu toggle button
        function updateMenuToggleIcon(isOpen) {
          if (!mobileMenuToggle) return;
          try {
            // prefer explicit svg swapping when two svgs are present
            const svgs = mobileMenuToggle.querySelectorAll("svg");
            if (svgs && svgs.length >= 2) {
              const burger = svgs[0];
              const close = svgs[1];
              if (isOpen) {
                burger.classList.add("hidden");
                burger.classList.remove("block");
                close.classList.remove("hidden");
                close.classList.add("block");
              } else {
                burger.classList.remove("hidden");
                burger.classList.add("block");
                close.classList.add("hidden");
                close.classList.remove("block");
              }
            } else {
              // fallback: toggle an 'open' class for CSS-driven icon changes
              if (isOpen) mobileMenuToggle.classList.add("open");
              else mobileMenuToggle.classList.remove("open");
            }
            mobileMenuToggle.setAttribute(
              "aria-expanded",
              isOpen ? "true" : "false",
            );
          } catch (err) {
            // noop
          }
        }

        // --- SVG helpers ---
        function getDrawableShapes(svg) {
          return svg.querySelectorAll(
            "path, circle, rect, line, polyline, polygon",
          );
        }
        function resolveCurrentColorString(value, element) {
          if (!value) return value;
          if (value.trim() === "currentColor") {
            try {
              return window.getComputedStyle(element).color || value;
            } catch {
              return value;
            }
          }
          return value;
        }
        function detectPreferredColorProp(svg) {
          const shapes = getDrawableShapes(svg);
          for (let i = 0; i < shapes.length; i++) {
            const s = shapes[i];
            const strokeAttr = s.getAttribute("stroke");
            if (strokeAttr && strokeAttr !== "none")
              return { prop: "stroke", raw: strokeAttr, target: s };
            const fillAttr = s.getAttribute("fill");
            if (fillAttr && fillAttr !== "none")
              return { prop: "fill", raw: fillAttr, target: s };
          }
          const target = shapes[0] || svg;
          try {
            const cs = window.getComputedStyle(target);
            const stroke = cs.getPropertyValue("stroke");
            if (stroke && stroke !== "none")
              return { prop: "stroke", raw: stroke, target };
            const fill = cs.getPropertyValue("fill");
            if (fill && fill !== "none")
              return { prop: "fill", raw: fill, target };
            const color = cs.getPropertyValue("color");
            if (color && color !== "rgba(0, 0, 0, 0)")
              return { prop: "stroke", raw: color, target };
          } catch {}
          return null;
        }
        function applyPropToSvg(svg, prop, color) {
          try {
            svg.style[prop] = color;
          } catch {}
          svg
            .querySelectorAll("path, circle, rect, line, polyline, polygon")
            .forEach((el) => {
              try {
                el.style[prop] = color;
              } catch {}
            });
        }
        function removePropFromSvg(svg, prop) {
          try {
            svg.style.removeProperty(prop);
          } catch {}
          svg
            .querySelectorAll("path, circle, rect, line, polyline, polygon")
            .forEach((el) => {
              try {
                el.style.removeProperty(prop);
              } catch {}
            });
        }

        // --- Lock / unlock ---
        function lockAllSVGFills() {
          if (!headerEl) return;
          const svgs = headerEl.querySelectorAll("svg");
          svgs.forEach((svg) => {
            if (svg.dataset.locked === "1") return;
            const detected = detectPreferredColorProp(svg);
            if (!detected) return;
            const resolved = resolveCurrentColorString(
              detected.raw,
              detected.target || svg,
            );
            if (!resolved) return;
            svg.dataset.originalInlineStyle = svg.getAttribute("style") || "";
            svg.dataset.locked = "1";
            svg.dataset.lockProp = detected.prop;
            applyPropToSvg(svg, detected.prop, resolved);
          });
        }
        function unlockAllSVGFills() {
          if (!headerEl) return;
          const svgs = headerEl.querySelectorAll("svg");
          svgs.forEach((svg) => {
            if (svg.dataset.locked !== "1") return;
            const prop = svg.dataset.lockProp || "fill";
            removePropFromSvg(svg, prop);
            if (svg.dataset.originalInlineStyle) {
              svg.setAttribute("style", svg.dataset.originalInlineStyle);
            } else {
              if (
                !svg.getAttribute("style") ||
                svg.getAttribute("style").trim() === ""
              )
                svg.removeAttribute("style");
            }
            delete svg.dataset.originalInlineStyle;
            delete svg.dataset.locked;
            delete svg.dataset.lockProp;
          });
        }

        if (headerEl && window.MutationObserver) {
          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              if (m.attributeName === "class") {
                const noToggle = headerEl.classList.contains(NO_TOGGLE_CLASS);
                if (noToggle) {
                  unlockAllSVGFills();
                } else {
                  unlockAllSVGFills();
                  updateAllSVGFills();
                }
              }
            }
          });
          observer.observe(headerEl, {
            attributes: true,
            attributeFilter: ["class"],
          });
        }

        if (!shouldToggleColors()) {
          unlockAllSVGFills();
        }

        const setSVGColor = (svgEl, color) => {
          if (!svgEl) return;
          const detected = detectPreferredColorProp(svgEl);
          const prop = detected && detected.prop ? detected.prop : "fill";
          applyPropToSvg(svgEl, prop, color);
        };

        // ---------- Dropdown toggle sync ----------
        function isMenuVisible(menu) {
          if (!menu) return false;
          if (menu.classList.contains("closing")) return false;
          if (menu.classList.contains("hidden")) return false;
          if (menu.classList.contains("open")) return true;
          try {
            const cs = window.getComputedStyle(menu);
            const op = cs.opacity;
            const vis = cs.visibility;
            const pe = cs.pointerEvents;
            return op !== "0" && vis !== "hidden" && pe !== "none";
          } catch {
            return false;
          }
        }

        // --- Header-btn color toggle (fully integrated) ---
        function updateHeaderBtnState() {
          if (!shouldToggleColors()) return;
          if (!headerBtn || !navRight) return;

          // Check if navRight OR header has white background
          let isWhite =
            headerEl.classList.contains("bg-white") ||
            navRight.classList.contains("bg-white");

          // Fallback to computed background color check
          if (!isWhite) {
            try {
              const cs = window.getComputedStyle(navRight);
              if (cs && cs.backgroundColor) {
                const bg = cs.backgroundColor.replace(/\s+/g, "").toLowerCase();
                if (bg === "rgb(255,255,255)" || bg === "#ffffff")
                  isWhite = true;
              }
            } catch {}
          }

          // Apply class toggle
          headerBtn.classList.remove("btn-dark-reverse", "btn-green-bg");
          headerBtn.classList.add(
            isWhite ? "btn-dark-reverse" : "btn-green-bg",
          );
        }
        updateHeaderBtnState();
        window.addEventListener("scroll", updateHeaderBtnState);

        // Observer for nav-right class changes to update button state
        if (navRight && window.MutationObserver) {
          const navRightObserver = new MutationObserver((mutations) => {
            for (const m of mutations) {
              if (m.attributeName === "class") {
                updateHeaderBtnState();
              }
            }
          });
          navRightObserver.observe(navRight, {
            attributes: true,
            attributeFilter: ["class"],
          });
        }

        // Update dropdown toggle colors based on nav state
        function updateDropdownToggleColors() {
          if (!shouldToggleColors()) return;

          const isWhite =
            headerEl?.classList.contains("bg-white") ||
            navRight?.classList.contains("bg-white");
          const color = isWhite ? "black" : "white";

          // Update dropdown toggle SVGs
          document
            .querySelectorAll(".dropdown .dropdown-toggle svg")
            .forEach((el) => setSVGColor(el, color));
        }

        // ---------- Overlay helpers, nav background, search open/close, mobile menu, sticky, dropdowns ----------
        // Ensure overlay exists and animate fade in/out
        const overlayEl = (function () {
          if (pageOverlay) return pageOverlay;
          const el = document.createElement("div");
          el.id = "pageOverlay";
          document.body.appendChild(el);
          el.classList.add("hidden");
          return el;
        })();

        const showOverlay = () => {
          if (overlayEl) {
            // cancel any pending hide transition from a previous close
            if (overlayEl._overlayHideHandler) {
              overlayEl.removeEventListener(
                "transitionend",
                overlayEl._overlayHideHandler,
              );
              overlayEl._overlayHideHandler = null;
            }
            if (overlayEl._overlayHideTO) {
              try {
                clearTimeout(overlayEl._overlayHideTO);
              } catch {}
              overlayEl._overlayHideTO = null;
            }
            overlayEl.classList.remove("hidden");
            // force reflow then fade to visible
            void overlayEl.offsetWidth;
            overlayEl.classList.add("show");
          }
          headerEl?.classList.add("dropdown-open");
        };
        const hideOverlayImmediate = () => {
          if (overlayEl) {
            overlayEl.classList.remove("show");
            const onEnd = (e) => {
              if (e && e.propertyName && e.propertyName !== "opacity") return;
              overlayEl.classList.add("hidden");
              overlayEl.removeEventListener("transitionend", onEnd);
              overlayEl._overlayHideHandler = null;
              overlayEl._overlayHideTO = null;
            };
            // store handler so we can cancel if user re-opens quickly
            overlayEl._overlayHideHandler = onEnd;
            overlayEl.addEventListener("transitionend", onEnd);
            // fallback in case transitionend doesn't fire
            overlayEl._overlayHideTO = setTimeout(onEnd, 250);
          }
          headerEl?.classList.remove("dropdown-open");
        };
        const isMobileMenuOpen = () =>
          !!(
            mobileMenuToggle?.classList.contains("open") &&
            navbarDefault?.classList.contains("block")
          );

        // Helpers for smooth dropdown open/close
        const getTransitionMs = (el) => {
          try {
            const cs = window.getComputedStyle(el);
            const durs = (cs.transitionDuration || "0s")
              .split(",")
              .map((v) => v.trim());
            const dels = (cs.transitionDelay || "0s")
              .split(",")
              .map((v) => v.trim());
            const toMs = (s) =>
              s.endsWith("ms") ? parseFloat(s) : parseFloat(s) * 1000;
            let max = 0;
            for (let i = 0; i < Math.max(durs.length, dels.length); i++) {
              const t =
                (durs[i] ? toMs(durs[i]) : 0) + (dels[i] ? toMs(dels[i]) : 0);
              if (t > max) max = t;
            }
            return max || 0;
          } catch {
            return 0;
          }
        };

        // ---------- Dropdown animation (REPLACED: smooth + flicker-free) ----------
        function animateDropdown(menu, open = true, onComplete = null) {
          if (!menu) return;
          const DURATION = 250;

          if (menu._transitioning) return; // prevent overlapping transitions
          menu._transitioning = true;
          menu.style.overflow = "hidden";

          if (menu._ddHandler) {
            menu.removeEventListener("transitionend", menu._ddHandler);
            menu._ddHandler = null;
          }

          const endOnce = () => {
            menu.removeEventListener("transitionend", endOnce);
            menu._transitioning = false;
            menu.style.transition = "";
            menu.style.overflow = "";
            menu.style.maxHeight = "";
            menu.style.opacity = "";
            menu.style.transform = "";

            if (!open) {
              menu.classList.add("hidden");
              menu.classList.remove("open");
            } else {
              menu.classList.add("open");
            }

            if (typeof onComplete === "function") onComplete();
          };

          menu._ddHandler = endOnce;
          menu.addEventListener("transitionend", endOnce);

          if (open) {
            menu.classList.remove("hidden", "closing");
            menu.classList.add("open");
            menu.style.maxHeight = "0px";
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-8px)";
            void menu.offsetHeight;

            const full = menu.scrollHeight || 0;
            menu.style.transition = `max-height ${DURATION}ms ease, opacity ${DURATION}ms ease, transform ${DURATION}ms ease`;
            menu.style.maxHeight = `${full}px`;
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
          } else {
            const full = menu.scrollHeight || 0;
            menu.style.maxHeight = `${full}px`;
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
            void menu.offsetHeight;

            menu.style.transition = `max-height ${DURATION}ms ease, opacity ${DURATION}ms ease, transform ${DURATION}ms ease`;
            menu.style.maxHeight = "0px";
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-8px)";
          }

          // Fallback in case transitionend doesn't fire
          setTimeout(() => {
            if (menu._transitioning) endOnce();
          }, DURATION + 80);
        }

        function openDropdownMenu(menu) {
          if (!menu) return;

          if (isDesktop()) {
            // Prevent flicker by forcing reflow before transition
            menu.classList.remove("hidden", "closing");
            menu.classList.add("will-open");
            void menu.offsetHeight; // force reflow

            animateDropdown(menu, true, () => {
              menu.classList.remove("will-open");
              updateOverlayState?.();
            });
          } else {
            // Mobile version unchanged
            menu.classList.remove("hidden", "closing");
            menu.dataset.mobilePanel = "1";
            menu.style.position = "fixed";
            menu.style.top = "0";
            menu.style.right = "0";
            menu.style.height = "auto";
            menu.style.width = "100%";
            menu.style.zIndex = "70";
            if (!menu.style.background) menu.style.background = "#fff";
            menu.style.transform = "translateX(100%)";
            menu.style.transition = "transform 300ms ease";
            void menu.offsetWidth;
            menu.classList.add("open");
            menu.style.transform = "translateX(0)";
          }
        }

        function closeDropdownMenu(menu) {
          if (!menu) return;
          if (isDesktop()) {
            animateDropdown(menu, false, () => {
              if (typeof updateOverlayState === "function")
                updateOverlayState();
            });
            return;
          }
          if (
            menu.classList.contains("hidden") &&
            !menu.classList.contains("open")
          )
            return;
          // Keep 'open' during animation; remove it at the end
          menu.classList.add("closing");

          // Mobile slide-out to right if it was opened as a mobile panel
          const isMobilePanel = menu.dataset.mobilePanel === "1";
          if (isMobilePanel) {
            if (!menu.style.transition)
              menu.style.transition = "transform 250ms ease";
            // animate out
            void menu.offsetWidth;
            menu.style.transform = "translateX(100%)";
          }

          const done = () => {
            menu.classList.add("hidden");
            menu.classList.remove("closing", "open");
            if (isMobilePanel) {
              // clear inline off-canvas styles
              menu.style.position = "";
              menu.style.top = "";
              menu.style.right = "";
              menu.style.height = "";
              menu.style.width = "";
              menu.style.zIndex = "";
              menu.style.background = "";
              menu.style.transform = "";
              menu.style.transition = "";
              delete menu.dataset.mobilePanel;
            }
            if (typeof updateOverlayState === "function") updateOverlayState();
          };
          const onEnd = (e) => {
            if (e && e.target !== menu) return;
            if (
              e &&
              e.propertyName &&
              !["opacity", "transform"].includes(e.propertyName)
            )
              return;
            menu.removeEventListener("transitionend", onEnd);
            done();
          };
          menu.addEventListener("transitionend", onEnd);
          // Fallback timeout in case transitionend doesn't fire
          setTimeout(done, 350);
        }

        const anyMenuOpen = () => {
          let open = false;
          dropdowns.forEach((d) => {
            const m =
              d.querySelector(".dropdown-menu") || d.querySelector("ul");
            if (!m) return;
            if (isMenuVisible(m)) open = true;
          });
          return open;
        };
        const updateOverlayState = () => {
          const shouldShow =
            isSearchOpen || isMobileMenuOpen() || anyMenuOpen();
          if (shouldShow) {
            showOverlay();
            try {
              // (removed: prevent body/page from scrolling while an overlay is open)
            } catch (e) {}
          } else {
            hideOverlayImmediate();
            try {
              // (removed: re-enable scrolling)
            } catch (e) {}
          }
        };

        // overlay click closes menus
        overlayEl?.addEventListener("click", () => {
          dropdowns.forEach((d) => {
            const m =
              d.querySelector(".dropdown-menu") || d.querySelector("ul");
            if (m) closeDropdownMenu(m);
          });

          const finalizeOverlayClose = () => {
            hideOverlayImmediate();
            removeNavWhiteIfNoSearch();
            updateAllSVGFills();
            updateHeaderBtnState();
            updateDropdownToggleColors();
          };

          if (mobileMenuToggle && mobileMenuToggle.classList.contains("open")) {
            closeMobileMenu(() => {
              mobileMenuToggle.classList.remove("open");
              updateMenuToggleIcon(false);
              finalizeOverlayClose();
            });
          } else {
            finalizeOverlayClose();
          }
        });

        const navRightSetWhite = () => {
          if (!shouldToggleColors()) return;
          if (!navRight) return;
          navRight.classList.add("bg-white", "text-black");
          navRight.classList.remove("bg-transparent");
          navRight
            .querySelectorAll(".navbar > li")
            .forEach((a) => a.classList.add("text-black"));
          navRight
            .querySelectorAll(".navbar > li")
            .forEach((a) => a.classList.remove("text-white"));
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.add("text-black");
            mobileMenuToggle.classList.remove("text-white");
          }
          if (searchButton) {
            searchButton.classList.add("text-black");
            searchButton.classList.remove("text-white");
          }
        };

        const navRightSetTransparent = () => {
          if (!shouldToggleColors()) return;
          if (!navRight) return;
          navRight.classList.remove("bg-white", "text-black");
          navRight.classList.add("bg-transparent");
          navRight.querySelectorAll(".navbar > li").forEach((a) => {
            a.classList.remove("text-black");
            a.classList.add("text-white");
          });
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove("text-black");
            mobileMenuToggle.classList.add("text-white");
          }
          if (searchButton) {
            searchButton.classList.remove("text-black");
            searchButton.classList.add("text-white");
          }
        };

        const removeNavWhiteIfNoSearch = () => {
          const isMobileView = window.innerWidth <= 991;
          const pointerInHeader = !!(headerEl && headerEl.matches(":hover"));
          const pointerInDropdown = !!document.querySelector(
            ".dropdown:hover, .dropdown-menu:hover",
          );
          let keepWhite;
          if (isMobileView) {
            // On small screens, only keep white while something is open
            keepWhite = isSearchOpen || isMobileMenuOpen() || anyMenuOpen();
          } else {
            // On desktop, also keep white while hovering header or dropdown
            keepWhite =
              isSearchOpen ||
              isMobileMenuOpen() ||
              anyMenuOpen() ||
              pointerInHeader ||
              pointerInDropdown;
          }
          if (!keepWhite) navRightSetTransparent();
        };

        // --- Idle background controller: when no dropdown/search/mobile is open
        // and the cursor is not over the header/nav area, keep nav-right transparent
        const pointerOverHeader = () =>
          !!(
            headerEl?.matches(":hover") ||
            navRight?.matches(":hover") ||
            document.querySelector(
              ".navbar > li:hover, .dropdown:hover, .dropdown-menu:hover, .logo:hover",
            )
          );

        function ensureIdleTransparent() {
          // ⛔ Skip transparency if window is scrolled
          if (window.scrollY > 20) return;

          if (
            !isSearchOpen &&
            !isMobileMenuOpen() &&
            !anyMenuOpen() &&
            !pointerOverHeader()
          ) {
            navRightSetTransparent();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          }
        }

        headerEl?.addEventListener("mouseenter", () => {
          navRightSetWhite();
          updateAllSVGFills?.();
          if (typeof updateHeaderBtnState === "function")
            updateHeaderBtnState();
        });
        headerEl?.addEventListener("mouseleave", ensureIdleTransparent);
        navRight?.addEventListener("mouseleave", ensureIdleTransparent);
        // when cursor goes onto the page overlay, treat it as leaving the header/nav
        overlayEl?.addEventListener("mouseenter", ensureIdleTransparent);
        document.addEventListener("pointermove", () => {
          if (window.scrollY === 0 && !pointerOverHeader())
            ensureIdleTransparent();
        });
        // Run once after setup
        setTimeout(ensureIdleTransparent, 0);

        // --- Search open/close ---
        function openSearch() {
          if (isSearchOpen) return;
          isSearchOpen = true;
          const isMobile = window.innerWidth <= 991;
          // If mobile menu is open, close it before opening search (avoid conflicts)
          if (mobileMenuToggle && mobileMenuToggle.classList.contains("open")) {
            closeMobileMenu(() => {
              mobileMenuToggle.classList.remove("open");
              updateMenuToggleIcon(false);
            });
          }
          navRightSetWhite();
          if (isMobile) headerEl?.classList.add("bg-white");
          // always show overlay on search open (even if a previous hide is mid-transition)
          showOverlay?.();
          if (typeof updateOverlayState === "function") updateOverlayState();

          if (isMobile) {
            if (!searchPanel) {
              searchPanel = document.createElement("div");
              searchPanel.id = "searchPanel";
              headerEl?.appendChild(searchPanel);
            }
            if (
              searchBox &&
              searchPanel &&
              searchBox.parentElement !== searchPanel
            )
              searchPanel.appendChild(searchBox);

            searchBox.classList.remove("hidden", "max-h-0");
            searchBox.style.display = "flex";
            searchBox.style.flexDirection = "row";
            searchBox.style.position = "relative";
            searchBox.style.left = "0";
            searchBox.style.right = "0";
            searchBox.style.width = "100%";
            searchBox.style.background = "white";
            searchBox.style.zIndex = "61";
            searchBox.style.transform = "translateY(-8px)";
            searchBox.style.opacity = "0";
            searchBox.style.transition =
              "transform 1s ease, opacity 0.35s ease";

            if (suggestionsStaticEl) {
              if (suggestionsStaticEl.parentElement !== headerEl)
                headerEl.appendChild(suggestionsStaticEl);

              // remove inline positioning/width so CSS controls it
              suggestionsStaticEl.style.position = "";

              // add the CSS class we wrote above
              suggestionsStaticEl.classList.add("search-suggestions-panel");

              // open animation
              animateSuggestions(true);
            }

            void searchBox.offsetWidth;
            requestAnimationFrame(() => {
              searchBox.style.transform = "translateY(0)";
              searchBox.style.opacity = "1";
            });
          } else {
            // ensure any pending removal is cancelled if user re-opens quickly
            if (navRightRelativeTimer) {
              clearTimeout(navRightRelativeTimer);
              navRightRelativeTimer = null;
            }
            navRight?.classList.add("relative");
            searchBox.classList.remove("max-h-0", "max-h-0");
            searchBox.style.display = "flex";
            searchBox.style.flexDirection = "row";
            searchBox.style.width = "0";
            searchBox.style.opacity = "0";
            searchBox.style.position = "absolute";
            searchBox.style.top = "0";
            searchBox.style.right = "0";
            searchBox.style.transition = "width 1s ease, opacity 1s ease";

            void searchBox.offsetWidth;
            requestAnimationFrame(() => {
              searchBox.style.width = "100%";
              searchBox.style.opacity = "1";
            });

            if (suggestionsStaticEl) {
              if (suggestionsStaticEl.parentElement !== headerEl)
                headerEl.appendChild(suggestionsStaticEl);
              suggestionsStaticEl.style.position = "absolute";
              suggestionsStaticEl.style.top = "100%";
              suggestionsStaticEl.style.zIndex = "55";
              // open animation for desktop too
              animateSuggestions(true);
            }
          }

          searchInput?.focus();
          if (closeBtnMobile) {
            closeBtnMobile.classList.remove(
              "hidden",
              "opacity-0",
              "pointer-events-none",
            );
            closeBtnMobile.classList.add("opacity-100");
          }
          if (closeBtnDesktop) {
            closeBtnDesktop.classList.remove(
              "opacity-0",
              "pointer-events-none",
            );
            closeBtnDesktop.classList.add("opacity-100");
          }
          searchButton?.classList.add("hidden");
          updateAllSVGFills();
          if (typeof updateHeaderBtnState === "function")
            updateHeaderBtnState();
        }

        function closeSearch() {
          if (!isSearchOpen) return;
          isSearchOpen = false;
          const isMobile = window.innerWidth <= 991;

          if (isMobile) {
            // animate searchBox out
            searchBox.style.transform = "translateY(-10px)";
            searchBox.style.opacity = "0";
            searchBox.style.transition =
              "transform 1.5s ease, opacity 0.25s ease";

            // after search box animation finishes, hide it and then animate suggestions
            setTimeout(() => {
              // hide search box
              searchBox.classList.add("hidden");
              searchBox.style.display = "";
              searchBox.style.transition = "";
              searchBox.style.transform = "";
              searchBox.style.opacity = "";
              searchBox.classList.remove("flex", "flex-row", "w-full");
              searchBox.style.position = "";
              searchBox.style.top = "";
              searchBox.style.left = "";
              searchBox.style.right = "";
              searchBox.style.width = "";
              searchBox.style.background = "";
              searchBox.style.zIndex = "";
              headerEl?.classList.remove("bg-white");

              // suggestions are inside searchPanel — animate close and then move them
              if (suggestionsStaticEl) {
                animateSuggestions(false, () => {
                  // when moving back
                  if (
                    originalSuggestionsParent &&
                    suggestionsStaticEl.parentElement !==
                      originalSuggestionsParent
                  ) {
                    originalSuggestionsParent.appendChild(suggestionsStaticEl);
                  }
                  suggestionsStaticEl.classList.remove(
                    "search-suggestions-panel",
                  );
                  suggestionsStaticEl.classList.add("hidden", "max-h-0");
                  if (typeof updateOverlayState === "function")
                    updateOverlayState();
                });
              }

              // remove panel
              if (searchPanel && searchPanel.parentElement === headerEl) {
                searchPanel.remove();
                searchPanel = null;
              }
            }, 250);
          } else {
            // desktop: animate searchBox width out, then after that trigger suggestions close and move
            searchBox.style.width = "0";
            searchBox.style.opacity = "0";
            searchBox.style.transition = "width 1.5s ease, opacity 1s ease";

            setTimeout(() => {
              // hide search box
              searchBox.classList.add("hidden");
              searchBox.style.display = "";
              searchBox.style.transition = "";
              searchBox.style.width = "";
              searchBox.style.opacity = "";
              searchBox.classList.remove("flex", "flex-row", "w-full");
              searchBox.style.position = "";
              searchBox.style.top = "";
              searchBox.style.right = "";

              // animate suggestions close, then move them back to their original parent
              if (suggestionsStaticEl) {
                animateSuggestions(false, () => {
                  if (
                    originalSuggestionsParent &&
                    suggestionsStaticEl.parentElement !==
                      originalSuggestionsParent
                  ) {
                    originalSuggestionsParent.appendChild(suggestionsStaticEl);
                  }
                  suggestionsStaticEl.classList.add("hidden", "max-h-0");
                  if (typeof updateOverlayState === "function")
                    updateOverlayState();
                });
              }
            }, 350);
          }

          searchInput.value = "";
          if (closeBtnMobile)
            closeBtnMobile.classList.add(
              "hidden",
              "opacity-0",
              "pointer-events-none",
            );
          if (closeBtnDesktop)
            closeBtnDesktop.classList.add("opacity-0", "pointer-events-none");
          if (searchButton) searchButton.classList.remove("hidden");
          // remove 'relative' 2s after close, but cancel if search re-opens before timeout
          if (navRightRelativeTimer) {
            clearTimeout(navRightRelativeTimer);
            navRightRelativeTimer = null;
          }
          navRightRelativeTimer = setTimeout(() => {
            if (!isSearchOpen) {
              navRight?.classList.remove("relative");
            }
          }, 500);
          removeNavWhiteIfNoSearch();
          updateAllSVGFills();
          if (typeof updateHeaderBtnState === "function")
            updateHeaderBtnState();
        }

        searchButton?.addEventListener("click", (e) => {
          e.stopPropagation();
          openSearch();
        });
        searchToggleWrapper?.addEventListener("click", (e) => {
          if (e.target.closest("#searchButton")) openSearch();
        });
        closeBtnMobile?.addEventListener("click", (e) => {
          e.stopPropagation();
          closeSearch();
        });
        closeBtnDesktop?.addEventListener("click", (e) => {
          e.stopPropagation();
          closeSearch();
        });

        if (mobileMenuToggle && navbarDefault) {
          mobileMenuToggle.addEventListener("click", () => {
            const willOpen = !mobileMenuToggle.classList.contains("open");
            if (willOpen) {
              if (isSearchOpen) closeSearch();
              mobileMenuToggle.classList.add("open");
              updateMenuToggleIcon(true);
              navRightSetWhite();
              showOverlay();
              openMobileMenu(() => {
                updateOverlayState();
                updateAllSVGFills();
                if (typeof updateHeaderBtnState === "function")
                  updateHeaderBtnState();
              });
            } else {
              closeMobileMenu(() => {
                mobileMenuToggle.classList.remove("open");
                updateMenuToggleIcon(false);
                // If mobile, at top, and nothing else is open, force transparent (with a short re-check)
                if (
                  window.innerWidth <= 991 &&
                  window.scrollY === 0 &&
                  !isSearchOpen &&
                  !anyMenuOpen()
                ) {
                  navRightSetTransparent();
                  setTimeout(() => {
                    if (
                      window.scrollY === 0 &&
                      !isSearchOpen &&
                      !anyMenuOpen() &&
                      !(
                        mobileMenuToggle &&
                        mobileMenuToggle.classList.contains("open")
                      )
                    ) {
                      navRightSetTransparent();
                    }
                  }, 60);
                } else {
                  removeNavWhiteIfNoSearch();
                }
                updateOverlayState();
                updateAllSVGFills();
                if (typeof updateHeaderBtnState === "function")
                  updateHeaderBtnState();
              });
            }
          });
        }

        // Ensure nav-right turns white when clicking any nav-tab (with or without dropdown)
        document.querySelectorAll(".navbar > li").forEach((link) => {
          link.addEventListener("click", () => {
            navRightSetWhite();
          });
          link.addEventListener("focus", () => {
            navRightSetWhite();
          });
        });

        window.setHeaderSticky = function (isSticky) {
          if (!headerEl) return;
          isHeaderStickyEnabled = !!isSticky;
          if (!isHeaderStickyEnabled) {
            headerEl.classList.remove("sticky-header", "fixed", "sticky");
            headerEl.classList.remove(
              nonStickyPositionClass === "relative" ? "absolute" : "relative",
            );
            headerEl.classList.add(nonStickyPositionClass);
          } else {
            if (window.scrollY > 0) {
              headerEl.classList.add("sticky-header", "fixed");
              headerEl.classList.remove("absolute", "relative");
            }
          }
        };

        document.querySelectorAll('[data-sticky="off"]').forEach((btn) =>
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.setHeaderSticky(false);
          }),
        );
        document.querySelectorAll('[data-sticky="on"]').forEach((btn) =>
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.setHeaderSticky(true);
          }),
        );
        window.addEventListener("scroll", () => {
          if (!headerEl || !navRight) return;

          const scrolled = window.scrollY > 20;

          // Sticky header toggle
          if (isHeaderStickyEnabled && scrolled) {
            headerEl.classList.add("sticky-header", "fixed");
            headerEl.classList.remove("absolute", "relative");
          } else {
            headerEl.classList.remove("sticky-header", "fixed", "sticky");
            headerEl.classList.remove(
              nonStickyPositionClass === "relative" ? "absolute" : "relative",
            );
            headerEl.classList.add(nonStickyPositionClass);
          }

          // Update nav color state
          if (scrolled || isSearchOpen || anyMenuOpen() || isMobileMenuOpen()) {
            navRightSetWhite();
          } else {
            navRightSetTransparent();
          }

          // Force instant UI updates (no delay)
          updateHeaderBtnState();
          updateDropdownToggleColors();
          updateAllSVGFills();

          // Small debounce to recheck SVG color after layout paints
          requestAnimationFrame(() => {
            updateAllSVGFills();
          });
        });

        // Dropdown attach handlers
        // ---------- Dropdown attach handlers (final flicker-free desktop fix) ----------
        dropdowns.forEach((dropdown) => {
          const toggle = dropdown.querySelector(".dropdown-toggle");
          const backBtn = dropdown.querySelector(".back-btn");
          const menu =
            dropdown.querySelector(".dropdown-menu") ||
            dropdown.querySelector("ul");

          if (!toggle || !menu) return;

          // Close button inside dropdown (mobile)
          backBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            closeDropdownMenu(menu);
            removeNavWhiteIfNoSearch();
            updateAllSVGFills();
            updateDropdownToggleColors();
            updateHeaderBtnState?.();
          });

          // ✅ CLICK (works on both desktop & mobile, flicker-free)
          toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isDesktopView = isDesktop();
            const isOpen = menu.classList.contains("is-open");

            if (isOpen) closeDropdownMenu(menu);
            else openDropdownMenu(menu);

            // Prevent hover conflicts
            lastDropdownClicked = dropdown;

            // Close all other dropdowns first
            dropdowns.forEach((d) => {
              const otherMenu =
                d.querySelector(".dropdown-menu") || d.querySelector("ul");
              if (otherMenu && otherMenu !== menu) closeDropdownMenu(otherMenu);
            });

            if (isOpen) {
              closeDropdownMenu(menu);
              removeNavWhiteIfNoSearch();
              lastDropdownClicked = null;
            } else {
              openDropdownMenu(menu);
              navRightSetWhite();
              showOverlay();
            }

            updateOverlayState();
            updateAllSVGFills();
            updateDropdownToggleColors();
            updateHeaderBtnState?.();
          });

          // ✅ HOVER (desktop only) — but disabled immediately after a click
          let hoverTimeout;

          dropdown.addEventListener("pointerenter", () => {
            if (!isDesktop()) return;
            if (lastDropdownClicked === dropdown) return; // ⛔ skip hover if recently clicked

            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
              openDropdownMenu(menu);
              navRightSetWhite();
              showOverlay();
              updateAllSVGFills();
              updateDropdownToggleColors();
              updateHeaderBtnState?.();
            }, 100); // small delay to avoid flicker
          });

          dropdown.addEventListener("pointerleave", () => {
            if (!isDesktop()) return;
            if (lastDropdownClicked === dropdown) return; // ⛔ skip hover-close if it was clicked

            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
              closeDropdownMenu(menu);
              removeNavWhiteIfNoSearch();
              updateAllSVGFills();
              updateDropdownToggleColors();
              updateHeaderBtnState?.();
            }, 120);
          });

          // Reset click state when mouse leaves the whole nav area
          document.addEventListener("pointermove", (e) => {
            const overNav = headerEl.contains(e.target);
            if (!overNav) {
              lastDropdownClicked = null;
            }
          });
        });

        // Close dropdowns when clicking outside
        document.addEventListener("click", (e) => {
          if (
            !e.target.closest(".dropdown") &&
            !e.target.closest("#searchBox") &&
            !e.target.closest("#searchButton")
          ) {
            dropdowns.forEach((d) => {
              const menu =
                d.querySelector(".dropdown-menu") || d.querySelector("ul");
              if (menu) closeDropdownMenu(menu);
            });
            closeSearch();
            removeNavWhiteIfNoSearch();
            updateAllSVGFills();
            updateDropdownToggleColors();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          }
        });

        overlayEl?.addEventListener("mouseenter", () => {
          if (!isDesktop()) return;
          document.querySelectorAll(".navbar > li");
          dropdowns.forEach((d) => {
            const menu =
              d.querySelector(".dropdown-menu") || d.querySelector("ul");
            if (!menu) return;
            closeDropdownMenu(menu);
          });
          removeNavWhiteIfNoSearch();
          updateOverlayState();
          updateAllSVGFills();
          updateDropdownToggleColors();
          if (typeof updateHeaderBtnState === "function")
            updateHeaderBtnState();
        });
        document.querySelectorAll(".navbar > li").forEach((tab) => {
          // On hover
          tab.addEventListener("mouseenter", () => {
            navRightSetWhite();
            updateAllSVGFills?.();
            updateDropdownToggleColors?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });

          // On hover out
          tab.addEventListener("mouseleave", () => {
            removeNavWhiteIfNoSearch();
            updateAllSVGFills?.();
            updateDropdownToggleColors?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });

          // On click
          tab.addEventListener("click", () => {
            navRightSetWhite();
            updateAllSVGFills?.();
            updateDropdownToggleColors?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });
        });

        // Keep nav white while hovering header or dropdown, clear otherwise
        if (headerEl) {
          headerEl.addEventListener("mouseenter", () => {
            navRightSetWhite();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });

          headerEl.addEventListener("mouseleave", () => {
            // ✅ Skip reverting if the page is scrolled
            if (window.scrollY > 20) return;

            removeNavWhiteIfNoSearch();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });
        }

        // Also toggle nav background when hovering the entire nav-right area
        if (navRight) {
          navRight.addEventListener("mouseenter", () => {
            navRightSetWhite();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });
          navRight.addEventListener("mouseleave", () => {
            if (window.scrollY > 20) return; // ✅ add this line
            removeNavWhiteIfNoSearch();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });
        }

        // Also toggle nav background when hovering the logobox
        const logoBox = document.querySelector('.logo');
        if (logoBox) {
          logoBox.addEventListener("mouseenter", () => {
            navRightSetWhite();
            updateAllSVGFills?.();
            if (typeof updateHeaderBtnState === "function")
              updateHeaderBtnState();
          });
          logoBox.addEventListener("mouseleave", ensureIdleTransparent);
        }

        // ---------- SVG fill updater (exposed on window) ----------
        function updateAllSVGFills() {
          if (!shouldToggleColors()) return;

          const dropdownOpen = !!document.querySelector(
            ".dropdown .dropdown-menu.open:not(.hidden), .dropdown ul.open:not(.hidden)",
          );
          const navIsWhite =
            (headerEl && headerEl.classList.contains("bg-white")) ||
            (navRight && navRight.classList.contains("bg-white"));
          const color =
            navIsWhite ||
            isSearchOpen ||
            dropdownOpen ||
            window.scrollY > 0 ||
            mobileMenuToggle?.classList.contains("open")
              ? "black"
              : "white";

          document
            .querySelectorAll("#searchButton svg")
            .forEach((el) => setSVGColor(el, color));
          document
            .querySelectorAll("#menuToggle svg")
            .forEach((el) => setSVGColor(el, color));
          document.querySelectorAll(".nav-right svg").forEach((svgEl) => {
            if (svgEl.closest(".back-btn")) return;
            if (svgEl.closest(".dropdown-menu li.relative")) return;
            if (svgEl.classList.contains("dropdown-arrow")) return;
            setSVGColor(svgEl, color);
          });
          document
            .querySelectorAll(".dropdown-svg, .dropdown .dropdown-toggle svg")
            .forEach((el) => setSVGColor(el, color));
          document
            .querySelectorAll(".back-btn svg")
            .forEach((el) => setSVGColor(el, color));
          document
            .querySelectorAll(".dropdown-menu svg, .dropdown-menu .transform")
            .forEach((el) => setSVGColor(el, color));

          updateDropdownToggleColors();
          if (typeof updateHeaderBtnState === "function")
            updateHeaderBtnState();
        }

        window.updateAllSVGFills = updateAllSVGFills;

        ["openSearch", "closeSearch"].forEach((fn) => {
          if (typeof window[fn] === "function") {
            const originalFn = window[fn];
            window[fn] = function (...args) {
              originalFn(...args);
              updateHeaderBtnState();
              updateDropdownToggleColors();
            };
          }
        });

        if (mobileMenuToggle) {
          mobileMenuToggle.addEventListener("click", () => {
            updateHeaderBtnState();
            updateDropdownToggleColors();
          });
        }

        // Initial pass
        updateAllSVGFills();
        window.addEventListener("resize", () => {
          updateAllSVGFills();
          updateDropdownToggleColors();
          updateHeaderBtnState();
        });
        updateHeaderBtnState();
        updateDropdownToggleColors();

        // Ensure idle state (no hover, no dropdown, no search, top of page) starts transparent
        const enforceIdleTransparent = () => {
          // only for pages that allow color toggling
          if (!shouldToggleColors()) return;
          // if nothing is open and at top, revert to transparent
          const nothingOpen =
            !isSearchOpen && !isMobileMenuOpen() && !anyMenuOpen();
          if (nothingOpen && window.scrollY === 0) {
            removeNavWhiteIfNoSearch();
            updateAllSVGFills();
          }
        };
        // run immediately after listeners are attached
        setTimeout(enforceIdleTransparent, 0);
        // and once the page fully loads (images/fonts can shift hover areas)
        window.addEventListener("load", () =>
          setTimeout(enforceIdleTransparent, 0),
        );

// ---------- Nested dropdowns (final tested version: mobile + desktop) ----------
document.querySelectorAll("li[class*='group/']").forEach((dropdown) => {
  const toggle = dropdown.querySelector("div");
  const menu = dropdown.querySelector(".pages-dropdown-menu");

  if (!toggle || !menu) return;

  // click toggle
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isDesktop = window.innerWidth >= 991;
    const isOpen = menu.classList.contains("open");

    // close other open dropdowns
    document.querySelectorAll(".pages-dropdown-menu.open").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open");
        m.style.maxHeight = "0px";
        const otherToggle = m.closest("li")?.querySelector("div");
        otherToggle?.classList.remove("dropdown-toggle-open");
      }
    });

    if (isOpen) {
      // closing
      menu.style.maxHeight = menu.scrollHeight + "px";
      requestAnimationFrame(() => {
        menu.style.maxHeight = "0px";
      });
      menu.classList.remove("open");
      toggle.classList.remove("dropdown-toggle-open");
    } else {
      // opening
      menu.classList.add("open");
      toggle.classList.add("dropdown-toggle-open");
      menu.style.maxHeight = menu.scrollHeight + "px";
    }
  });

  // Desktop hover support
  dropdown.addEventListener("mouseenter", () => {
    if (window.innerWidth < 991) return;
    menu.classList.add("open");
    toggle.classList.add("dropdown-toggle-open");
    menu.style.maxHeight = menu.scrollHeight + "px";
  });

  dropdown.addEventListener("mouseleave", () => {
    if (window.innerWidth < 991) return;
    menu.classList.remove("open");
    toggle.classList.remove("dropdown-toggle-open");
    menu.style.maxHeight = "0px";
  });
});



      });

      document.addEventListener("DOMContentLoaded", () => {
        // Run nested submenu accordion for all practical widths (desktop too).
        // Hover handlers are disabled on desktop in favor of click accordion.
        const MOBILE_MAX = 5000;

        // loop over each dropdown parent li
        document
          .querySelectorAll(".dropdown-menu li.relative")
          .forEach((li) => {
            const trigger = li.querySelector(":scope > div:first-of-type"); // clickable row
            const submenu = li.querySelector(":scope > div:nth-of-type(2)"); // submenu div

            if (!trigger || !submenu) return;

            trigger.addEventListener("click", (e) => {
              if (window.innerWidth <= MOBILE_MAX) {
                e.preventDefault();
                e.stopPropagation();

                // close other siblings
                li.parentElement
                  .querySelectorAll(":scope > li")
                  .forEach((sibling) => {
                    if (sibling !== li) {
                      const sibSub = sibling.querySelector(
                        ":scope > div:nth-of-type(2)",
                      );
                      if (sibSub) {
                        sibSub.classList.add("hidden");
                        sibSub.classList.remove("block");
                      }
                    }
                  });

                // toggle current submenu
                if (submenu.classList.contains("hidden")) {
                  submenu.classList.remove("hidden");
                  submenu.classList.add("block");
                } else {
                  submenu.classList.add("hidden");
                  submenu.classList.remove("block");
                }

                // toggle arrow icon
                const caret = trigger.querySelector("svg");
                if (caret) caret.classList.toggle("rotate-90");
              }
            });
          });
      });

      // ================================  home-3    ======================================

      // blog &news section
      document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".card");
        const firstCard = document.querySelector('.card[data-featured="true"]');
        if (!firstCard) return; // stop if no featured card found

        const firstCardContent = firstCard.querySelectorAll(".card-content");

        cards.forEach((card) => {
          if (card.dataset.featured === "false") {
            card.addEventListener("mouseenter", () => {
              // shrink first card + hide its content
              firstCard.classList.replace("lg:flex-[3]", "lg:flex-[1]");
              firstCardContent.forEach((el) =>
                el.classList.add("lg:opacity-0"),
              );

              // expand hovered + show its content
              card.classList.replace("lg:flex-[1]", "lg:flex-[3]");
              card
                .querySelectorAll(".card-content")
                .forEach((el) => el.classList.remove("lg:opacity-0"));
            });

            card.addEventListener("mouseleave", () => {
              // reset first card
              firstCard.classList.replace("lg:flex-[1]", "lg:flex-[3]");
              firstCardContent.forEach((el) =>
                el.classList.remove("lg:opacity-0"),
              );

              // reset hovered
              card.classList.replace("lg:flex-[3]", "lg:flex-[1]");
              card
                .querySelectorAll(".card-content")
                .forEach((el) => el.classList.add("lg:opacity-0"));
            });
          }

          // ✅ Hover on first card itself
          if (card.dataset.featured === "true") {
            card.addEventListener("mouseenter", () => {
              card.classList.replace("lg:flex-[1]", "lg:flex-[3]");
              firstCardContent.forEach((el) =>
                el.classList.remove("lg:opacity-0"),
              );
            });
          }
        });
      });

      // =======================
      // Blog comments: Reply accordion (all blog-detail pages)
      // =======================
      document.addEventListener("DOMContentLoaded", () => {
        const commentsList = document.querySelector(".comments-list");
        if (!commentsList) return;

        // Simple, editable HTML template for the inline reply form.
        // Edit REPLY_FORM_HTML below to change fields/text/styles in one place.
        const REPLY_FORM_HTML = `
         <div class="reply-panel-box">
    <div class="md:px-0 2xl:ml-10 xl:ml-8 ml-6">
        <div class="2xl:mb-[42px] xl:mb-7 mb-[22px]">
            <h3 class="sm:text-start text-center font-medium 1xl:mb-3 mb-2">
               Leave a Reply
            </h3>
            <p class="sm:text-start text-center text-black">
                Share your thoughts or continue the discussion — your feedback matters!
            </p>
        </div>

        <form id="contactForm" method="post" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 2xl:gap-[30px] 1xl:gap-6 xl:gap-[20px] gap-[15px]">
                <!-- Name Fields -->
                <div class="relative">
                    <label for="firstName" class="block xl:mb-3 mb-1.5 p text-black">First
                        Name *</label>
                    <input type="text" id="firstName" name="firstName" required
                        class="w-full xl:px-3 px-2 1xl:py-[14px] sm:py-2.5 py-2 border border-black focus:border-primary-900 outline-none" />

                    <!-- Error message with SVG icon -->
                    <div
                        class="text-red-500 mt-2 opacity-0 transition-all ease-in-out error-message hidden items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path
                                d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                                fill="#D21C1C" />
                        </svg>
                        <span class="error-text p2"></span>
                    </div>
                </div>

                <!-- Name Fields -->
                <div class="relative">
                    <label for="lastName" class="block xl:mb-3 mb-1.5 p text-black">Last
                        Name *</label>
                    <input type="text" id="lastName" name="lastName" required
                        class="w-full xl:px-3 px-2 1xl:py-[14px] sm:py-2.5 py-2 border border-black focus:border-primary-900 outline-none" />

                    <!-- Error message with SVG icon -->
                    <div
                        class="text-red-500 mt-2 opacity-0 transition-all ease-in-out error-message hidden items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path
                                d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                                fill="#D21C1C" />
                        </svg>
                        <span class="error-text p2"></span>
                    </div>
                </div>

                <!-- Email -->
                <div class="relative">
                    <label for="email" class="block xl:mb-3 mb-1.5 p text-black">Email
                        Address *</label>
                    <input type="email" id="email" name="email" required
                        class="w-full xl:px-3 px-2 1xl:py-[14px] sm:py-2.5 py-2 border border-black focus:border-primary-900 outline-none" />
                    <!-- Error message with SVG icon -->
                    <div
                        class="text-red-500 mt-2 opacity-0 transition-all ease-in-out error-message hidden items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path
                                d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                                fill="#D21C1C" />
                        </svg>
                        <span class="error-text p2"></span>
                    </div>
                </div>

                <div>
                    <label class="block p xl:mb-3 mb-[8px] text-black">
                        Your Website
                    </label>
                    <input type="text"
                        class="w-full border border-black xl:px-3 px-2 1xl:py-[14px] py-2.5 focus:outline-none" />
                </div>

                <!-- Message -->
                <div class="relative sm:col-span-2 col-span-1">
                    <label for="message" class="block xl:mb-3 mb-1.5 p text-black">
                        Your Comment *
                    </label>
                    <textarea id="message" name="message" required
                        class="w-full xl:px-3 px-2 1xl:py-[14px] sm:py-2.5 py-2 border border-black focus:border-primary-900 outline-none 1xl:min-h-[160px] xl:min-h-[148px] lg:min-h-[130px] sm:min-h-[100px] min-h-[90px] resize-y"></textarea>
                    <!-- Error message with SVG icon -->
                    <div
                        class="text-red-500 mt-2 opacity-0 transition-all ease-in-out error-message hidden items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path
                                d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                                fill="#D21C1C" />
                        </svg>
                        <span class="error-text p2"></span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-5 2xl:mt-[26px] xl:mt-5 mt-4">
                <button type="submit" class="btn btn-primary">Leave Comment</button>
                <button type="button"
                    class="reply-cancel btn btn-outline text-[#D21C1C] border-b border-transparent hover:border-[#D21C1C]">Cancel</button>
            </div>
        </form>
    </div>
</div>`;

        // --- Slim Reply Handler (minimal JS, same behavior) ---
        (function slimReply() {
          // Use the predefined template so the UI matches the bottom form
          const TEMPLATE_HTML = REPLY_FORM_HTML || "";

          // Minimal field error helpers (scoped to this handler)
          function rfEnsureError(input) {
            if (!input) return null;
            // Prefer an existing error container in the same field wrapper
            let err =
              input.parentElement &&
              input.parentElement.querySelector(".error-message");
            if (
              !err ||
              !(err.classList && err.classList.contains("error-message"))
            ) {
              // Fallback: create one that matches the template (with SVG + span.error-text)
              err = document.createElement("div");
              err.className =
                "text-red-500 mt-2 opacity-0 transition-all ease-in-out error-message hidden items-center gap-2";
              err.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z" fill="#D21C1C"/></svg><span class="error-text p2"></span>';
              input.insertAdjacentElement("afterend", err);
            }
            return err;
          }
          function rfShowError(input, message) {
            if (!input) return;
            input.classList.add(
              "border-red-500",
              "shadow-[0_0_10px_0_#D21C1C26]",
            );
            const err = rfEnsureError(input);
            if (err) {
              const span = err.querySelector(".error-text");
              if (span) span.textContent = message || "This field is required";
              else err.textContent = message || "This field is required";
              err.classList.remove("opacity-0", "hidden");
              err.classList.add("opacity-100", "flex");
            }
          }
          function rfClearError(input) {
            if (!input) return;
            input.classList.remove(
              "border-red-500",
              "shadow-[0_0_10px_0_#D21C1C26]",
            );
            const err =
              input.parentElement &&
              input.parentElement.querySelector(".error-message");
            if (
              err &&
              err.classList &&
              err.classList.contains("error-message")
            ) {
              const span = err.querySelector(".error-text");
              if (span) span.textContent = "";
              else err.textContent = "";
              err.classList.add("opacity-0", "hidden");
              err.classList.remove("opacity-100", "flex");
            }
          }
          function rfValidate(input) {
            if (!input) return { ok: true };
            const value = (input.value || "").trim();
            const required = input.hasAttribute("required");
            if (required && !value)
              return { ok: false, msg: "This field is required" };
            const name = (input.name || "").toLowerCase();
            if ((input.type === "email" || name === "email") && value) {
              const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              if (!ok) return { ok: false, msg: "Please enter a valid email" };
            }
            return { ok: true };
          }

          // Accordion helpers (shared across create and toggle)
          function accOpen(el) {
            if (!el) return;
            // Restore margins on open
            el.classList.remove("mt-0");
            el.style.marginTop = "";
            el.classList.add("mt-5", "sm:mt-6");
            el.classList.remove("hidden");
            el.style.overflow = "hidden";
            el.style.willChange = "max-height, opacity, transform";
            el.style.transition =
              "max-height 500ms ease, opacity 400ms ease, transform 400ms ease";
            el.style.maxHeight = "0px";
            el.style.opacity = "0";
            el.style.transform = "translateY(-4px)";
            requestAnimationFrame(() => {
              el.style.maxHeight = el.scrollHeight + "px";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            });
            el.addEventListener(
              "transitionend",
              function onEnd(e) {
                if (e.propertyName === "max-height") {
                  el.removeEventListener("transitionend", onEnd);
                  el.style.maxHeight = "none";
                  el.style.overflow = "";
                  el.style.willChange = "";
                  el.style.transition = "";
                  el.style.opacity = "";
                  el.style.transform = "";
                }
              },
              { once: true },
            );
          }
          function accClose(el, { remove = false, marginZero = false } = {}) {
            if (!el) return;
            // Immediately clamp outer spacing to 0 to avoid visual gap during animation
            if (marginZero) {
              el.classList.remove("mt-5");
              el.classList.remove("sm:mt-6");
              el.classList.add("mt-0");
              el.style.setProperty("margin-top", "0px", "important");
              el.style.borderLeft = "0";
            }
            el.style.overflow = "hidden";
            el.style.willChange = "max-height, opacity, transform";
            el.style.transition =
              "max-height 500ms ease, opacity 400ms ease, transform 400ms ease";
            el.style.maxHeight = el.scrollHeight + "px";
            requestAnimationFrame(() => {
              el.style.maxHeight = "0px";
              el.style.opacity = "0";
              el.style.transform = "translateY(-4px)";
            });
            el.addEventListener(
              "transitionend",
              function onEnd(e) {
                if (e.propertyName === "max-height") {
                  el.removeEventListener("transitionend", onEnd);
                  el.classList.add("hidden");
                  el.style.maxHeight = "";
                  el.style.overflow = "";
                  el.style.willChange = "";
                  el.style.transition = "";
                  el.style.opacity = "";
                  el.style.transform = "";
                  if (remove && el.parentNode) el.parentNode.removeChild(el);
                }
              },
              { once: true },
            );
          }

          commentsList.addEventListener("click", (e) => {
            const a = e.target && e.target.closest && e.target.closest("a");
            if (!a) return;
            const content = a.closest(".comments-content");
            if (!content) return;
            const txt = (a.textContent || "").toLowerCase();
            const href = (a.getAttribute("href") || "").trim();
            if (!(/reply/.test(txt) || href === "#")) return;
            e.preventDefault();
            e.stopPropagation();

            const row = content.parentElement;
            let box = row.nextElementSibling;
            if (
              !(box && box.classList && box.classList.contains("reply-sibling"))
            ) {
              box = document.createElement("div");
              box.className = "reply-sibling mt-5 sm:mt-6";
              box.style.borderLeft = "1px solid #00000026";
              // Extra left space when replying to a sub-comment (detect left border marker in the row)
              const isSub = !!row.querySelector(":scope > .border-l");
              box.style.marginLeft = isSub ? "32px" : "16px";
              box.innerHTML = TEMPLATE_HTML;
              row.insertAdjacentElement("afterend", box);

              // Prefer any form found in the template
              const form = box.querySelector("form");
              const cancelBtn = box.querySelector(".reply-cancel");
              const panel =
                box.querySelector(".reply-panel") ||
                box.querySelector(".reply-panel-box") ||
                box.firstElementChild ||
                box;

              // Start hidden so we can animate the open (use shared helpers on the wrapper)
              box.classList.add("hidden");

              const show = () => accOpen(box);
              const hide = () => accClose(box, { marginZero: true });

              cancelBtn &&
                cancelBtn.addEventListener("click", (ev) => {
                  ev.preventDefault();
                  hide();
                });

              // Realtime clearing of errors
              const inputs = form
                ? form.querySelectorAll("input, textarea")
                : [];
              inputs.forEach((inp) => {
                inp.addEventListener("input", () => {
                  const r = rfValidate(inp);
                  if (r.ok) rfClearError(inp);
                });
              });

              // Submit with inline error messages under fields
              form &&
                form.addEventListener("submit", (ev) => {
                  ev.preventDefault();
                  let firstInvalid = null;
                  let hasError = false;
                  (form.querySelectorAll("input, textarea") || []).forEach(
                    (inp) => {
                      const r = rfValidate(inp);
                      if (!r.ok) {
                        hasError = true;
                        rfShowError(inp, r.msg);
                        if (!firstInvalid) firstInvalid = inp;
                      } else {
                        rfClearError(inp);
                      }
                    },
                  );
                  if (hasError) {
                    firstInvalid && firstInvalid.focus();
                    return;
                  }
                  hide();
                });

              show();
            } else {
              // Toggle using shared helpers on the wrapper itself
              if (box.classList.contains("hidden")) {
                accOpen(box);
              } else {
                accClose(box, { marginZero: true });
              }
            }
          });
        })();

        // Hard guarantee: reply forms never show any avatar/images
        (function ensureNoAvatarInReply() {
          const style = document.createElement("style");
          style.textContent = `
            .reply-wrap img{display:none!important}
            .reply-wrap > .overflow-hidden{display:none!important;width:0!important;max-width:0!important;margin:0!important;padding:0!important}
            .comments-list > .reply-wrap{border-top-width:0!important;border-top-style:none!important}
            .comments-list > .reply-sibling{border-top-width:0!important;border-top-style:none!important}
          `;
          document.head.appendChild(style);
        })();
      });
    },

    /*======================================
     02. Slider Open JS
    ========================================*/
    slider_open: function () {
      /* Our Work slider */
      var swiper = new Swiper(".project-1 .project-slider", {
        slidesPerView: 2.73,
        spaceBetween: 85,
        mousewheel: {
          invert: false, // false = natural scroll direction
          releaseOnEdges: true, // lets page scroll when at edges
          sensitivity: 1, // adjust scroll speed
        },
        navigation: {
          nextEl: ".customers-purchased-section .swiper-button-next",
          prevEl: ".customers-purchased-section .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          389: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          472: {
            slidesPerView: 1.8,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 2.1,
            spaceBetween: 40,
          },
          991: {
            slidesPerView: 2.6,
            spaceBetween: 50,
          },
          1170: {
            slidesPerView: 2.6,
            spaceBetween: 60,
          },
          1380: {
            slidesPerView: 3.1,
            spaceBetween: 60,
          },
          1752: {
            slidesPerView: 2.73,
            spaceBetween: 85,
          },
        },
      });

      // /* Our Projects slider */
      document.addEventListener("DOMContentLoaded", function () {
        var swiper = new Swiper(".our-projects-home-2 .projects-2", {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: {
            nextEl: ".our-projects-home-2 .swiper-button-next",
            prevEl: ".our-projects-home-2 .swiper-button-prev",
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1170: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1199: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          },
        });
      });

      /* Our Blog Grid slider */
      var swiper = new Swiper(".blog-grid-slider .blogs-2", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".blog-grid-slider .swiper-button-next",
          prevEl: ".blog-grid-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.8,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 2.3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 2.5,
            spaceBetween: 35,
          },
          1380: {
            slidesPerView: 2.5,
            spaceBetween: 50,
          },
          1752: {
            slidesPerView: 2.5,
            spaceBetween: 55,
          },
        },
      });

      /* Special offers & Discounts slider */
      var swiper = new Swiper(".our-gallery-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: ".our-gallery-slider .swiper-button-next",
          prevEl: ".our-gallery-slider .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      });

      /* Special offers & Discounts slider */
      var swiper = new Swiper(".project-detail-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        //loop: true,
        navigation: {
          nextEl: ".project-detail-slider .swiper-button-next",
          prevEl: ".project-detail-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        },
      });
      // ========================================= version 2.0 new js ===============================================

      // First initialize thumbs slider
      const typesThumbs = new Swiper(".card-types .types", {
        spaceBetween: 26,
        slidesPerView: 4,
        slideToClickedSlide: true, // this is CRITICAL for click syncing
        watchSlidesProgress: true,

        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 26,
          },
          1756: {
            slidesPerView: 4,
            spaceBetween: 26,
          },
        },
      });

      // Then initialize main slider and link thumbs
      const typesMain = new Swiper(".card-types .types2", {
        spaceBetween: 10,
        thumbs: {
          swiper: typesThumbs,
        },
        pagination: {
          el: ".card-types .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".card-types .swiper-button-next",
          prevEl: ".card-types .swiper-button-prev",
        },
      });

      // Team Member
      var swiper = new Swiper(".team", {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          430: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 35,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1380: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1752: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      });

      // Blogs cards
      var swiper = new Swiper(".blogs-1", {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          430: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 35,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 45,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 55,
          },
          1380: {
            slidesPerView: 3,
            spaceBetween: 64,
          },
          1752: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        },
      });

      var swiper = new Swiper(".company-logos", {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: true,
        allowTouchMove: false,
        speed: 10000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        freeMode: {
          enabled: true,
          momentum: false,
          minimumVelocity: 0.1,
        },
        breakpoints: {
          0: { slidesPerView: 2, spaceBetween: 10 },
          376: { slidesPerView: 3, spaceBetween: 30 },
          500: { slidesPerView: 4, spaceBetween: 30 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          992: { slidesPerView: 5, spaceBetween: 50 },
          1199: { slidesPerView: 6, spaceBetween: 50 },
          1380: { slidesPerView: 6, spaceBetween: 50 },
          1752: { slidesPerView: 6, spaceBetween: 30 },
        },
      });

      document.addEventListener("DOMContentLoaded", function () {
        const s = document.querySelector(".our-testimonials-section");
        if (!s) return;

        const main = new Swiper(s.querySelector(".testimonial"), {
          spaceBetween: 10,
          navigation: {
            nextEl: s.querySelector(".swiper-button-next"),
            prevEl: s.querySelector(".swiper-button-prev"),
          },
        });

        const thumbs = new Swiper(s.querySelector(".user"), {
          spaceBetween: 0,
          slidesPerView: 5,
          centeredSlides: true,
          breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 3, spaceBetween: 0 },
            992: { slidesPerView: 5, spaceBetween: 0 },
          },
        });

        const update = (i = main.realIndex) => {
          const active = main.slides[main.activeIndex];
          s.querySelector("#user-name").textContent =
            active.getAttribute("data-name") || "";
          s.querySelector("#user-role").textContent =
            active.getAttribute("data-role") || "";
          thumbs.slides.forEach((el) => el.classList.remove("active-thumb"));
          if (thumbs.slides[i]) thumbs.slides[i].classList.add("active-thumb");
        };

        main.on("slideChange", () => {
          thumbs.slideToLoop(main.realIndex, 500);
          update();
        });

        thumbs.on("click", () => {
          if (thumbs.clickedIndex != null) {
            main.slideToLoop(thumbs.clickedIndex, 500, true);
            update(thumbs.clickedIndex);
          }
        });

        update(0);
      });

      // INDEX-2 ==============================================
      var swiper = new Swiper(".home-2-hero", {
        spaceBetween: 10,
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      // OUR GALLERY constant-speed marquee (no Swiper) in index-2.html
      document.addEventListener("DOMContentLoaded", function () {
        // -----------------
        // Marquee Init
        // -----------------
        const containers = document.querySelectorAll(
          ".our-gallery-marquee .js-marquee",
        );
        containers.forEach((track) => initMarquee(track));

        function initMarquee(track) {
          const speed = parseFloat(track.getAttribute("data-speed")) || 40; // px/sec
          const dir = track.getAttribute("data-direction") === "right" ? 1 : -1;

          if (dir === 1) {
            const originals = Array.from(track.children);
            const imgs = originals.flatMap((el) =>
              Array.from(el.querySelectorAll("img")),
            );
            const pending = imgs.filter((im) => !im.complete);

            const start = () => {
              const originalWidth = Math.round(track.scrollWidth);
              const containerWidth = track.parentElement.clientWidth;
              if (track.scrollWidth < originalWidth + containerWidth + 10) {
                originals.forEach((ch) => {
                  const clone = ch.cloneNode(true);
                  clone.classList.add("cloned");
                  track.appendChild(clone);
                });
              }

              track.style.willChange = "transform";
              track.style.backfaceVisibility = "hidden";

              const firstItem = originals[0];
              const firstWidth = Math.round(
                firstItem.getBoundingClientRect().width ||
                  firstItem.scrollWidth,
              );
              let offset = -(originalWidth - firstWidth);
              let last = performance.now();
              function step(now) {
                const dt = (now - last) / 1000;
                last = now;
                offset += speed * dt;
                if (offset >= 0) offset = -(originalWidth - firstWidth);
                track.style.transform = `translate3d(${offset}px,0,0)`;
                requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            };

            if (pending.length) {
              let loaded = 0;
              const done = () => {
                loaded += 1;
                if (loaded === pending.length) start();
              };
              pending.forEach((im) => {
                im.addEventListener("load", done, { once: true });
                im.addEventListener("error", done, { once: true });
              });
            } else {
              start();
            }
            return;
          }

          // Left direction
          const children = Array.from(track.children);
          const contentWidth = track.scrollWidth;
          children.forEach((ch) => {
            const clone = ch.cloneNode(true);
            clone.classList.add("cloned");
            track.appendChild(clone);
          });
          let offset = 0;
          let last = performance.now();
          function step(now) {
            const dt = (now - last) / 1000;
            last = now;
            offset += dir * speed * dt;
            if (dir < 0 && -offset >= contentWidth) offset = 0;
            track.style.transform = `translate3d(${offset}px,0,0)`;
            requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }

        // -----------------
        // Lightbox Init
        // -----------------
        let currentIndex = 0;
        let galleryImages = [];

        function setupLightbox() {
          // Only original images for indexing
          galleryImages = Array.from(
            document.querySelectorAll(".js-gallery img"),
          ).filter((img) => !img.closest(".cloned"));

          // Delegate click on the parent container
          document.querySelectorAll(".js-gallery").forEach((gallery) => {
            gallery.addEventListener("click", (e) => {
              const img = e.target.closest("img");
              if (!img) return;

              // Find index in original images
              const index = galleryImages.indexOf(
                Array.from(galleryImages).find(
                  (original) => original.src === img.src,
                ),
              );
              if (index >= 0) openLightbox(index);
            });
          });
        }

        let scrollTop = 0;

        function openLightbox(index) {
          currentIndex = index;
          const lightbox = document.getElementById("galleryLightbox");
          lightbox.classList.remove("hidden");
          lightbox.classList.add("flex");

          // Save current scroll
          scrollTop = window.scrollY || document.documentElement.scrollTop;

          // Lock scroll without jumping
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollTop}px`;
          document.body.style.left = "0";
          document.body.style.right = "0";

          updateLightbox();
        }

        window.closeLightbox = function () {
          const lightbox = document.getElementById("galleryLightbox");
          lightbox.classList.add("hidden");

          // Unlock scroll and restore position
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          window.scrollTo(0, scrollTop);
        };

        function updateLightbox() {
          const main = document.getElementById("lightboxMain");
          const thumbs = document.getElementById("lightboxThumbs");
          if (!galleryImages.length) return;

          const img = galleryImages[currentIndex];
          main.innerHTML = `<img src="${img.src}" class="xl:max-h-[70vh] sm:max-h-[60vh] max-h-[90vh] object-contain mx-auto">`;

          thumbs.innerHTML = "";
          galleryImages.forEach((thumb, i) => {
            const t = document.createElement("img");
            t.src = thumb.src;
            t.className =
              "w-20 h-20 object-cover cursor-pointer border-2 " +
              (i === currentIndex ? "border-white" : "border-transparent");
            t.addEventListener("click", () => {
              currentIndex = i;
              updateLightbox();
            });
            thumbs.appendChild(t);
          });
        }

        window.nextImage = function () {
          currentIndex = (currentIndex + 1) % galleryImages.length;
          updateLightbox();
        };

        window.prevImage = function () {
          currentIndex =
            (currentIndex - 1 + galleryImages.length) % galleryImages.length;
          updateLightbox();
        };

        window.toggleFullscreen = function () {
          const mainImg = document.querySelector("#lightboxMain img");
          if (!mainImg) return;
          if (mainImg.requestFullscreen) {
            mainImg.requestFullscreen();
          } else if (mainImg.webkitRequestFullscreen) {
            mainImg.webkitRequestFullscreen();
          } else if (mainImg.msRequestFullscreen) {
            mainImg.msRequestFullscreen();
          }
        };

        // Initialize lightbox
        setupLightbox();
      });

      var swiper = new Swiper(".client-2", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 1,
        freeMode: true,
        effect: "fade",
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".testimonials-2 .testimonial-2", {
        loop: true,
        autoHeight: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".testimonials-2 .swiper-button-next",
          prevEl: ".testimonials-2 .swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });

      // ======================= INDEX-3 =============================================
      // home-3 hero
      var swiper = new Swiper(".home-3-hero", {
        spaceBetween: 10,
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      // ======================= INDEX-4 =============================================
      // home-4 hero
      document.addEventListener("DOMContentLoaded", () => {
        var swiper = new Swiper(".home-4-hero .home-4-hero-img", {
          spaceBetween: 10,
          slidesPerView: 1,
          freeMode: true,
          watchSlidesProgress: true,
        });
        var swiper2 = new Swiper(".home-4-hero .home-4-hero-content", {
          spaceBetween: 10,
          navigation: {
            nextEl: ".home-4-hero .swiper-button-next",
            prevEl: ".home-4-hero .swiper-button-prev",
          },
          thumbs: {
            swiper: swiper,
          },
        });
      });

      var swiper = new Swiper(".project-2 .project-slider", {
        slidesPerView: 2.73,
        spaceBetween: 85,
        mousewheel: {
          invert: false, // false = natural scroll direction
          releaseOnEdges: true, // lets page scroll when at edges
          sensitivity: 1, // adjust scroll speed
        },
        navigation: {
          nextEl: ".customers-purchased-section .swiper-button-next",
          prevEl: ".customers-purchased-section .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          389: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          472: {
            slidesPerView: 1.9,
            spaceBetween: 30,
          },
          769: {
            slidesPerView: 2.1,
            spaceBetween: 40,
          },
          992: {
            slidesPerView: 2.3,
            spaceBetween: 50,
          },
          1170: {
            slidesPerView: 2.6,
            spaceBetween: 60,
          },
          1380: {
            slidesPerView: 2.55,
            spaceBetween: 70,
          },
          1752: {
            slidesPerView: 2.55,
            spaceBetween: 85,
          },
        },
      });
      document.addEventListener("DOMContentLoaded", function () {
        var swiper = new Swiper(".testimonial-home-4 .testimonial-3", {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: {
            nextEl: ".testimonial-home-4 .swiper-button-next",
            prevEl: ".testimonial-home-4 .swiper-button-prev",
          },
          breakpoints: {
            992: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            1380: {
              slidesPerView: 2,
              spaceBetween: 80,
            },
            1752: {
              slidesPerView: 2,
              spaceBetween: 100,
            },
          },
        });
      });
      // const swiper = new Swiper(".testimonial-3", {
      //   slidesPerView: 1,
      //   spaceBetween: 30,
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
      //   loop: true,
      // });

      // Dhara 24-09
      // ===================== project details ================
      // gallery-wrapper Member
      var swiper = new Swiper(".gallery-wrapper", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".gallery-section .swiper-button-next",
          prevEl: ".gallery-section .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2.7,
            spaceBetween: 50,
          },
        },
      });

      /* related blogs slider */
      var swiper = new Swiper(".blog-grid-slider .blogs-2.related-blogs-2", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".blog-grid-slider .swiper-button-next",
          prevEl: ".blog-grid-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        },
      });
    },

    /*======================================
     03. Popup Open JS
    ========================================*/
    popup_open: function () {},

    /*======================================
     04. Preloader JS
    ========================================*/
    Preloader_js: function () {
      // Disable scroll while preloader is active
      $("html").addClass("no-scroll");

      const $preloader = $(".preloader");

      if ($preloader.length) {
        // If preloader exists, fade it out
        $preloader.delay(2000).fadeOut("slow", function () {
          $("html").removeClass("no-scroll");
        });
      } else {
        // If no preloader, enable scroll immediately
        $("html").removeClass("no-scroll");
      }
    },

    /*======================================
     05. Isotope JS
    ========================================*/
    Isotope_js: function () {},
  };
  journea_travel_agency.init();
})(jQuery);

// Our Story section: video modal logic (plain JS)
document.addEventListener("DOMContentLoaded", function () {
  const playBtn = document.getElementById("playBtn");
  let videoModal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeBtn");
  const storyVideo = document.getElementById("storyVideo");

  // Ensure the modal is mounted directly under <body>
  if (videoModal && videoModal.parentElement !== document.body) {
    document.body.appendChild(videoModal);
  }

  function openVideoModal() {
    videoModal.classList.remove("hidden");
    videoModal.classList.add("flex");
    storyVideo.currentTime = 0;
    storyVideo.play();
    document.body.style.overflow = "hidden"; // scroll lock
  }

  function closeVideoModal() {
    videoModal.classList.add("hidden");
    videoModal.classList.remove("flex");
    storyVideo.pause();
    storyVideo.currentTime = 0;
    document.body.style.overflow = ""; // restore scroll
  }

  if (playBtn && videoModal && closeBtn && storyVideo) {
    playBtn.addEventListener("click", openVideoModal);
    closeBtn.addEventListener("click", closeVideoModal);
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hoverImage = document.querySelector(".hover-image");

  if (hoverImage) {
    const faqs = document.querySelectorAll(".faqs-list");

    faqs.forEach((faq) => {
      const title = faq.querySelector(".faqs-title");
      const content = faq.querySelector(".faqs-content p");

      // Handle hover over title or paragraph only
      [title, content].forEach((hoverArea) => {
        if (!hoverArea) return;

        hoverArea.addEventListener("mouseenter", () => {
          const isActive = faq.classList.contains("active");
          if (!isActive) return; // show only if open

          const imgUrl = faq.getAttribute("data-img");
          hoverImage.src = imgUrl;
          hoverImage.classList.add("opacity-100");
        });

        hoverArea.addEventListener("mouseleave", () => {
          hoverImage.classList.remove("opacity-100");
        });

        hoverArea.addEventListener("mousemove", (e) => {
          const container = faq.closest(".hover-image-section");
          if (!container) return;
          const rect = container.getBoundingClientRect();
          hoverImage.style.left = `${e.clientX - rect.left + 10}px`;
          hoverImage.style.top = `${e.clientY - rect.top + 10}px`;
        });
      });
    });

    // Watch Alpine class changes for open/close
    const observer = new MutationObserver(() => {
      if (typeof updateHeaderBtnState === "function") {
        updateHeaderBtnState();
      }
      const activeFaq = document.querySelector(".faqs-list.active");
      if (!activeFaq) {
        hoverImage.classList.remove("opacity-100");
      }
    });
    const navRight = document.querySelector(".nav-right");
    if (navRight) {
      observer.observe(navRight, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });
  }
});

// ✅ Fix: Ensure first default-open FAQ (selected:1) shows full height after page fully loads
window.addEventListener("load", () => {
  const activeFaq = document.querySelector(".faqs-list.active");
  if (activeFaq) {
    const content = activeFaq.querySelector(".faqs-content");
    if (content) {
      requestAnimationFrame(() => {
        const fullHeight = content.scrollHeight;
        content.style.maxHeight = fullHeight + "px";
      });
    }
  }
});

// marqee slider
document.addEventListener("DOMContentLoaded", () => {
  const items = [
    "» 1 asdasd a",
    "» 2 asdasd as",
    "» 3 asdasd as",
    "» asdasd as",
  ];

  const marquee = document.getElementById("marquee");
  if (!marquee) return; // stop if element is not found

  // Fill marquee with items twice for looping
  function fillMarquee() {
    marquee.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      items.forEach((text) => {
        const p = document.createElement("p");
        p.className = "px-4 text-black text-sm h-[45px] flex items-center";
        p.textContent = text;
        marquee.appendChild(p);
      });
    }
  }

  fillMarquee();

  // Animation loop
  let offset = 0;
  const speed = 0.5; // pixels per frame
  function animate() {
    offset -= speed;
    if (Math.abs(offset) >= marquee.scrollWidth / 2) {
      offset = 0;
    }
    marquee.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
  }
  animate();
});

// on sticky add padding in heading in projects section
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("stickyHeader");

  if (!header) return; // stop if header doesn't exist

  function getStickyTop() {
    return parseInt(window.getComputedStyle(header).top, 10) || 0;
  }

  function checkSticky() {
    const rect = header.getBoundingClientRect();
    const stickyTop = getStickyTop();

    if (rect.top === stickyTop) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }

  window.addEventListener("scroll", checkSticky);
  window.addEventListener("resize", checkSticky);
  checkSticky();
});

// video play/pause button
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  const thumbnail = document.getElementById("videoThumbnail");
  const video = document.getElementById("videoPlayer");

  if (playBtn && thumbnail && video) {
    playBtn.addEventListener("click", () => {
      thumbnail.classList.add("hidden"); // hide thumbnail
      playBtn.classList.add("hidden"); // hide play button
      video.classList.remove("hidden"); // show video
      video.play(); // start video
    });
  }
});

// contact form validations and intl-tel-input for country flag dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  // Expose contact form validators for reuse (newsletter, etc.)
  window.contactValidateField = validateField;
  window.contactShowError = showError;
  window.contactClearError = clearError;
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById("successMessage");
  const fileInput = document.getElementById("fileUpload");
  const uploadButton = document.getElementById("uploadButton");
  const fileLabel = document.getElementById("fileLabel");
  const dropArea = document.getElementById("dropArea");

  const validationRules = {
    fullName: {
      required: true,
      pattern: /^[A-Z][a-zA-Z\s]*$/,
      minLength: 2,
      message: "Full name must start with a capital letter",
    },
    firstName: {
      required: true,
      pattern: /^[A-Z][a-zA-Z\s]*$/,
      minLength: 2,
      message: "First letter must be capital",
    },
    lastName: {
      required: true,
      pattern: /^[A-Z][a-zA-Z\s]*$/,
      minLength: 2,
      message: "First letter must be capital",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    company: {
      required: true,
      pattern: /^[A-Z][a-zA-Z\s]*$/,
      message: "Company name must start with a capital letter",
    },
    phone: {
      required: true,
      message: "Phone number is required",
    },
    position: {
      required: true,
      pattern: /^[A-Z][a-zA-Z\s]*$/,
      message: "Position must start with a capital letter",
    },
    budget: { required: true, message: "Budget is required" },
    message: {
      required: true,
      minLength: 10,
      message: "Please enter a message with at least 10 characters",
    },
    experience: {
      required: true,
      message: "Please Select Your Experience",
    },
    fileInput: { required: true, message: "No file uploaded" },
    fileUpload: { required: true, message: "No file uploaded" },
  };

  const fieldLabels = {
    fullName: "Full Name",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    company: "Company",
    phone: "Phone number",
    position: "Position",
    budget: "Budget",
    message: "Message",
    experience: "Experience",
    fileInput: "File Upload",
    fileUpload: "File Upload",
  };

  // Open native file dialog when custom button clicked
  if (uploadButton && fileInput) {
    uploadButton.addEventListener("click", (e) => {
      e.preventDefault();
      fileInput.click();
    });
  }

  // Show uploaded file names
  function updateFileLabel() {
    if (fileInput && fileLabel) {
      if (fileInput.files.length > 0) {
        const names = Array.from(fileInput.files)
          .map((f) => f.name)
          .join(", ");
        fileLabel.textContent = names;
      } else {
        fileLabel.textContent = "Drop files here or Select Files";
      }
    }
  }

  // Add validation for both fileInput (careers.html) and fileUpload (contact-us.html)
  const allFileInputs = form.querySelectorAll('input[type="file"]');
  allFileInputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateFileLabel();
      const fieldName = input.name; // This will be either "fileInput" or "fileUpload"
      const validation = validateField(fieldName, undefined, input);
      console.log(`File input validation for ${fieldName}:`, validation);
      if (validation.isValid) {
        clearError(input);
      } else {
        console.log(`Showing error for ${fieldName}:`, validation.message);
        showError(input, validation.message);
      }
    });
  });

  // DRAG & DROP FUNCTIONALITY
  if (dropArea && fileInput) {
    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(
        eventName,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropArea.classList.add("bg-gray-100");
        },
        false,
      );
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(
        eventName,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropArea.classList.remove("bg-gray-100");
        },
        false,
      );
    });

    dropArea.addEventListener("drop", (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        updateFileLabel();
        const fieldName = fileInput.name; // This will be either "fileInput" or "fileUpload"
        const validation = validateField(fieldName, undefined, fileInput);
        if (validation.isValid) {
          clearError(fileInput);
        } else {
          showError(fileInput, validation.message);
        }
        e.dataTransfer.clearData();
      }
    });
  }

  // Helper: find visible wrapper for file input (the dashed-border div)
  function findFileWrapper(input) {
    // Look for different wrapper structures
    const col = input.closest(".col-span-2");
    if (col) {
      return col.querySelector("div.border") || input.parentElement;
    }

    // For careers.html structure, look for the direct parent with border class
    const parentWithBorder = input.closest("div[class*='border']");
    if (parentWithBorder) {
      return parentWithBorder;
    }

    // Fallback to parent element
    return input.parentElement;
  }

  // Helper: find error message element for file inputs
  function findFileErrorElement(input) {
    // Try multiple strategies to find the error message
    let errorElement = null;

    // Strategy 1: Look in the same container as the input
    const container = input.closest("div");
    if (container) {
      errorElement = container.querySelector(".error-message");
    }

    // Strategy 2: Look in parent elements
    if (!errorElement) {
      let parent = input.parentElement;
      while (parent && !errorElement) {
        errorElement = parent.querySelector(".error-message");
        parent = parent.parentElement;
      }
    }

    // Strategy 3: Look for any error message in the form
    if (!errorElement) {
      errorElement = form.querySelector(".error-message");
    }

    console.log(`Finding error element for ${input.name}:`, errorElement);
    return errorElement;
  }

  function validateField(fieldName, value, input) {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true };
    const label = fieldLabels[fieldName] || fieldName;

    // Check if field has 'required' attribute in HTML
    const isRequiredInHTML = input && input.hasAttribute("required");

    // If field doesn't have 'required' attribute, don't validate required rules
    if (input && !isRequiredInHTML && rules.required) {
      // Skip required validation if field doesn't have required attribute
      // Only validate other rules (pattern, minLength, etc.)
      if (value && value.trim()) {
        // Only validate pattern/minLength if there's a value
        if (rules.minLength && value.trim().length < rules.minLength)
          return { isValid: false, message: rules.message };
        if (rules.pattern && !rules.pattern.test(value.trim()))
          return { isValid: false, message: rules.message };
      }
      return { isValid: true };
    }

    if (input && input.type === "file") {
      if (rules.required && isRequiredInHTML && input.files.length === 0) {
        return { isValid: false, message: rules.message };
      }
      return { isValid: true };
    }

    // Special handling for phone fields with intlTelInput
    if (fieldName === "phone" && input) {
      const iti = window.intlTelInputGlobals?.getInstance(input);
      if (iti) {
        const isValid = iti.isValidNumber();
        if (isRequiredInHTML && (!input.value.trim() || !isValid)) {
          return { isValid: false, message: rules.message };
        }
        return { isValid: true };
      } else {
        // Fallback for when intlTelInput is not initialized
        if (isRequiredInHTML && (!value || !value.trim())) {
          return { isValid: false, message: rules.message };
        }
      }
    }

    if (rules.required && isRequiredInHTML && (!value || !value.trim()))
      return { isValid: false, message: `${label} is required` };
    if (rules.minLength && value && value.trim().length < rules.minLength)
      return { isValid: false, message: rules.message };
    if (rules.pattern && value && !rules.pattern.test(value.trim()))
      return { isValid: false, message: rules.message };

    return { isValid: true };
  }

  function showError(input, message) {
    if (!input) return;

    if (input.type === "file") {
      // Try to find the wrapper - could be different structures
      let wrapper = findFileWrapper(input);
      if (!wrapper) {
        // Fallback: look for parent div with border class
        wrapper = input.parentElement;
      }

      if (wrapper) {
        wrapper.classList.remove(
          "border-dashed",
          "border-black",
          "focus:border-primary-900",
        );
        wrapper.classList.add(
          "border",
          "border-red-500",
          "shadow-[0_0_10px_0_#D21C1C26]",
        );
        wrapper.style.borderStyle = "solid";
      }

      // Use the specialized helper function for file inputs
      const errorElement = findFileErrorElement(input);

      if (errorElement) {
        const errorText = errorElement.querySelector(".error-text");
        if (errorText) {
          errorText.textContent = message;
        }
        errorElement.classList.remove("opacity-0", "invisible");
        errorElement.classList.add("opacity-100");
      }
      return;
    }

    input.classList.add("border-red-500", "shadow-[0_0_10px_0_#D21C1C26]");

    // Look for error message in different possible locations
    let errorElement = input.parentNode?.querySelector(".error-message");
    if (!errorElement) {
      errorElement = input.parentElement?.querySelector(".error-message");
    }
    if (!errorElement) {
      errorElement = input
        .closest(".relative, .form-group")
        ?.querySelector(".error-message");
    }
    if (!errorElement) {
      errorElement = input.closest("div")?.querySelector(".error-message");
    }

    if (errorElement) {
      const errorText = errorElement.querySelector(".error-text");
      if (errorText) {
        errorText.textContent = message;
      }
      errorElement.classList.remove("opacity-0", "invisible");
      errorElement.classList.add("opacity-100");
    }
  }

  function clearError(input) {
    if (!input) return;

    if (input.type === "file") {
      // Try to find the wrapper - could be different structures
      let wrapper = findFileWrapper(input);
      if (!wrapper) {
        // Fallback: look for parent div with border class
        wrapper = input.parentElement;
      }

      if (wrapper) {
        wrapper.classList.remove(
          "border-red-500",
          "shadow-[0_0_10px_0_#D21C1C26]",
        );
        wrapper.classList.add(
          "border",
          "border-black",
          "focus:border-primary-900",
        );
        wrapper.style.borderStyle = "solid";
      }

      // Use the specialized helper function for file inputs
      const errorElement = findFileErrorElement(input);

      if (errorElement) {
        const errorText = errorElement.querySelector(".error-text");
        if (errorText) {
          errorText.textContent = "";
        }
        errorElement.classList.add("opacity-0", "invisible");
        errorElement.classList.remove("opacity-100");
      }

      if (input.files.length === 0 && fileLabel) {
        fileLabel.textContent = "No File Choosen";
      }
      return;
    }

    input.classList.remove("border-red-500", "shadow-[0_0_10px_0_#D21C1C26]");

    // Look for error message in different possible locations
    let errorElement = input.parentNode?.querySelector(".error-message");
    if (!errorElement) {
      errorElement = input.parentElement?.querySelector(".error-message");
    }
    if (!errorElement) {
      errorElement = input
        .closest(".relative, .form-group")
        ?.querySelector(".error-message");
    }
    if (!errorElement) {
      errorElement = input.closest("div")?.querySelector(".error-message");
    }

    if (errorElement) {
      const errorText = errorElement.querySelector(".error-text");
      if (errorText) {
        errorText.textContent = "";
      }
      errorElement.classList.add("opacity-0", "invisible");
      errorElement.classList.remove("opacity-100");
    }
  }

  // Validate on blur / input (text fields)
  form.querySelectorAll("input:not([type=file]), textarea").forEach((input) => {
    input.addEventListener("blur", () => {
      // Only validate if field is required or has a value
      const isRequiredInHTML = input.hasAttribute("required");
      const hasValue = input.value && input.value.trim() !== "";

      if (isRequiredInHTML || hasValue) {
        const validation = validateField(input.name, input.value, input);
        if (!validation.isValid) showError(input, validation.message);
        else clearError(input);
      } else {
        clearError(input);
      }
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("border-red-500")) {
        const validation = validateField(input.name, input.value, input);
        if (validation.isValid) clearError(input);
      }
    });
  });

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let isFormValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) {
        // Skip validation for fields that don't exist in this form
        return;
      }

      // Only validate fields that are required or have values
      const isRequiredInHTML = input.hasAttribute("required");
      const value = input.type === "file" ? undefined : data[fieldName] || "";

      // Skip validation if field is not required and is empty
      if (!isRequiredInHTML && (!value || value.trim() === "")) {
        return;
      }

      const validation = validateField(fieldName, value, input);
      if (!validation.isValid) {
        showError(input, validation.message);
        isFormValid = false;
      } else {
        clearError(input);
      }
    });

    if (!isFormValid) return;

    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50");
    await new Promise((r) => setTimeout(r, 1000));

    if (successMessage) {
      successMessage.classList.add("translate-x-0", "opacity-100", "flex");
      successMessage.classList.remove("translate-x-[400px]");
      setTimeout(() => {
        successMessage.classList.add("translate-x-[400px]", "opacity-0");
        successMessage.classList.remove("translate-x-0", "opacity-100", "flex");
      }, 3500);
    }

    form.reset();
    form.querySelectorAll(".error-message").forEach((el) => {
      el.classList.add("opacity-0", "invisible");
      el.classList.remove("opacity-100");
      const span = el.querySelector(".error-text");
      if (span) span.textContent = "";
    });

    if (fileInput) clearError(fileInput);
    if (fileLabel) fileLabel.textContent = "Drop files here or Select Files";
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-50");
  });
  // Initialize intlTelInput for all phone inputs (guard against double-init)
  const phoneInputs = document.querySelectorAll("#phone");
  phoneInputs.forEach((phoneInput) => {
    if (!phoneInput || !window.intlTelInput) return;

    // Skip if already wrapped/initialized to avoid duplicate flag UI
    const alreadyWrapped = !!phoneInput.closest(".iti");
    const alreadyInstance = !!(
      window.intlTelInputGlobals?.getInstance &&
      window.intlTelInputGlobals.getInstance(phoneInput)
    );
    if (
      alreadyWrapped ||
      alreadyInstance ||
      phoneInput.dataset.itiInited === "1"
    )
      return;

    try {
      window.intlTelInput(phoneInput, {
        initialCountry: "in", // Use India as default instead of auto
        autoHideDialCode: true,
        nationalMode: false,
        placeholderNumberType: "NONE",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.1/js/utils.min.js",
      });
      phoneInput.value = "";
      phoneInput.dataset.itiInited = "1";
    } catch (err) {
      // fail silently if intlTelInput throws
    }
  });

  // Limit phone number to 10 digits (excluding country code) for all phone inputs
  phoneInputs.forEach((phoneInput) => {
    phoneInput.addEventListener("input", (e) => {
      const iti = window.intlTelInputGlobals.getInstance(phoneInput);
      if (iti) {
        const countryData = iti.getSelectedCountryData();
        const dialCode = countryData.dialCode || "";

        // Get the full value with country code
        let fullValue = e.target.value.replace(/\D/g, "");

        // If the number starts with the country code, separate it
        if (dialCode && fullValue.startsWith(dialCode)) {
          const numberWithoutCode = fullValue.slice(dialCode.length);

          // Limit the actual phone number to 10 digits
          if (numberWithoutCode.length > 10) {
            const limitedNumber = numberWithoutCode.slice(0, 10);
            e.target.value = dialCode + limitedNumber;
          }
        } else {
          // If no country code detected, just limit to 10 digits
          if (fullValue.length > 10) {
            e.target.value = fullValue.slice(0, 10);
          }
        }
      }
    });
  });
});
// number counting for coming soon page
document.addEventListener("DOMContentLoaded", () => {
  // Check if countdown elements exist
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    // Elements not found → exit without error
    return;
  }

  // Read initial values from HTML
  const daysInit = parseInt(daysEl.textContent, 10);
  const hoursInit = parseInt(hoursEl.textContent, 10);
  const minutesInit = parseInt(minutesEl.textContent, 10);
  const secondsInit = parseInt(secondsEl.textContent, 10);

  // Set target date based on HTML values
  const now = new Date().getTime();
  const targetDate =
    now +
    daysInit * 24 * 60 * 60 * 1000 +
    hoursInit * 60 * 60 * 1000 +
    minutesInit * 60 * 1000 +
    secondsInit * 1000;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  // Start updating
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// custom dropdown for quotation page
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".custom-dropdown").forEach((d) => {
    const sel = d.querySelector(".dropdown-selected");
    const opts = d.querySelector(".dropdown-options");
    const arr = d.querySelector(".dropdown-arrow");
    const txt = d.querySelector(".dropdown-text");
    const errBox = d.parentElement.querySelector(".error-message");
    const errText = errBox?.querySelector(".error-text");

    // --- Toggle dropdown ---
    sel.addEventListener("click", () => {
      document.querySelectorAll(".custom-dropdown").forEach((o) => {
        if (o !== d) {
          o.querySelector(".dropdown-options").classList.remove("show");
          o.querySelector(".dropdown-arrow").classList.remove("open");
          o.querySelector(".dropdown-selected").classList.remove("active");
        }
      });
      opts.classList.toggle("show");
      arr.classList.toggle("open");
      sel.classList.toggle("active");
    });

    // --- Option select ---
    d.querySelectorAll(".dropdown-option").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        d.querySelectorAll(".dropdown-option").forEach((o) =>
          o.classList.remove("selected"),
        );
        opt.classList.add("selected");
        txt.textContent = opt.textContent;

        // ✅ Make selected text black
        txt.classList.add("text-black");
        txt.classList.remove("text-[#00000080]");
        sel.style.color = "#000000";
        sel.dataset.value = opt.dataset.value;

        // ✅ Remove red border + error when valid
        sel.classList.remove("border-red-500", "shadow-[0_0_10px_0_#D21C1C26]");
        sel.classList.add("border-black", "focus:border-primary-900");
        if (errBox) {
          errBox.classList.add("opacity-0", "invisible");
          errBox.classList.remove("opacity-100");
          errText.textContent = "";
        }

        opts.classList.remove("show");
        arr.classList.remove("open");
        sel.classList.remove("active");
      });
    });
  });

  // --- Close when clicking outside ---
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      document
        .querySelectorAll(".dropdown-options")
        .forEach((o) => o.classList.remove("show"));
      document
        .querySelectorAll(".dropdown-arrow")
        .forEach((a) => a.classList.remove("open"));
      document
        .querySelectorAll(".dropdown-selected")
        .forEach((s) => s.classList.remove("active"));
    }
  });

  // --- Validation on submit ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      const dropdowns = form.querySelectorAll(".custom-dropdown");
      dropdowns.forEach((d) => {
        const sel = d.querySelector(".dropdown-selected");
        const errBox = d.parentElement.querySelector(".error-message");
        const errText = errBox?.querySelector(".error-text");

        if (sel && sel.hasAttribute("required")) {
          const val = sel.dataset.value || "";
          if (!val || val.trim() === "") {
            e.preventDefault();

            // ✅ Add red border + glow when showing error
            sel.classList.remove("border-black", "focus:border-primary-900");
            sel.classList.add(
              "border-red-500",
              "shadow-[0_0_10px_0_#D21C1C26]",
            );

            // ✅ Show error message
            if (errBox) {
              errText.textContent = "Please select your experience";
              errBox.classList.remove("opacity-0", "invisible");
              errBox.classList.add("opacity-100");
            }
          }
        }
      });
    });
  }
});

// Helper to get the current sticky header offset
function getHeaderOffset() {
  const headerEl = document.querySelector("header");
  if (!headerEl) return 100;
  const rect = headerEl.getBoundingClientRect();
  // Add a small spacing to avoid touching the header
  return Math.max(0, Math.round(rect.height)) + 16;
}

// Scroll to target when sidebar item clicked
document.querySelectorAll("[data-target]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("data-target");
    const section = document.getElementById(targetId);
    if (section) {
      e.preventDefault();
      const yOffset = -getHeaderOffset();
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// Highlight active section when scrolling
const sections = document.querySelectorAll("h3[id], h4[id], p[id]");
const navLinks = document.querySelectorAll("[data-target]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const threshold = getHeaderOffset() + 8;
    const top = section.getBoundingClientRect().top;
    if (top <= threshold) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === current) {
      link.classList.add("active");
    }
  });
});

// insights
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".insight [data-target]");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Scroll to the section with header offset
        const yOffset = -getHeaderOffset();
        const y =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });

        // Remove .active from all
        document.querySelectorAll(".insight .active").forEach((el) => {
          el.classList.remove("active");
        });

        // Add .active to clicked
        item.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Check if .count-up elements exist before doing anything
  const countUpElements = document.querySelectorAll(".count-up");
  if (!countUpElements.length) return; // Exit safely if not found

  function animateValue(obj, start, end, duration, suffix = "") {
    if (end < start) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      obj.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Intersection Observer (only runs when visible)
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const start = parseInt(el.getAttribute("data-start")) || 0;
          const end = parseInt(el.getAttribute("data-end")) || 0;
          const duration = parseInt(el.getAttribute("data-duration")) || 2000;
          const suffix = el.getAttribute("data-suffix") || "";

          animateValue(el, start, end, duration, suffix);
          obs.unobserve(el); // stop observing after first animation
        }
      });
    },
    { threshold: 0.6 },
  );

  // Attach observer to all count-up elements
  countUpElements.forEach((el) => observer.observe(el));
});
