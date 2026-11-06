// Assignment 20: five reusable mathematical functions
function assertNumber(n, label = "value") {
  if (typeof n !== "number" || Number.isNaN(n)) throw new TypeError(`${label} must be a number`);
}
function factorial(n) {
  assertNumber(n, "n");
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be a non-negative integer");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function isPrime(n) {
  assertNumber(n, "n");
  if (!Number.isInteger(n) || n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
function gcd(a, b) {
  assertNumber(a, "a"); assertNumber(b, "b");
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) throw new TypeError("numbers must be a non-empty array");
  numbers.forEach((n) => assertNumber(n, "each item"));
  return numbers.reduce((s, n) => s + n, 0) / numbers.length;
}
function clamp(value, min, max) {
  assertNumber(value, "value"); assertNumber(min, "min"); assertNumber(max, "max");
  if (min > max) throw new RangeError("min cannot be greater than max");
  return Math.min(Math.max(value, min), max);
}
const mathUtils = { factorial, isPrime, gcd, average, clamp };
if (typeof module !== "undefined") module.exports = mathUtils;
if (typeof window !== "undefined") window.mathUtils = mathUtils;
