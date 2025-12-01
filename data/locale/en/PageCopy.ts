export const pageCopy = {
  common: {
    homeLabel: "stelzparking.com",
  },
  services: {
    metadata: {
      title: "Services | STELZ Multiparking | Parking Solutions & Support",
      description:
        "Explore STELZ Multiparking's comprehensive parking services including installation, maintenance, consulting, and 24/7 support for mechanical parking systems.",
      keywords: [
        "parking services",
        "parking solutions",
        "parking installation",
        "parking maintenance",
        "parking consulting",
      ],
      canonical: "/services",
      ogImage: "/assets/backgrounds/services.webp",
    },
    header: {
      title: "Services",
      breadcrumb: "Services",
      watermark: "SERVICES",
      label: "Services",
      headline: "What We Offer",
      background: "/assets/backgrounds/services.webp",
    },
    contactSidebar: {
      title: "Have any Question?",
      body: "We'd love to hear from you.",
      placeholders: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        place: "Your Place Name",
        message: "Message",
      },
      cta: "Send Message",
    },
  },
  clients: {
    metadata: {
      title: "Our Clients | STELZ Multiparking | Trusted Partners",
      description:
        "Discover the trusted clients and partners who rely on STELZ Multiparking's innovative automated parking systems. Read real testimonials and success stories.",
      keywords: ["STELZ clients", "parking clients", "client testimonials", "parking partners", "case studies"],
      canonical: "/clients",
      ogImage: "/assets/home/Logo.webp",
    },
    header: {
      title: "Our Clients",
      breadcrumb: "Our Clients",
    },
    partners: {
      label: "Partners",
      title: "Partners Who Trust Stelz",
      body:
        "We take pride in collaborating with industry leaders who trust Stelz Parking for innovative and reliable car parking solutions. Our partnerships reflect a shared commitment to quality, efficiency, and long-term value across every project.",
    },
    testimonials: {
      label: "Testimonials",
      title: "Real Stories. Real Satisfaction.",
      ctaLabel: "More Reviews",
    },
  },
  home: {
    footprint: {
      title: "STELZ Footprint",
      carSpaces: "Car Spaces",
      location: "Location",
    },
  },
  productPage: {
    labels: {
      features: "Product Features",
      gallery: "Gallery",
      applications: "Applications",
      brochure: "Download datasheet",
    },
  },
  contact: {
    metadata: {
      title: "Contact Us | STELZ Multiparking | Get in Touch",
      description:
        "Contact STELZ Multiparking for inquiries about automated parking systems, installations, and services. Reach out to our expert team today.",
      keywords: ["contact STELZ", "parking inquiries", "parking consultation", "contact us", "parking support"],
      canonical: "/contact",
      ogImage: "/assets/home/Logo.webp",
    },
    header: { title: "Contact Us", breadcrumb: "Contact" },
    form: {
      title: "Get in Touch",
      placeholders: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone",
        message: "Write Here...",
      },
      cta: "Send Message",
    },
  },
  gallery: {
    metadata: {
      title: "Gallery | STELZ Multiparking | Project Showcase",
      description:
        "View our impressive gallery of mechanical parking systems, installations, and projects. Explore STELZ Multiparking's innovative parking solutions in action.",
      keywords: ["parking gallery", "parking projects", "parking portfolio", "parking installations", "parking images"],
      canonical: "/gallery",
      ogImage: "/assets/home/Logo.webp",
    },
    header: { title: "Gallery", breadcrumb: "Gallery" },
  },
  products: {
    metadata: {
      title: "Products | STELZ Parking Systems | Automated Parking Solutions",
      description:
        "Explore STELZ parking products including stackers, pit stackers, puzzle parking, turn tables, car hoists and more. Browse features, photos and case studies.",
      keywords: [
        "parking systems",
        "stack parking",
        "pit stacker",
        "puzzle parking",
        "turn table",
        "car hoist",
        "mechanical parking",
      ],
      canonical: "/products",
      ogImage: "/assets/backgrounds/products.webp",
    },
    header: { title: "Products", breadcrumb: "Products" },
    sidebar: {
      heading: "Our Parking Systems",
      followUs: "Follow Us On",
    },
  },
  about: {
    metadata: {
      title: "About Us | STELZ Multiparking | Innovative Parking Solutions",
      description:
        "Learn about STELZ Multiparking's mission, vision, and commitment to providing innovative, automated parking solutions for modern urban spaces.",
      keywords: ["about STELZ", "parking company", "STELZ mission", "automated parking solutions", "mechanical parking"],
      canonical: "/about",
      ogImage: "/assets/home/Logo.webp",
    },
    header: { title: "About Us", breadcrumb: "Who We Are" },
    tabsLabels: {
      about: "About Us",
      vision: "Our Vision",
      mission: "Our Mission",
    },
  },
  aboutRandD: {
    metadata: {
      title: "Research & Development | STELZ Multiparking | Innovation Lab",
      description:
        "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems and smart urban parking solutions.",
      keywords: ["R&D parking", "parking innovation", "research development", "automatic parking", "parking technology"],
      canonical: "/about/r-and-d",
      ogImage: "/assets/home/Logo.webp",
    },
    header: { title: "R & D", breadcrumb: "R & D" },
  },
  aboutBlog: {
    metadata: {
      title: "Blog | STELZ Multiparking | Parking Innovation Insights",
      description:
        "Read the latest insights, articles, and updates from STELZ Multiparking on smart parking solutions, innovation, and automated parking systems.",
      keywords: ["parking blog", "parking insights", "smart parking", "parking innovation", "mechanical parking news"],
      canonical: "/about/blog",
      ogImage: "/assets/home/Logo.webp",
    },
    header: { title: "Blog", breadcrumb: "Blog" },
  },
} as const;

export type PageCopy = typeof pageCopy;
