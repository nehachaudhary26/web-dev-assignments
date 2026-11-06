// Assignment 24: practical with test cases (run: node tests.js)
const assert = require("assert");
const v = require("../a22-validation-library/validators");
const { mergeSettings, calculateTotal } = require("../a23-merge-and-totals/utils");
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log("PASS", name); } catch (e) { failed++; console.log("FAIL", name, "-", e.message); } }

// --- validators ---
test("isEmail accepts valid email", () => assert.strictEqual(v.isEmail("aish@example.com"), true));
test("isEmail rejects missing domain", () => assert.strictEqual(v.isEmail("aish@"), false));
test("isEmail rejects non-string", () => assert.strictEqual(v.isEmail(42), false));
test("isPhone accepts spaced number", () => assert.strictEqual(v.isPhone("98765 43210"), true));
test("isPhone accepts +91 prefix", () => assert.strictEqual(v.isPhone("+919876543210"), true));
test("isPhone rejects short number", () => assert.strictEqual(v.isPhone("12345"), false));
test("isPositiveNumber rejects zero", () => assert.strictEqual(v.isPositiveNumber(0), false));
test("isPositiveNumber rejects NaN/Infinity", () => { assert.strictEqual(v.isPositiveNumber(NaN), false); assert.strictEqual(v.isPositiveNumber(Infinity), false); });
test("isInRange inclusive bounds", () => { assert.strictEqual(v.isInRange(16, 16, 100), true); assert.strictEqual(v.isInRange(101, 16, 100), false); });
test("isInRange throws when min > max", () => assert.throws(() => v.isInRange(5, 10, 1), RangeError));
test("isStrongPassword weak vs strong", () => { assert.strictEqual(v.isStrongPassword("weak"), false); assert.strictEqual(v.isStrongPassword("Learn2026"), true); });
test("validateUser valid user", () => assert.deepStrictEqual(v.validateUser({ name: "Aish", email: "a@b.co", phone: "9876543210", age: 19, password: "Learn2026" }), { valid: true, errors: [] }));
test("validateUser collects all errors", () => assert.strictEqual(v.validateUser({}).errors.length, 5));
test("validateUser null input", () => assert.strictEqual(v.validateUser(null).valid, false));

// --- mergeSettings ---
test("mergeSettings deep merges nested objects", () => assert.deepStrictEqual(mergeSettings({ a: { x: 1, y: 2 } }, { a: { y: 3 } }), { a: { x: 1, y: 3 } }));
test("mergeSettings replaces arrays", () => assert.deepStrictEqual(mergeSettings({ l: ["en"] }, { l: ["hi"] }), { l: ["hi"] }));
test("mergeSettings does not mutate inputs", () => { const d = { a: { x: 1 } }; mergeSettings(d, { a: { x: 2 } }); assert.strictEqual(d.a.x, 1); });
test("mergeSettings ignores undefined overrides", () => assert.deepStrictEqual(mergeSettings({ a: 1 }, { a: undefined }), { a: 1 }));
test("mergeSettings throws on bad defaults", () => assert.throws(() => mergeSettings(null, {}), TypeError));
test("mergeSettings blocks __proto__ pollution", () => { mergeSettings({}, JSON.parse('{"__proto__":{"hacked":true}}')); assert.strictEqual({}.hacked, undefined); });

// --- calculateTotal ---
test("calculateTotal basic", () => assert.strictEqual(calculateTotal([{ price: 100, qty: 2 }]).total, 200));
test("calculateTotal discount, tax, shipping", () => assert.deepStrictEqual(calculateTotal([{ price: 100, qty: 2 }], { discountPercent: 10, taxPercent: 18, shipping: 50 }), { subtotal: 200, discount: 20, tax: 32.4, shipping: 50, total: 262.4 }));
test("calculateTotal empty cart has no shipping", () => assert.strictEqual(calculateTotal([], { shipping: 49 }).total, 0));
test("calculateTotal rejects bad qty", () => assert.throws(() => calculateTotal([{ price: 10, qty: 0 }]), RangeError));
test("calculateTotal rejects negative price", () => assert.throws(() => calculateTotal([{ price: -1 }]), TypeError));
test("calculateTotal rejects discount > 100", () => assert.throws(() => calculateTotal([], { discountPercent: 150 }), RangeError));

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
