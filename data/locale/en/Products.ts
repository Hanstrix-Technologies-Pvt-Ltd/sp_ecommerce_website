// data/Products.ts

/** Base route (you’re using /portfolios) */
export const ROUTE_BASE = "/portfolios";

/** Types */
export type ProductCategory = "stack" | "puzzle" | "automatic";

export interface ProductRecord {
  id: number;
  category: ProductCategory;          // "stack" | "puzzle" | "automatic"
  slug: string;                       // e.g. "stack-parking"
  path: string;                       // e.g. "/portfolios/stack/stack-parking"
  title: string;                      // H1
  subtitle: string;                   // REQUIRED — between hero and summary
  hero: { src: string; alt?: string };
  summary: string;
  features: string[];                 // bullets
  applications: string[];             // bullets
  gallery: { src: string; alt?: string }[]; // usually 2 images
  brochureUrl?: string;                        // ONLY the one page that has a brochure
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;                   // og:image fallback to hero
  };
}

/** Helper to auto-generate canonical path */
const make = (r: Omit<ProductRecord, "path">): ProductRecord => ({
  ...r,
  path: `${ROUTE_BASE}/${r.category}/${r.slug}`,
});

/** =========================================================
 *  MASTER LIST — start with ONE sample; duplicate to add others
 *  ========================================================= */
