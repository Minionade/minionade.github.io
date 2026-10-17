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
    "hybrid": "Self-taught developer working with C#, Unity, and Minecraft mods. My projects include published mods, a standalone multiplayer game prototype, and custom modpack scripting. I manage repositories and branches with GitHub and coordinate multiple AI agents on shared projects.",
    "gamedev": "Self-taught C# developer with experience building Unity gameplay prototypes and a standalone tile-based MMO prototype with its own server. I also publish Minecraft mods, write KubeJS scripts, and guide multiple AI agents toward a shared project goal.",
    "hardware": "I build and troubleshoot desktop PCs for myself and friends, from choosing compatible parts to assembly, setup, and testing. My experience includes Windows diagnostics, BIOS configuration, cooling, and resolving hardware and driver issues.",
    "equipment": "Experience in commercial landscaping and municipal grounds maintenance, including riding mowers, zero-turns, mini excavators, and mini skid steers. I have also helped with equipment checks, routine maintenance, and repairs alongside a public works mechanic."
  },
  "skillsByPersona": {
    "hybrid": [
      {
        "category": "Development",
        "items": [
          "C#",
          "Java",
          "Unity",
          "Minecraft modding",
          "KubeJS / JavaScript",
          "Basic SQL"
        ]
      },
      {
        "category": "Tools & workflow",
        "items": [
          "Git / GitHub",
          "Repositories and branches",
          "AI-assisted development",
          "Coordinating multiple AI agents",
          "Local models with Ollama"
        ]
      },
      {
        "category": "PC hardware",
        "items": [
          "PC assembly",
          "Windows troubleshooting",
          "BIOS/UEFI",
          "Hardware testing"
        ]
      },
      {
        "category": "Equipment",
        "items": [
          "Commercial mowers",
          "Mini excavators and skid steers",
          "Routine maintenance"
        ]
      }
    ],
    "gamedev": [
      {
        "category": "Development",
        "items": [
          "C#",
          "Java",
          "Unity",
          "Custom network packets",
          "KubeJS / JavaScript",
          "Basic SQL"
        ]
      },
      {
        "category": "Game projects",
        "items": [
          "Movement systems",
          "RPG leveling and spells",
          "Multiplayer prototypes",
          "Editor tools"
        ]
      },
      {
        "category": "Version control",
        "items": [
          "Git",
          "GitHub",
          "Repository and branch management"
        ]
      },
      {
        "category": "AI-assisted workflow",
        "items": [
          "Multi-agent coordination",
          "GitHub Copilot",
          "Claude",
          "ChatGPT",
          "Gemini / AI Studio",
          "Ollama"
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
      "id": "minecraft-mods",
      "title": "Minecraft Mods & Modpack Development",
      "roleSubtitle": "Personal projects",
      "period": "Ongoing",
      "stack": [
        "Java",
        "Forge",
        "NeoForge",
        "KubeJS",
        "JavaScript",
        "GitHub"
      ],
      "summary": "Published Minecraft mods and compatibility addons written in Java, alongside KubeJS modpack scripting and a cross-version compatibility bridge.",
      "accomplishments": [
        "Published Java mods including Quantum Flux: Reforged and Tinkers\u2019 Auto Anvil for Forge 1.20.1, plus compatibility addons.",
        "Writing KubeJS scripts for Project Atmos, a modpack inspired by Project Ozone 2: Kappa Mode.",
        "Developing Forge Stuck!!!, an experimental bridge targeting Forge 1.20.1 mods on NeoForge 1.21.1."
      ]
    },
    {
      "id": "custom-engine",
      "title": "Standalone C# MMO Prototype",
      "roleSubtitle": "Personal project",
      "period": "Unfinished",
      "stack": [
        "C#",
        "Custom network packets",
        "SQL"
      ],
      "summary": "A standalone tile-based MMO prototype with its own server and custom network packets.",
      "accomplishments": [
        "Built a standalone C# game prototype with custom packets and a separate server.",
        "Worked with SQL for database management and experimented with salted password hashing."
      ]
    },
    {
      "id": "indie-games-ai",
      "title": "Unity Gameplay Prototypes",
      "roleSubtitle": "Personal projects",
      "period": "Unfinished",
      "stack": [
        "C#",
        "Unity",
        "Editor tools"
      ],
      "summary": "Unity prototypes exploring movement, RPG mechanics, and different game formats.",
      "accomplishments": [
        "Explored Source-style bunny hopping and surfing, RPG leveling, and spell systems.",
        "Worked on FPS, MOBA, and tile-based prototypes, along with editor tools."
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
    "institution": "Commonwealth of Pennsylvania",
    "location": "Bloomsburg, PA",
    "year": "September 2020",
    "notes": ""
  },
  "portfolioProjects": [
    {
      "id": "forge-stuck",
      "title": "Forge Stuck!!!",
      "roleSubtitle": "Minecraft compatibility bridge",
      "period": "In development",
      "stack": [
        "Java",
        "Minecraft",
        "Forge 1.20.1",
        "NeoForge 1.21.1"
      ],
      "summary": "An experimental bridge aimed at running Forge 1.20.1 mods on NeoForge 1.21.1. The idea grew out of Infinity Redux, my FTB Infinity remake, when I ran into the split between modern modding versions.",
      "accomplishments": [
        "Working toward compatibility across the two Minecraft versions and mod loaders.",
        "Started to bring older Forge mods into a modern pack without waiting for every mod to move to the same version.",
        "Still in development; full mod compatibility is the goal, not a finished feature."
      ]
    },
    {
      "id": "ozone-inspired-pack",
      "title": "Project Atmos",
      "roleSubtitle": "Expert modpack & KubeJS scripting",
      "period": "In development",
      "stack": [
        "Minecraft",
        "KubeJS",
        "JavaScript",
        "Modpack development"
      ],
      "summary": "My love letter to Project Ozone 2: Kappa Mode, built around the progression and feel that made the original pack memorable.",
      "accomplishments": [
        "Writing KubeJS JavaScript to tune recipes, progression, and how the mods fit together.",
        "Recreated missing mods as Quantum Flux: Reforged and Tinkers\u2019 Auto Anvil to support the pack.",
        "Iterating on the pack\u2019s balance and feel as development continues."
      ]
    },
    {
      "id": "infinity-redux",
      "title": "Infinity Redux",
      "roleSubtitle": "FTB Infinity remake",
      "period": "In development",
      "stack": [
        "Minecraft",
        "Modpack development"
      ],
      "summary": "A remake of FTB Infinity for modern Minecraft. Working on it exposed the split between modding versions and led to the idea for Forge Stuck!!!.",
      "accomplishments": [
        "Reworking the FTB Infinity modpack experience for modern Minecraft.",
        "Working through gaps where the mods needed for the pack target different Minecraft versions."
      ]
    },
    {
      "id": "quantumflux-reforged",
      "title": "Quantum Flux: Reforged",
      "roleSubtitle": "Minecraft mod remake",
      "period": "Published alpha",
      "stack": [
        "Java",
        "Minecraft",
        "Forge 1.20.1",
        "Forge Energy"
      ],
      "summary": "A remake of QuantumFlux for Minecraft 1.20.1, created to bring its machines and wireless energy systems into a modern modpack.",
      "accomplishments": [
        "Recreated energy generation, storage, and wireless power features inspired by the original mod.",
        "Added machine tiers, configurable energy input/output faces, and wireless channels.",
        "Published on CurseForge with Forge Energy, JEI, and Curios support."
      ],
      "demoUrl": "https://www.curseforge.com/minecraft/mc-mods/quantumflux-reforged"
    },
    {
      "id": "tinkers-auto-anvil",
      "title": "Tinkers\u2019 Auto Anvil",
      "roleSubtitle": "Minecraft automation addon",
      "period": "Published alpha",
      "stack": [
        "Java",
        "Minecraft",
        "Forge 1.20.1",
        "Tinkers\u2019 Construct"
      ],
      "summary": "A modern remake inspired by TiCAutoToolStation, adding an automatic anvil for Tinkers\u2019 Construct.",
      "accomplishments": [
        "Built an anvil that accepts tools and materials through hoppers and pipes.",
        "Recreated the idea for modern Tinkers\u2019 Construct without using the original mod\u2019s code.",
        "Published on CurseForge for Minecraft 1.20.1."
      ],
      "demoUrl": "https://www.curseforge.com/minecraft/mc-mods/tinkers-auto-anvil"
    },
    {
      "id": "dynamic-tree-physics-patches",
      "title": "Dynamic Tree Physics Patches",
      "roleSubtitle": "Community addon & patches",
      "period": "Published",
      "stack": [
        "Java",
        "Minecraft",
        "Mod compatibility"
      ],
      "summary": "Community patches and tweaks for Dynamic Tree Physics, published as a separate addon.",
      "accomplishments": [
        "Created patches for an existing community mod rather than a standalone replacement.",
        "Published the addon on CurseForge for other players and pack authors."
      ],
      "demoUrl": "https://www.curseforge.com/minecraft/mc-mods/dynamic-tree-physics-patches"
    },
    {
      "id": "slate-compat",
      "title": "Slate Compatibility",
      "roleSubtitle": "Community UI compatibility addon",
      "period": "Published",
      "stack": [
        "Java",
        "Minecraft",
        "Forge 1.20.1",
        "UI compatibility"
      ],
      "summary": "An addon that brings Slate-style interfaces to other inventory and menu mods.",
      "accomplishments": [
        "Added Slate-themed compatibility for Legendary Inventory, Trash Slot, and FancyMenu.",
        "Published on CurseForge as an addon requiring Slate Core."
      ],
      "demoUrl": "https://www.curseforge.com/minecraft/mc-mods/slate-compat"
    },
    {
      "id": "custom-engine",
      "title": "Standalone C# MMO Prototype",
      "roleSubtitle": "C# client & server prototype",
      "period": "Unfinished prototype",
      "stack": [
        "C#",
        "Custom networking",
        "SQL",
        "Password hashing"
      ],
      "summary": "A standalone C# version of my tile-based game prototype, designed around an MMO client and its own server.",
      "accomplishments": [
        "Built custom network packets and a separate server for the game.",
        "Worked with SQL for database management.",
        "Experimented with SHA-256 hashing and salts for password storage in the prototype."
      ]
    },
    {
      "id": "indie-games-ai",
      "title": "Unity Gameplay Prototypes",
      "roleSubtitle": "Movement, RPG systems & editor tools",
      "period": "Unfinished prototypes",
      "stack": [
        "C#",
        "Unity",
        "Gameplay systems",
        "Editor tools"
      ],
      "summary": "A collection of unfinished Unity projects exploring specific gameplay ideas, from Source-style movement to RPG leveling and spells.",
      "accomplishments": [
        "Explored Counter-Strike-style bunny hopping and surfing movement.",
        "Worked on RPG leveling and spell systems, plus MOBA, FPS, and tile-based prototypes.",
        "Built editor tools alongside the gameplay experiments."
      ]
    },
    {
      "id": "ai-assisted-fps",
      "title": "AI-Assisted Tactical FPS",
      "roleSubtitle": "Prompting, iteration & project direction",
      "period": "In development",
      "stack": [
        "AI-assisted development",
        "Game prototyping",
        "GitHub"
      ],
      "summary": "An AI-assisted project exploring a Counter-Strike-style shooter with ideas for modern features and different utility types.",
      "accomplishments": [
        "Directed development through prompts and repeated iteration with AI tools.",
        "Exploring 128-tick servers and unique utility types as project goals.",
        "Part of my broader AI-assisted workflow across code, mods, art, and icons."
      ]
    }
  ]
};

export const BLOG_POSTS: BlogPost[] = [];


export const ATS_KEYWORDS: Record<string, string[]> = {
  "gamedev": [
    "C#",
    "Unity",
    "Minecraft",
    "KubeJS",
    "JavaScript",
    "SQL",
    "GitHub",
    "Editor tools",
    "network"
  ],
  "hardware": [
    "PC assembly",
    "Hardware diagnostics",
    "BIOS",
    "UEFI",
    "Windows",
    "Stress testing",
    "Troubleshooting"
  ],
  "equipment": [
    "Commercial mowers",
    "Zero-turn",
    "Mini excavators",
    "Mini skid steers",
    "Routine maintenance",
    "Equipment checks"
  ],
  "hybrid": [
    "C#",
    "Unity",
    "Minecraft",
    "KubeJS",
    "JavaScript",
    "SQL",
    "GitHub",
    "PC assembly",
    "Routine maintenance"
  ]
};
