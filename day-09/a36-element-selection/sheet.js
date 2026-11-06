// Assignment 36: element-selection challenge sheet
const $ = (sel) => document.querySelector(sel);
const play = $("#playground");

function describe(value) {
  if (value === null || value === undefined) return "null (nothing found)";
  if (value instanceof Element) return `<${value.tagName.toLowerCase()}${value.id ? " id=" + value.id : ""}${value.className ? " class=" + value.className : ""}>`;
  if (typeof value.length === "number" && typeof value !== "string") return `${value.length} element(s): ` + [...value].map((e) => e.tagName.toLowerCase() + (e.className ? "." + e.className.split(" ")[0] : "")).join(", ");
  return String(value);
}
const challenges = [
  ["Select the page title by its id", 'document.getElementById("main-title")', () => document.getElementById("main-title")],
  ["Select the first card", 'document.querySelector(".card")', () => $(".card")],
  ["Count all cards", 'document.querySelectorAll(".card")', () => document.querySelectorAll(".card")],
  ["Select every tag by class name (live HTMLCollection)", 'document.getElementsByClassName("tag")', () => document.getElementsByClassName("tag")],
  ["Select all list items by tag name", 'document.getElementsByTagName("li")', () => document.getElementsByTagName("li")],
  ["First menu item using a child selector", 'document.querySelector("#menu > li:first-child")', () => $("#menu > li:first-child")],
  ["Links that open in a new tab", 'document.querySelectorAll("a[target=\'_blank\']")', () => document.querySelectorAll("a[target='_blank']")],
  ["The email input", 'document.querySelector("input[type=\'email\']")', () => $("input[type='email']")],
  ["Cards that are NOT featured", 'document.querySelectorAll(".card:not(.featured)")', () => document.querySelectorAll(".card:not(.featured)")],
  ["Cards with data-level=\"advanced\"", 'document.querySelectorAll(\'[data-level="advanced"]\')', () => document.querySelectorAll('[data-level="advanced"]')],
  ["Nearest section above the Enroll button", '$(".enroll").closest("section")', () => $(".enroll").closest("section")],
  ["Next element after the title", '$("#main-title").nextElementSibling', () => $("#main-title").nextElementSibling],
  ["Does the first card match .featured?", '$(".card").matches(".featured")', () => $(".card").matches(".featured")],
  ["Select inside a scope only (tags inside the first card)", '$(".card").querySelectorAll(".tag")', () => $(".card").querySelectorAll(".tag")],
  ["Something that does not exist", 'document.querySelector("#missing")', () => $("#missing")],
];
const tbody = document.querySelector("#results tbody");
challenges.forEach(([title, code, run], i) => {
  const row = document.createElement("tr");
  const cells = [String(i + 1), title, code, describe(run())];
  cells.forEach((text, c) => {
    const td = document.createElement("td");
    if (c === 2) { const k = document.createElement("code"); k.textContent = text; td.append(k); } else td.textContent = text;
    row.append(td);
  });
  tbody.append(row);
});
