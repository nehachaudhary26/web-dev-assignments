// To-do logic: pure functions, no DOM, never mutates its inputs
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TodoCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const MAX = 100;
  const makeId = () => Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  const fail = (todos, error) => ({ ok: false, error, todos });
  function checkText(text) {
    const t = String(text ?? "").replace(/\s+/g, " ").trim();
    if (!t) return { error: "Please type a task first." };
    if (t.length > MAX) return { error: `Tasks can be up to ${MAX} characters.` };
    return { text: t };
  }
  function addTodo(todos, text) {
    const c = checkText(text); if (c.error) return fail(todos, c.error);
    if (todos.some((t) => t.text.toLowerCase() === c.text.toLowerCase() && !t.done)) return fail(todos, "That task is already on your list.");
    return { ok: true, todos: [...todos, { id: makeId(), text: c.text, done: false }] };
  }
  function toggleTodo(todos, id) {
    if (!todos.some((t) => t.id === id)) return fail(todos, "Task not found.");
    return { ok: true, todos: todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) };
  }
  function editTodo(todos, id, text) {
    if (!todos.some((t) => t.id === id)) return fail(todos, "Task not found.");
    const c = checkText(text); if (c.error) return fail(todos, c.error);
    return { ok: true, todos: todos.map((t) => (t.id === id ? { ...t, text: c.text } : t)) };
  }
  function deleteTodo(todos, id) {
    if (!todos.some((t) => t.id === id)) return fail(todos, "Task not found.");
    return { ok: true, todos: todos.filter((t) => t.id !== id) };
  }
  const clearCompleted = (todos) => ({ ok: true, todos: todos.filter((t) => !t.done) });
  function filterTodos(todos, filter) {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "completed") return todos.filter((t) => t.done);
    return todos;
  }
  const countActive = (todos) => todos.filter((t) => !t.done).length;
  function normalizeTodos(data) { // guards against corrupted saved data
    if (!Array.isArray(data)) return [];
    return data.filter((t) => t && typeof t === "object" && typeof t.id === "string" && typeof t.text === "string" && t.text.trim() && typeof t.done === "boolean")
      .map((t) => ({ id: t.id, text: t.text.trim().slice(0, MAX), done: t.done }));
  }
  return { addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted, filterTodos, countActive, normalizeTodos, MAX };
});
