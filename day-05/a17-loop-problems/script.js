// Assignment 17: Beginner loop-based coding problems

// 1. Print numbers 1 to 10 (for loop)
console.log("1. Numbers 1-10:");
let line = "";
for (let i = 1; i <= 10; i++) line += i + " ";
console.log(line.trim());

// 2. Sum of 1 to N (while loop)
function sumToN(n) { let i = 1, sum = 0; while (i <= n) { sum += i; i++; } return sum; }
console.log("\n2. Sum 1..100 =", sumToN(100));

// 3. Multiplication table
function table(n) { for (let i = 1; i <= 10; i++) console.log(`${n} x ${i} = ${n * i}`); }
console.log("\n3. Table of 7:"); table(7);

// 4. FizzBuzz 1..15
console.log("\n4. FizzBuzz 1-15:");
const fb = [];
for (let i = 1; i <= 15; i++) fb.push(i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i);
console.log(fb.join(", "));

// 5. Factorial
function factorial(n) { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; }
console.log("\n5. Factorial of 6 =", factorial(6));

// 6. Reverse a string
function reverse(s) { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; }
console.log("\n6. Reverse 'JavaScript' =", reverse("JavaScript"));

// 7. Count vowels
function countVowels(s) { let c = 0; for (const ch of s.toLowerCase()) if ("aeiou".includes(ch)) c++; return c; }
console.log("\n7. Vowels in 'Artificial Intelligence' =", countVowels("Artificial Intelligence"));

// 8. Even numbers up to 20 (continue)
const evens = [];
for (let i = 1; i <= 20; i++) { if (i % 2 !== 0) continue; evens.push(i); }
console.log("\n8. Even numbers up to 20:", evens.join(" "));

// 9. Star pyramid (nested loops)
console.log("\n9. Pyramid:");
for (let r = 1; r <= 4; r++) console.log(" ".repeat(4 - r) + "*".repeat(2 * r - 1));

// 10. First prime numbers up to 30 (break)
const primes = [];
for (let n = 2; n <= 30; n++) {
  let prime = true;
  for (let d = 2; d * d <= n; d++) { if (n % d === 0) { prime = false; break; } }
  if (prime) primes.push(n);
}
console.log("\n10. Primes up to 30:", primes.join(" "));
