# StudyTrack: Bug Log (Assignment 57)

Format: **issue, cause, fix, verification**. Add a row every time something breaks while you test (`TEST_MATRIX.md`, Part B).

## Part 1: StudyTrack bugs
| # | Issue | Cause | Fix | Verification | Status |
|---|-------|-------|-----|--------------|--------|
| | *(none found by the 53 automated tests when this release candidate was built; add manual-test findings here)* | | | | |

Examples of the kind of entry to write once you find something:

| # | Issue | Cause | Fix | Verification |
|---|-------|-------|-----|--------------|
| B-01 | (example) Task due today shows as overdue | Compared with `<=` instead of `<` | Use `dueDate < today` in `isOverdue` | Test S19 plus manual M03 |

## Part 2: Real bugs found and fixed earlier in the course (Assignment 18)
| # | Issue | Cause | Fix | Verification |
|---|-------|-------|-----|--------------|
| P-01 | `sumArray([1,2,3])` returned `NaN` | Loop used `i <= nums.length`, reading one item past the end (`undefined`) | Use `i < nums.length` | `fixed.js` prints `6` |
| P-02 | `isAdult(10)` returned `true` | `if (age = 18)` assigns instead of comparing | Use `age >= 18` | `isAdult(10)` is `false`, `isAdult(20)` is `true` |
| P-03 | `findMax([-5,-2,-9])` returned `0` | `max` started at 0, so negative arrays never beat it | Start with `nums[0]` | Returns `-2` |
| P-04 | `greet("Aish")` threw `ReferenceError: Name is not defined` | JavaScript is case-sensitive: `Name` is not `name` | Use `name` | Prints `Hello, Aish!` |
| P-05 | `addStrings("5","3")` returned `"53"` | `+` joins strings | Convert with `Number()` | Returns `8` |

## Lessons
1. Write a failing test first, then fix, then re-run it.
2. Edge cases (empty, negative, boundary values) hide most bugs.
3. Keep logic out of the DOM code so it can be tested without a browser.
