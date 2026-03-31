import { productsData } from "../config/productsData.js";
import { renderNav } from "./components/nav.js";
import { renderFooter } from "./components/footer.js";
import { renderProductDetail } from "./components/productDetail.js";
import { initCartUI } from "./cart/cartController.js";

const root = document.getElementById("root");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = productsData.find((product) => product.id === productId);

function applySwatchPreview(selectedInput, heroImage) {
  if (!selectedInput || !heroImage) {
    return;
  }

  const filter = selectedInput.dataset.filter || "none";
  const colorName = selectedInput.dataset.colorName || "";
  const thumbnailImages = document.querySelectorAll(".thumbnails img");

  heroImage.style.filter = filter;
  thumbnailImages.forEach((image) => {
    image.style.filter = filter;
  });

  if (colorName) {
    heroImage.alt = `${product.name} - ${colorName}`;
  }
}

// ── Product not found ─────────────────────────────────────────────────
if (!product) {
  root.innerHTML = `
    ${renderNav(null, "../")}
    <main class="not-found">
      <h1>Producto no encontrado</h1>
      <p>El producto "${productId ?? "desconocido"}" no existe en el catálogo.</p>
      <a href="../index.html" class="btn_back">← Volver al catálogo</a>
    </main>
    ${renderFooter("../")}
  `;
  initCartUI(root, "../", productsData);
} else {
  // ── Include an additional stylesheet if the product requires it ─────────────────
  if (product.extraStylesheet) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = product.extraStylesheet;
    document.head.appendChild(link);
  }

  document.title = `${product.name} — Google Store`;

  root.innerHTML = `
    ${renderNav(product.navCategory, "../")}
    <main>
      ${renderProductDetail(product, "../")}
    </main>
    ${renderFooter("../")}
  `;

  initCartUI(root, "../", productsData);

  const heroImage = document.getElementById("hero-image");

  if (product.thumbnails.length > 0) {
    const thumbnailsContainer = document.querySelector(".thumbnails");

    thumbnailsContainer.addEventListener("click", (e) => {
      const thumbDiv = e.target.closest("div[data-src]");
      if (!thumbDiv) return;

      heroImage.src = thumbDiv.dataset.src;
      heroImage.alt = thumbDiv.querySelector("img").alt;

      thumbnailsContainer
        .querySelectorAll("div")
        .forEach((div) => div.classList.remove("active"));
      thumbDiv.classList.add("active");
    });
  }

  if (product.colorSelectorType === "card") {
    const watchColors = document.querySelector(".watch-colors");

    watchColors.addEventListener("click", (e) => {
      const label = e.target.closest("label[data-image]");
      if (!label) return;

      heroImage.src = label.dataset.image;
      heroImage.alt = label.querySelector("img").alt;
    });
  }

  if (product.colorSelectorType === "swatch") {
    const colorInputs = document.querySelectorAll('.colors input[name="color"]');
    const selectedInput = document.querySelector('.colors input[name="color"]:checked');

    applySwatchPreview(selectedInput, heroImage);

    colorInputs.forEach((input) => {
      input.addEventListener("change", () => {
        applySwatchPreview(input, heroImage);
      });
    });
  }
}
