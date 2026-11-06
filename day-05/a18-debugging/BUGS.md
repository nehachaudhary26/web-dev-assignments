# Bug Report

| # | Function | Bug | Wrong output | Fix |
|---|----------|-----|--------------|-----|
| 1 | `sumArray` | Loop uses `<=`, reads `nums[length]` (undefined) | `NaN` | Use `i < nums.length` |
| 2 | `isAdult` | `=` assigns instead of comparing | `true` for age 10 | Use `age >= 18` |
| 3 | `findMax` | `max` starts at 0 | `0` for all-negative array | Start with `nums[0]` |
| 4 | `greet` | `Name` instead of `name` (JS is case-sensitive) | `ReferenceError` | Use `name` |
| 5 | `addStrings` | `+` joins strings | `"53"` | Convert with `Number()` |

Run `node buggy.js` and `node fixed.js` to compare. Debug tools used: `console.log`, browser DevTools, `try/catch`.
