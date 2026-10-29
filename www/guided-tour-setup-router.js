/* Survive Chaos Web — Guided Tour setup-tab router */
(()=>{'use strict';if(window.__SC_GUIDE_SETUP_ROUTER__)return;window.__SC_GUIDE_SETUP_ROUTER__=1;
function activatePane(pane){const stage=pane?.parentElement,panel=pane?.closest?.('.scSetupShell');if(!pane||!stage||!panel)return;const key=pane.dataset.pane;window.__scSetupTab=key;panel.querySelectorAll('.scSetupTab').forEach(b=>{const on=b.dataset.tab===key;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false')});stage.querySelectorAll('.scSetupPane').forEach(p=>p.classList.toggle('on',p===pane))}
function tick(){try{const g=window.SCGuidedTour;if(!g?.isActive?.())return;const s=g.steps?.()[g.index?.()];const fn=s?.target||s?.q;if(typeof fn!=='function')return;const t=fn();const pane=t?.closest?.('.scSetupPane');if(!pane||pane.classList.contains('on'))return;activatePane(pane)}catch(_){} }
setInterval(tick,60);console.log('[Tutorial] Web setup-tab router active');
})();
