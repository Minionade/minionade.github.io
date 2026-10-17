import { BlogPost, ResumeData } from '../types';

export const INITIAL_RESUME_DATA: ResumeData = {
  profile: {
    name: 'Trevor Barrett',
    title: 'Systems Programmer & Technical Specialist',
    location: 'Bloomsburg, PA 17815',
    phone: '+1 570 854 1682',
    email: 'trevorbarrett137@gmail.com',
    github: 'github.com/minionade',
    portfolio: 'trevorbarrett.dev',
  },
  summaryByPersona: {
    hybrid:
      'Versatile technical specialist and systems developer with 5+ years of self-directed C# game engine and authoritative server architecture, paired with extensive hands-on commercial machinery operations. Combines low-level software engineering, component-level PC hardware assembly, and rigorous mechanical diagnostic capabilities to solve complex problems with discipline, high physical stamina, and meticulous attention to detail.',
    gamedev:
      'Systems and gameplay programmer with 5+ years of specialized hobbyist development across C#, Unity, and Godot, backed by a decade of comprehensive Game Design Document (GDD) authoring. Engineered a custom modular game and server engine in C# from the ground up, implementing raw socket networking, deterministic game loops, entity-component systems, and goal-oriented AI behaviors.',
    hardware:
      'Hardware technician and systems builder with extensive experience architecting, assembling, and benchmarking custom desktop PC systems across multiple generations. Highly proficient in Windows OS diagnostics, UEFI/BIOS optimization, hardware stress-testing, and mechanical equipment troubleshooting alongside municipal city works mechanics.',
    equipment:
      'Safety-oriented commercial grounds and equipment operator with hands-on proficiency operating commercial riding mowers, zero-turn units, mini excavators, and mini skids across 40+ residential and commercial properties weekly. Skilled in routine preventative maintenance, blade sharpening, hydraulic systems inspection, and rapid field troubleshooting.',
  },
  skillsByPersona: {
    hybrid: [
      {
        category: 'Software & Programming',
        items: [
          'C#',
          'Custom Game Engine Architecture',
          'Socket Server Networking (TCP/UDP)',
          'Unity Engine',
          'Godot Engine',
          'Entity Component Systems (ECS)',
          'AI State Machines',
          'Git Version Control',
        ],
      },
      {
        category: 'Hardware & IT Infrastructure',
        items: [
          'Custom PC Architecture & Assembly',
          'BIOS/UEFI Configuration',
          'Component Diagnostics',
          'Windows OS Administration',
          'Thermal Management & Benchmarking',
          'Hardware Troubleshooting',
        ],
      },
      {
        category: 'Systems Design & Analysis',
        items: [
          'Game Design Documents (10+ Years)',
          'System Balancing & Economy Modeling',
          'Deterministic Game Loops',
          'Technical Documentation',
          'State Flowcharting',
        ],
      },
      {
        category: 'Equipment & Field Operations',
        items: [
          'Commercial Riding Mowers & Zero-Turns',
          'Mini Excavator Operation',
          'Mini Skid Steer (Bucket & Forks)',
          'Rototiller & Heavy Demolition',
          'Preventative Engine Maintenance',
          'Hydraulic Inspection',
        ],
      },
    ],
    gamedev: [
      {
        category: 'Core Languages & Architecture',
        items: [
          'C# (.NET Core)',
          'Custom Engine Loop Architecture',
          'Low-Level Sockets (TCP / UDP)',
          'Packet Serialization & Deserialization',
          'Entity-Component-System (ECS)',
          'Spatial Partitioning & Collision',
        ],
      },
      {
        category: 'Engines & Gameplay Systems',
        items: [
          'Unity (2D / 3D, C#)',
          'Godot (GDScript / C#)',
          'Non-Player Character AI (GOAP, State Machines)',
          'Pathfinding & Navigation Meshes',
          'Procedural Generation',
          'Shader Graph Basics',
        ],
      },
      {
        category: 'Game Design & Documentation',
        items: [
          '10+ Years Passion Project GDDs',
          'Mathematical Progression Curves',
          'Combat & Weapon Balancing',
          'Loot & Economy Loops',
          'Technical Design Specifications',
        ],
      },
      {
        category: 'Dev Tooling & Environment',
        items: [
          'Visual Studio / VS Code',
          'Git & GitHub Workflow',
          'Windows Diagnostics & Profiling',
          'Custom Editor Tooling & Importers',
        ],
      },
    ],
    hardware: [
      {
        category: 'Hardware Architecture & Assembly',
        items: [
          'Custom Desktop PC Builds (Friends & Personal)',
          'Motherboard / CPU / GPU Matching',
          'Thermal Paste & Liquid/Air Cooling Config',
          'Cable Management & Airflow Optimization',
          'Power Delivery & PSU Load Sizing',
        ],
      },
      {
        category: 'Firmware & Operating Systems',
        items: [
          'UEFI / BIOS Flashing & Tuning',
          'Memory Timing (XMP / EXPO)',
          'Windows 10/11 Deployment & Registry Tweaks',
          'Driver Conflict Resolution',
          'Event Viewer & Diagnostic Logging',
        ],
      },
      {
        category: 'Diagnostics & Benchmarking',
        items: [
          'MemTest86 & RAM Stability',
          'Prime95 & FurMark Stress Testing',
          'Storage Health (SMART Analysis, NVMe/SATA)',
          'Peripheral & Port Testing',
        ],
      },
      {
        category: 'Mechanical & Field Diagnostics',
        items: [
          'Direct Assistance to City Works Mechanic',
          'Lawn Care Equipment Engine Maintenance',
          'Small Engine Troubleshooting',
          'Multi-meter & Circuit Continuity Basics',
        ],
      },
    ],
    equipment: [
      {
        category: 'Commercial Machinery & Heavy Tools',
        items: [
          'Commercial Riding Mowers (Zero-Turn)',
          'Mini Excavator (Trenching & Earthmoving)',
          'Mini Skid Steer (Bucket & Pallet Forks)',
          'Walk-Behind Push Mowers & Edgers',
          'Commercial Rototiller',
          'Industrial Leaf Blowers & Trimmers',
        ],
      },
      {
        category: 'Preventative & Field Maintenance',
        items: [
          'Daily Fluid & Oil Checks',
          'Mower Deck Leveling & Blade Sharpening',
          'Air & Fuel Filter Servicing',
          'Safety Interlock & Belt Tensioning',
          'Assisted City Works Fleet Mechanic',
        ],
      },
      {
        category: 'Landscaping & Municipal Grounds',
        items: [
          '40+ Weekly Residential & Commercial Sites',
          'Landscape Demolition & Dirt Grading',
          'Tree Trimming, Pruning, & Shearing',
          'Warehouse & City Public Works Support',
          'Vehicle Loading & Secure Transport',
        ],
      },
      {
        category: 'Technical & Computing Strengths',
        items: [
          'Windows Workstation Proficiency',
          'Digital Inventory & Equipment Records',
          'Computer Hardware Literacy',
          'Collaborative Team Communication',
        ],
      },
    ],
  },
  projects: [
    {
      id: 'custom-engine',
      title: 'Custom C# Game Engine & Authoritative Server',
      roleSubtitle: 'Architect & Lead Systems Developer',
      period: '5+ Years Active Development',
      stack: ['C#', '.NET', 'TCP/UDP Sockets', 'Custom Serialization', 'ECS Architecture'],
      summary:
        'Engineered an independent 2D/3D game engine and dedicated socket server framework from scratch in C#, achieving high-throughput state replication and deterministic simulation.',
      accomplishments: [
        'Built a custom networking layer utilizing raw TCP for reliable packet delivery and UDP for high-frequency position updates with state interpolation.',
        'Designed an Entity-Component-System (ECS) data layout for cache-friendly entity updates and flexible gameplay composition.',
        'Developed a custom binary packet serializer reducing network bandwidth overhead by 40% compared to standard JSON/XML streams.',
        'Implemented a fixed-timestep server game loop with lag compensation and client-side prediction mechanics.',
      ],
      githubUrl: 'https://github.com/minionade',
    },
    {
      id: 'indie-games-ai',
      title: 'AI-Driven Gameplay Prototypes (Unity & Godot)',
      roleSubtitle: 'Game Designer & Developer',
      period: 'Multi-Project Portfolio',
      stack: ['Unity', 'Godot', 'C#', 'GDScript', 'Finite State Machines', 'GOAP'],
      summary:
        'Created multiple single-player and cooperative game prototypes in Unity and Godot exploring complex procedural generation and autonomous agent behaviors.',
      accomplishments: [
        'Engineered modular AI behavioral architectures including hierarchical finite state machines and Goal-Oriented Action Planning (GOAP) for tactical NPC enemies.',
        'Implemented pathfinding systems featuring custom dynamic grid obstacles, steering behaviors, and raycast field-of-view awareness.',
        'Built custom in-editor inspection tools to debug AI perception cones, state transitions, and memory weighting in real time.',
      ],
    },
    {
      id: 'gdd-archive',
      title: 'Game Design Documentation (GDD) Archive',
      roleSubtitle: 'Lead Systems Designer & Systems Architect',
      period: '10+ Years Continuous Work',
      stack: ['System Architecture', 'Combat Mathematics', 'Economy Balancing', 'State Machine Diagrams'],
      summary:
        'Authored over a decade of comprehensive, production-grade Game Design Documents detailing complete game systems for ambitious passion projects.',
      accomplishments: [
        'Drafted multi-hundred-page technical design documents defining core loops, mathematical progression formulas, and itemization balance.',
        'Created architectural flowcharts detailing UI screen states, menu hierarchies, and networking handshake protocols.',
        'Developed formulas for combat damage curves, experience progression scaling, and procedural loot probability tables.',
      ],
    },
    {
      id: 'pc-building',
      title: 'Custom PC Architecture & Hardware Systems',
      roleSubtitle: 'Hardware Specialist & Builder',
      period: 'Ongoing (Multiple Builds)',
      stack: ['Hardware Diagnostics', 'UEFI/BIOS Tuning', 'Thermal Benchmarking', 'Windows Diagnostics'],
      summary:
        'Designed, sourced, assembled, and stress-tested bespoke high-performance desktop computers for personal computing and friends.',
      accomplishments: [
        'Configured component compatibility across Intel/AMD platforms, sizing thermal solutions, PCIe lane distribution, and PSU wattage margins.',
        'Performed precision mechanical assembly, thermal compound application, cable routing for optimal airflow, and clean cable management.',
        'Conducted rigorous stress-testing using Prime95, FurMark, and MemTest86, fine-tuning memory profiles (XMP/EXPO) for 100% operational stability.',
        'Diagnosed and resolved critical hardware bottlenecks, BSODs, and driver conflicts on Windows workstations.',
      ],
    },
  ],
  experience: [
    {
      id: 'jacksons-boise',
      role: 'Customer Service Representative',
      company: 'Jacksons Food Stores',
      location: 'Boise, ID',
      period: '2026',
      highlights: [
        'Demonstrated exceptional reliability and versatility by working across every operational shift, seamlessly rotating between high-responsibility overnights (graveyard), day shifts, and swing shifts.',
        'Built positive, welcoming relationships with regular and new customers, providing attentive service and resolving customer requests with courtesy in a fast-paced retail setting.',
        'Maintained pristine store cleanliness, sanitation, and visual merchandise presentation across all retail aisles, service counters, and customer facilities.',
        'Managed point-of-sale (POS) transactions, accurate cash reconciliation, inventory restocking, and store security monitoring during independent overnight operations.',
      ],
      skillsUsed: ['24/7 Shift Flexibility', 'Customer Relations', 'Store Cleanliness & Merchandising', 'Point-of-Sale (POS)', 'Cash Reconciliation'],
    },
    {
      id: 'terravita',
      role: 'Mow Crew Helper & Equipment Operator',
      company: 'Terravita Landscape & Gardening',
      location: 'Garden City, ID',
      period: '2026',
      highlights: [
        'Operated commercial riding mowers, zero-turn units, string trimmers, and blowers across 40+ high-profile residential and commercial properties weekly.',
        'Worked with landscaping demolition crew executing earthmoving projects utilizing mini skids (bucket & forks attachments), mini excavators, and rototillers.',
        'Assisted gardening crew with precision plant pruning, shearing, root bed weeding, and comprehensive seasonal estate cleanups.',
        'Maintained rigorous daily equipment safety checks and assisted with refueling and blade clearing on the field.',
      ],
      skillsUsed: ['Commercial Riding Mowers', 'Mini Excavator', 'Mini Skid Steer', 'Rototiller', 'Demolition & Grading'],
    },
    {
      id: 'bloomsburg',
      role: 'Seasonal Grounds & Equipment Specialist',
      company: 'Town of Bloomsburg',
      location: 'Bloomsburg, PA',
      period: '2025',
      highlights: [
        'Operated municipal lawn care machinery including commercial riding mowers, push mowers, and trimmers to maintain public parklands and city infrastructure.',
        'Performed daily routine maintenance and inspections on all operated equipment to guarantee operational safety and mechanical longevity.',
        'Directly assisted the City Works Mechanic with miscellaneous mechanical repairs, troubleshooting small engines, and replacing worn components.',
        'Collaborated closely with crew members to exceed daily municipal maintenance targets ahead of schedule.',
        'Assisted with warehouse facilities maintenance, loading/unloading heavy tools, and municipal waste management.',
      ],
      skillsUsed: ['Commercial Mowers', 'Small Engine Repair', 'Mechanical Troubleshooting', 'Fleet Maintenance', 'Team Coordination'],
    },
  ],
  education: {
    id: 'ged-bloomsburg',
    degree: 'General Educational Development (GED)',
    institution: 'Homeschooled',
    location: 'Bloomsburg, PA',
    year: 'September 2020',
    notes:
      'Demonstrated high self-direction, discipline, and commitment through sustained self-guided education in computer science, software programming, mathematics, and mechanical systems.',
  },
};

