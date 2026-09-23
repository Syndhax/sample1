/**
 * SAMPLE CRAFT BURGERS - MODERN INTERACTIVE JAVASCRIPT ENGINE
 * Google-tier UX, fluid micro-interactions, alive burger customizer lab,
 * cart drawer, and table reservation management.
 */

// ==========================================
// 1. DATA REPOSITORY: SIGNATURE BURGERS
// ==========================================
const BURGER_COLLECTION = [
  {
    id: "grand-truffle",
    name: "The Grand Truffle Smash",
    category: "wagyu",
    price: 18.50,
    calories: 890,
    heat: 0,
    tags: ["Chef's Signature", "28-Day Dry-Aged", "Black Truffle"],
    desc: "Double smashed American Wagyu beef, melted French gruyère, charred shallots, black winter truffle aioli, on toasted gold brioche.",
    specs: {
      cut: "Snake River Wagyu & Brisket",
      bun: "Yukon Potato Brioche",
      sauce: "French Périgord Truffle Emulsion"
    },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "classic-american",
    name: "The 1928 Classic Smash",
    category: "smash",
    price: 14.50,
    calories: 780,
    heat: 1,
    tags: ["Best Seller", "Heritage Angus", "Double Crust"],
    desc: "Twin heritage Angus beef patties pressed lace-thin, double melted 18-month Vermont cheddar, house bread-and-butter pickles, and SAMPLE secret sauce.",
    specs: {
      cut: "80/20 Nebraska Angus Chuck",
      bun: "Slow-Proofed Brioche",
      sauce: "Sample Secret Relish Mayo"
    },
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bourbon-bacon-jam",
    name: "Smoked Bourbon & Bacon",
    category: "smash",
    price: 17.00,
    calories: 920,
    heat: 1,
    tags: ["Wood-Fired", "Texas Bourbon", "Smoked Gouda"],
    desc: "Oak-seared prime beef, thick applewood bacon, slow-simmered Kentucky bourbon onion jam, smoked Wisconsin gouda, and roasted garlic aioli.",
    specs: {
      cut: "Dry-Aged Chuck & Short Rib",
      bun: "Toasted Butter Bun",
      sauce: "Bourbon Brown Sugar Reduction"
    },
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nashville-fire",
    name: "Nashville Diablo Bird",
    category: "spicy",
    price: 16.00,
    calories: 840,
    heat: 3,
    tags: ["Fiery Heat", "Crispy Free-Range", "Ghost Honey"],
    desc: "Buttermilk-brined crispy chicken thigh dredged in ghost pepper cayenne oil, cool vinegar slaw, torched habanero jack, and spicy dill pickles.",
    specs: {
      cut: "All-Natural Amish Chicken",
      bun: "Brioche Bun",
      sauce: "Smoked Ghost Pepper Honey"
    },
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "green-chile-wagyu",
    name: "Hatch Green Chile Wagyu",
    category: "spicy",
    price: 19.00,
    calories: 870,
    heat: 2,
    tags: ["Fire-Roasted", "New Mexico Chiles", "Wagyu Cut"],
    desc: "Charred Hatch New Mexico green chiles, smashed American Wagyu, pepper jack crema, crispy tortilla threads, and smoked paprika drizzle.",
    specs: {
      cut: "Single American Wagyu 7oz",
      bun: "Toasted Potato Bun",
      sauce: "Roasted Hatch Pepper Crema"
    },
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "forest-mushroom-swiss",
    name: "Wild Forest & Aged Swiss",
    category: "wagyu",
    price: 17.50,
    calories: 810,
    heat: 0,
    tags: ["Earthy Umami", "Black Morel", "Aged Emmental"],
    desc: "Pan-roasted morel and cremini mushrooms in brown butter sherry, aged Emmental Swiss cheese, roasted shallot thyme glaze, and dry-aged beef.",
    specs: {
      cut: "Dry-Aged Angus Blend",
      bun: "Sesame Brioche",
      sauce: "Sherry Thyme Pan Glaze"
    },
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "earth-power-smash",
    name: "The Earth & Hearth Smash",
    category: "plant",
    price: 16.50,
    calories: 620,
    heat: 0,
    tags: ["100% Plant-Based", "Chef Created", "Dairy-Free Option"],
    desc: "House-crafted smoked black bean, roasted portobello & walnut smash patty, dairy-free sharp cheddar, wild arugula, heirloom tomato, and vegan avocado aioli.",
    specs: {
      cut: "House Mushroom & Walnut Blend",
      bun: "Spelt Sourdough Bun",
      sauce: "Smoked Avocado & Lime Emulsion"
    },
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bbq-smokehouse-melt",
    name: "White Oak Smokehouse",
    category: "smash",
    price: 17.50,
    calories: 950,
    heat: 1,
    tags: ["Pitmaster Smoked", "Crispy Onions", "Texas Style"],
    desc: "14-hour hickory-smoked beef brisket layered over a seared smash patty, tangy Carolina gold BBQ glaze, beer-battered onion strings, and sharp cheddar.",
    specs: {
      cut: "Hickory Brisket & Smash Chuck",
      bun: "Texas Brioche Toast",
      sauce: "Tangy Carolina Mustard BBQ"
    },
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80"
  }
];

