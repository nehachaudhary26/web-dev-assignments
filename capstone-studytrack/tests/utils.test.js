// run: node tests/utils.test.js
const assert = require("assert");
const U = require("../js/utils");
let n = 0; const t = (id, name, fn) => { fn(); n++; console.log(`PASS ${id} ${name}`); };
t("U01", "formatDate formats ISO date", () => assert.strictEqual(U.formatDate("2026-10-27"), "27 Oct 2026"));
t("U02", "formatDate returns empty string for invalid input", () => { assert.strictEqual(U.formatDate("nope"), ""); assert.strictEqual(U.formatDate(""), ""); });
t("U03", "isValidISODate edge cases", () => { assert.ok(U.isValidISODate("2028-02-29")); assert.ok(!U.isValidISODate("2027-02-29")); assert.ok(!U.isValidISODate("2026-00-10")); assert.ok(!U.isValidISODate(20261027)); });
t("U04", "todayISO uses the local calendar date", () => assert.strictEqual(U.todayISO(new Date(2026, 0, 5, 23, 59)), "2026-01-05"));
t("U05", "daysBetween counts whole days", () => { assert.strictEqual(U.daysBetween("2026-10-27", "2026-11-03"), 7); assert.strictEqual(U.daysBetween("2026-11-03", "2026-10-27"), -7); assert.ok(Number.isNaN(U.daysBetween("x", "2026-10-27"))); });
t("U06", "pluralize", () => { assert.strictEqual(U.pluralize(1, "task"), "1 task"); assert.strictEqual(U.pluralize(0, "task"), "0 tasks"); });
t("U07", "clamp", () => { assert.strictEqual(U.clamp(5, 0, 3), 3); assert.strictEqual(U.clamp(-1, 0, 3), 0); });
t("U08", "makeId returns unique ids", () => assert.notStrictEqual(U.makeId(), U.makeId()));
const calls = []; const d = U.debounce((x) => calls.push(x), 20); d(1); d(2); d(3);
setTimeout(() => { assert.deepStrictEqual(calls, [3]); console.log("PASS U10 debounce keeps only the last call"); console.log(`\nAll ${n + 1} utils tests passed`); }, 60);
