# Assignment 45: localStorage vs sessionStorage

Both are part of the Web Storage API. They store **string key/value pairs** in the browser, are **synchronous**, and are limited to the **same origin** (protocol + domain + port).

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| Lifetime | Stays until the code or the user clears it | Cleared when the tab or window closes |
| Scope | Shared by all tabs of the same origin | Separate for each tab, even on the same site |
| Survives page reload? | Yes | Yes (same tab) |
| Survives browser restart? | Yes | No |
| Typical size limit | About 5 MB per origin | About 5 MB per origin |
| Sent to the server? | Never (unlike cookies) | Never |
| API | `setItem`, `getItem`, `removeItem`, `clear` | Same |

## When to use which
- **localStorage:** things that should persist, such as theme, settings, a to-do list, or the best quiz score.
- **sessionStorage:** temporary state for one visit, such as a half-filled multi-step form, a tab's current filter, or a one-time banner dismissed for this session.

## Rules and cautions
1. **Values are strings.** Use `JSON.stringify` to save and `JSON.parse` to read objects and arrays.
2. **Always use try/catch.** `JSON.parse` throws on corrupted data, and storage can be blocked or full (`QuotaExceededError`).
3. **Never store secrets** (passwords, tokens, personal data). Any script on the page, including an XSS attack, can read it.
4. **Validate what you load.** Users can edit storage in DevTools, so treat it as untrusted input.
5. **No expiry built in.** Save a timestamp if you need data to expire.
6. **Use a namespace prefix** (for example `todo-app:todos`) so different apps on one origin do not overwrite each other.
7. **Synchronous:** storing very large data can block the page. Use IndexedDB for big data.

## Quick example
```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme") ?? "light";   // null if missing
sessionStorage.setItem("draft", JSON.stringify({ title: "Hello" }));
const draft = JSON.parse(sessionStorage.getItem("draft") ?? "null");
```

## Check it yourself
Open DevTools, then the **Application** tab, then **Local Storage** or **Session Storage**. You can see, edit and delete values there. Open the Persistent To-Do (A49) in two tabs and compare how the two behave.
