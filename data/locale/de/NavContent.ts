export type NavLink = {
  label: string;
  href?: `/${string}` | "/";
  expandable?: boolean;
  children?: readonly NavLink[];
};

type NavContent = {
  hero: {
    images: string[];
    taglines: string[];
    brand: string;
  };
};

export const NAV: NavLink[] = [
  { label: "STARTSEITE", href: "/" },

  {
    label: "ÜBER UNS",
    href: "/about",
    expandable: true,
    children: [
      { label: "WER WIR SIND", href: "/about" },
      { label: "F & E", href: "/about/r-and-d" },
      { label: "BLOG", href: "/about/blog" },
    ],
  },

  { label: "DIENSTLEISTUNGEN", href: "/services" },

  {
    label: "UNSERE PRODUKTE",
    href: "/products",
    expandable: true,
    children: [
      {
        label: "STACK-PARKEN",
        expandable: true,
        children: [
          { label: "S-01 ZWEI-EBENEN-STACKER", href: "/portfolios/stack/stack-parking" },
          { label: "S-011 DREI-EBENEN-STACKER", href: "/portfolios/stack/3-level-stack-parking" },
          { label: "PS-11 ZWEI-EBENEN-GRUBEN-STACKER", href: "/portfolios/stack/pit-stacker" },
          { label: "PS-111 DREI-EBENEN-GRUBEN-STACKER", href: "/portfolios/stack/3-level-pit-stacker" },
          { label: "S-CL-01 KRAGARM", href: "/portfolios/stack/cantilever-parking" },
        ],
      },
      {
        label: "PUZZLE-PARKEN",
        expandable: true,
        children: [
          { label: "P-01 ZWEI-EBENEN-PUZZLE", href: "/portfolios/puzzle/puzzle-parking" },
          { label: "PP-01 ZWEI-EBENEN-GRUBEN-PUZZLE", href: "/portfolios/puzzle/puzzle-parking" },
          { label: "PP-02 DREI-EBENEN-GRUBEN-PUZZLE", href: "/portfolios/puzzle/3-level-pit-puzzle" },
          { label: "OP-01 OBERIRDISCHES PUZZLE", href: "/portfolios/puzzle/op-01" },
        ],
      },
      {
        label: "AUTOMATISCH",
        expandable: true,
        children: [
          { label: "AUTOAUFZUG", href: "/portfolios/automatic/car-hoist" },
          { label: "ROTARY", href: "/portfolios/automatic/rotary" },
          { label: "DREHTELLER", href: "/portfolios/automatic/turn-table" },
        ],
      },
    ],
  },

  { label: "UNSERE KUNDEN", href: "/clients" },
  { label: "GALERIE", href: "/gallery" },
  { label: "KONTAKT", href: "/contact" },
];

export const content = {
  hero: {
    images: [
      "/assets/home/HeroBg1.webp",
      "/assets/home/HeroBg2.webp",
      "/assets/home/HeroBg3.webp",
    ],
    taglines: [
      "Smarteres Parken. Kleinere Fläche.",
      "Präzisionsengineering. Nahtlose Mobilität.",
      "Jeder Quadratfuß zählt.",
    ],
    brand: "#174b92",
  },
} satisfies NavContent;
