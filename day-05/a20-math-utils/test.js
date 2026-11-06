// Run with: node test.js
const assert = require("assert");
const { factorial, isPrime, gcd, average, clamp } = require("./mathUtils");

assert.strictEqual(factorial(0), 1);
assert.strictEqual(factorial(5), 120);
assert.throws(() => factorial(-1), RangeError);
assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(17), true);
assert.strictEqual(isPrime(1), false);
assert.strictEqual(isPrime(21), false);
assert.strictEqual(gcd(12, 18), 6);
assert.strictEqual(gcd(-8, 12), 4);
assert.strictEqual(average([2, 4, 6]), 4);
assert.throws(() => average([]), TypeError);
assert.strictEqual(clamp(15, 0, 10), 10);
assert.strictEqual(clamp(-3, 0, 10), 0);
assert.strictEqual(clamp(5, 0, 10), 5);
console.log("All 15 tests passed");
