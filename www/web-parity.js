(() => {
'use strict';
const REV='0ab65d9b31488651a8ccf277187cf2b290b2d1a8';
const BASE=`https://cdn.jsdelivr.net/gh/V-prof1/Survive-Chaos-Mobile@${REV}/mobile-overrides/`;
const CSS=[
  'mobile-pro.css',
  'mobile-economy.css',
  'mobile-content.css',
  'mobile-legacy.css',
  'mobile-arsenal-skins.css',
  'mobile-rebalance.css',
  'mobile-hud-responsive.css'
];
const JS=[
  'mobile-pro.js',
  'mobile-economy.js',
  'mobile-content.js',
  'mobile-legacy.js',
  'mobile-saveguard.js',
  'mobile-upgrade-icons.js',
  'mobile-arsenal-skins.js',
  'mobile-rebalance.js',
  'mobile-hud-responsive.js'
];
window.SC_WEB_PARITY={version:'2.1',revision:REV,status:'loading',loaded:[],failed:[]};

const play=document.getElementById('play');
const playText=play?play.textContent:'Jogar';
if(play){play.disabled=true;play.textContent='Carregando atualização…';play.dataset.parityLoading='1'}

for(const file of CSS){
  const l=document.createElement('link');
  l.rel='stylesheet';l.href=BASE+file;
  l.dataset.webParity=file;
  document.head.appendChild(l);
}
const ultCss=document.createElement('link');ultCss.rel='stylesheet';ultCss.href='skin-ults.css?v=1';ultCss.dataset.webParity='skin-ults.css';document.head.appendChild(ultCss);

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
}

(async()=>{
  for(const file of JS)await load(file);
  await loadLocal('skin-ults.js?v=1');
  SC_WEB_PARITY.status=SC_WEB_PARITY.failed.length?'partial':'ready';
  relabel();
  const mo=new MutationObserver(relabel);mo.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>mo.disconnect(),30000);
  if(play){play.disabled=false;play.textContent=playText;delete play.dataset.parityLoading}
  try{
    const t=document.getElementById('toast');
    if(t){
      t.textContent=SC_WEB_PARITY.status==='ready'?'WEB ATUALIZADO · ULTs POR SKIN':'ATUALIZAÇÃO PARCIAL · RECARREGUE A PÁGINA';
      t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)
    }
  }catch(_){ }
  console.log('[Web Parity] Sistemas carregados:',SC_WEB_PARITY.loaded.length,'falhas:',SC_WEB_PARITY.failed);
})();
})();