// ==========================================
// 2. APPLICATION STATE MANAGEMENT
// ==========================================
const State = {
  cart: [],
  activeCategory: "all",
  // Interactive Burger Lab State
  lab: {
    bun: { id: "brioche", name: "Golden Brioche", price: 0, cal: 210 },
    patty: { id: "angus-double", name: "Double Dry-Aged Angus", price: 9.00, cal: 440 },
    cheese: { id: "cheddar", name: "Vermont Cheddar", price: 2.00, cal: 110 },
    toppings: [
      { id: "bacon", name: "Maple Bacon", price: 2.50, cal: 120, heat: 0, crunch: 25 },
      { id: "onions", name: "Caramelized Onions", price: 1.00, cal: 45, heat: 0, crunch: 10 }
    ],
    sauce: { id: "sample-sauce", name: "Sample Heritage Aioli", price: 1.00, cal: 85, heat: 10 }
  },
  location: "nyc"
};

// ==========================================
// 3. INITIALIZATION & DOM CACHE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initHeroSlider();
  initSpotlightEffect();
  initMenu();
  initBurgerLab();
  initLocationSwitch();
  initDialogs();
  initCart();
  initMobileMenu();
  initImageFallbacks();

  // Set minimum date for reservation picker to today
  const resDateInput = document.getElementById("resDate");
  if (resDateInput) {
    const today = new Date().toISOString().split("T")[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }
});

// Fallback SVG in case of offline browsing or network restriction
function initImageFallbacks() {
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%231a1e28"/><circle cx="400" cy="300" r="160" fill="%23242b3a"/><path d="M260 270 Q400 170 540 270 Z" fill="%23e38d38"/><rect x="250" y="280" width="300" height="24" rx="10" fill="%2316a34a"/><rect x="240" y="310" width="320" height="35" rx="12" fill="%23451a03"/><rect x="245" y="350" width="310" height="18" rx="8" fill="%23f59e0b"/><rect x="260" y="375" width="280" height="30" rx="12" fill="%23c46c19"/><text x="400" y="470" font-family="sans-serif" font-size="22" font-weight="700" fill="%23f59e0b" text-anchor="middle">SAMPLE CRAFT BURGER</text></svg>`;

  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG" && e.target.src !== fallbackSvg) {
      e.target.src = fallbackSvg;
    }
  }, true);
}

// ==========================================
// 4. HEADER & NAVIGATION
// ==========================================
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mobileNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close on nav link click
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const mobileReserveBtn = document.getElementById("mobileReserveBtn");
  if (mobileReserveBtn) {
    mobileReserveBtn.addEventListener("click", () => {
      nav.classList.remove("open");
      openReservationModal();
    });
  }
}

// ==========================================
// 5. CINEMATIC HERO BACKGROUND SLIDESHOW
// ==========================================
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator-bar");
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    indicators.forEach(ind => ind.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add("active");
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, 4500);
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Indicator click events
  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      const idx = parseInt(indicator.dataset.index, 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  // Touch swipe support for mobile
  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          showSlide(currentSlide + 1); // swipe left
        } else {
          showSlide(currentSlide - 1); // swipe right
        }
        startAutoplay();
      }
    }, { passive: true });
  }

  startAutoplay();
}

