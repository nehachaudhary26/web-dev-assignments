// run: node tests.js
const assert = require("assert");
const Q = require("./quiz");
let n = 0; const t = (name, fn) => { fn(); n++; console.log("PASS", name); };
const len = Q.QUESTIONS.length;
t("built-in questions are valid", () => assert.ok(Q.validateQuestions(Q.QUESTIONS)));
t("validateQuestions rejects bad data", () => { assert.ok(!Q.validateQuestions([])); assert.ok(!Q.validateQuestions([{ q: "x", options: ["a", "a"], answer: 0 }])); assert.ok(!Q.validateQuestions([{ q: "x", options: ["a", "b"], answer: 2 }])); });
t("all correct = 100%", () => assert.strictEqual(Q.calculateScore(Q.QUESTIONS, Q.QUESTIONS.map((q) => q.answer)).percent, 100));
t("no answers = 0%", () => assert.deepStrictEqual(Q.calculateScore(Q.QUESTIONS, Array(len).fill(null)), { correct: 0, total: len, percent: 0 }));
t("half correct = 50%", () => { const a = Q.QUESTIONS.map((q, i) => (i < len / 2 ? q.answer : null)); assert.strictEqual(Q.calculateScore(Q.QUESTIONS, a).percent, 50); });
t("wrong answers do not count", () => assert.strictEqual(Q.calculateScore(Q.QUESTIONS, Q.QUESTIONS.map((q) => (q.answer + 1) % q.options.length)).correct, 0));
t("empty quiz does not divide by zero", () => assert.strictEqual(Q.calculateScore([], []).percent, 0));
t("feedback thresholds", () => { assert.match(Q.getFeedback(100), /Excellent/); assert.match(Q.getFeedback(70), /Good/); assert.match(Q.getFeedback(50), /Not bad/); assert.match(Q.getFeedback(49), /Keep going/); });
console.log(`\nAll ${n} tests passed`);
