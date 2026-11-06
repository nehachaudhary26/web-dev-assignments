# StudyTrack v0.9.0-rc1: Release Candidate (Assignment 55)

## Feature checklist (all core features from the proposal)
- [x] F1 Add a task with validation (title, subject, due date, priority)
- [x] F2 Dynamic task list (no page reloads)
- [x] F3 Mark done / not done
- [x] F4 Edit and delete (with confirmation)
- [x] F5 Persistence in localStorage with validation on load
- [x] F6 Filter by subject and status, search by text
- [x] F7 Statistics: total, active, done, overdue, percent, due-today count
- [x] F8 Responsive, keyboard and screen-reader friendly
- [x] Extras: dark theme, export JSON, subject suggestions

## Quality status
| Check | Status |
|-------|--------|
| Automated tests (`npm test`) | 53 tests pass (31 state, 9 utils, 13 storage) |
| Manual test matrix (Part B of `TEST_MATRIX.md`) | **Yours to run before tagging** |
| No `innerHTML` anywhere in the app | Verified with a search |

## Known limitations
No import, no undo, no sync between devices, no reminders. Clearing site data deletes the tasks (use Export for a backup).

## How to run
Open `index.html` in a browser (or serve the folder, for example with GitHub Pages). To test: `npm test` (needs Node 18+).

## Tag this release
```
git add .
git commit -m "StudyTrack release candidate v0.9.0-rc1"
git tag v0.9.0-rc1
git push && git push --tags
```
