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
      { id: "color-blue", cssClass: "swatch-blue", checked: true },
      { id: "color-gray-light", cssClass: "swatch-gray-light" },
      { id: "color-dark", cssClass: "swatch-dark" },
      { id: "color-gray", cssClass: "swatch-gray" },
      { id: "color-green", cssClass: "swatch-green" },
      { id: "color-red", cssClass: "swatch-red" },
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
