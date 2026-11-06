# Assignment 49: Testing Checklist (Persistent To-Do)

Automated logic tests: `node tests.js` (18 tests, all pass). Tick the manual checks after trying them in the browser.

## Core features
- [ ] Add a task with the button and with the Enter key
- [ ] Empty or spaces-only input shows an error and adds nothing
- [ ] A 101-character task is rejected
- [ ] A duplicate active task is rejected
- [ ] Tick the checkbox: task is crossed out and the "items left" count drops
- [ ] Edit a task, then Save (button and Enter); Cancel (button and Escape) keeps the old text
- [ ] Delete removes only that task
- [ ] Filters All / Active / Completed show the right tasks
- [ ] "Clear completed" removes only completed tasks and hides itself when none are left

## Persistence
- [ ] Reload the page: tasks, completed state and the selected filter are still there
- [ ] Close the tab, reopen the page: data is still there
- [ ] Open a second tab: it shows the same saved list (localStorage is shared)
- [ ] In DevTools set `todo-app:todos` to `{bad` and reload: app starts empty, no crash
- [ ] Delete the `todo-app:todos` key and reload: empty list, no errors
- [ ] Private/incognito window: app still works (it may not keep data after closing)

## Security and accessibility
- [ ] Add `<img src=x onerror=alert(1)>` as a task: shown as text, no alert
- [ ] Every control can be reached and used with the keyboard only
- [ ] Focus outline is visible; checkbox and button labels make sense when read aloud
- [ ] Layout works at 360px width

## Results log
| Date | Browser | Passed | Notes |
|------|---------|--------|-------|
|      |         |        |       |
