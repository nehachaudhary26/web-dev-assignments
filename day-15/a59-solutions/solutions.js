// Assignment 59: assessment solutions (each one has a dry run in DRY_RUNS.md and tests in tests.js)

// 1. Two Sum: indices of two numbers that add up to target. O(n) time using a Map.
function twoSum(nums, target) {
  const seen = new Map();                       // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}

// 2. Balanced brackets: every opener has a matching closer in the right order. Uses a stack.
function isBalanced(text) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of text) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (pairs[ch]) { if (stack.pop() !== pairs[ch]) return false; }
  }
  return stack.length === 0;
}

// 3. Word frequency: [word, count] pairs, most frequent first, ties alphabetical.
function wordFrequency(text) {
  const words = String(text).toLowerCase().match(/[a-z0-9']+/g) || [];
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

// 4. Rotate right by k steps (k may be larger than the length or negative). Does not mutate the input.
function rotateArray(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const steps = ((k % n) + n) % n;
  return [...arr.slice(n - steps), ...arr.slice(0, n - steps)];
}

// 5. Index of the first character that appears exactly once, or -1.
function firstUniqueChar(text) {
  const counts = new Map();
  for (const ch of text) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (let i = 0; i < text.length; i++) if (counts.get(text[i]) === 1) return i;
  return -1;
}
module.exports = { twoSum, isBalanced, wordFrequency, rotateArray, firstUniqueChar };
