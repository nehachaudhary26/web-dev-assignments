# Assignment 59: Dry Runs

A dry run means following the code by hand with a small input and writing down each variable. All traces below match the real code in `solutions.js`.

## 1. twoSum([2, 7, 11, 15], target = 9)
Idea: for each number, check whether `target - number` was already seen.

| Step | i | nums[i] | need = 9 - nums[i] | seen before the check | In seen? | Action |
|------|---|---------|--------------------|-----------------------|----------|--------|
| 1 | 0 | 2 | 7 | { } | No | seen = {2: 0} |
| 2 | 1 | 7 | 2 | {2: 0} | **Yes (index 0)** | return [0, 1] |

**Result: [0, 1].** Second run `twoSum([3, 2, 4], 6)`: i=0 need 3, seen is empty, so store {3:0}. i=1 need 4, not seen, store {3:0, 2:1}. i=2 need 2, seen at index 1, so return **[1, 2]**.

Complexity: time O(n), space O(n).

## 2. isBalanced("{[()]}") and isBalanced("([)]")
Idea: push openers; each closer must match the most recent opener (top of the stack).

| Char | Type | Stack after |
|------|------|-------------|
| `{` | opener, push | [ { ] |
| `[` | opener, push | [ {, [ ] |
| `(` | opener, push | [ {, [, ( ] |
| `)` | closer: pop `(` equals pairs[`)`] = `(` OK | [ {, [ ] |
| `]` | closer: pop `[` equals pairs[`]`] = `[` OK | [ { ] |
| `}` | closer: pop `{` equals pairs[`}`] = `{` OK | [ ] |

End: stack is empty, so **true**.

`"([)]"`: push `(`, push `[`, then `)` pops `[` but needs `(`, so it returns **false** immediately.

Complexity: time O(n), space O(n).

## 3. wordFrequency("The cat the hat")
1. Lowercase and split into words: `["the", "cat", "the", "hat"]`

| Word | counts after |
|------|--------------|
| the | {the: 1} |
| cat | {the: 1, cat: 1} |
| the | {the: 2, cat: 1} |
| hat | {the: 2, cat: 1, hat: 1} |

2. Sort by count (high to low), ties alphabetical (cat before hat).

**Result: [["the", 2], ["cat", 1], ["hat", 1]].**

Complexity: O(n) to count, O(m log m) to sort m distinct words.

## 4. rotateArray([1, 2, 3, 4, 5], k = 2)
n = 5, steps = ((2 % 5) + 5) % 5 = 2
- `arr.slice(n - steps)` = `arr.slice(3)` = `[4, 5]`
- `arr.slice(0, n - steps)` = `arr.slice(0, 3)` = `[1, 2, 3]`
- join them: **[4, 5, 1, 2, 3]**

Edge cases: `k = 7` gives steps 2 (same result); `k = -1` on `[1,2,3,4]` gives steps `((-1 % 4) + 4) % 4 = 3`, so `[2,3,4,1]` (rotate left); empty array returns `[]`.

Complexity: time O(n), space O(n).

## 5. firstUniqueChar("loveleetcode")
Indexes: 0 l, 1 o, 2 v, 3 e, 4 l, 5 e, 6 e, 7 t, 8 c, 9 o, 10 d, 11 e

Pass 1 (count): l=2, o=2, v=1, e=4, t=1, c=1, d=1

| Pass 2 index | Char | Count | Unique? |
|--------------|------|-------|---------|
| 0 | l | 2 | No |
| 1 | o | 2 | No |
| 2 | v | 1 | **Yes, return 2** |

**Result: 2.** For `"aabb"` every count is 2, so the loop ends and it returns -1.

Complexity: time O(n), space O(1) for a fixed alphabet (O(k) in general).

## Test cases
See `tests.js` (22 tests). Each solution is checked with a normal case, edge cases (empty input, boundaries, negatives) and a "no answer" case.
