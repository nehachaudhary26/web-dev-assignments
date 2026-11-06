# Assignment 60: Quiz Challenge - Architecture Explanation

The sheet does not name the challenge, so this is a small working quiz app. If your instructor set a different one, tell me and I will rebuild it.

## What it does
Shows 8 multiple-choice questions one at a time, checks that an answer is chosen, scores the quiz, shows a review of right and wrong answers, and remembers the best score.

## Structure (3 small parts)
| Part | File | Responsibility |
|------|------|----------------|
| Logic (model) | `quiz.js` | Question data, `validateQuestions`, `calculateScore`, `getFeedback`. No DOM, so it is tested in Node (`node tests.js`). |
| Persistence | `storage.js` | Saves the best score safely in localStorage (never throws). |
| View + controller | `app.js`, `index.html`, `style.css` | Draws one question at a time with `createElement`/`textContent`, handles clicks with event delegation, and updates state. |

## Data
```js
question = { q: "text", options: ["a", "b", "c", "d"], answer: 1 }   // answer = index of the right option
state    = { index: 0, answers: [null, 1, null, ...] }                // one slot per question
best     = { correct: 6, total: 8, percent: 75 }                      // stored under "web-quiz:best"
```

## Flow
```
load best score -> renderQuestion(index)
   user picks option -> state.answers[index] = choice
   Next/Back -> change index -> renderQuestion
   Finish (all answered) -> calculateScore -> save best if higher -> renderResult
   Try again -> reset state -> renderQuestion(0)
```

## Why it is built this way
- **State separate from the DOM:** the screen is redrawn from `state`, so Back keeps earlier answers selected.
- **Pure scoring function:** easy to test with edge cases (no answers, all correct, empty quiz).
- **Validation before moving on:** Next/Finish refuse to continue without an answer and show an error.
- **Safe rendering:** question text is inserted with `textContent`, never `innerHTML`.
- **Accessibility:** a `fieldset` and `legend` group each question, radios are real inputs (keyboard works), focus moves to the question or result heading, and the quiz area is `aria-live`.
- **Graceful storage failure:** if localStorage is unavailable the quiz still works, it just cannot save the best score.
