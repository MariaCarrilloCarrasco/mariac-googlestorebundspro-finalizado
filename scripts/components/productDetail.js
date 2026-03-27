function renderThumbnails(thumbnails, imgPrefix) {
  if (!thumbnails || thumbnails.length === 0) return "";

  const items = thumbnails
    .map(
      (thumb, index) => `
        <div class="${index === 0 ? "active" : ""}" data-src="${imgPrefix}assets/img/${thumb.src}">
          <img src="${imgPrefix}assets/img/${thumb.src}" alt="${thumb.alt}" />
        </div>
      `
    )
    .join("");

  return `<div class="thumbnails">${items}</div>`;
}

function renderSwatchColors(colors) {
  const items = colors
    .map(
      (color) => `
        <input
          type="radio"
          name="color"
          id="${color.id}"
          ${color.checked ? "checked" : ""}
        />
        <label for="${color.id}" class="color-swatch ${color.cssClass}"></label>
      `
    )
    .join("");

  return `
    <fieldset class="colors" aria-labelledby="color-label">
      ${items}
    </fieldset>
  `;
}

function renderCardColors(colors, imgPrefix) {
  const items = colors
    .map(
      (color) => `
        <input
          type="radio"
          name="color"
          id="${color.id}"
          ${color.checked ? "checked" : ""}
        />
        <label
          for="${color.id}"
          class="watch-swatch ${color.cssClass}"
          data-image="${imgPrefix}assets/img/${color.image}"
        >
          <img src="${imgPrefix}assets/img/${color.image}" alt="${color.label.replace(/<br\s*\/?>/gi, " ")}" />
          <span>${color.label}</span>
        </label>
      `
    )
    .join("");

  return `
    <fieldset class="watch-colors" aria-labelledby="color-label">
      ${items}
    </fieldset>
  `;
}

export function renderProductDetail(product, imgPrefix = "../") {
  const homePath = `${imgPrefix}index.html`;

  const colorSelector =
    product.colorSelectorType === "swatch"
      ? renderSwatchColors(product.colors)
      : renderCardColors(product.colors, imgPrefix);

  return `
    <a href="${homePath}" class="btn_back">
      <img src="${imgPrefix}assets/icons/Arrow.svg" alt="Back" />
      See product details
    </a>

    <section>
      <div>
        <figure>
          ${renderThumbnails(product.thumbnails, imgPrefix)}
          <div class="image">
            <img
              id="hero-image"
              src="${imgPrefix}assets/img/${product.heroImage.src}"
              alt="${product.heroImage.alt}"
            />
          </div>
        </figure>
      </div>

      <div class="info_product">
        <div class="description">
          <h1>${product.name}</h1>
          <p>${product.category}</p>
          <p class="price_summary">${product.price}</p>
          <hr />
          <p id="color-label">Choose a Color</p>
        </div>

        <div class="purchase">
          ${colorSelector}

          <div class="purchase_details">
            <p class="price_purchase">${product.price}</p>
            <hr />
            <div class="select_quantity">
              <label for="quantity" class="sr-only">Quantity</label>
              <select name="quantity" id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button class="add_to_cart">Add to cart</button>
            </div>
            <div class="delivery">
              <img src="${imgPrefix}assets/icons/Delivery.svg" alt="Free delivery" />
              <p>Delivers ${product.deliveryDate} to <span>${product.deliveryZip}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
