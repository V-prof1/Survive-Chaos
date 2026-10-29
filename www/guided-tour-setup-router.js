/* Survive Chaos Web — Guided Tour setup-tab router */
(()=>{'use strict';if(window.__SC_GUIDE_SETUP_ROUTER__)return;window.__SC_GUIDE_SETUP_ROUTER__=1;
function tick(){try{const g=window.SCGuidedTour;if(!g?.isActive?.())return;const s=g.steps?.()[g.index?.()];const fn=s?.target||s?.q;if(typeof fn!=='function')return;const t=fn();const pane=t?.closest?.('.scSetupPane');if(!pane||pane.classList.contains('on'))return;const tab=document.querySelector(`.scSetupTab[data-tab="${pane.dataset.pane}"]`);if(tab)tab.click()}catch(_){} }
setInterval(tick,90);console.log('[Tutorial] Web setup-tab router active');
})();
