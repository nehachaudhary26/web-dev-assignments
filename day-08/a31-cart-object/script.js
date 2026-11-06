// Assignment 31: cart object that calculates totals and validates quantity
const MAX_QTY = 10;
function validateQuantity(qty, max = MAX_QTY) {
  if (typeof qty !== "number" || !Number.isInteger(qty)) return "Quantity must be a whole number";
  if (qty < 1) return "Quantity must be at least 1";
  if (qty > max) return `Quantity cannot exceed ${max}`;
  return null; // null = valid
}
const cart = {
  items: [],
  addItem(product, qty = 1) {
    const max = Math.min(MAX_QTY, product.stock ?? MAX_QTY);
    const error = validateQuantity(qty, max);
    if (error) return { ok: false, error };
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      const err = validateQuantity(existing.qty + qty, max);
      if (err) return { ok: false, error: err };
      existing.qty += qty;
    } else this.items.push({ id: product.id, name: product.name, price: product.price, stock: product.stock, qty });
    return { ok: true };
  },
  updateQuantity(id, qty) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return { ok: false, error: "Item not in cart" };
    const error = validateQuantity(qty, Math.min(MAX_QTY, item.stock));
    if (error) return { ok: false, error };
    item.qty = qty;
    return { ok: true };
  },
  removeItem(id) { const n = this.items.length; this.items = this.items.filter((i) => i.id !== id); return this.items.length < n; },
  getItemCount() { return this.items.reduce((s, i) => s + i.qty, 0); },
  getSubtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  getTotal({ discountPercent = 0, taxPercent = 18 } = {}) {
    const afterDiscount = this.getSubtotal() * (1 - discountPercent / 100);
    return Math.round(afterDiscount * (1 + taxPercent / 100) * 100) / 100;
  },
  clear() { this.items = []; },
};
function demo() {
  const pen = { id: 1, name: "Pen", price: 10, stock: 50 }, book = { id: 2, name: "Book", price: 250, stock: 3 };
  console.log("Add 5 pens:", JSON.stringify(cart.addItem(pen, 5)));
  console.log("Add 2 books:", JSON.stringify(cart.addItem(book, 2)));
  console.log("Add 0 pens:", JSON.stringify(cart.addItem(pen, 0)));
  console.log("Add 2.5 pens:", JSON.stringify(cart.addItem(pen, 2.5)));
  console.log("Add 5 more books (stock is 3):", JSON.stringify(cart.addItem(book, 5)));
  console.log("Update pens to 11:", JSON.stringify(cart.updateQuantity(1, 11)));
  console.log("Update pens to 8:", JSON.stringify(cart.updateQuantity(1, 8)));
  console.log(`Items: ${cart.getItemCount()} | Subtotal: ${cart.getSubtotal()} | Total (10% off + 18% GST): ${cart.getTotal({ discountPercent: 10 })}`);
  console.log("Remove book:", cart.removeItem(2), "| Subtotal now:", cart.getSubtotal());
}
if (typeof module !== "undefined") module.exports = { cart, validateQuantity };
if (typeof module === "undefined" || require.main === module) demo();
