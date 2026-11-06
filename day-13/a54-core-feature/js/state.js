// StudyTrack state logic: pure functions, never mutate their inputs, fully testable in Node.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./utils"));
  else root.StudyState = factory(root.StudyUtils);
})(typeof self !== "undefined" ? self : this, function (U) {
  const PRIORITIES = ["low", "medium", "high"];
  const RANK = { low: 1, medium: 2, high: 3 };
  const TITLE_MAX = 80, SUBJECT_MAX = 30;
  const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

  function validateTaskInput(input = {}) {
    const errors = {};
    const title = clean(input.title);
    const subject = clean(input.subject) || "General";
    const dueDate = clean(input.dueDate);
    const priority = clean(input.priority) || "medium";
    if (!title) errors.title = "Title is required.";
    else if (title.length > TITLE_MAX) errors.title = `Title must be ${TITLE_MAX} characters or fewer.`;
    if (subject.length > SUBJECT_MAX) errors.subject = `Subject must be ${SUBJECT_MAX} characters or fewer.`;
    if (!PRIORITIES.includes(priority)) errors.priority = "Choose low, medium or high.";
    if (dueDate && !U.isValidISODate(dueDate)) errors.dueDate = "Enter a valid date.";
    return { valid: Object.keys(errors).length === 0, errors, data: { title, subject, dueDate, priority } };
  }
  const fail = (tasks, errors) => ({ ok: false, errors, tasks });
  const notFound = (tasks) => fail(tasks, { general: "Task not found." });

  function addTask(tasks, input, now = new Date()) {
    const v = validateTaskInput(input);
    if (!v.valid) return fail(tasks, v.errors);
    const task = { id: U.makeId(), ...v.data, done: false, createdAt: now.toISOString() };
    return { ok: true, task, tasks: [...tasks, task] };
  }
  function updateTask(tasks, id, input) {
    if (!tasks.some((t) => t.id === id)) return notFound(tasks);
    const v = validateTaskInput(input);
    if (!v.valid) return fail(tasks, v.errors);
    return { ok: true, tasks: tasks.map((t) => (t.id === id ? { ...t, ...v.data } : t)) };
  }
  function toggleTask(tasks, id) {
    if (!tasks.some((t) => t.id === id)) return notFound(tasks);
    return { ok: true, tasks: tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) };
  }
  function deleteTask(tasks, id) {
    if (!tasks.some((t) => t.id === id)) return notFound(tasks);
    return { ok: true, tasks: tasks.filter((t) => t.id !== id) };
  }
  const clearCompleted = (tasks) => ({ ok: true, tasks: tasks.filter((t) => !t.done) });
  const isOverdue = (task, today) => !task.done && !!task.dueDate && task.dueDate < today; // due today is NOT overdue

  function filterTasks(tasks, { subject = "all", status = "all", query = "" } = {}, today = U.todayISO()) {
    const q = clean(query).toLowerCase();
    return tasks.filter((t) => {
      if (subject !== "all" && t.subject.toLowerCase() !== String(subject).toLowerCase()) return false;
      if (status === "active" && t.done) return false;
      if (status === "done" && !t.done) return false;
      if (status === "overdue" && !isOverdue(t, today)) return false;
      if (q && !(t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))) return false;
      return true;
    });
  }
  function sortTasks(tasks) { // active first, then earliest due (no date last), then higher priority, then oldest
    return [...tasks].sort((a, b) =>
      (a.done - b.done) ||
      ((a.dueDate || "9999-99-99") < (b.dueDate || "9999-99-99") ? -1 : (a.dueDate || "9999-99-99") > (b.dueDate || "9999-99-99") ? 1 : 0) ||
      (RANK[b.priority] - RANK[a.priority]) ||
      (a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0));
  }
  function getStats(tasks, today = U.todayISO()) {
    const total = tasks.length, done = tasks.filter((t) => t.done).length;
    return { total, done, active: total - done, overdue: tasks.filter((t) => isOverdue(t, today)).length, dueToday: tasks.filter((t) => !t.done && t.dueDate === today).length, percent: total ? Math.round((done / total) * 100) : 0 };
  }
  const getSubjects = (tasks) => [...new Set(tasks.map((t) => t.subject))].sort((a, b) => a.localeCompare(b));
  function normalizeTasks(data) { // validate anything loaded from storage
    if (!Array.isArray(data)) return [];
    const out = [];
    for (const t of data) {
      if (!t || typeof t !== "object" || typeof t.id !== "string" || !t.id) continue;
      const v = validateTaskInput(t);
      if (!v.valid) continue;
      out.push({ id: t.id, ...v.data, done: t.done === true, createdAt: typeof t.createdAt === "string" ? t.createdAt : new Date(0).toISOString() });
    }
    return out;
  }
  return { PRIORITIES, validateTaskInput, addTask, updateTask, toggleTask, deleteTask, clearCompleted, isOverdue, filterTasks, sortTasks, getStats, getSubjects, normalizeTasks };
});
