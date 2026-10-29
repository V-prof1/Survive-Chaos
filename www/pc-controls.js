/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
// Controles extras para PC.
// Os atalhos de gameplay (WASD/Setas, dash e ULT) ficam centralizados em game.js.
// Este arquivo apenas carrega sprint, stamina e efeitos da Beta 0.2.
(() => {
  if (document.querySelector('script[data-sc-beta02]')) return;
  const beta = document.createElement('script');
  beta.src = 'beta02.js';
  beta.defer = true;
  beta.dataset.scBeta02 = '1';
  document.body.appendChild(beta);
})();
