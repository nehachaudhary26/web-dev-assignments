# Assignment 35: Node Relationships

> The sheet says "a supplied HTML document". I used the sample document in `index.html`.
> If your instructor gave you a different file, use the same method: draw the tree, then label each node.

## Tree (indent = child of the line above)
```
div#tree-demo
├── header#site-header
│   ├── h1 ("My Blog")
│   └── nav
│       └── ul
│           ├── li
│           │   └── a ("Home")
│           └── li
│               └── a ("About")
├── main
│   ├── article.post
│   │   ├── h2 ("First Post")
│   │   └── p
│   │       ├── text "Hello "
│   │       ├── strong ("world")
│   │       └── text "!"
│   └── aside
│       └── p ("Sidebar")
└── footer
    └── p ("Copyright 2026")
```

## Labels
| Node | Parent | Children | Siblings | Ancestors | Descendants |
|------|--------|----------|----------|-----------|-------------|
| `div#tree-demo` | `body` | header, main, footer | (other body children) | body, html | everything below |
| `header` | div#tree-demo | h1, nav | main, footer (next) | div, body, html | h1, nav, ul, 2 li, 2 a |
| `h1` | header | none (1 text node) | nav (next) | header, div, body, html | none |
| `nav` | header | ul | h1 (previous) | header, div, body, html | ul, li, a |
| `ul` | nav | li, li | none | nav, header, div... | 2 li, 2 a |
| `li` (Home) | ul | a | li (About, next) | ul, nav, header... | a |
| `main` | div#tree-demo | article.post, aside | header (previous), footer (next) | div, body, html | article, h2, p, strong, aside, p |
| `article.post` | main | h2, p | aside (next) | main, div, body, html | h2, p, strong |
| `p` (in article) | article.post | strong (element), 2 text nodes | h2 (previous) | article, main, div... | strong |
| `strong` | p | text "world" | none (text nodes on both sides) | p, article, main... | none |
| `aside` | main | p | article.post (previous) | main, div, body, html | p |
| `footer` | div#tree-demo | p | header, main (previous) | div, body, html | p |

## Key ideas
- **Parent / child:** direct connection one level apart (`parentElement`, `children`).
- **Siblings:** same parent (`previousElementSibling`, `nextElementSibling`).
- **Ancestor / descendant:** any number of levels up or down.
- **`childNodes` vs `children`:** `childNodes` includes text and comment nodes; `children` has elements only. The `<p>` above has 3 child nodes but 1 child element.
- **Whitespace** between tags also creates text nodes in `childNodes`.
