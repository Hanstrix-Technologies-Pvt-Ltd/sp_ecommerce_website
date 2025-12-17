export type NavLink = {
  label: string;
  href?: `/${string}` | "/";
  expandable?: boolean;
  children?: readonly NavLink[];
};

export const NAV: NavLink[] = [
  { label: "HOME", href: "/" },

  {
    label: "ABOUT US",
    href: "/about",
    expandable: true,
    children: [
      { label: "WHO WE ARE", href: "/about" },
      { label: "R & D", href: "/about/r-and-d" },
      { label: "BLOG", href: "/about/blog" },
    ],
  },

  { label: "SERVICES", href: "/services" },

  {
    label: "OUR PRODUCTS",
    href: "/products",
    expandable: true,
    children: [
      {
        label: "STACK PARKING",
        expandable: true,
        children: [
          { label: "S-01 TWO LEVEL STACKER", href: "/portfolios/stack/stack-parking" },
          { label: "S-011 THREE LEVEL STACKER", href: "/portfolios/stack/3-level-stack-parking" },
          { label: "PS-11 TWO LEVEL PIT STACKER", href: "/portfolios/stack/pit-stacker" },
          { label: "PS-111 THREE LEVEL PIT STACKER", href: "/portfolios/stack/3-level-pit-stacker" },
          { label: "S-CL-01 CANTILEVER", href: "/portfolios/stack/cantilever-parking" },
        ],
      },
      {
        label: "PUZZLE PARKING",
        expandable: true,
        children: [
          { label: "P-01 TWO LEVEL PUZZLE", href: "/portfolios/puzzle/puzzle-parking" },
          { label: "PP-01 TWO LEVEL PIT PUZZLE", href: "/portfolios/puzzle/pit-puzzle" },
          { label: "PP-02 THREE LEVEL PIT PUZZLE", href: "/portfolios/puzzle/3-level-pit-puzzle" },
          { label: "OP-01 OVER GROUND PUZZLE", href: "/portfolios/puzzle/op-01" },
        ],
      },
      {
        label: "AUTOMATIC",
        expandable: true,
        children: [
          { label: "CAR HOIST", href: "/portfolios/automatic/car-hoist" },
          { label: "ROTARY", href: "/portfolios/automatic/rotary" },
          { label: "TURN TABLE", href: "/portfolios/automatic/turn-table" },
        ],
      },
    ],
  },

  { label: "OUR CLIENTS", href: "/clients" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT US", href: "/contact" },
];

type NavContent = {
  hero: {
    images: string[];
    taglines: string[];
    brand: string;
  };
};

export const content = {
  hero: {
    images: [
      "/assets/home/HeroBg1.webp",
      "/assets/home/HeroBg2.webp",
      "/assets/home/HeroBg3.webp",
    ],
    taglines: [
      "Smarter Parking. Smaller Footprint.",
      "Precision Engineering. Seamless Mobility.",
      "Make Every Square Foot Count.",
    ],
    // brand blue (same family as navbar)
    brand: "#174b92",
  },
} satisfies NavContent;
