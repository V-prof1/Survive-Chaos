/* Survive Chaos Web — Advanced Modes 3.0
   Web-only game modes with lightweight UI/runtime hooks. */
(() => {
'use strict';
if(window.__SC_WEB_MODES_V3__)return;
window.__SC_WEB_MODES_V3__=true;
try {
  const MODES=[
    {id:0,icon:'—',name:'Nenhum',short:'Jogo base, sem regra avançada extra.',min:0},
    {id:1,icon:'🌍',name:'World Shift',short:'Clima, bioma e pressão mudam durante a run.',min:0},
    {id:2,icon:'🧭',name:'Expedição',short:'Avance por setores com metas, elites e recompensas.',min:0},
    {id:3,icon:'🚪',name:'Escape',short:'Aguente a perseguição até a janela de extração.',min:0},
    {id:4,icon:'🏰',name:'Horde Defense',short:'Ondas crescentes; boss a cada 5 ondas.',min:0},
    {id:5,icon:'👑',name:'Boss Marathon',short:'Chefes em sequência e pouco tempo para respirar.',min:1},
    {id:6,icon:'🪞',name:'Mirror',short:'Ecos fortalecidos copiam ameaças da arena.',min:1},
    {id:7,icon:'🎲',name:'Randomizer Total',short:'Eventos seguros e imprevisíveis mudam a run.',min:1},
    {id:8,icon:'🧬',name:'Hybrid World',short:'Biomas e condições se fundem durante a partida.',min:0},
    {id:9,icon:'🃏',name:'Chaos Draft',short:'Ganhe upgrade aleatório e pague com uma horda.',min:0},
    {id:10,icon:'➕',name:'New Game+',short:'Endgame: inimigos muito mais fortes e escalada contínua.',min:2},
    {id:11,icon:'☄️',name:'Bullet Hell',short:'Inimigos próximos criam padrões extras de projéteis.',min:1},
    {id:12,icon:'🎰',name:'Reality Roulette',short:'Uma nova regra brutal é sorteada periodicamente.',min:2}
  ];
  const byId=id=>MODES.find(m=>m.id===id)||MODES[0];
  if(!Number.isInteger(S.webAdvMode))S.webAdvMode=0;

  const A={active:false,mode:0,t:0,next:0,stage:0,wave:0,baseKills:0,goal:0,applied:false,roulette:'',escapeAt:0,scaleAt:0,hudAt:0};
  const DIFF={
    0:{name:'FÁCIL',boss:1,ring:18,elite:2,proj:90},
    1:{name:'MÉDIO',boss:1,ring:26,elite:3,proj:125},
    2:{name:'DIFÍCIL',boss:2,ring:36,elite:5,proj:165},
    3:{name:'PESADELO',boss:2,ring:48,elite:7,proj:210},
    4:{name:'BABY',boss:1,ring:14,elite:1,proj:70}
  };
  const BABY=new Set([0,1,2,3,4,9]);
  const EASY=new Set([0,1,2,3,4,8,9]);
  let hudNode=null,hudName=null,hudInfo=null;

  function allowed(id){
    if(id===0)return true;
    const m=byId(id),d=CF.m|0;
    if(d===4&&!BABY.has(id))return false;
    if(d===0&&!EASY.has(id))return false;
    if((d===0||d===4)&&m.min>0)return false;
    if(d===1&&m.min>1)return false;
    if(id===5&&CF.g===5)return false;
    return true;
  }
  function lockText(m){
    if(m.id===5&&CF.g===5)return 'BOSS RUSH JÁ ATIVO';
    if(CF.m===4)return 'BLOQUEADO NO BABY';
    if(CF.m===0)return 'EXIGE MÉDIO+';
    if(m.min===2)return 'EXIGE DIFÍCIL+';
    return 'INDISPONÍVEL';
  }
  function normalize(){
    if(!allowed(S.webAdvMode)){S.webAdvMode=0;try{sv()}catch(_){}}
  }
  function notice(a,b=''){
    try{ban(a+(b?' · '+b:''));sfx('ui')}catch(_){}
  }
  function diff(){return DIFF[CF.m]||DIFF[1]}
  function bossCount(){let n=0;for(const e of E)if(e&&!e.dead&&e.boss&&!e.dv)n++;return n}
  function safeBoss(i){
    if(!P||bossCount()>=diff().boss)return false;
    try{boss(Number.isFinite(i)?i:Math.floor(R()*4));return true}catch(_){return false}
  }
  function aliveNormalCount(){let n=0;for(const e of E)if(e&&!e.dead&&!e.boss)n++;return n}
  function safeRing(n){
    if(!P)return;
    const cap=diff().ring,room=Math.max(0,cap*3-aliveNormalCount());
    if(room>0)ring(Math.min(n,cap,room));
  }
  function safeElite(n){if(P)elite(Math.min(n,diff().elite))}
  function reward(n=20){
    try{earned+=Math.max(2,Math.round(n*Math.max(.3,Math.min(1.5,(MZ&&MZ[4])||1))))}catch(_){}
  }
  function heal(fr=.12){if(P)P.hp=Math.min(P.mhp,P.hp+P.mhp*fr)}
  function sampleEnemies(max,pred){
    const out=[];let seen=0;
    for(const e of E){
      if(!pred(e))continue;
      seen++;
      if(out.length<max)out.push(e);
      else{const j=Math.floor(R()*seen);if(j<max)out[j]=e}
    }
    return out;
  }

  function ensureHud(){
    if(hudNode&&hudNode.isConnected)return;
    hudNode=document.getElementById('scWebModeHud');
    if(!hudNode){
      hudNode=document.createElement('div');hudNode.id='scWebModeHud';
      hudNode.innerHTML='<small>MODO AVANÇADO</small><b></b><span></span>';
      document.body.appendChild(hudNode);
    }
    hudName=hudNode.querySelector('b');hudInfo=hudNode.querySelector('span');
  }
  function hud(force=false){
    if(!force&&T<A.hudAt)return;A.hudAt=T+.5;ensureHud();
    const m=byId(A.mode);hudNode.classList.toggle('on',A.active&&A.mode>0&&st==='play');
    hudName.textContent=m.icon+' '+m.name;
    let info='';
    if(A.mode===2)info='Setor '+Math.max(1,A.stage)+' · '+Math.max(0,kills-A.baseKills)+'/'+Math.max(1,A.goal);
    else if(A.mode===4)info='Onda '+A.wave+' · próxima em '+Math.max(0,Math.ceil(A.next-T))+'s';
    else if(A.mode===3)info='Extração em '+Math.max(0,Math.ceil(A.escapeAt-T))+'s';
    else if(A.mode===12)info=A.roulette||'Realidade instável';
    else info='Dificuldade: '+diff().name;
    hudInfo.textContent=info;
  }

  function modeDesc(){
    const m=byId(S.webAdvMode);
    return '<strong>'+m.icon+' '+m.name+'</strong><span>'+m.short+(m.id?' Pode combinar com o modo base quando a dificuldade permitir.':'')+'</span>';
  }
  function paintModeSelection(sec){
    if(!sec)return;
    sec.querySelectorAll('.scWebModeCard').forEach(b=>{
      const id=Number(b.dataset.mode);b.classList.toggle('on',id===S.webAdvMode);
    });
    const d=sec.querySelector('.scWebModeDesc');if(d)d.innerHTML=modeDesc();
  }
  function mountSetup(){
    normalize();
    const panel=document.querySelector('#setup .panel.setup'),go=document.getElementById('go');if(!panel||!go)return;
    document.getElementById('scWebAdvancedModes')?.remove();
    const sec=document.createElement('div');sec.id='scWebAdvancedModes';sec.className='sec sc-advanced';
    sec.innerHTML='<div class="scWebModesHead"><div><small>CAMADA EXTRA</small><b>Modos avançados</b></div><span>12 MODOS</span></div>';
    const grid=document.createElement('div');grid.className='scWebModeGrid';
    for(const m of MODES){
      const ok=allowed(m.id),b=document.createElement('button');b.type='button';b.dataset.mode=String(m.id);
      b.className='opt scWebModeCard'+(S.webAdvMode===m.id?' on':'')+(ok?'':' locked dis');
      if(!ok)b.dataset.lock=lockText(m);
      b.innerHTML='<span class="wmIcon">'+m.icon+'</span><span class="wmCopy"><b>'+m.name+'</b><small>'+m.short+'</small></span>';
      b.onclick=()=>{
        if(!ok){try{sfx('hurt')}catch(_){};notice('MODO BLOQUEADO',lockText(m));return}
        S.webAdvMode=m.id;try{sv();sfx('ui')}catch(_){}
        paintModeSelection(sec);
      };
      grid.appendChild(b);
    }
    sec.appendChild(grid);
    const d=document.createElement('div');d.className='scWebModeDesc';d.innerHTML=modeDesc();sec.appendChild(d);
    panel.insertBefore(sec,go.parentElement||go);
  }

  const baseSetup=setupUI;
  setupUI=function(){const r=baseSetup.apply(this,arguments);mountSetup();return r};

  function begin(){
    normalize();A.active=S.webAdvMode>0;A.mode=S.webAdvMode|0;A.t=0;A.stage=1;A.wave=0;A.baseKills=kills||0;A.goal=35;A.applied=false;A.roulette='';A.scaleAt=0;A.hudAt=0;
    const m=A.mode;
    A.next=T+(m===4?18:m===5?22:m===1?45:m===6?35:m===7?24:m===8?55:m===9?58:m===11?2.5:m===12?34:45);
    A.escapeAt=T+[420,480,540,600,360][CF.m||0];
    if(A.active)notice('MODO AVANÇADO: '+byId(m).name);
    hud(true);
  }
  const baseStart=start;
  start=function(){const r=baseStart.apply(this,arguments);begin();return r};

  function applyPlayerOnce(){
    if(A.applied||!P)return;A.applied=true;
    if(A.mode===10){P.dmg*=1.12;P.xpm*=1.12;notice('NEW GAME+','+12% dano e XP para sobreviver ao endgame')}
    if(A.mode===3){P.sp*=1.06;notice('ESCAPE','+6% velocidade para a perseguição')}
  }
  function scaleNewEnemies(){
    if(!A.active||!P||T<A.scaleAt)return;A.scaleAt=T+.3;
    const ng=A.mode===10,exp=A.mode===2,def=A.mode===4;
    if(!ng&&!exp&&!def)return;
    for(const e of E){
      if(!e||e.dead||e.__wmScale)continue;e.__wmScale=1;if(e.dv)continue;
      let hp=1,dm=1,sp=1;
      if(ng){hp*=1.7;dm*=1.38;sp*=1.07}
      if(exp){hp*=1+Math.max(0,A.stage-1)*.055;dm*=1+Math.max(0,A.stage-1)*.028}
      if(def){hp*=1+Math.max(0,A.wave-1)*.025;dm*=1+Math.max(0,A.wave-1)*.012}
      e.hp*=hp;e.mh*=hp;e.dmg*=dm;e.sp*=sp;
    }
  }

  function worldShift(){
    const q=Math.floor(R()*5);A.stage++;
    if(q===0){rain=Math.max(rain,38);notice('WORLD SHIFT','chuva de caça')}
    else if(q===1){dark=Math.max(dark,32);notice('WORLD SHIFT','apagão')}
    else if(q===2){horde=Math.max(horde,25);safeRing(8+A.stage*2);notice('WORLD SHIFT','maré de inimigos')}
    else if(q===3){silence=Math.max(silence,7);safeElite(1+Math.floor(A.stage/3));notice('WORLD SHIFT','zona morta')}
    else {bi=(bi+1)%5;notice('WORLD SHIFT','bioma: '+BI[bi][0])}
    if(A.stage%2===0)bi=(bi+1)%5;A.next=T+48+R()*22;
  }
  function expedition(){
    const prog=kills-A.baseKills;if(prog<A.goal)return;
    reward(28+A.stage*7);heal(.14);A.stage++;A.baseKills=kills;A.goal=32+A.stage*13;safeElite(Math.min(1+Math.floor(A.stage/3),3));
    if(A.stage%3===0&&CF.m>=1)safeBoss((A.stage/3-1)%4);notice('SETOR CONCLUÍDO','Expedição '+A.stage);hud(true);
  }
  function escape(){
    if(T>=A.escapeAt){A.active=false;reward(80);notice('EXTRAÇÃO CONCLUÍDA','você escapou');hud(true);try{end(1)}catch(_){};return}
    if(T>=A.next){safeRing(8+Math.floor(Math.max(0,T-(A.escapeAt-420))/60)*2);if(CF.m>=1&&R()<.35)safeElite(1);A.next=T+38;notice('PERSEGUIÇÃO','a extração ainda não chegou')}
  }
  function defense(){
    if(T<A.next)return;A.wave++;safeRing(7+A.wave*2);
    if(A.wave%3===0)safeElite(1+Math.floor(A.wave/6));if(A.wave%5===0&&CF.m>=1)safeBoss((A.wave/5-1)%4);
    reward(5+Math.min(20,A.wave));heal(.04);A.next=T+Math.max(12,22-A.wave*.45);notice('HORDE DEFENSE','onda '+A.wave);hud(true);
  }
  function marathon(){
    if(T<A.next||bossCount()>=diff().boss)return;
    if(safeBoss(A.stage%4)){A.stage++;A.next=T+Math.max(34,68-A.stage*2);notice('BOSS MARATHON','chefe '+A.stage)}else A.next=T+10;
  }
  function mirror(){
    if(T<A.next)return;
    const pool=sampleEnemies(Math.min(2+Math.floor(CF.m/2),4),e=>e&&!e.dead&&!e.boss&&e.k>=0);let n=0;
    for(const src of pool){const e=spawn(src.k,src.x+(R()-.5)*90,src.y+(R()-.5)*90,1);if(e){e.hp*=1.45;e.mh=e.hp;e.dmg*=1.2;e.col='#c36cff';e.__mirror=1;n++}}
    if(n)notice('MIRROR','ecos hostis materializados');A.next=T+32;
  }
  function randomizer(){
    if(T<A.next)return;const q=Math.floor(R()*6);
    if(q===0){safeRing(10);notice('RANDOMIZER','horda')}
    else if(q===1){safeElite(2);notice('RANDOMIZER','elite dupla')}
    else if(q===2){rain=Math.max(rain,25);notice('RANDOMIZER','chuva')}
    else if(q===3){dark=Math.max(dark,22);notice('RANDOMIZER','apagão')}
    else if(q===4){heal(.18);notice('RANDOMIZER','recuperação')}
    else{horde=Math.max(horde,18);safeRing(6);notice('RANDOMIZER','sangue e caos')}
    A.next=T+24+R()*8;
  }
  function hybrid(){
    if(T<A.next)return;bi=(bi+1+Math.floor(R()*4))%5;const q=Math.floor(R()*3);
    if(q===0)rain=Math.max(rain,32);else if(q===1)dark=Math.max(dark,28);else horde=Math.max(horde,22);
    safeRing(8);A.stage++;notice('HYBRID WORLD',BI[bi][0]+' corrompido');A.next=T+52+R()*18;
  }
  function draft(){
    if(T<A.next)return;
    try{const pool=U.filter(u=>(P.lv[u[0]]||0)<u[3]);if(pool.length){const u=pool[Math.floor(R()*pool.length)];giveUp(u);notice('CHAOS DRAFT','upgrade: '+u[1])}}catch(_){}
    safeRing(8+Math.floor(CF.m*2));A.next=T+58;
  }
  function bulletHell(){
    if(T<A.next)return;if(EB.length>diff().proj){A.next=T+1.5;return}
    const pool=sampleEnemies(CF.m>=3?3:2,e=>e&&!e.dead&&!e.boss&&Math.hypot(e.x-P.x,e.y-P.y)<520);
    for(const e of pool)radial(e,CF.m>=3?8:CF.m>=2?6:5,125+CF.m*8,R()*PI*2,'#ff5169');
    A.next=T+(CF.m>=3?2.0:2.7);
  }
  function roulette(){
    if(T<A.next)return;const q=Math.floor(R()*7);
    if(q===0){A.roulette='BOSS';safeBoss(A.stage%4)}
    else if(q===1){A.roulette='HORDA';safeRing(18)}
    else if(q===2){A.roulette='APAGÃO';dark=Math.max(dark,30)}
    else if(q===3){A.roulette='CHUVA';rain=Math.max(rain,35)}
    else if(q===4){A.roulette='ELITES';safeElite(3)}
    else if(q===5){A.roulette='BIOMA';bi=(bi+1)%5}
    else{A.roulette='RECUPERAÇÃO';heal(.25)}
    A.stage++;notice('REALITY ROULETTE',A.roulette);A.next=T+36+R()*8;hud(true);
  }

  const baseModes=modes;
  modes=function(dt){
    baseModes.apply(this,arguments);
    if(!A.active||st!=='play'||!P){hud();return}
    A.t+=dt;applyPlayerOnce();scaleNewEnemies();
    if(A.mode===1&&T>=A.next)worldShift();
    else if(A.mode===2)expedition();
    else if(A.mode===3)escape();
    else if(A.mode===4)defense();
    else if(A.mode===5)marathon();
    else if(A.mode===6)mirror();
    else if(A.mode===7)randomizer();
    else if(A.mode===8)hybrid();
    else if(A.mode===9)draft();
    else if(A.mode===10&&T>=A.next){A.stage++;safeElite(1+Math.floor(A.stage/3));A.next=T+45;notice('NEW GAME+','ameaça '+A.stage)}
    else if(A.mode===11)bulletHell();
    else if(A.mode===12)roulette();
    hud();
  };

  mountSetup();hud(true);
  window.SCWebAdvancedModes={version:'3.0',modes:MODES,get selected(){return S.webAdvMode},allowed};
  console.log('[Web] Advanced Modes 3.0 ready.');
}catch(err){console.error('[Web Advanced Modes]',err)}
})();
