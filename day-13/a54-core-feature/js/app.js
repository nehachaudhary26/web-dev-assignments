// StudyTrack app wiring. Lifecycle: load -> update -> save -> render
(function () {
  const U = StudyUtils, S = StudyState, R = StudyRender;
  const store = StorageHelper.createStorage("studytrack");
  const $ = (id) => document.getElementById(id);
  const FIELDS = ["title", "subject", "dueDate", "priority"];

  let tasks = S.normalizeTasks(store.get("tasks", []));          // LOAD (validated)
  let filters = { subject: "all", status: "all", query: "" };
  let editingId = null;
  let theme = store.get("theme", "light") === "dark" ? "dark" : "light";

  function say(text, ok = true) { const s = $("status"); s.textContent = text; s.className = "status " + (ok ? "ok" : "error"); }
  function save() { if (!store.set("tasks", tasks)) say("Could not save: browser storage is unavailable. Changes last until you close the tab.", false); }
  function commit(next) { tasks = next; save(); render(); }      // UPDATE -> SAVE -> RENDER

  function render() {
    const today = U.todayISO();
    const subjects = S.getSubjects(tasks);
    R.renderOptions($("filter-subject"), subjects, "All subjects", filters.subject);
    filters.subject = $("filter-subject").value;
    R.renderDatalist($("subject-options"), subjects);
    const visible = S.sortTasks(S.filterTasks(tasks, filters, today));
    R.renderTaskList($("task-list"), visible, today, editingId);
    $("empty").hidden = visible.length > 0;
    $("empty").textContent = tasks.length ? "No tasks match these filters." : "No tasks yet. Add your first study task.";
    const st = S.getStats(tasks, today);
    $("stat-total").textContent = st.total; $("stat-done").textContent = st.done; $("stat-active").textContent = st.active; $("stat-overdue").textContent = st.overdue;
    $("progress").value = st.percent;
    $("progress-text").textContent = `${st.percent}% complete` + (st.dueToday ? ` | ${U.pluralize(st.dueToday, "task")} due today` : "");
    $("clear-done").hidden = st.done === 0;
    document.body.classList.toggle("dark", theme === "dark");
    $("theme-btn").setAttribute("aria-pressed", String(theme === "dark"));
    $("theme-btn").textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }

  function showErrors(errors) {
    let first = null;
    FIELDS.forEach((f) => {
      const input = $(f), msg = $(f + "-error");
      msg.textContent = errors[f] || "";
      if (errors[f]) { input.setAttribute("aria-invalid", "true"); first = first || input; } else input.removeAttribute("aria-invalid");
    });
    if (first) first.focus();
  }
  function leaveEditMode() {
    editingId = null; $("task-form").reset(); $("priority").value = "medium";
    $("form-heading").textContent = "Add a task"; $("submit-btn").textContent = "Add task"; $("cancel-edit").hidden = true;
  }

  $("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = {}; FIELDS.forEach((f) => { input[f] = $(f).value; });
    const result = editingId ? S.updateTask(tasks, editingId, input) : S.addTask(tasks, input);
    if (!result.ok) { showErrors(result.errors); if (result.errors.general) say(result.errors.general, false); return; }
    showErrors({});
    const wasEditing = !!editingId;
    leaveEditMode(); commit(result.tasks);
    say(wasEditing ? "Task updated." : "Task added.");
    $("title").focus();
  });
  $("cancel-edit").addEventListener("click", () => { showErrors({}); leaveEditMode(); render(); say("Edit cancelled."); });

  const idOf = (node) => node.closest("li").dataset.id;
  $("task-list").addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    const r = S.toggleTask(tasks, idOf(e.target)); if (r.ok) commit(r.tasks);
  });
  $("task-list").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-action]"); if (!b) return;
    const id = idOf(b), task = tasks.find((t) => t.id === id); if (!task) return;
    if (b.dataset.action === "delete") {
      if (window.confirm(`Delete "${task.title}"?`)) { const r = S.deleteTask(tasks, id); if (r.ok) { if (editingId === id) leaveEditMode(); commit(r.tasks); say("Task deleted."); } }
    } else if (b.dataset.action === "edit") {
      editingId = id;
      FIELDS.forEach((f) => { $(f).value = task[f]; });
      $("form-heading").textContent = "Edit task"; $("submit-btn").textContent = "Save changes"; $("cancel-edit").hidden = false;
      render(); $("title").focus(); $("task-form").scrollIntoView({ block: "nearest" });
    }
  });

  $("filter-subject").addEventListener("change", (e) => { filters.subject = e.target.value; render(); });
  $("filter-status").addEventListener("change", (e) => { filters.status = e.target.value; render(); });
  $("filter-query").addEventListener("input", U.debounce((e) => { filters.query = e.target.value; render(); }, 150));
  $("clear-done").addEventListener("click", () => { if (window.confirm("Remove all completed tasks?")) { commit(S.clearCompleted(tasks).tasks); say("Completed tasks removed."); } });
  $("theme-btn").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; store.set("theme", theme); render(); });
  $("export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), tasks }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "studytrack-export.json";
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    say("Exported studytrack-export.json");
  });
  render();                                                      // first RENDER
})();
