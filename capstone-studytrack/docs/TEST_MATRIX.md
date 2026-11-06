# StudyTrack: Test Matrix (Assignment 56)

Run all automated tests with `npm test` (or `node tests/state.test.js`, `node tests/utils.test.js`, `node tests/storage.test.js`).

## Part A: Automated tests (verified by running them)
| ID | What is checked | Result | Fix needed |
|----|-----------------|--------|------------|
| S01 | addTask applies defaults (General, medium, not done) | Pass (automated) | None |
| S02 | title is required | Pass (automated) | None |
| S03 | title 80 chars ok, 81 rejected | Pass (automated) | None |
| S04 | subject longer than 30 rejected | Pass (automated) | None |
| S05 | invalid priority rejected | Pass (automated) | None |
| S06 | impossible date 2026-02-30 rejected | Pass (automated) | None |
| S07 | wrong date format rejected | Pass (automated) | None |
| S08 | empty due date allowed | Pass (automated) | None |
| S09 | leap day 2028-02-29 accepted | Pass (automated) | None |
| S10 | addTask does not mutate the input array | Pass (automated) | None |
| S11 | whitespace in title is collapsed | Pass (automated) | None |
| S12 | toggleTask flips done | Pass (automated) | None |
| S13 | toggleTask unknown id fails | Pass (automated) | None |
| S14 | updateTask keeps id, done and createdAt | Pass (automated) | None |
| S15 | updateTask validates input | Pass (automated) | None |
| S16 | updateTask unknown id fails | Pass (automated) | None |
| S17 | deleteTask removes only that task | Pass (automated) | None |
| S18 | clearCompleted keeps active tasks | Pass (automated) | None |
| S19 | isOverdue: past=yes, today=no, done=no, no date=no | Pass (automated) | None |
| S20 | filter by subject is case-insensitive | Pass (automated) | None |
| S21 | filter status overdue / active / done | Pass (automated) | None |
| S22 | search matches title or subject | Pass (automated) | None |
| S23 | sort: active first, earliest due first, no date last | Pass (automated) | None |
| S24 | sort tie on date: higher priority first | Pass (automated) | None |
| S25 | sortTasks does not mutate its input | Pass (automated) | None |
| S26 | getStats counts and rounds percent (1 of 3 = 33) | Pass (automated) | None |
| S27 | getStats on empty list is 0% | Pass (automated) | None |
| S28 | getStats counts tasks due today | Pass (automated) | None |
| S29 | getSubjects unique and sorted | Pass (automated) | None |
| S30 | normalizeTasks drops corrupted entries and fixes fields | Pass (automated) | None |
| S31 | normalizeTasks non-array returns [] | Pass (automated) | None |
| U01 | formatDate formats ISO date | Pass (automated) | None |
| U02 | formatDate returns empty string for invalid input | Pass (automated) | None |
| U03 | isValidISODate edge cases | Pass (automated) | None |
| U04 | todayISO uses the local calendar date | Pass (automated) | None |
| U05 | daysBetween counts whole days | Pass (automated) | None |
| U06 | pluralize | Pass (automated) | None |
| U07 | clamp | Pass (automated) | None |
| U08 | makeId returns unique ids | Pass (automated) | None |
| U10 | debounce keeps only the last call | Pass (automated) | None |
| ST | 13 storage helper tests (round-trip, corrupted JSON, quota errors, namespaces) | Pass (automated) | None |

## Part B: Manual browser tests
Open `index.html`, try each case, then write **Pass** or **Fail** in the Result column. If something fails, add a row to `BUG_LOG.md` and write the fix here.

| ID | Steps | Expected | Result | Fix needed |
|----|-------|----------|--------|------------|
| M01 | Submit the empty form | "Title is required." under Title; Title is focused and outlined red | | |
| M02 | Add "Revise loops", subject Python, due in 3 days, High | Task appears; stats show Total 1; status says "Task added." | | |
| M03 | Add a task due yesterday | Red border, "Overdue: ..." text; Overdue stat is 1 | | |
| M04 | Tick the checkbox on a task | Crossed out, moved below active tasks, progress bar rises | | |
| M05 | Click Edit, change the title, Save changes | Row updates; done state kept; form returns to "Add a task" | | |
| M06 | Click Edit, then Cancel | Form clears, nothing changed | | |
| M07 | Click Delete, press Cancel in the dialog | Task stays | | |
| M08 | Click Delete, confirm | Task removed; stats update | | |
| M09 | Type a subject in the filter; use the Status filter "Overdue" | Only matching tasks are shown | | |
| M10 | Type part of a title in Search | List narrows after a short delay | | |
| M11 | Reload the page | Tasks, theme and stats are restored | | |
| M12 | In DevTools set `studytrack:tasks` to `{bad`, reload | App starts empty, no crash, no console error | | |
| M13 | Add a task titled `<img src=x onerror=alert(1)>` | Shown as plain text; no alert | | |
| M14 | Toggle Dark mode, reload | Theme is remembered; text stays readable | | |
| M15 | Click Export JSON | A `studytrack-export.json` file downloads with all tasks | | |
| M16 | Resize to 360px wide | No sideways scrolling; buttons usable | | |
| M17 | Use only Tab, Enter, Space | Every control reachable; focus outline visible | | |
| M18 | Use a screen reader or check that error text is read | Errors announced via `aria-describedby` and the status region | | |
| M19 | Test in Chrome and Firefox | Same behaviour, no console errors | | |
