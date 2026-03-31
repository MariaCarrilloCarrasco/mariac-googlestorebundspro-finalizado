export const productsData = [
  {
    id: "pixel-buds-pro",
    name: "Google Pixel Buds Pro",
    category: "Music & Sound",
    price: "229 €",
    deliveryDate: "29 Apr",
    deliveryZip: "08023",
    navCategory: "Earbuds",

    cardImage: {
      src: "earbuds/earbuds_01.png",
      alt: "Google Pixel Buds Pro",
    },

    heroImage: {
      src: "earbuds/earbuds_01.png",
      alt: "Google Pixel Buds Pro - vista frontal con estuche abierto",
    },

    thumbnails: [
      {
        src: "earbuds/earbuds_01.png",
        alt: "Google Pixel Buds Pro - vista frontal con estuche abierto",
      },
      {
        src: "earbuds/earbuds_02.png",
        alt: "Google Pixel Buds Pro - vista lateral",
      },
      {
        src: "earbuds/earbuds_03.png",
        alt: "Google Pixel Buds Pro - auricular derecho",
      },
      {
        src: "earbuds/earbuds_04.png",
        alt: "Google Pixel Buds Pro - estuche cerrado",
      },
    ],

    colorSelectorType: "swatch",
    colors: [
      {
        id: "color-blue",
        cssClass: "swatch-blue",
        checked: true,
        name: "Fog",
        previewFilter: "hue-rotate(0deg) saturate(1) brightness(1)",
        previewBackground: "#eff3f8",
      },
      {
        id: "color-gray-light",
        cssClass: "swatch-gray-light",
        name: "Porcelain",
        previewFilter: "grayscale(0.15) brightness(1.08) sepia(0.08)",
        previewBackground: "#f4f1ed",
      },
      {
        id: "color-dark",
        cssClass: "swatch-dark",
        name: "Charcoal",
        previewFilter: "grayscale(0.8) brightness(0.68) contrast(1.1)",
        previewBackground: "#e8eaed",
      },
      {
        id: "color-gray",
        cssClass: "swatch-gray",
        name: "Mist",
        previewFilter: "grayscale(0.55) brightness(0.96) contrast(1.02)",
        previewBackground: "#edf1f4",
      },
      {
        id: "color-green",
        cssClass: "swatch-green",
        name: "Lemongrass",
        previewFilter: "sepia(0.35) saturate(1.15) hue-rotate(18deg) brightness(1.02)",
        previewBackground: "#f1f5e4",
      },
      {
        id: "color-red",
        cssClass: "swatch-red",
        name: "Coral",
        previewFilter: "sepia(0.55) saturate(1.3) hue-rotate(320deg) brightness(0.98)",
        previewBackground: "#f7ece8",
      },
    ],

    extraStylesheet: null,
  },

  {
    id: "fitbit-inspire-3",
    name: "Fitbit Inspire 3",
    category: "Health & Fitness Tracker",
    price: "99,95 €",
    deliveryDate: "29 Apr",
    deliveryZip: "08023",
    navCategory: "Watches",

    cardImage: {
      src: "smartwatch/smartwatch_black.png",
      alt: "Fitbit Inspire 3",
    },

    heroImage: {
      src: "smartwatch/smartwatch_black.png",
      alt: "Fitbit Inspire 3 - Midnight Zen",
    },

    thumbnails: [],

    colorSelectorType: "card",
    colors: [
      {
        id: "color-midnight",
        cssClass: "swatch-midnight",
        label: "Midnight<br>Zen",
        image: "smartwatch/smartwatch_black.png",
        checked: true,
      },
      {
        id: "color-lilac",
        cssClass: "swatch-lilac",
        label: "Lilac<br>Bliss",
        image: "smartwatch/smartwatch_pink.png",
      },
      {
        id: "color-morning",
        cssClass: "swatch-morning",
        label: "Morning<br>Glow",
        image: "smartwatch/smartwatch_yellow.png",
      },
    ],

    extraStylesheet: "../styles/watches-style.css",
  },
];