export const PRODUCTS: ProductRecord[] = [
  make({
    id: 1,
    category: "stack",
    slug: "stack-parking",
    title: "Stack Parking",
    subtitle: "Smart Car Parking Solutions for Every Space",
    hero: { src: "/assets/products/stack-parking/hero.webp" },
    summary:
      "Stack parking systems are an innovative solution that maximizes vertical space by allowing one car to be parked above another using hydraulic lifts. Ideal for residential complexes, offices, and commercial spaces with limited ground area, these systems effectively double parking capacity without requiring additional land. Easy to operate and cost-effective, stack parking offers a practical way to manage high-density urban parking efficiently.",
    features: [
        "Space Saving – Doubles parking capacity vertically, making the most of compact urban spaces.",
        "Cost Effective – Significantly reduces land usage and overall construction expenses.",
        "Easy Operation – Designed with a simple, user-friendly mechanism for hassle-free access.",
        "Customizable – Flexible design adaptable to a wide range of site layouts and vehicle types.",
        "Low Maintenance – Built with durable components requiring minimal upkeep.",
    ],
    applications: [
        "Residential Apartments & Gated Communities",
        "Commercial Complexes & Office Buildings",
        "Shopping Malls & Retail Centers",
        "Hospitals & Educational Institutions",
        "Hotels & Convention Centers",
        "⁠Transport Hubs like Airports & Railway Stations",
        "Public Parking Lots & Municipal Spaces",
        "Automobile Showrooms & Service Stations",
    ],
    gallery: [
        { src: "/assets/products/stack-parking/gallery1.webp" },
        { src: "/assets/products/stack-parking/gallery2.webp" },
    ],
    // ONLY the one product that has a brochure should include this
    brochureUrl: "/assets/stack-parking-brochure.pdf",
        seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["stack parking", "mechanical parking", "two-post stacker"],
        image: "/assets/products/stack-parking/hero.webp",
    },
  }),

  make({
    id: 2,
    category: "stack",
    slug: "3-level-stack-parking",
    title: "3-level Stack Parking",
    subtitle: "Smart Car Parking Solutions for Every Space",
    hero: { src: "/assets/products/3-level-stack-parking/hero.webp" },
    summary:
      "⁠A 3-level stack parking system is a cutting-edge vertical parking solution designed to maximize space efficiency in high-density urban areas. It allows three vehicles to be parked one above the other, using strong mechanical lifts and platforms supported by hydraulic or motor-driven systems. Perfect for commercial complexes, apartments, malls, and office buildings, it multiplies parking capacity without increasing the plot size.",
    features: [
        "Triple Capacity – Utilizes three vertically stacked platforms, increasing parking capacity threefold in the same space.",
        "Automated Parking – Vehicles are moved automatically using hydraulic systems to park on different levels.",
        "Vertical Lifting – The system can lift cars to the uppermost level, middle level, or ground level based on the parking configuration.",
        "Customizable – Flexible design adaptable to a wide range of site layouts and vehicle types.",
        "Low Maintenance – Built with durable components requiring minimal upkeep.",
    ],
    applications: [
        "Residential Apartments & Gated Communities",
        "Commercial Complexes & Office Buildings",
        "Shopping Malls & Retail Centers",
        "Hospitals & Educational Institutions",
        "Hotels & Convention Centers",
        "⁠Transport Hubs like Airports & Railway Stations",
        "Public Parking Lots & Municipal Spaces",
        "Automobile Showrooms & Service Stations",
    ],
    gallery: [
        { src: "/assets/products/3-level-stack-parking/gallery1.webp" },
        { src: "/assets/products/3-level-stack-parking/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["3 level stack parking", "mechanical parking", "three-post stacker"],
        image: "/assets/products/3-level-stack-parking/hero.webp",
    },
  }),

  make({
    id: 3,
    category: "stack",
    slug: "pit-stacker",
    title: "Pit Stacker",
    subtitle: "Unlock Underground Space with Pit Stacker Parking Systems",
    hero: { src: "/assets/products/pit-stacker/hero.webp" },
    summary:
      "The 2-Level Pit Stacker is a compact and efficient parking system that allows two cars to be parked vertically by utilizing a below-ground pit. One vehicle is parked underground while the other remains at surface level, making it ideal for residential and commercial spaces with height constraints. The design ensures that when the lower platform is vacant, the surface remains flush and open. Both vehicles can be accessed independently, eliminating the need to move one to retrieve the other.",
    features: [
        "Underground Installation – Makes use of below-ground space to double or triple parking capacity.",
        "Discreet & Space-Saving – Keeps the parked vehicle hidden, preserving surface area for other purposes.",
        "Independent or Dependent Access – Available in configurations to suit usage needs and access frequency.",
        "Smooth Operation – Operated via hydraulic or electro-mechanical systems with safety interlocks.",
        "Custom Configurations – Tailored depth, lifting height, and platform sizes to suit site requirements.",
        "Durable & Low Maintenance – Constructed with corrosion-resistant components for long-term performance.",
    ],
    applications: [
        "Luxury Residences & Villas with Limited Open Space",
        "Urban Apartment Buildings with Basement Parking Needs",
        "Corporate Offices & Commercial Towers",
        "Retail Complexes & Shopping Centers",
        "Hospitals, Institutions & Educational Campuses",
        "High-Rise Buildings with Subterranean Parking Designs",
        "Private Garages & Showrooms with Elevated Display Requirements",
    ],
    gallery: [
        { src: "/assets/products/pit-stacker/gallery1.webp" },
        { src: "/assets/products/pit-stacker/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["pit stacker", "mechanical parking", "two-post pit stacker"],
        image: "/assets/products/pit-stacker/hero.webp",
    },
  }),

  make({
    id: 4,
    category: "stack",
    slug: "3-level-pit-stacker",
    title: "3-level Pit Stacker",
    subtitle: "Unlock Underground Space with Pit Stacker Parking Systems",
    hero: { src: "/assets/products/3-level-pit-stacker/hero.webp" },
    summary:
      "The 3-Level Pit Stacker is a smart hydraulic car parking solution that enables three cars to be parked in the space of one – with one vehicle at ground level and two positioned below in a pit. Designed for efficient space utilization, it is ideal for residential complexes, commercial buildings, and premium developments where surface area is limited. The system offers smooth and safe operation, requires minimal maintenance, and blends seamlessly into the surroundings without affecting aesthetics. It is a reliable, high-density parking solution for developers and end-users who value convenience and space optimization.",
    features: [
        "Pit Design – The system features three stacked platforms, with each platform being positioned in pits beneath each other, optimizing vertical space while reducing land usage.",
        "Vertical Stacking – Vehicles are stored on one of the three levels—upper, middle, or lower—through an automated lifting and lowering mechanism.",
        "Independent or Dependent Access – Available in configurations to suit usage needs and access frequency.",
        "Automated Mechanism – The system uses hydraulic or mechanical systems to lift and lower the parking platforms, allowing cars to be parked or retrieved automatically.",
        "Custom Configurations – Tailored depth, lifting height, and platform sizes to suit site requirements.",
        "Durable & Low Maintenance – Constructed with corrosion-resistant components for long-term performance.",
    ],
    applications: [
        "Luxury Residences & Villas with Limited Open Space",
        "Urban Apartment Buildings with Basement Parking Needs",
        "Corporate Offices & Commercial Towers",
        "Retail Complexes & Shopping Centers",
        "Hospitals, Institutions & Educational Campuses",
        "High-Rise Buildings with Subterranean Parking Designs",
        "Private Garages & Showrooms with Elevated Display Requirements",
    ],
    gallery: [
        { src: "/assets/products/3-level-pit-stacker/gallery1.webp" },
        { src: "/assets/products/3-level-pit-stacker/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["3 level pit stacker", "mechanical parking", "three-post pit stacker"],
        image: "/assets/products/3-level-pit-stacker/hero.webp",
    },
  }),

  make({
    id: 5,
    category: "stack",
    slug: "cantilever-parking",
    title: "Canilever Parking",
    subtitle: "Achieve Clean Design with Cantilever Parking Solutions",
    hero: { src: "/assets/products/cantilever-parking/hero.webp" },
    summary:
      "The Cantilever Parking System is a modern mechanical parking solution designed to offer elevated vehicle storage without the need for columns or support structures beneath. Using a cantilevered platform supported from one end, this system provides a clean, open space below—ideal for areas where ground access must be kept clear. Its minimal footprint, structural efficiency, and aesthetic appeal make it perfect for residential, commercial, and industrial applications. Whether you're dealing with a compact driveway, limited basement space, or a high-traffic commercial site, the Cantilever Parking System maximizes parking capacity without compromising accessibility or design.",
    features: [
        "Column-Free Design – Provides unobstructed space below the parked vehicle for ease of access or dual usage.",
        "Space-Efficient Layout – Optimized for narrow or congested sites where traditional supports are impractical.",
        "Robust Structure – Engineered with high-tensile materials for strength, durability, and load-bearing performance.",
        "Smooth Operation – Available with hydraulic or mechanical lifting for reliable, easy vehicle movement.",
        "Low Maintenance – Built with corrosion-resistant components and a simplified mechanism for long-term use.",
        "Architecturally Appealing – Ideal for properties that require a clean, modern look with smart utility.",

    ],
    applications: [
        "Residential Homes & Villas with Compact Driveways",
        "Industrial Facilities & Warehouse Zones",
        "Showrooms & Service Centers Requiring Elevated Display Parking",
        "Urban Redevelopment Projects Needing Creative Parking Layouts",
    ],
    gallery: [
        { src: "/assets/products/cantilever-parking/gallery1.webp" },
        { src: "/assets/products/cantilever-parking/hero.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["cantilever parking", "mechanical parking", "two-post cantilever"],
        image: "/assets/products/cantilever-parking/hero.webp",
    },
  }),

  make({
    id: 6,
    category: "puzzle",
    slug: "puzzle-parking",
    title: "Puzzle Parking",
    subtitle: "Enhance Parking Capacity with Puzzle Parking Systems",
    hero: { src: "/assets/products/puzzle-parking/hero.webp" },
    summary:
      "A 2-level puzzle parking system is a semi-automatic, space-optimizing solution designed to efficiently park multiple cars in a compact footprint. It features a grid of horizontal and vertical platforms that move independently like a puzzle, allowing easy access to parked vehicles without shifting others. This system can accommodate twice the number of cars in the same area as conventional parking and is ideal for residential complexes, commercial buildings, hotels, and office spaces. Designed for both flexibility and functionality, it supports a wide range of car sizes including sedans and SUVs. With minimal civil work and fast installation, it’s a preferred choice for urban projects with space constraints. The system is equipped with sensors, safety locks, and overload protection to ensure smooth and secure operation.",
    features: [
        "Puzzle Design – The system uses two vertically stacked platforms, with each platform able to move horizontally to create space for vehicles to be parked or retrieved.",
        "Independent Parking – Each vehicle can be accessed without shifting others, reducing waiting time.",
        "Time-Saving Operation – Automated or semi-automated controls for faster entry and retrieval.",
        "Safe & Secure – Enhanced safety features with anti-fall devices and controlled access.",
        "Custom Configurations – Scalable layouts to fit basements, open plots, or multi-floor structures.",

    ],
    applications: [
        "Urban Residential Complexes & Housing Societies",
        "Corporate Offices & Business Parks",
        "Shopping Malls & Mixed-Use Developments",
        "Hospitals & Institutional Buildings",
        "Hotels, Resorts & Convention Centers",
        "Public & Private Multi-Level Parking Facilities",
        "Railway Stations, Airports & Metro Terminals",
        "Automotive Dealerships & High-End Garages",
    ],
    gallery: [
        { src: "/assets/products/puzzle-parking/gallery1.webp" },
        { src: "/assets/products/puzzle-parking/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["puzzle parking", "mechanical parking", "two-post puzzle"],
        image: "/assets/products/puzzle-parking/hero.webp",
    },
  }),

  make({
    id: 7,
    category: "puzzle",
    slug: "3-level-pit-puzzle",
    title: "3-level Pit Puzzle",
    subtitle: "Double Efficiency with Space-Saving Pit Puzzle Parking",
    hero: { src: "/assets/products/3-level-pit-puzzle/hero.webp" },
    summary:
      "The 3-Level Pit Puzzle Parking System is an advanced, fully automatic solution designed to maximize parking capacity in tight spaces. It allows cars to be parked on three vertical levels, with one at ground level and two below in the pit, while the horizontal puzzle movement enables flexible car retrieval without disturbing other vehicles. This makes it highly efficient for residential complexes, commercial projects, hotels, and urban developments where space is at a premium. The system combines safety, convenience, and smooth hydraulic operation with minimal maintenance requirements. It is a modern, high-density parking solution for developers and users seeking smarter, space-saving alternatives to traditional parking.",
    features: [
        "Pit Design – Features two stacked parking platforms, with one placed in a pit below the other, maximizing vertical space without occupying additional surface area.",
        "Independent Access – Allows each vehicle to be parked and retrieved independently, without shifting others.",
        "Smart Automation – Semi-automated operation ensures quick, convenient, and reliable parking.",
        "Aesthetic Advantage – Maintains surface-level aesthetics by keeping the system hidden underground.",
        "Customizable Layouts – Can be configured for various depth levels and site constraints.",
    ],
    applications: [
        "Premium Residential Apartments & High-Rises",
        "Urban Office Buildings & IT Parks",
        "Shopping Complexes & Mixed-Use Developments",
        "Hospitals & Institutional Campuses",
        "Luxury Hotels & Commercial Towers",
        "Basement and Subterranean Public Parking Facilities",
        "Space-Constrained Urban Plots",
        "Showrooms & Corporate Headquarters",
    ],
    gallery: [
        { src: "/assets/products/3-level-pit-puzzle/gallery1.webp" },
        { src: "/assets/products/3-level-pit-puzzle/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["3-level pit puzzle", "mechanical parking", "three-post pit puzzle"],
        image: "/assets/products/3-level-pit-puzzle/hero.webp",
    },
  }),

  make({
    id: 8,
    category: "puzzle",
    slug: "op-01",
    title: "OP -01",
    subtitle: "Enhance Parking Capacity with Puzzle Parking Systems",
    hero: { src: "/assets/products/op-01/hero.webp" },
    summary:
      "Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.",
    features: [
        "High Space Efficiency – Optimizes parking area by enabling both vertical and horizontal car movement.",
        "Independent Parking – Each vehicle can be accessed without shifting others, reducing waiting time.",
        "Time-Saving Operation – Automated or semi-automated controls for faster entry and retrieval.",
        "Safe & Secure – Enhanced safety features with anti-fall devices and controlled access.",
        "Custom Configurations – Scalable layouts to fit basements, open plots, or multi-floor structures.",
    ],
    applications: [
        "Urban Residential Complexes & Housing Societies",
        "Corporate Offices & Business Parks",
        "Shopping Malls & Mixed-Use Developments",
        "Hospitals & Institutional Buildings",
        "Hotels, Resorts & Convention Centers",
        "Public & Private Multi-Level Parking Facilities",
        "Railway Stations, Airports & Metro Terminals",
        "Automotive Dealerships & High-End Garages",
    ],
    gallery: [
        { src: "/assets/products/op-01/gallery1.webp" },
        { src: "/assets/products/op-01/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["op-01", "mechanical parking", "op-01 puzzle"],
        image: "/assets/products/op-01/hero.webp",
    },
  }),

  make({
    id: 9,
    category: "automatic",
    slug: "car-hoist",
    title: "Car Hoist",
    subtitle: "Elevate Vehicle Movement with Smart Car Hoist Solutions",
    hero: { src: "/assets/products/car-hoist/hero.webp" },
    summary:
      "Car Hoist Systems are vertical lifting mechanisms designed to transport vehicles between different floor levels, commonly used in multi-level buildings with limited ramp space. These systems provide a safe, space-efficient alternative to traditional ramps, enabling seamless vehicle movement in residential, commercial, and industrial applications. Ideal for basements, rooftops, or mezzanine-level parking, Car Hoists ensure smooth and reliable car transfer in compact footprints.",
    features: [
        "System Overview – Car hoist parking systems are mechanical systems that lift vehicles vertically to park them on elevated platforms. These systems allow for parking on multiple levels without the need for ramps or large open spaces.",
        "Space Optimization – Eliminates the need for ramps, preserving valuable floor area.",
        "Heavy-Duty Design – Built to handle various vehicle weights with robust lifting mechanisms.",
        "Safety Assured – Equipped with advanced safety features including interlocks, sensors, and anti-fall devices.",
        "Customizable Configuration – Available in multiple sizes, capacities, and finishes to match specific site needs.",
    ],
    applications: [
        "Residential Villas & Premium Apartments with Basement Parking",
        "Commercial Buildings & Office Complexes",
        "Automobile Showrooms & Service Centers",
        "Shopping Malls & Mixed-Use Towers",
        "Industrial Warehouses with Vehicle Access Needs",
        "Hotels & High-Rise Developments",
        "Private Garages with Multi-Level Parking Requirements",
        "Real Estate Projects with Rooftop or Subterranean Parking",
    ],
    gallery: [
        { src: "/assets/products/car-hoist/gallery1.webp" },
        { src: "/assets/products/car-hoist/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["car hoist", "mechanical parking", "automatic"],
        image: "/assets/products/car-hoist/hero.webp",
    },
  }),

  make({
    id: 10,
    category: "automatic",
    slug: "rotary",
    title: "Rotary",
    subtitle: "Revolutionize Access with Multi-Level Rotary Parking Technology",
    hero: { src: "/assets/products/rotary/hero.webp" },
    summary:
      "The Rotary Car Parking System is a vertical, space-saving solution that allows multiple cars to be parked in a compact footprint by rotating vehicles in a circular motion. Designed to accommodate 6 to 16 cars (or more, depending on configuration), it makes use of limited ground space while maximizing parking capacity. Each car can be parked or retrieved smoothly with automated rotation, without the need to move other vehicles. This system is ideal for residential societies, commercial complexes, hotels, and urban city centers where land cost and space are major constraints. It is a modern, efficient, and low-maintenance solution that combines convenience, safety, and smart use of vertical space.",
    features: [
        "Space Optimization – Parks 6 to 16 cars in the footprint of just 2 cars.",
        "Vertical Rotation Mechanism – Ferris wheel-style rotation for automated parking & retrieval",
        "Fast Retrieval Time – Car access in 90–120 seconds.",
        "User-Friendly Operation – Operated by remote control or touch panel with precision safety sensors.",
        "Customizable Build – Available in various sizes, load capacities, and finishes to match site-specific needs.",
        "Low Maintenance – Built with durable, weather-resistant materials ensuring long-term performance.",
    ],
    applications: [
        "Commercial Complexes & Offices – To provide high-density parking for employees and visitors.",
        "Shopping Malls & Multiplexes – To handle heavy footfall with minimal land usage.",
        "Automobile Showrooms & Dealership Display Areas",
        "Event Venues & Banquet Halls with Controlled Parking Zones",
        "Government or Institutional Buildings with Space Constraints",
        "Commercial Buildings & Corporate Parks",
    ],
    gallery: [
        { src: "/assets/products/rotary/hero.webp" },
        { src: "/assets/products/rotary/gallery2.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["rotary", "mechanical parking", "automatic"],
        image: "/assets/products/rotary/hero.webp",
    },
  }),

  make({
    id: 11,
    category: "automatic",
    slug: "turn-table",
    title: "Turn Table",
    subtitle: "Revolutionize Access with Turntable Parking Technology",
    hero: { src: "/assets/products/turn-table/hero.webp" },
    summary:
      "The Turntable Car Parking System is a smart, space-saving innovation designed to rotate vehicles effortlessly in tight spaces. It allows cars to be turned 180 or 360 degrees in place, eliminating the need for complicated reversing or multi-point turns. Ideal for luxury residences, commercial driveways, showrooms, and high-density parking zones, this system adds both functionality and sophistication to any property. Whether you're working with narrow access points, confined basements, or limited turning radii, the Turntable System ensures smooth, efficient maneuvering — with style.",
    features: [
        "360° Vehicle Rotation – Rotates the car to any desired angle, enabling easy entry and exit.",
        "Space-Saving Design – Perfect for small plots, basement garages, and restricted parking areas.",
        "Elegant Aesthetic – Seamlessly blends with modern architecture and high-end property designs.",
        "User-Friendly Operation – Operated by remote control or touch panel with precision safety sensors.",
        "Customizable Build – Available in various sizes, load capacities, and finishes to match site-specific needs.",
        "Low Maintenance – Built with durable, weather-resistant materials ensuring long-term performance.,"
    ],
    applications: [
        "Luxury Villas & Private Homes with Tight Driveways",
        "Residential Complexes with Limited Turning Radius",
        "Automobile Showrooms & Dealership Display Areas",
        "Event Venues & Banquet Halls with Controlled Parking Zones",
        "Government or Institutional Buildings with Space Constraints",
        "Commercial Buildings & Corporate Parks",
    ],
    gallery: [
        { src: "/assets/products/turn-table/gallery1.webp" },
        { src: "/assets/products/turn-table/hero.webp" },
    ],
    seo: {
        title: "Stack Parking | STELZ Multiparking",
        description: "Double capacity with a compact, reliable stacker system.",
        keywords: ["turn table", "mechanical parking", "automatic"],
        image: "/assets/products/turn-table/hero.webp",
    },
  }),

];

/** Convenience lookups (use later in layout/page) */
export const PRODUCT_BY_PATH = new Map<string, ProductRecord>(
  PRODUCTS.map((p) => [p.path, p])
);
export const PRODUCT_BY_KEY = new Map<string, ProductRecord>(
  PRODUCTS.map((p) => [`${p.category}/${p.slug}`, p])
);

/** Grouped lists (useful for sidebars/menus later) */
export const PRODUCT_SIDENAV = {
  stack: PRODUCTS.filter((p) => p.category === "stack").map((p) => ({ title: p.title, path: p.path })),
  puzzle: PRODUCTS.filter((p) => p.category === "puzzle").map((p) => ({ title: p.title, path: p.path })),
  automatic: PRODUCTS.filter((p) => p.category === "automatic").map((p) => ({ title: p.title, path: p.path })),
} as const;

/** Getters (for page generation later) */
export const allProducts = () => PRODUCTS.slice();
export const allProductParams = () =>
  PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
export const getProduct = (category: ProductCategory, slug: string) =>
  PRODUCT_BY_KEY.get(`${category}/${slug}`) || null;
