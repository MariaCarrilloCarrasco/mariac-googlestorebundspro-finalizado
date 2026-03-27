import { productsData } from "./config/productsData.js";
import { renderNav } from "./scripts/components/nav.js";
import { renderFooter } from "./scripts/components/footer.js";
import { renderProductCard } from "./scripts/components/productCard.js";
import { initCartUI } from "./scripts/cart/cartController.js";

const root = document.getElementById("root");

root.innerHTML = `
  ${renderNav(null, "./")}

  <main>
    <h1>Earbuds & Watches</h1>
    <div class="card_container">
      ${productsData.map(renderProductCard).join("")}
    </div>
  </main>

  ${renderFooter("./")}
`;

initCartUI(root, "./", productsData);

// Event delegation to make <article> links clickable and redirect them to their corresponding product pages.
root.addEventListener("click", (e) => {
  if (e.target.closest(".add_to_cart")) return;
  const article = e.target.closest("article[data-href]");
  if (article) {
    window.location.href = article.dataset.href;
  }
});
