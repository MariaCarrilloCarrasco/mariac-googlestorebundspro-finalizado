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

function updateQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.count += delta;
  if (item.count <= 0) cart = cart.filter((i) => i.id !== productId);
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.id !== productId));
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
// cartDropdown (miniatura en la nav)
// ============================================================
function renderNavCartItems(cart, imgPrefix) {
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
      </div>`
    )
    .join("");
}

function renderCartDropdownBody(imgPrefix) {
  const cart = getCart();
  const { totalPrice } = getCartTotals();
  return `
    ${renderNavCartItems(cart, imgPrefix)}
    <div class="cart-dropdown__actions">
      <a href="./cart.html" class="cart-dropdown__btn cart-dropdown__btn--go">Ir a la Cesta</a>
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
  'Bienvenidxs a Google Store. Las coders del Departamento de Marketing de Google Store queremos que comprar en nuestra pagina web sea una experiencia placentera. Por ello, queremos ayudar a que las personas sean lo mas autonomas posibles y que nuestro servicio sea lo mas accesible posible, especialmente para aquellas personas que presentan mas dificultades de acceso en un contexto donde las compras online tienen cada vez mas auge en el sector. Hemos decidido facilitaros las instrucciones para que podais adquirir nuestros productos de manera autonoma y, ademas, disponemos de un telefono de atencion al usuario: 800-900-549. A traves de este numero os atendera una persona real, formada y cercana para responder a vuestras consultas de forma personalizada e individualizada, ayudaros a hacer las compras de forma rapida y segura, y tambien recoger dudas, quejas o sugerencias sobre nuestro servicio. Como veis, somos una entidad comprometida con la atencion a las personas, innovadora y con capacidad de adaptacion a los cambios constantes. En cuanto a la compra online, primero pinchando en cada producto podeis elegir el diseno que quereis adquirir; a continuacion, presionando el boton "Add to Cart" o "Anadir al carrito" aparecera el numero de productos seleccionados, el producto adquirido y el precio total de la compra. Esperamos que sea una experiencia placentera. En el numero de telefono senalado tambien encontrareis informacion sobre la politica de cancelacion y devolucion de productos. Gracias. Saludos, atentamente, el Fem Coders Camp de Google Store. P. D.: Cualquier duda, estamos a vuestra disposicion. iA disfrutar!';

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

function renderNav(activeCategory, imgPrefix) {
  const homePath = "../index.html";
  const earbudsHref = "./product.html?id=pixel-buds-pro";
  const watchesHref = "./product.html?id=fitbit-inspire-3";
  const isActive = (cat) => (activeCategory === cat ? 'aria-current="page"' : "");
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
          <a href="#" class="help-toggle" aria-label="Abrir ayuda">
            <img class="icon" src="${imgPrefix}assets/icons/Help.svg" alt="Help" />
          </a>
        </li>
        <li class="cart-icon">
          <a href="#" class="cart-icon__toggle">
            <img class="icon" src="${imgPrefix}assets/icons/Cart.svg" alt="Cart" />
            <span class="cart-badge" id="cart-badge"></span>
          </a>
          ${renderCartDropdown(imgPrefix)}
        </li>
        <li>
          <a href="#" class="profile-toggle" aria-label="Abrir mensaje de bienvenida"><img class="icon" src="${imgPrefix}assets/icons/Avatar.svg" alt="Account" /></a>
        </li>
        <li class="menu">
          <a href="#" class="mobile-menu-toggle">
            <img class="icon" src="${imgPrefix}assets/icons/icons-menu.svg" alt="Menu" />
          </a>
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
function renderFooter(imgPrefix) {
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
// UI helpers
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

// ============================================================
// Cart page rendering
// ============================================================
function renderPaymentMethods(imgPrefix) {
  return `
    <div class="cart-payment">
      <p class="cart-payment__label">Métodos de pago aceptados</p>
      <div class="cart-payment__icons">
        <img src="${imgPrefix}assets/icons/PM-paypal.svg"     alt="PayPal"      class="payment-icon" />
        <img src="${imgPrefix}assets/icons/PM-mastercard.svg" alt="Mastercard"  class="payment-icon" />
        <img src="${imgPrefix}assets/icons/PM-visa.svg"       alt="Visa"        class="payment-icon" />
        <img src="${imgPrefix}assets/icons/PM-googlepay.svg"  alt="Google Pay"  class="payment-icon" />
        <img src="${imgPrefix}assets/icons/PM-bizum.svg"      alt="Bizum"       class="payment-icon" />
      </div>
    </div>
  `;
}

function renderCartBody(imgPrefix) {
  const cart = getCart();
  const { totalPrice } = getCartTotals();

  if (cart.length === 0) {
    return `
      <div class="cart-empty">
        <p>Tu carrito está vacío.</p>
        <a href="${imgPrefix}index.html" class="btn_back">
          <img src="${imgPrefix}assets/icons/Arrow.svg" alt="" />
          Volver al catálogo
        </a>
      </div>
      ${renderPaymentMethods(imgPrefix)}
    `;
  }

  const rows = cart
    .map(
      (item) => `
      <tr class="cart-row" data-product-id="${item.id}">
        <td class="cart-row__img">
          <img src="${imgPrefix}assets/img/${item.img}" alt="${item.name}" />
        </td>
        <td class="cart-row__name">${item.name}</td>
        <td class="cart-row__price">${formatPrice(item.price)}</td>
        <td class="cart-row__qty">
          <div class="cart-qty-ctrl">
            <button type="button" class="cart-qty-minus" data-product-id="${item.id}" aria-label="Quitar una unidad">−</button>
            <span class="cart-qty-val">${item.count}</span>
            <button type="button" class="cart-qty-plus" data-product-id="${item.id}" aria-label="Añadir una unidad">+</button>
          </div>
        </td>
        <td class="cart-row__subtotal">${formatPrice(item.price * item.count)}</td>
        <td class="cart-row__remove">
          <button type="button" class="cart-remove" data-product-id="${item.id}" aria-label="Eliminar producto">×</button>
        </td>
      </tr>`
    )
    .join("");

  return `
    <div class="cart-table-wrapper">
      <table class="cart-table">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="cart-summary">
      <div class="cart-summary__row">
        <span>Subtotal</span>
        <span>${formatPrice(totalPrice)}</span>
      </div>
      <div class="cart-summary__row cart-summary__row--total">
        <span>Total</span>
        <span>${formatPrice(totalPrice)}</span>
      </div>
      <button class="cart-checkout-btn" type="button">Finalizar pedido</button>
      ${renderPaymentMethods(imgPrefix)}
    </div>
  `;
}

function refreshCartPage(imgPrefix) {
  const cartContent = document.getElementById("cart-content");
  if (!cartContent) return;
  cartContent.innerHTML = renderCartBody(imgPrefix);
}

// ============================================================
// initCartUI
// ============================================================
function initCartUI(root, imgPrefix) {
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

    if (
      e.target.closest(".help-modal__close") ||
      e.target.closest("[data-help-close='true']")
    ) {
      e.preventDefault();
      closeHelpModal();
      return;
    }

    if (e.target.closest(".mobile-menu__links a")) {
      const mobileMenu = document.querySelector(".mobile-menu");
      const img = document.querySelector(".mobile-menu-toggle img");
      if (mobileMenu) mobileMenu.classList.add("mobile-menu--hidden");
      if (img) {
        img.src = `${imgPrefix}assets/icons/icons-menu.svg`;
        img.alt = "Menu";
      }
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
      refreshCartPage(imgPrefix);
      updateBadge();
      return;
    }

    const minusBtn = e.target.closest(".cart-qty-minus");
    if (minusBtn) {
      e.stopPropagation();
      updateQuantity(minusBtn.dataset.productId, -1);
      refreshDropdown(imgPrefix);
      refreshCartPage(imgPrefix);
      updateBadge();
      return;
    }

    if (e.target.closest(".cart-clear")) {
      e.stopPropagation();
      clearCart();
      refreshDropdown(imgPrefix);
      refreshCartPage(imgPrefix);
      updateBadge();
      return;
    }

    const removeBtn = e.target.closest(".cart-remove");
    if (removeBtn) {
      e.stopPropagation();
      removeFromCart(removeBtn.dataset.productId);
      refreshDropdown(imgPrefix);
      refreshCartPage(imgPrefix);
      updateBadge();
      return;
    }

    const dropdown = document.querySelector(".cart-dropdown");
    if (dropdown && !dropdown.classList.contains("cart-dropdown--hidden")) {
      if (!e.target.closest(".cart-dropdown") && !e.target.closest(".cart-icon")) {
        dropdown.classList.add("cart-dropdown--hidden");
      }
    }
  });
}

// ============================================================
// Main
// ============================================================
const IMG_PREFIX = "../";
const root = document.getElementById("root");

root.innerHTML = `
  ${renderNav(null, IMG_PREFIX)}
  <main class="cart-page">
    <div class="cart-page__header">
      <a href="${IMG_PREFIX}index.html" class="btn_back">
        <img src="${IMG_PREFIX}assets/icons/Arrow.svg" alt="" />
        Volver al catálogo
      </a>
      <h1 class="cart-page__title">Tu Cesta</h1>
    </div>
    <div id="cart-content">
      ${renderCartBody(IMG_PREFIX)}
    </div>
  </main>
  ${renderFooter(IMG_PREFIX)}
`;

initCartUI(root, IMG_PREFIX);
