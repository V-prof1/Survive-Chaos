/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* Survive Chaos — ECHO tutorial save sandbox 1.1 */
(()=>{'use strict';if(window.__SC_TUTORIAL_SANDBOX__)return;window.__SC_TUTORIAL_SANDBOX__=1;let snap=null,armed=false,wasActive=false,wasGuideEcho=false;
const clone=v=>{try{return JSON.parse(JSON.stringify(v))}catch(_){return null}};
function capture(){try{if(armed)return;snap={s:clone(S),cf:clone(CF)};armed=!!snap.s}catch(_){snap=null;armed=false}}
function restore(){if(!armed||!snap)return;try{for(const k of Object.keys(S))delete S[k];Object.assign(S,snap.s||{});Object.assign(CF,snap.cf||{});S.cf=CF;if(typeof CO!=='undefined'){CO.on=0;try{setBtn()}catch(_){}}if(typeof sv==='function')sv();if(typeof ref==='function')ref()}catch(e){console.warn('[Tutorial sandbox restore]',e)}snap=null;armed=false;wasActive=false;wasGuideEcho=false}
document.addEventListener('click',e=>{const b=e.target?.closest?.('#scTutNext');if(!b)return;if(/ECHO/i.test(b.textContent||'')&&/TREINO/i.test(b.textContent||''))capture()},true);
function loop(){requestAnimationFrame(loop);const guideEcho=document.documentElement.classList.contains('sc-guide-echo');if(guideEcho&&!wasGuideEcho&&!armed)capture();wasGuideEcho=guideEcho;const on=document.documentElement.classList.contains('sc-tut-practice');if(on)wasActive=true;else if(wasActive&&armed)restore()}requestAnimationFrame(loop);
window.SCTutorialSandbox={version:'1.1',capture,restore};
if(!document.querySelector('link[data-sc-guided-tour]')){const l=document.createElement('link');l.rel='stylesheet';l.href='guided-tour.css?v=4';l.dataset.scGuidedTour='1';document.head.appendChild(l)}
if(!document.querySelector('script[data-sc-guided-tour]')){const s=document.createElement('script');s.src='guided-tour.js?v=4';s.dataset.scGuidedTour='1';document.body.appendChild(s)}
if(!document.querySelector('script[data-sc-guide-router]')){const r=document.createElement('script');r.src='guided-tour-setup-router.js?v=1';r.dataset.scGuideRouter='1';document.body.appendChild(r)}
})();
