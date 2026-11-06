# Assignment 39: Event Map for the Interactive Profile

| # | Element | Event | Handler | What happens | Accessibility |
|---|---------|-------|---------|--------------|---------------|
| 1 | `#follow-btn` | `click` | follow toggle | Flips `aria-pressed`, toggles `.is-following`, changes label to Follow / Following | State announced via `aria-pressed` and the live status |
| 2 | `#theme-btn` | `click` | theme toggle | Toggles `.dark` on `<body>`, updates `aria-pressed` and label | Colors keep readable contrast in both themes |
| 3 | `.tabs` (tablist) | `click` | tab select (delegated) | Marks one tab `.is-active` and `aria-selected="true"`, shows its panel, hides the others via `hidden` | `role=tablist/tab/tabpanel`, `aria-controls`, roving `tabindex` |
| 4 | `.tabs` | `keydown` | tab keyboard | ArrowLeft/Right, Home, End move to another tab and focus it | Full keyboard support |
| 5 | `.filters` (chip group) | `click` | filter skills (delegated) | Sets the active chip (`.is-active`, `aria-pressed`), hides non-matching skills with `hidden` | Count announced in the live status |
| 6 | `#status` | (updated by 1-5) | `setStatus()` | Writes a message with `textContent` | `role="status"` + `aria-live="polite"` |

## State classes and attributes
| State | Class / attribute | Set by |
|-------|-------------------|--------|
| Following | `.is-following`, `aria-pressed="true"` | Event 1 |
| Dark theme | `body.dark`, `aria-pressed="true"` | Event 2 |
| Selected tab | `.is-active`, `aria-selected="true"`, `tabindex="0"` | Events 3, 4 |
| Hidden panel / skill | `hidden` attribute | Events 3, 5 |
| Selected filter | `.is-active`, `aria-pressed="true"` | Event 5 |

## Design notes
- **Event delegation:** one listener on each container (tablist, filters) instead of one per button.
- **No `innerHTML`:** all dynamic text uses `textContent`.
- **Keyboard:** every control is a real `<button>` with a visible `:focus-visible` outline.
