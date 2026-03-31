import { productsData } from "./config/productsData.js";
import { renderNav } from "./scripts/components/nav.js";
import { renderFooter } from "./scripts/components/footer.js";
import { renderProductCard } from "./scripts/components/productCard.js";
import { welcomeMessageText } from "./scripts/components/welcomeMessage.js";
import { initCartUI } from "./scripts/cart/cartController.js";

const root = document.getElementById("root");

function renderWelcomeMessage() {
  return `
    <section id="welcome-message-section" class="welcome-frame" aria-label="Mensaje de bienvenida">
      <h2 class="welcome-title">Mensaje de bienvenida</h2>
      <p class="welcome-box">${welcomeMessageText}</p>
    </section>
  `;
}

root.innerHTML = `
  ${renderNav(null, "./")}
  ${renderWelcomeMessage()}

  <main class="home-main">
    <section class="home-copy" aria-label="Google Store introduction">
      <p class="home-eyebrow">Google Store</p>
      <h1 class="home-title">Dispositivos pensados para tu día a día</h1>
      <p class="home-subtitle">
        Descubre nuestros earbuds y smartwatches con una presentación limpia,
        imágenes reales del producto, tipografía Inter y una composición visual
        inspirada en el ejercicio original de Google Store.
      </p>
    </section>

    <section class="card_container" aria-label="Product catalogue">
      ${productsData.map(renderProductCard).join("")}
    </section>
  </main>

  ${renderFooter("./")}
`;

initCartUI(root, "./", productsData);

root.addEventListener("click", (event) => {
  if (event.target.closest(".add_to_cart")) {
    return;
  }

  const article = event.target.closest("article[data-href]");
  if (!article) {
    return;
  }

  window.location.href = article.dataset.href;
});