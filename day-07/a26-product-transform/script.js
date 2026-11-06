// Assignment 26: transform a product dataset into filtered and summarized results
const products = [
  { id: 1, name: "Headphones", category: "Audio", price: 2499, stock: 12, rating: 4.4 },
  { id: 2, name: "Speaker", category: "Audio", price: 2199, stock: 0, rating: 4.1 },
  { id: 3, name: "Smart Watch", category: "Wearables", price: 3299, stock: 7, rating: 4.2 },
  { id: 4, name: "Fitness Band", category: "Wearables", price: 1499, stock: 25, rating: 3.9 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 1899, stock: 15, rating: 4.6 },
  { id: 6, name: "Mouse", category: "Accessories", price: 699, stock: 40, rating: 4.3 },
  { id: 7, name: "Webcam", category: "Accessories", price: 1599, stock: 0, rating: 3.8 },
  { id: 8, name: "Power Bank", category: "Accessories", price: 1199, stock: 30, rating: 4.5 },
];
const inStock = (list) => list.filter((p) => p.stock > 0);
const byCategory = (list, cat) => list.filter((p) => p.category === cat);
const underPrice = (list, max) => list.filter((p) => p.price <= max);
const sortBy = (list, key, dir = "asc") => [...list].sort((a, b) => (dir === "asc" ? a[key] - b[key] : b[key] - a[key]));
const toLabels = (list) => list.map((p) => `${p.name} - Rs.${p.price.toLocaleString("en-IN")}`);
function summarizeByCategory(list) {
  const groups = list.reduce((acc, p) => {
    acc[p.category] ??= { count: 0, totalStock: 0, inventoryValue: 0, priceSum: 0 };
    const g = acc[p.category];
    g.count++; g.totalStock += p.stock; g.inventoryValue += p.price * p.stock; g.priceSum += p.price;
    return acc;
  }, {});
  return Object.entries(groups).map(([category, g]) => ({ category, count: g.count, totalStock: g.totalStock, inventoryValue: g.inventoryValue, avgPrice: Math.round(g.priceSum / g.count) }));
}
const topRated = (list, n = 3) => sortBy(list, "rating", "desc").slice(0, n).map((p) => `${p.name} (${p.rating})`);
function demo() {
  console.log("In stock:", inStock(products).map((p) => p.name).join(", "));
  console.log("Accessories:", byCategory(products, "Accessories").map((p) => p.name).join(", "));
  console.log("Under Rs.1500 & in stock, cheapest first:", toLabels(sortBy(underPrice(inStock(products), 1500), "price")).join(" | "));
  console.log("Top rated:", topRated(products).join(", "));
  console.log("Any out of stock?", products.some((p) => p.stock === 0), "| All rated 3.5+?", products.every((p) => p.rating >= 3.5));
  console.log("\nSummary by category:");
  summarizeByCategory(products).forEach((s) => console.log(JSON.stringify(s)));
}
if (typeof module !== "undefined") module.exports = { products, inStock, byCategory, underPrice, sortBy, toLabels, summarizeByCategory, topRated };
if (typeof module === "undefined" || require.main === module) demo();
