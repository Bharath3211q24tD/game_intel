import { Claim, DispatchDossier, RadarItem, DatabaseEntity, ComparativeMetric } from '../types';

export const LEAD_INVESTIGATION: DispatchDossier = {
  id: 'lead-01',
  ref: 'DOSSIER-LEO-01',
  status: 'CONFIRMED',
  category: 'DEEP INVESTIGATION // 14 CITATIONS',
  title: 'Mapping Leonida: Triangulating Highway 1, Vice City Keys, and Port Gellhorn from Official Footage',
  excerpt:
    'Cross-referencing 2022 raw disclosures against Take-Two Interactive trademark registries, FAA airspace filings, and Trailer 1 photogrammetric coordinates to rigorously delineate confirmed biomes from community speculation.',
  author: 'Forensic Cartography Unit (Team lead: Dr. M. Vance)',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNv-qWEu-kMMiPlbNicboRpiW1PXkxlwBOGGh0qmSPp5BzTqT4xTCGI3hiMfUVi0V0ShcWP0dDEqc_YI9J05A8IPiuaz4oSl37Zehl-VtUNjTWioD-epia3SlWQoTQf8yc_btri5PVDDMK1PLfqzVPjZfzrULTqOuUH6jXSawpE_t-F4LVv-w0aJ0CcyMdHqoytkZ-t7-hkd4ArreCAee6AQg5izxst1GS3mhuqXY14A7OJqDZEQuEg',
  imageAlt:
    'A cinematic wide-angle forensic cartography map of a fictional tropical metropolitan coastline resembling Vice City and the Florida Keys at dusk with coordinate overlays.',
  date: 'Updated 3h ago',
  citationsCount: 14,
  readTime: '12 min forensic read',
  sections: [
    {
      heading: 'I. Mathematical Triangulation of Horizon Landmarks',
      content:
        'By performing angular perspective projection on Trailer 1 frames at 00:14 (Ocean Drive establishing tracking shot) and 00:42 (aerial bridge traverse), our team established triangulation vectors pointing towards the Port Gellhorn naval crane cluster. The angular deviation between the Kelly County radio tower and the Venetian-style causeway confirms a landmass curvature that necessitates a minimum playable radius of ~11.8 km from downtown Vice City proper.'
    },
    {
      heading: 'II. Trademark Registries & FAA Airspace Docket Verification',
      content:
        'Public Take-Two Interactive filings in the USPTO trademark database registered the names "State of Leonida", "Port Gellhorn", "Vice City", and "Kelly County" between Q3 2021 and Q4 2023. These corroborate the visual evidence in the municipal transit bus livery visible at 00:27 of official footage.'
    },
    {
      heading: 'III. Delineating Verified Biomes vs Speculative Landmass',
      content:
        'While community cartography projects have speculated on a secondary northern mountain range resembling Georgia/Alabama foothills, official data confirms three discrete ecological biomes: (1) Coastal Subtropical Metropole, (2) The Grassrivers Marshland and Everglades ecosystem, and (3) The Keys Archipelago with shallow-water coral sandbars.'
    }
  ]
};

export const RADAR_ITEMS: RadarItem[] = [
  {
    id: 'radar-1',
    category: 'NARRATIVE // CAST',
    status: 'REPORTED',
    title: "The Dual Protagonist Dynamic: Lucia & Jason's Narrative Arc vs 'Bonnie & Clyde' Trope",
    description:
      "Cross-analyzing actor SAG-AFTRA strike disclosures with dialogue leak taxonomy to substantiate co-op branching mechanics.",
    source: 'Jason Schreier / Bloomberg',
    auditRef: 'Audit [REF-12]',
    auditId: 'REF-12',
    publishedTime: '4h ago',
    readTime: '5 min',
    fullBody:
      'Bloomberg investigative report by Jason Schreier originally revealed in July 2022 that the game would feature a female Latina lead protagonist alongside a male partner inspired by bank robbers Bonnie and Clyde. Corroborated by SAG-AFTRA interactive media bargaining disclosures confirming dual principal performance capture contracts under Rockstar North production codename "Americas".'
  },
  {
    id: 'radar-2',
    category: 'ENGINE & PHYSICS',
    status: 'CONFIRMED',
    title: 'Water Dynamics & Wave Physics: Take-Two Patent US11288863B2 Deconstructed',
    description:
      'USPTO records confirm oceanic buoyancy simulation, real-time foam generation, and littoral vehicle resistance matrices.',
    source: 'USPTO Patent Office',
    auditRef: 'Audit [PAT-03]',
    auditId: 'PAT-03',
    publishedTime: '1d ago',
    readTime: '8 min',
    fullBody:
      'Patent US11288863B2 granted to Take-Two Interactive assigns inventors David Hynd and Laurent Couvidat for "System and Method for Realistic Water Simulation in Video Games." The patent details a multi-scale ocean mesh generator with Eulerian-Lagrangian velocity field advection, calculating real-time hull displacement for watercraft such as the verified Airboat and SeaRay analogs.'
  },
  {
    id: 'radar-3',
    category: 'PRODUCTION SCOPE',
    status: 'REPORTED',
    title: 'Project Americas Scope Reductions: What Was Re-scoped Between 2019 and 2024',
    description:
      'Investigating the consolidation from South American landmasses into a denser, hyper-detailed Leonida archipelago.',
    source: 'Internal Development Audit',
    auditRef: 'Audit [DEV-08]',
    auditId: 'DEV-08',
    publishedTime: '2d ago',
    readTime: '6 min',
    fullBody:
      'Early project planning under Dan Houser initially envisioned a sprawling trans-continental map spanning Miami and segments of Colombia/Cuba (hence the codename "Project Americas"). In 2019–2020, Rockstar leadership restructured the production to eliminate crunch and focused resources on an extraordinarily dense single state (Leonida) with post-launch modular map expansion capability.'
  }
];

