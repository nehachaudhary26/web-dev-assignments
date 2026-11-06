// Assignment 28: arrays-and-strings problem set (10 problems with checks)
const reverseArray = (arr) => { const r = []; for (let i = arr.length - 1; i >= 0; i--) r.push(arr[i]); return r; };
const removeDuplicates = (arr) => [...new Set(arr)];
const isPalindrome = (s) => { const c = s.toLowerCase().replace(/[^a-z0-9]/g, ""); return c === [...c].reverse().join(""); };
const isAnagram = (a, b) => { const n = (s) => [...s.toLowerCase().replace(/\s/g, "")].sort().join(""); return n(a) === n(b); };
const wordCount = (s) => { const t = s.trim(); return t === "" ? 0 : t.split(/\s+/).length; };
const capitalizeWords = (s) => s.split(" ").map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w)).join(" ");
function secondLargest(arr) { const u = [...new Set(arr)].sort((a, b) => b - a); return u.length < 2 ? null : u[1]; }
function flatten(arr) { return arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x), []); }
function chunk(arr, size) { if (size < 1) throw new RangeError("size must be >= 1"); const out = []; for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size)); return out; }
function mostFrequentChar(s) { const c = {}; let best = ""; for (const ch of s.replace(/\s/g, "")) { c[ch] = (c[ch] || 0) + 1; if (!best || c[ch] > c[best]) best = ch; } return best; }

const problems = [
  ["1. reverseArray([1,2,3,4])", reverseArray([1, 2, 3, 4]), [4, 3, 2, 1]],
  ["2. removeDuplicates([1,2,2,3,1])", removeDuplicates([1, 2, 2, 3, 1]), [1, 2, 3]],
  ["3. isPalindrome('A man, a plan, a canal: Panama')", isPalindrome("A man, a plan, a canal: Panama"), true],
  ["4. isAnagram('Listen','Silent')", isAnagram("Listen", "Silent"), true],
  ["5. wordCount('  hello   world  ')", wordCount("  hello   world  "), 2],
  ["6. capitalizeWords('hELLO wORLD')", capitalizeWords("hELLO wORLD"), "Hello World"],
  ["7. secondLargest([5,1,9,9,3])", secondLargest([5, 1, 9, 9, 3]), 5],
  ["8. flatten([1,[2,[3,[4]]]])", flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]],
  ["9. chunk([1,2,3,4,5],2)", chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]],
  ["10. mostFrequentChar('banana')", mostFrequentChar("banana"), "a"],
];
function demo() {
  let pass = 0;
  for (const [label, actual, expected] of problems) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) pass++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${label} -> ${JSON.stringify(actual)}`);
  }
  console.log(`\n${pass}/${problems.length} problems solved`);
}
if (typeof module !== "undefined") module.exports = { reverseArray, removeDuplicates, isPalindrome, isAnagram, wordCount, capitalizeWords, secondLargest, flatten, chunk, mostFrequentChar };
if (typeof module === "undefined" || require.main === module) demo();
