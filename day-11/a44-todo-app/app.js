// To-do app UI. Cycle: load -> update (core functions) -> save -> render.
// Persistence switches on automatically when storage.js (StorageHelper) is loaded (see Assignment 49).
(function () {
  const core = TodoCore;
  const store = typeof StorageHelper !== "undefined" ? StorageHelper.createStorage("todo-app") : null;
  const FILTERS = ["all", "active", "completed"];
  let todos = store ? core.normalizeTodos(store.get("todos", [])) : [];
  let filter = store && FILTERS.includes(store.get("filter", "all")) ? store.get("filter", "all") : "all";
  let editingId = null;

  const $ = (id) => document.getElementById(id);
  const form = $("todo-form"), input = $("todo-input"), list = $("todo-list"), emptyEl = $("empty"), countEl = $("count"), msg = $("message");
  const filterBar = document.querySelector(".filters");

  function say(text, ok) { msg.textContent = text; msg.className = ok ? "ok" : "error"; }
  function save() { if (store) { store.set("todos", todos); store.set("filter", filter); } }
  function commit(next) { todos = next; save(); render(); }
  function apply(result, okText) { if (!result.ok) { say(result.error, false); return false; } commit(result.todos); say(okText, true); return true; }

  function button(text, action, cls, label) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = text; b.dataset.action = action;
    if (cls) b.className = cls;
    if (label) b.setAttribute("aria-label", label);
    return b;
  }
  function buildItem(t) {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    li.className = "todo" + (t.done ? " is-done" : "");
    if (t.id === editingId) {
      const edit = document.createElement("input");
      edit.className = "edit-input"; edit.value = t.text; edit.maxLength = 120; edit.setAttribute("aria-label", "Edit task text");
      li.append(edit, button("Save", "save"), button("Cancel", "cancel", "ghost"));
      return li;
    }
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = t.done; cb.setAttribute("aria-label", `Mark "${t.text}" as ${t.done ? "not done" : "done"}`);
    const text = document.createElement("span"); text.className = "text"; text.textContent = t.text;
    li.append(cb, text, button("Edit", "edit", "ghost", `Edit "${t.text}"`), button("Delete", "delete", "ghost", `Delete "${t.text}"`));
    return li;
  }
  function render() {
    const visible = core.filterTodos(todos, filter);
    list.replaceChildren(...visible.map(buildItem));
    emptyEl.hidden = visible.length > 0;
    const left = core.countActive(todos);
    countEl.textContent = `${left} ${left === 1 ? "item" : "items"} left`;
    $("clear-completed").hidden = !todos.some((t) => t.done);
    filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
    const ei = list.querySelector(".edit-input"); if (ei) { ei.focus(); ei.select(); }
  }
  const idOf = (el) => el.closest("li").dataset.id;

  form.addEventListener("submit", (e) => { e.preventDefault(); if (apply(core.addTodo(todos, input.value), "Task added.")) input.value = ""; input.focus(); });
  list.addEventListener("change", (e) => { if (e.target.type === "checkbox") apply(core.toggleTodo(todos, idOf(e.target)), "Task updated."); });
  list.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-action]"); if (!b) return;
    const id = idOf(b), action = b.dataset.action;
    if (action === "delete") apply(core.deleteTodo(todos, id), "Task deleted.");
    else if (action === "edit") { editingId = id; render(); }
    else if (action === "cancel") { editingId = null; render(); }
    else if (action === "save") { const v = b.closest("li").querySelector(".edit-input").value; if (apply(core.editTodo(todos, id, v), "Task saved.")) editingId = null, render(); }
  });
  list.addEventListener("keydown", (e) => {
    if (!e.target.classList.contains("edit-input")) return;
    if (e.key === "Enter") e.target.closest("li").querySelector('[data-action="save"]').click();
    if (e.key === "Escape") { editingId = null; render(); }
  });
  filterBar.addEventListener("click", (e) => { const b = e.target.closest("button[data-filter]"); if (b) { filter = b.dataset.filter; save(); render(); } });
  $("clear-completed").addEventListener("click", () => apply(core.clearCompleted(todos), "Completed tasks cleared."));
  render();
})();
