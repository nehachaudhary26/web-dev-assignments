// Assignment 41: dynamic reading-list interface (DOM built with createElement/textContent only)
const STATUSES = [["to-read", "To read"], ["reading", "Reading"], ["finished", "Finished"]];
const form = document.getElementById("book-form"), titleIn = document.getElementById("title"), authorIn = document.getElementById("author");
const errorEl = document.getElementById("form-error"), list = document.getElementById("book-list"), emptyEl = document.getElementById("empty"), summary = document.getElementById("summary");
const filterBar = document.querySelector(".filters");
let books = [{ id: 1, title: "Python Crash Course", author: "Eric Matthes", status: "reading" }, { id: 2, title: "Hands-On Machine Learning", author: "Aurelien Geron", status: "to-read" }];
let nextId = 3, filter = "all";

function buildItem(book) {
  const li = document.createElement("li");
  li.className = "book" + (book.status === "finished" ? " finished" : "");
  li.dataset.id = book.id;
  const info = document.createElement("div");
  const t = document.createElement("strong"); t.textContent = book.title;
  const a = document.createElement("span"); a.className = "by"; a.textContent = book.author;
  info.append(t, a);
  const sel = document.createElement("select");
  sel.setAttribute("aria-label", `Status of ${book.title}`);
  STATUSES.forEach(([value, text]) => { const o = document.createElement("option"); o.value = value; o.textContent = text; o.selected = value === book.status; sel.append(o); });
  const del = document.createElement("button");
  del.type = "button"; del.className = "ghost"; del.dataset.action = "remove"; del.textContent = "Remove";
  del.setAttribute("aria-label", `Remove ${book.title}`);
  li.append(info, sel, del);
  return li;
}
function render() {
  const visible = books.filter((b) => filter === "all" || b.status === filter);
  list.replaceChildren(...visible.map(buildItem));
  emptyEl.hidden = visible.length > 0;
  const done = books.filter((b) => b.status === "finished").length;
  summary.textContent = `${books.length} ${books.length === 1 ? "book" : "books"}, ${done} finished`;
  filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleIn.value.trim().replace(/\s+/g, " "), author = authorIn.value.trim().replace(/\s+/g, " ") || "Unknown author";
  errorEl.textContent = "";
  if (!title) { errorEl.textContent = "Please enter a book title."; titleIn.setAttribute("aria-invalid", "true"); titleIn.focus(); return; }
  titleIn.removeAttribute("aria-invalid");
  if (books.some((b) => b.title.toLowerCase() === title.toLowerCase() && b.author.toLowerCase() === author.toLowerCase())) { errorEl.textContent = "That book is already in your list."; return; }
  books.push({ id: nextId++, title, author, status: "to-read" });
  form.reset(); titleIn.focus(); render();
});
list.addEventListener("change", (event) => {
  const sel = event.target.closest("select"); if (!sel) return;
  const book = books.find((b) => b.id === Number(sel.closest("li").dataset.id));
  if (book) { book.status = sel.value; render(); }
});
list.addEventListener("click", (event) => {
  const btn = event.target.closest('button[data-action="remove"]'); if (!btn) return;
  books = books.filter((b) => b.id !== Number(btn.closest("li").dataset.id));
  render();
});
filterBar.addEventListener("click", (event) => { const b = event.target.closest("button[data-filter]"); if (b) { filter = b.dataset.filter; render(); } });
render();
