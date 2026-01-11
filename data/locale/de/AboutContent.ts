// data/AboutContent.ts

/** ===========
 *  Types
 *  =========== */
export type RichSegment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string };

export type RichParagraph = RichSegment[];

/** A section inside a tab (heading is optional for “paragraph-only” blocks) */
export interface AboutSection {
  heading?: string;
  paragraphs?: RichParagraph[];
  /** For bulleted lists where the label is bold (e.g., “Design & Engineering”) */
  items?: { label?: string; text: string }[];
}

/** One tab worth of content (About / Vision / Mission) */
export interface TabContent {
  sections: AboutSection[];
}

/** Why-cards under “Why STELZ Multiparking” */
export interface WhyCard {
  id: number;
  icon: string;
  title: string;
  text: string;
}

/** Philosophy section */
export interface PhilosophyStep {
  id: string;
  title: string;
  body: string;
}

export interface PhilosophyContent {
  title: string;
  body: string;
  steps: PhilosophyStep[];
}

/** Top intro block */
export interface IntroContent {
  title: string;
  paragraphs: RichParagraph[];
}

/** Master shape to export */
export interface AboutContentFile {
  intro: IntroContent;
  tabs: {
    about: TabContent;
    vision: TabContent;
    mission: TabContent;
  };
  why: {
    title: string;
    cards: WhyCard[];
  };
  philosophy: PhilosophyContent;
}

/** ===========
 *  Content
 *  =========== */
