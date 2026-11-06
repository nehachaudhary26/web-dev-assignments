// Assignment 34: catalogue utilities
const fs = require("fs");
const path = require("path");
const { validateJsonText } = require("../a33-catalogue-json/validate-catalogue");

const DEFAULT_PATH = path.join(__dirname, "../a33-catalogue-json/catalogue.json");
function loadCatalogue(filePath = DEFAULT_PATH) {
  let text;
  try { text = fs.readFileSync(filePath, "utf8"); } catch (e) { throw new Error(`Cannot read catalogue: ${e.code || e.message}`); }
  const check = validateJsonText(text);
  if (!check.valid) throw new Error("Invalid catalogue: " + check.errors.join("; "));
  return JSON.parse(text).products;
}
const findById = (items, id) => items.find((p) => p.id === id) ?? null;
const filterByCategory = (items, category) => items.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
function searchByName(items, text) {
  const q = String(text ?? "").trim().toLowerCase();
  if (!q) return [];
  return items.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
}
function sortBy(items, key, direction = "asc") {
  if (!["price", "stock", "name"].includes(key)) throw new RangeError("Cannot sort by " + key);
  const sign = direction === "desc" ? -1 : 1;
  return [...items].sort((a, b) => sign * (typeof a[key] === "string" ? a[key].localeCompare(b[key]) : a[key] - b[key]));
}
const inStockOnly = (items) => items.filter((p) => p.stock > 0);
const totalInventoryValue = (items) => items.reduce((sum, p) => sum + p.price * p.stock, 0);
const getCategories = (items) => [...new Set(items.map((p) => p.category))].sort();
function groupByCategory(items) {
  return items.reduce((groups, p) => { (groups[p.category] ??= []).push(p.name); return groups; }, {});
}
module.exports = { loadCatalogue, findById, filterByCategory, searchByName, sortBy, inStockOnly, totalInventoryValue, getCategories, groupByCategory };

if (require.main === module) {
  const items = loadCatalogue();
  console.log("Loaded", items.length, "products | Categories:", getCategories(items).join(", "));
  console.log("Find C-003:", findById(items, "C-003")?.name);
  console.log("Search 'bluetooth':", searchByName(items, "bluetooth").map((p) => p.name).join(", "));
  console.log("Cheapest first:", sortBy(items, "price").slice(0, 3).map((p) => `${p.name} (${p.price})`).join(", "));
  console.log("In stock:", inStockOnly(items).length, "| Inventory value:", totalInventoryValue(items));
  console.log("Grouped:", JSON.stringify(groupByCategory(items)));
}
