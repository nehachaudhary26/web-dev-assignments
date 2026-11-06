// Assignment 21: Scope and hoisting prediction worksheet
// For each snippet: read the code, write your PREDICTION, then compare with the ACTUAL result.
const snippets = [];
function snippet(title, code, prediction, fn, why) { snippets.push({ title, code, prediction, fn, why }); }
function fmt(v) { return Array.isArray(v) ? "[" + v.map(fmt).join(", ") + "]" : typeof v === "string" ? `'${v}'` : String(v); }

snippet("1. var is hoisted (declaration only)",
  "out.push(a); var a = 5; out.push(a);", "[undefined, 5]",
  function () { const out = []; out.push(a); var a = 5; out.push(a); return out; },
  "'var a' is moved to the top of the function and set to undefined. The assignment = 5 stays where it is.");

snippet("2. let is in the Temporal Dead Zone",
  "try { return x } catch(e) { return e.name } let x = 1;", "'ReferenceError'",
  function () { try { return x; } catch (e) { return e.name; } let x = 1; },
  "let/const are hoisted but cannot be used before their declaration line runs (TDZ).");

snippet("3. Function declarations are fully hoisted",
  "return add(2, 3); function add(a, b) { return a + b; }", "5",
  function () { return add(2, 3); function add(a, b) { return a + b; } },
  "The whole function (name and body) is hoisted, so it can be called before it appears.");

snippet("4. Function expressions are NOT hoisted like declarations",
  "try { return sub(5, 2) } catch(e) { return e.name } var sub = function(){...}", "'TypeError'",
  function () { try { return sub(5, 2); } catch (e) { return e.name; } var sub = function (a, b) { return a - b; }; },
  "'var sub' is hoisted as undefined, so calling undefined(5, 2) is a TypeError (not a function).");

snippet("5. var in a for loop shares one variable",
  "for (var i = 0; i < 3; i++) fns.push(() => i); fns.map(f => f())", "[3, 3, 3]",
  function () { const fns = []; for (var i = 0; i < 3; i++) fns.push(() => i); return fns.map((f) => f()); },
  "var is function-scoped: all closures share the same i, which is 3 when the loop ends.");

snippet("6. let in a for loop creates a new variable per iteration",
  "for (let i = 0; i < 3; i++) fns.push(() => i); fns.map(f => f())", "[0, 1, 2]",
  function () { const fns = []; for (let i = 0; i < 3; i++) fns.push(() => i); return fns.map((f) => f()); },
  "let is block-scoped: each iteration gets its own i, captured by its own closure.");

snippet("7. var ignores blocks, let respects them",
  "{ var v = 1; let l = 2; } return [typeof v, typeof l];", "['number', 'undefined']",
  function () { { var v = 1; let l = 2; } return [typeof v, typeof l]; },
  "var leaks out of the { } block into the function; let stays inside the block.");

snippet("8. Shadowing",
  "let n = 1; { let n = 2; } return n;", "1",
  function () { let n = 1; { let n = 2; } return n; },
  "The inner n is a different variable that hides the outer one only inside the block.");

snippet("9. Closures keep their own private state",
  "a = makeCounter(); b = makeCounter(); a(); a(); return [a(), b()]", "[3, 1]",
  function () { function makeCounter() { let c = 0; return () => ++c; } const a = makeCounter(), b = makeCounter(); a(); a(); return [a(), b()]; },
  "Each call to makeCounter creates a new scope with its own c. The returned function remembers it.");

snippet("10. Assigning an undeclared variable creates a global (sloppy mode)",
  "function f() { leaked = 10 } f(); return typeof leaked", "'number'",
  function () { function f() { leaked = 10; } f(); const t = typeof leaked; delete globalThis.leaked; return t; },
  "Without let/const/var the name becomes a global property. 'use strict' would throw a ReferenceError instead.");

console.log("=== Scope & Hoisting Worksheet ===");
let match = 0;
for (const s of snippets) {
  const actual = fmt(s.fn());
  const ok = actual === s.prediction;
  if (ok) match++;
  console.log(`\n${s.title}\n  Code:       ${s.code}\n  Prediction: ${s.prediction}\n  Actual:     ${actual}  ${ok ? "(matches)" : "(CHECK)"}\n  Why:        ${s.why}`);
}
console.log(`\n${match}/${snippets.length} predictions matched the actual output.`);
