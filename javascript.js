// ============================================================
// cartService
// ============================================================
const STORAGE_KEY = "googleStoreCart";

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(",", ".").replace(/[^\d.]/g, ""));
}

function formatPrice(num) {
  return num.toFixed(2).replace(".", ",") + " €";
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.count += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      img: product.cardImage.src,
      count: quantity,
    });
  }
  saveCart(cart);
  return cart;
}

function updateQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return cart;
  item.count += delta;
  if (item.count <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }
  saveCart(cart);
  return cart;
}

function clearCart() {
  saveCart([]);
}

function getCartTotals() {
  const cart = getCart();
  return {
    totalItems: cart.reduce((sum, item) => sum + item.count, 0),
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.count, 0),
  };
}

// ============================================================
// cartDropdown
// ============================================================
function renderCartItems(cart, imgPrefix) {
  if (cart.length === 0) {
    return `<p class="cart-dropdown__empty">El carrito está vacío.</p>`;
  }
  return cart
    .map(
      (item) => `
      <div class="cart-dropdown__item" data-product-id="${item.id}">
        <img class="cart-dropdown__img" src="${imgPrefix}assets/img/${item.img}" alt="${item.name}" />
        <div class="cart-dropdown__info">
          <span class="cart-dropdown__name">${item.name}</span>
          <span class="cart-dropdown__price">${formatPrice(item.price)}</span>
        </div>
        <div class="cart-dropdown__qty">
          <button type="button" class="cart-qty-plus" data-product-id="${item.id}" aria-label="Añadir una unidad">
            <img src="${imgPrefix}assets/icons/plus-sm.png" alt="" />
          </button>
          <span class="cart-dropdown__count">${item.count}</span>
          <button type="button" class="cart-qty-minus" data-product-id="${item.id}" aria-label="Quitar una unidad">
            <img src="${imgPrefix}assets/icons/minus-sm.png" alt="" />
          </button>
        </div>
      </div>`,
    )
    .join("");
}

function renderCartDropdownBody(imgPrefix) {
  const cart = getCart();
  const { totalPrice } = getCartTotals();
  const cartHref = imgPrefix === "../" ? "./cart.html" : "./pages/cart.html";
  return `
    ${renderCartItems(cart, imgPrefix)}
    <div class="cart-dropdown__actions">
      <a href="${cartHref}" class="cart-dropdown__btn cart-dropdown__btn--go">Ir a la Cesta</a>
      <button class="cart-dropdown__btn cart-dropdown__btn--clear cart-clear">Limpiar cesta</button>
    </div>
    <div class="cart-dropdown__total">
      <strong>TOTAL: ${formatPrice(totalPrice)}</strong>
    </div>
  `;
}

function renderCartDropdown(imgPrefix) {
  return `
    <div class="cart-dropdown cart-dropdown--hidden">
      <h3 class="cart-dropdown__title">Cesta</h3>
      <div class="cart-dropdown__body">
        ${renderCartDropdownBody(imgPrefix)}
      </div>
    </div>
  `;
}

// ============================================================
// welcomeMessage
// ============================================================
const welcomeMessageText =
  'Bienvenidxs a Google Store. Las coders del Departamento de Marketing de Google Store queremos que comprar en nuestra página web sea una experiencia positiva. Por ello, queremos ayudar a que las personas sean lo más autónomas posibles y que nuestro servicio sea lo más accesible posible, especialmente para aquellas personas que presentan más dificultades de acceso en un contexto donde las compras online tienen cada vez más auge en el sector. Hemos decidido facilitaros las instrucciones para que podais adquirir nuestros productos de manera autonoma y, ademas, disponemos de un teléfono de atención al usuario: 800-900-549. A través de este número os atendera una persona real, formada y cercana para responder a vuestras consultas de forma personalizada e individualizada, ayudaros a hacer las compras de forma rápida y segura, y tambien recoger dudas, quejas o sugerencias sobre nuestro servicio. Como veis, somos una entidad comprometida con la atención a las personas, innovadora y con capacidad de adaptación a los cambios constantes. En cuanto a la compra online, primero pinchando en cada producto podeis elegir el diseño que querais adquirir; a continuacion, presionando el boton "Add to Cart" o "Anadir al carrito" aparecera el número de productos seleccionados, el producto adquirido y el precio total de la compra. Esperamos que sea una experiencia placentera. En el número de teléfono señalado anteriormente, también, encontraréis información sobre la politica de cancelación y devolución de productos. Gracias. Saludos, atentamente, Fem Coders Camp de Google Store. P. D.: Cualquier duda, estamos a vuestra disposicion. iA disfrutar!';

