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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-csharp-engine',
    slug: 'custom-csharp-game-engine-server',
    title: 'Designing a Custom C# Game & Dedicated Server Engine from Scratch',
    subtitle: 'Why I built my own networking framework, fixed-tick loop, and entity component system.',
    date: 'October 2026',
    readingTime: '7 min read',
    category: 'Systems Engineering',
    summary:
      'An in-depth look into the architectural trade-offs of building a custom C# game engine and headless server: socket protocols, deterministic tick loops, and binary serialization.',
    content: {
      lead:
        'Many indie developers start in commercial engines like Unity or Godot. While those tools are phenomenal, nothing teaches you how computers actually process games quite like writing your own engine and authoritative server loop in pure C#.',
      sections: [
        {
          heading: '1. The Core Architecture: Why Build from Scratch?',
          body: [
            'Over the past 5+ years, my passion has centered on understanding the mechanics under the hood. Commercial engines wrap game loops in heavy abstractions that can obscure memory allocation and socket latency.',
            'By building a custom C# engine, I had full control over memory layout, thread dispatching, and network transport. The server runs completely headless as a lightweight .NET console application capable of ticking at a steady 60Hz with minimal CPU overhead.',
          ],
          diagram: `┌────────────────────────────────────────────────────────┐
│               Authoritative Server Loop (60Hz)         │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────┐ │
│  │ Read Packets │ ──> │ Run ECS Tick │ ──> │ Broadcast│ │
│  │  (TCP / UDP) │     │  Simulation  │     │ Snapshot│ │
│  └──────────────┘     └──────────────┘     └─────────┘ │
└───────────────────────────┬────────────────────────────┘
                            │ Network Socket
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Connected Client                     │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────┐ │
│  │ Predict Move │ ──> │ Interpolate  │ ──> │ Render  │ │
│  │ (Zero Latency│     │ Remote Entities    │ Output  │ │
│  └──────────────┘     └──────────────┘     └─────────┘ │
└────────────────────────────────────────────────────────┘`,
        },
        {
          heading: '2. Low-Level Networking: TCP vs. UDP and Custom Serialization',
          body: [
            'For reliable actions like authentication, inventory transfers, and chat, standard TCP guarantees delivery. But for real-time player transforms and combat events, TCP head-of-line blocking is fatal.',
            'I implemented a dual-channel socket architecture: UDP for rapid, non-blocking entity snapshots, paired with custom sequence headers to detect dropped packets. Instead of slow reflection-based JSON, I wrote a custom binary buffer writer that packs vector coordinates and bitmasks into minimal byte payloads.',
          ],
          codeSnippet: {
            language: 'csharp',
            code: `public void SerializeSnapshot(BinaryWriter writer, Entity entity)
{
    writer.Write(entity.Id);
    writer.Write((short)(entity.Position.X * 100)); // Quantized 16-bit position
    writer.Write((short)(entity.Position.Y * 100));
    writer.Write((byte)entity.CurrentState);        // Packed state bitflag
}`,
            caption: 'Quantized binary packing for network entity snapshots',
          },
        },
        {
          heading: '3. What Building an Engine Teaches You',
          body: [
            'It forces you to think about CPU cache lines, garbage collection spikes, and synchronization race conditions. When you understand how a game loop ticks at the lowest level, working in Unity or Godot becomes tenfold easier because you know exactly what the engine is doing behind the curtain.',
          ],
          keyTakeaways: [
            'Deterministic loops with fixed delta-time are critical for fair multi-client physics.',
            'Custom binary packing saves huge amounts of bandwidth compared to generic formats.',
            'Separating simulation state from rendering keeps your server lightweight and crash-resilient.',
          ],
        },
      ],
    },
  },
  {
    id: 'post-gdd-design',
    slug: 'ten-years-writing-game-design-documents',
    title: '10 Years of Game Design Documents: Turning Passion Ideas into Rigorous Systems Specs',
    subtitle: 'How a decade of continuous GDD writing teaches software architecture before writing a line of code.',
    date: 'September 2026',
    readingTime: '6 min read',
    category: 'Game Design & Systems',
    summary:
      'Reflections on a decade of authoring comprehensive Game Design Documents (GDDs), detailing why rigorous mathematical balancing, state flowcharts, and edge-case planning are the backbone of great software.',
    content: {
      lead:
        'When people think of game design, they often imagine high-level story ideas and concept art. But real game design is systems engineering: formulas, state transitions, economy loops, and predicting edge cases.',
      sections: [
        {
          heading: '1. The Discipline of Long-Form Technical Design',
          body: [
            'For the better part of the last 10 years, I have written and iterated on comprehensive Game Design Documents for ambitious passion projects. A proper GDD is not just a wish list; it is a contract between creative vision and computational reality.',
            'Every mechanic must answer the hard questions: What happens if two players interact simultaneously? How does damage scale at Level 5 versus Level 50? What are the network synchronization implications of this ability?',
          ],
        },
        {
          heading: '2. Designing Mathematical Balance & Progression Curves',
          body: [
            'One of my favorite aspects of GDD authoring is designing mathematical progression curves. Linear scaling quickly leads to player burnout or trivialized content, while exponential scaling causes inflation.',
            'I model formulas for polynomial progression, diminishing returns on defense ratings, and item economy sinks. Structuring these relationships in advance prevents chaotic refactors during active code development.',
          ],
          diagram: `[Player Input] ──> [State Machine Verification] ──> [Formula Engine]
                         │ (Valid/Invalid)                  │ (Damage, Costs)
                         ▼                                  ▼
                [Cancel / Feedback]                [World State Commit]`,
        },
        {
          heading: '3. Bridging Design and Code',
          body: [
            'Having spent years writing GDDs has directly shaped how I program. I do not begin coding a system until the state flow and data requirements are crystal clear. That eliminates scope creep and guarantees cleaner, bug-free implementations.',
          ],
          keyTakeaways: [
            'Thorough documentation saves dozens of hours of coding refactors.',
            'Mathematical formulas must be stress-tested for both early-game and end-game boundaries.',
            'Clear state machine diagrams make implementing C# logic virtually frictionless.',
          ],
        },
      ],
    },
  },
  {
    id: 'post-mechanics-to-software',
    slug: 'wrenches-to-compilers-equipment-and-code',
    title: 'From Riding Mowers & Mini Excavators to Systems Architecture',
    subtitle: 'How operating heavy equipment and working alongside mechanics informs disciplined software development.',
    date: 'August 2026',
    readingTime: '5 min read',
    category: 'Field & Mechanical Insights',
    summary:
      'Operating zero-turn mowers, mini excavators, and assisting fleet mechanics taught me the exact same principles required for rock-solid software engineering: preventative maintenance, respect for tolerances, and rapid diagnostics.',
    content: {
      lead:
        'On paper, commercial groundskeeping and equipment operation seem like the exact opposite of programming custom C# socket servers. But in reality, they share the exact same underlying mental model.',
      sections: [
        {
          heading: '1. Preventative Maintenance vs. Technical Debt',
          body: [
            'When you operate commercial riding mowers across 40+ properties a week or run a mini excavator on an earthmoving site, preventative maintenance is non-negotiable. If you fail to check the hydraulic fluid, clean the air intake, or tension the deck belt, the machine will fail catastrophically in the middle of a job.',
            'Software engineering is identical. Technical debt is simply deferred maintenance. Skipping unit tests, ignoring edge cases, or writing sloppy memory handlers will eventually cause your server or application to crash under production load.',
          ],
        },
        {
          heading: '2. Diagnosing Root Causes, Not Symptoms',
          body: [
            'Working alongside the City Works Mechanic in Bloomsburg taught me systematic troubleshooting. When an engine sputters, you do not randomly replace parts. You check the fuel line, verify the spark plug, test the compression, and isolate the failure point.',
            'That is the exact mindset I bring to debugging software and PC hardware. Whether tracing a memory leak in a C# game loop or diagnosing a Windows kernel panic, disciplined root-cause isolation always wins.',
          ],
        },
        {
          heading: '3. Physical Stamina and Reliability',
          body: [
            'Long hours in the summer heat operating heavy equipment build mental toughness and a strong work ethic. In both field operations and engineering projects, showing up reliably, staying focused through friction, and taking pride in craftsmanship are what matter most.',
          ],
          keyTakeaways: [
            'Tolerances matter everywhere—in hydraulic valves and memory allocations alike.',
            'Root-cause isolation beats guessing every single time.',
            'Hands-on physical discipline translates directly into software craftsmanship.',
          ],
        },
      ],
    },
  },
  {
    id: 'post-hardware-pc-builds',
    slug: 'precision-pc-hardware-assembly-and-tuning',
    title: 'Precision PC Hardware Assembly: Component Matching, BIOS Tuning, and Thermal Benchmarking',
    subtitle: 'A practical methodology for building rock-solid desktop workstations and diagnosing hardware failures.',
    date: 'July 2026',
    readingTime: '6 min read',
    category: 'Hardware & IT',
    summary:
      'A deep dive into building custom desktop computers for friends and personal use: sizing power delivery, managing thermal dynamics, flashing UEFI firmware, and Windows stability testing.',
    content: {
      lead:
        'Building a computer is more than snapping parts together like LEGO bricks. It requires understanding electrical load curves, PCIe lane allocation, memory topology, and thermal dynamics.',
      sections: [
        {
          heading: '1. Sizing and Matching Component Topologies',
          body: [
            'Whenever I build a computer for friends or myself, I start with component balance. Sizing a power supply is not just about total wattage; you must account for transient power spikes from modern high-power GPUs and verify 12V rail stability.',
            'Similarly, motherboard VRM quality determines whether a CPU will maintain boost clocks or throttle under continuous rendering and compilation workloads.',
          ],
        },
        {
          heading: '2. Firmware Tuning and Memory Stability Testing',
          body: [
            'Once assembly is complete with clean cable routing and proper thermal paste spread, the real work begins in the UEFI/BIOS. Enabling memory profiles (XMP/EXPO) requires verifying that memory sub-timings are stable.',
            'I always run MemTest86 for multi-hour passes before installing the operating system, followed by Prime95 (Small FFTs) and FurMark stress tests on Windows to ensure temperatures remain safely within threshold.',
          ],
        },
        {
          heading: '3. Windows Operating System Optimization & Troubleshooting',
          body: [
            'A great hardware build needs an equally clean software environment. I streamline Windows installations by disabling telemetry bloat, configuring power plans for low input latency, and verifying driver integrity via the Windows Event Viewer to prevent silent system conflicts.',
          ],
          keyTakeaways: [
            'Always verify memory stability with low-level diagnostics before deploying the OS.',
            'Case airflow positive pressure prevents dust buildup and maintains thermal headroom.',
            'Clean cable management is not just aesthetic—it maintains unobstructed laminar airflow.',
          ],
        },
      ],
    },
  },
];

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
