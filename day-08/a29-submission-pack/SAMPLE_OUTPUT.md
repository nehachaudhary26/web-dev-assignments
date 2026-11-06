# Sample Output (Assignments 25-28, Day 7 programs)

Generated with `node <file>` on the final source code.

## a25-shopping-list/script.js
```
After adding (duplicate 'milk' merged):
1. [ ] Milk x3
2. [ ] Bread x1
3. [ ] Eggs x12

After update + bought:
1. [ ] Milk x3
2. [ ] Bread x3
3. [x] Eggs x12

Pending: Milk, Bread
Search 'e': Bread, Eggs
Sorted: Bread, Eggs, Milk

After removing Bread:
1. [ ] Milk x3
2. [x] Eggs x12
Total quantity: 15
Error handled: Item name is required
```

## a26-product-transform/script.js
```
In stock: Headphones, Smart Watch, Fitness Band, Keyboard, Mouse, Power Bank
Accessories: Keyboard, Mouse, Webcam, Power Bank
Under Rs.1500 & in stock, cheapest first: Mouse - Rs.699 | Power Bank - Rs.1,199 | Fitness Band - Rs.1,499
Top rated: Keyboard (4.6), Power Bank (4.5), Headphones (4.4)
Any out of stock? true | All rated 3.5+? true

Summary by category:
{"category":"Audio","count":2,"totalStock":12,"inventoryValue":29988,"avgPrice":2349}
{"category":"Wearables","count":2,"totalStock":32,"inventoryValue":60568,"avgPrice":2399}
{"category":"Accessories","count":4,"totalStock":85,"inventoryValue":92415,"avgPrice":1349}
```

## a27-text-cleaner/textCleaner.js
```
cleanName: "Neha Chaudhary"
cleanEmail: "nehabhullar2602@example.com"
cleanPhone: "+919389400289"
stripTags: "Hi therealert(1)!"
slugify: "my-first-blog-post"
truncate: "This is a very long message..."
cleanForm: {"name":"Riya Sharma","email":"riya@mail.com","phone":"9876543210","message":"Hello team"}
```

## a28-problem-set/script.js
```
PASS  1. reverseArray([1,2,3,4]) -> [4,3,2,1]
PASS  2. removeDuplicates([1,2,2,3,1]) -> [1,2,3]
PASS  3. isPalindrome('A man, a plan, a canal: Panama') -> true
PASS  4. isAnagram('Listen','Silent') -> true
PASS  5. wordCount('  hello   world  ') -> 2
PASS  6. capitalizeWords('hELLO wORLD') -> "Hello World"
PASS  7. secondLargest([5,1,9,9,3]) -> 5
PASS  8. flatten([1,[2,[3,[4]]]]) -> [1,2,3,4]
PASS  9. chunk([1,2,3,4,5],2) -> [[1,2],[3,4],[5]]
PASS  10. mostFrequentChar('banana') -> "a"

10/10 problems solved
```

## Test run (`node test.js`)
```
PASS shopping list merges duplicate names
PASS shopping list rejects empty name
PASS shopping list rejects qty 0
PASS shopping list remove returns false when missing
PASS shopping list pending excludes bought
PASS products inStock removes stock 0
PASS products sortBy desc rating
PASS products summary has 3 categories
PASS sortBy does not mutate original
PASS cleanName fixes spacing and case
PASS cleanEmail lowercases and removes spaces
PASS cleanPhone keeps leading +
PASS stripTags removes tags
PASS slugify builds url slug
PASS truncate adds ellipsis
PASS isPalindrome ignores punctuation
PASS isAnagram false case
PASS secondLargest with one unique value is null
PASS flatten deep arrays
PASS chunk rejects size 0

All 20 tests passed
```