export const ABOUT_CONTENT: AboutContentFile = {
  /* --------------------------- INTRO (white bg) --------------------------- */
  intro: {
    title: "WILLKOMMEN BEI STELZ MULTIPARKING",
    paragraphs: [
      [
        {
          type: "text",
          text:
            "STELZ Parking ist ein führender Spezialist für die Planung, Lieferung, Fertigung, Installation, Prüfung, Inbetriebnahme und Wartung fortschrittlicher mechanischer Parksysteme für Autos. Mit einem klaren Fokus auf Innovation, Qualität und Zuverlässigkeit liefern wir modernste Lösungen, die die urbane Mobilität verbessern, indem sie Parkflächen optimal nutzen und zugleich Komfort sowie Effizienz für moderne Städte gewährleisten. Mit Hauptsitz in Bengaluru, Karnataka, hat unser Unternehmen eine starke nationale Präsenz aufgebaut und bietet erstklassige Produkte und Dienstleistungen in ganz Indien für eine vielfältige Kundschaft – darunter private Immobilieneigentümer, Gewerbekomplexe und Geschäftspartner. Bei STELZ Parking sind wir stolz darauf, verlässliche und hochwertige Parklösungen bereitzustellen, die nicht nur den aktuellen Anforderungen der Stadtentwicklung gerecht werden, sondern auch neue Maßstäbe in Funktionalität, Nachhaltigkeit und Kundenzufriedenheit setzen."
        }
      ]
    ]
  },

  /* --------------------------- TABS (one component) ---------------------- */
  tabs: {
    /* ============== ABOUT tab ============== */
    about: {
      sections: [
        {
          heading: "Revolutionierung urbaner Parklösungen",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "STELZ Parking steht an der Spitze der mechanischen Parkindustrie in Indien und liefert innovative, platzsparende Lösungen, die den sich wandelnden Herausforderungen der urbanen Mobilität begegnen. Wir haben eine starke nationale Präsenz etabliert und die Parklandschaft in Metropolen sowie in aufstrebenden urbanen Zentren in ganz Indien nachhaltig verändert."
              }
            ]
          ]
        },

        // 2) Our Expertise — has a small lead paragraph and a labeled items list
        {
          heading: "Unsere Expertise",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Als führende Spezialisten für fortschrittliche mechanische Parksysteme bieten wir umfassende End-to-End-Lösungen, darunter:"
              }
            ]
          ],
          items: [
            {
              label: "Planung & Engineering",
              text:
                "Entwicklung maßgeschneiderter Parklösungen, abgestimmt auf individuelle Platzanforderungen und architektonische Rahmenbedingungen."
            },
            {
              label: "Fertigung",
              text:
                "Produktion hochwertiger, zuverlässiger Systeme mit präziser Konstruktion und erstklassigen Materialien."
            },
            {
              label: "Installation",
              text:
                "Fachgerechte Umsetzung mit minimaler Beeinträchtigung der Umgebung."
            },
            {
              label: "Prüfung & Inbetriebnahme",
              text:
                "Strenge Qualitätssicherung für eine optimale Leistung."
            },
            {
              label: "Wartung",
              text:
                "Proaktive Serviceprogramme zur Maximierung der Lebensdauer und der Betriebseffizienz."
            }
          ]
        },

        // 3) Our Commitment — lead paragraph + labeled items
        {
          heading: "Unser Engagement",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Bei STELZ Parking werden wir von einem kompromisslosen Anspruch an Exzellenz in allen Bereichen unseres Handelns angetrieben:"
              }
            ]
          ],
          items: [
            {
              label: "Innovation",
              text:
                "Kontinuierliche Entwicklung modernster Technologien, die neue Branchenstandards setzen."
            },
            {
              label: "Qualität",
              text:
                "Konsequente Qualitätskontrollen während Planung, Fertigung und Installation."
            },
            {
              label: "Zuverlässigkeit",
              text:
                "Systeme, die konstant performen – mit minimalen Ausfallzeiten."
            },
            {
              label: "Nachhaltigkeit",
              text:
                "Parklösungen, die durch effiziente Flächennutzung die Umweltbelastung reduzieren."
            },
            {
              label: "Modernisierung",
              text:
                "Modernisierung bedeutet die Weiterentwicklung bestehender Anwendungen oder deren Migration von traditioneller Architektur auf den neuesten Stand. Dieser Wandel bringt technologische Fortschritte in allen Systembereichen mit sich, einschließlich der Integration neuer Funktionalitäten. Die Umsetzung der Modernisierung sorgt in vielen Bereichen für einen deutlichen Schub."
            },
            {
              label: "Kundenzufriedenheit",
              text:
                "Individueller Service, der Erwartungen übertrifft."
            }
          ]
        },

        // 4) Our Impact — lead paragraph + labeled items
        {
          heading: "Unsere Wirkung",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Unsere fortschrittlichen Parksysteme schaffen spürbare Vorteile, die über die reine Fahrzeugabstellung hinausgehen:"
              }
            ]
          ],
          items: [
            {
              label: "Flächenoptimierung",
              text:
                "Maximierung der Stellplatzkapazität in begrenzten urbanen Räumen."
            },
            {
              label: "Steigerung des Immobilienwerts",
              text:
                "Aufwertung von Wohn- und Gewerbeprojekten durch hochwertige Zusatzangebote."
            },
            {
              label: "Aufwertung des Stadtbilds",
              text:
                "Weniger Straßenstau und eine verbesserte Stadtraumgestaltung."
            },
            {
              label: "Umweltvorteile",
              text:
                "Reduzierte Emissionen durch weniger Suchverkehr."
            },
            {
              label: "Sicherheit & Schutz",
              text:
                "Geschützte Umgebungen für die Fahrzeugaufbewahrung."
            }
          ]
        }
      ]
    },

    /* ============== VISION tab ============== */
    vision: {
      sections: [
        // First block: paragraph only (no heading)
        {
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Bei STELZ Parking sehen wir eine Zukunft, in der urbane Mobilität traditionelle Grenzen überwindet – getragen von intelligenten mechanischen Parksystemen, die Effizienz, Nachhaltigkeit und menschenzentriertes Design vereinen. Während Städte in ganz Indien mit rasanter Urbanisierung und Flächenknappheit kämpfen, ist es unser Ziel, die Parkinfrastruktur neu zu definieren, indem wir Lösungen vorantreiben, die globale Maßstäbe in Innovation, Zuverlässigkeit und Umweltverantwortung setzen. Wir wollen der Impulsgeber für smartere Städte sein, in denen nahtlose Parkerlebnisse Staus reduzieren, CO₂-Emissionen senken und die Lebensqualität in urbanen Räumen verbessern."
              }
            ]
          ]
        },
        // Second block: titled section + paragraph (consistent with About)
        {
          heading: "Strategisches Wachstum & Branchenführerschaft",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Unser Anspruch geht über technologische Weiterentwicklung hinaus – wir wollen unsere Position als Indiens vertrauenswürdigster Partner für transformative Parklösungen festigen. Durch strategische Kooperationen mit Stadtplanern, Architekten und kommunalen Behörden werden wir unsere nationale Präsenz ausbauen und skalierbare Systeme für unterschiedlichste urbane Gegebenheiten bereitstellen. Indem wir in Forschung und Entwicklung investieren und neue Technologien wie KI-gestützte Automatisierung und IoT-basierte Analytik nutzen, entwickeln sich unsere Angebote im Gleichklang mit den dynamischen Anforderungen moderner Städte weiter. Jedes Projekt, das wir umsetzen, ist ein Schritt in Richtung unserer übergeordneten Mission: Städten zu ermöglichen, vertikal, nachhaltig und inklusiv zu wachsen."
              }
            ]
          ]
        }
      ]
    },

    /* ============== MISSION tab ============== */
    mission: {
      sections: [
        {
          heading: "Engagement für Exzellenz & Nachhaltigkeit",
          paragraphs: [
            [
              {
                type: "text",
                text:
                  "Im Zentrum unserer Vision steht ein unerschütterliches Bekenntnis zu Exzellenz. Wir setzen auf präzise Ingenieurskunst und verwenden umweltbewusste Materialien sowie energieeffiziente Prozesse, um Systeme zu liefern, die Betriebskosten und Umweltbelastung minimieren. Durch die Einhaltung globaler Qualitätsstandards und eine Kultur kontinuierlicher Verbesserung stellen wir sicher, dass unsere Lösungen kosteneffizient, langlebig und an zukünftige urbane Herausforderungen anpassbar bleiben. Mit diesem Anspruch möchte STELZ Parking Gemeinschaften stärken, den Immobilienwert erhöhen und zu einem grüneren, lebenswerteren Indien beitragen – ein innovatives Parksystem nach dem anderen."
              }
            ]
          ]
        }
      ]
    }
  },

  /* ---------------------- WHY STELZ (separate component) ------------------ */
  why: {
    title: "Warum STELZ Multiparking",
    cards: [
      {
        id: 1,
        icon: "/assets/aboutUs/1.svg",
        title: "Maßgeschneiderte Konstruktion",
        text:
          "Jedes System wird so konzipiert, dass es zur einzigartigen Standortgeometrie, den Nutzungsanforderungen und den Platzbeschränkungen passt."
      },
      {
        id: 2,
        icon: "/assets/aboutUs/2.svg",
        title: "End-to-End-Lösungen",
        text:
          "Von Planung und Fertigung bis Installation und Support bieten wir vollständige Inhouse-Expertise."
      },
      {
        id: 3,
        icon: "/assets/aboutUs/3.svg",
        title: "Hohe Stückzahlen, hohes Vertrauen",
        text:
          "Mit über 12.000 jährlich installierten Systemen spiegelt unsere Größe Zuverlässigkeit und Kundenzufriedenheit wider."
      },
      {
        id: 4,
        icon: "/assets/aboutUs/4.svg",
        title: "Innovativer F&E-Fokus",
        text:
          "Kontinuierliche Investitionen in Forschung und Entwicklung sichern modernste Technologie und langfristige Leistungsfähigkeit."
      },
      {
        id: 5,
        icon: "/assets/aboutUs/5.svg",
        title: "Kosteneffiziente Performance",
        text:
          "Unsere mechanischen Systeme liefern optimale Funktionalität bei niedrigen Kosten – und damit ein hervorragendes Preis-Leistungs-Verhältnis."
      },
      {
        id: 6,
        icon: "/assets/aboutUs/6.svg",
        title: "Nachweisliche Erfolgsbilanz",
        text:
          "Von führenden Entwicklern und Institutionen geschätzt – unsere Installationen reichen von Wohn- über Gewerbe- bis hin zu Industriesektoren."
      }
    ]
  },

  /* --------------------- PHILOSOPHY (separate component) ------------------ */
  philosophy: {
    title: "Unsere operative Philosophie",
    body:
      "Bei STELZ Parking stehen wir zu unserer Grundüberzeugung: „Serviceorientierung ist erfolgsorientiert.“ Geleitet von dieser Philosophie bieten wir vollständig maßgeschneiderte Lösungen, die auf die individuellen Bedürfnisse jedes Kunden zugeschnitten sind. Unsere automatisierten mehrstöckigen Parksysteme werden mit Blick auf Flexibilität entwickelt und können an die spezifischen baulichen Gegebenheiten sowie die räumlichen Einschränkungen jedes Standorts angepasst werden.\n\nWir verfolgen einen beratenden Ansatz – wir analysieren sorgfältig Kundenanforderungen, Standortlayout und verfügbare Flächen, um die effizienteste und effektivste Parklösung zu liefern. Dieser personalisierte Service wird durch unseren strukturierten Fünf-Schritte-Prozess ermöglicht:",
    steps: [
      {
        id: "01",
        title: "Konzeptentwicklung",
        body:
          "Die Konzeptentwicklung ist die Phase, in der wir die individuellen Anforderungen des Projekts umfassend verstehen, Herausforderungen erkennen und klare Erwartungen definieren. Auf dieser Basis entwerfen wir eine maßgeschneiderte Lösung, die den spezifischen Bedürfnissen des Kunden entspricht und jedes Detail konsequent an den Projektzielen ausrichtet."
      },
      {
        id: "02",
        title: "Konstruktion",
        body:
          "In der Konstruktionsphase werden Ideen zu präzisen technischen Plänen. Wir erstellen detaillierte Layouts und Systemdesigns, die Funktionalität, Sicherheit und Effizienz in Einklang bringen. Jedes Element wird mit höchster Genauigkeit ausgearbeitet, damit die Lösung praxisnah, zuverlässig und für eine reibungslose Umsetzung bereit ist."
      },
      {
        id: "03",
        title: "Fertigung",
        body:
          "Die Fertigung konzentriert sich darauf, Konstruktionen in die Realität zu übertragen, indem hochwertige Komponenten mit Präzision hergestellt werden. Jedes Teil entsteht mit modernen Verfahren und Materialien; strenge Qualitätskontrollen gewährleisten Langlebigkeit, Sicherheit und Leistungsfähigkeit. So erfüllt jede Komponente höchste Standards, bevor sie zur Installation übergeht."
      },
      {
        id: "04",
        title: "Installation",
        body:
          "Die Installation ist die Phase, in der Systeme vor Ort nahtlos und mit fachlicher Präzision integriert werden. Unser professionelles Team sorgt für eine reibungslose Umsetzung unter Einhaltung von Sicherheitsstandards und Projektzeitplänen. Jede Komponente wird ausgerichtet und geprüft, um eine einwandfreie Funktion sicherzustellen – als Grundlage für zuverlässige, langfristige Performance."
      },
      {
        id: "05",
        title: "Wartung nach der Installation",
        body:
          "Die Wartung nach der Installation stellt die langfristige Leistungsfähigkeit und Zuverlässigkeit des Systems sicher. Durch engagierten Support, regelmäßige Servicetermine und zeitnahe Maßnahmen halten wir den Betrieb auf höchstem Niveau. Unser Engagement endet nicht mit der Übergabe – wir fokussieren uns auf Kundenzufriedenheit und nachhaltige Effizienz über den gesamten Lebenszyklus des Systems."
      }
    ]
  }
};

export default ABOUT_CONTENT;
