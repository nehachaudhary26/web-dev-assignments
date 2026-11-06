// DOM rendering helpers. Only createElement/textContent are used (no innerHTML).
(function (root) {
  const U = root.StudyUtils;
  const LABEL = { low: "Low", medium: "Medium", high: "High" };
  function el(tag, className, text) { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; }
  function actionButton(text, action, label) { const b = el("button", "btn small ghost", text); b.type = "button"; b.dataset.action = action; b.setAttribute("aria-label", label); return b; }

  function buildTask(task, today, isEditing) {
    const overdue = !task.done && task.dueDate && task.dueDate < today;
    const li = el("li", "task" + (task.done ? " is-done" : "") + (overdue ? " is-overdue" : "") + (isEditing ? " is-editing" : ""));
    li.dataset.id = task.id;
    const cb = el("input"); cb.type = "checkbox"; cb.checked = task.done;
    cb.setAttribute("aria-label", `Mark "${task.title}" as ${task.done ? "not done" : "done"}`);
    const body = el("div", "task-body");
    body.append(el("strong", "task-title", task.title));
    const meta = el("div", "meta");
    meta.append(el("span", "badge subject", task.subject), el("span", `badge prio-${task.priority}`, LABEL[task.priority]));
    if (task.dueDate) meta.append(el("span", "due", (overdue ? "Overdue: " : "Due ") + U.formatDate(task.dueDate)));
    body.append(meta);
    const actions = el("div", "task-actions");
    actions.append(actionButton("Edit", "edit", `Edit "${task.title}"`), actionButton("Delete", "delete", `Delete "${task.title}"`));
    li.append(cb, body, actions);
    return li;
  }
  function renderTaskList(container, tasks, today, editingId) { container.replaceChildren(...tasks.map((t) => buildTask(t, today, t.id === editingId))); }
  function renderOptions(select, values, firstLabel, selected) {
    const opts = [];
    if (firstLabel) { const o = el("option", "", firstLabel); o.value = "all"; opts.push(o); }
    values.forEach((v) => { const o = el("option", "", v); o.value = v; opts.push(o); });
    select.replaceChildren(...opts);
    select.value = values.includes(selected) ? selected : "all";
  }
  function renderDatalist(list, values) { list.replaceChildren(...values.map((v) => { const o = el("option"); o.value = v; return o; })); }
  root.StudyRender = { buildTask, renderTaskList, renderOptions, renderDatalist };
})(typeof self !== "undefined" ? self : this);
