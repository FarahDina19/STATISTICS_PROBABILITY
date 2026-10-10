import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const directory = new URL('../public/probability-images/', import.meta.url);
const text = (x, y, value, size = 20, extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${value}</text>`;
function save(name, title, description, content) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">${description}</desc>
<rect width="960" height="720" fill="#f8fafc"/>
<g font-family="Arial, sans-serif" fill="#172033">
${content}
</g></svg>
`;
  writeFileSync(new URL(`${name}.svg`, directory), svg);
}
function choose(n, k) {
  let value = 1;
  for (let i = 1; i <= k; i++) value = value * (n - i + 1) / i;
  return value;
}

const shots = Array.from({ length: 10 }, (_, i) => i < 7 ? 'Made' : 'Missed');
const probabilities = Array.from({ length: 11 }, (_, k) => choose(10, k) * 0.7 ** k * 0.3 ** (10 - k));
assert.equal(shots.filter(s => s === 'Made').length, 7);
assert.equal(shots.filter(s => s === 'Missed').length, 3);
assert.equal(probabilities[7].toFixed(4), '0.2668');
assert.ok(Math.abs(probabilities.reduce((a, b) => a + b, 0) - 1) < 1e-12);
let basketball = text(480, 48, 'Basketball: exactly 7 makes in 10 shots', 30, 'text-anchor="middle"')
  + text(480, 85, '10 independent shots • probability of a make p = 0.7', 22, 'text-anchor="middle"');
shots.forEach((result, i) => {
  const x = 75 + 90 * i;
  basketball += `<g data-shot="${i + 1}" data-result="${result}"><circle cx="${x}" cy="135" r="27" fill="${result === 'Made' ? '#166534' : '#b91c1c'}"/>`
    + text(x, 143, result === 'Made' ? '✓' : '×', 28, 'text-anchor="middle" fill="white"')
    + text(x, 185, `${i + 1}: ${result}`, 16, 'text-anchor="middle"') + '</g>';
});
basketball += text(480, 222, 'One possible outcome: 7 made + 3 missed = 10 shots', 22, 'text-anchor="middle"')
  + text(480, 262, 'X = number of makes; X ∼ Bin(10, 0.7)', 22, 'text-anchor="middle"');
for (let tick = 0; tick <= 3; tick++) {
  const y = 590 - tick * 90;
  basketball += `<path d="M85 ${y}H920" stroke="#cbd5e1"/>` + text(72, y + 6, (tick / 10).toFixed(1), 16, 'text-anchor="end"');
}
basketball += text(85, 296, 'P(X = k)', 18) + '<path d="M85 310V590H920" stroke="#172033" fill="none"/>';
probabilities.forEach((probability, k) => {
  const x = 100 + k * 74, height = probability * 900;
  basketball += `<rect data-k="${k}" data-probability="${probability}" x="${x}" y="${590 - height}" width="48" height="${height}" fill="${k === 7 ? '#b45309' : '#0369a1'}"/>`
    + text(x + 24, 580 - height, probability.toFixed(4), 14, 'text-anchor="middle"')
    + text(x + 24, 617, k, 18, 'text-anchor="middle"');
});
basketball += text(480, 650, 'k = number of makes', 18, 'text-anchor="middle"')
  + text(480, 693, 'P(X = 7) = C(10, 7) × 0.7⁷ × 0.3³ ≈ 0.2668', 26, 'text-anchor="middle"');
save('basketball-shots-2', 'Ten basketball shots: seven made, three missed',
  'Exactly ten numbered shots, seven made and three missed. Binomial bars for n = 10, p = 0.7; P(X = 7) is approximately 0.2668. This pictured outcome is not guaranteed.', basketball);

const sequences = Array.from({ length: 32 }, (_, i) =>
  i.toString(2).padStart(5, '0').replaceAll('0', 'T').replaceAll('1', 'H'));
const matching = sequences.filter(s => [...s].filter(c => c === 'H').length === 3);
const counts = Array.from({ length: 6 }, (_, k) => sequences.filter(s => [...s].filter(c => c === 'H').length === k).length);
assert.equal(new Set(sequences).size, 32);
assert.equal(new Set(matching).size, 10);
assert.deepEqual(counts, [1, 5, 10, 10, 5, 1]);
assert.equal(matching.length / sequences.length, 0.3125);
let coins = text(480, 42, 'Five fair flips: all 32 distinct sequences', 30, 'text-anchor="middle"')
  + text(480, 78, 'H = heads (gold) • T = tails (silver) • outlined rows have exactly 3 heads', 20, 'text-anchor="middle"');
sequences.forEach((sequence, i) => {
  const x = 20 + (i % 4) * 235, y = 100 + Math.floor(i / 4) * 62;
  const selected = matching.includes(sequence);
  coins += `<g data-sequence="${sequence}" data-three-heads="${selected}"><rect x="${x}" y="${y}" width="215" height="54" rx="8" fill="white" stroke="${selected ? '#166534' : '#cbd5e1'}" stroke-width="${selected ? 3 : 1}"/>`;
  [...sequence].forEach((side, j) => {
    const cx = x + 24 + j * 40;
    coins += `<circle cx="${cx}" cy="${y + 23}" r="16" fill="${side === 'H' ? '#facc15' : '#cbd5e1'}"/>`
      + text(cx, y + 30, side, 18, 'text-anchor="middle"');
  });
  coins += text(x + 107, y + 48, `${sequence}${selected ? ' • 3 heads' : ''}`, 12, 'text-anchor="middle"') + '</g>';
});
coins += text(480, 626, 'Exactly 3 heads: 10 distinct sequences; each has probability 1/32.', 22, 'text-anchor="middle"')
  + text(480, 663, 'P(X = 3) = C(5, 3) / 32 = 10/32 = 0.3125 = 31.25%', 26, 'text-anchor="middle"')
  + text(480, 702, 'Heads k: 0, 1, 2, 3, 4, 5 • sequence counts: 1, 5, 10, 10, 5, 1', 20, 'text-anchor="middle"');
