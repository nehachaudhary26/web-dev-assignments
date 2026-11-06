// Assignment 23: utilities for merging settings and calculating totals
function isPlainObject(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }

// Deep merge: overrides win, nested objects merge, arrays are replaced, inputs are never mutated.
function mergeSettings(defaults, overrides) {
  if (!isPlainObject(defaults)) throw new TypeError("defaults must be an object");
  if (overrides === undefined || overrides === null) return structuredClone(defaults);
  if (!isPlainObject(overrides)) throw new TypeError("overrides must be an object");
  const result = structuredClone(defaults);
  for (const key of Object.keys(overrides)) {
    if (key === "__proto__") continue; // basic prototype-pollution guard
    const value = overrides[key];
    if (value === undefined) continue;
    result[key] = isPlainObject(value) && isPlainObject(result[key]) ? mergeSettings(result[key], value) : structuredClone(value);
  }
  return result;
}

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

function calculateTotal(items, options = {}) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const { discountPercent = 0, taxPercent = 0, shipping = 0 } = options;
  if (discountPercent < 0 || discountPercent > 100) throw new RangeError("discountPercent must be 0-100");
  if (taxPercent < 0) throw new RangeError("taxPercent cannot be negative");
  if (shipping < 0) throw new RangeError("shipping cannot be negative");
  let subtotal = 0;
  for (const item of items) {
    if (!item || typeof item.price !== "number" || item.price < 0) throw new TypeError("each item needs a non-negative price");
    const qty = item.qty ?? 1;
    if (!Number.isInteger(qty) || qty < 1) throw new RangeError("qty must be a positive integer");
    subtotal += item.price * qty;
  }
  const discount = subtotal * (discountPercent / 100);
  const taxable = subtotal - discount;
  const tax = taxable * (taxPercent / 100);
  const total = taxable + tax + (items.length ? shipping : 0);
  return { subtotal: round2(subtotal), discount: round2(discount), tax: round2(tax), shipping: items.length ? shipping : 0, total: round2(total) };
}
const utils = { mergeSettings, calculateTotal };
function demo() {
  const defaults = { theme: "light", fontSize: 16, notifications: { email: true, sms: false }, languages: ["en"] };
  const user = { theme: "dark", notifications: { sms: true }, languages: ["en", "hi"] };
  console.log("Merged:", JSON.stringify(mergeSettings(defaults, user)));
  console.log("Defaults unchanged:", JSON.stringify(defaults));
  console.log("Total:", JSON.stringify(calculateTotal([{ price: 60, qty: 5 }, { price: 899 }], { discountPercent: 10, taxPercent: 18, shipping: 49 })));
  console.log("Empty cart:", JSON.stringify(calculateTotal([], { shipping: 49 })));
}
if (typeof module !== "undefined") module.exports = utils;
if (typeof window !== "undefined") window.utils = utils;
if (typeof module === "undefined" || require.main === module) demo();
