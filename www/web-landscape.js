/* Survive Chaos Web — landscape-first mobile shell */
(() => {
  'use strict';
  if (window.__SC_WEB_LANDSCAPE__) return;
  window.__SC_WEB_LANDSCAPE__ = true;

  const coarse = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  if (!coarse) {
    document.documentElement.classList.add('sc-desktop');
    return;
  }

  document.documentElement.classList.add('sc-touch');

  const gate = document.createElement('div');
  gate.id = 'scLandscapeGate';
  gate.innerHTML = `
    <div class="sc-rotate-card">
      <div class="sc-phone-rotate" aria-hidden="true">▭</div>
      <b>GIRE O CELULAR</b>
      <span>Survive Chaos Web foi ajustado para jogar na horizontal.</span>
      <button type="button" id="scLandscapeButton">ATIVAR HORIZONTAL</button>
      <small>Se a rotação automática estiver desligada no Android, ative-a ou vire o aparelho manualmente.</small>
    </div>`;
  document.body.appendChild(gate);

  const button = document.getElementById('scLandscapeButton');
  const portrait = () => innerHeight > innerWidth;

  function refreshGate() {
    gate.classList.toggle('on', portrait());
    document.documentElement.classList.toggle('sc-portrait', portrait());
    document.documentElement.classList.toggle('sc-landscape', !portrait());
  }

  async function lockLandscape() {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      }
    } catch (_) {}

    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (_) {}

    refreshGate();
    setTimeout(refreshGate, 180);
    setTimeout(refreshGate, 500);
  }

  button.addEventListener('click', lockLandscape, { passive: true });

  // User gestures are the only reliable moment to request orientation lock in mobile browsers.
  document.addEventListener('click', e => {
    if (e.target && e.target.closest && e.target.closest('#play,#go,#again,#intro_b')) lockLandscape();
  }, true);

  addEventListener('resize', refreshGate, { passive: true });
  addEventListener('orientationchange', () => setTimeout(refreshGate, 120), { passive: true });
  if (screen.orientation && screen.orientation.addEventListener) {
    screen.orientation.addEventListener('change', refreshGate);
  }

  refreshGate();
})();
