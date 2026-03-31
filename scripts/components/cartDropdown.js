import { getCart, getCartTotals, formatPrice } from "../cart/cartService.js";

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

export function renderCartDropdownBody(imgPrefix) {
  const cart = getCart();
  const { totalPrice } = getCartTotals();

  return `
    ${renderCartItems(cart, imgPrefix)}
    <div class="cart-dropdown__actions">
      <button class="cart-dropdown__btn cart-dropdown__btn--go">Ir a la Cesta</button>
      <button class="cart-dropdown__btn cart-dropdown__btn--clear cart-clear">Limpiar cesta</button>
    </div>
    <div class="cart-dropdown__total">
      <strong>TOTAL: ${formatPrice(totalPrice)}</strong>
    </div>
  `;
}

export function renderCartDropdown(imgPrefix) {
  return `
    <div class="cart-dropdown cart-dropdown--hidden">
      <h3 class="cart-dropdown__title">Cesta</h3>
      <div class="cart-dropdown__body">
        ${renderCartDropdownBody(imgPrefix)}
      </div>
    </div>
  `;
}
