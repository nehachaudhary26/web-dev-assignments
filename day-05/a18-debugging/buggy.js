// buggy.js - this file contains 5 bugs. Find them, then compare with fixed.js
function sumArray(nums) {
  let total = 0;
  for (let i = 0; i <= nums.length; i++) { total += nums[i]; }
  return total;
}
function isAdult(age) {
  if (age = 18) { return true; }
  return false;
}
function findMax(nums) {
  let max = 0;
  for (const n of nums) { if (n > max) max = n; }
  return max;
}
function greet(name) {
  return "Hello, " + Name + "!";
}
function addStrings(a, b) { return a + b; }

console.log("sumArray([1,2,3]) =", sumArray([1, 2, 3]));
console.log("isAdult(10) =", isAdult(10));
console.log("findMax([-5,-2,-9]) =", findMax([-5, -2, -9]));
try { console.log(greet("Aish")); } catch (e) { console.log("greet error:", e.message); }
console.log("addStrings('5','3') =", addStrings("5", "3"));