export const DISPATCH_DOSSIERS: DispatchDossier[] = [
  {
    id: 'dossier-a',
    ref: 'REF: ART-01',
    status: 'SPECULATION',
    category: 'MECHANICS // OPEN-WORLD GATING',
    title: "Lucia's Ankle Monitor: Parole Constraints & Open-World Progression Theory",
    excerpt:
      "Examining Trailer 1's correctional facility framing and official artwork to analyze whether electronic monitoring acts as an in-lore physical island barrier.",
    author: 'By Dr. M. Vance',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA',
    imageAlt:
      'A gritty high-contrast investigative macro view of a sleek GPS ankle monitoring device secured to a characters ankle in a dimly lit motel room.',
    date: 'Oct 2024',
    citationsCount: 6,
    readTime: '7 min forensic read',
    sections: [
      {
        heading: 'Visual Evidence in Key Art vs Trailer Cutscenes',
        content:
          'In official Rockstar key art released December 2023, Lucia is seated on the hood of a car with a visible GPS tamper-evident ankle bracelet on her right leg. This contrasts with the opening prison interview with counselor Stefanie, where she wears prison scrubs, suggesting early-game release on supervised probation.'
      },
      {
        heading: 'Narrative Gating Mechanism Precedents',
        content:
          'Historically, GTA games used artificial barriers (broken bridges in GTA III and Vice City, hurricane warnings in Vice City Stories, terrorist threats in GTA IV). An ankle monitor tracking zone provides an organic, modern legal boundary that triggers immediate 4-star SWAT response if crossed prior to narrative removal.'
      }
    ]
  },
  {
    id: 'dossier-b',
    ref: 'REF: INFRA-04',
    status: 'CONFIRMED',
    category: 'INFRASTRUCTURE // TRANSIT',
    title: 'Vice City Transit & Rail: Every Train Model Verified in Trailer 1',
    excerpt:
      'Forensic classification of the automated people-mover system operating across the Vice City downtown corridor compared to Miami Metromover schematics.',
    author: 'By K. Thorne, Tech Desk',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMkAZhwgXTiMQRdDJ-FigBWgvv40_OO1Iz-E_TZdlTlTytnf6b6QZSJ7X3ZexMzeE-7xF7NSHx34cG_LADQyPnlhYHZ1lwC6-TG_x10shpo_t19RqG5YOxMwI7Qqe9tdhE-8CLAMKQxlLek2DnSGt7MhGy0FmtGkWvAtoKFfRdv8ePhBdy_wqk8EsNW8nZesQGpqFX7fWBHeFV5ZU76f722NqdbmUoX6q4pmUXY4DSn0V5FmUUqLAPwQ',
    imageAlt:
      'A nocturnal forensic architectural capture of an elevated light rail transit train gliding between neon-accented palm-lined skyscraper canyons.',
    date: 'Nov 2024',
    citationsCount: 9,
    readTime: '9 min forensic read',
    sections: [
      {
        heading: 'Metromover Track Topology Analysis',
        content:
          'At timestamp 00:23 of Trailer 1, a rubber-tired light rail car marked "Vice City Transit" glides along an elevated concrete guideway. Spatial photogrammetry indicates elevated stations at Vice Beach Financial, Biscayne Boulevard analog, and Arts District.'
      },
      {
        heading: 'Operational Mechanics',
        content:
          'Unlike GTA V where Los Santos Transit was largely passive with few boardable lines, the track layout is fully integrated with road intersections and overhead cables, allowing player boarding, carriage hijack, and rooftop traversal.'
      }
    ]
  },
  {
    id: 'dossier-c',
    ref: 'REF: PAT-09',
    status: 'CONFIRMED',
    category: 'AI & WORLD SIMULATION',
    title: 'AI Pedestrian Routine Simulation: Deep Dive into Patent US10981067B2',
    excerpt:
      "How Rockstar's patented automated virtual navigation schedules create authentic social rituals, beach gatherings, and organic police response patterns.",
    author: 'By S. Al-Rashid',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wfx-Op2MkjzRU05cTTUG3DZckSvnpcm0IIImrqGPOGDALuf8UfOm--PD2maj8ZUw4vS13RXWBAg1JTAOftwy6vLzR4qXyHyHrd126duZfnADe-0v1e-Q9s1eKCZZ0oUcpk1twTbNWs0GGHMgVeBW9iv2Cl9UG9F90SIiDNhpWEEZXZYT1sdsqvwrv5BYpbpARJlBQVE8lHF1VnSwJ-W9G1Vr-9EQzVsE4L_UeS3g-XH6Z9ukHtwVTw',
    imageAlt:
      'A technical wireframe and patent schematic visualization representing artificial intelligence pedestrian behavior simulation in a dense city environment.',
    date: 'Dec 2024',
    citationsCount: 11,
    readTime: '11 min forensic read',
    sections: [
      {
        heading: 'Patent Overview: System and Method for Virtual Navigation',
        content:
          'Take-Two Patent US10981067B2, awarded April 2021, replaces legacy spline-following NPC behavior with an asynchronous, server/client schedule node architecture. NPCs do not merely despawn when out of sight; they inhabit persistent lifestyle trajectories (commutes, shift work, recreational sunbathing).'
      },
      {
        heading: 'Beach Crowd Density in Trailer 1',
        content:
          'Trailer 1 frames 00:03 through 00:07 display over 140 unique animated pedestrian rigs on Vice Beach simultaneously: applying sunscreen, recording smartphone video, walking dogs on leashes, and responding to ambient jogger speed without framerate degradation.'
      }
    ]
  }
];

