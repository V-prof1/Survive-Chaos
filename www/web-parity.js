(() => {
'use strict';
const REV='113ba05ad505f1cc2687f3d4f0ba7748fc4af038';
const BASE=`https://cdn.jsdelivr.net/gh/V-prof1/Survive-Chaos-Mobile@${REV}/mobile-overrides/`;
const CSS=[
  'mobile-pro.css',
  'mobile-economy.css',
  'mobile-content.css',
  'mobile-legacy.css',
  'mobile-menu-fix.css',
  'mobile-admin-plus.css',
  'mobile-arsenal-skins.css',
  'mobile-rebalance.css',
  'mobile-hud-responsive.css',
  'mobile-skin-ults.css',
  'mobile-menu-refine.css',
  'mobile-hud-editor.css',
  'mobile-main-menu.css',
  'mobile-hud-editor-fix.css',
  'mobile-activities-pack.css',
  'mobile-modes-pack2.css',
  'mobile-replay-pack.css',
  'mobile-uiux-overhaul.css',
  'mobile-uiux-red-theme.css'
];
const JS=[
  'mobile-pro.js',
  'mobile-economy.js',
  'mobile-content.js',
  'mobile-legacy.js',
  'mobile-upgrade-icons.js',
  'mobile-admin-plus.js',
  'mobile-arsenal-skins.js',
  'mobile-rebalance.js',
  'mobile-difficulty-plus.js',
  'mobile-hud-responsive.js',
  'mobile-skin-ults.js',
  'mobile-menu-refine.js',
  'mobile-hud-editor.js',
  'mobile-ai-director.js',
  'mobile-xp-balance.js',
  'mobile-hud-editor-fix.js',
  'mobile-dev-baby-intro.js',
  'mobile-activities-pack.js',
  'mobile-modes-pack2.js',
  'mobile-replay-pack-v2.js',
  'mobile-squad-ai.js',
  'mobile-defense-mobility.js',
  'mobile-reality-break.js',
  'mobile-uiux-overhaul.js'
];
window.SC_WEB_PARITY={version:'3.0',revision:REV,status:'loading',loaded:[],failed:[],skipped:['android-online','cordova','portrait-lock','rotate-easteregg','kaneki']};

const play=document.getElementById('play');
const playText=play?play.textContent:'Jogar';
if(play){play.disabled=true;play.textContent='Sincronizando conteúdo…';play.dataset.parityLoading='1'}

for(const file of CSS){
  const l=document.createElement('link');
  l.rel='stylesheet';l.href=BASE+file;
  l.dataset.webParity=file;
  document.head.appendChild(l);
}

function load(file){return new Promise(resolve=>{
  const s=document.createElement('script');
  s.src=BASE+file;s.async=false;s.dataset.webParity=file;
  s.onload=()=>{SC_WEB_PARITY.loaded.push(file);resolve(true)};
  s.onerror=()=>{SC_WEB_PARITY.failed.push(file);console.warn('[Web Parity] Falhou:',file);resolve(false)};
  document.body.appendChild(s);
})}
function loadLocal(file){return new Promise(resolve=>{
  const s=document.createElement('script');s.src=file;s.async=false;s.dataset.webParity=file;
  s.onload=()=>{SC_WEB_PARITY.loaded.push(file);resolve(true)};
  s.onerror=()=>{SC_WEB_PARITY.failed.push(file);console.warn('[Web Parity] Falhou:',file);resolve(false)};
  document.body.appendChild(s)
})}

function relabel(){
  const legacy=document.querySelector('#legacy .legacyHead small');
  if(legacy&&/MOBILE/i.test(legacy.textContent))legacy.textContent='PROGRESSÃO WEB';
  const extra=document.querySelector('#mobileExtraModes .lbl');
  if(extra)extra.textContent='Modo extra · Web';
  const lead=document.querySelector('#legacyReward');
  if(lead)lead.title='Progressão compartilhada com o balanceamento atual do Survive Chaos';
  document.querySelectorAll('[data-mobile-only-label]').forEach(n=>n.textContent=String(n.textContent||'').replace(/MOBILE/gi,'WEB'));
}

(async()=>{
  for(const file of JS)await load(file);
  await loadLocal('web-ui-bridge.js?v=1');
  SC_WEB_PARITY.status=SC_WEB_PARITY.failed.length?'partial':'ready';
  relabel();
  const mo=new MutationObserver(relabel);mo.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>mo.disconnect(),30000);
  if(play){play.disabled=false;play.textContent=playText;delete play.dataset.parityLoading}
  try{
    const t=document.getElementById('toast');
    if(t){
      t.textContent=SC_WEB_PARITY.status==='ready'?'WEB PARITY 3.0 · CONTEÚDO MOBILE SINCRONIZADO':'ATUALIZAÇÃO PARCIAL · RECARREGUE A PÁGINA';
      t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2400)
    }
  }catch(_){ }
  console.log('[Web Parity 3.0] módulos:',SC_WEB_PARITY.loaded.length,'falhas:',SC_WEB_PARITY.failed,'ignorados:',SC_WEB_PARITY.skipped);
})();
})();
