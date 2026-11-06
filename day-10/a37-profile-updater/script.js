// Assignment 37: profile-content updater WITHOUT unsafe HTML injection
// Rule: user text only goes in through textContent / createElement, never innerHTML.
const $ = (id) => document.getElementById(id);
const nameEl = $("p-name"), roleEl = $("p-role"), bioEl = $("p-bio"), skillsEl = $("p-skills"), statusEl = $("status");
const MAX_SKILLS = 12;

function setStatus(message, type) { statusEl.textContent = message; statusEl.className = type || ""; }

$("edit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("in-name").value.trim(), role = $("in-role").value.trim(), bio = $("in-bio").value.trim(), skill = $("in-skill").value.trim();
  if (!name && !role && !bio && !skill) { setStatus("Enter at least one value to update.", "error"); return; }
  if (name) nameEl.textContent = name;
  if (role) roleEl.textContent = role;
  if (bio) bioEl.textContent = bio;
  if (skill) {
    const exists = [...skillsEl.children].some((li) => li.textContent.toLowerCase() === skill.toLowerCase());
    if (exists) { setStatus(`"${skill}" is already in the list.`, "error"); return; }
    if (skillsEl.children.length >= MAX_SKILLS) { setStatus(`You can add up to ${MAX_SKILLS} skills.`, "error"); return; }
    const li = document.createElement("li");
    li.textContent = skill;
    skillsEl.append(li);
  }
  event.target.reset();
  setStatus("Profile updated.", "ok");
});

// Shows why textContent is safe: the tag is displayed as plain text and never runs
$("xss-test").addEventListener("click", () => {
  roleEl.textContent = '<img src=x onerror="alert(1)"> <script>alert(2)<\/script>';
  setStatus("Unsafe text was shown as plain text and did not run.", "ok");
});
