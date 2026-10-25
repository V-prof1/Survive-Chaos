(() => {
'use strict';
const $=id=>document.getElementById(id);
let queued=0;
function style(){
  if($('scWebParityStyle'))return;
  const s=document.createElement('style');s.id='scWebParityStyle';s.textContent=`
body.scWebParity #menu.scMenuV2 .mt::after{content:'WEB BUILD'!important}
body.scWebParity #menu.scMenuV2 .scMenuQuick{grid-template-columns:repeat(5,minmax(0,1fr))!important}
body.scWebParity #menu.scMenuV2 .scMenuSystems{grid-template-columns:1fr!important;grid-template-rows:auto repeat(2,minmax(44px,1fr))!important}
body.scWebParity #menu.scMenuV2 .scMenuSystems .btn{min-height:44px!important}
body.scWebParity #menu.scMenuV2 .scMenuPrefs{display:none!important}
body.scWebParity #menu.scMenuV2 .scMenuQuick .btn[data-sc-icon-only="1"]{font-size:0!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:center!important}
body.scWebParity #menu.scMenuV2 .scMenuQuick .btn[data-sc-icon-only="1"]::before{content:attr(data-sc-menu-icon)!important;font:22px/1 system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif!important;color:#fff!important}
@media (orientation:landscape){body.scWebParity #menu.scMenuV2 .scMenuHub{grid-template-areas:'account account' 'primary systems' 'quick systems' 'foot foot'!important}}
@media (orientation:portrait){body.scWebParity #menu.scMenuV2{overflow-y:auto!important}body.scWebParity #menu.scMenuV2 .scMenuHub{display:flex!important;flex-direction:column!important;min-height:0!important}body.scWebParity #menu.scMenuV2 .scMenuSystems{display:grid!important;grid-template-rows:auto auto auto!important}}
`;
  document.head.appendChild(s);
}
function iconize(el,icon,label,only=false){if(!el)return;el.dataset.scMenuIcon=icon;el.setAttribute('aria-label',label);el.title=label;if(only)el.dataset.scIconOnly='1'}
function syncSound(){const snd=$('snd');if(!snd)return;const muted=typeof S!=='undefined'&&!!S.mute;iconize(snd,muted?'🔈':'🔊',muted?'Som desligado':'Som ligado',true)}
function mount(){
  style();document.body.classList.add('scWebParity');
  const menu=$('menu'),mb=menu&&menu.querySelector('.mb');
  if(!menu||!mb)return false;
  if(mb.dataset.scWebHub==='1'){syncSound();return true}
  const play=$('play'),shop=$('shopb'),ach=$('achb'),hist=$('histb'),snd=$('snd'),trk=$('trk'),econ=$('econBtn'),legacy=$('legacyBtn');
  if(!play||!shop||!ach||!hist||!snd||!trk||!econ||!legacy)return false;
  const prof=mb.querySelector('.prof'),stats=mb.querySelector('.row2'),ft=mb.querySelector('.ft');
  const account=document.createElement('section');account.className='scMenuAccount';if(prof)account.appendChild(prof);if(stats)account.appendChild(stats);
  const primary=document.createElement('section');primary.className='scMenuPrimary';primary.appendChild(play);
  const quick=document.createElement('section');quick.className='scMenuQuick';
  iconize(shop,'🎭','Skins',true);iconize(ach,'🏅','Conquistas',true);iconize(hist,'🕘','Histórico',true);syncSound();iconize(trk,'🎵','Música',true);quick.append(shop,ach,hist,snd,trk);
  const systems=document.createElement('section');systems.className='scMenuSystems';
  iconize(econ,'◇','Núcleo & Mercado');iconize(legacy,'⚔','Arsenal & Desafios');systems.append(econ,legacy);
  const prefs=document.createElement('section');prefs.className='scMenuPrefs';
  mb.replaceChildren(account,primary,quick,systems,prefs);if(ft)mb.appendChild(ft);
  mb.classList.add('scMenuHub');mb.dataset.scWebHub='1';menu.classList.add('scMenuV2');menu.dataset.scMenuLayout='web-responsive';
  if(!snd.dataset.scWebSoundHook){snd.dataset.scWebSoundHook='1';snd.addEventListener('click',()=>setTimeout(syncSound,0))}
  return true;
}
function schedule(){if(queued)return;queued=requestAnimationFrame(()=>{queued=0;if(!mount())setTimeout(schedule,120)})}
schedule();
const mo=new MutationObserver(schedule);mo.observe(document.body,{childList:true,subtree:true});
setTimeout(()=>mo.disconnect(),30000);
window.SCWebUIBridge={version:'1.0',mount};
})();
