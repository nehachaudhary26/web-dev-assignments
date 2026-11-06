// Assignment 46: persistent settings panel. Lifecycle: load -> update -> save -> render
const DEFAULTS = { displayName: "", theme: "light", fontSize: 16, language: "en", notifications: false };
const GREETING = { en: "Hello", hi: "\u0928\u092E\u0938\u094D\u0924\u0947" };
const store = StorageHelper.createStorage("settings-panel");
const $ = (id) => document.getElementById(id);

function sanitize(raw) { // never trust stored data
  const s = { ...DEFAULTS };
  if (raw && typeof raw === "object") {
    if (typeof raw.displayName === "string") s.displayName = raw.displayName.replace(/\s+/g, " ").trim().slice(0, 30);
    if (["light", "dark"].includes(raw.theme)) s.theme = raw.theme;
    const size = Number(raw.fontSize);
    if (Number.isFinite(size)) s.fontSize = Math.min(22, Math.max(14, Math.round(size)));
    if (["en", "hi"].includes(raw.language)) s.language = raw.language;
    if (typeof raw.notifications === "boolean") s.notifications = raw.notifications;
  }
  return s;
}
let settings = sanitize(store.get("settings"));                 // 1. LOAD

function render() {                                              // 4. RENDER
  document.body.classList.toggle("dark", settings.theme === "dark");
  document.documentElement.style.setProperty("--font-size", settings.fontSize + "px");
  $("displayName").value = settings.displayName; $("theme").value = settings.theme;
  $("fontSize").value = settings.fontSize; $("fontSizeOut").textContent = settings.fontSize;
  $("language").value = settings.language; $("notifications").checked = settings.notifications;
  $("preview").textContent = `${GREETING[settings.language]}, ${settings.displayName || "friend"}!`;
  $("state").textContent = `Theme: ${settings.theme} | Font: ${settings.fontSize}px | Notifications: ${settings.notifications ? "on" : "off"}`;
}
function readForm() {
  return { displayName: $("displayName").value, theme: $("theme").value, fontSize: $("fontSize").value, language: $("language").value, notifications: $("notifications").checked };
}
$("settings-form").addEventListener("input", () => {
  settings = sanitize(readForm());                               // 2. UPDATE
  const saved = store.set("settings", settings);                 // 3. SAVE
  $("status").textContent = saved ? "Saved." : "Could not save (storage unavailable). Changes last until you close the tab.";
  render();
});
$("reset").addEventListener("click", () => { store.remove("settings"); settings = { ...DEFAULTS }; $("status").textContent = "Settings reset."; render(); });
render();
