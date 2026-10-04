# Statistics + Probability

Self-learning lessons for statistics and probability, published with GitHub Pages at
https://dina85hai.github.io/STATISTICS_PROBABILITY/

## Learning path

1. **Statistics**: Tabular & Graphical Form (`lessons/data-presentation.html`): syllabus 4.1 statistics terminology,
   discrete/continuous and grouped/ungrouped data, frequency and cumulative frequency tables, pie chart, bar chart,
   histogram and ogive with electrical engineering examples, and a practice section (concrete → visual → abstract,
   then fill-in-the-blank frequency, cumulative frequency, boundary, midpoint and pie chart tables, reading a pie chart,
   bar chart, histogram and ogive, plus endless random tables and endless random graphs to read) → Data Practice Slides (`lessons/data-practice-slides.html`):
   one question per slide in 5 sets (terminology, types of data, tables, charts, challenge) plus a mixed test → Mean, Mode, Median, Range, Variance & Standard Deviation (`statistics-notes.html`) → Statistics Lab (`lessons/statistics-lab.html`):
   an Exercise tab laid out like the notes: the same three problems (A raw data, B frequency table, C grouped data)
   side by side for each step (mean, mode, median, range, variance & σ), with the notes' formulas and answer boxes
   placed inside the formula, plus a practice tab of random questions worked the same way, chosen by
   difficulty (easy, medium, hard), data type (raw data, frequency table, grouped data) and measure
   (mean, mode, median, range, variance & standard deviation), or mixed
2. **Probability**: Presentation (`presentation.html`) → Travel Edition (`lessons/probability-destinations.html`):
   syllabus 4.3 subtopics with interactive destination examples → Practice (`lessons/probability-practice.html`): every exercise on one page,
   grouped by skill and ordered from easy to hard

3. **Probability Lab**: Guided binomial and normal distributions (`lessons/probability-lab.html`) as a slide show like the
   presentation: every guided step and explorer is one slide (Previous / Next, ← → keys, `#7` opens slide 7 and
   `#normal` opens a topic), with interactive graphs and step-by-step calculations.

## Files

| File | What it is |
|---|---|
| `index.html` | Landing page (interactive coin-flip hero, learning path, progress) |
| `public/coin-flip.js` | Fair coin flips, session counters and percentage bars; honours reduced motion |
| `statistics-notes.html` | Statistics notes (formulas are rendered by `src/statistics.ts`) |
| `presentation.html` | Probability slides (styles compiled by Tailwind) |
| `lessons/*.html` | Stand-alone lesson pages, copied to the site as they are |
| `public/learner.js` | Lesson list (`TOPICS`), Home / Mark as done / Next buttons, progress, self-test mode |

## Adding a new lesson

1. Put the lesson's `.html` file in the `lessons/` folder, for example `lessons/histogram.html`.
   Use a short name with no spaces.
2. In `public/learner.js`, add an entry to the right topic in `TOPICS`, with
   `id: 'histogram'` and `url: 'histogram.html'`.

That's it: the landing page card, Home button, Mark as done and Next button are added
automatically. If the answers are inside elements with `class="answer"`, self-test mode
hides them too. Fractions typed as `3/10` (or `n(A)/n(S)`) are shown as stacked fractions
automatically; for words, write `<span class="sp-frac"><span>top</span><span>bottom</span></span>`.
Push to `main` and the site redeploys.

In the statistics notes, each worked example starts with its formula (`class="formula"`), and
every step is typeset with KaTeX via `<span class="tex" data-tex="...">`.

## GitHub Pages deployment

In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**,
not **Deploy from a branch**. The existing `.github/workflows/deploy.yml` builds
the site with Vite, uploads `dist/` as the `github-pages` artifact, and deploys it.
No additional workflow is needed.

Branch publishing also starts GitHub's automatic Jekyll **pages build and deployment**
workflow, which is not the Vite build. If its `deploy` job reports
`No artifacts named "github-pages" were found` while **Deploy to GitHub Pages**
succeeds, check the publishing source above. Changing this setting requires a
repository administrator, maintainer, or someone with permission to manage Pages;
the workflow's `GITHUB_TOKEN` cannot change it.

## Local development

```
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # check the TypeScript files
npm run build      # output in dist/
```

To preview the coin-flip hero, open http://localhost:3000 after starting the dev server.
Try **Flip once** and **Flip 10 times**: each result updates the Heads/Tails counts and
bars (observed percentages, not guaranteed 50/50 results). Counts reset on reload.
Check a phone-sized viewport and your device's reduced-motion setting; flips still
work without the coin animation. The heading and **Start Learning** link remain visible.
For a production preview, run `npm run build` then `npm run preview` and open the URL
printed in the terminal. The plain HTML/CSS/JavaScript needs no runtime backend and is
included in the existing GitHub Pages build.

## Probability Lab diagrams

Probability Lab includes 14 supplied diagrams beside the matching guided explanations and examples, plus a Diagrams reference tab. Images open at full size and load lazily; each includes descriptive alternative text, a teaching caption, and an optional copyable ChatGPT prompt. The original artwork is preserved, with visible notes identifying illustration errors and rounding conventions.

Assets are in `public/probability-images/`; placement and captions are in `public/probability-diagrams.js`, with responsive styles in `public/probability-diagrams.css`. Vite copies these assets into `dist/`.
