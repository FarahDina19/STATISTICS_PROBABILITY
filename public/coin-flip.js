(() => {
  const coin = document.getElementById('hero-coin');
  const controls = document.getElementById('coin-controls');
  const status = document.getElementById('coin-status');
  const once = document.getElementById('flip-once');
  const ten = document.getElementById('flip-ten');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const counts = { heads: 0, tails: 0 };
  let flipping = false;

  function updateStats() {
    const total = counts.heads + counts.tails;
    for (const side of ['heads', 'tails']) {
      const percent = counts[side] / total * 100;
      document.getElementById(`${side}-count`).textContent = counts[side];
      document.getElementById(`${side}-percent`).textContent = `${percent.toFixed(1)}%`;
      const bar = document.getElementById(`${side}-bar`);
      bar.setAttribute('aria-valuenow', percent.toFixed(1));
      bar.firstElementChild.style.width = `${percent}%`;
    }
  }

  async function flip(amount) {
    if (flipping) return;
    flipping = true;
    once.disabled = ten.disabled = true;
    try {
      for (let i = 0; i < amount; i += 1) {
        status.textContent = `Flipping ${i + 1} of ${amount}…`;
        if (!reducedMotion.matches && typeof coin.animate === 'function') {
          const animation = coin.animate([
            { transform: 'translateY(0) rotateY(0deg)' },
            { transform: 'translateY(-14px) rotateY(360deg)', offset: .5 },
            { transform: 'translateY(0) rotateY(720deg)' }
          ], { duration: 500, easing: 'ease-in-out' });
          const stopMotion = () => {
            if (reducedMotion.matches) animation.cancel();
          };
          reducedMotion.addEventListener('change', stopMotion);
          try {
            await animation.finished;
          } catch (error) {
            if (error.name !== 'AbortError') throw error;
          } finally {
            reducedMotion.removeEventListener('change', stopMotion);
          }
        }
        const side = Math.random() < .5 ? 'heads' : 'tails';
        counts[side] += 1;
        const result = side === 'heads' ? 'Heads' : 'Tails';
        coin.textContent = result;
        updateStats();
        status.textContent = `${result}! Flip ${i + 1} of ${amount}. Total: ${counts.heads + counts.tails} flips.`;
        if (i < amount - 1) await new Promise(resolve => setTimeout(resolve, 150));
      }
    } finally {
      flipping = false;
      once.disabled = ten.disabled = false;
    }
  }

  once.addEventListener('click', () => flip(1));
  ten.addEventListener('click', () => flip(10));
  controls.hidden = false;
})();
