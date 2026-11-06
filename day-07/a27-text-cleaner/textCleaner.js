// Assignment 27: text-cleaning utility for form inputs
const collapseSpaces = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const stripTags = (s) => String(s ?? "").replace(/<[^>]*>/g, "");
function toTitleCase(s) { return collapseSpaces(s).toLowerCase().split(" ").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" "); }
const cleanName = (s) => toTitleCase(stripTags(s).replace(/[^\p{L}\s.'-]/gu, ""));
const cleanEmail = (s) => collapseSpaces(s).replace(/\s/g, "").toLowerCase();
function cleanPhone(s) {
  const raw = String(s ?? "").trim();
  const digits = raw.replace(/\D/g, "");
  return raw.startsWith("+") ? "+" + digits : digits;
}
const slugify = (s) => collapseSpaces(stripTags(s)).toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/ +/g, "-").replace(/-+/g, "-");
function truncate(s, max = 100) { const t = collapseSpaces(s); return t.length <= max ? t : t.slice(0, max - 3).trimEnd() + "..."; }
const cleanMessage = (s) => collapseSpaces(stripTags(s));
function cleanForm({ name, email, phone, message } = {}) {
  return { name: cleanName(name), email: cleanEmail(email), phone: cleanPhone(phone), message: cleanMessage(message) };
}
const textCleaner = { collapseSpaces, stripTags, toTitleCase, cleanName, cleanEmail, cleanPhone, slugify, truncate, cleanMessage, cleanForm };
function demo() {
  console.log("cleanName:", JSON.stringify(cleanName("   aISH    kALRA  ")));
  console.log("cleanEmail:", JSON.stringify(cleanEmail("  Aish.Kalra @ Example.COM ")));
  console.log("cleanPhone:", JSON.stringify(cleanPhone(" +91 98765-43210 ")));
  console.log("stripTags:", JSON.stringify(stripTags("Hi <b>there</b><script>alert(1)</script>!")));
  console.log("slugify:", JSON.stringify(slugify("  My First   Blog Post!! ")));
  console.log("truncate:", JSON.stringify(truncate("This is a very long message that should be shortened for preview", 30)));
  console.log("cleanForm:", JSON.stringify(cleanForm({ name: "  riya   SHARMA ", email: " RIYA@Mail.com ", phone: "(987) 654-3210", message: "  Hello   <i>team</i>  " })));
}
if (typeof module !== "undefined") module.exports = textCleaner;
if (typeof module === "undefined" || require.main === module) demo();
