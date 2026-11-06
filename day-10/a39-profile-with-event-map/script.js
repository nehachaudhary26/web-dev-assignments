// Assignment 38 (and 39): interactive profile with accessible state classes
const $ = (sel) => document.querySelector(sel);
const statusEl = $("#status");
function setStatus(message) { statusEl.textContent = message; } // announced by aria-live

// 1. Follow button: aria-pressed + is-following class
const followBtn = $("#follow-btn");
followBtn.addEventListener("click", () => {
  const following = followBtn.getAttribute("aria-pressed") !== "true";
  followBtn.setAttribute("aria-pressed", String(following));
  followBtn.classList.toggle("is-following", following);
  followBtn.textContent = following ? "Following" : "Follow";
  setStatus(following ? "You are now following Aish." : "You unfollowed Aish.");
});

// 2. Theme toggle
const themeBtn = $("#theme-btn");
themeBtn.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeBtn.setAttribute("aria-pressed", String(dark));
  themeBtn.textContent = dark ? "Light mode" : "Dark mode";
  setStatus(dark ? "Dark mode on." : "Light mode on.");
});

// 3. Tabs (click + arrow keys)
const tablist = $(".tabs");
const tabs = [...tablist.querySelectorAll('[role="tab"]')];
function selectTab(tab, moveFocus = false) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    panel.hidden = !on;
    panel.classList.toggle("is-active", on);
  });
  if (moveFocus) tab.focus();
  setStatus(`${tab.textContent} section shown.`);
}
tablist.addEventListener("click", (event) => {
  const tab = event.target.closest('[role="tab"]');
  if (tab) selectTab(tab);
});
tablist.addEventListener("keydown", (event) => {
  const current = tabs.indexOf(document.activeElement);
  if (current === -1) return;
  let next = null;
  if (event.key === "ArrowRight") next = tabs[(current + 1) % tabs.length];
  else if (event.key === "ArrowLeft") next = tabs[(current - 1 + tabs.length) % tabs.length];
  else if (event.key === "Home") next = tabs[0];
  else if (event.key === "End") next = tabs[tabs.length - 1];
  if (next) { event.preventDefault(); selectTab(next, true); }
});

// 4. Skill filter chips
const filters = $(".filters");
const skillItems = [...document.querySelectorAll("#skill-list li")];
filters.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;
  const filter = chip.dataset.filter;
  filters.querySelectorAll(".chip").forEach((c) => {
    const on = c === chip;
    c.classList.toggle("is-active", on);
    c.setAttribute("aria-pressed", String(on));
  });
  let visible = 0;
  skillItems.forEach((li) => {
    const show = filter === "all" || li.dataset.category === filter;
    li.hidden = !show;
    if (show) visible++;
  });
  setStatus(`Showing ${visible} ${visible === 1 ? "skill" : "skills"}${filter === "all" ? "" : " in " + chip.textContent}.`);
});
