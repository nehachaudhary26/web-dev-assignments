# StudyTrack

A simple study planner built with plain HTML, CSS and JavaScript. Add tasks with a subject, due date and priority, tick them off, filter them, and see your progress. Data stays in your browser (localStorage).

**Live demo:** _add your GitHub Pages link here_

## Run it
Open `index.html` in a browser. No install or build step.

## Test it
```
npm test
```
(Requires Node 18 or newer. 53 automated tests.)

## Features
Add / edit / delete tasks, validation, mark done, filter by subject and status, text search, progress and overdue stats, saved between visits, dark theme, export to JSON, responsive and accessible.

## Project docs
| Document | Purpose |
|----------|---------|
| [docs/PROPOSAL.md](docs/PROPOSAL.md) | Idea, features, user requirements |
| [docs/WIREFRAMES.md](docs/WIREFRAMES.md) | Wireframes and user flow |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Structure, data model, decisions |
| [docs/TEST_MATRIX.md](docs/TEST_MATRIX.md) | Automated and manual test cases |
| [docs/BUG_LOG.md](docs/BUG_LOG.md) | Issues, causes, fixes, verification |
| [docs/RELEASE_NOTES.md](docs/RELEASE_NOTES.md) | Release candidate notes |

## Progress log
| Day | Assignments | What was done | Status |
|-----|-------------|---------------|--------|
| 13 | 50 | Project idea, core features and user requirements (`docs/PROPOSAL.md`) | Done |
| 13 | 51 | Wireframes and user flow (`docs/WIREFRAMES.md`) | Done |
| 13 | 52 | Scaffold with responsive base styles (`index.html`, `css/styles.css`) | Done |
| 13 | 53 | Architecture notes and starter utilities (`docs/ARCHITECTURE.md`, `js/utils.js`) | Done |
| 13 | 54 | Core feature working: add, list, tick and save tasks | Done |
| 14 | 55 | Release candidate v0.9.0-rc1: edit, delete, filters, search, stats, theme, export | Done |
| 14 | 56 | Test matrix (automated part verified; manual part to be run) | In progress |
| 14 | 57 | Bug log | In progress |
| 15 | 61 | Final repository submission | Pending |

## Tech notes
- All logic is in pure functions (`js/state.js`) that are unit tested.
- User text is displayed with `textContent`, never `innerHTML`.
- The app follows load, update, save, render on every change.
