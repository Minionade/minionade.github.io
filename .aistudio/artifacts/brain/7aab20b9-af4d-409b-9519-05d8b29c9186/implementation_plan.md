# Trevor Barrett - Professional Resume Suite & Personal Engineering Website

An executive-grade interactive resume suite and personal engineering website for Trevor Barrett (`trevorbarrett137@gmail.com`). The platform features a print-perfect, ATS-optimized resume with 4 targeted role presets (Hybrid, Game/Software Developer, IT/Hardware Technician, Equipment Operations), paired with an integrated Technical Portfolio and Engineering Dev Blog highlighting his 5+ years of custom C# game/server development, 10 years of Game Design Documentation (GDD), custom PC hardware builds, and commercial equipment operations.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions have been incorporated:
> - **Primary Contact Email**: Updated to `trevorbarrett137@gmail.com`.
> - **Dual Scope (Resume + Blog Architecture)**: Built as a complete personal developer portal featuring both the **Interactive Executive Resume** (with 1-click PDF/print export) and an **Engineering Blog & Technical Journal** highlighting deep dives into custom C# engine architecture, GDD writing, hardware builds, and mechanical equipment insights.
> - **Multi-Persona Resume Engine**: Instant switcher between:
>   1. **Hybrid / Technical Operations & Field Specialist** (Primary: software + hardware + mechanical equipment).
>   2. **Game & Systems Programmer** (C# engine/server, Unity, Godot, AI mechanics, GDDs).
>   3. **IT Support & Computer Hardware Technician** (Custom PC builds, Windows administration, diagnostics).
>   4. **Equipment Operations & Grounds Specialist** (Commercial mowers, mini excavator, skid steer, preventive maintenance).

---

### 1. Overview & Core Concept

- **What It Does**: A comprehensive personal website and resume suite. It delivers a print-ready 8.5x11 executive resume with live persona toggling, custom content editor, and ATS keyword auditor, alongside an interactive **Dev Blog** featuring engineering articles and project case studies that substantiate Trevor's hands-on and software capabilities.
- **Target Audience**: Technical hiring managers, game studios, IT leads, municipal/commercial operations supervisors, and peers in the programming and hardware communities.
- **Key Value**: Bridges the gap between Trevor's formal equipment/grounds background and his extensive self-directed software engineering and hardware expertise, establishing a cohesive, professional online presence.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Resume View (Primary Anchor)**: Renders an executive, ATS-friendly US Letter resume with live persona toggling (`Hybrid`, `Game Dev`, `IT Support`, `Equipment`). Users can toggle sections, adjust density, edit fields live, and click "Download PDF / Print" to trigger vector-clean browser printing.
  2. **Technical Projects Showcase**: Expandable deep dives into his C# Game & Server Engine, Unity & Godot games with AI, Custom PC Builds, and Municipal Machinery Operations.
  3. **Engineering Dev Blog**: A clean, readable article section with first-draft engineering articles:
     - *Article 1*: "Designing a Custom C# Game & Server Engine: Sockets, Game Loops, and State Synchronization"
     - *Article 2*: "10 Years of Game Design Documents: Turning Passion Ideas into Rigorous Systems Specs"
     - *Article 3*: "Physical Wrenches to Compilers: How Heavy Equipment Operations Inform Disciplined Code"
     - *Article 4*: "Precision PC Hardware Assembly: Component Matching, BIOS Tuning, and Thermal Benchmarking"
  4. **Live Resume Editor & Exporter**: Slide-over panel to tweak contact details, reorder bullet points, check ATS score/keywords, and copy clean plain-text/markdown versions.

- **Visual Identity & Theme**:
  - *Aesthetic*: Modern Engineering Minimalist & Editorial Tech. High-contrast typography, disciplined neutral canvas, zero pill capsules, subtle hairline borders, and generous whitespace.
  - *Color Palette*:
    - Canvas: Clean Paper White (`#FFFFFF`) with off-white editorial background (`#F8FAFC`).
    - Typography: Deep Ink Charcoal (`#0F172A`) for bold headers, readable slate (`#334155`) for body prose, and muted slate (`#64748B`) for metadata.
    - Accent: Precision Cobalt Blue (`#2563EB`) and Forest Slate (`#0F766E`) for interactive focus.
  - *Typography*:
    - Display: `Plus Jakarta Sans` / `Outfit` (700 bold, tight tracking).
    - Body: `Plus Jakarta Sans` / `DM Sans` (400 regular, 15px, 1.6 line height).
    - Monospace & Metadata: `JetBrains Mono` for code snippets, tech tags, and dates.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Portal with Seamless Tabbed Views**
  - *Chosen Approach*: Single high-performance SPA with instant navigation between `Resume`, `Projects`, `Dev Blog`, and `Interactive Builder`.
  - *Why*: Allows immediate PDF generation for job applications today while providing the full blog platform foundation Trevor requested for future growth.
- **Decision 2: Print-Optimized `@media print` Architecture**
  - *Chosen Approach*: Direct CSS print styling calibrated specifically to 8.5x11 inches, hiding web navs and blog feeds when the print/PDF command is invoked.
  - *Why*: Ensures the downloaded PDF looks like a meticulously formatted 1-page executive resume without any website header or footer bleeding through.
- **Decision 3: Zero-Pill Metadata & Clean Typography**
  - *Chosen Approach*: Metadata and skills rendered as clean unboxed text separated by typographic dots (`·`), replacing the clustered pill badges from the previous resume.
  - *Why*: Complies with modern design standards and guarantees high ATS readability.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    Top Navigation Header                     │
│  [Trevor Barrett]     [Resume | Projects | Blog | Builder]   │
└──────────────────────────────┬───────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  Resume View  │       │ Projects Hub  │       │   Dev Blog    │
│ • Persona Bar │       │ • C# Engine   │       │ • Architecture│
│ • 8.5x11 Card │       │ • Godot/Unity │       │ • GDD Writing │
│ • Print / PDF │       │ • Custom PCs  │       │ • Hardware    │
│ • ATS Auditor │       │ • Machinery   │       │ • Mechanics   │
└───────┬───────┘       └───────────────┘       └───────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────┐
│               Interactive Editor & State Store               │
│  • Profile Data: Trevor Barrett | trevorbarrett137@gmail.com │
│  • Persona Presets & Content Synchronization                 │
│  • LocalStorage Persistence for Custom Edits                 │
│  • Plain Text & Markdown Exporter                            │
└──────────────────────────────────────────────────────────────┘
```

- **Data Models**:
  - `Profile`: Name, Email (`trevorbarrett137@gmail.com`), Phone (`+1 570 854 1682`), Location (`Bloomsburg, PA 17815`).
  - `ResumeVersion`: Persona configurations with specialized summaries, tailored project orders, and highlighted skills.
  - `BlogPost`: Full markdown/rendered articles with tags, reading times, and technical diagrams.
  - `ProjectEntry`: Title, stack, description, key technical achievements, and architectural highlights.
