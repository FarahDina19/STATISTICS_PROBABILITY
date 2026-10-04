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
  function figure(id) {
    const [slug, title, alt, caption, correction] = byId[id];
    const prompt = `Create an accessible educational diagram about ${title.toLowerCase()}. ${alt} Teaching explanation: ${caption}${correction ? ' Ensure accuracy: ' + correction : ''} Use clear labels, readable text, and a simple layout. Check every count and calculation.`;
    return `<figure class="lesson-diagram"><h3>${escape(title)}</h3>${correction ? `<p class="diagram-note"><strong>Read this with the diagram:</strong> ${escape(correction)}</p>` : ''}<a class="diagram-open" href="./probability-images/${slug}.png" target="_blank" rel="noopener" aria-label="Open ${escape(title)} at full size"><img src="./probability-images/${slug}.png" alt="${escape(alt)}" width="1448" height="1086" loading="lazy" decoding="async"></a><figcaption><strong>Connect it to the lesson:</strong> ${escape(caption)} <a href="./probability-images/${slug}.png" target="_blank" rel="noopener">Open full-size image ↗</a></figcaption><details class="diagram-prompt"><summary>Optional: create another diagram with ChatGPT</summary><p>The diagram is ready to study above. To make a variation, copy this prompt:</p><pre>${escape(prompt)}</pre><button type="button" data-copy-diagram>Copy prompt</button><span class="diagram-copy-status" role="status"></span></details></figure>`;
  }
  function append(topic, step, ids) { lessons[topic][step][1] += ids.map(figure).join(''); }
  append('intro', 1, ['decision-tree']);
  append('binomial', 1, ['decision-tree-2']);
  append('binomial', 2, ['five-fair-coin-flips']);
  append('binomial', 5, ['32-arrangements']);
  append('normal', 0, ['normal-bell-curve', '68-95-99-7-rule']);
  append('normal', 1, ['raw-score-to-z-score']);
  append('normal', 2, ['normal-table-lookup']);
  append('normal', 4, ['area-under-normal-curve']);
  append('advanced', 0, ['cumulative-vs-individual']);
  append('advanced', 1, ['k-success']);
  document.getElementById('shots').closest('article').insertAdjacentHTML('beforeend', figure('basketball-shots') + `<details><summary>Read a second diagram and spot the counting error</summary>${figure('basketball-shots-2')}</details>`);
  document.getElementById('delivery').closest('article').insertAdjacentHTML('beforeend', figure('area-under-normal-curve-2'));
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
