(() => {
'use strict';
const REV='113ba05ad505f1cc2687f3d4f0ba7748fc4af038';
const BASE=`https://cdn.jsdelivr.net/gh/V-prof1/Survive-Chaos-Mobile@${REV}/mobile-overrides/`;
const CSS=[
  'mobile-pro.css','mobile-economy.css','mobile-content.css','mobile-legacy.css','mobile-menu-fix.css',
  'mobile-admin-plus.css','mobile-arsenal-skins.css','mobile-rebalance.css','mobile-hud-responsive.css',
  'mobile-skin-ults.css','mobile-menu-refine.css','mobile-hud-editor.css','mobile-main-menu.css',
  'mobile-hud-editor-fix.css','mobile-activities-pack.css','mobile-modes-pack2.css','mobile-replay-pack.css',
  'mobile-uiux-overhaul.css','mobile-uiux-red-theme.css'
];
const JS=[
  'mobile-pro.js','mobile-economy.js','mobile-content.js','mobile-legacy.js','mobile-upgrade-icons.js',
  'mobile-admin-plus.js','mobile-arsenal-skins.js','mobile-rebalance.js','mobile-difficulty-plus.js',
  'mobile-hud-responsive.js','mobile-skin-ults.js','mobile-menu-refine.js','mobile-hud-editor.js',
  'mobile-ai-director.js','mobile-xp-balance.js','mobile-hud-editor-fix.js','mobile-dev-baby-intro.js',
  'mobile-activities-pack.js','mobile-modes-pack2.js','mobile-replay-pack-v2.js','mobile-squad-ai.js',
  'mobile-defense-mobility.js','mobile-reality-break.js','mobile-uiux-overhaul.js'
];
window.SC_WEB_PARITY={version:'3.1',revision:REV,status:'loading',loaded:[],failed:[],timedOut:[],skipped:['android-online','cordova','portrait-lock','rotate-easteregg','kaneki']};

const play=document.getElementById('play');
const playText=(play&&play.textContent)||'Jogar';

// The Web build must NEVER depend on CDN parity finishing before the player can start.
function forcePlayReady(){
  if(!play)return;
  play.disabled=false;
  play.removeAttribute('disabled');
  play.textContent=playText;
  play.dataset.parityLoading=SC_WEB_PARITY.status==='loading'?'1':'0';
}
forcePlayReady();

// Safety net: the original game.js onclick remains the primary handler. If any imported
// UI layer removes/breaks it, repair the navigation after the click without double-running it.
if(play&&!play.dataset.webStartRescue){
  play.dataset.webStartRescue='1';
  play.addEventListener('click',()=>{
    setTimeout(()=>{
      try{
        const menu=document.getElementById('menu'),setup=document.getElementById('setup');
        if(menu&&menu.classList.contains('on')&&setup&&!setup.classList.contains('on')){
          if(typeof hide==='function')hide('menu');else menu.classList.remove('on');
          if(typeof show==='function')show('setup');else setup.classList.add('on');
          try{st='setup'}catch(_){ }
          if(typeof setupUI==='function')setupUI();
          try{if(typeof sfx==='function')sfx('ui')}catch(_){ }
          console.warn('[Web Parity] Play navigation rescued locally.');
        }
      }catch(e){console.warn('[Web Parity] Play rescue failed',e)}
    },0);
  });
}

for(const file of CSS){
  const l=document.createElement('link');l.rel='stylesheet';l.href=BASE+file;l.dataset.webParity=file;
  document.head.appendChild(l);
}

function load(file,timeoutMs=4500){return new Promise(resolve=>{
  const s=document.createElement('script');let done=false;
  const finish=(ok,why)=>{if(done)return;done=true;clearTimeout(timer);if(ok)SC_WEB_PARITY.loaded.push(file);else{SC_WEB_PARITY.failed.push(file);if(why==='timeout')SC_WEB_PARITY.timedOut.push(file);console.warn('[Web Parity] Falhou:',file,why||'error')}forcePlayReady();resolve(ok)};
  s.src=BASE+file;s.async=false;s.dataset.webParity=file;
  s.onload=()=>finish(true);s.onerror=()=>finish(false,'network');
  const timer=setTimeout(()=>{try{s.remove()}catch(_){ }finish(false,'timeout')},timeoutMs);
  document.body.appendChild(s);
})}
function loadLocal(file){return new Promise(resolve=>{
  const s=document.createElement('script');s.src=file;s.async=false;s.dataset.webParity=file;
  s.onload=()=>{SC_WEB_PARITY.loaded.push(file);resolve(true)};
  s.onerror=()=>{SC_WEB_PARITY.failed.push(file);console.warn('[Web Parity] Falhou local:',file);resolve(false)};
  document.body.appendChild(s)
})}

function relabel(){
  const legacy=document.querySelector('#legacy .legacyHead small');if(legacy&&/MOBILE/i.test(legacy.textContent))legacy.textContent='PROGRESSÃO WEB';
  const extra=document.querySelector('#mobileExtraModes .lbl');if(extra)extra.textContent='Modo extra · Web';
  const lead=document.querySelector('#legacyReward');if(lead)lead.title='Progressão compartilhada com o balanceamento atual do Survive Chaos';
  document.querySelectorAll('[data-mobile-only-label]').forEach(n=>n.textContent=String(n.textContent||'').replace(/MOBILE/gi,'WEB'));
}

(async()=>{
  // Load the local bridge first; it can keep retrying while optional remote content arrives.
  await loadLocal('web-ui-bridge.js?v=2');
  forcePlayReady();
  for(const file of JS)await load(file);
  SC_WEB_PARITY.status=SC_WEB_PARITY.failed.length?'partial':'ready';
  relabel();forcePlayReady();

  // If the player already opened Setup while parity was loading, refresh it once so late
  // mode/content modules become visible without forcing the player back to the menu.
  try{if(typeof st!=='undefined'&&st==='setup'&&typeof setupUI==='function')setupUI()}catch(_){ }

  const mo=new MutationObserver(relabel);mo.observe(document.body,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),12000);
  try{
    const t=document.getElementById('toast');if(t){
      t.textContent=SC_WEB_PARITY.status==='ready'?'WEB PARITY 3.1 · CONTEÚDO SINCRONIZADO':'WEB PRONTA · ALGUNS EXTRAS NÃO CARREGARAM';
      t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2400)
    }
  }catch(_){ }
  console.log('[Web Parity 3.1] módulos:',SC_WEB_PARITY.loaded.length,'falhas:',SC_WEB_PARITY.failed,'timeouts:',SC_WEB_PARITY.timedOut);
})();
})();
