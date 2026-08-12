const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '../src/data/content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// Helper to create fully explicit section objects for a location
function createExplicitLocationData(name, type = 'country') {
  const isCountry = type === 'country';
  
  return {
    name: name,
    hero: {
      eyebrow: `${name.toUpperCase()} DIGITAL MARKETING`,
      titleWord1: "GROW YOUR BRAND ",
      titleWord2: `IN `,
      titleHighlight: name.toUpperCase(),
      subtitle: `High-impact search optimization, performance advertising, and revenue growth strategies tailored for ${name} businesses.`,
      ctaPrimaryText: `Get ${name} Strategy Plan`,
      ctaPrimaryHref: "#contact",
      ctaSecondaryText: `Explore ${name} Solutions`,
      videoLabel: `${name.toUpperCase()} CASE STUDY`,
      stats: {
        experience: { value: "10+", label: `YEARS IN ${name.toUpperCase()}` },
        projects: { value: "180+", label: `${name.toUpperCase()} CAMPAIGNS` },
        roi: { value: "4.7x", label: `AVERAGE ${name.toUpperCase()} ROI` }
      }
    },
    ...(isCountry ? {
      aboutOwner: {
        eyebrowText: `ABOUT OUR AGENCY IN ${name.toUpperCase()}`,
        titleIntro: `Scaling Ambitious Brands Across `,
        titleHighlight: name,
        description: `We partner with market leaders in ${name} to drive predictable online lead generation, top Google rankings, and revenue growth.`
      }
    } : {}),
    services: {
      sectionTag: `${name.toUpperCase()} DIGITAL SERVICES`,
      headingIntro: `Tailored Growth Services for `,
      headingHighlight: `${name}`,
      subtitle: `Full-service search optimization, performance advertising, and conversion rate optimization engineered for ${name} companies.`,
      list: [
        {
          num: "01",
          category: "SEARCH ENGINE OPTIMIZATION",
          title: `${name} Local & Organic SEO`,
          desc: `Dominating high-intent search rankings across ${name} with localized keyword strategies and technical authority building.`,
          metrics: [`+185% ${name} Organic Traffic`, `Top 3 Google Rankings`],
          svgRank: "#1 RANK"
        },
        {
          num: "02",
          category: "PAID MEDIA ACQUISITION",
          title: `${name} Targeted Google & Meta Ads`,
          desc: `Data-backed PPC and social advertising campaigns engineered to capture ready-to-buy customers in ${name}.`,
          metrics: [`4.6x Average ROAS`, `Instant Lead Flow`],
          svgRank: "4.6x ROAS"
        },
        {
          num: "03",
          category: "HIGH-CONVERTING DESIGN",
          title: `${name} Web Conversion Engineering`,
          desc: `Ultra-fast responsive websites and landing pages built to turn ${name} visitors into loyal paying clients.`,
          metrics: [`+65% Conversion Rate`, `< 1s Load Time`],
          svgRank: "HIGH ROI"
        }
      ]
    },
    portfolio: {
      sectionTag: `${name.toUpperCase()} SUCCESS STORIES`,
      headingIntro: `Featured Work & Results in `,
      headingHighlight: name,
      subtitle: `Verified revenue scale and market dominance achieved for clients operating in ${name}.`,
      categories: [
        { id: "all", label: "All Campaigns", iconName: "LayoutGrid" },
        { id: "seo", label: `${name} SEO`, iconName: "Search" },
        { id: "ads", label: `${name} Paid Media`, iconName: "TrendingUp" }
      ],
      caseStudies: [
        {
          id: "cs-1",
          category: "seo",
          title: `${name} Enterprise SEO Dominance`,
          client: `Leading Brand in ${name}`,
          tagline: `310% Revenue Increase in 6 Months`,
          desc: `Comprehensive search optimization strategy capturing top position rankings for competitive keywords across ${name}.`,
          stats: [
            { value: "+310%", label: "Organic Revenue", iconName: "TrendingUp" },
            { value: "#1", label: `Google ${name} Rank`, iconName: "Award" }
          ]
        },
        {
          id: "cs-2",
          category: "ads",
          title: `${name} Paid Lead Engine`,
          client: `Commercial Services Provider`,
          tagline: `4.9x ROAS Across Multi-Channel PPC`,
          desc: `High-converting Google Ads and Meta campaign structure delivering high-volume qualified leads throughout ${name}.`,
          stats: [
            { value: "4.9x", label: "Return on Ad Spend", iconName: "TrendingUp" },
            { value: "-42%", label: "Cost Per Lead", iconName: "Award" }
          ]
        }
      ]
    },
    whyChooseMe: {
      sectionTag: `WHY ${name.toUpperCase()} BRANDS CHOOSE US`,
      headingIntro: `Engineered for `,
      headingHighlight: `${name} Market Leadership`,
      subtitle: `Custom digital acquisition frameworks designed specifically around consumer trends in ${name}.`,
      reasons: [
        {
          num: "01",
          iconName: "TrendingUp",
          title: `Data-Driven ${name} Targeting`,
          desc: `Every campaign is backed by real-time analytics and audience intent data tailored to ${name}.`
        },
        {
          num: "02",
          iconName: "Zap",
          title: `Rapid ${name} Market Execution`,
          desc: `We deploy campaigns quickly and optimize continuously to maximize early returns on investment.`
        },
        {
          num: "03",
          iconName: "Award",
          title: `Guaranteed ROI Focus`,
          desc: `Transparent reporting and performance benchmarks built around ${name} business growth objectives.`
        }
      ]
    },
    serviceArea: {
      sectionTag: `${name.toUpperCase()} COVERAGE`,
      headingIntro: `Full Coverage Across `,
      headingHighlight: name,
      subtitle: `Dedicated digital campaign management supporting clients across all major districts and business hubs in ${name}.`
    },
    testimonials: {
      sectionTag: `${name.toUpperCase()} REVIEWS`,
      headingIntro: `What ${name} Business Owners Say`,
      subtitle: `Real feedback from corporate executives and local enterprise founders operating in ${name}.`,
      list: [
        {
          id: "t-1",
          quote: `Working with this agency transformed our customer acquisition in ${name}. Our qualified leads increased by over 200% within the first 90 days!`,
          name: "Marcus Vance",
          role: `Managing Director, ${name}`,
          company: `${name} Enterprises`,
          rating: 5,
          column: 1
        },
        {
          id: "t-2",
          quote: `The search optimization results in ${name} exceeded all our expectations. We now dominate our primary keyword categories cleanly.`,
          name: "Sarah Jenkins",
          role: `Head of Growth, ${name}`,
          company: `${name} Tech Group`,
          rating: 5,
          column: 2
        }
      ]
    },
    blog: {
      sectionTag: `${name.toUpperCase()} MARKET INSIGHTS`,
      headingIntro: `Growth Guides for `,
      headingHighlight: name,
      subtitle: `Expert strategies, SEO breakdowns, and advertising playbooks for scaling your business in ${name}.`,
      posts: [
        {
          id: "b-1",
          title: `How to Rank #1 on Google in ${name} in 2026`,
          excerpt: `A step-by-step guide to dominating search results and capturing high-intent local customer traffic across ${name}.`,
          category: "SEO Strategy",
          date: "August 2026",
          readTime: "6 min read"
        },
        {
          id: "b-2",
          title: `Maximizing Paid Ad ROI Across ${name} Markets`,
          excerpt: `Key tactics for optimizing Google Ads and Meta campaign spend for immediate conversion uplift in ${name}.`,
          category: "Paid Media",
          date: "August 2026",
          readTime: "5 min read"
        }
      ]
    },
    faq: {
      sectionTag: `${name.toUpperCase()} FREQUENTLY ASKED QUESTIONS`,
      headingIntro: `Questions About Marketing in `,
      headingHighlight: name,
      subtitle: `Everything you need to know about starting a campaign in ${name}.`,
      list: [
        {
          question: `Do you offer localized digital marketing services in ${name}?`,
          answer: `Yes! We provide comprehensive search engine optimization, Google Ads management, social ad scaling, and website conversion optimization tailored specifically to ${name}.`
        },
        {
          question: `How fast can we see results for campaigns in ${name}?`,
          answer: `Paid advertising campaigns can generate active leads within 48 to 72 hours of launch. Organic search engine optimization (SEO) typically produces measurable traffic and keyword ranking gains within 60 to 90 days.`
        },
        {
          question: `Why choose your agency over competitors in ${name}?`,
          answer: `We focus strictly on verified revenue outcomes rather than surface-level metrics. Our custom funnels and localized search strategies give ${name} businesses a distinct market advantage.`
        },
        {
          question: `Do you provide dedicated reporting for ${name} clients?`,
          answer: `Yes. You will receive real-time performance dashboard access, monthly strategy reviews, and direct communication aligned with ${name} business hours.`
        }
      ]
    },
    contact: {
      sectionTag: `START YOUR ${name.toUpperCase()} CAMPAIGN`,
      headingIntro: `Ready to Scale Your Business in `,
      headingHighlight: `${name}?`,
      subtitle: `Book a free 30-minute growth strategy session tailored to your target market opportunities in ${name}.`
    }
  };
}

