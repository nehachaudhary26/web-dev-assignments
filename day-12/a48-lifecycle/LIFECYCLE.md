# Assignment 48: The Load - Update - Save - Render Lifecycle

Every persistent UI in this course follows the same four steps.

```
        page opens
            |
            v
   +------------------+
   | 1. LOAD          |  read from storage, parse JSON, validate (fallback to defaults)
   +------------------+
            |
            v
   +------------------+ <-----------------------------+
   | 4. RENDER        |  draw the UI from the state   |
   +------------------+                               |
            |  user clicks / types                    |
            v                                         |
   +------------------+     +------------------+      |
   | 2. UPDATE        | --> | 3. SAVE          | -----+
   |  change state    |     |  write to storage|
   +------------------+     +------------------+
```

| Step | What happens | Where in my code (A49 to-do app) | Common mistake |
|------|--------------|----------------------------------|----------------|
| 1. Load | `store.get("todos", [])` then `normalizeTodos()` removes bad entries | top of `app.js` | Not handling `null` or corrupted JSON |
| 2. Update | A pure function returns a **new** array (`addTodo`, `toggleTodo`...) | `todo-core.js` | Mutating the old array |
| 3. Save | `store.set("todos", todos)` right after the state changes | `save()` in `commit()` | Forgetting to save, or saving before validating |
| 4. Render | `render()` rebuilds the list from state using `createElement` | `render()` | Editing the DOM by hand so it drifts from the state |

## Rules
1. **State is the single source of truth.** The DOM only displays it.
2. **Always change state, save, then render** in that order, through one function (`commit`).
3. **Load once at start-up, then keep the state in memory.** Do not read storage on every click.
4. **Validate on load.** Storage can be edited in DevTools or corrupted.
5. **Fail softly.** If saving fails (quota, private mode), keep the app working and tell the user.

## Same lifecycle in the settings panel (A46)
- Load: `sanitize(store.get("settings"))`
- Update: `settings = sanitize(readForm())` on every `input` event
- Save: `store.set("settings", settings)`
- Render: `render()` applies the theme, font size and preview

## Try it
1. Add two tasks in A49, then reload: they come back (Load).
2. In DevTools > Application > Local Storage, change `todo-app:todos` to `{bad`, then reload: the app starts empty instead of crashing (validation).
