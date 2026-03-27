const STORAGE_KEY = "googleStoreCart";

export function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(",", ".").replace(/[^\d.]/g, ""));
}

export function formatPrice(num) {
  return num.toFixed(2).replace(".", ",") + " €";
}

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      img: product.cardImage.src,
      count: 1,
    });
  }

  saveCart(cart);
  return cart;
}

export function updateQuantity(productId, delta) {
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

export function clearCart() {
  saveCart([]);
}

export function getCartTotals() {
  const cart = getCart();
  return {
    totalItems: cart.reduce((sum, item) => sum + item.count, 0),
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.count, 0),
  };
}
