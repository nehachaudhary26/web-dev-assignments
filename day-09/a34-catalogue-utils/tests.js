// Assignment 34: test scenarios (run: node tests.js)
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const u = require("./catalogueUtils");
const { validateJsonText } = require("../a33-catalogue-json/validate-catalogue");
let passed = 0;
function scenario(name, fn) { fn(); passed++; console.log("PASS", name); }
const items = u.loadCatalogue();

scenario("S1 loads 8 valid products", () => assert.strictEqual(items.length, 8));
scenario("S2 findById returns product", () => assert.strictEqual(u.findById(items, "C-005").name, "ClickPro Keyboard"));
scenario("S3 findById unknown id returns null", () => assert.strictEqual(u.findById(items, "C-999"), null));
scenario("S4 filterByCategory is case-insensitive", () => assert.strictEqual(u.filterByCategory(items, "accessories").length, 4));
scenario("S5 filterByCategory unknown returns []", () => assert.deepStrictEqual(u.filterByCategory(items, "Toys"), []));
scenario("S6 search matches tags", () => assert.strictEqual(u.searchByName(items, "bluetooth").length, 2));
scenario("S7 empty search returns []", () => assert.deepStrictEqual(u.searchByName(items, "   "), []));
scenario("S8 sortBy price asc/desc", () => { assert.strictEqual(u.sortBy(items, "price")[0].price, 699); assert.strictEqual(u.sortBy(items, "price", "desc")[0].price, 3299); });
scenario("S9 sortBy rejects bad key", () => assert.throws(() => u.sortBy(items, "color"), RangeError));
scenario("S10 sortBy does not mutate", () => { const first = items[0].id; u.sortBy(items, "price", "desc"); assert.strictEqual(items[0].id, first); });
scenario("S11 inStockOnly removes 2 items", () => assert.strictEqual(u.inStockOnly(items).length, 6));
scenario("S12 inventory value", () => assert.strictEqual(u.totalInventoryValue(items), 2499 * 12 + 3299 * 7 + 1499 * 25 + 1899 * 15 + 699 * 40 + 1199 * 30));
scenario("S13 groupByCategory has 3 groups", () => assert.strictEqual(Object.keys(u.groupByCategory(items)).length, 3));
scenario("S14 invalid JSON text is reported", () => assert.strictEqual(validateJsonText("{ nope").valid, false));
scenario("S15 duplicate id is reported", () => { const dup = { products: [items[0], items[0]] }; assert.ok(validateJsonText(JSON.stringify(dup)).errors.some((e) => e.includes("duplicated"))); });
scenario("S16 negative price is reported", () => { const bad = { products: [{ ...items[0], price: -1 }] }; assert.ok(validateJsonText(JSON.stringify(bad)).errors.some((e) => e.includes("price"))); });
scenario("S17 missing file throws friendly error", () => assert.throws(() => u.loadCatalogue("/no/such/file.json"), /Cannot read catalogue/));
scenario("S18 invalid file throws on load", () => { const f = path.join(os.tmpdir(), "bad-catalogue.json"); fs.writeFileSync(f, '{"products":[{"id":"bad"}]}'); assert.throws(() => u.loadCatalogue(f), /Invalid catalogue/); fs.unlinkSync(f); });
console.log(`\nAll ${passed} scenarios passed`);