function initSpotlightEffect() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// ==========================================
// 6. MENU RENDERING & CAROUSEL ENGINE
// ==========================================
function initMenu() {
  initCarouselControls();
  renderMenuItems(State.activeCategory);

  const filterTabs = document.querySelectorAll(".cat-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const cat = tab.getAttribute("data-category");
      State.activeCategory = cat;
      renderMenuItems(cat);

      const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
      if (track) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      }
    });
  });
}

function initCarouselControls() {
  const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
  const prevBtn = document.getElementById("carouselPrevBtn");
  const nextBtn = document.getElementById("carouselNextBtn");
  if (!track) return;

  function getScrollStep() {
    const card = track.querySelector(".burger-card");
    if (!card) return track.clientWidth * 0.8;
    return card.offsetWidth + 24;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    });
  }

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      updateActiveCarouselDot();
      updateCarouselNavState();
    });
  }, { passive: true });
}

function renderCarouselDots(count) {
  const dotsContainer = document.getElementById("carouselDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";

  if (count <= 1) {
    dotsContainer.style.display = "none";
    return;
  }
  dotsContainer.style.display = "flex";

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Burger slide ${i + 1}`);
    dot.dataset.index = i;
    dot.addEventListener("click", () => {
      const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
      if (!track) return;
      const cards = track.querySelectorAll(".burger-card");
      if (cards[i]) {
        track.scrollTo({
          left: cards[i].offsetLeft - track.offsetLeft,
          behavior: "smooth"
        });
      }
    });
    dotsContainer.appendChild(dot);
  }
}

function updateActiveCarouselDot() {
  const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
  const dots = document.querySelectorAll(".carousel-dot");
  if (!track || dots.length === 0) return;

  const cards = track.querySelectorAll(".burger-card");
  if (cards.length === 0) return;

  const scrollLeft = track.scrollLeft;
  let activeIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, idx) => {
    const cardPos = card.offsetLeft - track.offsetLeft;
    const distance = Math.abs(cardPos - scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = idx;
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateCarouselNavState() {
  const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
  const prevBtn = document.getElementById("carouselPrevBtn");
  const nextBtn = document.getElementById("carouselNextBtn");
  if (!track) return;

  if (prevBtn) {
    prevBtn.disabled = track.scrollLeft <= 5;
  }
  if (nextBtn) {
    const maxScroll = track.scrollWidth - track.clientWidth - 5;
    nextBtn.disabled = track.scrollLeft >= maxScroll;
  }
}

function renderMenuItems(category) {
  const track = document.getElementById("menuCarouselTrack") || document.getElementById("menuGrid");
  if (!track) return;

  const items = category === "all" 
    ? BURGER_COLLECTION 
    : BURGER_COLLECTION.filter(b => b.category === category);

  track.innerHTML = items.map(burger => {
    return `
      <article class="burger-card spotlight-card" data-id="${burger.id}">
        <div class="card-media">
          <img src="${burger.image}" alt="${burger.name}" class="card-img" loading="lazy">
        </div>
        <div class="card-content">
          <div class="card-header-line">
            <h3 class="card-title">${burger.name}</h3>
            <span class="card-price">$${burger.price.toFixed(2)}</span>
          </div>
          <p class="card-desc">${burger.desc}</p>
          <div class="card-actions">
            <button class="btn btn-primary btn-add-order" onclick="window.SampleApp.addToCart('${burger.id}')">
              <span>Add to Bag</span>
            </button>
            <button class="btn btn-ghost" onclick="window.SampleApp.openQuickView('${burger.id}')" aria-label="Details for ${burger.name}">
              <span>Details</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  renderCarouselDots(items.length);
  updateCarouselNavState();

  // Re-attach spotlight tracking to freshly rendered cards
  initSpotlightEffect();
}

// ==========================================
// 7. THE BURGER LAB (INTERACTIVE BUILDER)
// ==========================================
function initBurgerLab() {
  // Bun buttons
  document.querySelectorAll("#bunOptions .chip-option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#bunOptions .chip-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.lab.bun = {
        id: btn.dataset.id,
        name: btn.querySelector(".chip-name").textContent,
        price: parseFloat(btn.dataset.price),
        cal: parseInt(btn.dataset.cal)
      };
      updateLab();
    });
  });

  // Patty buttons
  document.querySelectorAll("#pattyOptions .chip-option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#pattyOptions .chip-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.lab.patty = {
        id: btn.dataset.id,
        name: btn.querySelector(".chip-name").textContent,
        price: parseFloat(btn.dataset.price),
        cal: parseInt(btn.dataset.cal)
      };
      updateLab();
    });
  });

  // Cheese buttons
  document.querySelectorAll("#cheeseOptions .chip-option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#cheeseOptions .chip-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.lab.cheese = {
        id: btn.dataset.id,
        name: btn.querySelector(".chip-name").textContent,
        price: parseFloat(btn.dataset.price),
        cal: parseInt(btn.dataset.cal)
      };
      updateLab();
    });
  });

  // Topping toggles (Multi-select)
  document.querySelectorAll("#toppingOptions .chip-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const active = btn.classList.toggle("active");
      const id = btn.dataset.id;
      if (active) {
        State.lab.toppings.push({
          id: id,
          name: btn.querySelector("span:first-child").textContent,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal),
          heat: parseInt(btn.dataset.heat || 0),
          crunch: parseInt(btn.dataset.crunch || 10)
        });
      } else {
        State.lab.toppings = State.lab.toppings.filter(t => t.id !== id);
      }
      updateLab();
    });
  });

  // Sauce buttons
  document.querySelectorAll("#sauceOptions .chip-option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sauceOptions .chip-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.lab.sauce = {
        id: btn.dataset.id,
        name: btn.querySelector(".chip-name").textContent,
        price: parseFloat(btn.dataset.price),
        cal: parseInt(btn.dataset.cal),
        heat: btn.dataset.id === "ghost-fire" ? 60 : 0
      };
      updateLab();
    });
  });

  // Add Lab burger to bag
  const addLabBtn = document.getElementById("addLabBurgerBtn");
  if (addLabBtn) {
    addLabBtn.addEventListener("click", addLabBurgerToCart);
  }

  // Initial draw
  updateLab();
}

