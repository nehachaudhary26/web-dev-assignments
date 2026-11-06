# Assignment 61: Final Submission Checklist

Submit the repository link **before the deadline** (re-check the deadline in your course portal).

## 1. Replace placeholders
These strings are still in the repo and need your real details:
```
./day-15/a62-reflection/PORTFOLIO_LINK.md:6:- your GitHub profile (placeholder `https://github.com/your-username`: **replace it**)
./day-15/a62-reflection/PORTFOLIO_LINK.md:11:3. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.
./day-15/a62-reflection/PORTFOLIO_LINK.md:15:**Portfolio link to submit:** `https://<your-username>.github.io/web-dev-assignments/day-04/a14-responsive-landing/`
./README.md:6:**Live site:** _add your GitHub Pages link here_ (see `day-15/a62-reflection/PORTFOLIO_LINK.md`)
./day-02/a07-login-page/index.html:15:      <input type="email" id="email" name="email" placeholder="you@example.com" required>
./day-04/a14-responsive-landing/index.html:31:  <section id="contact" class="block alt"><h2>Contact</h2><p><a href="mailto:kalraaish261@gmail.com">kalraaish261@gmail.com</a> · <a href="https://linkedin.com/in/aish-kalra-5170ab387">LinkedIn</a> · <a href="https://github.com/your-username">GitHub</a></p></section>
./capstone-studytrack/README.md:5:**Live demo:** _add your GitHub Pages link here_
./day-01/a03-profile-card/index.html:15:    <a class="btn" href="https://github.com/your-username">View GitHub</a>
```
(Email addresses such as `aish@example.com` inside tests and demos are fake test data and can stay.)

## 2. Run the checks
- [ ] `cd capstone-studytrack && npm test` prints all tests passing (53)
- [ ] `node day-15/a59-solutions/tests.js` and `node day-15/a60-quiz-challenge/tests.js` pass
- [ ] Open `index.html` at the repo root and click through each page; no broken links or console errors
- [ ] Run the manual cases in `capstone-studytrack/docs/TEST_MATRIX.md` (Part B) and record the results
- [ ] Log any bug you find in `capstone-studytrack/docs/BUG_LOG.md`

## 3. Repository hygiene
- [ ] README has your name, a live-site link and the folder table
- [ ] No passwords, API keys or personal documents in any file (`git grep -i "password\|api_key\|secret"` and check)
- [ ] Repo is **public** (or shared with your instructor)
- [ ] Short repository description and topics added (for example `html`, `css`, `javascript`)
- [ ] Meaningful commit messages (one commit per day is ideal)

## 4. Publish
- [ ] Enable GitHub Pages (Settings > Pages > branch `main`, folder `/ (root)`)
- [ ] Open the live link and check the portfolio page, StudyTrack and a few assignments
- [ ] Tag the release: `git tag v1.0.0 && git push --tags`

## 5. Submit
- [ ] Copy the repository URL (and the Pages URL if asked)
- [ ] Submit before the deadline and keep a screenshot of the confirmation

## Suggested commit sequence (if you commit day by day)
```
git add day-01 day-02 day-03 && git commit -m "Days 1-3: CSS fundamentals and layouts"
git add day-04 day-05        && git commit -m "Days 4-5: landing pages and JavaScript basics"
git add day-06 day-07 day-08 && git commit -m "Days 6-8: scope, arrays, strings, objects"
git add day-09 day-10        && git commit -m "Days 9-10: JSON and DOM"
git add day-11 day-12        && git commit -m "Days 11-12: forms, to-do app, web storage"
git add capstone-studytrack day-13 && git commit -m "Day 13: StudyTrack planning and core build"
git add day-14               && git commit -m "Day 14: release candidate, tests, revision"
git add .                    && git commit -m "Day 15: final assessment, reflection, README"
git push
```
