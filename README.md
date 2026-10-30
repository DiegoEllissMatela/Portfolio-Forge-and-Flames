# Forge & Flame — Luxury Dining SPA & Motion Experience

A single-page application for a luxury dining venue, designed with Vue 3, Vite, Tailwind CSS, and GSAP animation choreography.

## Overview

Forge & Flame features bespoke motion design, dynamic menu filtering, and an interactive reservation flow. The application demonstrates locked 60+ FPS animation performance, lifecycle-managed canvas graphics, and responsive layout choreography.

## Architecture and Engineering Decisions

### 1. HTML5 Canvas Particle Engine
A custom canvas ember particle simulation runs in the background. Particles calculate velocity, turbulence, and decay dynamically on requestAnimationFrame, cleanly suspended when off-screen to preserve CPU/GPU cycles.

### 2. GSAP ScrollTrigger Choreography
- Coordinates directional reveals, staggered typography entrances, and pinned transition sequences across sections.
- Lifecycle management ensures all GSAP timelines and observers kill their listeners on component unmount to prevent memory leaks.

### 3. Component Architecture
Built with the Vue 3 Composition API (`<script setup>`) and decoupled state:
- Dynamic menu filtering with category pills and search.
- Teleported modal dialogs for interactive reservation booking.
- Tailwind CSS utility tokens paired with custom CSS custom properties for ambient illumination styling.

## Live Demo

- **Hosted on Vercel:** [https://forge-and-flames.vercel.app/#/](https://forge-and-flames.vercel.app/#/)

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, PostCSS
- **Animation & Graphics:** GSAP (ScrollTrigger), HTML5 Canvas
- **Deployment:** Vercel