function updateLab() {
  const canvas = document.getElementById("stackCanvas");
  if (!canvas) return;

  // Calculate totals
  let totalPrice = State.lab.bun.price + State.lab.patty.price + State.lab.cheese.price + State.lab.sauce.price;
  let totalCalories = State.lab.bun.cal + State.lab.patty.cal + State.lab.cheese.cal + State.lab.sauce.cal;

  let totalHeat = (State.lab.sauce.heat || 0);
  let totalCrunch = 40; // baseline
  let totalUmami = 75;  // baseline prime patty

  State.lab.toppings.forEach(top => {
    totalPrice += top.price;
    totalCalories += top.cal;
    totalHeat += (top.heat || 0);
    totalCrunch += (top.crunch || 0);
    totalUmami += 5;
  });

  // Update live price display
  const formattedPrice = `$${totalPrice.toFixed(2)}`;
  const labPriceEl = document.getElementById("labPrice");
  const labBtnPriceEl = document.getElementById("labBtnPrice");
  if (labPriceEl) labPriceEl.textContent = formattedPrice;
  if (labBtnPriceEl) labBtnPriceEl.textContent = formattedPrice;

  // Render visual layers in realistic culinary stacking order:
  // [Top Bun] -> [Sauce] -> [Toppings / Bacon / Greens] -> [Melted Cheese] -> [Hot Patty] -> [Bottom Bun]
  let layersHtml = `
    <div class="burger-layer layer-bun-top" title="${State.lab.bun.name}">
      <span>Top ${State.lab.bun.name.split(" ")[0]}</span>
    </div>
    <div class="burger-layer layer-sauce" title="${State.lab.sauce.name}">
      <span>${State.lab.sauce.name}</span>
    </div>
  `;

  // Render toppings
  State.lab.toppings.forEach(top => {
    let layerClass = "layer-onions";
    if (top.id === "bacon") layerClass = "layer-bacon";
    if (top.id === "arugula" || top.id === "pickles") layerClass = "layer-arugula";
    if (top.id === "jalapenos") layerClass = "layer-jalapenos";
    layersHtml += `<div class="burger-layer ${layerClass}"><span>${top.name}</span></div>`;
  });

  // Cheese & Patty
  layersHtml += `
    <div class="burger-layer layer-cheese" title="${State.lab.cheese.name}">
      <span>${State.lab.cheese.name}</span>
    </div>
    <div class="burger-layer layer-patty" title="${State.lab.patty.name}">
      <span>${State.lab.patty.name}</span>
    </div>
    <div class="burger-layer layer-bun-bottom" title="${State.lab.bun.name}">
      <span>Bottom Bun</span>
    </div>
  `;

  canvas.innerHTML = layersHtml;
}