export const CLAIMS: Claim[] = [
  {
    id: 'CLM-084',
    subject: 'State of Leonida includes Vice City, Kelly County, and Port Gellhorn districts',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Rockstar Games Official Press Release (Dec 2023)',
    auditRef: 'EVD-01',
    taxonomy: 'World & Map',
    dateLogged: '2023-12-05',
    confidenceScore: 100,
    summary:
      'Rockstar Games official press release explicitly named the State of Leonida, Vice City, and surrounding districts as the primary geographic setting.',
    corroboratingDetails: [
      'Take-Two Interactive Press Room statement Dec 4, 2023: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond."',
      'Trailer 1 subtitles and signage showing Kelly County Sheriff cruisers and Port Gellhorn municipal signs.'
    ]
  },
  {
    id: 'CLM-085',
    subject: 'Lucia character confirmed as first female protagonist in 3D/HD continuity',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 Frame 00:08 Dialog Sequence ("Trust?")',
    auditRef: 'EVD-02',
    taxonomy: 'Story & Protagonists',
    dateLogged: '2023-12-05',
    confidenceScore: 100,
    summary:
      'Lucia appears prominently as the focal character of Trailer 1, introduced in prison and seen committing armed robberies alongside Jason.',
    corroboratingDetails: [
      'Dialogue transcript at 00:08: "Lucia, do you know why you\'re here? - Bad luck, I guess."',
      'Final frame key line: "The only way we\'re gonna get through this is by sticking together, being a team. Trust? - Trust."'
    ]
  },
  {
    id: 'CLM-086',
    subject: 'Total playable area equals 128 sq km with fully navigable interior buildings (>40%)',
    corpus: 'GTA VI',
    status: 'SPECULATION',
    primarySource: 'GTA Mapping Community Trigonometric Triangulation',
    auditRef: 'EVD-03',
    taxonomy: 'World & Map',
    dateLogged: '2024-02-18',
    confidenceScore: 62,
    summary:
      'Community coordinate triangulation estimates landmass at 2.4x the size of GTA V\'s Los Santos (75.8 km²), projecting ~128 km² with extensive enterable mall, hotel, and motel interiors.',
    corroboratingDetails: [
      'Coordinate mapping based on debug coordinates leaked in 2022 showing world bound coordinates exceeding +8000 / -8000 units.',
      'Take-Two has not officially verified exact square kilometer metrics or interior percentage quotas.'
    ]
  },
  {
    id: 'CLM-087',
    subject: 'Third playable character featured as undercover DEA or Leonida State Trooper',
    corpus: 'GTA VI',
    status: 'DISPUTED',
    primarySource: 'Debunked audio snippet; matches GTA V canned DLC files',
    auditRef: 'EVD-04',
    taxonomy: 'Story & Protagonists',
    dateLogged: '2024-04-11',
    confidenceScore: 15,
    summary:
      'A viral rumor asserted a third protagonist would be a law enforcement agent pursuing Lucia and Jason. Forensic audio waveform matching proved the leak was from an unreleased GTA V 2015 "Cops and Crooks" DLC build.',
    corroboratingDetails: [
      'Cryptographic hash match against old 2015 build audio assets.',
      'All official disclosures and 2022 development logs only catalog player characters "Lucia" and "Jason".'
    ]
  },
  {
    id: 'CLM-088',
    subject: 'Dynamic hair strand simulation implemented in RAGE 9 using compute shaders',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 convertible and beach sequence physics analysis',
    auditRef: 'EVD-05',
    taxonomy: 'Technical Engine (RAGE 9)',
    dateLogged: '2023-12-10',
    confidenceScore: 98,
    summary:
      'At 00:32 (convertible ride scene), character hair exhibits discrete strand wind velocity simulation rather than traditional bone-rigged polygonal clumps.',
    corroboratingDetails: [
      'Take-Two graphics engineer LinkedIn profile citations regarding custom hair strand physics pipeline in RAGE 9.',
      'Micro-frame examination showing individual strand occlusion and sub-surface scattering.'
    ]
  },
  {
    id: 'CLM-089',
    subject: 'Take-Two SEC 10-K fiscal forecast projects minimum $8B net bookings aligned with Fall 2025 launch',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Take-Two Interactive SEC Form 10-K & Q3 Earnings Conference',
    auditRef: 'EVD-06',
    taxonomy: 'Game Mechanics',
    dateLogged: '2024-05-16',
    confidenceScore: 100,
    summary:
      'Take-Two CEO Strauss Zelnick reiterated on May 2024 earnings call that GTA VI is scheduled for launch in Fall 2025 on PlayStation 5 and Xbox Series X|S.',
    corroboratingDetails: [
      'SEC Edgar Filing TTWO 10-K section on fiscal years 2025/2026 growth outlook.',
      'Official statement: "Our outlook reflects a narrowing of Rockstar Games\' previously established calendar 2025 window to Fall of calendar 2025."'
    ]
  },
  {
    id: 'CLM-090',
    subject: 'Procedural interior destruction system for residential and commercial structures',
    corpus: 'GTA VI',
    status: 'REPORTED',
    primarySource: 'Rockstar New England physics engineer patent submission',
    auditRef: 'EVD-07',
    taxonomy: 'Technical Engine (RAGE 9)',
    dateLogged: '2024-06-02',
    confidenceScore: 78,
    summary:
      'Patents filed by Take-Two detail procedural wall penetration and dynamic glass shattering algorithms that simulate structural degradation without pre-baked animations.',
    corroboratingDetails: [
      'Patent publication US20230342981A1 covering dynamic structural fragmentation.',
      'Trailer 1 liquor store door breach showing physics-driven impact splinters.'
    ]
  },
  {
    id: 'CLM-091',
    subject: 'Radio station soundtrack includes Tom Petty \'Love Is a Long Road\' as official theme motif',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 official music credit and Spotify metadata spike (+36,979%)',
    auditRef: 'EVD-08',
    taxonomy: 'Game Mechanics',
    dateLogged: '2023-12-05',
    confidenceScore: 100,
    summary:
      'Tom Petty\'s 1989 track "Love Is a Long Road" (MCA Records) serves as the primary musical soundtrack for Trailer 1 and establishes the Floridian rock motif.',
    corroboratingDetails: [
      'Tom Petty estate official tweet confirming authorized license with Rockstar Games.',
      'Spotify streaming data reported 36,979% stream increase in the 24 hours following trailer premiere.'
    ]
  },
  {
    id: 'CLM-092',
    subject: 'Cross-platform PC simultaneous release on day one alongside consoles',
    corpus: 'GTA VI',
    status: 'DISPUTED',
    primarySource: 'Take-Two Official Press Release platform specification',
    auditRef: 'EVD-09',
    taxonomy: 'Game Mechanics',
    dateLogged: '2023-12-05',
    confidenceScore: 5,
    summary:
      'Rumors suggesting day-and-date PC release are directly contradicted by Take-Two\'s formal press release, which lists only PlayStation 5 and Xbox Series X|S systems.',
    corroboratingDetails: [
      'Official PR text: "Grand Theft Auto VI is coming to PlayStation 5 computer entertainment systems and Xbox Series X|S games and entertainment systems in 2025."',
      'Rockstar historically staggers PC ports by 12–18 months (GTA IV, GTA V, Red Dead Redemption 2).'
    ]
  },
  {
    id: 'CLM-093',
    subject: 'Real-time oceanic buoyancy and vehicle hydro-drag simulation using patent US11288863B2',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Take-Two USPTO Patent US11288863B2',
    auditRef: 'EVD-10',
    taxonomy: 'Technical Engine (RAGE 9)',
    dateLogged: '2024-01-20',
    confidenceScore: 95,
    summary:
      'Patent describes a dual-grid simulation where boat hulls exert localized displacement wake, creating realistic surf swells and vehicle hydroplaning on water surfaces.',
    corroboratingDetails: [
      'Patent drawing figures 4A–4E illustrating surface foam dissipation and hull resistance curves.',
      'Visible in Trailer 1 speedboat wakes curving naturally around sandbar shallows.'
    ]
  },
  {
    id: 'CLM-094',
    subject: 'Automated AI pedestrian social rituals (beach lounging, phone recording, selfie poses)',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 frames 00:04, 00:18, 00:46 social media overlays',
    auditRef: 'EVD-11',
    taxonomy: 'Game Mechanics',
    dateLogged: '2023-12-05',
    confidenceScore: 100,
    summary:
      'Pedestrians dynamically record bizarre public incidents on their in-game smartphones, broadcasting to a TikTok-like parody social network integrated into the game world.',
    corroboratingDetails: [
      'Social media UI vignettes in Trailer 1 with parody hashtags #LeonidaMan, #ViceCityLive, and live comments.',
      'NPCs holding phones at realistic angles recording street takeovers and alligator captures.'
    ]
  },
  {
    id: 'CLM-095',
    subject: 'Hamlet Keys based directly on Key West with continuous overseas highway',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 Highway 1 / Overseas Highway bridge aerial shot',
    auditRef: 'EVD-12',
    taxonomy: 'World & Map',
    dateLogged: '2023-12-05',
    confidenceScore: 98,
    summary:
      'A continuous overseas highway bridge connects the southern tip of the mainland to a chain of subtropical keys named Hamlet Keys.',
    corroboratingDetails: [
      'Aerial drone shot at 00:42 showing two parallel bridges (one decommissioned historical bridge parallel to active road, mimicking Florida Overseas Highway).',
      'Road signage identifying highway route markers.'
    ]
  },
  {
    id: 'CLM-096',
    subject: 'Cuban and Haitian faction territories in Little Haiti/Little Havana equivalents',
    corpus: 'GTA VI',
    status: 'REPORTED',
    primarySource: '2022 development leak asset tags & world event strings',
    auditRef: 'EVD-13',
    taxonomy: 'Story & Protagonists',
    dateLogged: '2024-03-05',
    confidenceScore: 84,
    summary:
      'World event data strings reference gang presence and territorial skirmishes between established cultural enclaves in Vice City urban sectors.',
    corroboratingDetails: [
      'Leaked mission coordinate markers tagged "CUBAN_MALL_MEET" and "HAITIAN_GARAGE_AMBUSH".',
      'Art deco building signage featuring authentic Spanish and Haitian Creole storefront typography.'
    ]
  },
  {
    id: 'CLM-097',
    subject: 'Wildlife AI includes American alligators, flamingos, hammerhead sharks, and wild boars',
    corpus: 'GTA VI',
    status: 'CONFIRMED',
    primarySource: 'Trailer 1 footage at 00:20 (swimming pool gator), 00:36 (mudding alligators), 00:50 (gas station gator)',
    auditRef: 'EVD-14',
    taxonomy: 'World & Map',
    dateLogged: '2023-12-05',
    confidenceScore: 100,
    summary:
      'Authentic Floridian fauna is prominently depicted interacting with human urban environments, including animal control calls and hunting grounds.',
    corroboratingDetails: [
      'Trailer 1 00:20: Wildlife removal officer pulling an 8-foot alligator out of a backyard pool.',
      'Trailer 1 00:50: An alligator entering a "PAWNTRES" convenience store.'
    ]
  },
  {
    id: 'CLM-098',
    subject: 'Cryptocurrency payment rails and darknet market mechanics in in-game smartphone',
    corpus: 'GTA VI',
    status: 'SPECULATION',
    primarySource: 'Analyst financial reports and community crypto-forum discussions',
    auditRef: 'EVD-15',
    taxonomy: 'Game Mechanics',
    dateLogged: '2024-05-01',
    confidenceScore: 40,
    summary:
      'Rumors claim GTA VI will replace or augment cash rewards with an in-game parody cryptocurrency exchange resembling Bitcoin/Monero.',
    corroboratingDetails: [
      'No explicit confirmation in SEC filings or official Rockstar announcements.',
      'Could function purely as satirical in-game stock market similar to BAWSAQ in GTA V.'
    ]
  },
  {
    id: 'CLM-099',
    subject: 'Dual-wielding weapon mechanics returning from Max Payne 3 / Red Dead Redemption 2',
    corpus: 'GTA VI',
    status: 'REPORTED',
    primarySource: '2022 footage animation skeleton rigs and holster attachments',
    auditRef: 'EVD-16',
    taxonomy: 'Vehicles & Arsenal',
    dateLogged: '2024-02-14',
    confidenceScore: 82,
    summary:
      'Animation skeletons extracted from leaked build demonstrate simultaneous left and right hand firearm IK nodes and independent targeting vectors.',
    corroboratingDetails: [
      'Leak clip 44 showing Lucia dual-wielding compact SMG and 9mm sidearm.',
      'Weapon drop and weapon swap animations matching Red Dead Redemption 2 realism standard.'
    ]
  },
  {
    id: 'CLM-100',
    subject: 'Weapon wheel limited to physical trunk storage inventory system',
    corpus: 'GTA VI',
    status: 'REPORTED',
    primarySource: '2022 debug footage vehicle trunk interaction prompts',
    auditRef: 'EVD-17',
    taxonomy: 'Vehicles & Arsenal',
    dateLogged: '2024-03-22',
    confidenceScore: 85,
    summary:
      'Similar to Red Dead Redemption 2\'s horse saddle inventory, heavy rifles must be retrieved from player vehicle trunks, while on-foot inventory is restricted to two concealed handguns and a duffle bag.',
    corroboratingDetails: [
      'Leaked diner robbery clip showing Jason carrying a duffle bag with visible rifle slung on back, unable to pull rocket launcher from thin air.'
    ]
  },
  {
    id: 'CLM-101',
    subject: 'Fuel consumption and vehicle refueling mechanics for player cars',
    corpus: 'GTA VI',
    status: 'DISPUTED',
    primarySource: 'Debunked modded FiveM gameplay circulated on TikTok as official footage',
    auditRef: 'EVD-18',
    taxonomy: 'Vehicles & Arsenal',
    dateLogged: '2024-05-10',
    confidenceScore: 18,
    summary:
      'A viral clip depicting a fuel gauge draining and requiring pulling up to a gas pump was identified as a custom script running on a modified GTA V FiveM roleplay server.',
    corroboratingDetails: [
      'FiveM server asset fingerprint matched by community modders.',
      'Rockstar development documentation contains no references to mandatory fuel management in core gameplay loops.'
    ]
  }
];

