import { renderCartDropdown } from "./cartDropdown.js";
import { welcomeMessageText } from "./welcomeMessage.js";

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

export function renderNav(activeCategory, imgPrefix = "./") {
  const isNested = imgPrefix === "../";

  // Rutas que cambian según si estamos en raíz o en pages/
  const homePath = isNested ? "../index.html" : "./index.html";
  const earbudsHref = isNested
    ? "./product.html?id=pixel-buds-pro"
    : "./pages/product.html?id=pixel-buds-pro";
  const watchesHref = isNested
    ? "./product.html?id=fitbit-inspire-3"
    : "./pages/product.html?id=fitbit-inspire-3";

  // Helper: devuelve aria-current si la categoría coincide con la activa
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
          <a href="#"><img class="icon" src="${imgPrefix}assets/icons/Avatar.svg" alt="Account" /></a>
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
