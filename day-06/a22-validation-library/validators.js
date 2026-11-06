// Assignment 22: Validation utility library using guard clauses
// Guard clause = check the bad case first and return/throw early, so the main logic stays flat.
function isNonEmptyString(value) {
  if (typeof value !== "string") return false;
  return value.trim().length > 0;
}
function isEmail(value) {
  if (!isNonEmptyString(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function isPhone(value) {
  if (!isNonEmptyString(value)) return false;
  const digits = value.replace(/[\s-]/g, "");
  return /^(\+91)?[6-9]\d{9}$/.test(digits); // Indian mobile numbers
}
function isPositiveNumber(value) {
  if (typeof value !== "number") return false;
  if (!Number.isFinite(value)) return false;
  return value > 0;
}
function isInRange(value, min, max) {
  if (min > max) throw new RangeError("min cannot be greater than max");
  if (typeof value !== "number" || Number.isNaN(value)) return false;
  return value >= min && value <= max;
}
function hasMinLength(value, min) {
  if (!isNonEmptyString(value)) return false;
  return value.trim().length >= min;
}
function isStrongPassword(value) {
  if (typeof value !== "string") return false;
  if (value.length < 8) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[a-z]/.test(value)) return false;
  if (!/\d/.test(value)) return false;
  return true;
}
function validateUser(user) {
  if (user === null || typeof user !== "object") return { valid: false, errors: ["User data is required"] };
  const errors = [];
  if (!hasMinLength(user.name, 2)) errors.push("Name must be at least 2 characters");
  if (!isEmail(user.email)) errors.push("Email is invalid");
  if (!isPhone(user.phone)) errors.push("Phone must be a valid 10-digit mobile number");
  if (!isInRange(user.age, 16, 100)) errors.push("Age must be between 16 and 100");
  if (!isStrongPassword(user.password)) errors.push("Password needs 8+ chars with upper, lower and a digit");
  return { valid: errors.length === 0, errors };
}
const validators = { isNonEmptyString, isEmail, isPhone, isPositiveNumber, isInRange, hasMinLength, isStrongPassword, validateUser };
function demo() {
  console.log("isEmail('a@b.com'):", isEmail("a@b.com"), "| isEmail('bad@'):", isEmail("bad@"));
  console.log("isPhone('98765 43210'):", isPhone("98765 43210"), "| isPhone('12345'):", isPhone("12345"));
  console.log("validateUser(good):", JSON.stringify(validateUser({ name: "Aish", email: "aish@example.com", phone: "9876543210", age: 19, password: "Learn2026" })));
  console.log("validateUser(bad):", JSON.stringify(validateUser({ name: "A", email: "x", phone: "1", age: 5, password: "weak" })));
  console.log("validateUser(null):", JSON.stringify(validateUser(null)));
}
if (typeof module !== "undefined") module.exports = validators;
if (typeof window !== "undefined") window.validators = validators;
if (typeof module === "undefined" || require.main === module) demo();