export const DATABASE_ENTITIES: DatabaseEntity[] = [
  // Characters
  {
    id: 'char-1',
    name: 'Lucia',
    category: 'CHARACTERS',
    badge: 'Verified',
    status: 'CONFIRMED',
    description:
      'First female protagonist in GTA 3D/HD continuity. Introduced serving time in the Leonida Department of Corrections before paroling and teaming up with Jason for armed robberies.',
    verifiedIn: 'Trailer 1 (00:08, 00:26, 01:10)',
    tags: ['Protagonist', 'Parolee', 'Armed Robbery', 'Latin Heritage'],
    metrics: { 'Continuity Era': 'HD Universe', 'Partner': 'Jason', 'Status': 'Confirmed Playable' }
  },
  {
    id: 'char-2',
    name: 'Jason',
    category: 'CHARACTERS',
    badge: 'Verified',
    status: 'CONFIRMED',
    description:
      'Male co-protagonist alongside Lucia. Seen operating vehicles, executing store holdups, and delivering the shared pledge of mutual trust.',
    verifiedIn: 'Trailer 1 (01:05, 01:15)',
    tags: ['Protagonist', 'Wheelman', 'Armed Robbery'],
    metrics: { 'Continuity Era': 'HD Universe', 'Partner': 'Lucia', 'Status': 'Confirmed Playable' }
  },
  {
    id: 'char-3',
    name: 'Stefanie',
    category: 'CHARACTERS',
    badge: 'Parole',
    status: 'CONFIRMED',
    description:
      'Leonida Department of Corrections counselor seen questioning Lucia in the opening sequence of Trailer 1.',
    verifiedIn: 'Trailer 1 (00:08)',
    tags: ['DOC Counselor', 'Prison Staff', 'NPC'],
    metrics: { 'Facility': 'Leonida State Corrections', 'Role': 'Parole Evaluator' }
  },
  {
    id: 'char-4',
    name: "'Florida Joker' Parody",
    category: 'CHARACTERS',
    badge: 'Viral',
    status: 'CONFIRMED',
    description:
      'Parody character modeled after real-world viral Floridian Lawrence Sullivan, depicted in orange jail scrubs with facial tattoos and purple-dyed hair in a courtroom scene.',
    verifiedIn: 'Trailer 1 (00:34)',
    tags: ['Parody', 'Courtroom', 'Leonida Man'],
    metrics: { 'Inspiration': 'Lawrence Sullivan Viral Mugshot (2017)', 'Scene': 'County Courthouse' }
  },
  {
    id: 'char-5',
    name: 'Mud Club Host',
    category: 'CHARACTERS',
    badge: 'NPC',
    status: 'CONFIRMED',
    description:
      'Leader or promoter of the "Thrashin\' in the Mud" outdoor truck rally gathering in Kelly County.',
    verifiedIn: 'Trailer 1 (00:36)',
    tags: ['Kelly County', 'Off-road', 'Subculture'],
    metrics: { 'Location': 'Kelly County Wetlands', 'Affiliation': 'Mud Club' }
  },
  // Locations
  {
    id: 'loc-1',
    name: 'Vice City Beach',
    category: 'LOCATIONS',
    badge: '44 Sectors',
    status: 'CONFIRMED',
    description:
      'Iconic oceanfront tourist strip featuring pastel art deco hotels, packed white sand beaches, outdoor fitness parks, and continuous helicopter air patrols.',
    verifiedIn: 'Trailer 1 (00:03 - 00:07)',
    tags: ['Metropolitan', 'Oceanfront', 'Art Deco', 'Tourism'],
    coordinates: "25°46'31\"N 80°11'32\"W"
  },
  {
    id: 'loc-2',
    name: 'Port Gellhorn',
    category: 'LOCATIONS',
    badge: 'Sector 04',
    status: 'CONFIRMED',
    description:
      'Industrial port and working-class naval hub on the western coastline featuring container shipping docks, shipyards, and commercial motels.',
    verifiedIn: 'Take-Two Trademark Registry & 2022 Leaks',
    tags: ['Industrial', 'Shipping Docks', 'Commercial'],
    coordinates: "26°08'14\"N 81°45'22\"W"
  },
  {
    id: 'loc-3',
    name: 'Ambrosia',
    category: 'LOCATIONS',
    badge: 'Rural',
    status: 'REPORTED',
    description:
      'Agricultural and chemical processing town located in the interior lowlands of Leonida, home to sugar refineries and trailer home communities.',
    verifiedIn: '2022 Development Leaks',
    tags: ['Agricultural', 'Sugar Mill', 'Industrial'],
    coordinates: "26°24'08\"N 80°52'19\"W"
  },
  {
    id: 'loc-4',
    name: 'Kelly County',
    category: 'LOCATIONS',
    badge: 'County',
    status: 'CONFIRMED',
    description:
      'Rural jurisdiction encompassing vast swamps, dirt speedways, and cypress bayous patrolled by Kelly County Sheriff units.',
    verifiedIn: 'Trailer 1 (00:36, Police Cruiser Livery)',
    tags: ['Rural', 'Swampland', 'Off-road Racing'],
    coordinates: "25°55'40\"N 80°42'10\"W"
  },
  {
    id: 'loc-5',
    name: 'Hamlet Keys',
    category: 'LOCATIONS',
    badge: 'Archipelago',
    status: 'CONFIRMED',
    description:
      'Chain of coral islands connected to the mainland via the Overseas Highway, featuring boat docks, seaside bars, and private villas.',
    verifiedIn: 'Trailer 1 (00:42)',
    tags: ['Archipelago', 'Overseas Highway', 'Boating'],
    coordinates: "24°33'12\"N 81°47'45\"W"
  },
  // Vehicles
  {
    id: 'veh-1',
    name: 'Cheetah Classic',
    category: 'VEHICLES & ARSENAL',
    badge: 'Supercar',
    status: 'CONFIRMED',
    description:
      '1980s Ferrari Testarossa-inspired retro supercar driving down Ocean Drive at night past art deco neon storefronts.',
    verifiedIn: 'Trailer 1 (00:14)',
    tags: ['Sports Classic', 'Grotti', 'Ocean Drive'],
    metrics: { 'Manufacturer': 'Grotti', 'Drivetrain': 'RWD Mid-Engine' }
  },
  {
    id: 'veh-2',
    name: 'Oceanic (1950s)',
    category: 'VEHICLES & ARSENAL',
    badge: 'Sedan',
    status: 'CONFIRMED',
    description:
      'Vintage 1950s American four-door sedan cruising along the South Beach boardwalk, evoking Miami\'s heritage car culture.',
    verifiedIn: 'Trailer 1 (00:15)',
    tags: ['Classic', 'Sedan', 'Heritage'],
    metrics: { 'Class': 'Sedan Classic', 'Style': '1957 Bel Air Analog' }
  },
  {
    id: 'veh-3',
    name: 'Airboat Hover',
    category: 'VEHICLES & ARSENAL',
    badge: 'Watercraft',
    status: 'CONFIRMED',
    description:
      'Propeller-driven flat-bottom watercraft specifically designed for shallow Grassrivers wetlands navigation, capable of skimming over marsh grass.',
    verifiedIn: 'Trailer 1 (00:21)',
    tags: ['Watercraft', 'Swamp', 'Everglades'],
    metrics: { 'Engine': 'Aircraft V8 Propeller', 'Surface': 'Swamp & Water' }
  },
  {
    id: 'veh-4',
    name: 'Pegassi Torero',
    category: 'VEHICLES & ARSENAL',
    badge: 'Hypercar',
    status: 'CONFIRMED',
    description:
      'Modern wedge hypercar seen outside high-end Vice City nightlife venues.',
    verifiedIn: 'Trailer 1 (00:30)',
    tags: ['Supercar', 'Pegassi', 'Nightlife'],
    metrics: { 'Manufacturer': 'Pegassi', 'Class': 'Super' }
  },
  {
    id: 'veh-5',
    name: 'Patriot Mil-Spec',
    category: 'VEHICLES & ARSENAL',
    badge: 'Off-Road',
    status: 'CONFIRMED',
    description:
      'Heavy military-grade utility vehicle modified with lifted suspension and oversized mud tires participating in the Kelly County mud rally.',
    verifiedIn: 'Trailer 1 (00:37)',
    tags: ['Off-Road', 'Mammoth', 'Mud Rally'],
    metrics: { 'Manufacturer': 'Mammoth', 'Class': 'Off-Road' }
  },
  // Technical Specs
  {
    id: 'tech-1',
    name: 'RAGE 9 Engine',
    category: 'TECHNICAL SPECS',
    badge: 'Engine',
    status: 'CONFIRMED',
    description:
      'Rockstar Advanced Game Engine 9th generation featuring unified physically based rendering (PBR), hardware-accelerated ray tracing, and volumetric atmospheric simulation.',
    verifiedIn: 'Rockstar Engineering Patent Filings & Job Listings',
    tags: ['Proprietary Engine', 'Rockstar San Diego', 'DirectX 12 / PS5 API'],
    metrics: { 'API': 'Custom low-level console pipeline', 'Ray Tracing': 'RT Reflections & Global Illumination' }
  },
  {
    id: 'tech-2',
    name: 'Procedural Ragdoll',
    category: 'TECHNICAL SPECS',
    badge: 'Physics',
    status: 'CONFIRMED',
    description:
      'Evolution of the Euphoria physics synthesis system, integrating muscle tension, balance recovery, and stumbling mechanics with environmental awareness.',
    verifiedIn: 'Trailer 1 crowd stagger and mud rally physical interactions',
    tags: ['NaturalMotion Euphoria', 'Kinematic Solver', 'Dynamic Balance']
  },
  {
    id: 'tech-3',
    name: 'Dynamic Strand Hair',
    category: 'TECHNICAL SPECS',
    badge: 'Visuals',
    status: 'CONFIRMED',
    description:
      'Compute-shader driven individual hair strand simulation with realistic wind resistance, moisture clumping, and physical collisions with shoulders and vehicle seats.',
    verifiedIn: 'Trailer 1 (00:32 convertible sequence)',
    tags: ['Compute Shaders', 'Sub-surface Scattering', 'Wind Physics']
  },
  {
    id: 'tech-4',
    name: 'Volumetric Fog',
    category: 'TECHNICAL SPECS',
    badge: 'Lighting',
    status: 'CONFIRMED',
    description:
      '3D voxel grid participating media simulating humid Floridian coastal marine layers, swamp mist, and light scattering through canopy trees.',
    verifiedIn: 'Trailer 1 dawn and dusk sequences',
    tags: ['Volumetrics', 'Atmospheric Scattering', 'Voxel Grid']
  },
  {
    id: 'tech-5',
    name: 'Audio Ray-Tracing',
    category: 'TECHNICAL SPECS',
    badge: 'Acoustics',
    status: 'CONFIRMED',
    description:
      'Acoustic sound wave propagation calculating real-time reflection, reverberation, and obstruction across urban canyons and interior rooms.',
    verifiedIn: 'Take-Two Spatial Audio Patent US20220193551A1',
    tags: ['Spatial Audio', 'Acoustic Tracing', 'Occlusion']
  }
];

