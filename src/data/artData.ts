import { ArtworkItem } from '../types';
import dungeonImg from '../assets/images/pixel_dungeon_crawler_1792257910786.jpg';
import mechImg from '../assets/images/pixel_cyber_mech_1792257911230.jpg';
import landscapeImg from '../assets/images/pixel_retro_landscape_1792257934286.jpg';
import quantumImg from '../assets/images/modpack_quantum_craft_1792257911998.jpg';
import arcaneImg from '../assets/images/modpack_arcane_horizons_1792257911896.jpg';
import voidImg from '../assets/images/modpack_void_genesis_1792257945149.jpg';

export const INITIAL_ARTWORKS: ArtworkItem[] = [
  {
    id: 'art-dungeon-crawler',
    title: 'Catacombs of the Iron Sentinel',
    category: 'pixel-art',
    imageUrl: dungeonImg,
    description:
      'Atmospheric 16-bit retro dungeon crawler scene featuring hand-dithered torchlight illumination, modular stone brick masonry, and a valiant pixel knight. Built to simulate authentic SNES/Genesis hardware constraints with a unified 32-color ramp.',
    tools: ['Aseprite', 'Pyxel Edit', 'Photoshop'],
    resolution: '320 × 240 Native (Scaled 4x)',
    year: '2024',
    clientOrProject: 'Personal Indie RPG Prototype',
    featured: true,
    colorPalette: ['#1a1016', '#3b2027', '#8a4b38', '#e5823a', '#ffd76a', '#3b4252'],
  },
  {
    id: 'art-cyber-mech',
    title: 'Dieselpunk Vanguard Mech',
    category: 'pixel-art',
    imageUrl: mechImg,
    description:
      'Isolated side-view game sprite asset of a heavy combat mech. Designed with articulated pneumatic pistons, heavy exhaust heat manifolds, and a high-contrast visor glow tailored for 2D tactical strategy combat.',
    tools: ['Aseprite', 'Custom Palette Ramp', 'SpriteSheet Packer'],
    resolution: '128 × 128 Native',
    year: '2024',
    clientOrProject: 'Turn-Based Tactics Project',
    featured: true,
    colorPalette: ['#12161f', '#2a3b4c', '#537d99', '#ff5722', '#ffcc00', '#c0cbdc'],
  },
  {
    id: 'art-twilight-landscape',
    title: 'Twilight Floating Sanctuary',
    category: 'pixel-art',
    imageUrl: landscapeImg,
    description:
      'Expansive 16-bit twilight fantasy environment depicting an ethereal floating island with luminous cherry blossoms, cascading crystal waterfalls, and lantern-lit stone steps floating above sea-of-clouds twilight.',
    tools: ['Aseprite', 'Photoshop', 'Retro CRT Shader Tester'],
    resolution: '480 × 360 Viewport',
    year: '2023',
    clientOrProject: 'Worldbuilding Concept',
    featured: true,
    colorPalette: ['#1b0d2a', '#4c1c5c', '#893478', '#ff84a1', '#7be5df', '#235955'],
  },
  {
    id: 'art-modpack-void-genesis',
    title: 'Void Genesis — Minecraft Modpack Emblem',
    category: 'modpack-logo',
    imageUrl: voidImg,
    description:
      'High-impact server branding emblem created for an endgame cosmic-tech Minecraft modpack. Blends crystalline obsidian geometry, an swirling event horizon vortex, and high-readability esports gaming typography.',
    promptNotes:
      'Iterated through 26 prompt variations focusing on isometric obsidian block framing, nebula spiral depth, and high-contrast bevel illumination. Finalized with layered Photoshop typography masking and alpha channel vectorization.',
    tools: ['Prompt Chaining', 'Midjourney v6', 'Photoshop', 'Vector Masking'],
    resolution: '2048 × 2048 Master',
    year: '2024',
    clientOrProject: 'Minecraft Modpack Community (1.20.1)',
    featured: true,
    iterationCycles: 26,
    colorPalette: ['#0d0814', '#261239', '#5b2b82', '#9d5be3', '#e4b5ff', '#ffffff'],
  },
  {
    id: 'art-modpack-quantum-craft',
    title: 'QuantumCraft — Industrial Tech Modpack',
    category: 'modpack-logo',
    imageUrl: quantumImg,
    description:
      'Branding mark for a complex industrial automation modpack (GregTech/Applied Energistics inspired). Emphasizes neon green/cyan circuitry, block-based tech glyphs, and bold metallic lettering.',
    promptNotes:
      'Engineered with multi-weight negative prompting against blurry gradients to achieve clean, crisp edges reminiscent of vector tech branding. Finished with manual luminance balancing and drop-shadow calibration.',
    tools: ['Iterative AI Generation', 'Photoshop CS6', 'Illustrator'],
    resolution: '1920 × 1920 Master',
    year: '2024',
    clientOrProject: 'CurseForge Tech Pack',
    featured: false,
    iterationCycles: 18,
    colorPalette: ['#0a1816', '#103935', '#00ffcc', '#38bdf8', '#0f172a', '#e2e8f0'],
  },
  {
    id: 'art-modpack-arcane-horizons',
    title: 'Arcane Horizons — Fantasy RPG Modpack',
    category: 'modpack-logo',
    imageUrl: arcaneImg,
    description:
      'Ornate title insignia for a magic and exploration modpack. Features floating amethysts, celestial runic circles, gold filigree edging, and high-fantasy illuminated lettering.',
    promptNotes:
      'Combined weighted seed variations with prompt weighting for gold filigree and glowing mystical glyphs. Layered 3 distinct outputs together in Photoshop to combine the cleanest rune circle with the best crystal refraction.',
    tools: ['Multi-Pass Prompt Synthesis', 'Photoshop Composite', 'Affinity Photo'],
    resolution: '2048 × 2048 Master',
    year: '2023',
    clientOrProject: 'RPG Adventure Modpack',
    featured: false,
    iterationCycles: 22,
    colorPalette: ['#1a0c24', '#3d1656', '#873999', '#e09f3e', '#fff3b0', '#540d6e'],
  },
];
