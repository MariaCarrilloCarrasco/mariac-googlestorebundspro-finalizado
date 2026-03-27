export function renderProductCard(product) {
  return `
    <article data-href="./pages/product.html?id=${product.id}">
      <div class="img_container">
        <img src="./assets/img/${product.cardImage.src}" alt="${product.cardImage.alt}" />
      </div>
      <div class="info_container">
        <div class="info">
          <h2>${product.name}</h2>
          <p>${product.category}</p>
        </div>
        <h2>${product.price}</h2>
        <button class="add_to_cart">Add to Cart</button>
      </div>
    </article>
  `;
}
