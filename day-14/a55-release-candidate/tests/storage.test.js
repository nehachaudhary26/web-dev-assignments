// run: node tests.js
const assert = require("assert");
const { createStorage, memoryBackend } = require("../js/storage");
let n = 0; const t = (name, fn) => { fn(); n++; console.log("PASS", name); };

t("set then get round-trips objects", () => { const s = createStorage("a", memoryBackend()); s.set("user", { name: "Aish", skills: ["JS"] }); assert.deepStrictEqual(s.get("user"), { name: "Aish", skills: ["JS"] }); });
t("get returns fallback when key missing", () => assert.strictEqual(createStorage("a", memoryBackend()).get("x", 42), 42));
t("get returns null by default", () => assert.strictEqual(createStorage("a", memoryBackend()).get("x"), null));
t("stores falsy values correctly", () => { const s = createStorage("a", memoryBackend()); s.set("zero", 0); s.set("no", false); assert.strictEqual(s.get("zero", 9), 0); assert.strictEqual(s.get("no", true), false); });
t("set(undefined) is rejected", () => assert.strictEqual(createStorage("a", memoryBackend()).set("x", undefined), false));
t("corrupted JSON falls back instead of throwing", () => { const b = memoryBackend(); b.setItem("a:bad", "{not json"); assert.strictEqual(createStorage("a", b).get("bad", "safe"), "safe"); });
t("namespaces do not collide", () => { const b = memoryBackend(); createStorage("one", b).set("k", 1); createStorage("two", b).set("k", 2); assert.strictEqual(createStorage("one", b).get("k"), 1); });
t("has / remove", () => { const s = createStorage("a", memoryBackend()); s.set("k", 1); assert.strictEqual(s.has("k"), true); s.remove("k"); assert.strictEqual(s.has("k"), false); });
t("keys lists only own namespace", () => { const b = memoryBackend(); const s = createStorage("one", b); s.set("a", 1); s.set("b", 2); createStorage("two", b).set("c", 3); assert.deepStrictEqual(s.keys().sort(), ["a", "b"]); });
t("clear removes only own namespace", () => { const b = memoryBackend(); const s = createStorage("one", b); s.set("a", 1); createStorage("two", b).set("c", 3); s.clear(); assert.deepStrictEqual(s.keys(), []); assert.strictEqual(createStorage("two", b).get("c"), 3); });
t("quota/blocked errors are handled", () => { const bad = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("QuotaExceededError"); }, removeItem() { throw new Error("x"); }, key() { return null; }, length: 0 }; const s = createStorage("a", bad); assert.strictEqual(s.set("k", 1), false); assert.strictEqual(s.get("k", "fb"), "fb"); assert.strictEqual(s.remove("k"), false); });
t("empty namespace is rejected", () => assert.throws(() => createStorage(""), TypeError));
t("works without localStorage (Node) via memory fallback", () => { const s = createStorage("auto"); s.set("k", "v"); assert.strictEqual(s.get("k"), "v"); });
console.log(`\nAll ${n} tests passed`);
