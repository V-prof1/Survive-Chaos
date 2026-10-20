// Controles extras de teclado para PC.
// Q = Dash | E = ULT. No co-op local, Q/E controlam o jogador que usa WASD.
(() => {
  addEventListener('keydown', e => {
    if (typeof st === 'undefined' || st !== 'play' || e.repeat) return;
    if (e.code !== 'KeyQ' && e.code !== 'KeyE') return;

    // Bloqueia os atalhos antigos do game.js (Espaço/Q) somente para Q/E.
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
})();
