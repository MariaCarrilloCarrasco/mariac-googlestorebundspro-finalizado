export function renderProductCard(product) {
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
        <p class="product-price">${product.price}</p>
        <button class="add_to_cart">Add to Cart</button>
      </div>
    </article>
  `;
}
