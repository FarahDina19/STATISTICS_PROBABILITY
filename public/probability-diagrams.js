// Supplied teaching diagrams: keep each image beside its explanation and retain
// the original artwork. Captions clarify rounding and errors in the originals.
(() => {
  const diagrams = [
    ['decision-tree', 'Choosing binomial or normal', 'Decision tree comparing counts of successes with continuous measurements.', 'Count successes only with fixed trials, independence, two outcomes and constant probability. For measurements, use a stated or justified normal model; continuous data alone is not enough. The central limit theorem concerns sample means, not the raw data.'],
    ['decision-tree-2', 'Check the model conditions', 'Binomial and normal decision tree with condition checklists.', 'Use the checklists before choosing a model. Whole-number counts are not automatically binomial, and continuous measurements are not automatically normal.'],
    ['basketball-shots', 'Possible result versus expected count', 'Ten basketball shots comparing six actual makes with seven expected makes.', 'For 10 independent shots with success probability 0.7, the expected count is 7. Six makes is also possible: an expected count is a long-run average, not a guaranteed result.'],
    ['basketball-shots-2', 'Read the basketball probability bars', 'Binomial probability bars for ten shots and success probability 0.7; the original illustration contains an extra shot.', 'Read the bar at 7: the probability of exactly seven makes is approximately 0.2668. Each bar describes a different possible count.', 'Spot the illustration error: the top row contains 8 green and 3 red circles, which is 11 shots. For the stated example it should contain 7 green and 3 red circles. Use the graph for n = 10, not that row.'],
    ['five-fair-coin-flips', 'Extend to five fair flips', 'Five fair flips grouped by the number of heads, with binomial probability bars.', 'This is a new example with 5 flips, rather than the 3-flip guided exercise. The numbers of arrangements are 1, 5, 10, 10, 5 and 1. Divide each by 32; the exact probabilities are 0.03125, 0.15625, 0.3125, 0.3125, 0.15625 and 0.03125.'],
    ['32-arrangements', 'Why the combination counts orders', 'All 32 sequences of five flips, highlighting the ten with exactly three heads.', 'Each sequence has probability 1/32. Ten sequences contain exactly 3 heads, so the probability is 10/32 = 0.3125.', 'Use the numbered grid to count. The small list at the bottom repeats HHTHT and omits HTHHT; the grid shows the ten distinct matching sequences.'],
    ['cumulative-vs-individual', 'One bar or several bars?', 'Side-by-side bar charts for exactly two and at most two successes in five fair trials.', 'In this 5-flip example, exactly 2 selects one bar: 0.3125. At most 2 includes 0, 1 and 2: 0.03125 + 0.15625 + 0.3125 = 0.5. The chart labels are rounded.'],
    ['k-success', 'Connect the bars to the formulas', 'Worked comparison of exactly two successes and at most two successes.', 'Multiply for one exact count, then add the relevant counts for a cumulative probability. Add unrounded values: rounding each displayed term first can give 0.5001 instead of the exact 0.5000.'],
    ['normal-bell-curve', 'Read the bell curve', 'Normal bell curve showing the mean, standard deviation bands and the empirical rule.', 'The mean is at the centre. The shaded bands show about 68%, 95% and 99.7% within one, two and three standard deviations.', 'Correction to the outer labels: each tail beyond three standard deviations is approximately 0.135% (about 0.15% using the rounded 99.7% rule), not 0.1%.'],
    ['68-95-99-7-rule', 'Apply the empirical rule to scores', 'Empirical rule for normally distributed test scores with mean 70 and standard deviation 10.', 'For this test-score example, one standard deviation spans 60–80, two span 50–90, and three span 40–100. These percentages are approximate and assume a normal model.'],
    ['raw-score-to-z-score', 'Translate a raw score', 'Converting a score of 85 to z = 1.5 using mean 70 and standard deviation 10.', 'This additional example uses test scores: subtract 70 from 85, then divide by 10. The result 1.5 means 1.5 standard deviations above the mean.'],
    ['normal-table-lookup', 'Find row 1.2 and column .03', 'Standard normal cumulative table highlighting z = 1.23 and left area 0.8907.', 'The row supplies 1.2 and the column supplies .03. Their intersection gives the left cumulative area, approximately 0.8907; the right area is 1 − 0.8907 = 0.1093.'],
    ['area-under-normal-curve', 'Choose the shaded region', 'Normal curves showing left-tail, right-tail and between-values probabilities.', 'Left: use the cumulative area. Right: subtract the cumulative area from 1. Between: subtract the lower cumulative area from the upper one. For a continuous normal variable, including an endpoint does not change the probability.'],
    ['area-under-normal-curve-2', 'Connect delivery time to probability', 'Delivery-time curve shaded below 35 minutes, with mean 30, standard deviation 5 and z = 1.', 'Subtract 30 from 35 and divide by 5 to get z = 1. The left area is approximately 0.8413, so about 84.13% arrive by 35 minutes in this model.', 'Notation: this lab writes N(μ, σ²), so this example is N(30, 25). The image instead labels the parameters as mean and standard deviation.']
  ];
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = Object.fromEntries(diagrams.map(d => [d[0], d]));
  // Each teaching block follows explanation → formula → prompt → image → connection.
  const context = {
    'decision-tree': ['First decide whether you count successes or measure a quantity. Then check the model assumptions.', 'Binomial: X ∼ Bin(n, p). Normal: X ∼ N(μ, σ²).'],
    'decision-tree-2': ['For five independent fair flips, the number of trials is fixed, each flip has two outcomes, and the probability stays the same.', 'n = 5, p = 0.5; X ∼ Bin(5, 0.5)'],
    'basketball-shots': ['A player takes 10 independent free throws with a 70% chance of making each one. Compare one possible result with the long-run average.', 'E(X) = np = 10 × 0.7 = 7'],
    'basketball-shots-2': ['Now ask for exactly seven successful shots out of ten. Choose their positions, then multiply the success and failure factors.', 'P(X = 7) = ¹⁰C₇ × 0.7⁷ × 0.3³ ≈ 0.2668'],
    'five-fair-coin-flips': ['Extend our three-flip example to five independent fair flips. Group the sequences by how many heads they contain.', 'P(X = k) = ⁵Cₖ × (0.5)⁵ = ⁵Cₖ / 32'],
    '32-arrangements': ['In five fair flips, exactly three heads can appear in ten different orders. Every complete sequence is equally likely.', 'P(X = 3) = ⁵C₃ × (0.5)³ × (0.5)² = 10/32 = 0.3125'],
    'cumulative-vs-individual': ['For five fair flips, “exactly two” means one count; “at most two” includes zero, one and two.', 'P(X = 2) = 0.3125; P(X ≤ 2) = P(X = 0) + P(X = 1) + P(X = 2) = 0.5'],
    'k-success': ['Use the five-flip example to connect each selected bar to its formula. Keep all intermediate values unrounded.', 'P(X = 2) = 10 × (0.5)⁵ = 0.3125; P(X ≤ 2) = 0.03125 + 0.15625 + 0.3125 = 0.5'],
    'normal-bell-curve': ['A normal curve is symmetric about its mean. Moving one standard deviation at a time creates bands containing predictable proportions of the area.', 'P(μ − σ ≤ X ≤ μ + σ) ≈ 0.68'],
    '68-95-99-7-rule': ['Now use normally distributed test scores with mean 70 and standard deviation 10. Find the endpoints before reading the shaded bands.', 'μ ± σ: 60–80; μ ± 2σ: 50–90; μ ± 3σ: 40–100'],
    'raw-score-to-z-score': ['Try the same standardising method with a test score of 85, a mean of 70 and a standard deviation of 10.', 'z = (85 − 70) / 10 = 1.5'],
    'normal-table-lookup': ['For z = 1.23, split the value into its row (1.2) and column (.03). This table gives cumulative area to the left.', 'Φ(1.23) = P(Z ≤ 1.23) ≈ 0.8907'],
    'area-under-normal-curve': ['Read the event first: below a cutoff, above it, or between two cutoffs. Match those words to the shaded region.', 'P(Z < a) = Φ(a); P(Z > b) = 1 − Φ(b); P(a < Z < b) = Φ(b) − Φ(a)'],
    'area-under-normal-curve-2': ['Delivery time has mean 30 minutes and standard deviation 5 minutes. Standardise the 35-minute cutoff, then read the left area.', 'z = (35 − 30) / 5 = 1; P(X ≤ 35) = Φ(1) ≈ 0.8413']
  };
  function figure(id) {
    const [slug, title, alt, caption, correction] = byId[id];
    const [explanation, formula] = context[id];
    const prompt = `Create an accessible educational diagram about ${title.toLowerCase()}. ${explanation} Show this calculation: ${formula}. Teaching explanation: ${caption}${correction ? ' Ensure accuracy: ' + correction : ''} Use clear labels, readable text, and a simple layout. Check every count and calculation.`;
    return `<section class="lesson-diagram" data-diagram="${slug}"><h3>${escape(title)}</h3><p>${escape(explanation)}</p><div class="diagram-formula" aria-label="Formula">${escape(formula)}</div><div class="diagram-prompt"><h4>Visualize this</h4><p>Copy the prompt to create a variation, or study the supplied diagram below.</p><details><summary>Read the ChatGPT prompt</summary><pre>${escape(prompt)}</pre></details><button type="button" data-copy-diagram>📋 Generate Diagram with ChatGPT — Copy prompt</button><span class="diagram-copy-status" role="status"></span></div>${correction ? `<p class="diagram-note"><strong>Read this with the diagram:</strong> ${escape(correction)}</p>` : ''}<figure><a class="diagram-open" href="./probability-images/${slug}.png" target="_blank" rel="noopener" aria-label="Open ${escape(title)} at full size"><img src="./probability-images/${slug}.png" alt="${escape(alt)}" width="1448" height="1086" loading="lazy" decoding="async"></a><figcaption><strong>Connect it to the lesson:</strong> ${escape(caption)} <a href="./probability-images/${slug}.png" target="_blank" rel="noopener">Open full-size image ↗</a></figcaption></figure></section>`;
  }
  // Insert before the next question/action so the visual supports the explanation
  // students have just read, rather than following a quiz or explorer link.
  function place(topic, step, before, ids) {
    const html = lessons[topic][step][1];
    if (!html.includes(before)) throw new Error('Missing diagram placement: ' + topic + '/' + step);
    lessons[topic][step][1] = html.replace(before, ids.map(figure).join('') + before);
  }
  place('intro', 1, '<p>Quick check:', ['decision-tree']);
  lessons.binomial[1][1] += figure('decision-tree-2');
  lessons.binomial[2][1] += figure('five-fair-coin-flips');
  lessons.binomial[3][1] += figure('32-arrangements');
  place('binomial', 5, '<p>Ready to explore?', ['basketball-shots', 'basketball-shots-2']);
  place('normal', 0, '<p>What is the probability', ['normal-bell-curve', '68-95-99-7-rule']);
  place('normal', 1, '<p>What is z for', ['raw-score-to-z-score']);
  lessons.normal[2][1] += figure('normal-table-lookup');
  lessons.normal[3][1] += figure('area-under-normal-curve-2');
  // Introduce the area formulas and static diagram before the interactive choices.
  place('normal', 4, '<div class="choices"', ['area-under-normal-curve']);
  place('advanced', 0, '<p>Which values mean', ['cumulative-vs-individual']);
  place('advanced', 1, '<p>Another route:', ['k-success']);
  document.getElementById('shots').insertAdjacentHTML('beforebegin', figure('basketball-shots'));
  document.getElementById('delivery').insertAdjacentHTML('beforebegin', figure('area-under-normal-curve-2'));
  document.getElementById('diagrams').innerHTML = '<div class="eyebrow">Visual reference</div><h1>Diagrams to revisit</h1><p>Read the explanation, study the diagram, then explain the connection in your own words. Open a topic below or follow the images within each lesson.</p>' + diagrams.map(d => `<details class="diagram-reference"><summary>${escape(d[1])}</summary>${figure(d[0])}</details>`).join('');
  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy-diagram]');
    if (!button) return;
    const box = button.closest('.diagram-prompt');
    const status = box.querySelector('.diagram-copy-status');
    try {
      await navigator.clipboard.writeText(box.querySelector('pre').textContent);
      status.textContent = 'Copied. Paste into ChatGPT.';
    } catch {
      status.textContent = 'Select the prompt text above and copy it manually.';
    }
  });
})();
