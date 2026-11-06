// Assignment 15: Student profile using variables of different data types
const fullName = "Aish Kalra";            // string
let age = 19;                              // number (integer) - update as needed
const cgpa = 8.7;                          // number (decimal) - sample value
let isEnrolled = true;                     // boolean
let hostelRoom;                            // undefined (declared, no value)
let scholarship = null;                    // null (intentionally empty)
const skills = ["Python", "SQL", "Scikit-learn"]; // array
const university = {                       // object
  name: "Invertis University",
  course: "BCA (Artificial Intelligence)",
  semester: 3,
};
const id = Symbol("studentId");            // symbol
const bigNumber = 9007199254740993n;       // bigint

console.log("=== Student Profile ===");
console.log("Name:", fullName, "| type:", typeof fullName);
console.log("Age:", age, "| type:", typeof age);
console.log("CGPA:", cgpa, "| type:", typeof cgpa);
console.log("Enrolled:", isEnrolled, "| type:", typeof isEnrolled);
console.log("Hostel room:", hostelRoom, "| type:", typeof hostelRoom);
console.log("Scholarship:", scholarship, "| type:", typeof scholarship, "(typeof null is a known JS quirk)");
console.log("Skills:", skills.join(", "), "| isArray:", Array.isArray(skills));
console.log("University:", university.name, "-", university.course, "- Semester", university.semester);
console.log("Symbol:", id.toString(), "| type:", typeof id);
console.log("BigInt:", bigNumber.toString(), "| type:", typeof bigNumber);

// Type conversion examples
console.log("\n=== Type conversion ===");
console.log("Number('42') =", Number("42"));
console.log("String(age) =", String(age), "-> type", typeof String(age));
console.log("'5' + 3 =", "5" + 3, "| '5' - 3 =", "5" - 3);
console.log("Boolean('') =", Boolean(""), "| Boolean('hi') =", Boolean("hi"));

// Template literal summary
console.log(`\nSummary: ${fullName} is a semester ${university.semester} ${university.course} student.`);