// ============================================================
// nav
// ============================================================
function renderHelpModal() {
  return `
    <div class="help-modal help-modal--hidden" role="dialog" aria-modal="true" aria-labelledby="help-modal-title">
      <div class="help-modal__backdrop" data-help-close="true"></div>
      <div class="help-modal__panel" role="document">
        <div class="help-modal__header">
          <h2 id="help-modal-title">Ventana de ayuda</h2>
          <button type="button" class="help-modal__close" aria-label="Cerrar ayuda">×</button>
        </div>
        <p class="help-modal__text">${welcomeMessageText}</p>
      </div>
    </div>
  `;
}

function renderNav(activeCategory, imgPrefix = "./") {
  const isNested = imgPrefix === "../";
  const homePath = isNested ? "../index.html" : "./index.html";
  const earbudsHref = isNested
    ? "./product.html?id=pixel-buds-pro"
    : "./pages/product.html?id=pixel-buds-pro";
  const watchesHref = isNested
    ? "./product.html?id=fitbit-inspire-3"
    : "./pages/product.html?id=fitbit-inspire-3";
  const isActive = (category) =>
    activeCategory === category ? 'aria-current="page"' : "";
  return `
    <nav aria-label="Main navigation">
      <div class="links_contain">
        <a href="${homePath}">
          <img src="${imgPrefix}assets/icons/google-logo.png" alt="Google Store" />
        </a>
        <ul class="links">
          <li><a href="#">Phones</a></li>
          <li><a href="${earbudsHref}" ${isActive("Earbuds")}>Earbuds</a></li>
          <li><a href="${watchesHref}" ${isActive("Watches")}>Watches</a></li>
          <li><a href="#">Smart Home</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Subscriptions</a></li>
        </ul>
      </div>
      <ul class="icons">
        <li>
          <a href="#"><img class="icon" src="${imgPrefix}assets/icons/Search.svg" alt="Search" /></a>
        </li>
        <li>
          <a href="#" class="help-toggle" aria-label="Abrir ayuda"><img class="icon" src="${imgPrefix}assets/icons/Help.svg" alt="Help" /></a>
        </li>
        <li class="cart-icon">
          <a href="#" class="cart-icon__toggle"><img class="icon" src="${imgPrefix}assets/icons/Cart.svg" alt="Cart" />
          <span class="cart-badge" id="cart-badge"></span></a>
          ${renderCartDropdown(imgPrefix)}
        </li>
        <li>
          <a href="#" class="profile-toggle" aria-label="Abrir mensaje de bienvenida"><img class="icon" src="${imgPrefix}assets/icons/Avatar.svg" alt="Account" /></a>
        </li>
        <li class="menu">
          <a href="#" class="mobile-menu-toggle"><img class="icon" src="${imgPrefix}assets/icons/icons-menu.svg" alt="Menu" /></a>
        </li>
      </ul>
    </nav>
    <div class="mobile-menu mobile-menu--hidden">
      <ul class="mobile-menu__links">
        <li><a href="#">Phones</a></li>
        <li><a href="${earbudsHref}" ${isActive("Earbuds")}>Earbuds</a></li>
        <li><a href="${watchesHref}" ${isActive("Watches")}>Watches</a></li>
        <li><a href="#">Smart Home</a></li>
        <li><a href="#">Accessories</a></li>
        <li><a href="#">Subscriptions</a></li>
      </ul>
    </div>
    ${renderHelpModal()}
  `;
}