// Generate locationsData explicitly for countries and states
const countries = [
  {
    key: "usa",
    name: "United States",
    states: [
      { key: "texas", name: "Texas" },
      { key: "wyoming", name: "Wyoming" },
      { key: "north-carolina", name: "North Carolina" },
      { key: "south-carolina", name: "South Carolina" },
      { key: "georgia", name: "Georgia" },
      { key: "colorado", name: "Colorado" },
      { key: "nevada", name: "Nevada" },
      { key: "florida", name: "Florida" },
      { key: "ohio", name: "Ohio" },
      { key: "oklahoma", name: "Oklahoma" }
    ]
  },
  {
    key: "new-zealand",
    name: "New Zealand",
    states: [
      { key: "north-island", name: "North Island" },
      { key: "auckland", name: "Auckland" },
      { key: "waikato", name: "Waikato" },
      { key: "gisborne", name: "Gisborne" },
      { key: "wellington", name: "Wellington" },
      { key: "canterbury", name: "Canterbury" }
    ]
  },
  {
    key: "australia",
    name: "Australia",
    states: [
      { key: "new-south-wales", name: "New South Wales" },
      { key: "victoria", name: "Victoria" },
      { key: "queensland", name: "Queensland" },
      { key: "tasmania", name: "Tasmania" },
      { key: "western-australia", name: "Western Australia" },
      { key: "south-australia", name: "South Australia" }
    ]
  }
];

const newLocationsData = {};

countries.forEach((country) => {
  const countryObj = createExplicitLocationData(country.name, 'country');
  countryObj.states = {};
  
  country.states.forEach((state) => {
    countryObj.states[state.key] = createExplicitLocationData(state.name, 'state');
  });

  newLocationsData[country.key] = countryObj;
});

content.locationsData = newLocationsData;

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
console.log('Successfully written explicit locationsData to content.json!');
