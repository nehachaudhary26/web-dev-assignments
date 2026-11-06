// Assignment 47: reusable storage helper module (works in the browser and in Node)
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.StorageHelper = factory();
})(typeof self !== "undefined" ? self : this, function () {
  function memoryBackend() {
    const m = new Map();
    return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; } };
  }
  function defaultBackend() { // localStorage can be blocked (private mode, policy), so fall back to memory
    try { if (typeof localStorage !== "undefined") { localStorage.setItem("__probe", "1"); localStorage.removeItem("__probe"); return localStorage; } } catch (e) { /* fall through */ }
    return memoryBackend();
  }
  function createStorage(namespace, backend) {
    if (typeof namespace !== "string" || !namespace.trim()) throw new TypeError("namespace must be a non-empty string");
    const store = backend || defaultBackend();
    const k = (key) => `${namespace}:${key}`;
    return {
      get(key, fallback = null) { try { const raw = store.getItem(k(key)); return raw === null ? fallback : JSON.parse(raw); } catch (e) { return fallback; } },
      set(key, value) { if (value === undefined) return false; try { store.setItem(k(key), JSON.stringify(value)); return true; } catch (e) { return false; } },
      remove(key) { try { store.removeItem(k(key)); return true; } catch (e) { return false; } },
      has(key) { try { return store.getItem(k(key)) !== null; } catch (e) { return false; } },
      keys() { const out = []; try { for (let i = 0; i < store.length; i++) { const key = store.key(i); if (key && key.startsWith(namespace + ":")) out.push(key.slice(namespace.length + 1)); } } catch (e) { /* ignore */ } return out; },
      clear() { this.keys().forEach((key) => this.remove(key)); },
    };
  }
  return { createStorage, memoryBackend };
});