// ============================================================
// footer
// ============================================================
function renderFooter(imgPrefix = "./") {
  return `
    <footer>
      <div>
        <div class="social-icons">
          <a href="#"><img src="${imgPrefix}assets/icons/SM-x.svg" alt="X" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-youtube.svg" alt="YouTube" /></a>
          <a href="#"><img src="${imgPrefix}assets/icons/SM-tiktok.svg" alt="TikTok" /></a>
        </div>
        <div class="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Google Nest Commitment to Privacy</a>
          <a href="#">Sales Terms</a>
          <a href="#">Terms of Service</a>
          <div class="country">
            <img src="${imgPrefix}assets/icons/Spain.svg" alt="Spain" /> Spain
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ============================================================
// productCard
// ============================================================
function renderColorPicker(product) {
  if (!product.colors || product.colors.length === 0) return "";

  if (product.colorSelectorType === "swatch") {
    const dots = product.colors
      .map(
        (color) => `
        <button
          type="button"
          class="card-swatch ${color.cssClass}${color.checked ? " card-swatch--active" : ""}"
          data-filter="${color.previewFilter}"
          aria-label="${color.name}"
        ></button>`
      )
      .join("");
    return `<div class="card-swatches">${dots}</div>`;
  }

  if (product.colorSelectorType === "card") {
    const imgs = product.colors
      .map(
        (color) => `
        <button
          type="button"
          class="card-color-img${color.checked ? " card-color-img--active" : ""}"
          data-image="./assets/img/${color.image}"
          aria-label="${color.label.replace(/<br\s*\/?>/gi, " ")}"
        ><img src="./assets/img/${color.image}" alt="${color.label.replace(/<br\s*\/?>/gi, " ")}" /></button>`
      )
      .join("");
    return `<div class="card-swatches">${imgs}</div>`;
  }

  return "";
}

function renderProductCard(product) {
  return `
    <article data-href="./pages/product.html?id=${product.id}">
      <div class="img_container">
        <img src="./assets/img/${product.cardImage.src}" alt="${product.cardImage.alt}" />
      </div>
      <div class="info_container">
        <div class="info">
          <h2 class="product-title">${product.name}</h2>
          <p class="product-category">${product.category}</p>
        </div>
        ${renderColorPicker(product)}
        <p class="product-price">${product.price}</p>
        <button class="add_to_cart">Add to Cart</button>
      </div>
    </article>
  `;
}

// ============================================================
// productsData
// ============================================================
const productsData = [
  {
    id: "pixel-buds-pro",
    name: "Google Pixel Buds Pro",
    category: "Music & Sound",
    price: "229 €",
    deliveryDate: "29 Apr",
    deliveryZip: "08023",
    navCategory: "Earbuds",
    cardImage: {
      src: "earbuds/earbuds_01.png",
      alt: "Google Pixel Buds Pro",
    },
    heroImage: {
      src: "earbuds/earbuds_01.png",
      alt: "Google Pixel Buds Pro - vista frontal con estuche abierto",
    },
    thumbnails: [
      { src: "earbuds/earbuds_01.png", alt: "Google Pixel Buds Pro - vista frontal con estuche abierto" },
      { src: "earbuds/earbuds_02.png", alt: "Google Pixel Buds Pro - vista lateral" },
      { src: "earbuds/earbuds_03.png", alt: "Google Pixel Buds Pro - auricular derecho" },
      { src: "earbuds/earbuds_04.png", alt: "Google Pixel Buds Pro - estuche cerrado" },
    ],
    colorSelectorType: "swatch",
    colors: [
      { id: "color-blue", cssClass: "swatch-blue", checked: true, name: "Fog", previewFilter: "hue-rotate(0deg) saturate(1) brightness(1)", previewBackground: "#eff3f8" },
      { id: "color-gray-light", cssClass: "swatch-gray-light", name: "Porcelain", previewFilter: "grayscale(0.15) brightness(1.08) sepia(0.08)", previewBackground: "#f4f1ed" },
      { id: "color-dark", cssClass: "swatch-dark", name: "Charcoal", previewFilter: "grayscale(0.8) brightness(0.68) contrast(1.1)", previewBackground: "#e8eaed" },
      { id: "color-gray", cssClass: "swatch-gray", name: "Mist", previewFilter: "grayscale(0.55) brightness(0.96) contrast(1.02)", previewBackground: "#edf1f4" },
      { id: "color-green", cssClass: "swatch-green", name: "Lemongrass", previewFilter: "sepia(0.35) saturate(1.15) hue-rotate(18deg) brightness(1.02)", previewBackground: "#f1f5e4" },
      { id: "color-red", cssClass: "swatch-red", name: "Coral", previewFilter: "sepia(0.55) saturate(1.3) hue-rotate(320deg) brightness(0.98)", previewBackground: "#f7ece8" },
    ],
    extraStylesheet: null,
  },
  {
    id: "fitbit-inspire-3",
    name: "Fitbit Inspire 3",
    category: "Health & Fitness Tracker",
    price: "99,95 €",
    deliveryDate: "29 Apr",
    deliveryZip: "08023",
    navCategory: "Watches",
    cardImage: {
      src: "smartwatch/smartwatch_black.png",
      alt: "Fitbit Inspire 3",
    },
    heroImage: {
      src: "smartwatch/smartwatch_black.png",
      alt: "Fitbit Inspire 3 - Midnight Zen",
    },
    thumbnails: [],
    colorSelectorType: "card",
    colors: [
      { id: "color-midnight", cssClass: "swatch-midnight", label: "Midnight<br>Zen", image: "smartwatch/smartwatch_black.png", checked: true },
      { id: "color-lilac", cssClass: "swatch-lilac", label: "Lilac<br>Bliss", image: "smartwatch/smartwatch_pink.png" },
      { id: "color-morning", cssClass: "swatch-morning", label: "Morning<br>Glow", image: "smartwatch/smartwatch_yellow.png" },
    ],
    extraStylesheet: "../styles/watches-style.css",
  },
];

// ============================================================
// cartController
// ============================================================
function updateBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const { totalItems } = getCartTotals();
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = "flex";
  } else {
    badge.textContent = "";
    badge.style.display = "none";
  }
}

function refreshDropdown(imgPrefix) {
  const body = document.querySelector(".cart-dropdown__body");
  if (!body) return;
  body.innerHTML = renderCartDropdownBody(imgPrefix);
}

function openHelpModal() {
  const modal = document.querySelector(".help-modal");
  if (!modal) return;
  modal.classList.remove("help-modal--hidden");
  document.body.style.overflow = "hidden";
}

function closeHelpModal() {
  const modal = document.querySelector(".help-modal");
  if (!modal) return;
  modal.classList.add("help-modal--hidden");
  document.body.style.overflow = "";
}

function initCartUI(root, imgPrefix, data) {
  updateBadge();
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeHelpModal();
  });
  root.addEventListener("click", (e) => {
    const menuToggle = e.target.closest(".mobile-menu-toggle");
    if (menuToggle) {
      e.preventDefault();
      e.stopPropagation();
      const mobileMenu = document.querySelector(".mobile-menu");
      const img = menuToggle.querySelector("img");
      if (mobileMenu) {
        const isOpen = !mobileMenu.classList.contains("mobile-menu--hidden");
        mobileMenu.classList.toggle("mobile-menu--hidden");
        if (img) {
          img.src = isOpen
            ? `${imgPrefix}assets/icons/icons-menu.svg`
            : `${imgPrefix}assets/icons/x.svg`;
          img.alt = isOpen ? "Menu" : "Cerrar menú";
        }
      }
      return;
    }
    const helpToggle = e.target.closest(".help-toggle");
    if (helpToggle) {
      e.preventDefault();
      openHelpModal();
      return;
    }
    const profileToggle = e.target.closest(".profile-toggle");
    if (profileToggle) {
      e.preventDefault();
      openHelpModal();
      return;
    }
    if (e.target.closest(".help-modal__close") || e.target.closest("[data-help-close='true']")) {
      e.preventDefault();
      closeHelpModal();
      return;
    }
    if (e.target.closest(".mobile-menu__links a")) {
      const mobileMenu = document.querySelector(".mobile-menu");
      const img = document.querySelector(".mobile-menu-toggle img");
      if (mobileMenu) mobileMenu.classList.add("mobile-menu--hidden");
      if (img) { img.src = `${imgPrefix}assets/icons/icons-menu.svg`; img.alt = "Menu"; }
    }
    const toggle = e.target.closest(".cart-icon__toggle");
    if (toggle) {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = document.querySelector(".cart-dropdown");
      if (dropdown) {
        dropdown.classList.toggle("cart-dropdown--hidden");
        refreshDropdown(imgPrefix);
      }
      return;
    }
    const plusBtn = e.target.closest(".cart-qty-plus");
    if (plusBtn) {
      e.stopPropagation();
      updateQuantity(plusBtn.dataset.productId, 1);
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }
    const minusBtn = e.target.closest(".cart-qty-minus");
    if (minusBtn) {
      e.stopPropagation();
      updateQuantity(minusBtn.dataset.productId, -1);
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }
    if (e.target.closest(".cart-clear")) {
      e.stopPropagation();
      clearCart();
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }
    // Card swatch (earbuds – CSS filter)
    const swatchBtn = e.target.closest(".card-swatch");
    if (swatchBtn) {
      const article = swatchBtn.closest("article[data-href]");
      const cardImg = article?.querySelector(".img_container img");
      if (cardImg) cardImg.style.filter = swatchBtn.dataset.filter;
      if (article) {
        article.querySelectorAll(".card-swatch").forEach((b) => b.classList.remove("card-swatch--active"));
        swatchBtn.classList.add("card-swatch--active");
      }
      return;
    }

    // Card color img (watches – image swap)
    const colorImgBtn = e.target.closest(".card-color-img");
    if (colorImgBtn) {
      const article = colorImgBtn.closest("article[data-href]");
      const cardImg = article?.querySelector(".img_container img");
      if (cardImg) cardImg.src = colorImgBtn.dataset.image;
      if (article) {
        article.querySelectorAll(".card-color-img").forEach((b) => b.classList.remove("card-color-img--active"));
        colorImgBtn.classList.add("card-color-img--active");
      }
      return;
    }

    const addBtn = e.target.closest(".add_to_cart");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const article = addBtn.closest("article[data-href]");
      if (article) {
        const href = article.dataset.href;
        const url = new URL(href, window.location.href);
        const productId = url.searchParams.get("id");
        const product = data.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
          updateBadge();
          refreshDropdown(imgPrefix);
        }
        return;
      }
      const detailBtn = addBtn.closest(".purchase_details") || addBtn.closest(".select_quantity");
      if (detailBtn) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id");
        const product = data.find((p) => p.id === productId);
        if (product) {
          const quantitySelect = document.getElementById("quantity");
          const quantity = quantitySelect ? parseInt(quantitySelect.value, 10) : 1;
          addToCart(product, quantity);
          updateBadge();
          refreshDropdown(imgPrefix);
        }
      }
      return;
    }
    const dropdown = document.querySelector(".cart-dropdown");
    if (dropdown && !dropdown.classList.contains("cart-dropdown--hidden")) {
      const insideDropdown = e.target.closest(".cart-dropdown");
      const insideCartIcon = e.target.closest(".cart-icon");
      if (!insideDropdown && !insideCartIcon) {
        dropdown.classList.add("cart-dropdown--hidden");
      }
    }
  });
}

// ============================================================
// Main
// ============================================================
const root = document.getElementById("root");

root.innerHTML = `
  ${renderNav(null, "./")}
  <section id="welcome-message-section" class="welcome-frame" aria-label="Mensaje de bienvenida">
    <h2 class="welcome-title">Mensaje de bienvenida</h2>
    <p class="welcome-box">${welcomeMessageText}</p>
  </section>
  <main class="home-main">
    <section class="home-copy" aria-label="Google Store introduction">
      <p class="home-eyebrow">Google Store</p>
      <h1 class="home-title">Dispositivos pensados para tu día a día</h1>
      <p class="home-subtitle">
        Descubre nuestros earbuds y smartwatches con una presentación limpia,
        imágenes reales del producto, tipografía Inter y una composición visual
        inspirada en el ejercicio original de Google Store.
      </p>
    </section>
    <section class="card_container" aria-label="Product catalogue">
      ${productsData.map(renderProductCard).join("")}
    </section>
  </main>
  ${renderFooter("./")}
`;

initCartUI(root, "./", productsData);

root.addEventListener("click", (event) => {
  if (event.target.closest(".add_to_cart")) return;
  if (event.target.closest(".card-swatch")) return;
  if (event.target.closest(".card-color-img")) return;
  const article = event.target.closest("article[data-href]");
  if (!article) {
    return;
  }

  window.location.href = article.dataset.href;
});