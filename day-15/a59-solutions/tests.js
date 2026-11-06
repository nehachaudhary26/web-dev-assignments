// run: node tests.js
const assert = require("assert");
const { twoSum, isBalanced, wordFrequency, rotateArray, firstUniqueChar } = require("./solutions");
let n = 0; const t = (name, fn) => { fn(); n++; console.log("PASS", name); };

t("twoSum basic", () => assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]));
t("twoSum answer not at the start", () => assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]));
t("twoSum same value twice", () => assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]));
t("twoSum cannot reuse one element", () => assert.strictEqual(twoSum([3], 6), null));
t("twoSum negatives", () => assert.deepStrictEqual(twoSum([-1, -2, -3, -4], -6), [1, 3]));
t("twoSum empty array", () => assert.strictEqual(twoSum([], 5), null));
t("isBalanced valid nested", () => assert.strictEqual(isBalanced("{[()]}"), true));
t("isBalanced wrong order", () => assert.strictEqual(isBalanced("([)]"), false));
t("isBalanced only closer", () => assert.strictEqual(isBalanced("]"), false));
t("isBalanced unclosed opener", () => assert.strictEqual(isBalanced("(("), false));
t("isBalanced empty string", () => assert.strictEqual(isBalanced(""), true));
t("isBalanced ignores other characters", () => assert.strictEqual(isBalanced("a(b[c]{d})e"), true));
t("wordFrequency counts and sorts", () => assert.deepStrictEqual(wordFrequency("The cat the hat"), [["the", 2], ["cat", 1], ["hat", 1]]));
t("wordFrequency ignores case and punctuation", () => assert.deepStrictEqual(wordFrequency("Hi, hi! HI?"), [["hi", 3]]));
t("wordFrequency empty text", () => assert.deepStrictEqual(wordFrequency(""), []));
t("rotateArray by 2", () => assert.deepStrictEqual(rotateArray([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]));
t("rotateArray k larger than length", () => assert.deepStrictEqual(rotateArray([1, 2, 3], 5), [2, 3, 1]));
t("rotateArray k = 0 and k = length", () => { assert.deepStrictEqual(rotateArray([1, 2, 3], 0), [1, 2, 3]); assert.deepStrictEqual(rotateArray([1, 2, 3], 3), [1, 2, 3]); });
t("rotateArray negative k rotates left", () => assert.deepStrictEqual(rotateArray([1, 2, 3, 4], -1), [2, 3, 4, 1]));
t("rotateArray empty and no mutation", () => { assert.deepStrictEqual(rotateArray([], 3), []); const a = [1, 2, 3]; rotateArray(a, 1); assert.deepStrictEqual(a, [1, 2, 3]); });
t("firstUniqueChar loveleetcode", () => assert.strictEqual(firstUniqueChar("loveleetcode"), 2));
t("firstUniqueChar none unique", () => assert.strictEqual(firstUniqueChar("aabb"), -1));
t("firstUniqueChar empty", () => assert.strictEqual(firstUniqueChar(""), -1));
console.log(`\nAll ${n} tests passed`);
