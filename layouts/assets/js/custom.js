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
          //$(this).toggleClass("active");
        },
      );

      $(document).on("click", ".mobile-toggle", function () {
        $("#navbar-default").toggleClass("open");
        $(this).toggleClass("active");
      });

      /* Mobile menu dropdown*/
      if ($(window).width() <= 991) {
        $(".main-menu ul > li").each(function (i) {
          if ($(this).has(".dropdown-menu").length) {
            $(this).find(".dropdown-menu").addClass("sub-menu");
            $(this).find("> a").after('<span class="caret-arrow"></span>');
            // $(this).find("> .sub-menu").css("display", "none");
          }
        });
        $(".main-menu ul li .caret-arrow").click(function () {
          var catSubUl = $(this).next(".sub-menu");
          var catSubli = $(this).closest("li");
          if (catSubUl.is(":hidden")) {
            //$("#window > ul > li .sub-menu").slideUp();
            catSubUl.slideDown();
            //$('.caret').removeClass('active');
            $(this).addClass("sub-active");
            catSubli.addClass("sub-active");
          } else {
            catSubUl.slideUp();
            $(this).removeClass("sub-active");
            catSubli.removeClass("sub-active");
          }
        });
      }

      // =======================
      // Navbar Dropdown Start
      // =======================
      document.addEventListener("DOMContentLoaded", () => {
        const navRight = document.querySelector(".nav-right");
        const dropdowns = document.querySelectorAll(".dropdown");

        // Dropdown code from your first block
        function navRightSetWhite() {
          navRight.classList.add("bg-white", "text-black");
          navRight.querySelectorAll(".navbar > li > a").forEach((a) => {
            a.classList.add("text-black");
            a.classList.remove("text-white");
          });
        }

        function navRightRemoveWhite() {
          navRight.classList.remove("bg-white", "text-black");
          navRight.querySelectorAll(".navbar > li > a").forEach((a) => {
            a.classList.remove("text-black");
            a.classList.add("text-white");
          });
        }

        let dropdownOpenCount = 0;

        dropdowns.forEach((dropdown) => {
          const toggle = dropdown.querySelector(".dropdown-toggle");
          const menu =
            dropdown.querySelector(".dropdown-menu") ||
            dropdown.querySelector("ul");

          if (!toggle || !menu) return;

          function openDropdown() {
            if (menu.classList.contains("hidden")) {
              menu.classList.remove("hidden");
              dropdownOpenCount++;
              navRightSetWhite();
            }
          }

          function closeDropdown() {
            if (!menu.classList.contains("hidden")) {
              menu.classList.add("hidden");
              dropdownOpenCount = Math.max(0, dropdownOpenCount - 1);
              if (dropdownOpenCount === 0 && !navRight.matches(":hover")) {
                navRightRemoveWhite();
              }
            }
          }

          toggle.addEventListener("click", (e) => {
            e.preventDefault();
            if (menu.classList.contains("hidden")) {
              dropdowns.forEach((d) => {
                if (d !== dropdown) {
                  const m =
                    d.querySelector(".dropdown-menu") || d.querySelector("ul");
                  if (m && !m.classList.contains("hidden")) {
                    m.classList.add("hidden");
                    dropdownOpenCount = Math.max(0, dropdownOpenCount - 1);
                  }
                }
              });
              openDropdown();
            } else {
              closeDropdown();
            }
          });

          dropdown.addEventListener("mouseenter", () => {
            if (window.innerWidth >= 768) openDropdown();
          });

          dropdown.addEventListener("mouseleave", () => {
            if (window.innerWidth >= 768) closeDropdown();
          });
        });

        navRight.addEventListener("mouseleave", () => {
          if (dropdownOpenCount === 0) navRightRemoveWhite();
        });

        navRight.addEventListener("mouseenter", () => {
          if (dropdownOpenCount === 0) navRightRemoveWhite();
        });

        // --- Your Search and other code goes here ---

        const searchButton = document.getElementById("searchButton");
        const searchBox = document.getElementById("searchBox");
        const searchInput = document.getElementById("searchInput");
        const closeBtnMobile = document.getElementById("closeSearch");
        const closeBtnDesktop = document.getElementById("searchCloseInside");
        const mobileMenuToggle = document.getElementById("menuToggle");
        const navbarDefault = document.getElementById("navbar-default");

        let isSearchOpen = false;

        function openSearch() {
          isSearchOpen = true;
          navRight.classList.add("md:relative");

          if (mobileMenuToggle?.classList.contains("open")) {
            mobileMenuToggle.classList.remove("open", "active");
            navbarDefault.classList.remove("block", "md:block");
            navbarDefault.classList.add("hidden");
          }

          if (window.innerWidth >= 768) {
            searchBox.classList.remove("md:translate-x-0");
            searchBox.classList.add("md:translate-x-full");
            searchBox.classList.remove("max-h-screen", "max-h-0");
          } else {
            searchBox.classList.remove("translate-y-0");
            searchBox.classList.add("-translate-y-1/2");
            searchBox.classList.remove("max-h-screen");
            searchBox.classList.add("max-h-0");

            closeBtnMobile.classList.remove("hidden");
            searchButton.classList.add("hidden");
          }

          searchBox.classList.remove("hidden");
          searchBox.classList.add("flex");

          void searchBox.offsetWidth; // force reflow

          if (window.innerWidth >= 768) {
            searchBox.classList.remove("md:translate-x-full");
            searchBox.classList.add("md:translate-x-0");
          } else {
            searchBox.classList.remove("-translate-y-1/2");
            searchBox.classList.add("translate-y-0");
            searchBox.classList.remove("max-h-0");
            searchBox.classList.add("max-h-screen");
          }

          setTimeout(() => searchInput.focus(), 300);
          updateAllSVGFills();
        }

        function closeSearch() {
          isSearchOpen = false;
          navRight.classList.remove("md:relative");

          searchBox.classList.remove("hidden");
          searchBox.classList.add("flex");

          if (window.innerWidth >= 768) {
            searchBox.classList.remove("md:translate-x-0");
            searchBox.classList.add("md:translate-x-full");
          } else {
            searchBox.classList.remove("translate-y-0");
            searchBox.classList.add("-translate-y-1/2");
            searchBox.classList.remove("max-h-screen");
            searchBox.classList.add("max-h-0");

            closeBtnMobile.classList.add("hidden");
            searchButton.classList.remove("hidden");
          }

          searchInput.value = "";

          setTimeout(() => {
            if (!isSearchOpen) {
              searchBox.classList.remove("flex");
              searchBox.classList.add("hidden");
            }
          }, 300);

          updateAllSVGFills();
        }

        function updateAllSVGFills() {
          const navRightEl = document.querySelector(".nav-right");
          const searchSVG = document.querySelector("#searchButton svg");
          const menuToggleSVG = document.querySelector("#menuToggle svg");
          const scrolled = window.scrollY > 0;
          const menuOpen = mobileMenuToggle?.classList.contains("open");

          if (
            navRightEl.classList.contains("bg-white") ||
            scrolled ||
            isSearchOpen ||
            menuOpen
          ) {
            if (searchSVG) searchSVG.style.fill = "black";
            if (menuToggleSVG) menuToggleSVG.style.fill = "black";
          } else {
            if (searchSVG) searchSVG.style.fill = "white";
            if (menuToggleSVG) menuToggleSVG.style.fill = "white";
          }
        }

        // Then add all your jQuery parts here...

        // For example:
        $(".dropdown")
          .on("mouseenter", function () {
            $(".nav-right").addClass("bg-white text-black");
            $(".navbar > li > a")
              .addClass("text-black")
              .removeClass("text-white");
            updateAllSVGFills();
          })
          .on("mouseleave", function () {
            if ($(window).scrollTop() === 0) {
              $(".nav-right").removeClass("bg-white text-black");
              $(".navbar > li > a")
                .removeClass("text-black")
                .addClass("text-white");
            }
            updateAllSVGFills();
          });

        // More of your event listeners, etc...

        // At the end, do your event listeners for scroll, clicks, resize etc

        window.addEventListener("scroll", () => {
          if (window.scrollY > 0) {
            document.querySelector(".header").classList.add("sticky-header");
          } else {
            document.querySelector(".header").classList.remove("sticky-header");
          }
          updateAllSVGFills();
        });

        // Initial fill update
        updateAllSVGFills();

        if (searchButton) searchButton.addEventListener("click", openSearch);
        if (closeBtnMobile)
          closeBtnMobile.addEventListener("click", closeSearch);
        if (closeBtnDesktop)
          closeBtnDesktop.addEventListener("click", closeSearch);

        if (mobileMenuToggle && navbarDefault) {
          mobileMenuToggle.addEventListener("click", () => {
            const isMenuOpen = !mobileMenuToggle.classList.contains("open");

            if (isMenuOpen) {
              navbarDefault.classList.remove("hidden", "md:block");
              navbarDefault.classList.add("block");

              if (isSearchOpen) closeSearch();
            } else {
              navbarDefault.classList.remove("block");
              navbarDefault.classList.add("hidden");
            }

            mobileMenuToggle.classList.toggle("open");

            updateAllSVGFills();
          });
        }

        /* Search Popup toggle via jQuery */
        $(document).on("click", ".search-icon a, .close-search", function () {
          $("body").toggleClass("search-active");
        });

        /* Smooth scroll menu click */
        $(".scroll-menu").on("click", "a", function (event) {
          event.preventDefault();
          const full_url = this.href;
          const parts = full_url.split("#");
          const trgt = parts[1];
          const target_offset = $("#" + trgt).offset();
          const target_top = target_offset.top;
          $("html, body").animate({ scrollTop: target_top - 100 }, 0);
        });

        // Optional: Close dropdown if clicking outside on mobile (jQuery)
        $(document).on("click touchstart", function (e) {
          if (
            !$(e.target).closest(".dropdown").length &&
            window.innerWidth < 768
          ) {
            $(".dropdown-menu").addClass("hidden");
            $(".dropdown-toggle svg").css("transform", "");
            $(".nav-right").removeClass("bg-white text-black");
            $(".navbar > li > a")
              .removeClass("text-black")
              .addClass("text-white");
            updateAllSVGFills();
          }
        });

        // Toggle nav-right background color on main menu open/close on small screens
        $("#menuToggle").on("click", function () {
          if (window.innerWidth < 768) {
            setTimeout(() => {
              if ($("#navbar-default").is(":visible")) {
                $(".nav-right").addClass("bg-white text-black");
              } else {
                $(".nav-right").removeClass("bg-white text-black");
              }
            }, 250);
          }
        });
      });

      if ($("#container").length > 0) {
        $("#container").imagesLoaded({
          background: true,
        });
      }

      /*https://codepen.io/digvijayad/pen/RegBxg*/
      if ($(".repeater").length > 0) {
        $(".repeater").repeater({
          initEmpty: false,
          defaultValues: {
            "text-input": "foo",
          },
          show: function () {
            $(this).slideDown();
          },
          hide: function (deleteElement) {
            if (confirm("Are you sure you want to delete this element?")) {
              $(this).slideUp(deleteElement);
            }
          },
          ready: function (setIndexes) {},
          isFirstItemUndeletable: true,
        });
      }
    },

    /*======================================
     02. Slider Open JS
    ========================================*/
    slider_open: function () {
      /* Testimonials slider */
      var swiper = new Swiper(".testimonials-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: ".testimonials-slider .swiper-button-next",
          prevEl: ".testimonials-slider .swiper-button-prev",
        },
      });

      /* Our Work slider */
      var swiper = new Swiper(".our-work-slider .mySwiper", {
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
            slidesPerView: 2.3,
            spaceBetween: 50,
          },
          1170: {
            slidesPerView: 2.4,
            spaceBetween: 60,
          },
          1380: {
            slidesPerView: 2.5,
            spaceBetween: 70,
          },
          1752: {
            slidesPerView: 2.73,
            spaceBetween: 85,
          },
        },
      });

      // /* Our Projects slider */
      var swiper = new Swiper(".our-projects-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".our-projects-slider .swiper-button-next",
          prevEl: ".our-projects-slider .swiper-button-prev",
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
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

      /* Our Blog Grid slider */
      var swiper = new Swiper(".blog-grid-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".blog-grid-slider .swiper-button-next",
          prevEl: ".blog-grid-slider .swiper-button-prev",
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
            spaceBetween: 40,
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
    },

    /*======================================
     03. Popup Open JS
    ========================================*/
    popup_open: function () {},

    /*======================================
     04. Preloader JS
    ========================================*/
    Preloader_js: function () {
      //After 2s preloader is fadeOut
      $(".preloader").delay(2000).fadeOut("slow");
      setTimeout(function () {
        //After 2s, the no-scroll class of the body will be removed
        $("body").removeClass("no-scroll");
      }, 2000); //Here you can change preloader time
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

// const hoverImage = document.getElementById("hoverImage");

// document.querySelectorAll(".group").forEach((el) => {
//   el.addEventListener("mouseenter", () => {
//     const imgUrl = el.getAttribute("data-img");
//     hoverImage.src = imgUrl;
//     hoverImage.classList.add("opacity-100");
//   });

//   el.addEventListener("mouseleave", () => {
//     hoverImage.classList.remove("opacity-100");
//   });

//   el.addEventListener("mousemove", (e) => {
//     const section = el.closest("section");
//     const rect = section.getBoundingClientRect();
//     hoverImage.style.left = `${e.clientX - rect.left + 10}px`;
//     hoverImage.style.top = `${e.clientY - rect.top + 10}px`;
//   });
// });

const hoverImage = document.getElementById("hoverImage");

document.querySelectorAll(".faqs-list").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    const imgUrl = el.getAttribute("data-img");
    hoverImage.src = imgUrl;
    hoverImage.classList.add("opacity-100");
  });

  el.addEventListener("mouseleave", () => {
    hoverImage.classList.remove("opacity-100");
  });

  el.addEventListener("mousemove", (e) => {
    const section = el.closest("section");
    const rect = section.getBoundingClientRect();
    hoverImage.style.left = `${e.clientX - rect.left + 10}px`;
    hoverImage.style.top = `${e.clientY - rect.top + 10}px`;
  });
});

const items = ["» 1 asdasd a", "» 2 asdasd as", "» 3 asdasd as", "» asdasd as"];

const marquee = document.getElementById("marquee");

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
