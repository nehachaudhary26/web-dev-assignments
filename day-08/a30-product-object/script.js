// Assignment 30: detailed product object with nested specifications
const product = {
  id: "P-1001",
  name: "AeroSound Wireless Headphones",
  brand: "AeroSound",
  price: { amount: 2499, currency: "INR", discountPercent: 10 },
  inStock: true,
  colors: ["Black", "Blue", "White"],
  specs: {
    audio: { driver: "40 mm", frequencyRange: "20 Hz - 20 kHz", noiseCancelling: true },
    battery: { playback: "30 hours", charging: { port: "USB-C", fastCharge: true, fullChargeTime: "2 hours" } },
    connectivity: { bluetooth: "5.3", range: "10 m", multipoint: true },
    physical: { weightGrams: 250, foldable: true },
  },
  reviews: [
    { user: "Riya", rating: 5, comment: "Great battery life" },
    { user: "Karan", rating: 4, comment: "Comfortable and clear sound" },
    { user: "Neha", rating: 4, comment: "Good value" },
  ],
  getFinalPrice() { return Math.round(this.price.amount * (1 - this.price.discountPercent / 100)); },
  getAverageRating() { return this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length; },
  describe() { return `${this.name} by ${this.brand} - ${this.price.currency} ${this.getFinalPrice()} (${this.price.discountPercent}% off), rated ${this.getAverageRating().toFixed(1)}/5`; },
};
function flattenObject(obj, prefix = "") {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) Object.assign(acc, flattenObject(value, path));
    else acc[path] = value;
    return acc;
  }, {});
}
function demo() {
  console.log(product.describe());
  console.log("Dot access:", product.specs.battery.charging.port, "| Bracket access:", product.specs["connectivity"]["bluetooth"]);
  console.log("Optional chaining:", product.specs.display?.size ?? "No display (N/A)");
  const { specs: { audio: { driver }, physical: { weightGrams } }, colors: [firstColor] } = product;
  console.log("Destructured:", driver, weightGrams + " g", firstColor);
  console.log("\nAll specs (flattened):");
  for (const [path, value] of Object.entries(flattenObject(product.specs))) console.log(`  ${path}: ${value}`);
  console.log("\nReviews:");
  product.reviews.forEach((r) => console.log(`  ${r.user}: ${"*".repeat(r.rating)} ${r.comment}`));
  console.log("\nHas 'warranty'?", "warranty" in product, "| Own 'brand'?", Object.hasOwn(product, "brand"));
}
if (typeof module !== "undefined") module.exports = { product, flattenObject };
if (typeof module === "undefined" || require.main === module) demo();
