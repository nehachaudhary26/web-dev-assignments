// Assignment 42: contact form that shows a submission summary (textContent only)
const form = document.getElementById("contact-form");
const fields = ["name", "email", "phone", "subject", "message", "agree"];
const summary = document.getElementById("summary"), summaryList = document.getElementById("summary-list");
const LABELS = { name: "Name", email: "Email", phone: "Phone", subject: "Subject", message: "Message" };

function readForm() {
  const v = {};
  fields.forEach((f) => { const el = document.getElementById(f); v[f] = f === "agree" ? el.checked : el.value; });
  return v;
}
function showErrors(errors) {
  let firstInvalid = null;
  fields.forEach((f) => {
    const el = document.getElementById(f), msg = document.getElementById(f + "-error");
    msg.textContent = errors[f] || "";
    if (errors[f]) { el.setAttribute("aria-invalid", "true"); firstInvalid ??= el; } else el.removeAttribute("aria-invalid");
  });
  if (firstInvalid) firstInvalid.focus();
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { valid, errors, data } = validateContact(readForm());
  showErrors(errors);
  if (!valid) { summary.hidden = true; return; }
  summaryList.replaceChildren();
  Object.keys(LABELS).forEach((key) => {
    const dt = document.createElement("dt"), dd = document.createElement("dd");
    dt.textContent = LABELS[key]; dd.textContent = data[key] || "(not provided)";
    summaryList.append(dt, dd);
  });
  summary.hidden = false;
  form.reset();
});
