# Google Store — Figma to Code Exercise

Responsive Google Store replica built from a Figma design. Features a product catalogue, persistent shopping cart, and mobile-friendly navigation.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Background

Practical exercise from the [Factoria F5](https://factoriaf5.org/) bootcamp, aimed at translating a Figma design into real code using semantic HTML5, mobile-first CSS3, and vanilla JavaScript with ES modules.

The project replicates the experience of a Google online store: product listing, individual product detail pages, quantity selector, shopping cart with `localStorage` persistence, and a functional hamburger menu on mobile.

## Install

The project uses ES modules (`type="module"`), so it cannot be opened directly as a local file — it requires an HTTP server.

**With VS Code:**

```bash
git clone https://github.com/Adriasu09/02-Ejercicio-Google-Store.git
cd 02-Ejercicio-Google-Store
# Open with the Live Server extension (right-click → Open with Live Server)
```

**With Node.js:**

```bash
git clone https://github.com/Adriasu09/02-Ejercicio-Google-Store.git
cd 02-Ejercicio-Google-Store
npx serve .
```

No production dependencies or build steps required.

## Usage

Open `index.html` from the local server. From there you can:

- **Browse** to each product detail page (Earbuds or Smartwatch)
- **Select a quantity** using the selector before adding to the cart
- **Manage the cart** from the navbar dropdown: adjust quantities, clear the cart, or go to checkout
- **Open the navigation menu** on mobile by tapping the hamburger icon

The cart persists across pages and reloads via `localStorage`.

## Project Structure

```
02-Ejercicio-Google-Store/
├── index.html                  # Homepage — product catalogue
├── index.js                    # JS entry point (homepage)
├── assets/
│   ├── icons/                  # SVGs and UI icons
│   └── img/
│       ├── earbuds/            # Google Pixel Buds Pro images
│       └── smartwatch/         # Fitbit Inspire 3 images
├── config/
│   └── productsData.js         # Product catalogue data
├── pages/
│   └── product.html            # Product detail page
├── scripts/
│   ├── cart/
│   │   ├── cartController.js   # Cart UI events and logic
│   │   └── cartService.js      # Cart CRUD and localStorage
│   ├── components/
│   │   ├── nav.js              # Navbar and mobile menu
│   │   ├── footer.js           # Footer
│   │   ├── productCard.js      # Product card (homepage)
│   │   ├── productDetail.js    # Product detail view
│   │   └── cartDropdown.js     # Cart dropdown
│   └── product.js              # JS entry point (product detail page)
└── styles/
    ├── style.css               # Global styles (mobile-first)
    ├── cart.css                # Cart and dropdown styles
    └── product.css             # Product detail page styles
```

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic structure and accessibility (ARIA) |
| CSS3 | Custom properties, Flexbox, Grid, mobile-first media queries |
| JavaScript (ES Modules) | Cart, dynamic navigation, persistence |
| localStorage | Cart persistence across pages and sessions |
| Google Fonts — Inter | Typography |

**Breakpoints:**

| Range | Behaviour |
|-------|-----------|
| `< 768px` | Single column, hamburger menu |
| `768px – 1023px` | Nav links visible, partial two-column layout |
| `≥ 1024px` | Two columns, thumbnail gallery, side purchase panel |

## Contributing

This repository follows a feature branch workflow:

```
main ← develop ← feature/your-feature
```

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code. No direct commits. |
| `develop` | Integration branch. No direct commits. |
| `feature/*` | Personal working branch. |

**Daily workflow:**

```bash
# 1. Switch to your branch
git checkout feature/your-feature

# 2. Sync with the latest changes
git pull origin develop

# 3. Make your changes...

# 4. Commit
git add <files>
git commit -m "feat(scope): brief description"

# 5. Push and open a Pull Request targeting develop
git push origin feature/your-feature
```

**Commit convention** — [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(cart): add quantity selector support
fix(nav): close mobile menu on link click
style(footer): fix icon alignment on mobile
refactor(cartService): extract parsePrice helper
```

Contributions are welcome. Open a Pull Request against `develop` with a clear title and description.

## License

Project created for educational purposes as part of the [Factoria F5](https://factoriaf5.org/) bootcamp curriculum. No distribution license.
