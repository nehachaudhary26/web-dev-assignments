# Assignment 58: HTML & CSS Revision Challenge (CodeClub pricing page)

The sheet does not give the exact challenge, so I built a page that practises the main HTML and CSS topics. If your instructor set a specific task, tell me and I will redo it.

## HTML revised
| Topic | Where |
|-------|-------|
| Semantic layout: `header`, `nav`, `main`, `section`, `article`, `footer` | whole page |
| Headings in order (h1 > h2 > h3) | hero, plans |
| Accessible names: `aria-labelledby`, `aria-label`, skip link | sections, nav |
| Lists and a real data table with `caption`, `scope` | plans, comparison |
| `details` / `summary` for an FAQ with no JavaScript | `#faq` |
| Form with `label`, `fieldset`, `legend`, `required`, `type="email"`, `autocomplete` | `#join` |
| `lang`, `viewport` and `description` meta tags | `<head>` |

## CSS revised
| Topic | Where |
|-------|-------|
| Custom properties (variables) and `clamp()` for fluid sizes | `:root` |
| Box model and `box-sizing: border-box` | global reset |
| Flexbox: header, plan cards | `.site-header`, `.plan` |
| Grid with `auto-fit` and `minmax` (no media query needed) | `.plan-grid` |
| Pseudo-classes: `:hover`, `:focus-visible`, `:nth-child`, `:required:invalid` | nav, table, form |
| Pseudo-elements: `::before`, `::marker` | featured badge, list bullets |
| Sticky positioning | header |
| Media queries: width, `prefers-color-scheme`, `prefers-reduced-motion` | bottom of file |
| `color-mix()` for subtle row shading | table |

## Self-check
- [ ] Page works at 360px, 768px and 1280px
- [ ] Tab key reaches every link and field and the focus outline is visible
- [ ] Switch your OS to dark mode and check the colours
- [ ] Validate the HTML at validator.w3.org
- [ ] No horizontal scrollbar on a phone
