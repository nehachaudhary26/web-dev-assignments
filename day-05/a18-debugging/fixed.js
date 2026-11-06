// fixed.js - corrected version of buggy.js
function sumArray(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) { total += nums[i]; } // FIX 1: < not <=
  return total;
}
function isAdult(age) {
  if (age >= 18) { return true; } // FIX 2: comparison, not assignment
  return false;
}
function findMax(nums) {
  let max = nums[0]; // FIX 3: start from first element
  for (const n of nums) { if (n > max) max = n; }
  return max;
}
function greet(name) {
  return "Hello, " + name + "!"; // FIX 4: variable is 'name', not 'Name'
}
function addStrings(a, b) { return Number(a) + Number(b); } // FIX 5: convert to numbers first

console.log("sumArray([1,2,3]) =", sumArray([1, 2, 3]));
console.log("isAdult(10) =", isAdult(10), "| isAdult(20) =", isAdult(20));
console.log("findMax([-5,-2,-9]) =", findMax([-5, -2, -9]));
console.log(greet("Aish"));
console.log("addStrings('5','3') =", addStrings("5", "3"));
