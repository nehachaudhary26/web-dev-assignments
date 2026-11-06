// Assignment 29: test cases for the Day 7 arrays & strings programs (run: node test.js)
const assert = require("assert");
const list = require("../../day-07/a25-shopping-list/script.js");
const prod = require("../../day-07/a26-product-transform/script.js");
const tc = require("../../day-07/a27-text-cleaner/textCleaner.js");
const ps = require("../../day-07/a28-problem-set/script.js");
let passed = 0;
function test(name, fn) { fn(); passed++; console.log("PASS", name); }

test("shopping list merges duplicate names", () => { const l = []; list.addItem(l, "Milk", 2); list.addItem(l, "milk", 1); assert.strictEqual(l.length, 1); assert.strictEqual(l[0].qty, 3); });
test("shopping list rejects empty name", () => assert.throws(() => list.addItem([], " "), TypeError));
test("shopping list rejects qty 0", () => assert.throws(() => list.addItem([], "Tea", 0), RangeError));
test("shopping list remove returns false when missing", () => assert.strictEqual(list.removeItem([], "x"), false));
test("shopping list pending excludes bought", () => { const l = []; list.addItem(l, "A"); list.addItem(l, "B"); list.toggleBought(l, "A"); assert.deepStrictEqual(list.getPending(l).map((i) => i.name), ["B"]); });
test("products inStock removes stock 0", () => assert.ok(prod.inStock(prod.products).every((p) => p.stock > 0)));
test("products sortBy desc rating", () => assert.strictEqual(prod.sortBy(prod.products, "rating", "desc")[0].name, "Keyboard"));
test("products summary has 3 categories", () => assert.strictEqual(prod.summarizeByCategory(prod.products).length, 3));
test("sortBy does not mutate original", () => { const first = prod.products[0].name; prod.sortBy(prod.products, "price"); assert.strictEqual(prod.products[0].name, first); });
test("cleanName fixes spacing and case", () => assert.strictEqual(tc.cleanName("  aISH   kALRA "), "Aish Kalra"));
test("cleanEmail lowercases and removes spaces", () => assert.strictEqual(tc.cleanEmail(" A B@C.com "), "ab@c.com"));
test("cleanPhone keeps leading +", () => assert.strictEqual(tc.cleanPhone("+91 98765-43210"), "+919876543210"));
test("stripTags removes tags", () => assert.strictEqual(tc.stripTags("a<b>b</b>c"), "abc"));
test("slugify builds url slug", () => assert.strictEqual(tc.slugify("  My First   Post!! "), "my-first-post"));
test("truncate adds ellipsis", () => assert.strictEqual(tc.truncate("abcdefghij", 8), "abcde..."));
test("isPalindrome ignores punctuation", () => assert.strictEqual(ps.isPalindrome("Was it a car or a cat I saw?"), true));
test("isAnagram false case", () => assert.strictEqual(ps.isAnagram("abc", "abd"), false));
test("secondLargest with one unique value is null", () => assert.strictEqual(ps.secondLargest([4, 4]), null));
test("flatten deep arrays", () => assert.deepStrictEqual(ps.flatten([1, [2, [3]]]), [1, 2, 3]));
test("chunk rejects size 0", () => assert.throws(() => ps.chunk([1], 0), RangeError));
console.log(`\nAll ${passed} tests passed`);
