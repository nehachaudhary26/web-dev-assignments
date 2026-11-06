// run: node tests.js
const assert = require("assert");
const C = require("./todo-core");
let n = 0; const t = (name, fn) => { fn(); n++; console.log("PASS", name); };
const seed = () => C.addTodo(C.addTodo([], "Buy milk").todos, "Learn DOM").todos;

t("add trims and collapses spaces", () => assert.strictEqual(C.addTodo([], "  Read   book ").todos[0].text, "Read book"));
t("add rejects empty text", () => { const r = C.addTodo([], "   "); assert.strictEqual(r.ok, false); assert.deepStrictEqual(r.todos, []); });
t("add rejects text over 100 chars", () => assert.strictEqual(C.addTodo([], "x".repeat(101)).ok, false));
t("add accepts exactly 100 chars", () => assert.strictEqual(C.addTodo([], "x".repeat(100)).ok, true));
t("add rejects duplicate active task (case-insensitive)", () => assert.strictEqual(C.addTodo(seed(), "buy MILK").ok, false));
t("add allows duplicate of a completed task", () => { const s = seed(); const done = C.toggleTodo(s, s[0].id).todos; assert.strictEqual(C.addTodo(done, "Buy milk").ok, true); });
t("add does not mutate input", () => { const s = seed(); const copy = JSON.stringify(s); C.addTodo(s, "New"); assert.strictEqual(JSON.stringify(s), copy); });
t("toggle flips done", () => { const s = seed(); assert.strictEqual(C.toggleTodo(s, s[0].id).todos[0].done, true); });
t("toggle unknown id fails", () => assert.strictEqual(C.toggleTodo(seed(), "nope").ok, false));
t("edit changes text", () => { const s = seed(); assert.strictEqual(C.editTodo(s, s[1].id, "Learn events").todos[1].text, "Learn events"); });
t("edit rejects empty text", () => { const s = seed(); assert.strictEqual(C.editTodo(s, s[1].id, " ").ok, false); });
t("delete removes task", () => { const s = seed(); assert.strictEqual(C.deleteTodo(s, s[0].id).todos.length, 1); });
t("clearCompleted keeps active", () => { const s = seed(); const r = C.clearCompleted(C.toggleTodo(s, s[0].id).todos); assert.deepStrictEqual(r.todos.map((x) => x.text), ["Learn DOM"]); });
t("filter active / completed / all", () => { const s = C.toggleTodo(seed(), seed()[0].id).todos; assert.ok(C.filterTodos(s, "all").length === 2); });
t("filter completed returns done only", () => { const s = seed(); const d = C.toggleTodo(s, s[0].id).todos; assert.deepStrictEqual(C.filterTodos(d, "completed").map((x) => x.text), ["Buy milk"]); assert.deepStrictEqual(C.filterTodos(d, "active").map((x) => x.text), ["Learn DOM"]); });
t("countActive", () => { const s = seed(); assert.strictEqual(C.countActive(C.toggleTodo(s, s[0].id).todos), 1); });
t("normalize drops corrupted entries", () => assert.deepStrictEqual(C.normalizeTodos([{ id: "a", text: " ok ", done: false }, { id: 1 }, null, { id: "b", text: "", done: true }, "x"]), [{ id: "a", text: "ok", done: false }]));
t("normalize non-array returns []", () => assert.deepStrictEqual(C.normalizeTodos({ a: 1 }), []));
console.log(`\nAll ${n} tests passed`);
