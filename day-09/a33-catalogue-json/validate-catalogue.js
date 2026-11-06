// Assignment 33: validate catalogue.json (run: node validate-catalogue.js)
const fs = require("fs");
const path = require("path");

function validateCatalogue(data) {
  const errors = [];
  if (data === null || typeof data !== "object" || !Array.isArray(data.products)) return ["Root must be an object with a 'products' array"];
  const ids = new Set();
  data.products.forEach((p, i) => {
    const at = `products[${i}]`;
    if (p === null || typeof p !== "object") { errors.push(`${at} must be an object`); return; }
    if (typeof p.id !== "string" || !/^C-\d{3}$/.test(p.id)) errors.push(`${at}.id must look like C-001`);
    else if (ids.has(p.id)) errors.push(`${at}.id '${p.id}' is duplicated`);
    else ids.add(p.id);
    if (typeof p.name !== "string" || !p.name.trim()) errors.push(`${at}.name must be a non-empty string`);
    if (typeof p.category !== "string" || !p.category.trim()) errors.push(`${at}.category must be a non-empty string`);
    if (typeof p.price !== "number" || !Number.isFinite(p.price) || p.price < 0) errors.push(`${at}.price must be a number >= 0`);
    if (!Number.isInteger(p.stock) || p.stock < 0) errors.push(`${at}.stock must be a whole number >= 0`);
    if (!Array.isArray(p.tags) || !p.tags.every((t) => typeof t === "string")) errors.push(`${at}.tags must be an array of strings`);
    if (p.specs === null || typeof p.specs !== "object" || Array.isArray(p.specs)) errors.push(`${at}.specs must be an object`);
  });
  return errors;
}
function validateJsonText(text) {
  let data;
  try { data = JSON.parse(text); } catch (e) { return { valid: false, errors: ["Invalid JSON: " + e.message] }; }
  const errors = validateCatalogue(data);
  return { valid: errors.length === 0, errors };
}
module.exports = { validateCatalogue, validateJsonText };

if (require.main === module) {
  const text = fs.readFileSync(path.join(__dirname, "catalogue.json"), "utf8");
  const result = validateJsonText(text);
  console.log("catalogue.json:", result.valid ? "VALID" : "INVALID", `(${JSON.parse(text).products.length} products)`);
  result.errors.forEach((e) => console.log(" -", e));
  console.log("\nSelf-test with bad data:");
  console.log("Broken JSON ->", validateJsonText('{ "products": [ ').errors[0].slice(0, 40) + "...");
  const bad = { products: [{ id: "X1", name: "", category: "A", price: -5, stock: 1.5, tags: "x", specs: [] }, { id: "C-001", name: "A", category: "A", price: 1, stock: 1, tags: [], specs: {} }, { id: "C-001", name: "B", category: "A", price: 1, stock: 1, tags: [], specs: {} }] };
  validateCatalogue(bad).forEach((e) => console.log(" -", e));
}
