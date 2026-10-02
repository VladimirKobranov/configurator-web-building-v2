# Configurator Web Building V2

A high-performance, procedural 3D building configurator built with **React**, **Three.js**, and **Tailwind CSS 4**. This tool allows users to generate and customize complex building structures in real-time using a web-based interface.

![Project Preview](_resources/screenshot.png)

## 🚀 Key Features

- **Procedural Generation**: Dynamically generate buildings with adjustable dimensions (Width, Height, Depth) using a stable `randomSeed` system.
- **Structural Logic**: Intelligent placement rules for stairs, firewalls, and architectural components.
- **Dynamic Accessories**: Toggle and adjust the density of air conditioners, roof accessories, and first-floor details.
- **Multithreaded Performance**: Complex generation logic is offloaded to a **Web Worker** to ensure a smooth, jank-free UI.
- **Interactive 3D Scene**: Full OrbitControls support with auto-rotation, grid helpers, and infinite floor planes.
- **Real-time Configurator**: Intuitive UI panels for adjusting building properties, camera settings, and scene visuals.
- **Information Panel**: Inspect individual building components for technical details (geometry stats, etc.).

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ⌨️ Controls & Hotkeys

| Key   | Action              |
| ----- | ------------------- |
| **G** | Toggle Grid         |
| **H** | Toggle Helpers      |
| **U** | Toggle Auto-Updates |
| **I** | Toggle Info Panel   |
| **R** | Randomize Building  |

**Mouse Interactions:**

- **Left Click**: Select building component.
- **Left Drag**: Rotate camera.
- **Right Drag**: Pan camera.
- **Scroll**: Zoom in/out.

## 🛠 Setup & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

---

### Deployment & Push Rules

#### Push to GitHub

```bash
git push
```
