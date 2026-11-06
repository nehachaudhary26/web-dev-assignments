# StudyTrack: Architecture Notes (Assignment 53)

## Folder structure
```
capstone-studytrack/
  index.html          page structure and form
  css/styles.css      responsive base styles, light and dark themes
  js/utils.js         pure helpers (dates, ids, pluralize, debounce)
  js/storage.js       namespaced localStorage helper with safe fallbacks
  js/state.js         ALL business logic: validate, add, edit, filter, sort, stats
  js/render.js        builds DOM nodes (createElement + textContent only)
  js/app.js           wires events, owns the current state, runs the lifecycle
  tests/              Node tests for utils, state and storage
  docs/               proposal, wireframes, this file, test matrix, bug log, release notes
```

## Layers and rules
| Layer | File | May use DOM? | May use storage? | Rule |
|-------|------|--------------|------------------|------|
| Utilities | utils.js | No | No | Pure functions only |
| Persistence | storage.js | No | Yes | Never throws; returns a fallback |
| Logic / state | state.js | No | No | Never mutates inputs; returns `{ ok, tasks, errors }` |
| View | render.js | Yes | No | Builds nodes from data; no business rules |
| Controller | app.js | Yes | Via storage.js | Connects events to state functions, then saves and renders |

Because state.js has no DOM, every rule can be unit-tested in Node (`npm test`).

## Data model
```js
Task = {
  id: "mfx3k2-a8d1qz",      // unique string
  title: "Revise loops",     // 1-80 chars
  subject: "Python",         // 1-30 chars, default "General"
  dueDate: "2026-10-30",     // "" or a real YYYY-MM-DD date
  priority: "high",          // "low" | "medium" | "high"
  done: false,
  createdAt: "2026-10-27T09:15:00.000Z"
}
```
Storage keys (namespace `studytrack`): `studytrack:tasks` (array of Task), `studytrack:theme` ("light" | "dark").

## Data flow (load - update - save - render)
```
LOAD  : store.get("tasks") -> normalizeTasks() drops anything invalid
EVENT : user submits form / ticks / deletes / filters
UPDATE: state function returns a NEW array (or errors)
SAVE  : store.set("tasks", tasks)
RENDER: render() rebuilds stats, filters and list from state
```

## Starter utility functions (utils.js)
`isValidISODate`, `todayISO`, `formatDate`, `daysBetween`, `pluralize`, `clamp`, `debounce`, `makeId`.

## Key decisions
| Decision | Why |
|----------|-----|
| Plain script tags with a small UMD wrapper | Works by double-clicking `index.html` and in Node tests, with no build step |
| Immutable updates | Easier to reason about and test; no hidden changes |
| Dates stored as `YYYY-MM-DD` strings | Strings compare correctly (`"2026-10-20" < "2026-10-27"`), and there are no time zone surprises |
| "Due today" is not overdue | A task is overdue only after its due date has passed |
| `textContent` only | User text can never run as HTML (prevents XSS) |
| Validate on load | localStorage can be edited or corrupted |
| Event delegation | One listener on the list instead of one per button |
| Today is calculated at render time | The overdue state stays right if the page stays open past midnight and the user interacts |

## Accessibility
Labels on all inputs, `aria-describedby` for errors, `aria-invalid`, a `role="status"` live region, visible focus outlines, a skip link, `prefers-reduced-motion`, and colours with enough contrast in both themes.

## Known limitations
Single device only, no import, no undo, and data is lost if the user clears site data (hence the Export button).
