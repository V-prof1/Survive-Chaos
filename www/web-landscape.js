/* Survive Chaos Web — robust landscape shell */
(() => {
  'use strict';
  if (window.__SC_WEB_LANDSCAPE_V2__) return;
  window.__SC_WEB_LANDSCAPE_V2__ = true;

  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window || matchMedia('(pointer: coarse)').matches;
  if (!touch) {
    document.documentElement.classList.add('sc-desktop','sc-landscape');
    return;
  }

  const root = document.documentElement;
  root.classList.add('sc-touch');

  const gate = document.createElement('div');
  gate.id = 'scLandscapeGate';
  gate.innerHTML = `
    <div class="sc-rotate-card">
      <div class="sc-phone-rotate" aria-hidden="true"></div>
      <b>JOGUE NA HORIZONTAL</b>
      <span>Vire o celular de lado para usar a interface completa do Survive Chaos.</span>
      <button type="button" id="scLandscapeButton">ENTRAR EM TELA CHEIA</button>
      <small>Se o navegador não conseguir girar sozinho, ative a rotação automática do Android e vire o aparelho.</small>
    </div>`;
  document.body.appendChild(gate);

  const button = document.getElementById('scLandscapeButton');
  const landscape = () => {
    const vv = window.visualViewport;
    const w = vv ? vv.width : innerWidth;
    const h = vv ? vv.height : innerHeight;
    return w >= h;
  };

  function refresh() {
    const wide = landscape();
    root.classList.toggle('sc-landscape', wide);
    root.classList.toggle('sc-portrait', !wide);
  }

  async function enterFullscreen() {
    if (document.fullscreenElement) return true;
    try {
      if (root.requestFullscreen) {
        await root.requestFullscreen();
        return true;
      }
      if (root.webkitRequestFullscreen) {
        root.webkitRequestFullscreen();
        return true;
      }
    } catch (_) {}
    return false;
  }

  async function lockLandscape() {
    await enterFullscreen();
    try {
      if (screen.orientation?.lock) {
        try { await screen.orientation.lock('landscape-primary'); }
        catch (_) { try { await screen.orientation.lock('landscape'); } catch (_) {} }
      }
    } catch (_) {}
    refresh();
    setTimeout(refresh,120);
    setTimeout(refresh,350);
    setTimeout(refresh,800);
  }

  button.addEventListener('click', lockLandscape);
  button.addEventListener('pointerup', lockLandscape);

  document.addEventListener('pointerup', e => {
    if (e.target?.closest?.('#play,#go,#again,#intro_b')) lockLandscape();
  }, true);

  addEventListener('resize', refresh, {passive:true});
  addEventListener('orientationchange', () => setTimeout(refresh,100), {passive:true});
  visualViewport?.addEventListener('resize', refresh, {passive:true});
  screen.orientation?.addEventListener?.('change', refresh);
  document.addEventListener('fullscreenchange', refresh, {passive:true});

  refresh();
})();