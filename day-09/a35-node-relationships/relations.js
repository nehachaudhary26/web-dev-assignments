// Shows the relationships of a clicked element using textContent only
const demo = document.getElementById("tree-demo");
const info = document.getElementById("info");
let selected = null;
const label = (el) => (el ? `<${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.classList.length ? "." + [...el.classList].join(".") : ""}>` : "none");

function addRow(term, value) {
  const dt = document.createElement("dt"); dt.textContent = term;
  const dd = document.createElement("dd"); dd.textContent = value;
  info.append(dt, dd);
}
demo.addEventListener("click", (event) => {
  const el = event.target;
  if (selected) selected.classList.remove("selected");
  selected = el; el.classList.add("selected");
  info.replaceChildren();
  const ancestors = []; for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) ancestors.push(label(a));
  addRow("Node", label(el));
  addRow("Parent", label(el.parentElement));
  addRow("Ancestors (nearest first)", ancestors.join(" > ") || "none");
  addRow("Children (elements)", el.children.length ? [...el.children].map(label).join(", ") : "none (leaf element)");
  addRow("Child nodes (incl. text)", String(el.childNodes.length));
  addRow("First / last child", `${label(el.firstElementChild)} / ${label(el.lastElementChild)}`);
  addRow("Previous sibling", label(el.previousElementSibling));
  addRow("Next sibling", label(el.nextElementSibling));
  addRow("Descendant elements", String(el.querySelectorAll("*").length));
});
