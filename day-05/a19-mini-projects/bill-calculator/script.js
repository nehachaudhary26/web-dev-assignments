// Mini Project 2: Shopping bill calculator (loops + conditionals)
const cart = [
  { item: "Notebook", price: 60, qty: 5 },
  { item: "Pen pack", price: 40, qty: 3 },
  { item: "Backpack", price: 899, qty: 1 },
];
function discountRate(subtotal) { if (subtotal >= 1000) return 0.10; if (subtotal >= 500) return 0.05; return 0; }

let subtotal = 0;
console.log("=== Bill ===");
for (const line of cart) {
  const amount = line.price * line.qty;
  subtotal += amount;
  console.log(`${line.item.padEnd(10)} ${line.qty} x ${line.price} = ${amount}`);
}
const discount = subtotal * discountRate(subtotal);
const tax = (subtotal - discount) * 0.18;
console.log(`Subtotal: ${subtotal}`);
console.log(`Discount (${discountRate(subtotal) * 100}%): -${discount.toFixed(2)}`);
console.log(`GST 18%: ${tax.toFixed(2)}`);
console.log(`Total: ${(subtotal - discount + tax).toFixed(2)}`);
