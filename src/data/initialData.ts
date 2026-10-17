import { BlogPost, ResumeData } from '../types';

export const INITIAL_RESUME_DATA: ResumeData = {
  "profile": {
    "name": "Trevor Barrett",
    "title": "Software Development & Technical Work",
    "location": "Bloomsburg, PA 17815",
    "phone": "+1 570 854 1682",
    "email": "trevorbarrett137@gmail.com",
    "github": "github.com/minionade",
    "portfolio": "minionade.github.io"
  },
  "summaryByPersona": {
    "hybrid": "Self-taught C# developer with experience building game engines, multiplayer networking, and gameplay systems. I also build and troubleshoot PCs and have worked in landscaping, municipal grounds maintenance, and customer service.",
    "gamedev": "Self-taught game developer working in C#, Unity, and Godot. My personal projects include a custom game engine, multiplayer networking, and AI prototypes. I also write game design documents covering mechanics, progression, and balance.",
    "hardware": "I build and troubleshoot desktop PCs for myself and friends, from choosing compatible parts to assembly, setup, and testing. My experience includes Windows diagnostics, BIOS configuration, cooling, and resolving hardware and driver issues.",
    "equipment": "Experience in commercial landscaping and municipal grounds maintenance, including riding mowers, zero-turns, mini excavators, and mini skid steers. I have also helped with equipment checks, routine maintenance, and repairs alongside a public works mechanic."
  },
  "skillsByPersona": {
    "hybrid": [
      {
        "category": "Programming",
        "items": [
          "C# / .NET",
          "Unity",
          "Godot",
          "TCP/UDP networking",
          "Git"
        ]
      },
      {
        "category": "Game development",
        "items": [
          "Game engines",
          "Gameplay AI",
          "Game design documents",
          "Systems balancing"
        ]
      },
      {
        "category": "PC hardware",
        "items": [
          "PC assembly",
          "Windows troubleshooting",
          "BIOS/UEFI setup",
          "Cooling and stress testing"
        ]
      },
      {
        "category": "Equipment",
        "items": [
          "Commercial mowers",
          "Mini excavators and skid steers",
          "Routine maintenance",
          "Small-engine troubleshooting"
        ]
      }
    ],
    "gamedev": [
      {
        "category": "Languages & tools",
        "items": [
          "C# / .NET",
          "GDScript",
          "Unity",
          "Godot",
          "Git",
          "Visual Studio / VS Code"
        ]
      },
      {
        "category": "Engine systems",
        "items": [
          "TCP/UDP networking",
          "Packet serialization",
          "Fixed-timestep game loops",
          "Entity-component systems"
        ]
      },
      {
        "category": "Gameplay",
        "items": [
          "State machines",
          "Goal-oriented action planning (GOAP)",
          "Pathfinding",
          "Procedural generation"
        ]
      },
      {
        "category": "Design",
        "items": [
          "Game design documents",
          "Combat and progression systems",
          "Game economies",
          "Technical diagrams"
        ]
      }
    ],
    "hardware": [
      {
        "category": "PC building",
        "items": [
          "Component selection",
          "Assembly",
          "Power supply sizing",
          "Cable management and cooling"
        ]
      },
      {
        "category": "Setup & troubleshooting",
        "items": [
          "BIOS/UEFI",
          "Windows",
          "Driver issues",
          "XMP/EXPO memory profiles"
        ]
      },
      {
        "category": "Testing",
        "items": [
          "MemTest86",
          "Prime95",
          "FurMark",
          "Storage health checks"
        ]
      },
      {
        "category": "Maintenance",
        "items": [
          "Hardware diagnostics",
          "Small-engine troubleshooting",
          "Assisting with mechanical repairs"
        ]
      }
    ],
    "equipment": [
      {
        "category": "Equipment",
        "items": [
          "Riding mowers and zero-turns",
          "Mini excavators",
          "Mini skid steers",
          "Rototillers",
          "Trimmers and blowers"
        ]
      },
      {
        "category": "Grounds maintenance",
        "items": [
          "Mowing and edging",
          "Pruning and weeding",
          "Seasonal cleanup",
          "Grading and demolition support"
        ]
      },
      {
        "category": "Maintenance",
        "items": [
          "Daily equipment checks",
          "Fluid checks and refueling",
          "Routine upkeep",
          "Assisting with repairs"
        ]
      },
      {
        "category": "Other experience",
        "items": [
          "Public works support",
          "Loading and unloading equipment",
          "Customer service",
          "Windows and PC hardware"
        ]
      }
    ]
  },
  "projects": [
    {
      "id": "custom-engine",
      "title": "Custom C# Game Engine",
      "roleSubtitle": "Personal project",
      "period": "Ongoing",
      "stack": [
        "C#",
        ".NET",
        "TCP/UDP",
        "Packet serialization",
        "Entity-component systems"
      ],
      "summary": "Building a game engine and dedicated server in C#, with a focus on networking and keeping game state in sync.",
      "accomplishments": [
        "Built TCP and UDP networking for reliable messages and frequent position updates.",
        "Wrote packet serialization and a fixed-timestep server loop to manage game updates.",
        "Organized game objects with an entity-component system."
      ],
      "githubUrl": "https://github.com/minionade"
    },
    {
      "id": "indie-games-ai",
      "title": "Unity & Godot Prototypes",
      "roleSubtitle": "Personal projects",
      "period": "Ongoing",
      "stack": [
        "Unity",
        "Godot",
        "C#",
        "GDScript",
        "Gameplay AI"
      ],
      "summary": "Game prototypes exploring enemy behavior, pathfinding, and procedural generation in Unity and Godot.",
      "accomplishments": [
        "Built enemy behaviors using state machines and goal-oriented action planning.",
        "Worked on pathfinding, obstacle avoidance, and line-of-sight checks.",
        "Made editor tools to inspect AI behavior and debug state changes."
      ]
    },
    {
      "id": "gdd-archive",
      "title": "Game Design Documents",
      "roleSubtitle": "Personal projects",
      "period": "Ongoing",
      "stack": [
        "Game mechanics",
        "Combat balancing",
        "Progression",
        "Game economies"
      ],
      "summary": "Design documents for personal game ideas, covering how their mechanics fit together and how players progress.",
      "accomplishments": [
        "Documented game loops, combat rules, progression, and item systems.",
        "Used formulas and diagrams to plan balancing, loot, menus, and game states."
      ]
    },
    {
      "id": "pc-building",
      "title": "PC Building & Troubleshooting",
      "roleSubtitle": "Personal and friends’ builds",
      "period": "Ongoing",
      "stack": [
        "PC assembly",
        "BIOS/UEFI",
        "Windows",
        "Hardware testing"
      ],
      "summary": "Built and maintained desktop PCs for myself and friends, including parts selection, assembly, and troubleshooting.",
      "accomplishments": [
        "Selected compatible components and assembled systems with attention to cooling and cable routing.",
        "Tested memory, CPU, and GPU stability using MemTest86, Prime95, and FurMark.",
        "Troubleshot Windows crashes, driver conflicts, and hardware problems."
      ]
    }
  ],
  "experience": [
    {
      "id": "jacksons-boise",
      "role": "Customer Service Representative",
      "company": "Jacksons Food Stores",
      "location": "Boise, ID",
      "period": "2026",
      "highlights": [
        "Helped customers, handled register transactions, and balanced cash.",
        "Worked day, swing, and overnight shifts, including independent overnight coverage.",
        "Restocked inventory and kept the store clean and organized."
      ],
      "skillsUsed": [
        "Customer service",
        "Cash handling",
        "Stocking",
        "Overnight shifts"
      ]
    },
    {
      "id": "terravita",
      "role": "Mow Crew Helper & Equipment Operator",
      "company": "Terravita Landscape & Gardening",
      "location": "Garden City, ID",
      "period": "2026",
      "highlights": [
        "Mowed and maintained residential and commercial properties using riding mowers, zero-turns, trimmers, and blowers.",
        "Helped with grading and demolition work using mini skid steers, mini excavators, and rototillers.",
        "Assisted with pruning, weeding, seasonal cleanup, and daily equipment checks."
      ],
      "skillsUsed": [
        "Commercial mowers",
        "Mini excavators",
        "Mini skid steers",
        "Grounds maintenance"
      ]
    },
    {
      "id": "bloomsburg",
      "role": "Seasonal Grounds & Equipment Specialist",
      "company": "Town of Bloomsburg",
      "location": "Bloomsburg, PA",
      "period": "2025",
      "highlights": [
        "Maintained public grounds using riding mowers, push mowers, and trimmers.",
        "Checked and maintained equipment and helped the public works mechanic with repairs and small-engine troubleshooting.",
        "Helped with warehouse upkeep, loading and unloading tools, and waste collection."
      ],
      "skillsUsed": [
        "Grounds maintenance",
        "Equipment upkeep",
        "Mechanical repair assistance",
        "Public works"
      ]
    }
  ],
  "education": {
    "id": "ged-bloomsburg",
    "degree": "General Educational Development (GED)",
    "institution": "Homeschooled",
    "location": "Bloomsburg, PA",
    "year": "September 2020",
    "notes": ""
  }
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
