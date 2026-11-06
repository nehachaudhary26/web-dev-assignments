# Reflection (DRAFT - rewrite this in your own words before submitting)

**What I built:** a validation library (A22), settings/total utilities (A23), and a 26-case test file for both.

**What I learned**
- Guard clauses: checking bad input first and returning early keeps functions flat and easy to read.
- Scope and hoisting: `let`/`const` avoid the surprises `var` causes; closures keep private state.
- Never mutate inputs: `mergeSettings` clones first so the defaults object stays safe.

**What was hard:** (write your own, e.g. deep merge for nested objects, rounding money values)

**What I would improve next:** (e.g. more validators, run tests in the browser, add JSDoc comments)
