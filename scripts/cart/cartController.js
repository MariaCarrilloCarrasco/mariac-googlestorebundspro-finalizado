import { addToCart, updateQuantity, clearCart, getCartTotals } from "./cartService.js";
import { renderCartDropdownBody } from "../components/cartDropdown.js";

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

export function initCartUI(root, imgPrefix, productsData) {
  updateBadge();

  root.addEventListener("click", (e) => {
    // Toggle dropdown
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

    // Plus button
    const plusBtn = e.target.closest(".cart-qty-plus");
    if (plusBtn) {
      e.stopPropagation();
      updateQuantity(plusBtn.dataset.productId, 1);
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }

    // Minus button
    const minusBtn = e.target.closest(".cart-qty-minus");
    if (minusBtn) {
      e.stopPropagation();
      updateQuantity(minusBtn.dataset.productId, -1);
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }

    // Clear cart
    if (e.target.closest(".cart-clear")) {
      e.stopPropagation();
      clearCart();
      refreshDropdown(imgPrefix);
      updateBadge();
      return;
    }

    // Add to cart
    const addBtn = e.target.closest(".add_to_cart");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();

      // Homepage: find product id from article data-href
      const article = addBtn.closest("article[data-href]");
      if (article) {
        const href = article.dataset.href;
        const url = new URL(href, window.location.href);
        const productId = url.searchParams.get("id");
        const product = productsData.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
          updateBadge();
          refreshDropdown(imgPrefix);
        }
        return;
      }

      // Product detail page - the button is inside .purchase_details
      const detailBtn = addBtn.closest(".purchase_details") || addBtn.closest(".select_quantity");
      if (detailBtn) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id");
        const product = productsData.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
          updateBadge();
          refreshDropdown(imgPrefix);
        }
      }
      return;
    }

    // Click outside dropdown → close it
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
