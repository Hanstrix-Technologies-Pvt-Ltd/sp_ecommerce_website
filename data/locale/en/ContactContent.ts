// data/ContactContent.ts

export type ContactRegionKey = "south" | "north" | "west";

export interface ContactPerson {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface ContactRegion {
  key: ContactRegionKey;
  label: string;
  contacts: ContactPerson[];
}

export interface ContactPageContent {
  pageTitle: string;
  tabs: ContactRegion[];
  globalSection: {
    eyebrow: string;
    title: string;
    body: string;
  };
}

export const CONTACT_CONTENT: ContactPageContent = {
  pageTitle: "Contact details",

  tabs: [
    {
      key: "south",
      label: "South Region",
      contacts: [
        {
          id: 1,
          name: "Abhishek Gowda",
          role: "Sales Manager – South Region",
          phone: "+91 90355 61065",
          email: "abhishek@stelzparking.in",
        },
        {
          id: 2,
          name: "Ayush Gowda",
          role: "Sales Executive – A.P",
          phone: "+91 90355 61061",
          email: "ayushgowda@stelzparking.in",
        },
        {
          id: 3,
          name: "Bijju Krishnan",
          role: "Sales Manager – Kerala",
          phone: "+91 90355 61062",
          email: "bijjukrishnan@stelzparking.in",
        },
        {
          id: 4,
          name: "Premnath",
          role: "Assistant Manager – TN & KL",
          phone: "+91 88837 07029",
          email: "prem@stelzparking.com",
        },
      ],
    },

    {
      key: "north",
      label: "North Region",
      contacts: [
        {
          id: 1,
          name: "Sudarshan",
          role: "Sales Executive – North Region",
          phone: "+91 99539 43114",
          email: "sudarshan@stelzparking.com",
        },
      ],
    },

    {
      key: "west",
      label: "West Region",
      contacts: [
        {
          id: 1,
          name: "Saurabh Mahajan",
          role: "Channel Partner – West Region",
          phone: "+91 72492 84399",
          email: "saurabh@stolzerparking.in",
        },
      ],
    },
  ],

  globalSection: {
    eyebrow: "GLOBAL BRANCH",
    title: "Get in touch with our team",
    body: "With the right people and proven know-how, we accelerate your growth exponentially.",
  },
};
