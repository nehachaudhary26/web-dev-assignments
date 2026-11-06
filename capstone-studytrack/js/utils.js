// Starter utility functions (Assignment 53). Pure functions, no DOM.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.StudyUtils = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const pad = (n) => String(n).padStart(2, "0");

  function isValidISODate(s) { // strict YYYY-MM-DD that is a real calendar date
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
  }
  const todayISO = (date = new Date()) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; // local date
  function formatDate(iso) {
    if (!isValidISODate(iso)) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
  }
  function daysBetween(fromISO, toISO) {
    if (!isValidISODate(fromISO) || !isValidISODate(toISO)) return NaN;
    const t = (s) => { const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
    return Math.round((t(toISO) - t(fromISO)) / 86400000);
  }
  const pluralize = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  function debounce(fn, ms = 200) { let id; return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); }; }
  const makeId = () => Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  return { isValidISODate, todayISO, formatDate, daysBetween, pluralize, clamp, debounce, makeId };
});
