// Pure validation for the contact form (no DOM, so it can be tested in Node)
const SUBJECTS = ["General", "Feedback", "Support", "Collaboration"];
const cleanText = (s) => String(s ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
function validateContact(input = {}) {
  const data = {
    name: cleanText(input.name),
    email: cleanText(input.email).replace(/\s/g, "").toLowerCase(),
    phone: String(input.phone ?? "").replace(/[^\d+]/g, ""),
    subject: cleanText(input.subject),
    message: cleanText(input.message),
    agree: input.agree === true,
  };
  const errors = {};
  if (!data.name) errors.name = "Name is required.";
  else if (data.name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (data.name.length > 50) errors.name = "Name must be 50 characters or fewer.";
  if (!data.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone && !/^(\+91)?[6-9]\d{9}$/.test(data.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!data.subject) errors.subject = "Please choose a subject.";
  else if (!SUBJECTS.includes(data.subject)) errors.subject = "Choose a subject from the list.";
  if (!data.message) errors.message = "Message is required.";
  else if (data.message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (data.message.length > 500) errors.message = "Message must be 500 characters or fewer.";
  if (!data.agree) errors.agree = "You must agree before sending.";
  return { valid: Object.keys(errors).length === 0, errors, data };
}
if (typeof module !== "undefined") module.exports = { validateContact, SUBJECTS };
