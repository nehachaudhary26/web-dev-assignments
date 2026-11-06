// Quiz logic (no DOM): questions, scoring and feedback
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Quiz = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const QUESTIONS = [
    { q: "Which keyword declares a block-scoped variable that can be reassigned?", options: ["var", "let", "const", "function"], answer: 1 },
    { q: "What does typeof null return in JavaScript?", options: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""], answer: 2 },
    { q: "Which array method adds an item to the end?", options: ["pop", "push", "shift", "slice"], answer: 1 },
    { q: "Which HTML element is meant for the main navigation links?", options: ["<menu>", "<aside>", "<nav>", "<section>"], answer: 2 },
    { q: "What does \"5\" + 3 evaluate to?", options: ["8", "\"53\"", "NaN", "Error"], answer: 1 },
    { q: "Which CSS declaration turns an element into a flex container?", options: ["position: flex", "display: flex", "flex: container", "layout: flex"], answer: 1 },
    { q: "In what form does localStorage store values?", options: ["Numbers", "Objects", "Strings", "Booleans"], answer: 2 },
    { q: "Which property sets text on an element without parsing it as HTML?", options: ["innerHTML", "outerHTML", "textContent", "insertAdjacentHTML"], answer: 2 },
  ];
  function validateQuestions(list) {
    return Array.isArray(list) && list.length > 0 && list.every((x) => typeof x.q === "string" && x.q && Array.isArray(x.options) && x.options.length >= 2 && new Set(x.options).size === x.options.length && Number.isInteger(x.answer) && x.answer >= 0 && x.answer < x.options.length);
  }
  function calculateScore(questions, answers) {
    const total = questions.length;
    const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
    return { correct, total, percent: total ? Math.round((correct / total) * 100) : 0 };
  }
  function getFeedback(percent) {
    if (percent >= 90) return "Excellent work!";
    if (percent >= 70) return "Good job. A little more practice and you will ace it.";
    if (percent >= 50) return "Not bad. Review the questions you missed.";
    return "Keep going. Revisit the basics and try again.";
  }
  return { QUESTIONS, validateQuestions, calculateScore, getFeedback };
});
