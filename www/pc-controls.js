// Controles extras de teclado para PC.
// Q = Dash | E = ULT. No co-op local, Q/E controlam o jogador que usa WASD.
(() => {
  addEventListener('keydown', e => {
    if (typeof st === 'undefined' || st !== 'play' || e.repeat) return;
    if (e.code !== 'KeyQ' && e.code !== 'KeyE') return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (typeof CO !== 'undefined' && CO.on) {
      const i = CO.sch ? CO.sch.findIndex(v => v === 1) : -1;
      const q = i >= 0 && PL[i];
      if (!q) return;
      if (e.code === 'KeyQ') withP(q, dash);
      else withP(q, fireUlt);
      return;
    }

    if (e.code === 'KeyQ') dash();
    else fireUlt();
  }, true);

  // Carrega sprint, stamina e efeitos da Beta 0.2 sem duplicar o código principal.
  const beta = document.createElement('script');
  beta.src = 'beta02.js';
  beta.defer = true;
  document.body.appendChild(beta);
})();
