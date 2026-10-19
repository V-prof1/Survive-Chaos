// ===== interface: botão/tecla de pausa e rolagem melhorada =====
// Pausa: botão grande no canto superior direito (HUD) e tecla P. Rolagem: um único scroll por tela,
// arrastar com o mouse, teclado (setas, PageUp/PageDown, Home/End), sombras nas bordas e volta ao topo ao abrir.
addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||''))return;
if(e.key.toLowerCase()=='p'){if(st=='play'){st='pause';show('pause')}else if(st=='pause'){hide('pause');st='play'}}});
const scBox=el=>{while(el&&el!==document.body){const cs=getComputedStyle(el);if(/(auto|scroll)/.test(cs.overflowY)&&el.scrollHeight>el.clientHeight+2)return el;el=el.parentElement}return null};
let scDr=null;
addEventListener('pointerdown',e=>{if(e.pointerType!='mouse'||e.button!==0||st=='play'||!e.target.closest)return;const sc=e.target.closest('.scr');if(!sc||!sc.classList.contains('on')||e.target.closest('input,select,textarea'))return;const b=scBox(e.target);if(b)scDr={b,y:e.clientY,t:b.scrollTop,m:0}},true);
addEventListener('pointermove',e=>{if(!scDr)return;const d=e.clientY-scDr.y;if(Math.abs(d)>6)scDr.m=1;if(scDr.m){scDr.b.scrollTop=scDr.t-d;e.preventDefault()}},true);
addEventListener('pointerup',()=>{if(scDr&&scDr.m){const stop=ev=>{ev.stopPropagation();ev.preventDefault()};addEventListener('click',stop,true);setTimeout(()=>removeEventListener('click',stop,true),60)}scDr=null},true);
addEventListener('keydown',e=>{if(['play','pause','cards','devi'].includes(st)||/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||''))return;
const sc=document.querySelector('.scr.on');if(!sc)return;const b=scBox(sc.querySelector('.lstb,.cbody')||sc)||scBox(sc);if(!b)return;const k=e.key,h=b.clientHeight*.85;
if(k=='ArrowDown'){b.scrollBy({top:70,behavior:'smooth'});e.preventDefault()}else if(k=='ArrowUp'){b.scrollBy({top:-70,behavior:'smooth'});e.preventDefault()}
else if(k=='PageDown'){b.scrollBy({top:h,behavior:'smooth'});e.preventDefault()}else if(k=='PageUp'){b.scrollBy({top:-h,behavior:'smooth'});e.preventDefault()}
else if(k=='Home'){b.scrollTo({top:0,behavior:'smooth'});e.preventDefault()}else if(k=='End'){b.scrollTo({top:b.scrollHeight,behavior:'smooth'});e.preventDefault()}});
const scFade=b=>{b.style.setProperty('--mt',b.scrollTop>4?'24px':'0px');b.style.setProperty('--mb',b.scrollTop+b.clientHeight<b.scrollHeight-4?'24px':'0px')};
document.addEventListener('scroll',e=>{const t=e.target;if(t&&t.classList&&(t.classList.contains('lstb')||t.classList.contains('cbody')))scFade(t)},true);
setInterval(()=>{document.querySelectorAll('.scr.on .lstb,.scr.on .cbody').forEach(scFade)},400);
if(typeof MutationObserver!='undefined'){const ob=new MutationObserver(ms=>{for(const m of ms){const t=m.target;if(t.classList.contains('on')&&!(m.oldValue||'').split(' ').includes('on')){t.scrollTop=0;t.querySelectorAll('.lstb,.cbody,.panel.setup').forEach(q=>{q.scrollTop=0})}}});
document.querySelectorAll('.scr').forEach(s=>ob.observe(s,{attributes:true,attributeFilter:['class'],attributeOldValue:true}))}
