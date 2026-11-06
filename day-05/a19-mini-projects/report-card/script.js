// Mini Project 1: Report card generator (loops + conditionals + objects)
const students = [
  { name: "Aish", marks: { Maths: 92, Python: 96, English: 85, DBMS: 88 } },
  { name: "Riya", marks: { Maths: 67, Python: 74, English: 70, DBMS: 61 } },
  { name: "Karan", marks: { Maths: 45, Python: 52, English: 38, DBMS: 49 } },
];
function grade(p) { return p >= 90 ? "A+" : p >= 80 ? "A" : p >= 70 ? "B" : p >= 60 ? "C" : p >= 50 ? "D" : "F"; }

console.log("=== Report Cards ===");
for (const s of students) {
  let total = 0, count = 0, failed = [];
  for (const subject in s.marks) {
    total += s.marks[subject]; count++;
    if (s.marks[subject] < 40) failed.push(subject);
  }
  const avg = total / count;
  console.log(`${s.name}: total ${total}/${count * 100}, average ${avg.toFixed(1)}%, grade ${grade(avg)}, ` +
    (failed.length ? `needs improvement in ${failed.join(", ")}` : "passed all subjects"));
}
