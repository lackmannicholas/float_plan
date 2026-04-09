# System Context — Float Plan

> Machine-readable self-description for the Ticket-to-PR Agent and other downstream consumers.

---

## Service Identity

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Repo**        | `lackmannicholas/float_plan`                       |
| **Service Type**| Frontend (Single-Page Application)                 |
| **Domain**      | Boating safety — float plan creation and printing  |
| **Owning Team** | Nick Lackman (individual)                          |
| **Status**      | Active development                                 |

---

## Tech Stack

| Layer           | Technology          | Version Constraint |
|-----------------|---------------------|--------------------|
| Language        | JavaScript (ES2020+, ESM) | —             |
| UI Framework    | React               | ^19.2              |
| Styling         | Tailwind CSS         | ^4.2               |
| Build Tool      | Vite                 | ^8.0               |
| Linting         | ESLint (flat config) | ^9.39              |
| Package Manager | npm                  | —                  |

---

## Project Structure

```
/
├── index.html              # SPA entry point
├── vite.config.js          # Vite + React + Tailwind plugin config
├── eslint.config.js        # Flat ESLint config (JS/JSX)
├── package.json
├── public/                 # Static assets served as-is
└── src/
    ├── main.jsx            # React DOM root mount
    ├── App.jsx             # Top-level state, routing between form and print view
    ├── App.css             # App-level styles
    ├── index.css            # Global / Tailwind base styles
    ├── assets/             # Images and static imports
    └── components/
        ├── VesselInfo.jsx       # Vessel details form section
        ├── TripInfo.jsx         # Trip details form section
        ├── PersonsOnBoard.jsx   # Dynamic list of crew members
        ├── SafetyEquipment.jsx  # Safety equipment checklist
        ├── VehicleInfo.jsx      # Tow vehicle / trailer info
        ├── EmergencyContact.jsx # Emergency contact and overdue instructions
        ├── FormSection.jsx      # Reusable collapsible form section wrapper
        ├── FormControls.jsx     # Save / Clear / Print action buttons
        └── PrintPreview.jsx     # Printer-friendly float plan layout
```

---

## Architectural Patterns

- **Single-component state:** All form data lives in a single `plan` state object in `App.jsx`, passed down to section components via props. Sections call an `onChange` callback to update their slice.
- **LocalStorage persistence:** Draft data is saved to `localStorage` under the key `floatPlanDraft`. No server-side persistence exists.
- **Print flow:** `PrintPreview.jsx` renders a clean layout and triggers `window.print()`. CSS `no-print` classes hide UI chrome during printing.
- **No routing library:** The app toggles between form view and print view via a `showPrint` boolean state — no client-side router.
- **No backend:** This is a purely client-side application. There are no API calls, no authentication, and no server dependencies.

---

## Dependencies & Upstream/Downstream Services

| Direction   | Service | Notes |
|-------------|---------|-------|
| Upstream    | None    | No API dependencies |
| Downstream  | None    | No consumers of this app's data |

---

## Testing Framework

> **Not yet configured.** No test runner or testing libraries are currently installed.

When tests are introduced, the following conventions should be adopted:

| Concern          | Tool                        |
|------------------|-----------------------------|
| Test Runner      | Vitest                      |
| Component Tests  | React Testing Library       |
| Assertion Style  | `expect` (Vitest built-in)  |
| Test Location    | Co-located `*.test.jsx` files next to source, or a top-level `__tests__/` directory |

---

## Build & Run Commands

| Task             | Command           |
|------------------|-------------------|
| Install deps     | `npm install`     |
| Dev server       | `npm run dev`     |
| Production build | `npm run build`   |
| Preview build    | `npm run preview` |
| Lint             | `npm run lint`    |

---

## Deployment Boundaries

- **Build output:** `dist/` (static HTML/JS/CSS produced by `vite build`)
- **Deploy target:** Any static hosting (GitHub Pages, Netlify, Vercel, S3 + CloudFront, etc.)
- **No server runtime required.** The production artifact is a set of static files.

---

## Known Constraints

1. **No test coverage yet** — any new feature work should include tests using the framework specified above.
2. **No TypeScript** — the project uses plain JavaScript with JSX. Type checking is limited to ESLint rules.
3. **No state management library** — state is managed via React `useState` in `App.jsx`. If complexity grows, consider extracting to `useReducer` or a lightweight state library.
4. **Browser-only storage** — all data lives in `localStorage`. There is no cloud sync, no accounts, and no data export beyond printing/PDF.
