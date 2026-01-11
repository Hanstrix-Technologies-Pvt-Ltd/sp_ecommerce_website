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
    title: "Stack-Parken",
    subtitle: "Smarte Autoparklösungen für jede Fläche",
    hero: { src: "/assets/products/stack-parking/hero.webp" },
    summary:
      "Stack-Parksysteme sind eine innovative Lösung, die den vertikalen Raum optimal nutzt, indem ein Auto mithilfe hydraulischer Hebebühnen über einem anderen geparkt wird. Ideal für Wohnanlagen, Büros und Gewerbeflächen mit begrenzter Grundfläche verdoppeln diese Systeme die Parkkapazität effektiv – ohne zusätzliches Land zu benötigen. Einfach zu bedienen und kosteneffizient bietet Stack-Parken eine praktische Möglichkeit, urbanes Parken mit hoher Dichte effizient zu managen.",
    features: [
      "Platzsparend – Verdoppelt die Parkkapazität vertikal und nutzt kompakte urbane Flächen optimal.",
      "Kosteneffizient – Reduziert den Flächenverbrauch und die gesamten Baukosten deutlich.",
      "Einfache Bedienung – Einfache, benutzerfreundliche Mechanik für mühelosen Zugang.",
      "Anpassbar – Flexibles Design für unterschiedlichste Standortlayouts und Fahrzeugtypen.",
      "Wartungsarm – Robuste Komponenten mit minimalem Instandhaltungsbedarf.",
    ],
    applications: [
      "Wohnanlagen & Gated Communities",
      "Gewerbekomplexe & Bürogebäude",
      "Einkaufszentren & Retailflächen",
      "Krankenhäuser & Bildungseinrichtungen",
      "Hotels & Kongresszentren",
      "⁠Verkehrsknotenpunkte wie Flughäfen & Bahnhöfe",
      "Öffentliche Parkplätze & kommunale Flächen",
      "Autohäuser & Servicebetriebe",
    ],
    gallery: [
      { src: "/assets/products/stack-parking/gallery1.webp" },
      { src: "/assets/products/stack-parking/gallery2.webp" },
    ],
    // ONLY the one product that has a brochure should include this
    brochureUrl: "/assets/stack-parking-brochure.pdf",
    seo: {
      description: "Zwei-Ebenen-Stacker mit hydraulischem Hub, verdoppelt die Stellplaetze fuer Wohn- und Gewerbeobjekte.",
      keywords: ["stack parking", "mechanical parking", "two-post stacker"],
      image: "/assets/products/stack-parking/hero.webp",
    },
  }),

  make({
    id: 2,
    category: "stack",
    slug: "3-level-stack-parking",
    title: "3-Ebenen-Stack-Parken",
    subtitle: "Smarte Autoparklösungen für jede Fläche",
    hero: { src: "/assets/products/3-level-stack-parking/hero.webp" },
    summary:
      "⁠Ein 3-Ebenen-Stack-Parksystem ist eine hochmoderne vertikale Parklösung, die für maximale Flächeneffizienz in dicht bebauten urbanen Gebieten entwickelt wurde. Es ermöglicht, drei Fahrzeuge übereinander zu parken – mithilfe starker mechanischer Hebebühnen und Plattformen, die von hydraulischen oder motorgetriebenen Systemen bewegt werden. Perfekt für Gewerbekomplexe, Wohnanlagen, Einkaufszentren und Bürogebäude erhöht es die Parkkapazität, ohne die Grundstücksfläche zu vergrößern.",
    features: [
      "Dreifache Kapazität – Nutzt drei vertikal gestapelte Plattformen und erhöht die Kapazität im selben Raum um das Dreifache.",
      "Automatisiertes Parken – Fahrzeuge werden automatisch über Hydrauliksysteme auf verschiedenen Ebenen positioniert.",
      "Vertikales Heben – Hebt Fahrzeuge je nach Konfiguration auf die oberste, mittlere oder die Bodenebene.",
      "Anpassbar – Flexibles Design für unterschiedlichste Standortlayouts und Fahrzeugtypen.",
      "Wartungsarm – Robuste Komponenten mit minimalem Instandhaltungsbedarf.",
    ],
    applications: [
      "Wohnanlagen & Gated Communities",
      "Gewerbekomplexe & Bürogebäude",
      "Einkaufszentren & Retailflächen",
      "Krankenhäuser & Bildungseinrichtungen",
      "Hotels & Kongresszentren",
      "⁠Verkehrsknotenpunkte wie Flughäfen & Bahnhöfe",
      "Öffentliche Parkplätze & kommunale Flächen",
      "Autohäuser & Servicebetriebe",
    ],
    gallery: [
      { src: "/assets/products/3-level-stack-parking/gallery1.webp" },
      { src: "/assets/products/3-level-stack-parking/gallery2.webp" },
    ],
    seo: {
      description: "Drei-Ebenen-Stacker fuer hohe Dichte, verdreifacht die Kapazitaet auf gleicher Flaeche.",
      keywords: ["3 level stack parking", "mechanical parking", "three-post stacker"],
      image: "/assets/products/3-level-stack-parking/hero.webp",
    },
  }),

  make({
    id: 3,
    category: "stack",
    slug: "pit-stacker",
    title: "Gruben-Stacker",
    subtitle: "Unterirdischen Raum nutzen mit Gruben-Stacker-Parksystemen",
    hero: { src: "/assets/products/pit-stacker/hero.webp" },
    summary:
      "Der 2-Ebenen-Gruben-Stacker ist ein kompaktes und effizientes Parksystem, das zwei Autos vertikal parkt, indem eine unterirdische Grube genutzt wird. Ein Fahrzeug wird unterirdisch abgestellt, während das andere auf Bodenniveau verbleibt – ideal für Wohn- und Gewerbeflächen mit Höhenbeschränkungen. Das Design sorgt dafür, dass die Oberfläche bündig und frei bleibt, wenn die untere Plattform leer ist. Beide Fahrzeuge sind unabhängig zugänglich, sodass keines bewegt werden muss, um das andere herauszufahren.",
    features: [
      "Unterirdische Installation – Nutzt den Raum unter der Oberfläche, um die Kapazität zu verdoppeln oder zu verdreifachen.",
      "Diskret & platzsparend – Hält das geparkte Fahrzeug verborgen und erhält die Oberfläche für andere Zwecke.",
      "Unabhängiger oder abhängiger Zugriff – In Konfigurationen verfügbar, passend zu Nutzung und Zugriffshäufigkeit.",
      "Sanfter Betrieb – Hydraulisch oder elektromechanisch mit Sicherheitsverriegelungen.",
      "Individuelle Konfigurationen – Angepasste Tiefe, Hubhöhe und Plattformgrößen nach Standortanforderungen.",
      "Robust & wartungsarm – Korrosionsbeständige Komponenten für langfristige Performance.",
    ],
    applications: [
      "Luxusresidenzen & Villen mit begrenzter Freifläche",
      "Urbane Apartmentgebäude mit Bedarf an Untergeschoss-Parken",
      "Unternehmenssitze & Gewerbetürme",
      "Retail-Komplexe & Einkaufszentren",
      "Krankenhäuser, Institutionen & Bildungscampi",
      "Hochhäuser mit unterirdischen Parkkonzepten",
      "Private Garagen & Showrooms mit erhöhten Präsentationsanforderungen",
    ],
    gallery: [
      { src: "/assets/products/pit-stacker/gallery1.webp" },
      { src: "/assets/products/pit-stacker/gallery2.webp" },
    ],
    seo: {
      description: "Zwei-Ebenen-Pit-Stacker mit unterirdischer Ebene, spart Bauhoehe und haelt die Oberflaeche frei.",
      keywords: ["pit stacker", "mechanical parking", "two-post pit stacker"],
      image: "/assets/products/pit-stacker/hero.webp",
    },
  }),

  make({
    id: 4,
    category: "stack",
    slug: "3-level-pit-stacker",
    title: "3-Ebenen-Gruben-Stacker",
    subtitle: "Unterirdischen Raum nutzen mit Gruben-Stacker-Parksystemen",
    hero: { src: "/assets/products/3-level-pit-stacker/hero.webp" },
    summary:
      "Der 3-Ebenen-Gruben-Stacker ist eine smarte hydraulische Parklösung, mit der drei Autos auf dem Platz von einem geparkt werden können – ein Fahrzeug auf Bodenniveau und zwei darunter in einer Grube. Entwickelt für effiziente Flächennutzung, ist er ideal für Wohnanlagen, Gewerbeimmobilien und Premium-Entwicklungen mit begrenzter Oberfläche. Das System arbeitet sanft und sicher, benötigt nur minimale Wartung und fügt sich ohne Einbußen bei der Ästhetik nahtlos in die Umgebung ein. Eine zuverlässige High-Density-Lösung für Entwickler und Nutzer, die Komfort und Flächenoptimierung schätzen.",
    features: [
      "Grubenkonzept – Drei gestapelte Plattformen, wobei jede Plattform in übereinanderliegenden Gruben positioniert ist, optimieren den vertikalen Raum und reduzieren den Flächenbedarf.",
      "Vertikales Stapeln – Fahrzeuge werden über einen automatisierten Hebe- und Senkmechanismus auf einer der drei Ebenen abgestellt.",
      "Unabhängiger oder abhängiger Zugriff – In Konfigurationen verfügbar, passend zu Nutzung und Zugriffshäufigkeit.",
      "Automatisierter Mechanismus – Hydraulische oder mechanische Systeme heben und senken die Plattformen für automatisches Parken und Abrufen.",
      "Individuelle Konfigurationen – Angepasste Tiefe, Hubhöhe und Plattformgrößen nach Standortanforderungen.",
      "Robust & wartungsarm – Korrosionsbeständige Komponenten für langfristige Performance.",
    ],
    applications: [
      "Luxusresidenzen & Villen mit begrenzter Freifläche",
      "Urbane Apartmentgebäude mit Bedarf an Untergeschoss-Parken",
      "Unternehmenssitze & Gewerbetürme",
      "Retail-Komplexe & Einkaufszentren",
      "Krankenhäuser, Institutionen & Bildungscampi",
      "Hochhäuser mit unterirdischen Parkkonzepten",
      "Private Garagen & Showrooms mit erhöhten Präsentationsanforderungen",
    ],
    gallery: [
      { src: "/assets/products/3-level-pit-stacker/gallery1.webp" },
      { src: "/assets/products/3-level-pit-stacker/gallery2.webp" },
    ],
    seo: {
      description: "Drei-Ebenen-Pit-Stacker mit zwei Ebenen im Grubenbereich fuer maximale Dichte.",
      keywords: ["3 level pit stacker", "mechanical parking", "three-post pit stacker"],
      image: "/assets/products/3-level-pit-stacker/hero.webp",
    },
  }),

  make({
    id: 5,
    category: "stack",
    slug: "cantilever-parking",
    title: "Kragarm-Parken",
    subtitle: "Klares Design mit Kragarm-Parklösungen",
    hero: { src: "/assets/products/cantilever-parking/hero.webp" },
    summary:
      "Das Kragarm-Parksystem ist eine moderne mechanische Parklösung, die erhöhtes Abstellen von Fahrzeugen ermöglicht – ohne Säulen oder Stützkonstruktionen darunter. Über eine auskragende Plattform, die an einem Ende getragen wird, entsteht darunter ein klarer, offener Raum – ideal für Bereiche, in denen die Bodenfläche frei bleiben muss. Der geringe Platzbedarf, die strukturelle Effizienz und die ästhetische Wirkung machen es perfekt für Wohn-, Gewerbe- und Industrieanwendungen. Ob kompakte Einfahrt, begrenzter Kellerraum oder stark frequentierter Gewerbestandort: Das Kragarm-Parksystem maximiert die Parkkapazität, ohne Zugänglichkeit oder Design zu beeinträchtigen.",
    features: [
      "Säulenfreies Design – Freier Raum unter dem Fahrzeug für einfachen Zugang oder Doppelnutzung.",
      "Flächeneffizientes Layout – Optimiert für schmale oder beengte Standorte, an denen klassische Stützen unpraktisch sind.",
      "Robuste Struktur – Entwickelt mit hochfesten Materialien für Stabilität, Langlebigkeit und Tragfähigkeit.",
      "Sanfter Betrieb – Optional hydraulisches oder mechanisches Heben für zuverlässige Fahrzeugbewegung.",
      "Wartungsarm – Korrosionsbeständige Komponenten und vereinfachte Mechanik für langfristige Nutzung.",
      "Architektonisch ansprechend – Ideal für Objekte mit Anspruch auf einen cleanen, modernen Look und smarte Funktion.",
    ],
    applications: [
      "Wohnhäuser & Villen mit kompakten Einfahrten",
      "Industrieanlagen & Lagerbereiche",
      "Showrooms & Servicezentren mit erhöhtem Präsentationsparken",
      "Urbane Revitalisierungsprojekte mit kreativen Parklayouts",
    ],
    gallery: [
      { src: "/assets/products/cantilever-parking/gallery1.webp" },
      { src: "/assets/products/cantilever-parking/hero.webp" },
    ],
    seo: {
      description: "Kragarm-Parken ohne Stuetzen unter der Plattform, ideal fuer schlanke, saubere Grundrisse.",
      keywords: ["cantilever parking", "mechanical parking", "two-post cantilever"],
      image: "/assets/products/cantilever-parking/hero.webp",
    },
  }),

  make({
    id: 6,
    category: "puzzle",
    slug: "puzzle-parking",
    title: "Puzzle-Parken",
    subtitle: "Parkkapazität erhöhen mit Puzzle-Parksystemen",
    hero: { src: "/assets/products/puzzle-parking/hero.webp" },
    summary:
      "Ein 2-Ebenen-Puzzle-Parksystem ist eine halbautomatische, flächenoptimierende Lösung, um mehrere Fahrzeuge effizient auf kleiner Grundfläche zu parken. Es nutzt ein Raster aus horizontalen und vertikalen Plattformen, die sich wie ein Puzzle unabhängig bewegen, und ermöglicht einfachen Zugriff auf Fahrzeuge, ohne andere zu verschieben. Im Vergleich zu konventionellem Parken kann es auf derselben Fläche doppelt so viele Autos aufnehmen und eignet sich ideal für Wohnanlagen, Gewerbeimmobilien, Hotels und Büros. Es ist flexibel und funktional ausgelegt und unterstützt unterschiedliche Fahrzeuggrößen – inklusive Limousinen und SUVs. Mit minimalen baulichen Maßnahmen und schneller Installation ist es eine bevorzugte Wahl für urbane Projekte mit Platzmangel. Sensoren, Sicherheitsverriegelungen und Überlastschutz sorgen für einen reibungslosen und sicheren Betrieb.",
    features: [
      "Puzzle-Design – Zwei vertikal gestapelte Plattformen, wobei jede Plattform horizontal verfahren kann, um Platz zum Parken oder Abrufen zu schaffen.",
      "Unabhängiges Parken – Jedes Fahrzeug ist zugänglich, ohne andere zu verschieben – weniger Wartezeit.",
      "Zeitsparender Betrieb – Automatisierte oder halbautomatisierte Steuerung für schnelleres Ein- und Ausparken.",
      "Sicher & geschützt – Erweiterte Sicherheitsfunktionen mit Absturzsicherung und kontrolliertem Zugang.",
      "Individuelle Konfigurationen – Skalierbare Layouts für Keller, freie Grundstücke oder mehrgeschossige Strukturen.",
    ],
    applications: [
      "Urbane Wohnanlagen & Housing Societies",
      "Unternehmensbüros & Business Parks",
      "Einkaufszentren & Mixed-Use-Projekte",
      "Krankenhäuser & institutionelle Gebäude",
      "Hotels, Resorts & Kongresszentren",
      "Öffentliche & private mehrstöckige Parkanlagen",
      "Bahnhöfe, Flughäfen & Metro-Terminals",
      "Autohäuser & Premium-Garagen",
    ],
    gallery: [
      { src: "/assets/products/puzzle-parking/gallery1.webp" },
      { src: "/assets/products/puzzle-parking/gallery2.webp" },
    ],
    seo: {
      description: "Zwei-Ebenen-Puzzle-System mit horizontal beweglichen Plattformen fuer unabhaengigen Zugriff.",
      keywords: ["puzzle parking", "mechanical parking", "two-post puzzle"],
      image: "/assets/products/puzzle-parking/hero.webp",
    },
  }),

  make({
    id: 7,
    category: "puzzle",
    slug: "pit-puzzle",
    title: "Pit Puzzle",
    subtitle: "Doppelte Effizienz mit platzsparendem Pit-Puzzle-Parken",
    hero: { src: "/assets/products/pit-puzzle/hero.webp" },
    summary:
      "Pit-Puzzle-Parks ysteme sind innovative, halbautomatische unterirdische Parklösungen, die die Vorteile des vertikalen Stapelns und des horizontalen Verschiebens kombinieren und so den Raum sowohl über als auch unter der Geländeoberkante nutzen. Entwickelt für Grundstücke mit begrenzter Oberfläche, ermöglichen diese Systeme effizientes Parken, ohne die sichtbare Architektur des Gebäudes zu verändern. Ideal für hochwertige Wohngebäude, Bürokomplexe und Gewerbeimmobilien – Pit-Puzzle-Parken sorgt für eine sichere, flächenoptimierte Fahrzeugverwaltung.",
    features: [
      "Nutzung unterirdischer Flächen – Erhöht die Parkkapazität durch die Nutzung von Untergeschossen, ohne sichtbare Flächen zu belegen.",
      "Unabhängiger Zugriff – Jedes Fahrzeug kann unabhängig geparkt und abgerufen werden, ohne andere verschieben zu müssen.",
      "Intelligente Automatisierung – Halbautomatischer Betrieb für schnelles, komfortables und zuverlässiges Parken.",
      "Ästhetischer Vorteil – Erhält die Optik auf Geländeebene, da das System unterirdisch verborgen bleibt.",
      "Anpassbare Layouts – Konfigurierbar für unterschiedliche Tiefenstufen und standortspezifische Einschränkungen.",
    ],
    applications: [
      "Hochwertige Wohnanlagen & Hochhäuser",
      "Städtische Bürogebäude & IT-Parks",
      "Einkaufszentren & Mixed-Use-Entwicklungen",
      "Krankenhäuser & Institutionelle Campusgelände",
      "Luxushotels & Gewerbetürme",
      "Untergeschoss- und unterirdische öffentliche Parkanlagen",
      "Platzbeschränkte innerstädtische Grundstücke",
      "Showrooms & Unternehmenszentralen",
    ],
    gallery: [
      { src: "/assets/products/pit-puzzle/gallery1.webp" },
      { src: "/assets/products/pit-puzzle/hero.webp" },
    ],
    seo: {
      description: "Zwei-Ebenen-Pit-Puzzle mit einer Ebene im Untergrund und horizontaler Verschiebung fuer unabhaengigen Zugriff.",
      keywords: ["Pit Puzzle", "mechanisches Parken", "Zwei-Säulen-Pit-Puzzle"],
      image: "/assets/products/pit-puzzle/hero.webp",
    },
  }),


  make({
    id: 8,
    category: "puzzle",
    slug: "3-level-pit-puzzle",
    title: "3-Ebenen-Gruben-Puzzle",
    subtitle: "Doppelte Effizienz dank platzsparendem Gruben-Puzzle-Parken",
    hero: { src: "/assets/products/3-level-pit-puzzle/hero.webp" },
    summary:
      "Das 3-Ebenen-Gruben-Puzzle-Parksystem ist eine fortschrittliche, vollautomatische Lösung, die die Parkkapazität auf engstem Raum maximiert. Fahrzeuge können auf drei vertikalen Ebenen geparkt werden – eines auf Bodenniveau und zwei darunter in der Grube – während die horizontale Puzzle-Bewegung ein flexibles Abrufen ermöglicht, ohne andere Fahrzeuge zu stören. Dadurch ist es hocheffizient für Wohnanlagen, Gewerbeprojekte, Hotels und urbane Entwicklungen, bei denen Platz besonders wertvoll ist. Das System vereint Sicherheit, Komfort und eine sanfte hydraulische Bedienung bei minimalem Wartungsbedarf. Eine moderne High-Density-Lösung für Entwickler und Nutzer, die smarte, platzsparende Alternativen zum traditionellen Parken suchen.",
    features: [
      "Grubenkonzept – Zwei gestapelte Parkplattformen, wobei eine in einer Grube unter der anderen platziert ist, maximieren den vertikalen Raum ohne zusätzliche Oberfläche zu beanspruchen.",
      "Unabhängiger Zugriff – Jedes Fahrzeug kann unabhängig geparkt und abgerufen werden, ohne andere zu verschieben.",
      "Smarte Automatisierung – Halbautomatisierter Betrieb für schnelles, komfortables und zuverlässiges Parken.",
      "Ästhetischer Vorteil – Erhält die Optik auf Bodenniveau, da das System unterirdisch verborgen bleibt.",
      "Anpassbare Layouts – Konfigurierbar für verschiedene Tiefenstufen und Standortbedingungen.",
    ],
    applications: [
      "Premium-Apartments & Hochhäuser",
      "Urbane Bürogebäude & IT-Parks",
      "Einkaufszentren & Mixed-Use-Projekte",
      "Krankenhäuser & institutionelle Campusse",
      "Luxushotels & Gewerbetürme",
      "Untergeschoss- und unterirdische öffentliche Parkanlagen",
      "Platzkritische urbane Grundstücke",
      "Showrooms & Unternehmenszentralen",
    ],
    gallery: [
      { src: "/assets/products/3-level-pit-puzzle/gallery1.webp" },
      { src: "/assets/products/3-level-pit-puzzle/gallery2.webp" },
    ],
    seo: {
      description: "Drei-Ebenen-Pit-Puzzle mit zwei Ebenen im Untergrund und automatischen Verschiebungen.",
      keywords: ["3-level pit puzzle", "mechanical parking", "three-post pit puzzle"],
      image: "/assets/products/3-level-pit-puzzle/hero.webp",
    },
  }),

  make({
    id: 9,
    category: "puzzle",
    slug: "op-01",
    title: "OP -01",
    subtitle: "Parkkapazität erhöhen mit Puzzle-Parksystemen",
    hero: { src: "/assets/products/op-01/hero.webp" },
    summary:
      "Puzzle-Parksysteme sind halbautomatische Parklösungen, die entwickelt wurden, um die Fahrzeugkapazität in beengten urbanen Räumen zu maximieren. Über eine gitterartige Struktur mit vertikaler und horizontaler Bewegung können mehrere Fahrzeuge unabhängig geparkt und abgerufen werden, ohne andere Autos zu bewegen. Perfekt für hochverdichtete Bereiche wie Apartments, Büros und Gewerbezentren bietet Puzzle-Parken eine smarte, flächeneffiziente Alternative zum konventionellen Parken.",
    features: [
      "Hohe Flächeneffizienz – Optimiert die Parkfläche durch vertikale und horizontale Fahrzeugbewegung.",
      "Unabhängiges Parken – Jedes Fahrzeug ist zugänglich, ohne andere zu verschieben – weniger Wartezeit.",
      "Zeitsparender Betrieb – Automatisierte oder halbautomatisierte Steuerung für schnelleres Ein- und Ausparken.",
      "Sicher & geschützt – Erweiterte Sicherheitsfunktionen mit Absturzsicherung und kontrolliertem Zugang.",
      "Individuelle Konfigurationen – Skalierbare Layouts für Keller, freie Grundstücke oder mehrgeschossige Strukturen.",
    ],
    applications: [
      "Urbane Wohnanlagen & Housing Societies",
      "Unternehmensbüros & Business Parks",
      "Einkaufszentren & Mixed-Use-Projekte",
      "Krankenhäuser & institutionelle Gebäude",
      "Hotels, Resorts & Kongresszentren",
      "Öffentliche & private mehrstöckige Parkanlagen",
      "Bahnhöfe, Flughäfen & Metro-Terminals",
      "Autohäuser & Premium-Garagen",
    ],
    gallery: [
      { src: "/assets/products/op-01/gallery1.webp" },
      { src: "/assets/products/op-01/gallery2.webp" },
    ],
    seo: {
      description: "Semi-automatische Puzzle-Plattform mit flexiblen Layouts fuer urbane Projekte.",
      keywords: ["op-01", "mechanical parking", "op-01 puzzle"],
      image: "/assets/products/op-01/hero.webp",
    },
  }),

  make({
    id: 10,
    category: "automatic",
    slug: "car-hoist",
    title: "Autoaufzug",
    subtitle: "Fahrzeugbewegung verbessern mit smarten Autoaufzug-Lösungen",
    hero: { src: "/assets/products/car-hoist/hero.webp" },
    summary:
      "Autoaufzug-Systeme sind vertikale Hebemechanismen, die Fahrzeuge zwischen verschiedenen Ebenen transportieren und häufig in mehrgeschossigen Gebäuden mit begrenztem Rampenplatz eingesetzt werden. Sie bieten eine sichere, flächeneffiziente Alternative zu traditionellen Rampen und ermöglichen nahtlose Fahrzeugbewegung in Wohn-, Gewerbe- und Industrieanwendungen. Ideal für Untergeschosse, Dächer oder Zwischenebenen sorgt der Autoaufzug für einen reibungslosen und zuverlässigen Fahrzeugtransfer auf kleiner Grundfläche.",
    features: [
      "Systemüberblick – Autoaufzug-Parksysteme heben Fahrzeuge vertikal, um sie auf erhöhten Plattformen zu parken. So wird Parken auf mehreren Ebenen ohne Rampen oder große Freiflächen möglich.",
      "Flächenoptimierung – Eliminierung von Rampen, wodurch wertvolle Nutzfläche erhalten bleibt.",
      "Heavy-Duty-Design – Ausgelegt für unterschiedliche Fahrzeuggewichte mit robusten Hubmechanismen.",
      "Sicherheit garantiert – Mit fortschrittlichen Sicherheitsfunktionen wie Verriegelungen, Sensoren und Absturzsicherungen.",
      "Individuelle Konfiguration – Verfügbar in verschiedenen Größen, Kapazitäten und Oberflächen passend zum Standort.",
    ],
    applications: [
      "Wohnvillen & Premium-Apartments mit Untergeschoss-Parken",
      "Gewerbegebäude & Bürokomplexe",
      "Autohäuser & Servicezentren",
      "Einkaufszentren & Mixed-Use-Türme",
      "Industriewarenlager mit Fahrzeugzugang",
      "Hotels & Hochhausentwicklungen",
      "Private Garagen mit mehrstöckigen Parkanforderungen",
      "Immobilienprojekte mit Dach- oder unterirdischem Parken",
    ],
    gallery: [
      { src: "/assets/products/car-hoist/gallery1.webp" },
      { src: "/assets/products/car-hoist/gallery2.webp" },
    ],
    seo: {
      description: "Autoaufzug fuer vertikalen Fahrzeugtransport zwischen Ebenen ohne Rampen.",
      keywords: ["car hoist", "mechanical parking", "automatic"],
      image: "/assets/products/car-hoist/hero.webp",
    },
  }),

  make({
    id: 11,
    category: "automatic",
    slug: "rotary",
    title: "Rotary",
    subtitle: "Zugang revolutionieren mit mehrstöckiger Rotary-Parktechnologie",
    hero: { src: "/assets/products/rotary/hero.webp" },
    summary:
      "Das Rotary-Autoparksystem ist eine vertikale, platzsparende Lösung, bei der mehrere Autos auf kleiner Grundfläche geparkt werden, indem Fahrzeuge in einer kreisförmigen Bewegung rotieren. Es ist darauf ausgelegt, 6 bis 16 Autos (oder mehr, je nach Konfiguration) aufzunehmen und nutzt begrenzte Bodenfläche optimal, während die Parkkapazität maximiert wird. Jedes Auto kann durch automatisierte Rotation sanft geparkt oder abgerufen werden – ohne andere Fahrzeuge bewegen zu müssen. Ideal für Wohnanlagen, Gewerbekomplexe, Hotels und urbane Stadtzentren, in denen Grundstückskosten und Platzmangel zentrale Herausforderungen sind. Eine moderne, effiziente und wartungsarme Lösung, die Komfort, Sicherheit und smarte vertikale Flächennutzung vereint.",
    features: [
      "Flächenoptimierung – Parkt 6 bis 16 Autos auf der Stellfläche von nur 2 Autos.",
      "Vertikaler Rotationsmechanismus – Riesenrad-ähnliche Rotation für automatisiertes Parken & Abrufen",
      "Schnelle Abrufzeit – Fahrzeugzugang in 90–120 Sekunden.",
      "Benutzerfreundliche Bedienung – Steuerung per Fernbedienung oder Touchpanel mit präzisen Sicherheitssensoren.",
      "Anpassbare Ausführung – Verschiedene Größen, Tragfähigkeiten und Oberflächen passend zum Standort.",
      "Wartungsarm – Robuste, witterungsbeständige Materialien für langfristige Performance.",
    ],
    applications: [
      "Gewerbekomplexe & Büros – Hochverdichtetes Parken für Mitarbeitende und Besucher.",
      "Einkaufszentren & Multiplexe – Hoher Besucherandrang bei minimaler Flächennutzung.",
      "Autohäuser & Präsentationsflächen von Händlern",
      "Event-Locations & Bankettsäle mit kontrollierten Parkzonen",
      "Behörden oder Institutionen mit Platzbeschränkungen",
      "Gewerbegebäude & Corporate Parks",
    ],
    gallery: [
      { src: "/assets/products/rotary/hero.webp" },
      { src: "/assets/products/rotary/gallery2.webp" },
    ],
    seo: {
      description: "Rotationssystem zur vertikalen Speicherung vieler Fahrzeuge auf kleiner Grundflaeche.",
      keywords: ["rotary", "mechanical parking", "automatic"],
      image: "/assets/products/rotary/hero.webp",
    },
  }),

  make({
    id: 12,
    category: "automatic",
    slug: "turn-table",
    title: "Drehteller",
    subtitle: "Zugang revolutionieren mit Drehteller-Parktechnologie",
    hero: { src: "/assets/products/turn-table/hero.webp" },
    summary:
      "Das Drehteller-Autoparksystem ist eine smarte, platzsparende Innovation, die Fahrzeuge in engen Räumen mühelos dreht. Es ermöglicht, Autos um 180 oder 360 Grad auf der Stelle zu drehen, sodass kompliziertes Rückwärtsfahren oder mehrmaliges Rangieren entfällt. Ideal für Luxusresidenzen, gewerbliche Einfahrten, Showrooms und hochverdichtete Parkzonen verleiht dieses System jeder Immobilie Funktionalität und Eleganz. Ob schmale Zufahrten, beengte Untergeschosse oder kleiner Wendekreis: Das Drehteller-System sorgt für sanftes, effizientes Manövrieren – mit Stil.",
    features: [
      "360°-Fahrzeugrotation – Dreht das Auto in den gewünschten Winkel und ermöglicht einfaches Ein- und Ausfahren.",
      "Platzsparendes Design – Perfekt für kleine Grundstücke, Garagen im Untergeschoss und eingeschränkte Parkbereiche.",
      "Elegante Optik – Fügt sich nahtlos in moderne Architektur und hochwertige Objekte ein.",
      "Benutzerfreundliche Bedienung – Steuerung per Fernbedienung oder Touchpanel mit präzisen Sicherheitssensoren.",
      "Anpassbare Ausführung – Verschiedene Größen, Tragfähigkeiten und Oberflächen passend zum Standort.",
      "Wartungsarm – Robuste, witterungsbeständige Materialien für langfristige Performance.,"
    ],
    applications: [
      "Luxusvillen & Privathäuser mit engen Einfahrten",
      "Wohnanlagen mit begrenztem Wendekreis",
      "Autohäuser & Präsentationsflächen von Händlern",
      "Event-Locations & Bankettsäle mit kontrollierten Parkzonen",
      "Behörden oder Institutionen mit Platzbeschränkungen",
      "Gewerbegebäude & Corporate Parks",
    ],
    gallery: [
      { src: "/assets/products/turn-table/gallery1.webp" },
      { src: "/assets/products/turn-table/hero.webp" },
    ],
    seo: {
      description: "Drehteller rotiert Fahrzeuge um 180/360 Grad fuer enge Zufahrten und Showrooms.",
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
