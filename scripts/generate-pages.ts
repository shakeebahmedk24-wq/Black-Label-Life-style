import * as fs from 'fs';
import * as path from 'path';
import {
  renderSharedHeader,
  renderSharedFooter,
  renderHeadTags,
  DIVISION_SVGS,
} from './shared-template.ts';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceDetail {
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  spec: string;
}

interface StepDetail {
  num: string;
  phase: string;
  title: string;
  desc: string;
  timeframe: string;
  milestone: string;
}

interface StandardMetric {
  value: string;
  label: string;
  desc: string;
}

interface DivisionPageConfig {
  slug: string;
  num: string;
  divisionName: string;
  pageTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  standards: StandardMetric[];
  services: ServiceDetail[];
  steps: StepDetail[];
  faqs: FAQ[];
  related: { label: string; href: string; desc: string; category?: string }[];
  svgKey: string;
}

const DIVISIONS: DivisionPageConfig[] = [
  {
    slug: 'social',
    num: '01',
    divisionName: 'Social',
    pageTitle: 'Social Media Management SF | Black Label Social',
    metaDesc: 'AI-powered organic social media management in San Francisco, driven by advanced algorithms and human taste to grow authentic business audiences.',
    h1: 'Social: AI-Powered Organic Growth',
    intro: 'Social media management that grows real audiences for real businesses, powered by AI and guided by human taste. Based in San Francisco, Black Label Social engineers authentic digital prominence.',
    standards: [
      { value: '0% Bots', label: 'Organic Authenticity', desc: 'Zero synthetic accounts or fake engagement; verified organic human networks only.' },
      { value: '48h Sprints', label: 'Rapid Turnaround', desc: 'From narrative intake to active distribution across Tier-1 executive channels.' },
      { value: '100% NDA', label: 'Absolute Discretion', desc: 'Strict institutional non-disclosure covenants shielding founder reputation.' },
      { value: 'SF Anchored', label: 'Tech Nexus', desc: 'Direct narrative integration with the Silicon Valley and Transbay venture ecosystem.' },
    ],
    services: [
      {
        title: 'Algorithmic Audience Intelligence',
        badge: 'PROPRIETARY AI',
        description: 'We deploy predictive machine learning models that analyze algorithmic distribution changes, keyword sentiment shifts, and high-value audience clustering across modern platforms. This allows your brand to anticipate distribution mechanics and capture attention before topic saturation.',
        deliverables: [
          'Custom algorithmic distribution & reach modeling',
          'Competitor narrative & positioning gap analysis',
          'Predictive topic clustering & keyword velocity tracking',
          'Executive visibility & real-time telemetry dashboard',
        ],
        spec: 'WEEKLY ALGORITHMIC RE-TUNING',
      },
      {
        title: 'Executive Thought Leadership & Voice',
        badge: 'EDITORIAL SUITE',
        description: 'Our senior editorial directors translate complex technical theses, venture investments, and founder visions into high-signal essays and multimedia commentary. Every word is refined to command authority among technical peers, investors, and enterprise decision-makers.',
        deliverables: [
          'Ghostwritten long-form executive essays & manifestos',
          'High-signal micro-content frameworks for X & LinkedIn',
          'Bespoke brand tone & editorial voice guidebook',
          'Optical typography & bespoke visual design curation',
        ],
        spec: 'BI-WEEKLY EDITORIAL REVIEWS',
      },
      {
        title: 'High-Value Network Interaction',
        badge: 'COMMUNITY CAPITAL',
        description: 'Rather than chasing superficial vanity metrics, we cultivate authentic peer interactions with institutional leaders, angel syndicates, venture partners, and media authorities. We turn passive followers into durable professional capital.',
        deliverables: [
          'Strategic interaction with verified industry leaders',
          'Confidential direct inquiry triage & routing',
          'Private ecosystem facilitation & alliance building',
          'Zero synthetic automation guarantee',
        ],
        spec: 'CONTINUOUS DAILY OVERSIGHT',
      },
      {
        title: 'Omnichannel Distribution Architecture',
        badge: 'CROSS-PLATFORM',
        description: 'Unified cross-pollination across X/Twitter, LinkedIn, Substack, and YouTube. Every asset is optically adapted to respect native platform typography, aspect ratios, and ranking algorithms, maximizing compounding reach.',
        deliverables: [
          'Multi-channel asset adaptation & scheduling',
          'Video snippet & high-resolution graphic formatting',
          'Audience cross-funnel conversion architecture',
          'Monthly executive performance & yield reporting',
        ],
        spec: 'TIER-1 MULTI-PLATFORM COVERAGE',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · DIAGNOSTIC',
        title: 'Audience & Narrative Diagnostic',
        desc: 'We perform a forensic audit of your digital footprint, industry narrative positioning, and target demographics to configure your custom AI growth model.',
        timeframe: 'Days 1–3',
        milestone: 'Master Narrative Thesis Delivered',
      },
      {
        num: '02',
        phase: 'PHASE 02 · ASSEMBLY',
        title: 'Bespoke Editorial & Content Assembly',
        desc: 'Our creative directors draft executive thought leadership assets, establish visual guidelines, and program algorithmic distribution cadences.',
        timeframe: 'Days 4–7',
        milestone: 'Editorial Bank & Distribution Live',
      },
      {
        num: '03',
        phase: 'PHASE 03 · EXECUTION',
        title: 'Continuous Organic Scaling & Telemetry',
        desc: 'Active publishing, real-time algorithmic adjustments, community nurturing, and private inquiry routing without founders having to write a single line.',
        timeframe: 'Ongoing Retainer',
        milestone: 'Monthly Executive Review & Sprints',
      },
    ],
    faqs: [
      {
        question: 'How does Black Label Social combine AI with human taste?',
        answer: 'Our AI models analyze macro-trend engagement data and algorithmic distribution patterns, while seasoned creative directors and brand strategists craft and approve all copy, imagery, and executive messaging.',
      },
      {
        question: 'What types of businesses do you manage social growth for?',
        answer: 'We focus on venture-backed founders, investment funds, luxury service operators, and private executives seeking authentic industry influence without superficial vanity metrics.',
      },
      {
        question: 'Where is the Black Label Social team located?',
        answer: 'Our core executive leadership and strategy teams operate directly out of San Francisco, anchored in the Millennium Tower residence network.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'In-residence private event production.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'Tastemakers, butlers, and residential freedom.' },
      { label: '06 Business Services', href: '/business-services', desc: 'Accounting, bookkeeping, and corporate counsel.' },
    ],
    svgKey: 'social',
  },
  {
    slug: 'entertainment',
    num: '02',
    divisionName: 'Entertainment',
    pageTitle: 'In-Home Event Management SF | Black Label Entertainment',
    metaDesc: 'Private in-residence event management in San Francisco. Complete planning, private culinary service, premium staff, and thorough cleanup.',
    h1: 'Entertainment: Events, Fully Handled',
    intro: 'We bring the event to your residence and take care of the plan, food, service and cleanup. Host unforgettable private gatherings in Millennium Tower and across San Francisco without lifting a finger.',
    standards: [
      { value: '100% White Glove', label: 'Complete Execution', desc: 'From initial run-of-show to hospital-grade post-event kitchen sanitization.' },
      { value: 'Zero Disruption', label: 'Residential Discretion', desc: 'Unobtrusive entry, quiet preparation, and strict adherence to luxury high-rise rules.' },
      { value: 'Pre-Morning Reset', label: 'Pristine Guarantee', desc: 'Fine glassware hand-polished and furniture reset before 8:00 AM the following morning.' },
      { value: 'Michelin Guild', label: 'Culinary Caliber', desc: 'Executive chefs and certified sommeliers vetted from top Northern California dining rooms.' },
    ],
    services: [
      {
        title: 'Private Culinary & Tasting Orchestration',
        badge: 'MICHELIN-CALIBER',
        description: 'World-class private chefs craft personalized multi-course tasting menus directly in your residential kitchen. Every menu highlights peak seasonal Northern California ingredients, bespoke dietary accommodation, and artisanal table presentation.',
        deliverables: [
          'Bespoke 5-to-9 course seasonal tasting menus',
          'Private executive chef and sous chef on-site brigade',
          'Artisanal plateware, bespoke linens & tactile table styling',
          'Comprehensive dietary preference & allergy accommodation',
        ],
        spec: 'CUSTOMIZED RESIDENTIAL TASTINGS',
      },
      {
        title: 'Sommelier Cellar & Craft Mixology Bar',
        badge: 'CELLAR CURATION',
        description: 'Certified sommeliers curate rare library vintages paired course-by-course with your dinner. Our mixologists design signature cocktail menus featuring artisanal spirits, botanical reductions, and hand-carved crystal ice.',
        deliverables: [
          'Rare library vintage sommelier pairings & sourcing',
          'Custom craft cocktail bar setup & botanical infusions',
          'Fine Riedel crystal glassware & decanting protocol',
          'Private cellar inventory consultation & pairing advice',
        ],
        spec: 'RARE VINTAGE SOURCING AVAILABLE',
      },
      {
        title: 'Turnkey Residence Staging & Atmosphere',
        badge: 'ATMOSPHERIC STAGING',
        description: 'We transform your living salon into an intimate private club. Our production team coordinates spatial acoustics, architectural floral installations, ambient candlelight, and bespoke seating configurations that optimize city sightlines.',
        deliverables: [
          'Custom architectural floral installations & tabletop botanicals',
          'Curated ambient illumination & acoustic sound design',
          'Guest arrival greeting & Millennium Tower valet liaison',
          'Residential floor plan optimization for fluid socializing',
        ],
        spec: 'PRE-EVENT STAGING IN 2–4 HOURS',
      },
      {
        title: 'Discreet Service & Hospital-Grade Restoration',
        badge: 'TOTAL RESTORATION',
        description: 'Discreet bonded hospitality staff attend to every guest need with graceful composure. Following the evening, our crew executes total dishwashing, crystal hand-polishing, surface sanitization, and furniture resetting so you wake up to a spotless residence.',
        deliverables: [
          'Bonded front-of-house waitstaff & private bartenders',
          'Continuous quiet clearing & guest beverage maintenance',
          'Hospital-grade kitchen sanitization & trash evacuation',
          'Complete residential reset to pristine original condition',
        ],
        spec: 'WAKE UP TO AN IMMACULATE HOME',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · CONSULTATION',
        title: 'Residence & Palate Consultation',
        desc: 'We assess your residence floor plan, guest profile, cellar parameters, and culinary preferences to build a seamless run-of-show.',
        timeframe: 'Initial 24 Hours',
        milestone: 'Bespoke Run-of-Show & Menu Draft',
      },
      {
        num: '02',
        phase: 'PHASE 02 · ASSEMBLY',
        title: 'Culinary Prep & Staging Mobilization',
        desc: 'Private master chefs, sommeliers, and hospitality staff arrive discreetly to prep your home, arrange florals, and set table appointments.',
        timeframe: '3 Hours Pre-Event',
        milestone: 'Sanctuary Table & Cellar Ready',
      },
      {
        num: '03',
        phase: 'PHASE 03 · EXECUTION',
        title: 'Flawless Service & Pristine Reset',
        desc: 'Every course is served with effortless pacing, followed by hospital-grade kitchen cleanup, crystal polishing, and immediate room reset.',
        timeframe: 'Evening to Midnight',
        milestone: 'Immaculate Residence Turnover',
      },
    ],
    faqs: [
      {
        question: 'Do you manage both intimate dinners and larger tower gatherings?',
        answer: 'Yes, we manage private tastings for two, formal 12-seat executive dinners, and curated cocktail receptions that respect residential building guidelines.',
      },
      {
        question: 'What is included in the cleanup service?',
        answer: 'Complete dishwashing, fine glassware hand-polishing, trash removal, surface sanitization, and room resetting so you wake up to a spotless residence.',
      },
      {
        question: 'Can you accommodate dietary restrictions and rare vintage wine pairings?',
        answer: 'Our culinary directors customize every menu precisely to your specifications and collaborate with private cellars to provide matched sommelier pairings.',
      },
    ],
    related: [
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'Butler and housekeeping residential support.' },
      { label: '08 Luxury', href: '/luxury', desc: 'Luxury car and fine jewelry rentals for galas.' },
      { label: '05 Design', href: '/design', desc: 'Interior staging and architectural spaces.' },
    ],
    svgKey: 'entertainment',
  },
  {
    slug: 'trading',
    num: '03',
    divisionName: 'Trading',
    pageTitle: 'Collectible Card Grading & Trading | Black Label Trading',
    metaDesc: 'San Francisco collectible trading platform with an AI grading engine benchmarked against top rating services nationwide. Precision collectible rating.',
    h1: 'Trading: Collectibles, Rated by AI',
    intro: 'A collectible trading platform with an AI grading engine benchmarked against the best rating services in the country. We bring institutional precision to high-value collectibles and rare card assets.',
    standards: [
      { value: 'Sub-Millimeter', label: 'Optical Precision', desc: 'Multispectral scanning calibrated to institutional grading tolerances.' },
      { value: '0% Human Bias', label: 'Algorithmic Standard', desc: 'Objective computational evaluation eliminating subjective grader fatigue.' },
      { value: 'Vault Custody', label: 'Archival Security', desc: 'Insured climate-controlled depositories protected by biometric access protocols.' },
      { value: 'Cryptographic Proof', label: 'Immutable Provenance', desc: 'Tamper-evident digital certification records tethered directly to physical slabs.' },
    ],
    services: [
      {
        title: 'Benchmark AI Computer-Vision Grading',
        badge: 'OPTICAL BENCHMARK',
        description: 'Our proprietary AI grading engine evaluates collectibles under polarized multispectral lighting. Sub-millimeter sensors analyze 50/50 centering ratios, surface micro-scratch depth, corner radius symmetry, and perimeter edge wear against historical benchmark databases.',
        deliverables: [
          'Sub-millimeter centering ratio calculation (X/Y axis)',
          'Microscopic surface defect mapping & depth profiling',
          'Corner radius & edge wear contour diagnostics',
          'Comprehensive optical certification grading report',
        ],
        spec: 'BENCHMARKED TO TOP NATIONAL SERVICES',
      },
      {
        title: 'Archival Encapsulation & Tamper Slabs',
        badge: 'GENERATIONAL SECURITY',
        description: 'Certified collectibles are permanently sealed in ultrasonically welded, museum-grade UV-resistant acrylic slabs designed for generational preservation. Each slab includes an embedded cryptographic NFC chip linked to permanent inspection records.',
        deliverables: [
          'Sonic-welded archival acrylic slab encapsulation',
          'Cryptographic tamper-evident NFC provenance tag',
          'High-security serialized holographic foil label',
          'Museum-grade 99% UV radiation protection layer',
        ],
        spec: 'LIFETIME PHYSICAL PRESERVATION',
      },
      {
        title: 'Private Collector Marketplace & Liquidity',
        badge: 'OFF-MARKET EXCHANGE',
        description: 'Gain direct access to verified private collectors, family offices, and alternative asset funds. Execute discreet peer-to-peer trades or consign rare assets without public auction house fees or market price depression.',
        deliverables: [
          'Private off-market liquidity & transaction matching',
          'Secure escrow settlement & custodial authentication',
          'Consignment management for rare high-value lots',
          'Zero public auction commission markups',
        ],
        spec: 'VETTED HIGH-NET-WORTH NETWORK',
      },
      {
        title: 'Portfolio Appraisal & Index Analytics',
        badge: 'ASSET VALUATION',
        description: 'Institutional-grade telemetry for collectible portfolios. Monitor market volatility, historical auction comps, population index changes, and insurance replacement valuations updated in real time.',
        deliverables: [
          'Real-time collectible portfolio dashboard & yield tracker',
          'Population index & scarcity ranking telemetry',
          'Formal insurance appraisal documentation',
          'Quarterly alternative asset liquidity briefs',
        ],
        spec: 'CONTINUOUS MARKET TELEMETRY',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · INTAKE',
        title: 'Biometric Intake & High-Res Scanning',
        desc: 'Assets arrive via insured courier or Millennium Tower concierge, cataloged under biometric custody and imaged in our optical laboratory.',
        timeframe: 'Day 1',
        milestone: 'Chain of Custody Certificate Issued',
      },
      {
        num: '02',
        phase: 'PHASE 02 · ANALYSIS',
        title: 'Neural Inspection & Benchmark Grading',
        desc: 'Computer vision models analyze centering, surface, edges, and corners against millions of benchmarked grading data points.',
        timeframe: 'Days 2–3',
        milestone: 'Definitive Diagnostic Report Generated',
      },
      {
        num: '03',
        phase: 'PHASE 03 · SETTLEMENT',
        title: 'Slab Encapsulation & Marketplace Access',
        desc: 'Cards are ultrasonically sealed into archival slabs, assigned cryptographic provenance, and placed into your vault or private exchange.',
        timeframe: 'Days 4–5',
        milestone: 'Physical Delivery or Vault Deposit',
      },
    ],
    faqs: [
      {
        question: 'How is the AI grading engine benchmarked?',
        answer: 'The system is calibrated directly against historical grading parameters and optical tolerances established by the country’s top tier rating services.',
      },
      {
        question: 'Which categories of cards and collectibles are accepted?',
        answer: 'We accept high-grade sports cards, premium gaming cards, and verified cultural paper memorabilia eligible for authenticated grading.',
      },
      {
        question: 'Can I trade graded assets directly through the platform?',
        answer: 'Yes, verified collectors can execute peer-to-peer and custodial trades through our private liquidity marketplace.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'Alternative portfolio and real estate strategies.' },
      { label: '08 Luxury', href: '/luxury', desc: 'Fine jewelry and automotive assets.' },
      { label: '06 Business Services', href: '/business-services', desc: 'Entity structuring and tax accounting.' },
    ],
    svgKey: 'trading',
  },
  {
    slug: 'lifestyle',
    num: '04',
    divisionName: 'Lifestyle',
    pageTitle: 'Butler & Housekeeping Services SF | Black Label Lifestyle',
    metaDesc: 'Style, time and freedom. Curated talent agency, butler services, and luxury housekeeping reclaiming 48 hours weekly for San Francisco residents.',
    h1: 'Lifestyle: Style, Time and Freedom',
    intro: 'A talent agency of tastemakers, plus housekeeping and butler services that give you back your time. Reclaim up to 48 hours weekly with dedicated residential support tailored to Millennium Tower living.',
    standards: [
      { value: '48h Saved', label: 'Time Reclaimed Weekly', desc: 'Recovers nearly two full calendar days of operational friction every single week.' },
      { value: '100% Bonded', label: 'Vetted Security', desc: 'Exhaustive background checks, ironclad NDA covenants, and high-rise etiquette training.' },
      { value: 'Single Point', label: 'Unified Dispatch', desc: 'One central concierge coordinating butlers, housekeeping, wardrobe, and appointments.' },
      { value: 'Tower Anchored', label: 'Immediate Response', desc: 'Physical on-site presence in Millennium Tower for rapid key drop and emergency dispatch.' },
    ],
    services: [
      {
        title: 'Dedicated Residential Butler Service',
        badge: 'ESTATE CADENCE',
        description: 'Intuitive, unobtrusive household coordination that protects your focus. Our butlers manage daily schedule logistics, dry cleaning handoffs, mail triage, private guest reception, and fine dining reservations.',
        deliverables: [
          'Daily residential logistics & appointment coordination',
          'Wardrobe pressing, styling & executive travel packing',
          'Private guest greeting & residential reception',
          'Executive parcel, wine delivery & dry cleaning management',
        ],
        spec: 'AVAILABLE DAILY OR ON-DEMAND',
      },
      {
        title: 'White-Glove Housekeeping & Turndown',
        badge: 'FIVE-STAR MAINTENANCE',
        description: 'Hospital-grade cleanliness executed with luxury hotel precision. Methodical daily linen turns, fine marble and hardwood polishing, deep bathroom sanitization, and pantry organization tailored to your habits.',
        deliverables: [
          'Daily bedroom turn-down & luxury linen freshening',
          'Marble, bronze & fine surface specialized care',
          'Detailed pantry inventory & grocery restocking',
          'Eco-friendly, scent-free hospital-grade products',
        ],
        spec: 'CUSTOM CADENCE (DAILY / WEEKLY)',
      },
      {
        title: 'Talent Agency & Tastemaker Styling',
        badge: 'WARDROBE & IMAGE',
        description: 'Connect with an exclusive roster of vetted stylists, personal tailors, and aesthetic authorities. Our tastemakers curate seasonal executive wardrobes, private atelier fittings, and personal branding.',
        deliverables: [
          'Private wardrobe & aesthetic consultation in-home',
          'Access to private runway & designer trunk collections',
          'Personal tailoring & bespoke fitting coordination',
          'Executive grooming & wellness specialist liaison',
        ],
        spec: 'BESPOKE LIFESTYLE CURATION',
      },
      {
        title: 'Private Partner & Maison Privileges',
        badge: 'GLOBAL ACCESS',
        description: 'Access preferred benefits, private salon reservations, and privileged terms across our curated network of global luxury houses, private aviation carriers, and premier Bay Area clubs.',
        deliverables: [
          'Privileged reservations at top Bay Area dining tables',
          'Private aviation & charter jet liaison',
          'Vetted luxury maison shopping privileges & previews',
          'Exclusive cultural event & gala access',
        ],
        spec: 'GLOBAL LUXURY NETWORK',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · INTAKE',
        title: 'Residential Routine Audit',
        desc: 'We review your weekly schedule, residential layout, laundry requirements, and dining preferences to configure a bespoke care protocol.',
        timeframe: 'Initial 24 Hours',
        milestone: 'Residential Playbook Established',
      },
      {
        num: '02',
        phase: 'PHASE 02 · ASSIGNMENT',
        title: 'Dedicated Staff Vetting & Onboarding',
        desc: 'We match bonded personnel trained to your personal standards, building security protocols, and high-rise access requirements.',
        timeframe: 'Within 48 Hours',
        milestone: 'Seamless Key & Cadence Handover',
      },
      {
        num: '03',
        phase: 'PHASE 03 · AUTONOMY',
        title: 'Effortless Residential Autonomy',
        desc: 'Enjoy an immaculate home, pristine wardrobe, and fully managed domestic calendar, giving you back up to 48 hours of pure freedom each week.',
        timeframe: 'Continuous Cadence',
        milestone: 'Weekly Hours Reclaimed Telemetry',
      },
    ],
    faqs: [
      {
        question: 'How do you calculate 48 hours reclaimed weekly?',
        answer: 'By delegating deep cleaning, laundry, grocery restocking, dry cleaning coordination, daily tidying, and errand management, our residents recover up to 48 hours of productive and leisure time each week.',
      },
      {
        question: 'Are all housekeeping and butler personnel vetted?',
        answer: 'Yes, 100% of staff undergo comprehensive background checks, confidentiality agreements, and specialized training in luxury high-rise etiquette.',
      },
      {
        question: 'Can I schedule daily or weekly visits?',
        answer: 'We provide customizable cadences ranging from daily morning preparation and evening turn-down to dedicated multi-day weekly maintenance.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'In-residence private dining and event staffing.' },
      { label: '05 Design', href: '/design', desc: 'Interior design and cohesive space planning.' },
      { label: '08 Luxury', href: '/luxury', desc: 'Exotic vehicle and fine jewelry rentals.' },
    ],
    svgKey: 'lifestyle',
  },
  {
    slug: 'design',
    num: '05',
    divisionName: 'Design',
    pageTitle: 'Interior Design & Staging SF | Black Label Design',
    metaDesc: 'Cohesive spaces in San Francisco. Staging turning lived-in homes into showpieces and interior design making residences feel like one intentional thought.',
    h1: 'Design: Cohesive Spaces',
    intro: 'Staging that turns a lived-in home into a showpiece, and interior design teams that make your home feel like one intentional thought. Tailored for Millennium Tower and San Francisco luxury residences.',
    standards: [
      { value: 'Quiet Luxury', label: 'Design Philosophy', desc: 'Timeless architectural palettes, rich natural textures, and intentional breathing room.' },
      { value: 'Millimeter Spec', label: 'Installation Precision', desc: 'Custom millwork, bespoke lighting, and flawless spatial integration.' },
      { value: 'Turnkey Staging', label: 'Market Velocity', desc: 'Comprehensive residential transformation for sales listings or 3-6-9 month executive leases.' },
      { value: 'High-Rise Fluent', label: 'Tower Expertise', desc: 'Mastery of Millennium Tower logistics, freight elevator windows, and acoustic buffering.' },
    ],
    services: [
      {
        title: 'High-Impact Residential Staging',
        badge: 'VALUATION ACCELERATOR',
        description: 'We transform luxury residences into compelling, market-defining showpieces. By sourcing bespoke designer furnishings, original artwork, and refined lighting, we accentuate architectural sightlines and command premium valuations.',
        deliverables: [
          'Full architectural space planning & circulation curation',
          'Editorial designer furniture & lighting inventory',
          'Original contemporary artwork & sculpture placement',
          'White-glove installation & de-staging logistics',
        ],
        spec: 'READY FOR LISTING IN 72–96 HOURS',
      },
      {
        title: 'Holistic Interior Architecture & Design',
        badge: 'BESPOKE INTERIORS',
        description: 'Comprehensive interior design that unifies every room into one intentional visual thought. We oversee spatial planning, custom architectural millwork, bespoke lighting schematics, and tactile material palettes.',
        deliverables: [
          'Master spatial & lighting architectural schematics',
          'Custom cabinetry & architectural millwork design',
          'Color, stone, hardwood & textile master palettes',
          '3D architectural render visualizations',
        ],
        spec: 'COMPLETE TURNKEY EXECUTION',
      },
      {
        title: 'Artisan Material & Furnishing Curation',
        badge: 'ARTISANAL CURATION',
        description: 'Direct sourcing from European ateliers, independent master craftspeople, and private art galleries. Every table, sofa, rug, and brass fitting is selected to age gracefully and provide sensory warmth.',
        deliverables: [
          'Bespoke furniture commissions & custom upholstery',
          'Private gallery art acquisition & conservation framing',
          'Architectural brass & bronze hardware curation',
          'Fine wool, silk & linen tactile textile packages',
        ],
        spec: 'EXCLUSIVE SOURCING RIGHTS',
      },
      {
        title: 'High-Rise Acoustic & Lighting Integration',
        badge: 'ARCHITECTURAL LIGHTING',
        description: 'Designed specifically for urban high-rise living. We integrate discreet acoustic treatments that eliminate echo, paired with circadian architectural lighting that transforms city views from day to night.',
        deliverables: [
          'Discreet architectural acoustic paneling & sound dampening',
          'Circadian warm-dim smart lighting systems',
          'Automated motorized quiet-run drapery & solar shades',
          'Audio-visual integration & complete cable concealment',
        ],
        spec: 'ENGINEERED FOR GLASS TOWERS',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · DIAGNOSTIC',
        title: 'Spatial Analysis & Master Thesis',
        desc: 'We measure your residence, analyze natural daylight vectors and sightlines, and establish a foundational design thesis and budget.',
        timeframe: 'Week 1',
        milestone: 'Spatial Thesis & Mood Board Approval',
      },
      {
        num: '02',
        phase: 'PHASE 02 · SPECIFICATION',
        title: 'Material Specification & Procurement',
        desc: 'We specify furnishings, commission bespoke artisan pieces, source fine artwork, and schedule tower logistics and freight clearance.',
        timeframe: 'Weeks 2–4',
        milestone: 'Procurement Log & Delivery Schedule',
      },
      {
        num: '03',
        phase: 'PHASE 03 · INSTALLATION',
        title: 'White-Glove Placement & Reveal',
        desc: 'Our specialized installation team places every furnishing, hangs fine art with millimeter precision, tunes lighting, and presents your completed sanctuary.',
        timeframe: 'Installation Sprint',
        milestone: 'Final Walkthrough & Key Reveal',
      },
    ],
    faqs: [
      {
        question: 'Do you stage homes for sale or for ongoing furnished leases?',
        answer: 'We handle both high-stakes real estate sales staging and turnkey furnished staging for 3-6-9 month executive leases in Millennium Tower and SoMa.',
      },
      {
        question: 'What is the signature design aesthetic of Black Label Design?',
        answer: 'Editorial quiet luxury: balanced neutrals, warm ivories, rich natural textures, bespoke brass accents, and intentional spatial breathing room.',
      },
      {
        question: 'Can you work within existing architectural constraints?',
        answer: 'Yes, our team specializes in urban high-rises and understands building logistics, freight elevator scheduling, and acoustic considerations.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'Furnished residential leases and SoMa property management.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'Housekeeping and residential butler care.' },
      { label: '08 Luxury', href: '/luxury', desc: 'Luxury appointments and fine craftsmanship.' },
    ],
    svgKey: 'design',
  },
  {
    slug: 'business-services',
    num: '06',
    divisionName: 'Business Services',
    pageTitle: 'Accounting, Bookkeeping & Legal | Black Label Business',
    metaDesc: 'San Francisco back office for founders: accounting, bookkeeping, and corporate legal under one roof to form, run, and dissolve companies with confidence.',
    h1: 'Business Services: Your One-Stop Back Office',
    intro: 'Accounting, bookkeeping and legal under one roof, so founders can form, run and dissolve a company with confidence. Based in San Francisco, we eliminate administrative friction for builders.',
    standards: [
      { value: 'Under 1 Roof', label: 'Unified Practice', desc: 'CPA tax strategists, seasoned bookkeepers, and corporate counsel aligned as one team.' },
      { value: 'Zero Friction', label: 'No Dropped Balls', desc: 'Direct structural alignment between accounting ledgers and corporate governance filings.' },
      { value: 'Real-Time Books', label: 'Continuous Telemetry', desc: 'Perpetually updated financial dashboards, burn rate modeling, and cash clarity.' },
      { value: 'Founder First', label: 'Venture Aligned', desc: 'Engineered specifically for technology founders, serial entrepreneurs, and family holding entities.' },
    ],
    services: [
      {
        title: 'Strategic Corporate Tax & Accounting',
        badge: 'TAX STRATEGY',
        description: 'Proactive, strategic tax planning that shields founder equity and optimizes holding structures. We provide multi-jurisdiction compliance, annual corporate filings, QSBS qualification, and investor-grade fiscal reports.',
        deliverables: [
          'Annual corporate & partnership tax returns (Federal & State)',
          'QSBS & founder equity tax optimization',
          'R&D tax credit capture & calculation',
          'Multi-state tax apportionment strategy',
        ],
        spec: 'PROACTIVE YEAR-ROUND ADVISORY',
      },
      {
        title: 'Continuous Real-Time Bookkeeping & Runways',
        badge: 'CASH TELEMETRY',
        description: 'Daily transaction reconciliations, payroll oversight, and vendor bill management. Founders receive executive dashboards showing real-time monthly burn rate, cash runway, and department spend.',
        deliverables: [
          'Daily bank & corporate credit card reconciliation',
          'Executive burn rate & runway dashboard',
          'Accounts payable & vendor disbursement management',
          'Monthly board-ready financial packet (P&L, Balance Sheet)',
        ],
        spec: 'ALWAYS AUDIT-READY',
      },
      {
        title: 'Corporate Legal & Entity Governance',
        badge: 'CORPORATE COUNSEL',
        description: 'Comprehensive legal infrastructure for company lifecycles. We handle Delaware C-Corp and California LLC formation, operating agreements, stock purchase agreements, NDAs, and clean entity dissolution.',
        deliverables: [
          'Delaware C-Corp & LLC formation filings',
          'Founder stock purchase agreements & 83(b) elections',
          'Standard commercial vendor & partner contracts',
          'Clean corporate dissolution & wind-down execution',
        ],
        spec: 'SEAMLESS CONTINUITY WITH CPA',
      },
      {
        title: 'Integrated Founder Back-Office Suite',
        badge: 'UNIFIED BACK OFFICE',
        description: 'Eliminate administrative drag. A dedicated back-office manager serves as your central point of contact, coordinating payroll, state registrations, 1099 compliance, and annual reporting under one predictable retainer.',
        deliverables: [
          'Dedicated senior back-office manager',
          'Payroll system setup & state withholding filings',
          'Annual franchise tax & statement of information compliance',
          'Year-end 1099 contractor compliance filing',
        ],
        spec: 'ZERO ADMINISTRATIVE OVERHEAD',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · DIAGNOSTIC',
        title: 'Corporate & Financial Health Audit',
        desc: 'We review existing entity structures, cap tables, prior tax filings, banking feeds, and contracts to identify vulnerabilities and tax optimizations.',
        timeframe: 'Days 1–3',
        milestone: 'Forensic Back-Office Audit Delivered',
      },
      {
        num: '02',
        phase: 'PHASE 02 · INTEGRATION',
        title: 'Systems Synchronization & Clean-Up',
        desc: 'We synchronize your accounting software, payroll, banking feeds, and corporate legal records under one dedicated back-office manager.',
        timeframe: 'Week 1–2',
        milestone: 'Unified Financial Dashboard Live',
      },
      {
        num: '03',
        phase: 'PHASE 03 · EXECUTION',
        title: 'Continuous Advisory & Friction-Free Cadence',
        desc: 'Monthly reconciliations, real-time burn updates, proactive tax milestone alerts, and ongoing legal document execution without hourly friction.',
        timeframe: 'Monthly Cadence',
        milestone: 'Monthly Board Packets & Tax Readiness',
      },
    ],
    faqs: [
      {
        question: 'Why combine accounting, bookkeeping, and legal under one roof?',
        answer: 'Operating under one roof eliminates miscommunication between lawyers and CPAs, reduces redundant billable hours, and prevents costly corporate structuring errors.',
      },
      {
        question: 'Do you assist with company formation and dissolution?',
        answer: 'Yes, we assist founders throughout the entire entity lifecycle, from Delaware/California formation and founder stock issuance to clean wind-downs.',
      },
      {
        question: 'Who are your typical clients?',
        answer: 'Technology founders, serial entrepreneurs, private family offices, and holding companies seeking an institutional-grade back office.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'LLC mortgage structuring and real estate fund management.' },
      { label: '01 Social', href: '/social', desc: 'Corporate narrative and executive visibility.' },
      { label: '03 Trading', href: '/trading', desc: 'Asset certification and liquidity platforms.' },
    ],
    svgKey: 'business-services',
  },
  {
    slug: 'investments',
    num: '07',
    divisionName: 'Investments',
    pageTitle: 'SoMa Real Estate & Fund Management | Black Label SF',
    metaDesc: 'SoMa real estate, actively managed. Property management, trusted mortgage partners, and a San Francisco portfolio fund for the 5 to 7 year investor.',
    h1: 'Investments: SoMa Real Estate, Actively Managed',
    intro: 'Property management, trusted mortgage partners, and a fund building a San Francisco portfolio for the 5 to 7 year investor. Anchored in Millennium Tower and dedicated to prime SoMa opportunities.',
    standards: [
      { value: '3-6-9 mo Leases', label: 'Executive Rental Yield', desc: 'Specialized high-yield executive leases for relocating tech leaders, consultants, and founders.' },
      { value: '5-7 Year Horizon', label: 'Patient Capital Fund', desc: 'Disciplined counter-cyclical investment fund targeting prime San Francisco residential assets.' },
      { value: 'SoMa Centric', label: 'Hyper-Local Focus', desc: 'Deep neighborhood intelligence anchored directly around Millennium Tower and Transbay corridor.' },
      { value: '100% Turnkey', label: 'Zero Owner Friction', desc: 'From mortgage debt packaging and interior staging to executive tenant management.' },
    ],
    services: [
      {
        title: 'Furnished Executive Property Management',
        badge: 'EXECUTIVE LEASING',
        description: 'We maximize net operating income through turnkey 3-6-9 month executive leases. We handle high-net-worth tenant vetting, bespoke corporate lease contracts, regular maintenance, and five-star concierge turnover.',
        deliverables: [
          'Executive tenant vetting & background screening',
          'Custom corporate lease agreements (3, 6, 9 month cadences)',
          'White-glove turnover, sanitization & inspection',
          '24/7 dedicated tenant and maintenance dispatch',
        ],
        spec: 'HIGH-YIELD OCCUPANCY FOCUS',
      },
      {
        title: 'Corporate LLC Mortgage Debt Structuring',
        badge: 'DEBT FINANCING',
        description: 'We partner with top-tier mortgage lenders specializing in corporate LLC debt financing for real estate investors. Secure competitive rates, asset protection, and flexible underwriting without personal liability.',
        deliverables: [
          'LLC corporate mortgage structuring & debt analysis',
          'Fast-track underwriting with preferred institutional lenders',
          'Non-recourse & interest-only portfolio loan options',
          'Refinancing & equity extraction advisory',
        ],
        spec: 'TAILORED TO HIGH-NET-WORTH PORTFOLIOS',
      },
      {
        title: 'Concentrated San Francisco Real Estate Fund',
        badge: 'PORTFOLIO FUND',
        description: 'Our real estate fund acquires premium condominiums and multi-family assets in high-demand San Francisco pockets with a disciplined 5 to 7 year horizon, capturing counter-cyclical pricing and long-term equity growth.',
        deliverables: [
          'Off-market distressed & counter-cyclical deal flow',
          'Rigorous institutional cash flow & IRR modeling',
          'Quarterly LP reports with audited financial statements',
          'Strategic exit timing to maximize capital gains',
        ],
        spec: '5-TO-7 YEAR INVESTMENT HORIZON',
      },
      {
        title: 'Turnkey Interior Renovation & Value Add',
        badge: 'ASSET OPTIMIZATION',
        description: 'Direct integration with Black Label Design to remodel, stage, and elevate acquired residential units, accelerating rental yields by up to 25% and protecting long-term capital valuation.',
        deliverables: [
          'Targeted high-ROI residential renovation plans',
          'Turnkey quiet-luxury staging and furnishings',
          'Building HOA liaison and contractor coordination',
          'Comprehensive asset depreciation & cost segregation support',
        ],
        spec: 'IMMEDIATE VALUE ACCELERATION',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · SOURCING',
        title: 'Opportunity Sourcing & Financial Modeling',
        desc: 'We identify off-market residential assets in SoMa, conduct forensic title and HOA reviews, and run sensitivity models across 5 to 7 year horizons.',
        timeframe: 'Weeks 1–2',
        milestone: 'Investment Pro Forma & Debt Proposal',
      },
      {
        num: '02',
        phase: 'PHASE 02 · STRUCTURING',
        title: 'Entity Structuring & Asset Acquisition',
        desc: 'Our mortgage partners and legal counsel structure tax-efficient LLC debt packages, closing escrow with absolute speed and confidentiality.',
        timeframe: 'Closing Window',
        milestone: 'Acquisition Closes & Title Transferred',
      },
      {
        num: '03',
        phase: 'PHASE 03 · MANAGEMENT',
        title: 'Staging, Executive Leasing & Yield Distribution',
        desc: 'Units are furnished to quiet-luxury standards, placed into our 3-6-9 month executive lease network, and actively managed for ongoing yield.',
        timeframe: 'Continuous Cadence',
        milestone: 'Quarterly Performance & Yield Distribution',
      },
    ],
    faqs: [
      {
        question: 'Why does Black Label focus specifically on SoMa and Millennium Tower?',
        answer: 'SoMa represents the technological and financial nexus of San Francisco. Millennium Tower living provided firsthand insight into high-demand residential lease dynamics.',
      },
      {
        question: 'What is the duration of your furnished lease terms?',
        answer: 'We specialize in premium 3-6-9 month furnished executive leases, catering to relocating tech leaders, consultants, and founders.',
      },
      {
        question: 'What is the targeted time horizon for the investment fund?',
        answer: 'Our fund model is strictly designed for the 5 to 7 year patient investor seeking capital appreciation in prime San Francisco assets.',
      },
    ],
    related: [
      { label: '05 Design', href: '/design', desc: 'Turnkey interior staging and architecture.' },
      { label: '06 Business Services', href: '/business-services', desc: 'LLC formation and tax compliance.' },
      { label: '08 Luxury', href: '/luxury', desc: 'Automotive and fine asset curation.' },
    ],
    svgKey: 'investments',
  },
  {
    slug: 'luxury',
    num: '08',
    divisionName: 'Luxury',
    pageTitle: 'Luxury Car & Jewelry Rental SF | Black Label Luxury',
    metaDesc: 'Drive it, wear it. Premier exotic car rentals and high-end fine jewelry rentals in San Francisco, based in Millennium Tower.',
    h1: 'Luxury: Drive It, Wear It',
    intro: 'Luxury car rentals and high-end jewelry rentals. Access exceptional automobiles and rare fine jewelry without the long-term burdens of ownership, based in Millennium Tower.',
    standards: [
      { value: 'Millennium Valet', label: 'Direct Handover', desc: 'Vehicles delivered directly to Millennium Tower valet or your private residence with full orientation.' },
      { value: 'Museum Grade', label: 'Certified Provenance', desc: 'Authenticated fine diamonds, gemstones, and haute horlogerie with certified appraisal papers.' },
      { value: 'Total Insurance', label: 'Comprehensive Coverage', desc: 'Full casualty and transit insurance included on all automotive and jewelry reservations.' },
      { value: 'Discreet Courier', label: 'Biometric Custody', desc: 'White-glove bonded delivery and collection maintaining total personal discretion.' },
    ],
    services: [
      {
        title: 'Exotic & Performance Supercar Fleet',
        badge: 'SUPERCAR STABLE',
        description: 'Access a private stable of Ferrari, Lamborghini, McLaren, and Porsche performance vehicles maintained in pristine showroom condition. Delivered with a full tank directly to your residence or airport valet.',
        deliverables: [
          'Showroom-condition exotic & luxury vehicle fleet',
          'White-glove residence or private aviation delivery',
          'Flexible daily, weekend, and multi-week arrangements',
          '24/7 dedicated roadside & vehicle concierge support',
        ],
        spec: 'DELIVERED TO MILLENNIUM TOWER VALET',
      },
      {
        title: 'Haute Horlogerie & Fine Jewelry Vault',
        badge: 'HIGH JEWELRY VAULT',
        description: 'Exceptional fine jewelry collections and collector-grade timepieces available for galas, red carpet events, weddings, and private soirees. Experience million-dollar gemstones without the burden of custody.',
        deliverables: [
          'Certified diamond necklaces, cuffs & rare earrings',
          'Collector timepieces (Patek Philippe, Audemars Piguet, Rolex)',
          'Professional ultrasonic cleaning & authentication',
          'Personal stylist pairing consultation',
        ],
        spec: 'INSURED TRANSIT & SECURITY',
      },
      {
        title: 'Discreet Insured Courier Handover',
        badge: 'SECURE DISPATCH',
        description: 'Security and peace of mind. Every luxury vehicle and fine jewelry parcel is handled by vetted, bonded couriers with comprehensive casualty insurance covering every moment of your reservation.',
        deliverables: [
          'Full comprehensive transit & casualty coverage',
          'Bonded white-glove delivery specialist',
          'Biometric custody handoff protocol',
          'Zero liability exposure beyond reservation terms',
        ],
        spec: 'COMPREHENSIVE INSURANCE INCLUDED',
      },
      {
        title: 'Occasion & Event Concierge Curation',
        badge: 'BESPOKE OCCASION',
        description: 'Coordinated luxury styling for high-profile moments. Our concierges match vehicles and jewelry to your attire, itinerary, and guest profile for black-tie galas, wine country weekends, and executive summits.',
        deliverables: [
          'Curated vehicle & jewelry matched packages',
          'Wine Country & coastal weekend itinerary support',
          'Private chauffeur liaison if preferred',
          'Seamless return pickup directly from your residence',
        ],
        spec: 'END-TO-END OCCASION SUPPORT',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'PHASE 01 · SELECTION',
        title: 'Asset Selection & Occasion Consultation',
        desc: 'Select your desired supercar or fine jewelry suite from our private digital vault or consult with our luxury director for bespoke styling recommendations.',
        timeframe: 'Instant to 24 Hours',
        milestone: 'Reservation Confirmed & Insured',
      },
      {
        num: '02',
        phase: 'PHASE 02 · DELIVERY',
        title: 'Discreet Residential Handover',
        desc: 'Your vehicle or jewelry suite is hand-delivered to Millennium Tower valet or your residence in pristine condition, accompanied by full orientation.',
        timeframe: 'At Scheduled Hour',
        milestone: 'Keys & Custody Transferred',
      },
      {
        num: '03',
        phase: 'PHASE 03 · COLLECTION',
        title: 'Effortless Return & Custody Reset',
        desc: 'Upon completion of your booking, our courier collects the keys or jewelry directly from your residence or valet, conducting a rapid sign-off.',
        timeframe: 'Conclusion of Booking',
        milestone: 'Deposit Released & Account Closed',
      },
    ],
    faqs: [
      {
        question: 'Are jewelry rentals insured during the rental period?',
        answer: 'Yes, all fine jewelry pieces are accompanied by specialized transit and casualty coverage for the duration of your reservation.',
      },
      {
        question: 'Can luxury cars be delivered directly to Millennium Tower valet?',
        answer: 'Yes, our dispatch coordinates directly with Millennium Tower valet and residential concierges for seamless key handovers.',
      },
      {
        question: 'What is the minimum rental duration?',
        answer: 'We offer single-evening reservations, weekend bookings, and multi-week arrangements tailored to your personal calendar.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'In-residence private event hosting.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'Tastemakers and personal wardrobe styling.' },
      { label: '07 Investments', href: '/investments', desc: 'SoMa property management and real estate.' },
    ],
    svgKey: 'luxury',
  },
];

// Helper to generate Home Page HTML
function generateHomePage(): string {
  const brandCards = [
    {
      num: '01',
      title: 'Social',
      tagline: 'AI-powered organic growth',
      desc: 'Social media management that grows real audiences for real businesses, powered by AI and guided by human taste.',
      href: '/social',
      category: 'enterprise',
      image: '/assets/images/social.jpg',
      svg: 'social',
      badge: 'AI Growth Engine',
    },
    {
      num: '02',
      title: 'Entertainment',
      tagline: 'Events, fully handled',
      desc: 'We bring the event to your residence and take care of the plan, food, service and cleanup.',
      href: '/entertainment',
      category: 'living',
      image: '/assets/images/dining.jpg',
      svg: 'entertainment',
      badge: 'In-Residence Dining',
    },
    {
      num: '03',
      title: 'Trading',
      tagline: 'Collectibles, rated by AI',
      desc: 'A collectible trading platform with an AI grading engine benchmarked against the best rating services in the country.',
      href: '/trading',
      category: 'enterprise',
      image: '/assets/images/trading.jpg',
      svg: 'trading',
      badge: 'Benchmark AI Rating',
    },
    {
      num: '04',
      title: 'Lifestyle',
      tagline: 'Style, time and freedom',
      desc: 'A talent agency of tastemakers, plus housekeeping and butler services that give you back your time.',
      href: '/lifestyle',
      category: 'living',
      image: '/assets/images/lifestyle.jpg',
      svg: 'lifestyle',
      badge: 'Up to 48 hrs Reclaimed',
    },
    {
      num: '05',
      title: 'Design',
      tagline: 'Cohesive spaces',
      desc: 'Staging that turns a lived-in home into a showpiece, and interior design teams that make your home feel like one intentional thought.',
      href: '/design',
      category: 'living',
      image: '/assets/images/interior.jpg',
      svg: 'design',
      badge: 'Bespoke Staging',
    },
    {
      num: '06',
      title: 'Business Services',
      tagline: 'Your one-stop back office',
      desc: 'Accounting, bookkeeping and legal under one roof, so founders can form, run and dissolve a company with confidence.',
      href: '/business-services',
      category: 'enterprise',
      image: '/assets/images/business.jpg',
      svg: 'business-services',
      badge: 'Founders Suite',
    },
    {
      num: '07',
      title: 'Investments',
      tagline: 'SoMa real estate, actively managed',
      desc: 'Property management, trusted mortgage partners, and a fund building a San Francisco portfolio for the 5 to 7 year investor.',
      href: '/investments',
      category: 'enterprise',
      image: '/assets/images/penthouse.jpg',
      svg: 'investments',
      badge: '3-6-9 mo Leases & Fund',
    },
    {
      num: '08',
      title: 'Luxury',
      tagline: 'Drive it, wear it',
      desc: 'Luxury car rentals and high-end jewelry rentals.',
      href: '/luxury',
      category: 'living',
      image: '/assets/images/luxury.jpg',
      svg: 'luxury',
      badge: 'Exotics & Fine Jewelry',
    },
  ];

  const brandGridHtml = brandCards
    .map((card) => {
      const hasImage = Boolean(card.image);
      return `
      <article data-division-category="${card.category}" class="division-card-item relative group bg-[#0b0e13] border border-[#c5a059]/25 hover:border-[#c5a059]/75 rounded-sm luxury-card-hover flex flex-col justify-between overflow-hidden shadow-xl" data-reveal="scale">
        ${
          hasImage
            ? `
        <!-- High-End Photography Card Window -->
        <div class="relative h-56 sm:h-64 w-full overflow-hidden border-b border-[#c5a059]/15">
          <img src="${card.image}" alt="Black Label ${card.title} - ${card.tagline}" width="800" height="450" loading="lazy" class="w-full h-full object-cover luxury-image-zoom filter brightness-90 group-hover:brightness-100" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/30 to-transparent"></div>
          <div class="absolute top-4 left-4 flex items-center gap-2">
            <span class="px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-[#faf8f5] bg-[#060709]/85 backdrop-blur-md border border-[#c5a059]/30 rounded-sm">
              ${card.badge}
            </span>
          </div>
          <span class="absolute bottom-3 right-4 text-4xl font-serif font-light text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
            ${card.num}
          </span>
        </div>
        `
            : `
        <!-- Pure Editorial Dark Lacquer Panel -->
        <div class="p-7 pb-0 flex items-center justify-between">
          <span class="px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            ${card.badge}
          </span>
          <span class="text-4xl font-serif font-light text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
            ${card.num}
          </span>
        </div>
        `
        }

        <div class="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
          <div class="space-y-2.5">
            <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
              <a href="${card.href}" class="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                ${card.title}
              </a>
            </h3>
            <p class="text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#c5a059] font-mono font-medium">${card.tagline}</p>
            <p class="text-sm sm:text-[15px] text-[#dcd6ca] leading-relaxed font-light pt-1">${card.desc}</p>
          </div>

          <div class="pt-5 mt-5 border-t border-[#c5a059]/15 flex items-center justify-between">
            <span class="text-xs font-mono uppercase tracking-widest text-[#a69f91] group-hover:text-[#faf8f5] transition-colors">
              Division ${card.num}
            </span>
            <a href="${card.href}" class="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#c5a059] group-hover:text-[#dfc182] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
              Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-1 font-mono">→</span>
            </a>
          </div>
        </div>
      </article>
    `;
    })
    .join('');

  const homeFaqs = [
    {
      question: 'What is the Black Label collective model and how are the 8 divisions connected?',
      answer:
        'Black Label operates as a unified luxury ecosystem consisting of eight specialized entities: Social, Entertainment, Trading, Lifestyle, Design, Business Services, Investments, and Luxury. Clients may engage individual divisions for specific mandates or retain the entire collective through our Private Concierge Desk with zero coordination friction.',
    },
    {
      question: 'Who typically engages Black Label Lifestyle services?',
      answer:
        'Our clients are venture-backed founders, private equity and hedge fund partners, high-growth technology executives, and luxury homeowners in San Francisco who recognize that operational friction is the biggest constraint on their personal output and enterprise scaling.',
    },
    {
      question: 'How does the Millennium Tower resident integration work?',
      answer:
        'While we serve select private clients across San Francisco and the Silicon Valley corridor, our physical headquarters and primary service infrastructure are anchored directly within Millennium Tower at 301 Mission St. Residents enjoy expedited on-site key delivery, priority valet coordination, and instant dispatch.',
    },
    {
      question: 'Can we hire Black Label for a single project or is a continuous membership required?',
      answer:
        'Both options are available. You can commission standalone single engagements (e.g., an in-residence sommelier dinner, a high-growth social media sprint, an interior staging overhaul, or luxury vehicle rental) or enter a tailored monthly retainer for holistic estate and business back-office management.',
    },
    {
      question: 'What confidentiality and non-disclosure standards are maintained?',
      answer:
        'Discretion is fundamental to our practice. All staff, concierges, tastemakers, and back-office accountants operate under strict, institutionally audited Non-Disclosure Agreements (NDAs). Personal residences, guest lists, and corporate data remain completely confidential.',
    },
    {
      question: 'What is the initial onboarding timeline for a new client?',
      answer:
        'Upon submitting an intake request through our Concierge Desk, an executive liaison reviews your requirements within two hours. Bespoke consultations are arranged within 24 hours, and operational onboarding can be executed in as little as 48 to 72 hours.',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Black Label Lifestyle',
      url: 'https://blacklabel.life',
      logo: 'https://blacklabel.life/assets/logo-light.png',
      email: 'concierge@blacklabel.life',
      description:
        'San Francisco luxury concierge family of 8 brands based in Millennium Tower offering social growth, in-home events, design, investments, and luxury rentals.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        streetAddress: 'Millennium Tower, SoMa',
        addressCountry: 'US',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Black Label Lifestyle',
      url: 'https://blacklabel.life/',
      description: 'The Black Label Family of Brands in San Francisco',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'The Black Label Family of Brands | SF Luxury Concierge',
    description:
      'Eight companies. One standard. San Francisco luxury concierge based in Millennium Tower offering social, events, design, investments, and luxury rentals.',
    canonicalUrl: 'https://blacklabel.life/',
    jsonLd,
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/')}

  <main id="main-content">
    <!-- 1. CINEMATIC TWILIGHT PENTHOUSE HERO -->
    <section id="hero" class="relative min-h-[96vh] sm:min-h-screen flex items-center pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-28 overflow-hidden border-b border-white/[0.08]">
      <!-- Background Luxury Visual Asset & Cinematic Drift -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" data-hero-parallax-bg>
        <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco Penthouse at Twilight" width="1920" height="1080" class="w-full h-full object-cover filter brightness-[0.38] contrast-105 anim-hero-bg-drift" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/70 to-[#060709]/50"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
        <div class="absolute inset-0 bg-radial-luxury anim-hero-ambient-sweep opacity-60"></div>
      </div>

      <!-- Ambient Golden Dust / Twilight Bokeh Particle Layer -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-[5]" data-hero-parallax-particles aria-hidden="true">
        <div class="absolute top-[28%] left-[12%] w-2.5 h-2.5 rounded-full bg-[#ebd4a2] blur-[1px] anim-hero-particle-1 shadow-[0_0_12px_#ebd4a2]"></div>
        <div class="absolute top-[65%] left-[22%] w-3.5 h-3.5 rounded-full bg-[#c5a059] blur-[1.5px] anim-hero-particle-2 shadow-[0_0_15px_#c5a059]"></div>
        <div class="absolute top-[35%] right-[18%] w-3 h-3 rounded-full bg-[#dfc182] blur-[1px] anim-hero-particle-3 shadow-[0_0_14px_#dfc182]"></div>
        <div class="absolute top-[72%] right-[28%] w-2 h-2 rounded-full bg-[#ebd4a2] blur-[0.8px] anim-hero-particle-4 shadow-[0_0_10px_#ebd4a2]"></div>
        <div class="absolute top-[18%] right-[38%] w-2 h-2 rounded-full bg-[#c5a059] blur-[1px] anim-hero-particle-5 shadow-[0_0_10px_#c5a059]"></div>
        <div class="absolute top-[50%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#faf8f5] blur-[0.5px] anim-hero-particle-2 shadow-[0_0_8px_#faf8f5]"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 sm:space-y-9 z-10" data-hero-parallax-content>
        <!-- Architectural Animated Crest Emblem -->
        <div class="animate-hero-badge flex items-center justify-center" data-luxury-card-tilt>
          <div class="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <!-- Ambient Breathing Glow Behind Crest -->
            <div class="absolute inset-0 bg-radial-glow-champagne rounded-full anim-ambient-breathe pointer-events-none scale-125"></div>

            <svg viewBox="0 0 120 120" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <!-- Outer Rotating Ring with Compass Ticks -->
              <circle cx="60" cy="60" r="54" stroke="#c5a059" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="4 8" class="anim-crest-ring-clockwise" />
              <circle cx="60" cy="60" r="46" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.25" />
              
              <!-- Counter-Rotating Octagram Geometric Lattice -->
              <g class="anim-crest-ring-counter">
                <rect x="25" y="25" width="70" height="70" stroke="#c5a059" stroke-width="0.85" stroke-opacity="0.5" rx="2" />
                <rect x="25" y="25" width="70" height="70" stroke="#ebd4a2" stroke-width="0.85" stroke-opacity="0.5" rx="2" transform="rotate(45 60 60)" />
              </g>

              <!-- Rapid Concentric Inner Radar Ring -->
              <circle cx="60" cy="60" r="22" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.6" stroke-dasharray="8 6" class="anim-crest-ring-fast" />

              <!-- Center Champagne Jewel & Radiance Ticks -->
              <circle cx="60" cy="60" r="8" fill="#060709" stroke="#c5a059" stroke-width="1.5" />
              <circle cx="60" cy="60" r="4" fill="#c5a059" class="anim-sparkle" />

              <!-- 4 Cardinal Ray Crossbars -->
              <line x1="60" y1="6" x2="60" y2="18" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="60" y1="102" x2="60" y2="114" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="6" y1="60" x2="18" y2="60" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="102" y1="60" x2="114" y2="60" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <!-- High-Fashion Roman H1 -->
        <h1 class="animate-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-[#faf8f5] font-light leading-[1.08] tracking-tight max-w-5xl mx-auto">
          The Black Label
          <span class="block text-[#c5a059] font-serif font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4 tracking-normal">
            Private Luxury Collective
          </span>
        </h1>

        <!-- Subheading -->
        <p class="animate-hero-sub text-lg sm:text-xl md:text-2xl text-[#dcd6ca] max-w-4xl mx-auto leading-relaxed font-light">
          Eight companies. One standard. From social growth and in-home events to design, investments and luxury rentals, Black Label exists to give you a life of abundance and the time to enjoy it.
        </p>

        <!-- Buttons -->
        <div class="animate-hero-cta pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7">
          <a href="#brands" id="hero-explore-btn" class="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#faf8f5] border border-[#c5a059]/60 hover:bg-[#c5a059]/15 hover:border-[#c5a059] transition-all duration-300 rounded-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Explore 8 Divisions ↓
          </a>
          <a href="/concierge" id="hero-concierge-btn" class="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_22px_rgba(197,160,89,0.35)] hover:shadow-[0_0_28px_rgba(197,160,89,0.55)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Private Concierge Desk
          </a>
        </div>

        <!-- Animated Scroll Cue with Downward Laser Pulse -->
        <div class="pt-6 sm:pt-8 pb-1 flex flex-col items-center justify-center">
          <a href="#brands" class="group inline-flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#a69f91] hover:text-[#c5a059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]" aria-label="Scroll to discover divisions">
            <span>Discover The Collective</span>
            <div class="w-[18px] h-8 rounded-full border border-[#c5a059]/40 p-1 flex justify-center relative overflow-hidden bg-black/40">
              <div class="w-1 h-2.5 rounded-full bg-[#c5a059] anim-scroll-beam shadow-[0_0_8px_#c5a059]"></div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 2. "CHOOSE YOUR BLACK LABEL" WITH INTERACTIVE FILTER TABS -->
    <section id="brands" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4" data-reveal="fade-up">
          <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">Eight Specialized Divisions</span>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Choose Your Black Label</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Engineered from Millennium Tower to protect focus, generate abundance, and manage every dimension of high-performance luxury living.
          </p>
        </div>

        <!-- Curated 8 Division Bento Grid -->
        <div id="division-cards-grid" data-reveal-stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
          ${brandGridHtml}
        </div>
      </div>
    </section>

    <!-- 3. THE BLACK LABEL MINDSET (ATMOSPHERIC NOIR) -->
    <section id="quote-section" data-reveal-section class="py-28 sm:py-36 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-60"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10" data-reveal="fade-up">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
          <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[11px]">The Black Label Mindset</span>
        </div>

        <blockquote class="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#faf8f5] leading-snug tracking-tight">
          “Hire out everything that distracts you from what you are building. <br class="hidden sm:inline" />
          <span class="italic text-gold-accent font-normal">Time is the only asset you cannot buy back.</span>”
        </blockquote>

        <div class="pt-3 flex items-center justify-center gap-4">
          <span class="h-px w-20 bg-[#c5a059]/40"></span>
          <span class="text-xs uppercase tracking-[0.25em] text-[#a69f91] font-mono">Founding Principle · Millennium Tower</span>
          <span class="h-px w-20 bg-[#c5a059]/40"></span>
        </div>
      </div>
    </section>

    <!-- 4. "ORIGIN & HERITAGE" (RE-ARCHITECTED LUXURY DUAL-CANVAS SHOWCASE) -->
    <section id="story-section" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Origin & Heritage · San Francisco</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            Built from the <span class="italic text-gold-accent font-normal">top floor down</span>
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Born in the residences of Millennium Tower at 301 Mission St, Black Label was created out of a singular realization: operational friction is the silent tax on human achievement.
          </p>
        </div>

        <!-- Editorial Dual-Canvas Frame -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <!-- Left Architectural Visual Canvas -->
          <div class="lg:col-span-6 flex flex-col" data-reveal="slide-left">
            <div class="relative w-full h-full min-h-[420px] rounded-sm overflow-hidden border border-[#c5a059]/30 shadow-2xl group flex flex-col justify-end p-8 sm:p-10">
              <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco Skyline at Dusk" width="1200" height="800" loading="lazy" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-105 luxury-image-zoom transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/50 to-transparent"></div>
              
              <!-- Subtle decorative gold corner brackets -->
              <div class="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]/50"></div>
              <div class="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]/50"></div>
              
              <!-- Architectural Brass Plaque -->
              <div class="relative z-10 p-6 rounded bg-[#060709]/90 backdrop-blur-md border border-[#c5a059]/40 space-y-2">
                <div class="flex items-center justify-between text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  <span>San Francisco, CA</span>
                  <span>37.7903° N, 122.3972° W</span>
                </div>
                <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Millennium Tower Residences</h3>
                <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                  “In high-stakes living, friction is the enemy of focus. We built the sovereign infrastructure so you can operate at peak elevation.”
                </p>
                <div class="pt-2 flex items-center gap-3 text-[10px] font-mono text-[#a69f91] uppercase tracking-wider">
                  <span>301 Mission St</span>
                  <span>·</span>
                  <span>Transbay SoMa Hub</span>
                  <span>·</span>
                  <span class="text-[#c5a059]">Active Resident Terminal</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: The Three Pillars of Sovereignty -->
          <div class="lg:col-span-6 flex flex-col justify-between space-y-6" data-reveal-stagger>
            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 01</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">01</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">The Abundance Standard</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                Why compromise between aggressive enterprise scaling and private sanctuary? We manage housekeeping, culinary dining, staging, and exotic transport concurrently so your home environment mirrors the caliber of your ambitions.
              </p>
            </div>

            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 02</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">02</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Institutional Discretion</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                Every butler, chef, private chauffeur, and back-office CPA operates under strict, audited non-disclosure protocols. Your schedules, residential guests, and family finances are sealed behind absolute institutional privacy.
              </p>
            </div>

            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 03</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">03</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Zero Handoff Friction</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                A single concierge liaison orchestrates all eight specialized operating companies. No fragmented vendors, no redundant invoices, and no phone tag—just seamless luxury execution with one point of command.
              </p>
            </div>
          </div>
        </div>

        <!-- Architectural Metric Showcase Ribbon -->
        <div class="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-sm overflow-hidden shadow-2xl" data-reveal-stagger>
          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">8</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Specialized Companies</p>
            <p class="text-xs text-[#a69f91] font-light">One unified luxury standard</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">48 hrs</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Weekly Reclaim</p>
            <p class="text-xs text-[#a69f91] font-light">Sovereign focus returned</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">3 · 6 · 9 mo</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Turnkey Leases</p>
            <p class="text-xs text-[#a69f91] font-light">Furnished executive suites</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">301 Mission</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Resident Core</p>
            <p class="text-xs text-[#a69f91] font-light">Millennium Tower headquarters</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. "RESIDENTIAL FOCUS ENGINE" (RE-ARCHITECTED EXECUTIVE COMMAND CONSOLE) -->
    <section id="time-calculator" data-reveal-section class="py-28 sm:py-36 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Residential Focus Engine · Bandwidth Model</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Calculate Your Reclaimed Time</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Toggle the operational dimensions you delegate to Black Label. Watch your returned weekly focus compound into business growth and personal freedom.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <!-- Interactive Selector Cards (8 cols) -->
          <div class="lg:col-span-7 space-y-4" data-reveal-stagger>
            <!-- Service Card 1 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="24" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Daily Housekeeping & Wardrobe Architecture</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+24 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Turnkey morning reset, garment preservation, laundry management, evening turn-down, and direct butler dispatch.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 2 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="12" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">In-Residence Private Chef & Sommelier Dinners</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+12 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Bespoke menu engineering, organic market sourcing, tableside dining, and pristine zero-trace kitchen restoration.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 3 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="8" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Institutional Back Office (Accounting, Tax & Legal)</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+8 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Corporate entity governance, bookkeeping, vendor reconciliation, tax strategy, and regulatory compliance under one roof.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 4 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="4" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Furnished SoMa Lease & Staging Management</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+4 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Turnkey executive leasing, tenant vetting, and architectural staging maintenance across San Francisco's premier towers.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <!-- Right Telemetry Console (5 cols) -->
          <div class="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 bg-[#060709] border border-[#c5a059]/40 rounded-sm shadow-2xl relative overflow-hidden" data-reveal="slide-right">
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-[#c5a059]/10 blur-3xl pointer-events-none"></div>
            
            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium">Live Telemetry</span>
                <span class="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Calculator
                </span>
              </div>

              <div>
                <span class="block text-xs uppercase tracking-[0.2em] text-[#a69f91] font-mono mb-2">Weekly Sovereign Focus Reclaimed</span>
                <div id="total-reclaimed-hours" class="text-6xl sm:text-7xl font-serif text-[#faf8f5] font-light tracking-tight">
                  48 hrs
                </div>
                <div id="monthly-reclaimed-hours" class="text-sm font-mono text-[#c5a059] mt-1 font-medium">
                  ~208 hrs / mo
                </div>
              </div>

              <!-- Visual Capacity Meter -->
              <div class="space-y-2">
                <div class="flex justify-between text-xs text-[#a69f91] font-mono">
                  <span>Reclaimed Bandwidth</span>
                  <span class="text-[#faf8f5]">100% of ceiling</span>
                </div>
                <div class="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="reclaimed-progress-bar" class="h-full bg-gradient-to-r from-[#c5a059] to-[#ebd4a2] transition-all duration-500 rounded-full" style="width: 100%;"></div>
                </div>
              </div>

              <!-- Equivalency Note -->
              <div class="p-4 rounded bg-white/[0.03] border border-white/10 space-y-1">
                <p class="text-xs sm:text-[13px] text-[#faf8f5] font-medium">
                  Equivalent to 2.0 full uninterrupted working days every 7 days.
                </p>
                <p class="text-xs text-[#dcd6ca]/75 font-light">
                  Direct bandwidth unlocked to invest in deal flow, company building, and physical restoration.
                </p>
              </div>
            </div>

            <div class="pt-6 relative z-10">
              <a href="/concierge" class="w-full inline-flex items-center justify-center py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                Lock In Your Allocation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FREQUENTLY ASKED QUESTIONS (NEW SECTION) -->
    <section id="faq-section" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Institutional Clarity</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Frequently Asked Questions</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Direct answers regarding our 8-division operating collective, Millennium Tower residence privileges, and client onboarding.
          </p>
        </div>

        <!-- Accordion Container -->
        <div class="space-y-4" data-reveal-stagger>
          ${homeFaqs
            .map(
              (faq, idx) => `
            <details class="group bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 rounded-sm transition-all duration-300 open:border-[#c5a059]/60 open:bg-[#0e1218]" data-reveal="fade-up">
              <summary class="flex items-center justify-between p-6 sm:p-7 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-xs text-[#c5a059]">0${idx + 1}</span>
                  <span class="text-base sm:text-lg font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
                    ${faq.question}
                  </span>
                </div>
                <span class="ml-4 p-1.5 rounded-sm border border-white/10 text-[#c5a059] transition-transform duration-300 group-open:rotate-180">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div class="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 text-sm text-[#dcd6ca] font-light leading-relaxed border-t border-white/[0.04]">
                <p class="pt-4">${faq.answer}</p>
              </div>
            </details>
          `
            )
            .join('')}
        </div>

        <div class="mt-12 text-center pt-4" data-reveal="fade-up">
          <p class="text-xs sm:text-sm text-[#a69f91] font-light">
            Have a custom requirement or institutional mandate?
            <a href="/concierge" class="text-[#c5a059] hover:underline underline-offset-4 ml-1 font-medium">
              Consult with our concierge desk directly →
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- 7. "PRIORITY INTAKE" (RE-ARCHITECTED PRIVATE CLIENT INTAKE TERMINAL) -->
    <section id="concierge-desk" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-40"></div>
      
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Direct Executive Access · Millennium Tower SF</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5] leading-tight">
            Priority Intake Desk
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Whether orchestrating a single urgent engagement or initiating an enterprise collective retainer, our concierge liaison routes your mandate directly to leadership.
          </p>
        </div>

        <!-- Dual Column Intake Terminal -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Left Column: Diplomatic Desk & Institutional Credentials -->
          <div class="lg:col-span-5 space-y-6" data-reveal="slide-left">
            <div class="p-8 sm:p-10 rounded-sm bg-[#0b0e13] border border-white/[0.08] space-y-6">
              <div>
                <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">Direct Electronic Mail</span>
                <a href="mailto:concierge@blacklabel.life" class="block text-2xl sm:text-3xl font-serif text-[#faf8f5] hover:text-[#c5a059] transition-colors mt-1 underline underline-offset-8 decoration-[#c5a059]/40">
                  concierge@blacklabel.life
                </a>
                <p class="text-xs text-[#a69f91] font-mono mt-1">Direct Liaison Window Monitored 24/7</p>
              </div>

              <div class="space-y-4 pt-4 border-t border-white/[0.08]">
                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">Millennium Tower Concierge Suite</p>
                    <p class="text-xs text-[#a69f91] font-light">301 Mission St, SoMa, San Francisco, CA</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">&lt; 2 Hour Executive Response SLA</p>
                    <p class="text-xs text-[#a69f91] font-light">Direct response guaranteed for all principal inquiries</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">Institutional Non-Disclosure</p>
                    <p class="text-xs text-[#a69f91] font-light">Audited privacy & NDA protocols standard</p>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase tracking-wider text-[#a69f91]">Status</span>
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Liaison Available Now
                </span>
              </div>
            </div>

            <!-- Alternative Action Card -->
            <div class="p-6 rounded-sm bg-[#060709] border border-[#c5a059]/30 text-center space-y-3">
              <p class="text-xs text-[#dcd6ca] font-light">
                Prefer our multi-step interactive concierge terminal with detailed budget and schedule selectors?
              </p>
              <a href="/concierge" class="inline-flex items-center justify-center w-full py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-sm">
                Launch Full Concierge Desk →
              </a>
            </div>
          </div>

          <!-- Right Column: Priority Intake Dispatch Terminal Form -->
          <div class="lg:col-span-7 p-8 sm:p-10 rounded-sm bg-[#0b0e13] border border-[#c5a059]/40 shadow-2xl relative" data-reveal="slide-right">
            <div class="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Priority Dispatch Terminal</h3>
                <p class="text-xs text-[#a69f91] mt-0.5">Direct encrypted routing to executive team</p>
              </div>
              <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-sm">
                Priority Tier
              </span>
            </div>

            <form id="priority-intake-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="priority-name" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                    Principal or Office Name *
                  </label>
                  <input type="text" id="priority-name" required placeholder="e.g., Alexander Vance" class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors" />
                </div>
                <div>
                  <label for="priority-email" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                    Corporate Email or Line *
                  </label>
                  <input type="email" id="priority-email" required placeholder="name@domain.com" class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label for="priority-division" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                  Primary Division of Interest *
                </label>
                <select id="priority-division" required class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] focus-visible:outline-none transition-colors">
                  <option value="Holistic Collective Retainer">All 8 Divisions — Holistic Collective Retainer</option>
                  <option value="Social Media Scaling">01 · Social Media Scaling & Authority</option>
                  <option value="In-Residence Dining">02 · In-Residence Dining & Sommelier Dinners</option>
                  <option value="AI Trading & Vaulting">03 · AI Trading Strategy & Physical Vaulting</option>
                  <option value="Housekeeping & Butler">04 · Housekeeping & Estate Butler Management</option>
                  <option value="Interior Staging">05 · Architectural Design & Interior Staging</option>
                  <option value="Business Services">06 · Corporate Back Office (Accounting & Tax)</option>
                  <option value="SoMa Investments">07 · SoMa Real Estate Fund & Leases</option>
                  <option value="Exotic Cars & Luxury">08 · Exotic Vehicles, Aircraft & Haute Horlogerie</option>
                </select>
              </div>

              <div>
                <label for="priority-notes" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                  Executive Mandate & Timing *
                </label>
                <textarea id="priority-notes" rows="4" required placeholder="Detail your immediate objectives, timeline, or residential requirements..." class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors resize-none"></textarea>
              </div>

              <div class="pt-2">
                <button type="submit" id="priority-submit-btn" class="w-full py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                  Submit Priority Intake Mandate →
                </button>
              </div>

              <!-- Success Notification Banner -->
              <div id="priority-form-success" class="hidden p-4 rounded bg-[#c5a059]/10 border border-[#c5a059]/40 text-center space-y-1">
                <p class="text-sm font-serif text-[#faf8f5] font-medium">Priority Dispatch Prepared</p>
                <p class="text-xs text-[#dcd6ca]/80">Your email client has opened with your pre-formatted mandate. Our concierge liaison will respond within two hours.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// Helper to generate a Division Page HTML
function generateDivisionPage(div: DivisionPageConfig): string {
  // Map division to bespoke high-end photo asset
  const divisionImages: Record<string, string> = {
    social: '/assets/images/social.jpg',
    entertainment: '/assets/images/dining.jpg',
    trading: '/assets/images/trading.jpg',
    lifestyle: '/assets/images/lifestyle.jpg',
    design: '/assets/images/interior.jpg',
    'business-services': '/assets/images/business.jpg',
    investments: '/assets/images/penthouse.jpg',
    luxury: '/assets/images/luxury.jpg',
  };

  const heroImage = divisionImages[div.slug] || '/assets/images/penthouse.jpg';

  const standardsBlocks = div.standards
    .map(
      (std, idx) => `
      <div class="relative p-6 sm:p-7 bg-[#0b0e13]/90 border border-white/[0.09] hover:border-[#c5a059]/60 transition-all duration-300 rounded-sm flex flex-col justify-between group shadow-xl hover:-translate-y-0.5" data-reveal>
        <!-- Subtle Top Corner Accent Reticle -->
        <div class="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div>
          <!-- Top Row: Eyebrow Label & Index -->
          <div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
            <span class="text-[10px] font-mono tracking-[0.22em] text-[#c5a059] font-medium uppercase truncate">
              ${std.label}
            </span>
            <span class="text-[10px] font-mono text-[#a69f91]/60 shrink-0">
              0${idx + 1}
            </span>
          </div>

          <!-- Value / Benchmark Name -->
          <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-light leading-snug tracking-wide mb-2.5">
            ${std.value}
          </h3>

          <!-- Accent Line -->
          <div class="w-6 h-[1px] bg-[#c5a059]/40 group-hover:w-12 group-hover:bg-[#c5a059] transition-all duration-300 mb-3"></div>

          <!-- Description -->
          <p class="text-xs sm:text-[13px] text-[#dcd6ca]/80 font-light leading-relaxed">
            ${std.desc}
          </p>
        </div>

        <!-- Bottom Spec Footnote -->
        <div class="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-[#a69f91]/70 uppercase tracking-widest">
          <span>COVENANT SPEC</span>
          <span class="text-emerald-400/90 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ACTIVE
          </span>
        </div>
      </div>
    `
    )
    .join('');

  const serviceBlocks = div.services
    .map(
      (srv, index) => `
      <article class="p-8 sm:p-10 lg:p-12 bg-[#0b0e13]/90 backdrop-blur-md border border-white/[0.1] hover:border-[#c5a059]/70 rounded-sm space-y-6 luxury-card-hover relative flex flex-col justify-between group shadow-2xl" data-reveal>
        <!-- Architectural Corner Reticles -->
        <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>
        <div class="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div class="space-y-5">
          <!-- Top Row: Serif Number & Badge -->
          <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span class="text-2xl sm:text-3xl font-serif font-light text-[#c5a059]">0${index + 1}</span>
            <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
              ${srv.badge}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
            ${srv.title}
          </h3>

          <!-- Description -->
          <p class="text-sm sm:text-base text-[#dcd6ca]/90 leading-relaxed font-light">
            ${srv.description}
          </p>

          <!-- Deliverables Checklist -->
          <div class="pt-4 border-t border-white/[0.06] space-y-3">
            <span class="text-[10px] font-mono uppercase tracking-[0.22em] text-[#a69f91] block">
              Operational Scope & Deliverables
            </span>
            <ul class="space-y-2.5">
              ${srv.deliverables
                .map(
                  (del) => `
                <li class="flex items-start gap-3 text-xs sm:text-sm text-[#faf8f5]/90 font-light">
                  <span class="text-[#c5a059] text-xs mt-0.5 select-none shrink-0">◆</span>
                  <span>${del}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <span class="text-[#a69f91] uppercase tracking-wider text-[10px] sm:text-[11px]">${srv.spec}</span>
          <a href="/concierge" class="text-[#c5a059] group-hover:text-[#dfc182] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest text-[11px] font-semibold">
            Inquire Scope <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </article>
    `
    )
    .join('');

  const stepsHtml = div.steps
    .map(
      (st) => `
      <div class="p-8 sm:p-10 lg:p-12 bg-[#0b0e13]/90 backdrop-blur-md border border-white/[0.1] hover:border-[#c5a059]/70 rounded-sm space-y-6 luxury-card-hover group relative flex flex-col justify-between shadow-2xl" data-reveal>
        <!-- Corner Reticles -->
        <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>
        <div class="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div class="space-y-5">
          <!-- Step Top Header with Circular Jewel Badge -->
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-full bg-[#060709] border-2 border-[#c5a059] flex items-center justify-center font-serif text-xl text-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)] group-hover:scale-110 group-hover:border-[#ebd4a2] group-hover:text-[#ebd4a2] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all duration-300">
              ${st.num}
            </div>
            <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#a69f91] bg-white/[0.04] border border-white/[0.08] rounded-sm group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 transition-colors">
              ${st.phase}
            </span>
          </div>

          <!-- Step Title -->
          <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium pt-1">
            ${st.title}
          </h3>

          <!-- Step Description -->
          <p class="text-sm sm:text-[15px] text-[#dcd6ca]/90 leading-relaxed font-light">
            ${st.desc}
          </p>
        </div>

        <!-- Milestone & Timeframe Box -->
        <div class="pt-5 border-t border-white/[0.08] space-y-2 bg-[#060709]/60 -mx-8 sm:-mx-10 lg:-mx-12 -mb-8 sm:-mb-10 lg:-mb-12 p-6 rounded-b-sm">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-[#a69f91]">TARGET WINDOW:</span>
            <span class="text-[#faf8f5] font-medium">${st.timeframe}</span>
          </div>
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-[#a69f91]">DIRECT MILESTONE:</span>
            <span class="text-[#c5a059] font-medium text-right">${st.milestone}</span>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  const faqAccordionHtml = div.faqs
    .map(
      (f) => `
      <details class="group py-6 sm:py-7 transition-all focus-within:border-[#c5a059]" data-reveal>
        <summary class="flex items-center justify-between cursor-pointer font-serif text-lg sm:text-xl text-[#faf8f5] group-hover:text-[#c5a059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] rounded-sm py-1">
          <span class="pr-4">${f.question}</span>
          <span class="faq-icon shrink-0 text-xs font-mono text-[#c5a059] border border-[#c5a059]/40 w-7 h-7 flex items-center justify-center rounded-full group-hover:border-[#c5a059] group-hover:scale-110 transition-all">+</span>
        </summary>
        <p class="mt-4 text-sm sm:text-base text-[#dcd6ca]/85 leading-relaxed font-light max-w-3xl pl-1">
          ${f.answer}
        </p>
      </details>
    `
    )
    .join('');

  const relatedHtml = div.related
    .map(
      (rel) => `
      <a href="${rel.href}" class="p-8 bg-[#0b0e13]/80 border border-[#c5a059]/25 hover:border-[#c5a059]/75 rounded-sm group transition-all luxury-card-hover flex flex-col justify-between space-y-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] shadow-lg" data-reveal>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-[#c5a059] uppercase tracking-widest">${rel.label.slice(0, 2)}</span>
            <span class="text-xs text-[#c5a059] font-mono group-hover:translate-x-1 transition-transform">Explore →</span>
          </div>
          <h3 class="text-xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
            ${rel.label}
          </h3>
          <p class="text-xs sm:text-sm text-[#dcd6ca]/80 font-light leading-relaxed">${rel.desc}</p>
        </div>
      </a>
    `
    )
    .join('');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: div.divisionName,
      serviceType: div.services.map((s) => s.title).join(', '),
      provider: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        url: 'https://blacklabel.life',
      },
      areaServed: {
        '@type': 'Place',
        name: 'San Francisco, Millennium Tower',
      },
      description: div.intro,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: div.divisionName,
          item: `https://blacklabel.life/${div.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: div.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: div.pageTitle,
    description: div.metaDesc,
    canonicalUrl: `https://blacklabel.life/${div.slug}`,
    jsonLd,
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader(`/${div.slug}`)}

  <main id="main-content">
    <!-- DIVISION CINEMATIC HERO -->
    <section class="relative pt-32 pb-20 sm:pb-28 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <img src="${heroImage}" alt="${div.divisionName} backdrop" width="1920" height="1080" class="w-full h-full object-cover filter brightness-[0.25] contrast-110 scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/60"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div class="lg:col-span-7 space-y-6">
            <!-- Division Breadcrumb & Number -->
            <div class="flex items-center gap-2.5 animate-inner-hero-tag">
              <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
                ${div.num} DIVISION
              </span>
              <span class="text-xs text-white/30">/</span>
              <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">MILLENNIUM TOWER ORIGIN</span>
            </div>

            <!-- H1 -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
              ${div.h1}
            </h1>

            <!-- Intro -->
            <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light max-w-2xl animate-inner-hero-desc">
              ${div.intro}
            </p>

            <div class="pt-3 flex flex-wrap items-center gap-4 animate-inner-hero-cta">
              <a href="/concierge" class="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                Inquire with Concierge
              </a>
              <a href="#services" class="text-xs uppercase tracking-[0.18em] text-[#dcd6ca] hover:text-[#c5a059] px-5 py-3.5 border border-white/20 hover:border-[#c5a059]/60 rounded-sm transition-colors">
                View Capabilities ↓
              </a>
            </div>
          </div>

          <!-- Custom Division Artwork & Visual Seal with Luxury Micro-Animations and 3D Tilt -->
          <div class="lg:col-span-5 flex justify-center animate-inner-hero-graphic">
            <div data-luxury-card-tilt class="w-full max-w-md aspect-[4/3] p-5 bg-[#0b0e13]/90 backdrop-blur-xl border border-[#c5a059]/35 rounded-sm relative flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group transition-all duration-300">
              <!-- Champagne radial ambient glow -->
              <div class="absolute inset-0 bg-radial-glow-champagne pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

              <!-- Top Architectural Spec Header -->
              <div class="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#c5a059] border-b border-white/[0.08] pb-1.5 z-10">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[#faf8f5]/80">SAN FRANCISCO</span>
                </span>
                <span class="text-[#c5a059]/90 font-light">${div.num} · SOVEREIGN SPEC</span>
              </div>

              <!-- Corner Architectural Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Animated Vector Artwork -->
              <div class="w-full h-full p-2 pt-6 pb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                ${DIVISION_SVGS[div.svgKey] || ''}
              </div>

              <!-- Bottom Status Bar -->
              <div class="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest border-t border-white/[0.08] pt-1.5 z-10">
                <span class="flex items-center gap-1">
                  <span class="text-white/40">ORIGIN:</span>
                  <span class="text-[#faf8f5]/80">MILLENNIUM TOWER</span>
                </span>
                <span class="text-[#c5a059] group-hover:text-[#ebd4a2] transition-colors">AUTHENTIC SPEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OPERATIONAL STANDARDS BENCHMARK STRIP -->
    <section class="py-14 sm:py-20 bg-[#060709] border-b border-white/[0.08] relative z-10 overflow-hidden">
      <!-- Subtle Ambient Glow -->
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-25"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-5 border-b border-white/[0.08]" data-reveal>
          <div class="space-y-1.5">
            <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
              DIVISION ${div.num} · OPERATIONAL BENCHMARKS
            </span>
            <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">
              Sovereign Standards & Covenants
            </h2>
          </div>
          <div class="text-xs font-mono text-[#a69f91] flex items-center gap-2">
            <span>RESIDENCY: MILLENNIUM TOWER</span>
            <span class="text-white/20" aria-hidden="true">·</span>
            <span class="text-[#c5a059]">100% INSTITUTIONAL COMPLIANCE</span>
          </div>
        </div>

        <!-- 4-Column Benchmark Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          ${standardsBlocks}
        </div>
      </div>
    </section>

    <!-- DIVISION SERVICES SECTION -->
    <section id="services" class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-40"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>DIVISION ${div.num}</span>
            <span>·</span>
            <span>SPECIALIZED CAPABILITIES</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            Core Services
          </h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            Four institutional-grade service pillars engineered specifically for Millennium Tower residents and high-growth San Francisco enterprises.
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          ${serviceBlocks}
        </div>
      </div>
    </section>

    <!-- 3-STEP "HOW IT WORKS" PROGRESSIVE TIMELINE -->
    <section id="how-it-works" class="py-24 sm:py-32 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>PRECISION METHODOLOGY</span>
            <span>·</span>
            <span>FRICTION-FREE PROTOCOL</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            How It Works
          </h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            A disciplined, three-stage execution process engineered for immediate responsiveness, total discretion, and zero administrative burden on you.
          </p>
        </div>

        <div class="relative">
          <!-- Desktop Connecting Progress Track -->
          <div class="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#c5a059]/20 via-[#c5a059]/70 to-[#c5a059]/20 z-0 pointer-events-none"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            ${stepsHtml}
          </div>
        </div>

        <!-- Expedited Resident Dispatch Reassurance Strip -->
        <div class="mt-16 p-6 sm:p-8 bg-[#0b0e13]/90 border border-white/[0.1] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl" data-reveal>
          <div class="flex items-center gap-4 text-center sm:text-left">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <div>
              <p class="text-sm sm:text-base font-serif text-[#faf8f5]">Millennium Tower Resident Expedited Dispatch</p>
              <p class="text-xs sm:text-sm text-[#a69f91] font-light">On-site key handoffs, private elevator clearance, and immediate same-day execution available 24/7.</p>
            </div>
          </div>
          <a href="/concierge" class="shrink-0 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md whitespace-nowrap">
            Initiate Phase 01 →
          </a>
        </div>
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faqs" class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>OPERATIONAL PROCEDURES</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#faf8f5] font-light">Inquiries & Answers</h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            Common questions regarding operational parameters, residency access, and confidentiality standards for ${div.divisionName}.
          </p>
        </div>
        <div class="divide-y divide-white/[0.1] bg-[#0b0e13]/60 border border-white/[0.08] rounded-sm p-6 sm:p-10 lg:p-12 shadow-2xl">
          ${faqAccordionHtml}
        </div>
      </div>
    </section>

    <!-- CONCIERGE CTA BAND -->
    <section class="py-24 sm:py-32 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-hero pointer-events-none opacity-50"></div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10" data-reveal>
        <div class="inline-flex items-center gap-2.5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>DEDICATED CONCIERGE ACCESS</span>
        </div>
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight max-w-4xl mx-auto">
          Discuss Your Objectives with Our Private Concierge
        </h2>
        <p class="text-base sm:text-lg text-[#dcd6ca]/90 max-w-2xl mx-auto font-light leading-relaxed">
          Whether you reside in Millennium Tower or require strategic corporate execution across San Francisco, our senior desk connects you directly to the ${div.divisionName} lead with guaranteed two-hour response times.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="/concierge" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Submit Intake for ${div.divisionName}
          </a>
          <a href="mailto:concierge@blacklabel.life" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-mono uppercase tracking-[0.18em] text-[#faf8f5] bg-[#0b0e13] hover:bg-[#12151c] border border-white/[0.15] hover:border-[#c5a059]/60 transition-colors rounded-sm">
            concierge@blacklabel.life
          </a>
        </div>

        <div class="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-[#a69f91]">
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✓</span> Strict NDA Protection
          </span>
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✓</span> Millennium Tower Priority
          </span>
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✓</span> 2-Hour Response
          </span>
        </div>
      </div>
    </section>

    <!-- RELATED DIVISIONS -->
    <section class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4" data-reveal>
          <div>
            <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">The Ecosystem</span>
            <h2 class="text-3xl sm:text-4xl font-serif text-[#faf8f5] mt-1">Related Black Label Divisions</h2>
          </div>
          <a href="/" class="text-xs uppercase tracking-[0.2em] text-[#c5a059] hover:text-[#dfc182] font-semibold transition-colors flex items-center gap-1.5">
            All 8 Brands <span aria-hidden="true">→</span>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${relatedHtml}
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// Helper to generate Concierge Page HTML
function generateConciergePage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Black Label Concierge Desk',
      url: 'https://blacklabel.life/concierge',
      description: 'Inquire with Black Label Lifestyle concierge in Millennium Tower, San Francisco.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        email: 'concierge@blacklabel.life',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Millennium Tower, SoMa',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Concierge',
          item: 'https://blacklabel.life/concierge',
        },
      ],
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Private Concierge Desk | Black Label San Francisco',
    description:
      'Inquire with the Black Label Lifestyle concierge desk at Millennium Tower, San Francisco. Routed directly to our 8 specialized luxury divisions.',
    canonicalUrl: 'https://blacklabel.life/concierge',
    jsonLd,
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/concierge')}

  <main id="main-content">
    <!-- CONCIERGE HEADER -->
    <section class="relative pt-32 pb-20 sm:pb-28 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco" width="1920" height="1080" class="w-full h-full object-cover filter brightness-[0.2] contrast-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/70"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div class="lg:col-span-7 space-y-6">
            <div class="flex items-center gap-2.5 animate-inner-hero-tag">
              <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
                CENTRAL CONCIERGE
              </span>
              <span class="text-xs text-white/30">/</span>
              <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">SOVEREIGN INTAKE</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
              Black Label Concierge Desk
            </h1>

            <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light max-w-2xl animate-inner-hero-desc">
              One point of contact for all eight Black Label divisions. Tell us what you are trying to accomplish and our senior concierge will route and manage your request with absolute confidentiality.
            </p>

            <!-- Direct Electronic Intake & CTA -->
            <div class="pt-3 flex flex-wrap items-center gap-6 animate-inner-hero-cta">
              <div>
                <span class="block text-[10px] uppercase tracking-[0.25em] text-[#a69f91] mb-1 font-mono">Direct Electronic Intake</span>
                <a href="mailto:concierge@blacklabel.life" class="text-xl sm:text-2xl font-serif text-[#c5a059] hover:text-[#dfc182] transition-colors underline underline-offset-8 decoration-[#c5a059]/40">
                  concierge@blacklabel.life
                </a>
              </div>
              <a href="#inquiry-form" class="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md">
                Complete Intake Form ↓
              </a>
            </div>
          </div>

          <!-- Concierge Astrolabe Seal Card -->
          <div class="lg:col-span-5 flex justify-center animate-inner-hero-graphic">
            <div data-luxury-card-tilt class="w-full max-w-md aspect-[4/3] p-5 bg-[#0b0e13]/90 backdrop-blur-xl border border-[#c5a059]/35 rounded-sm relative flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group transition-all duration-300">
              <div class="absolute inset-0 bg-radial-glow-champagne pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

              <!-- Top Architectural Spec Header -->
              <div class="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#c5a059] border-b border-white/[0.08] pb-1.5 z-10">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[#faf8f5]/80">SAN FRANCISCO</span>
                </span>
                <span class="text-[#c5a059]/90 font-light">CENTRAL INTAKE DESK</span>
              </div>

              <!-- Corner Architectural Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Animated Vector Artwork -->
              <div class="w-full h-full p-2 pt-6 pb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                ${DIVISION_SVGS.concierge || ''}
              </div>

              <!-- Bottom Status Bar -->
              <div class="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest border-t border-white/[0.08] pt-1.5 z-10">
                <span class="flex items-center gap-1">
                  <span class="text-white/40">ORIGIN:</span>
                  <span class="text-[#faf8f5]/80">MILLENNIUM TOWER</span>
                </span>
                <span class="text-[#c5a059] group-hover:text-[#ebd4a2] transition-colors">ACTIVE DESK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GOOGLE MAP WITH CONCIERGE CONTACT FORM SECTION (DARK LUXURY TERMINAL) -->
    <section id="inquiry-form" class="py-20 sm:py-28 bg-[#060709] border-t border-white/[0.08] text-[#faf8f5] relative overflow-hidden">
      <!-- Subtle Ambient Lighting -->
      <div class="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#c5a059]/[0.03] blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#c5a059]/[0.02] blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- SECTION EDITORIAL HEADER -->
        <div class="max-w-3xl mb-12 sm:mb-16 space-y-4" data-reveal="fade-up">
          <div class="flex flex-wrap items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-[#c5a059] uppercase">
            <span>MILLENNIUM TOWER</span>
            <span class="text-white/30" aria-hidden="true">·</span>
            <span>301 MISSION STREET</span>
            <span class="text-white/30" aria-hidden="true">·</span>
            <span>SAN FRANCISCO HQ</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#faf8f5] font-light leading-[1.15]">
            The Concierge Desk & Mandate Terminal
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca]/85 font-light leading-relaxed">
            Direct your mandate to our executive liaisons, review private residential arrival protocols at Millennium Tower, or initiate immediate dispatch across all eight Black Label divisions.
          </p>

          <!-- Zero-Pill Unboxed Key Assurance Pillars -->
          <div class="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/[0.08] mt-6 pt-6">
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">RESPONSE SLA</span>
              <span class="text-sm font-serif text-[#c5a059] font-medium">&lt; 2 Hours Guaranteed</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">VALET ARRIVAL</span>
              <span class="text-sm font-serif text-[#faf8f5] font-medium">Fremont St Porte-Cochère</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">CONFIDENTIALITY</span>
              <span class="text-sm font-serif text-[#c5a059] font-medium">100% Institutional NDA</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">JURISDICTION</span>
              <span class="text-sm font-serif text-[#faf8f5] font-medium">Global via SF Command</span>
            </div>
          </div>
        </div>

        <!-- MAIN DUAL-STAGE GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: MULTI-PERSPECTIVE LUXURY MAP & TOWER TERMINAL (7 COLS) -->
          <div class="lg:col-span-7 flex flex-col space-y-4" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none z-20"></div>

              <!-- Top Terminal Header -->
              <div class="p-3.5 sm:p-4 bg-[#090b0e] border-b border-white/[0.08] flex items-center justify-between gap-3 relative z-10">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold">
                    Millennium Tower · Headquarters Terminal
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-sm border border-[#c5a059]/30">
                    301 Mission St · Level 48 HQ
                  </span>
                </div>
              </div>

              <!-- VIEW 1: GOOGLE MAP LIVE VIEW -->
              <div id="terminal-view-map" class="relative w-full">
                <!-- Map Top HUD Bar -->
                <div class="px-4 py-2 bg-[#060709]/95 backdrop-blur-md border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#dcd6ca]/80">
                  <div class="flex items-center gap-2">
                    <span class="text-[#c5a059] font-medium">37.7903° N, 122.3970° W</span>
                    <span class="text-white/20">|</span>
                    <span>Elev. 645 FT</span>
                    <span class="text-white/20">|</span>
                    <span class="text-emerald-400">Valet Active</span>
                  </div>
                  <button
                    type="button"
                    data-copy-address="301 Mission St, San Francisco, CA 94105"
                    class="hover:text-[#c5a059] transition-colors flex items-center gap-1 focus-visible:outline-none text-[10px] uppercase tracking-wider"
                    title="Copy Address to Clipboard"
                  >
                    <svg class="w-3 h-3 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span id="copy-address-label">Copy Address</span>
                  </button>
                </div>

                <!-- Google Map Embed Container -->
                <div class="relative w-full h-[460px] sm:h-[500px] bg-[#060709] overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="w-full h-full filter contrast-[1.08] brightness-[0.92]"
                    title="Google Map of Millennium Tower, 301 Mission St, San Francisco"
                  ></iframe>

                  <!-- Floating Architectural Pin Overlay -->
                  <div class="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-10 pointer-events-auto">
                    <div class="p-3 bg-[#060709]/95 backdrop-blur-xl border border-[#c5a059]/40 rounded-sm shadow-2xl">
                      <div class="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-1">
                        Sovereign Anchor
                      </div>
                      <div class="text-sm font-serif text-[#faf8f5] font-medium leading-tight">
                        Millennium Tower · Level 48 HQ
                      </div>
                      <div class="text-[11px] text-[#dcd6ca]/80 mt-1">
                        Private Porte-Cochère valet on Fremont St. High-speed residential elevators with biometric clearance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map Specification & Directions Bar -->
              <div class="p-4 sm:p-5 bg-[#090b0e] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div class="space-y-1">
                  <div class="text-[#faf8f5] font-serif text-sm font-medium">Millennium Tower · 301 Mission St, San Francisco, CA 94105</div>
                  <div class="text-[#a69f91] font-mono text-[11px]">Private Valet: Fremont St Porte-Cochère · SoMa Financial District</div>
                </div>

                <div class="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://maps.google.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Google Maps ↗
                  </a>
                  <a
                    href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-[#faf8f5] border border-white/10 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Apple Maps ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: SOVEREIGN MANDATE INTAKE TERMINAL (5 COLS) -->
          <div class="lg:col-span-5" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/40 rounded-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Terminal Heading -->
              <div class="mb-6 space-y-1.5 border-b border-white/[0.08] pb-5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                    SOVEREIGN INTAKE TERMINAL
                  </span>
                  <span class="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                    LIVE DISPATCH
                  </span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-medium">
                  Submit Private Mandate
                </h3>
                <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
                  Single point of command for all eight luxury divisions. Active response SLA: &lt; 2 hours.
                </p>
              </div>

              <!-- Success banner -->
              <div id="form-success-banner" class="hidden mb-6 p-5 bg-[#060709] text-[#faf8f5] border border-[#c5a059] rounded-sm shadow-xl space-y-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span class="text-sm font-serif text-[#c5a059] font-semibold">Mandate Transmission Prepared</span>
                </div>
                <div class="text-xs font-mono text-[#faf8f5] bg-white/[0.03] p-2.5 rounded border border-white/10">
                  <div class="text-[#a69f91] text-[10px]">SOVEREIGN REFERENCE TOKEN:</div>
                  <div id="success-token-ref" class="text-base text-[#c5a059] font-bold tracking-wider mt-0.5">BLL-SF-884219</div>
                </div>
                <p class="text-xs text-[#dcd6ca]/90 leading-relaxed font-light">
                  Your native email client has launched with encrypted mandate parameters addressed to <strong class="text-white">concierge@blacklabel.life</strong>. Our executive liaison will acknowledge receipt within 2 hours.
                </p>
                <div class="pt-2 flex items-center gap-2">
                  <a href="mailto:concierge@blacklabel.life" class="px-3 py-1.5 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors">
                    Re-open Email Client
                  </a>
                  <button type="button" id="reset-mandate-form-btn" class="px-3 py-1.5 bg-white/[0.05] hover:bg-white/10 text-xs text-[#faf8f5] border border-white/10 rounded-sm transition-colors">
                    New Mandate
                  </button>
                </div>
              </div>

              <form id="concierge-inquiry-form" class="space-y-4 sm:space-y-5">
                
                <!-- STEP 1: DIVISION SELECTOR DROPDOWN -->
                <div>
                  <label for="form-division" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-2">
                    1. Select Division or Scope <span class="text-[#c5a059]">*</span>
                  </label>
                  <div class="relative">
                    <select
                      id="form-division"
                      name="division"
                      required
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs sm:text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] appearance-none cursor-pointer pr-10"
                    >
                      <option value="General Concierge">General Concierge — Central Triage &amp; Route My Mandate</option>
                      <option value="01 Social">01 Social — Organic Authority &amp; Executive Reach</option>
                      <option value="02 Entertainment">02 Entertainment — Private Dining &amp; Bespoke Galas</option>
                      <option value="03 Trading">03 Trading — AI Collectibles &amp; Vaulting</option>
                      <option value="04 Lifestyle">04 Lifestyle — Style, Housekeeping &amp; Butler Service</option>
                      <option value="05 Design">05 Design — Architectural Staging &amp; Interiors</option>
                      <option value="06 Business Services">06 Business Services — Institutional Back Office &amp; Tax</option>
                      <option value="07 Investments">07 Investments — SoMa Trophy Real Estate</option>
                      <option value="08 Luxury">08 Luxury — Exotic Fleet &amp; Haute Horlogerie</option>
                      <option value="Executive Retainer">★ Sovereign Whole-Collective Retainer</option>
                    </select>
                    <!-- Custom Chevron -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#c5a059]">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- STEP 2: CONTACT CREDENTIALS (Email & Phone) -->
                <div class="space-y-3 pt-1">
                  <div>
                    <label for="form-email" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      2. Confidential Email <span class="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      placeholder="e.g. liaison@domain.com"
                      class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>

                  <div>
                    <label for="form-phone" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Direct Phone / Signal <span class="text-[#a69f91] font-normal text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="form-phone"
                      placeholder="+1 (415) 890-4800"
                      class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>
                </div>

                <!-- STEP 3: MANDATE OBJECTIVES & SCOPE -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="form-message" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold">
                      3. Mandate Objectives & Scope <span class="text-[#c5a059]">*</span>
                    </label>
                    <span class="text-[10px] font-mono text-[#a69f91]">STRICT NDA</span>
                  </div>
                  <textarea
                    id="form-message"
                    required
                    rows="4"
                    placeholder="Describe your objectives, timeline, or required division coordination..."
                    class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40 leading-relaxed font-light"
                  ></textarea>
                </div>

                <!-- TRANSMIT BUTTON -->
                <button
                  type="submit"
                  id="concierge-submit-btn"
                  class="w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] relative overflow-hidden group cursor-pointer"
                >
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <span>Transmit Sovereign Mandate</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

        <!-- THREE SUPPORTING EXECUTIVE INTELLIGENCE CARDS -->
        <div class="mt-14 sm:mt-18 pt-10 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal="fade-up">
          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">01. PRIVATE APPOINTMENTS</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Level 48 Executive Salon</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Confidential in-person appointments hosted within our private chambers at Millennium Tower. Advance guest authorization and building security pass generated upon mandate confirmation.
            </p>
          </div>

          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">02. PORTE-COCHÈRE STAGING</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Fremont St White-Glove Valet</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Private vehicle arrival with continuous valet security. Secure subterranean staging for high-performance exotics, armored executive transport, and chauffeured fleets.
            </p>
          </div>

          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">03. WHOLE-COLLECTIVE RETAINERS</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Institutional Family Office</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Multi-division governance and lifestyle architecture for principals, family offices, and tech enterprise founders requiring unified executive command.
            </p>
          </div>
        </div>

      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// Helper to generate Contact Page HTML with Interactive Map and Sovereign Form
function generateContactPage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Black Label Lifestyle Contact & Headquarters',
      url: 'https://blacklabel.life/contact',
      description: 'Contact Black Label Lifestyle at Millennium Tower, San Francisco. Interactive headquarters map and sovereign concierge inquiry terminal.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        email: 'concierge@blacklabel.life',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Millennium Tower, 301 Mission St',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.7903,
          longitude: -122.397,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://blacklabel.life/contact',
        },
      ],
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Contact & Headquarters | Black Label San Francisco',
    description:
      'Contact Black Label Lifestyle at Millennium Tower, 301 Mission St, San Francisco. Interactive headquarters map, encrypted mandate intake form, and 24/7 concierge coverage.',
    canonicalUrl: 'https://blacklabel.life/contact',
    jsonLd,
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/contact')}

  <main id="main-content">
    <!-- CONTACT HERO SECTION -->
    <section class="relative pt-32 pb-16 sm:pb-20 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco" width="1920" height="1080" class="w-full h-full object-cover filter brightness-[0.18] contrast-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/85 to-[#060709]/75"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="max-w-3xl space-y-6">
          <div class="flex items-center gap-2.5 animate-inner-hero-tag">
            <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
              SAN FRANCISCO HEADQUARTERS
            </span>
            <span class="text-xs text-white/30">/</span>
            <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">SOVEREIGN INTAKE</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
            Contact Black Label
          </h1>

          <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light animate-inner-hero-desc">
            Sovereign collective headquarters anchored in Millennium Tower, 301 Mission St. Coordinate direct electronic intake, schedule high-security private residence appointments, or submit confidential briefs across all eight divisions.
          </p>

          <!-- Direct Electronic Intake Telemetry Pills -->
          <div class="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 animate-inner-hero-cta">
            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#e6e0d4]">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Direct Telemetry:</span>
              <a href="mailto:concierge@blacklabel.life" class="text-[#c5a059] hover:underline">concierge@blacklabel.life</a>
            </div>

            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#a69f91]">
              <svg class="w-3.5 h-3.5 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>301 Mission St, San Francisco, CA 94105</span>
            </div>

            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#a69f91]">
              <span class="text-[#c5a059]">24/7/365</span>
              <span>Executive Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN TERMINAL: INTERACTIVE MAP & CONTACT FORM STAGE -->
    <section class="py-16 sm:py-24 bg-[#060709] border-b border-white/[0.08] relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: INTERACTIVE LUXURY DARK MAP -->
          <div class="lg:col-span-7 flex flex-col space-y-4" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/35 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between">
              
              <!-- Map Toolbar Header -->
              <div class="p-3.5 sm:p-4 bg-[#090b0e] border-b border-white/[0.08] flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-mono uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">
                    Millennium Tower · Headquarters
                  </span>
                </div>

                <!-- Custom Map Action Controls -->
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    id="map-recenter"
                    class="p-1.5 px-2.5 text-[11px] font-mono uppercase tracking-wider text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    title="Recenter Millennium Tower"
                  >
                    <svg class="w-3.5 h-3.5 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                      <line x1="12" y1="2" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="22" y2="12" />
                    </svg>
                    <span class="hidden sm:inline">Recenter</span>
                  </button>

                  <button
                    type="button"
                    id="map-zoom-in"
                    class="w-7 h-7 flex items-center justify-center text-sm font-mono text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    aria-label="Zoom in map"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    id="map-zoom-out"
                    class="w-7 h-7 flex items-center justify-center text-sm font-mono text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    aria-label="Zoom out map"
                  >
                    −
                  </button>
                </div>
              </div>

              <!-- Leaflet Map Container -->
              <div class="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] bg-[#060709] overflow-hidden">
                <div id="contact-map" class="w-full h-full z-0"></div>

                <!-- Subtle Top Floating Badge Overlay -->
                <div class="absolute top-3 left-3 z-[400] pointer-events-none">
                  <div class="px-2.5 py-1 bg-[#060709]/85 backdrop-blur-md border border-white/10 rounded-sm text-[10px] font-mono text-[#e6e0d4]/90 flex items-center gap-1.5 shadow-lg">
                    <span class="text-[#c5a059]">37.7903° N, 122.3970° W</span>
                    <span class="text-white/20">|</span>
                    <span>Elev. 645 FT</span>
                  </div>
                </div>
              </div>

              <!-- Map Specification & Directions Bar -->
              <div class="p-4 sm:p-5 bg-[#090b0e] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div class="space-y-1">
                  <div class="text-[#faf8f5] font-serif text-sm font-medium">301 Mission St, San Francisco, CA 94105</div>
                  <div class="text-[#a69f91] font-mono text-[11px]">Private Valet: Fremont St Porte-Cochère · SoMa District</div>
                </div>

                <div class="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Apple Maps ↗
                  </a>
                  <a
                    href="https://maps.google.com/?q=301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-[#faf8f5] border border-white/10 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Google Maps ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: SOVEREIGN CONTACT FORM -->
          <div class="lg:col-span-5" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/35 rounded-sm p-6 sm:p-8 shadow-2xl relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/60 pointer-events-none"></div>

              <div class="mb-6 space-y-1.5 border-b border-white/[0.08] pb-5">
                <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                  ENCRYPTED MANDATE INTAKE
                </span>
                <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-medium">
                  Direct Concierge Terminal
                </h2>
                <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
                  All transmissions handled under strict NDA protocols. Guaranteed executive review within 2 hours.
                </p>
              </div>

              <!-- Success Banner -->
              <div id="contact-success-banner" class="hidden mb-6 p-4 bg-[#060709] text-[#faf8f5] border border-[#c5a059] rounded-sm">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-mono uppercase tracking-widest text-[#c5a059] font-semibold">Mandate Formatted</span>
                  <span id="contact-ticket-ref" class="text-xs font-mono text-white/70"></span>
                </div>
                <p class="text-xs text-[#dcd6ca]/90 leading-relaxed">
                  Your mail client has been opened with your mandate addressed to <strong class="text-[#c5a059]">concierge@blacklabel.life</strong>. Our senior concierge liaison will acknowledge receipt within 2 hours.
                </p>
              </div>

              <!-- Contact Form -->
              <form id="contact-form" class="space-y-4 sm:space-y-5">
                
                <div>
                  <label for="contact-name" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                    Principal / Client Name <span class="text-[#c5a059]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="e.g. Sterling Hayes"
                    class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-email" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Direct Email <span class="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="s.hayes@domain.com"
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>

                  <div>
                    <label for="contact-phone" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Phone / Signal (Confidential)
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      placeholder="+1 (415) ..."
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-division" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Division <span class="text-[#c5a059]">*</span>
                    </label>
                    <select
                      id="contact-division"
                      required
                      class="w-full px-3 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    >
                      <option value="General Concierge">General Concierge / Route Me</option>
                      <option value="01 Social">01 Social — AI Growth Engine</option>
                      <option value="02 Entertainment">02 Entertainment — In-Residence Dining</option>
                      <option value="03 Trading">03 Trading — Collectibles AI</option>
                      <option value="04 Lifestyle">04 Lifestyle — Butlers & Time Reclaimed</option>
                      <option value="05 Design">05 Design — Staging & Interiors</option>
                      <option value="06 Business Services">06 Business — Back Office & Legal</option>
                      <option value="07 Investments">07 Investments — SoMa Leases & Fund</option>
                      <option value="08 Luxury">08 Luxury — Exotics & High Jewelry</option>
                      <option value="Executive Retainer">Private Collective Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label for="contact-urgency" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Urgency / SLA
                    </label>
                    <select
                      id="contact-urgency"
                      class="w-full px-3 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    >
                      <option value="Immediate (Under 2 Hours)">Immediate (Under 2 Hours SLA)</option>
                      <option value="Within 24 Hours">Within 24 Hours</option>
                      <option value="Next 30 Days">Next 30 Days</option>
                      <option value="Strategic Planning">Strategic Planning</option>
                    </select>
                  </div>
                </div>

                <!-- Preferred Channel Radios -->
                <div>
                  <span class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-2">
                    Preferred Contact Channel
                  </span>
                  <div class="grid grid-cols-3 gap-2 text-xs">
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Email" checked class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">Email</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Confidential Phone" class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">Phone</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Millennium Tower Suite" class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">In-Person</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label for="contact-message" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                    Objectives & Mandate <span class="text-[#c5a059]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="4"
                    placeholder="Describe your requirement, timeline, residence, or collective scope..."
                    class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  class="w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                >
                  Transmit Mandate to Concierge →
                </button>
              </form>

              <div class="mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#a69f91]">
                <span>CONFIDENTIALITY: 100% NDA</span>
                <span class="text-[#c5a059]">MILLENNIUM TOWER ORIGIN</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 3-PILLAR HEADQUARTERS PROTOCOL DOSSIER -->
    <section class="py-16 sm:py-24 bg-[#090b0e] text-[#faf8f5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3" data-reveal="fade-up">
          <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">Headquarters Operations</span>
          <h2 class="text-3xl sm:text-4xl font-serif">Sovereign Presence & Access</h2>
          <p class="text-sm text-[#dcd6ca] font-light">
            Engineered from Millennium Tower to protect focus, uphold complete privacy, and deliver instant luxury dispatch.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" data-reveal-stagger>
          <!-- Protocol 1 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">01</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Central Concierge Dispatch</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              One confidential point of contact coordinates all eight operating companies. All incoming mandates are routed through encrypted channels with active 2-hour response guarantees.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              concierge@blacklabel.life
            </div>
          </div>

          <!-- Protocol 2 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">02</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Private Arrival & Valet</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              In-person executive appointments at Millennium Tower are coordinated with dedicated residential valet clearance at the Fremont St. entrance with pre-cleared guest security.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              301 Mission St · Porte-Cochère
            </div>
          </div>

          <!-- Protocol 3 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">03</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Institutional Collective Retainer</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Family offices and high-net-worth founders can engage the complete collective on bespoke annual or multi-entity retainers with dedicated managing director liaisons.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              Retainers from $15,000 / mo
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// Helper to generate Admin Executive Dashboard Page HTML
function generateAdminPage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Black Label Executive Visitor Intelligence',
      url: 'https://blacklabel.life/admin',
      description: 'Sovereign visitor telemetry, US state geographic distribution, session metrics, and executive inquiry tracking.',
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Executive US Visitor Intelligence & Real State Analytics | Black Label',
    description:
      'Executive telemetry tracking real visitors, US state geographic distribution, traffic percentages, and verified page hits exclusively for this site.',
    canonicalUrl: 'https://blacklabel.life/admin',
    jsonLd,
  })}
  <meta name="robots" content="noindex, nofollow" />
</head>
<body class="bg-[#060709] text-[#e6e0d4] min-h-screen">
  ${renderSharedHeader('/admin')}

  <main id="main-content" class="pt-28 pb-24">
    <!-- ADMIN DASHBOARD CONTAINER -->
    <div id="admin-dashboard-container" class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      <!-- 1. EXECUTIVE CONSOLE COMMAND BANNER (ONLY FOR THIS SITE · REAL SCORE) -->
      <section class="p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-[#c5a059]/30 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a059]/5 blur-3xl pointer-events-none"></div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[#c5a059] font-mono uppercase tracking-[0.2em] text-[11px] font-semibold">Real Score Telemetry</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-[#dcd6ca]">
                <span>Site:</span>
                <span id="telemetry-site-host" class="text-[#faf8f5] font-semibold">Tracking This Domain</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-[#c5a059]">
                <span>Scope:</span>
                <span>US Visitors First (50 States + DC)</span>
              </div>
            </div>

            <h1 class="text-3xl sm:text-5xl font-serif text-[#faf8f5] font-light">
              Executive US Visitor <span class="italic text-gold-accent font-normal">Intelligence</span>
            </h1>
            <p class="text-xs sm:text-sm text-[#dcd6ca] font-light max-w-2xl">
              Verified real-time telemetry tracked strictly for this site. Shows real US visitors first with exact state counts, calculated percentage shares, and live resident session logs — no dummy scores.
            </p>
          </div>

          <!-- Quick Action & Verification Tools -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <!-- State Selector & Log Button -->
            <div class="flex items-center gap-1.5 bg-[#060709] border border-white/15 p-1 rounded-sm">
              <select id="admin-pick-state-select" class="bg-transparent text-xs font-mono text-[#faf8f5] px-2 py-1.5 border-none focus:outline-none cursor-pointer">
                <option value="CA" class="bg-[#0b0e13] text-[#faf8f5]">California (CA)</option>
                <option value="NY" class="bg-[#0b0e13] text-[#faf8f5]">New York (NY)</option>
                <option value="TX" class="bg-[#0b0e13] text-[#faf8f5]">Texas (TX)</option>
                <option value="FL" class="bg-[#0b0e13] text-[#faf8f5]">Florida (FL)</option>
                <option value="WA" class="bg-[#0b0e13] text-[#faf8f5]">Washington (WA)</option>
                <option value="NV" class="bg-[#0b0e13] text-[#faf8f5]">Nevada (NV)</option>
                <option value="IL" class="bg-[#0b0e13] text-[#faf8f5]">Illinois (IL)</option>
                <option value="MA" class="bg-[#0b0e13] text-[#faf8f5]">Massachusetts (MA)</option>
                <option value="CO" class="bg-[#0b0e13] text-[#faf8f5]">Colorado (CO)</option>
                <option value="AZ" class="bg-[#0b0e13] text-[#faf8f5]">Arizona (AZ)</option>
                <option value="GA" class="bg-[#0b0e13] text-[#faf8f5]">Georgia (GA)</option>
                <option value="NJ" class="bg-[#0b0e13] text-[#faf8f5]">New Jersey (NJ)</option>
                <option value="PA" class="bg-[#0b0e13] text-[#faf8f5]">Pennsylvania (PA)</option>
                <option value="OR" class="bg-[#0b0e13] text-[#faf8f5]">Oregon (OR)</option>
                <option value="NC" class="bg-[#0b0e13] text-[#faf8f5]">North Carolina (NC)</option>
                <option value="VA" class="bg-[#0b0e13] text-[#faf8f5]">Virginia (VA)</option>
                <option value="OH" class="bg-[#0b0e13] text-[#faf8f5]">Ohio (OH)</option>
                <option value="MI" class="bg-[#0b0e13] text-[#faf8f5]">Michigan (MI)</option>
                <option value="DC" class="bg-[#0b0e13] text-[#faf8f5]">District of Columbia (DC)</option>
              </select>
              <button
                type="button"
                id="log-us-state-visit-btn"
                class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm cursor-pointer whitespace-nowrap"
                title="Log a verified visit for selected US state"
              >
                + Log Visit
              </button>
            </div>

            <!-- Detect Location Button -->
            <button
              type="button"
              id="detect-my-location-btn"
              class="px-3.5 py-2 text-xs font-semibold tracking-wider text-[#faf8f5] border border-white/20 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors rounded-sm flex items-center justify-center gap-1.5 bg-white/[0.02] cursor-pointer whitespace-nowrap"
            >
              <span>📍</span>
              <span>Log My Location</span>
            </button>

            <!-- Export CSV -->
            <button
              type="button"
              id="export-csv-btn"
              class="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#faf8f5] border border-white/20 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors rounded-sm flex items-center justify-center gap-1.5 bg-white/[0.02] cursor-pointer"
            >
              <span>↓</span>
              <span>CSV</span>
            </button>

            <!-- Reset Button -->
            <button
              type="button"
              id="reset-telemetry-btn"
              class="px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#a69f91] hover:text-[#faf8f5] border border-white/10 hover:border-rose-500/40 hover:text-rose-400 transition-colors rounded-sm bg-black/40 cursor-pointer"
              title="Reset All Tracked Data for this Site to 0"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Live Notification Toast Bar -->
        <div id="live-ping-notification" class="hidden mt-5 p-3 rounded bg-[#c5a059]/15 border border-[#c5a059]/40 text-xs font-mono text-[#c5a059] flex items-center gap-2">
          Real visitor recorded...
        </div>
      </section>

      <!-- 2. TOTAL REAL DATA DASHBOARD (PRIMARY KPI TILES) -->
      <section id="admin-kpis" class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">Verified Real Score</span>
            <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">Site Visitor Telemetry Overview</h2>
          </div>
          <div id="kpi-us-share-badge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs font-mono text-[#c5a059]">
            Calculating US Share...
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Metric 1: Real US Visitors -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">US Visitors</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">US Priority</span>
            </div>
            <div id="kpi-total-us-visitors" class="text-3xl sm:text-4xl font-serif text-[#c5a059] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">
              Real recorded US residents
            </p>
          </div>

          <!-- Metric 2: Top US State Origin -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Top US State</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">Anchor</span>
            </div>
            <div id="kpi-top-state" class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-light truncate">Awaiting Visits</div>
            <p id="kpi-top-state-share" class="text-[11px] text-[#dcd6ca] font-mono">
              0 recorded US visitors yet
            </p>
          </div>

          <!-- Metric 3: Total Page Views on this Site -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Site Page Hits</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div id="kpi-total-page-views" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Total views on this domain</p>
          </div>

          <!-- Metric 4: Total Visitors (All Countries) -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Total Visitors</span>
              <span class="text-[10px] font-mono text-[#c5a059]">Global Total</span>
            </div>
            <div id="kpi-total-visitors" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Combined visitors logged</p>
          </div>

          <!-- Metric 5: Unique Devices -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Unique Devices</span>
              <span class="text-[10px] font-mono text-[#c5a059]">UUID Scoped</span>
            </div>
            <div id="kpi-unique-principals" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Distinct visitor devices</p>
          </div>
        </div>
      </section>

      <!-- 3. GEOSPATIAL US STATE INTELLIGENCE & VISITOR PERCENTAGE BREAKDOWN (US VISITORS FIRST) -->
      <section id="state-intelligence-section" class="p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs mb-2">
              <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">US Visitors First</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-serif text-[#faf8f5] font-light">
              Visitor Traffic by US States & Real Percentages
            </h2>
            <p class="text-xs sm:text-sm text-[#dcd6ca] font-light mt-1">
              Complete catalog of all 50 US states & DC. Percentages are mathematically computed from verified real visitors logged on this site.
            </p>
          </div>

          <div id="state-match-count" class="font-mono text-xs text-[#c5a059]">
            Loading US states...
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          <!-- Regional Filter Pills (US First) -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-mono text-[#a69f91] mr-1 hidden sm:inline">Filter:</span>
            <button
              type="button"
              data-us-filter="all"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-[#c5a059] text-[#c5a059] bg-[#c5a059]/15 font-semibold transition-colors cursor-pointer"
            >
              All 50 US States
            </button>
            <button
              type="button"
              data-us-filter="active-only"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              With Real Visits (>0)
            </button>
            <button
              type="button"
              data-us-filter="West"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              West
            </button>
            <button
              type="button"
              data-us-filter="East"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              East
            </button>
            <button
              type="button"
              data-us-filter="Sunbelt"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              Sunbelt
            </button>
            <button
              type="button"
              data-us-filter="Midwest"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              Midwest
            </button>
          </div>

          <!-- Search & Sort Box -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative min-w-[220px]">
              <input
                type="text"
                id="admin-state-search"
                placeholder="Search state name, code, metro..."
                class="w-full bg-[#060709] border border-white/15 focus:border-[#c5a059] rounded-sm px-3 py-1.5 text-xs text-[#faf8f5] placeholder-[#a69f91]/60 focus:outline-none transition-colors font-mono"
              />
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-[#a69f91] whitespace-nowrap">Sort:</span>
              <select
                id="admin-sort-select"
                class="bg-[#060709] border border-white/15 focus:border-[#c5a059] rounded-sm px-2.5 py-1.5 text-xs text-[#faf8f5] font-mono focus:outline-none cursor-pointer"
              >
                <option value="visitors">Most Real Visitors ↓</option>
                <option value="percentage">Highest % Share</option>
                <option value="views">Most Page Views</option>
                <option value="name">State Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- US States Table -->
        <div class="overflow-x-auto border border-white/[0.08] rounded-sm bg-[#060709]/60">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-[#0c0f14] text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">
                <th class="py-3.5 px-4 sm:px-6">Rank & US State</th>
                <th class="py-3.5 px-4 sm:px-6 text-right">Real Visitors</th>
                <th class="py-3.5 px-4 sm:px-6 text-right sm:text-left min-w-[180px]">US Traffic Share %</th>
                <th class="py-3.5 px-4 sm:px-6 text-center hidden md:table-cell">Region</th>
                <th class="py-3.5 px-4 sm:px-6 text-right hidden lg:table-cell">Status</th>
              </tr>
            </thead>
            <tbody id="state-table-body" class="divide-y divide-white/[0.04]">
              <!-- Dynamic real rows rendered by src/admin-analytics.ts -->
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. REGIONAL MACRO BENTO GRID -->
      <section class="space-y-4">
        <div>
          <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">US Geography</span>
          <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">Major US Regional Corridors</h2>
        </div>

        <div id="regional-bento-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Populated by admin-analytics.ts -->
        </div>
      </section>

      <!-- 5. PAGES ON THIS SITE & REAL LIVE STREAM DUAL PANELS -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Pages on THIS Site Breakdown (6 cols) -->
        <div class="lg:col-span-6 p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">Site Architecture</span>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Pages on This Site</h3>
            </div>
            <span class="text-xs font-mono text-[#a69f91]">Real URL Hits</span>
          </div>

          <p class="text-xs text-[#a69f91] font-light">
            Exact page view distribution across the divisions and desk endpoints of this website.
          </p>

          <div id="pages-breakdown-container" class="space-y-4">
            <!-- Populated by admin-analytics.ts -->
          </div>
        </div>

        <!-- Right: Real-Time Live Activity Stream (6 cols) -->
        <div class="lg:col-span-6 p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">Audit Stream</span>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Real Visitor Session Log</h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-mono text-emerald-400">Live Scoped</span>
            </div>
          </div>

          <p class="text-xs text-[#a69f91] font-light">
            Chronological audit feed of actual real visitor hits on this site with detected state location and client details.
          </p>

          <div id="live-activity-stream" class="space-y-3">
            <!-- Populated by admin-analytics.ts -->
          </div>
        </div>
      </section>

    </div>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// Helper to generate 404 Page HTML
function generate404Page(): string {
  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Page Not Found | Black Label Lifestyle San Francisco',
    description: 'The requested page could not be found. Explore Black Label Lifestyle luxury concierge divisions in San Francisco.',
    canonicalUrl: 'https://blacklabel.life/404',
    jsonLd: [],
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/404')}

  <main id="main-content" class="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4">
    <div class="max-w-2xl mx-auto text-center space-y-8" data-reveal>
      <span class="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-mono font-semibold">404 Exception</span>
      <h1 class="text-5xl sm:text-7xl font-serif text-[#faf8f5] font-light">
        The Standard Remains
      </h1>
      <p class="text-base sm:text-lg text-[#dcd6ca]/80 font-light max-w-lg mx-auto leading-relaxed">
        The destination you requested has been relocated or is not part of the active Black Label portfolio.
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/" class="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm">
          Return to Home
        </a>
        <a href="/concierge" class="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#faf8f5] border border-white/20 hover:border-[#c5a059] transition-colors rounded-sm">
          Contact Concierge
        </a>
      </div>

      <!-- Quick Directory of 8 Divisions -->
      <div class="pt-12 border-t border-white/[0.08]">
        <p class="text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-4 font-mono font-semibold">Explore Divisions</p>
        <div class="flex flex-wrap justify-center gap-3 text-xs text-[#dcd6ca]">
          <a href="/social" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">01 Social</a>
          <a href="/entertainment" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">02 Entertainment</a>
          <a href="/trading" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">03 Trading</a>
          <a href="/lifestyle" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">04 Lifestyle</a>
          <a href="/design" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">05 Design</a>
          <a href="/business-services" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">06 Business</a>
          <a href="/investments" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">07 Investments</a>
          <a href="/luxury" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">08 Luxury</a>
        </div>
      </div>
    </div>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// MAIN GENERATOR
async function buildAllPages(): Promise<void> {
  const rootDir = path.resolve('.');

  // 1. Home Page
  fs.writeFileSync(path.join(rootDir, 'index.html'), generateHomePage(), 'utf8');
  console.log('✓ Generated: /index.html');

  // 2. Division Pages
  for (const div of DIVISIONS) {
    const dirPath = path.join(rootDir, div.slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), generateDivisionPage(div), 'utf8');
    console.log(`✓ Generated: /${div.slug}/index.html`);
  }

  // 3. Concierge Page
  const conciergeDir = path.join(rootDir, 'concierge');
  if (!fs.existsSync(conciergeDir)) {
    fs.mkdirSync(conciergeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(conciergeDir, 'index.html'), generateConciergePage(), 'utf8');
  console.log('✓ Generated: /concierge/index.html');

  // 4. Contact Page (With Millennium Tower Interactive Map & Sovereign Form)
  const contactDir = path.join(rootDir, 'contact');
  if (!fs.existsSync(contactDir)) {
    fs.mkdirSync(contactDir, { recursive: true });
  }
  fs.writeFileSync(path.join(contactDir, 'index.html'), generateContactPage(), 'utf8');
  console.log('✓ Generated: /contact/index.html');

  // 5. Admin Analytics Dashboard Page
  const adminDir = path.join(rootDir, 'admin');
  if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
  }
  fs.writeFileSync(path.join(adminDir, 'index.html'), generateAdminPage(), 'utf8');
  console.log('✓ Generated: /admin/index.html');

  // 6. 404 Page
  fs.writeFileSync(path.join(rootDir, '404.html'), generate404Page(), 'utf8');
  console.log('✓ Generated: /404.html');

  console.log('\nAll 13 marketing, contact & admin pages successfully generated.');
}

buildAllPages().catch((err) => {
  console.error('Error generating pages:', err);
  process.exit(1);
});
