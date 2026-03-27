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
          <a href="#"><img src="${imgPrefix}assets/icons/Search.svg" alt="Search" /></a>
        </li>
        <li>
          <a href="#"><img src="${imgPrefix}assets/icons/Help.svg" alt="Help" /></a>
        </li>
        <li class="cart-icon">
          <a href="#"><img src="${imgPrefix}assets/icons/Cart.svg" alt="Cart" /></a>
          <span class="cart-badge" id="cart-badge"></span>
        </li>
        <li>
          <a href="#"><img src="${imgPrefix}assets/icons/Avatar.svg" alt="Account" /></a>
        </li>
        <li class="menu">
          <a href="#"><img src="${imgPrefix}assets/icons/icons-menu.svg" alt="Menu" /></a>
        </li>
      </ul>
    </nav>
  `;
}