save('five-fair-coin-flips', 'Five fair coin flips with all ten three-head sequences',
  `All 32 equally likely sequences. The ten outlined sequences with exactly three heads are ${matching.join(', ')}. P(X = 3) = 10/32 = 0.3125.`, coins);

const density = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
const x = z => 480 + z * 100;
const y = z => 420 - density(z) * 650;
function curve(from, to) {
  return Array.from({ length: 101 }, (_, i) => {
    const z = from + (to - from) * i / 100;
    return `${x(z).toFixed(3)},${y(z).toFixed(3)}`;
  }).join(' L');
}
// Integrate the standard normal density with Simpson's rule, from -10 to z.
function cdf(z) {
  const n = 10000, from = -10, h = (z - from) / n;
  let sum = density(from) + density(z);
  for (let i = 1; i < n; i++) sum += (i % 2 ? 4 : 2) * density(from + i * h);
  return sum * h / 3;
}
const tail = cdf(-3) * 100;
const within = [1, 2, 3].map(z => (cdf(z) - cdf(-z)) * 100);
assert.equal(tail.toFixed(3), '0.135');
assert.deepEqual(within.map(p => p.toFixed(2)), ['68.27', '95.45', '99.73']);
let normal = text(480, 44, 'Normal curve: model areas versus rounded rule', 30, 'text-anchor="middle"')
  + text(480, 82, 'Total area = 100% • z = (X − μ) / σ', 22, 'text-anchor="middle"');
const edges = [-4.5, -3, -2, -1, 0, 1, 2, 3, 4.5];
const fills = ['#b91c1c', '#fbbf24', '#7dd3fc', '#0369a1', '#0369a1', '#7dd3fc', '#fbbf24', '#b91c1c'];
for (let i = 0; i < edges.length - 1; i++) {
  normal += `<path d="M${x(edges[i])},420 L${curve(edges[i], edges[i + 1])} L${x(edges[i + 1])},420 Z" fill="${fills[i]}"/>`;
}
normal += `<path d="M${curve(-4.5, 4.5)}" fill="none" stroke="#172033" stroke-width="3"/>`
  + '<path d="M30 420H930" stroke="#172033"/>';
for (let z = -3; z <= 3; z++) {
  normal += `<path d="M${x(z)} 420V${y(z)}" stroke="#172033" stroke-dasharray="4 4"/>`
    + text(x(z), 451, z === 0 ? 'μ' : `μ ${z < 0 ? '−' : '+'} ${Math.abs(z) === 1 ? '' : Math.abs(z)}σ`, 18, 'text-anchor="middle"');
}
normal += `<g data-tail-percent="${tail}">`
  + text(140, 152, 'Left tail ≈ 0.135%', 23, 'text-anchor="middle"')
  + text(140, 182, 'X &lt; μ − 3σ', 20, 'text-anchor="middle"')
  + '<path d="M140 198L155 410" stroke="#b91c1c" stroke-width="2"/>'
  + text(820, 152, 'Right tail ≈ 0.135%', 23, 'text-anchor="middle"')
  + text(820, 182, 'X &gt; μ + 3σ', 20, 'text-anchor="middle"')
  + '<path d="M820 198L805 410" stroke="#b91c1c" stroke-width="2"/></g>'
  + text(480, 499, 'Standard normal model (areas rounded to 2 decimal places)', 23, 'text-anchor="middle"')
  + text(480, 538, `Within ±1σ: ${within[0].toFixed(2)}% • ±2σ: ${within[1].toFixed(2)}% • ±3σ: ${within[2].toFixed(2)}%`, 23, 'text-anchor="middle"')
  + '<rect x="45" y="566" width="870" height="128" rx="12" fill="#e2e8f0"/>'
  + text(480, 602, 'Rounded empirical rule: approximately 68%, 95%, 99.7%', 23, 'text-anchor="middle"')
  + text(480, 641, '(100% − 99.7%) / 2 = 0.15% per tail using that rounded rule.', 22, 'text-anchor="middle"')
  + text(480, 675, '0.15% is a rough rule-of-thumb value; the normal-model tail is ≈ 0.135%.', 21, 'text-anchor="middle"');
save('normal-bell-curve', 'Normal model: approximately 0.135 percent in each tail beyond three sigma',
  'The standard normal density has about 68.27%, 95.45%, and 99.73% within one, two, and three standard deviations. Each tail beyond three sigma is approximately 0.135%. The rounded 68–95–99.7 empirical rule instead gives roughly 0.15% per tail.', normal);
console.log('Verified: 10 shots (7 made, 3 missed), P(X=7) ≈ 0.2668; 32 unique coin sequences, 10 with 3 heads, P(X=3) = 0.3125; normal tails ≈ 0.135% each.');
