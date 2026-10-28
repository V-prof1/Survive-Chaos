(() => {
'use strict';
/* Survive Chaos Web — Safe UI 4.0
   The browser build must never import raw Mobile menu/HUD layers.
   game.js/dev.js parity patches are already applied by the local loaders. */
const VERSION='4.0';
window.SC_WEB_PARITY={
  version:VERSION,
  status:'safe-ui',
  loaded:['web-core-loader','web-dev-loader'],
  failed:[],
  skipped:[
    'raw-mobile-menu','raw-mobile-hud','raw-mobile-css','raw-mobile-dom-observers',
    'android-online','cordova','portrait-lock','rotate-easteregg','kaneki'
  ]
};

function repairBaseButtons(){
  const play=document.getElementById('play');
  if(play){
    play.disabled=false;
    play.removeAttribute('disabled');
    play.style.pointerEvents='auto';
    play.style.touchAction='manipulation';
  }
  document.querySelectorAll('#menu button,#setup button,#shop button,#ach button,#hist button').forEach(b=>{
    b.disabled=false;
    b.style.pointerEvents='auto';
    b.style.touchAction='manipulation';
  });
}

// Remove leftovers if an older cached parity layer injected them before this file arrived.
function clearLegacyWebParity(){
  document.querySelectorAll('[data-web-parity]').forEach(n=>{try{n.remove()}catch(_){}});
  document.body.classList.remove('scWebParity');
  const menu=document.getElementById('menu');
  if(menu){
    menu.classList.remove('scMenuV2');
    menu.removeAttribute('data-sc-menu-layout');
  }
}

clearLegacyWebParity();
repairBaseButtons();

// Last-resort native navigation rescue. It runs only when the original game handler failed.
const play=document.getElementById('play');
if(play&&!play.dataset.webSafeRescue){
  play.dataset.webSafeRescue='1';
  play.addEventListener('click',()=>setTimeout(()=>{
    try{
      const menu=document.getElementById('menu'),setup=document.getElementById('setup');
      if(menu&&menu.classList.contains('on')&&setup&&!setup.classList.contains('on')){
        if(typeof hide==='function')hide('menu');else menu.classList.remove('on');
        if(typeof show==='function')show('setup');else setup.classList.add('on');
        try{st='setup'}catch(_){ }
        if(typeof setupUI==='function')setupUI();
      }
    }catch(e){console.warn('[Web Safe UI] navigation rescue failed',e)}
  },0));
}

// A couple of delayed passes handle browsers restoring an old page snapshot from bfcache.
setTimeout(repairBaseButtons,100);
setTimeout(repairBaseButtons,600);
addEventListener('pageshow',()=>{clearLegacyWebParity();repairBaseButtons()},{passive:true});

console.log('[Web Safe UI '+VERSION+'] Raw Mobile UI injection disabled; native Web controls active.');
})();