export const BLOG_POSTS: BlogPost[] = [];


export const ATS_KEYWORDS: Record<string, string[]> = {
  gamedev: [
    'C#',
    'Unity',
    'Godot',
    'Game Engine Architecture',
    'Socket Networking',
    'TCP / UDP',
    'Entity Component System (ECS)',
    'AI State Machines',
    'Game Design Documents (GDD)',
    'Mechanics Balancing',
    'Git',
  ],
  hardware: [
    'Custom PC Assembly',
    'Hardware Diagnostics',
    'BIOS / UEFI Flashing',
    'Windows 10 / 11 Administration',
    'Thermal Optimization',
    'Stress Testing (Prime95/MemTest)',
    'Component Troubleshooting',
    'Small Engine Maintenance',
  ],
  equipment: [
    'Commercial Riding Mowers',
    'Zero-Turn Operation',
    'Mini Excavator',
    'Mini Skid Steer',
    'Rototiller',
    'Preventative Maintenance',
    'Hydraulic Inspection',
    'Workplace Safety Protocols',
  ],
  hybrid: [
    'C#',
    'Game Engine Architecture',
    'Socket Server',
    'Custom PC Assembly',
    'Windows OS Diagnostics',
    'Commercial Equipment Operations',
    'Mini Excavator & Skid Steer',
    'Game Design Documents',
    'Preventative Maintenance',
  ],
};
