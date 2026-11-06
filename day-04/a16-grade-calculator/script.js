// Assignment 16: Grade calculator using conditional statements
function getGrade(percentage) {
  if (typeof percentage !== "number" || Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
    return "Invalid marks";
  }
  if (percentage >= 90) return "A+";
  else if (percentage >= 80) return "A";
  else if (percentage >= 70) return "B";
  else if (percentage >= 60) return "C";
  else if (percentage >= 50) return "D";
  else return "F";
}

function getRemark(grade) {
  switch (grade) {
    case "A+": return "Outstanding";
    case "A": return "Excellent";
    case "B": return "Very good";
    case "C": return "Good";
    case "D": return "Pass";
    case "F": return "Fail - needs improvement";
    default: return "Please enter marks between 0 and 100";
  }
}

function calculateResult(name, marks, maxMarks = 100) {
  const percentage = (marks / maxMarks) * 100;
  const grade = getGrade(percentage);
  const status = percentage >= 50 ? "PASS" : "FAIL";
  return `${name}: ${marks}/${maxMarks} = ${percentage.toFixed(1)}% | Grade ${grade} | ${status} | ${getRemark(grade)}`;
}

console.log("=== Grade Calculator ===");
console.log(calculateResult("Student 1", 95));
console.log(calculateResult("Student 2", 82));
console.log(calculateResult("Student 3", 71));
console.log(calculateResult("Student 4", 64));
console.log(calculateResult("Student 5", 55));
console.log(calculateResult("Student 6", 38));
console.log(calculateResult("Student 7", 45, 50));
console.log("Invalid input test:", getGrade(120), "|", getGrade("abc"), "|", getGrade(-5));
