# Utvikleren.site Project Plan: "Futuristic AI & Automation"

This document outlines the architecture, design, and implementation roadmap for the Utvikleren.site agency website.

## 🎯 Core Objective
Build a high-performance, visually stunning website that immediately communicates "Cutting Edge Technology" through fluid animations, dark mode aesthetics, and interactive components.

---

## 🎨 Design System

*   **Theme**: Cyber/Dark Mode Default. Deep blacks (`bg-zinc-950`), glowing accents (`text-blue-500`, `text-violet-500`), and clean typography.
*   **Typography**:
    *   **Headings**: `Inter` or `Geist` (Modern Sans-Serif). Strong, bold weights.
    *   **Body**: `Inter` or `Geist`. High readability.
    *   **Code/Technical**: `JetBrains Mono` or `Fira Code` for terminal elements.
*   **Motion**: Smooth transitions (`framer-motion`), scroll-triggered reveals, and continuous background movement (`Retro Grid`, `Meteors`).

---

## 🗺️ Sitemap & Components

### 1. Home Page (`/`) - The Impact Landing
- [x] **Showcase Components Rework**
    - [x] **Receptionist Demo**: 
        - [x] Visualize workflow (Call -> Transcribe -> AI -> Calendar -> Response)
        - [x] Separate process visualization from details
        - [x] Fix calendar positioning (Pixel-perfect grid)
    - [x] **Email Demo**: 
        - [x] "Dynamic Island" status bar
        - [x] Typewriter text effect (No more skeletons)
        - [x] Auto-scroll to bottom
    - [x] **Chatbot Demo**: 
        - [x] Typing indicators and action states
        - [x] Fix duplicate message bug (Strict Mode / Cleanup)
- [ ] **Address Linting Errors** (Property 'x' does not exist on type 'JSX.IntrinsicElements')
- [x] **Social Proof**: "Brukt av 50+ bedrifter" (Removed as per user request)
*   **Hero Section**:
    *   **Background**: `RetroGrid` (3D perspective grid moving endlessly).
    *   **Headline**: `TypingAnimation` ("Building the future with AI...").
    *   **Subheadline**: Static text with fade-in animation.
    *   **CTA**: "Get Started" (Primary) and "View Demo" (Secondary).
    *   **Visual**: Abstract 3D spline or interactive globe (`Globe`).

*   **Showcase Section** (The "App Store" style demos):
    *   **AI Agents Card**: Uses `AnimatedBeam` to show data flowing between nodes.
    *   **Web Platforms Card**: Uses `BorderBeam` to highlight the frame.
    *   **Consulting Card**: Uses `Meteors` for a dynamic background.
*   **Process / How It Works**:
    *   **Visual**: A `Terminal` component simulating code execution or a simple step-by-step layout with `FadeIn` text.
*   **Footer**:
    *   **Background**: `Particles` (Subtle floating dots).
    *   **Final CTA**: `TextReveal` ("Ready to scale?").

### 2. Services Page (`/tjenester`) - Detail View
*   Detailed breakdown of:
    *   **AI Automation**: Custom agents, RAG pipelines.
    *   **Web Development**: Next.js, React, High-performance sites.
    *   **System Integration**: API connections, Database design.

### 3. Contact (`/kontakt`)
*   Simple form with `Meteors` background.
*   Direct email/phone links.

---

## 🛠️ Implementation Roadmap

### Phase 1: Foundation (✅ Done)
*   [x] Setup Next.js 15+ App Router.
*   [x] Configure TailwindCSS v4.
*   [x] Install Framer Motion & Dependencies.
*   [x] Manually implement core Magic UI components (`RetroGrid`, `TypingAnimation`, `ShimmerButton`, etc.).

### Phase 2: Building the Home Page (🚀 Current Focus)
1.  **Hero Wrapper**: Combine `RetroGrid`, `TypingAnimation`, and `ShimmerButton` into a cohesive `Hero` component.
2.  **Tech Stack**: Create a `TechStackMarquee` component with logos.
3.  **Services Grid**: Assemble the `BentoGrid` with `AnimatedBeam` and `BorderBeam` examples.

### Phase 3: Polish & Logistics
1.  **Responsive Design**: Ensure mobile layout works perfectly (stacking Bento Grid).
2.  **Performance**: Optimize animations for low-power devices.
3.  **Content**: Replace placeholder text with actual agency copy ("Vi bygger...", "Automatisering...").

---

## 💻 Tech Stack
*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion + Magic UI (Manual Implementation)
*   **Icons**: Lucide React
