# ThermoLab — Heat Transfer Practice

[Open the practice lab](https://shobhit2507.github.io/heat-transfer-practice-lab/)

An untimed, responsive practice workspace built from 61 original screenshot questions in the supplied ESE Prelims 2017–2026 document. All questions support automatic grading and worked solutions.

## Practice tools

- Original MCQ choices, or clearly labelled GATE adaptations with 32 NAT and 5 MSQ questions.
- Custom chapter/year/pool sets, random order, instant or end-of-set grading, and uniform 1- or 2-mark practice schemes.
- MCQ negative marking; exact MSQ combinations with no partial marks; NAT tolerance ranges.
- Scientific calculator with DEG/RAD, memory, history, powers and scientific notation. Unit converter and heat-transfer formula reference.
- Original screenshot zoom/expand, confidence tracking, notes, bookmarks, review flags, mistake queues and spaced revision dates.
- Coverage and confidence analytics, graded session history, CSV results, and JSON progress backup/import.
- Dark/light themes, phone layout, focus mode and keyboard navigation. No countdown.

## Answer verification

Answers were independently derived or checked against linked primary teaching/research references. Numerical results were recomputed and dimensional checks applied. Official UPSC answer-key certification is not claimed. References and worked reasoning appear after grading; the complete audit is in `verification.json`.

All 61 PNG files are byte-for-byte images extracted from the source DOCX; SHA-256 hashes are recorded in the audit. The document provides ESE questions; optional GATE-style formats do not turn them into official GATE PYQs or a full GATE paper.

Printed-choice defects are explicitly labelled: question 29 accepts both equivalent unit choices; questions 54 and 55 add corrected choice E for standard exchanger effectiveness (0.75 and approximately 0.7273). Assumptions or imprecise wording in questions 33, 34, 42 and 51 are documented.

## Saving your work

Answers, notes and history stay in your browser's local storage. Use Export progress before clearing browser data or moving devices. Import a JSON backup through Settings. The static site has no account service or cross-device sync; answers are not sent to GitHub. The client-side answer bank is suitable for personal practice, not secure proctored assessment.

## Hosting and local use

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. There is no build step or package dependency. `.nojekyll` preserves the static files.

To run locally, serve this folder with any static HTTP server and open its URL. `index.html` is the entry point. Run `node tests/engine.test.cjs` for the grading, screenshot-integrity, calculator and conversion checks. The published verification report records 855 passing checks and the browser scenarios exercised.

Keep the original question screenshots and question metadata together when extending the bank.
