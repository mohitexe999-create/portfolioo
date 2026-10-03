# AGENTS.md — 3D Portfolio Knowledge Base & AI Agent Guide

> **Important**: This file serves as the single source of truth for AI agents (and human developers) working on this repository. Read this file first to eliminate redundant searches, duplicate analysis, and repeated repository scans.

---

## 1. Project Overview & Identity

- **Owner**: Mohit Salwan
- **Role**: India-based developer building machine learning systems, data engineering tools, and expressive web experiences.
- **Website / App**: 3D Interactive Developer Portfolio
- **Contact & Socials**:
  - **Email**: `mohitsalwan@gmail.com`
  - **GitHub**: `https://github.com/mohitexe999-create`
  - **LinkedIn**: `https://www.linkedin.com/in/mohit-salwan`
  - **Location**: India

---

## 2. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15.1.7 (App Router) |
| **Runtime / Library** | React 19.0.0, React DOM 19.0.0 |
| **Language** | TypeScript 5.7.3 (`tsconfig.json` with `@/*` path alias) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS + Custom CSS (`app/globals.css`) |
| **Smooth Scrolling** | Lenis (`lenis` 1.1.20 via `components/SmoothScrollProvider.tsx`) |
| **Icons** | Lucide React (`lucide-react` 0.475.0) + Custom SVG icons |
| **Utilities** | `clsx`, `tailwind-merge` |

---

## 3. Directory Layout

```text
3D-Portfolio/
├── app/
│   ├── globals.css           # Core styling, animations, grain, typography, design tokens
│   ├── layout.tsx            # Metadata, OpenGraph, JSON-LD schema, asset preloading
│   └── page.tsx              # Main single-page portfolio layout & section composition
├── components/
│   ├── StageHero.tsx          # Hero section (mouse parallax, masthead, headline, cutouts)
│   ├── AboutSection.tsx       # Bio, cards, philosophy, journey, and audio/visual elements
│   ├── SkillsOrbitSection.tsx # 3D orbital particle sphere and skills interactive system
│   ├── WorkSection.tsx        # Engineering principles, mindset, and work overview
│   ├── ProjectsSection.tsx    # Showcase grid rendering ProjectCards
│   ├── ProjectCard.tsx        # Individual interactive project card with modal trigger
│   ├── ProjectDetailModal.tsx # Fullscreen modal with metrics, benchmarks & external links
│   ├── ContactFooter.tsx      # Contact CTA, social links, location, and copyright
│   ├── GrainOverlay.tsx       # Ambient SVG noise / film grain effect
│   ├── ScrollProgress.tsx     # Floating viewport reading progress indicator
│   └── SmoothScrollProvider.tsx # Lenis smooth scroll wrapper (SSR disabled)
├── lib/
│   └── projectsData.ts        # Project types (Project, Metrics, Links) & PROJECTS array
├── public/
│   ├── about/                 # Media for the about section
│   ├── cutouts/               # Hero cutouts (guitar.webp, keyboard.webp)
│   ├── fonts/                 # Custom typography assets
│   ├── projects/              # Project screenshots, benchmarks, and diagrams
│   └── textures/              # Canvas textures, grain, and noise overlays
├── package.json               # Dependencies & npm scripts
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 4. Component Hierarchy & Flow

```mermaid
graph TD
    A[app/layout.tsx] --> B[app/page.tsx]
    B --> C[SmoothScrollProvider (Lenis)]
    C --> D[GrainOverlay]
    C --> E[StageHero]
    C --> F[AboutSection]
    C --> G[SkillsOrbitSection]
    C --> H[WorkSection]
    C --> I[ProjectsSection]
    I --> J[ProjectCard]
    J --> K[ProjectDetailModal]
    C --> L[ContactFooter]
    C --> M[ScrollProgress]
```

---

## 5. Key Data Schemas & Files

### Projects (`lib/projectsData.ts`)
Each project conforms to the `Project` interface:
- `id`: Unique identifier (e.g. `"01"`, `"02"`)
- `name`: Project title
- `type`: Category badge (e.g. `"Gemma fine-tune"`, `"Epidemic systems model"`)
- `description`: Summary of what the project does
- `purpose`: Detailed technical explanation, dataset sizes, model parameters, hardware used
- `image`: Path inside `/public/projects/`
- `imageAlt`: Accessible description of visual
- `href`: Primary project link
- `links`: Array of `{ label, href }`
- `metrics`: Evaluation stats with `title`, `note`, `summary`, and `series: [{ label, before, after }]`
- `tools`: Array of tech tags (e.g. `["Gemma 4 E4B", "LoRA / PEFT", "Python"]`)
- `accent`: Hex color code for UI highlights
- `ratio`: Aspect ratio for media container (e.g. `"8 / 5"`)
- `stamp`: Header stamp category (e.g. `"SPEECH / MODEL"`)

---

## 6. Common Developer & Agent Tasks Cheat-Sheet

| Task | File(s) to Modify Directly | Notes |
| :--- | :--- | :--- |
| **Add or Update Projects** | `lib/projectsData.ts` | Edit the `PROJECTS` array directly. No rebuild script required unless importing raw JSON. |
| **Update Social Links or Bio** | `components/ContactFooter.tsx`, `components/AboutSection.tsx` | Update `SOCIALS` array or bio text blocks. |
| **Edit Hero Title / Header** | `components/StageHero.tsx` | Updates masthead email, wordmark, or headline. |
| **Tweak SEO / OpenGraph Metadata** | `app/layout.tsx` | Modify `metadata` object (title, description, keywords, og images). |
| **Customize Colors or Animations** | `app/globals.css` | All core design tokens, noise overlay styles, and keyframes live here. |
| **Modify Skills or Orbit Canvas** | `components/SkillsOrbitSection.tsx` | Contains the interactive canvas/orbit configuration and categories. |

---

## 7. Development & Build Commands

- **Start Dev Server**: `npm run dev` (Serves on `http://localhost:3000`)
- **Build Production Bundle**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Codebase**: `npm run lint`

---

## 8. Agent Behavioral Rules for this Workspace

1. **Do not run blind recursive searches** across `node_modules`, `.next`, or the entire disk. Refer to the directory table and cheat-sheet above.
2. **Preserve High-Craft Aesthetics**: The portfolio uses bespoke typography, film grain, smooth scrolling, and dark mode palette (`#111312` base). Do not replace custom styling with generic Tailwind utility overrides unless requested.
3. **SSR Safety**: Always ensure client-only libraries (Lenis, window listeners, canvas interactions) are wrapped with `"use client"` or loaded dynamically with `{ ssr: false }`.
4. **Asset Paths**: All images and assets must reference `/` relative to `public/` (e.g. `/projects/...`, `/cutouts/...`).
