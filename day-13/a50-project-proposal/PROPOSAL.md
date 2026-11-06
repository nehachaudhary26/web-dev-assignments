# StudyTrack: Project Proposal (Assignment 50)

> **Approval status:** [ ] Approved   Approved by: ____________   Date: ____________
> The assignment asks for an *approved* idea. Show this document to your instructor and tick the box once they approve it (or swap in your own idea and tell me, and I will adapt the project).

## 1. The idea
**StudyTrack** is a small study planner for students. You add study tasks (for example "Revise Python loops") with a subject, due date and priority, tick them off, and see how much of your plan is done. Everything is saved in your own browser.

## 2. Problem
Students juggle several subjects and deadlines. Notes apps do not show what is overdue or how much is finished, and big planner apps need accounts and are too heavy for simple tasks.

## 3. Target users
- College and school students who plan their own revision
- People using a phone or laptop with no account or install

## 4. Core features (must have)
| # | Feature | Course skill it practises |
|---|---------|---------------------------|
| F1 | Add a task (title, subject, due date, priority) with validation | Forms, validation, guard clauses |
| F2 | Task list that updates without reloading | DOM creation, events |
| F3 | Mark done / not done | Arrays, state |
| F4 | Edit and delete tasks | CRUD |
| F5 | Save and restore tasks (localStorage) | Web Storage, load-update-save-render |
| F6 | Filter by subject and status, search by text | Array methods |
| F7 | Progress statistics and overdue count | reduce/filter |
| F8 | Responsive layout, keyboard and screen-reader friendly | HTML, CSS, accessibility |

## 5. Nice to have
Dark theme (done), export tasks as JSON (done), subject auto-suggestions (done), import JSON, drag to reorder, reminders.

## 6. Out of scope
User accounts, a server or database, syncing between devices, notifications, AI features.

## 7. User requirements (user stories with acceptance criteria)
| ID | As a student I want to... | Acceptance criteria |
|----|---------------------------|---------------------|
| U1 | add a task quickly | A task needs a title of 1-80 characters. Errors appear next to the field. Subject defaults to "General" and priority to "Medium". |
| U2 | see tasks sorted by what is urgent | Active tasks come first, earliest due date first, tasks without a date last. |
| U3 | tick a task as done | Done tasks look different (crossed out) and are counted in progress. |
| U4 | fix a mistake | Edit loads the task into the form; saving keeps its done state. Delete asks for confirmation. |
| U5 | keep my tasks after closing the page | Tasks, theme and filters survive a reload. Corrupted storage does not crash the app. |
| U6 | find tasks | Filter by subject and status (active, done, overdue) and search by text. |
| U7 | see my progress | Total, active, done, overdue and a percent bar update after every change. |
| U8 | use it on my phone | Works at 360px wide with no sideways scrolling. Buttons are easy to tap. |
| U9 | use only a keyboard | Every control is reachable, focus is visible, errors are announced. |

## 8. Technical constraints
Plain HTML, CSS and JavaScript only. No frameworks or backend. Data lives in localStorage. User text is shown with `textContent` (never `innerHTML`).

## 9. Success criteria
All core features work; the 31 + 9 + 13 automated tests pass; the manual test matrix is completed; the page has no console errors in Chrome and Firefox.
