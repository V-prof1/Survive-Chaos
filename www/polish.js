(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const add=(el,cls)=>el&&el.classList.add(cls);
  const pulse=el=>{if(!el)return;el.classList.remove('sc-action-pop');void el.offsetWidth;el.classList.add('sc-action-pop');setTimeout(()=>el.classList.remove('sc-action-pop'),260)};

  // Corrige os ícones duplicados: mantém somente o ícone original do jogo.
  const iconFix=document.createElement('style');
  iconFix.textContent='#dash::before,#dash1::before,#ult::before,#ult1::before{content:none!important;display:none!important}';
  document.head.appendChild(iconFix);

  // Versão visível no menu
  const menu=$('menu');
  if(menu&&!menu.querySelector('.sc-beta-badge')){
    const b=document.createElement('div');
    b.className='sc-beta-badge';
    b.textContent='BETA 0.1';
    menu.appendChild(b);
  }

  // Partículas ambientais leves no menu (DOM, não interfere no canvas)
  if(menu&&!menu.querySelector('.sc-menu-particles')){
    const layer=document.createElement('div');
    layer.className='sc-menu-particles';
    const cols=['#56f2d4','#ffd34d','#8f72ff','#ff7764','#ffffff'];
    for(let i=0;i<24;i++){
      const p=document.createElement('i');
      p.className='sc-menu-particle';
      p.style.left=(Math.random()*100).toFixed(1)+'%';
      p.style.bottom=(-8-Math.random()*20).toFixed(1)+'%';
      p.style.setProperty('--dur',(8+Math.random()*10).toFixed(1)+'s');
      p.style.setProperty('--delay',(-Math.random()*14).toFixed(1)+'s');
      p.style.setProperty('--drift',(-55+Math.random()*110).toFixed(0)+'px');
      p.style.setProperty('--pc',cols[i%cols.length]);
      const s=2+Math.random()*2.5;p.style.width=p.style.height=s.toFixed(1)+'px';
      layer.appendChild(p);
    }
    menu.appendChild(layer);
  }

  // Atalhos de teclado visíveis somente em dispositivos com ponteiro preciso
  const keyHint=(id,key)=>{
    const el=$(id);if(!el||el.querySelector('.sc-key-hint'))return;
    const h=document.createElement('span');h.className='sc-key-hint';h.textContent=key;el.appendChild(h);
  };
  keyHint('dash','Q');keyHint('ult','E');

  // Feedback visual instantâneo dos botões sem tocar na lógica do jogo
  ['dash','dash1'].forEach(id=>$(id)?.addEventListener('pointerdown',()=>pulse($(id)),{passive:true}));
  ['ult','ult1'].forEach(id=>$(id)?.addEventListener('pointerdown',()=>pulse($(id)),{passive:true}));
  addEventListener('keydown',e=>{
    if(e.repeat)return;
    if(e.code==='KeyQ')pulse($('dash'));
    if(e.code==='KeyE')pulse($('ult'));
  });

  // Entrada cinematográfica puramente visual dos bosses
  const boss=$('boss'),bn=$('bn');
  let lastBoss='';
  function showBossIntro(){
    if(!boss||!bn)return;
    const name=(bn.textContent||'').trim();
    const visible=getComputedStyle(boss).display!=='none' && name;
    if(!visible||name===lastBoss)return;
    lastBoss=name;
    boss.classList.remove('sc-boss-enter');void boss.offsetWidth;boss.classList.add('sc-boss-enter');
    document.querySelector('.sc-boss-intro')?.remove();
    const o=document.createElement('div');o.className='sc-boss-intro';
    const t=document.createElement('div');
    t.textContent=name;
    const s=document.createElement('small');s.textContent='AMEAÇA DETECTADA';
    t.appendChild(s);o.appendChild(t);document.body.appendChild(o);
    setTimeout(()=>o.remove(),1450);
  }
  if(boss){
    new MutationObserver(showBossIntro).observe(boss,{attributes:true,attributeFilter:['style','class']});
    if(bn)new MutationObserver(showBossIntro).observe(bn,{childList:true,characterData:true,subtree:true});
  }

  // Cartas recebem tratamento de entrada consistente quando são recriadas
  const cards=$('cl');
  const polishCards=()=>{
    if(!cards)return;
    [...cards.children].forEach((c,i)=>{
      if(!c.classList.contains('card'))return;
      c.style.animationDelay=(i*.055)+'s';
      const txt=(c.textContent||'').toLowerCase();
      if(txt.includes('suprem')||txt.includes('imortal')||txt.includes('apocal'))c.classList.add('sup');
    });
  };
  if(cards){new MutationObserver(polishCards).observe(cards,{childList:true,subtree:true});polishCards()}

  // Pequena assinatura visual no rodapé do menu
  const ft=menu?.querySelector('.ft');
  if(ft&&!ft.dataset.polished){
    ft.dataset.polished='1';
    ft.innerHTML='ANDROID · TOUCH · TECLADO · CONTROLE<br><span style="opacity:.66">Q DASH · E ULT</span>';
  }
})();
