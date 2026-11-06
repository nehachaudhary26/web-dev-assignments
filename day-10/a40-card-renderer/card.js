// Assignment 40: reusable card-rendering function (safe DOM building, no innerHTML)
function safeUrl(url) {
  const value = String(url ?? "").trim();
  return /^(https?:\/\/|mailto:|#)/i.test(value) ? value : "#"; // blocks javascript: URLs
}
function renderCard({ title, description = "", tags = [], icon = "", url = "", linkText = "Learn more", onSelect } = {}) {
  if (typeof title !== "string" || !title.trim()) throw new TypeError("renderCard needs a title");
  const card = document.createElement("article");
  card.className = "card";
  if (icon) {
    const i = document.createElement("div");
    i.className = "card-icon"; i.setAttribute("aria-hidden", "true"); i.textContent = icon;
    card.append(i);
  }
  const h = document.createElement("h3"); h.textContent = title.trim(); card.append(h);
  if (description) { const p = document.createElement("p"); p.textContent = description; card.append(p); }
  if (tags.length) {
    const ul = document.createElement("ul"); ul.className = "tags";
    tags.forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.append(li); });
    card.append(ul);
  }
  if (url) {
    const a = document.createElement("a");
    a.href = safeUrl(url); a.textContent = linkText; a.rel = "noopener noreferrer";
    if (a.href.startsWith("http")) a.target = "_blank";
    card.append(a);
  }
  if (typeof onSelect === "function") {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = "Details";
    b.addEventListener("click", () => onSelect({ title, description, tags }));
    card.append(b);
  }
  return card;
}
function renderCards(container, items, options = {}) {
  if (!(container instanceof Element)) throw new TypeError("container must be an element");
  if (!items.length) {
    const p = document.createElement("p"); p.className = "empty"; p.textContent = "Nothing to show yet.";
    container.replaceChildren(p);
    return;
  }
  container.replaceChildren(...items.map((item) => renderCard({ ...options, ...item })));
}