function addLabBurgerToCart() {
  const labBurger = {
    id: `custom-lab-${Date.now()}`,
    name: "Custom Lab Masterpiece",
    price: State.lab.bun.price + State.lab.patty.price + State.lab.cheese.price + State.lab.sauce.price + State.lab.toppings.reduce((acc, t) => acc + t.price, 0),
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
    desc: `${State.lab.patty.name} on ${State.lab.bun.name}, ${State.lab.cheese.name}, ${State.lab.sauce.name}, with ${State.lab.toppings.map(t => t.name).join(", ") || "no toppings"}.`,
    isCustom: true
  };

  addToCartItemObject(labBurger);
  showToast(`🍔 Lab Burger added to your bag!`);
  openCart();
}

// ==========================================
// 8. CART & ORDER SYSTEM
// ==========================================
function initCart() {
  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");

  if (openCartBtn) openCartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Esc key closes cart or dialogs
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
    }
  });

  renderCart();
}

function openCart() {
  const drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function addToCart(burgerId) {
  const burger = BURGER_COLLECTION.find(b => b.id === burgerId);
  if (!burger) return;
  addToCartItemObject(burger);
  showToast(`Added ${burger.name} to bag`);
}

function addToCartItemObject(item) {
  const existing = State.cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    State.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      isCustom: item.isCustom || false,
      desc: item.desc
    });
  }

  renderCart();
  bounceCartBadge();
}

function updateCartQuantity(id, delta) {
  const itemIndex = State.cart.findIndex(c => c.id === id);
  if (itemIndex === -1) return;

  State.cart[itemIndex].quantity += delta;
  if (State.cart[itemIndex].quantity <= 0) {
    State.cart.splice(itemIndex, 1);
  }

  renderCart();
  bounceCartBadge();
}

function bounceCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  badge.classList.add("pop");
  setTimeout(() => badge.classList.remove("pop"), 200);
}