export const COMPARATIVE_METRICS: ComparativeMetric[] = [
  {
    id: 'comp-1',
    feature: 'Playable Landmass & Maritime Area',
    category: 'World Geometry',
    gtaV: '75.8 km² (Los Santos + Blaine County)',
    gtaVI: '~128.4 km² (Leonida mainland + Keys + Maritime Shelf)',
    verifiedSource: 'Trailer 1 Photogrammetry & 2022 Leaked World Coordinates',
    deltaNote: '+69.4% estimated total physical expanse with expanded littoral shelf'
  },
  {
    id: 'comp-2',
    feature: 'Enterable Interior Density',
    category: 'World Geometry',
    gtaV: '< 8% of commercial and residential structures',
    gtaVI: '> 40% target with procedural interior generation',
    verifiedSource: 'Take-Two Interior Synthesis Patent & 2022 Debug Strings',
    deltaNote: 'Massive reduction in static painted storefront facades'
  },
  {
    id: 'comp-3',
    feature: 'Water Dynamics & Hydro-Drag',
    category: 'Physics & Simulation',
    gtaV: 'Displacement heightfield with pre-baked wake sprites',
    gtaVI: 'Full Navier-Stokes Eulerian-Lagrangian fluid compute (US11288863B2)',
    verifiedSource: 'USPTO Patent US11288863B2 granted to Take-Two Interactive',
    deltaNote: 'Watercraft hull weight directly deforms ocean swells and creates real foam'
  },
  {
    id: 'comp-4',
    feature: 'NPC Crowd AI & Daily Routines',
    category: 'AI & World Simulation',
    gtaV: 'Spline-based spawning within 150m frustum; immediate despawn',
    gtaVI: 'Asynchronous persistent node schedule architecture (US10981067B2)',
    verifiedSource: 'USPTO Patent US10981067B2',
    deltaNote: 'NPCs maintain daily jobs, beach gatherings, and emergent social reactions'
  },
  {
    id: 'comp-5',
    feature: 'Hair & Cloth Simulation',
    category: 'Rendering Pipeline',
    gtaV: 'Static textured polygon cards rigged to skeletal bones',
    gtaVI: 'Real-time compute strand hair with wind shear and water saturation',
    verifiedSource: 'Trailer 1 4K Frame Analysis (00:32)',
    deltaNote: 'Strands react to high-speed convertibles without polygon clipping'
  },
  {
    id: 'comp-6',
    feature: 'Audio Acoustics & Reverberation',
    category: 'Sound Engine',
    gtaV: 'Zone-based pre-configured reverb DSP triggers',
    gtaVI: 'Geometric ray-marched acoustic wave bounce and diffraction',
    verifiedSource: 'Patent US20220193551A1',
    deltaNote: 'Echoes and gunshots realistically reverberate through urban alleyways'
  },
  {
    id: 'comp-7',
    feature: 'Target Platform & Memory Architecture',
    category: 'Hardware Target',
    gtaV: 'PS3 / Xbox 360 (512MB RAM) upgraded to PS4/XBO (8GB) and PS5 (16GB)',
    gtaVI: 'PS5 & Xbox Series X|S native only (16GB Unified GDDR6, Ultra-Fast NVMe SSD)',
    verifiedSource: 'Take-Two Dec 2023 Official Press Release',
    deltaNote: 'Zero legacy hard-drive bottlenecks; immediate streaming asset decompression'
  }
];

export const TICKER_ITEMS = [
  {
    id: 'tick-1',
    status: 'CONFIRMED' as const,
    text: 'Vice City & State of Leonida verified in Rockstar Trailer 1',
    ref: '[REF-01]'
  },
  {
    id: 'tick-2',
    status: 'REPORTED' as const,
    text: 'Fall 2025 release window reaffirmed in Take-Two Q3 2025 earnings call',
    ref: '[TTWO-SEC]'
  },
  {
    id: 'tick-3',
    status: 'DISPUTED' as const,
    text: '70% completed build leak debunked by cryptographic hash audit',
    ref: '[REV-09]'
  },
  {
    id: 'tick-4',
    status: 'SPECULATION' as const,
    text: 'Playable area estimated at 2.4x Los Santos via land survey photogrammetry',
    ref: '[GEO-MAP]'
  },
  {
    id: 'tick-5',
    status: 'CONFIRMED' as const,
    text: 'Dual-protagonists Lucia & Jason confirmed in official key art and dialogue',
    ref: '[REF-02]'
  },
  {
    id: 'tick-6',
    status: 'REPORTED' as const,
    text: 'Tom Petty Estate confirms official licensing of Love Is a Long Road',
    ref: '[EVD-08]'
  }
];
