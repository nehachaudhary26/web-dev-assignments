// Quiz controller + view. Flow: render question -> answer saved in state -> next / finish -> result -> save best score
(function () {
  const { QUESTIONS, calculateScore, getFeedback } = Quiz;
  const store = StorageHelper.createStorage("web-quiz");
  const $ = (id) => document.getElementById(id);
  let state = { index: 0, answers: Array(QUESTIONS.length).fill(null) };

  function el(tag, text, cls) { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function showBest() { const best = store.get("best", null); $("best").textContent = best ? `Best score: ${best.correct}/${best.total} (${best.percent}%)` : "No score saved yet."; }

  function renderQuestion() {
    const q = QUESTIONS[state.index], box = $("quiz");
    $("result").hidden = true; box.hidden = false;
    const fs = el("fieldset"), lg = el("legend", q.q);
    fs.append(lg);
    q.options.forEach((opt, i) => {
      const label = el("label", undefined, "option"), r = el("input");
      r.type = "radio"; r.name = "answer"; r.value = String(i); r.checked = state.answers[state.index] === i;
      label.append(r, document.createTextNode(opt));
      fs.append(label);
    });
    const nav = el("div", undefined, "nav");
    const back = el("button", "Back", "ghost"); back.type = "button"; back.disabled = state.index === 0; back.dataset.act = "back";
    const last = state.index === QUESTIONS.length - 1;
    const next = el("button", last ? "Finish" : "Next"); next.type = "button"; next.dataset.act = last ? "finish" : "next";
    nav.append(back, next);
    box.replaceChildren(el("p", `Question ${state.index + 1} of ${QUESTIONS.length}`, "progress"), fs, el("p", "", "error"), nav);
    box.querySelector("input:checked, input")?.focus();
  }
  function renderResult() {
    const score = calculateScore(QUESTIONS, state.answers), prev = store.get("best", null);
    if (!prev || score.percent > prev.percent) store.set("best", score);
    showBest();
    $("quiz").hidden = true;
    const box = $("result"); box.hidden = false;
    const list = el("ol", undefined, "review");
    QUESTIONS.forEach((q, i) => {
      const li = el("li"), ok = state.answers[i] === q.answer;
      li.append(el("span", q.q + " "), el("span", ok ? "Correct" : `Wrong. Answer: ${q.options[q.answer]}`, ok ? "right" : "wrong"));
      list.append(li);
    });
    const again = el("button", "Try again"); again.type = "button"; again.dataset.act = "restart";
    box.replaceChildren(el("h2", "Your result"), el("p", `${score.correct}/${score.total}`, "score"), el("p", `${score.percent}% - ${getFeedback(score.percent)}`), list, again);
    box.querySelector("h2").tabIndex = -1; box.querySelector("h2").focus();
  }
  $("quiz").addEventListener("change", (e) => { if (e.target.name === "answer") { state.answers[state.index] = Number(e.target.value); $("quiz").querySelector(".error").textContent = ""; } });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const act = b.dataset.act;
    if (act === "back") { state.index--; renderQuestion(); }
    else if (act === "next" || act === "finish") {
      if (state.answers[state.index] === null) { $("quiz").querySelector(".error").textContent = "Please choose an answer."; return; }
      if (act === "next") { state.index++; renderQuestion(); } else renderResult();
    } else if (act === "restart") { state = { index: 0, answers: Array(QUESTIONS.length).fill(null) }; renderQuestion(); }
  });
  showBest(); renderQuestion();
})();