function renderCart() {
  const countEl = document.getElementById("cartCount");
  const listEl = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("emptyCartState");
  const footerEl = document.getElementById("cartFooter");
  const subtitleEl = document.getElementById("cartItemsSubtitle");

  const totalCount = State.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) countEl.textContent = totalCount;
  if (subtitleEl) subtitleEl.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"} selected`;

  if (State.cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (footerEl) footerEl.style.display = "none";
    if (listEl) {
      listEl.innerHTML = "";
      if (emptyState) listEl.appendChild(emptyState);
    }
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (footerEl) footerEl.style.display = "block";

  // Build items list
  let html = "";
  let subtotal = 0;

  State.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="window.SampleApp.updateCartQuantity('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="window.SampleApp.updateCartQuantity('${item.id}', 1)" aria-label="Increase quantity">&plus;</button>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;

  // Calculate tax and total
  const tax = subtotal * 0.08875;
  const grandTotal = subtotal + tax;

  document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cartTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${grandTotal.toFixed(2)}`;
}

function handleCheckout() {
  if (State.cart.length === 0) return;
  closeCart();
  showToast("🎉 Order confirmed! Kitchen is firing up your dry-aged smash.");
  State.cart = [];
  renderCart();
}

// ==========================================
// 9. NATIVE DIALOG MODALS: QUICK VIEW & RESERVE
// ==========================================
function initDialogs() {
  // Quick View Modal
  const quickModal = document.getElementById("quickViewModal");
  const closeQuickBtn = document.getElementById("closeQuickViewBtn");
  if (closeQuickBtn && quickModal) {
    closeQuickBtn.addEventListener("click", () => quickModal.close());
    quickModal.addEventListener("click", (e) => {
      // Light dismiss if clicked on backdrop
      if (e.target === quickModal) quickModal.close();
    });
  }

  // Table Reservation Modal
  const reserveModal = document.getElementById("reserveModal");
  const openReserveBtn = document.getElementById("openReserveBtn");
  const closeReserveBtn = document.getElementById("closeReserveBtn");
  const resForm = document.getElementById("reservationForm");

  if (openReserveBtn && reserveModal) {
    openReserveBtn.addEventListener("click", openReservationModal);
  }

  if (closeReserveBtn && reserveModal) {
    closeReserveBtn.addEventListener("click", () => reserveModal.close());
    reserveModal.addEventListener("click", (e) => {
      if (e.target === reserveModal) reserveModal.close();
    });
  }

  if (resForm && reserveModal) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestCount = document.getElementById("resGuests").value;
      const timeSlot = document.getElementById("resTime").value;
      const name = document.getElementById("resName").value;

      reserveModal.close();
      resForm.reset();
      showToast(`🔥 Reservation confirmed for ${name}! Party of ${guestCount} at ${timeSlot}.`);
    });
  }
}

function openReservationModal() {
  const modal = document.getElementById("reserveModal");
  if (!modal) return;
  modal.showModal();
}

function openQuickView(burgerId) {
  const burger = BURGER_COLLECTION.find(b => b.id === burgerId);
  if (!burger) return;

  const modal = document.getElementById("quickViewModal");
  const content = document.getElementById("quickViewContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="qv-media">
      <img src="${burger.image}" alt="${burger.name}" class="qv-img">
    </div>
    <div class="qv-info">
      <div class="qv-header">
        <h3 class="qv-title">${burger.name}</h3>
        <span class="qv-price">$${burger.price.toFixed(2)}</span>
      </div>
      <p class="qv-desc">${burger.desc}</p>
      <div class="qv-spec-grid">
        <div class="qv-spec-box">
          <span class="qv-spec-label">Prime Cut</span>
          <span class="qv-spec-val">${burger.specs.cut}</span>
        </div>
        <div class="qv-spec-box">
          <span class="qv-spec-label">Artisan Bun</span>
          <span class="qv-spec-val">${burger.specs.bun}</span>
        </div>
        <div class="qv-spec-box">
          <span class="qv-spec-label">House Glaze</span>
          <span class="qv-spec-val">${burger.specs.sauce}</span>
        </div>
      </div>
      <button class="btn btn-primary w-full btn-large glow-btn" onclick="window.SampleApp.addToCart('${burger.id}'); document.getElementById('quickViewModal').close();">
        <span>Add to Bag &bull; $${burger.price.toFixed(2)}</span>
      </button>
    </div>
  `;

  modal.showModal();
}

// ==========================================
// 10. AMERICAN LOCATIONS SWITCHER
// ==========================================
function initLocationSwitch() {
  const tabs = document.querySelectorAll(".loc-tab");
  const addressEl = document.getElementById("locAddress");
  const hoursEl = document.getElementById("locHours");
  const phoneEl = document.getElementById("locPhone");

  const LOCATIONS = {
    nyc: {
      address: "142 Spring Street, SoHo, NY 10012",
      hours: "Mon - Sun: 11:30 AM – 11:30 PM",
      phone: "+1 (212) 555-0198"
    },
    austin: {
      address: "410 Congress Avenue, Downtown Austin, TX 78701",
      hours: "Mon - Sun: 11:00 AM – Midnight",
      phone: "+1 (512) 555-0344"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const locKey = tab.dataset.loc;
      const data = LOCATIONS[locKey];

      if (data && addressEl && hoursEl && phoneEl) {
        addressEl.textContent = data.address;
        hoursEl.textContent = data.hours;
        phoneEl.textContent = data.phone;
      }
    });
  });
}

// ==========================================
// 11. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-icon">✨</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

function handleNewsletter(form) {
  const input = form.querySelector("input[type='email']");
  if (input && input.value) {
    showToast(`Welcome to the Chef's Circle, ${input.value}! 🥂`);
    form.reset();
  }
}

// ==========================================
// 12. EXPORT TO GLOBAL SCOPE FOR INLINE CALLS
// ==========================================
window.SampleApp = {
  addToCart,
  openQuickView,
  updateCartQuantity,
  openCart,
  closeCart,
  handleCheckout,
  handleNewsletter,
  openReservationModal
};
