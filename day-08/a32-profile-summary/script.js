// Assignment 32: profile-summary generator using Object utilities
const profile = Object.freeze({
  name: "Aish Kalra", role: "BCA (Artificial Intelligence) Student", university: "Invertis University",
  semester: 3, location: "Baheri, Uttar Pradesh", email: "kalraaish261@gmail.com",
  skills: { programming: ["Python", "C", "Java"], data: ["SQL", "Pandas", "NumPy"], ai: ["Scikit-learn", "RAG", "LLM APIs"] },
  projects: ["ExamGeniusAI", "House Price Prediction"],
});
const pick = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));
const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
const mergeProfile = (base, updates) => Object.assign({}, base, updates); // returns a new object
const countSkills = (p) => Object.values(p.skills).reduce((n, list) => n + list.length, 0);
const toTitle = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
function generateSummary(p) {
  if (!p || typeof p !== "object") throw new TypeError("profile object required");
  const lines = [`${p.name} - ${p.role}`, `${p.university}, semester ${p.semester} | ${p.location}`];
  for (const [area, list] of Object.entries(p.skills ?? {})) lines.push(`${toTitle(area)}: ${list.join(", ")}`);
  lines.push(`Total skills: ${countSkills(p)} across ${Object.keys(p.skills ?? {}).length} areas`);
  lines.push(`Projects (${p.projects?.length ?? 0}): ${(p.projects ?? []).join("; ")}`);
  return lines.join("\n");
}
function demo() {
  console.log(generateSummary(profile));
  console.log("\npick(name, role):", JSON.stringify(pick(profile, ["name", "role"])));
  console.log("Keys without skills/projects:", Object.keys(omit(profile, ["skills", "projects"])).join(", "));
  const updated = mergeProfile(profile, { semester: 4 });
  console.log("\nOriginal semester:", profile.semester, "| Updated copy:", updated.semester);
  try { profile.semester = 99; } catch (e) { /* strict mode would throw */ } // ignored: object is frozen
  console.log("After trying to change frozen profile:", profile.semester);
  console.log("Is frozen?", Object.isFrozen(profile), "| Has 'email'?", Object.hasOwn(profile, "email"));
}
if (typeof module !== "undefined") module.exports = { profile, pick, omit, mergeProfile, countSkills, generateSummary };
if (typeof module === "undefined" || require.main === module) demo();
