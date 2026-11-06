// Assignment 25: console-based shopping-list manager (arrays)
let nextId = 1;
const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
function addItem(list, name, qty = 1) {
  if (typeof name !== "string" || !name.trim()) throw new TypeError("Item name is required");
  if (!Number.isInteger(qty) || qty < 1) throw new RangeError("Quantity must be a positive whole number");
  const existing = list.find((i) => same(i.name, name));
  if (existing) { existing.qty += qty; return existing; }
  const item = { id: nextId++, name: name.trim(), qty, bought: false };
  list.push(item);
  return item;
}
function removeItem(list, name) {
  const index = list.findIndex((i) => same(i.name, name));
  if (index === -1) return false;
  list.splice(index, 1);
  return true;
}
function updateQty(list, name, qty) {
  const item = list.find((i) => same(i.name, name));
  if (!item || !Number.isInteger(qty) || qty < 1) return false;
  item.qty = qty;
  return true;
}
function toggleBought(list, name) {
  const item = list.find((i) => same(i.name, name));
  if (!item) return false;
  item.bought = !item.bought;
  return true;
}
const getPending = (list) => list.filter((i) => !i.bought);
const search = (list, text) => list.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
const sortByName = (list) => [...list].sort((a, b) => a.name.localeCompare(b.name));
const totalQuantity = (list) => list.reduce((sum, i) => sum + i.qty, 0);
function formatList(list) {
  if (list.length === 0) return "(list is empty)";
  return list.map((i, n) => `${n + 1}. [${i.bought ? "x" : " "}] ${i.name} x${i.qty}`).join("\n");
}
function demo() {
  const list = [];
  addItem(list, "Milk", 2); addItem(list, "Bread"); addItem(list, "Eggs", 12); addItem(list, "milk", 1);
  console.log("After adding (duplicate 'milk' merged):\n" + formatList(list));
  updateQty(list, "Bread", 3); toggleBought(list, "Eggs");
  console.log("\nAfter update + bought:\n" + formatList(list));
  console.log("\nPending:", getPending(list).map((i) => i.name).join(", "));
  console.log("Search 'e':", search(list, "e").map((i) => i.name).join(", "));
  console.log("Sorted:", sortByName(list).map((i) => i.name).join(", "));
  removeItem(list, "Bread");
  console.log("\nAfter removing Bread:\n" + formatList(list));
  console.log("Total quantity:", totalQuantity(list));
  try { addItem(list, "  ", 1); } catch (e) { console.log("Error handled:", e.message); }
}
if (typeof module !== "undefined") module.exports = { addItem, removeItem, updateQty, toggleBought, getPending, search, sortByName, totalQuantity, formatList };
if (typeof module === "undefined" || require.main === module) demo();
