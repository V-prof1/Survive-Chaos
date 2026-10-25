(() => {
'use strict';
const src='game.js'+(location.search||'');
function loadText(url){
  const x=new XMLHttpRequest();
  try{x.open('GET',url,false);x.send(null);if((x.status>=200&&x.status<300)||x.status===0)return x.responseText}catch(e){console.error('[Web Parity] Falha ao carregar',url,e)}
  return '';
}
function rep(s,a,b,label){
  if(!s.includes(a)){console.warn('[Web Parity] assinatura não encontrada:',label||a.slice(0,60));return s}
  return s.replace(a,b)
}
let s=loadText(src);
if(!s){document.write('<script src="game.js"><\/script>');return}

// ===== Infinite overhaul from Mobile, adapted for Web =====
const oldSpawn=`function spawn(k,px,py,el){const d=EN[k],m=T/60;if(E.length>300)return;const e={k,x:px,y:py,vx:0,vy:0,hp:d[1]*(1+m*.22)*HM()*(el?5:1),r:d[3]*(el?1.4:1),sp:d[2],dmg:d[4]*(1+m*.04),xp:d[5]*(el?5:1),col:d[6],ai:d[9],el,t1:R()*2,t2:0,oc:0,fl:0};e.mh=e.hp;E.push(e);return e}`;
const newSpawn=`let INF_LAST_MIN=0;
function mobileEnemyCap(){
  if(!CF.i)return 300;
  const m=Math.max(0,Math.floor(T/60));
  const raw=Math.floor(300*Math.pow(1.13,m));
  const perf=fps<28?.48:fps<36?.62:fps<45?.78:fps<54?.9:1;
  return Math.max(300,Math.min(1200,Math.floor(raw*perf)));
}
function spawn(k,px,py,el){const d=EN[k],m=T/60;if(E.length>=mobileEnemyCap())return;const e={k,x:px,y:py,vx:0,vy:0,hp:d[1]*(1+m*.22)*HM()*(el?5:1),r:d[3]*(el?1.4:1),sp:d[2],dmg:d[4]*(1+m*.04),xp:d[5]*(el?5:1),col:d[6],ai:d[9],el,t1:R()*2,t2:0,oc:0,fl:0};e.mh=e.hp;E.push(e);return e}`;
s=rep(s,oldSpawn,newSpawn,'Infinite enemy cap');

const oldLoop=`if(silence<=0&&CF.g!=2){bk-=dt;const gap=Math.max(.1,.85-T/60*.035)/(horde>0?3:1)/MZ[3]*(CF.g==5?3:1)/(CF.g==3?1.5:1)/(PL.length>1?1.5:1);if(bk<=0){bk=gap;const[a,b]=edge();spawn(pick(),a,b,T>180&&R()<.03)}}`;
const newLoop=`if(silence<=0&&CF.g!=2){
  bk-=dt;
  const im=Math.max(0,Math.floor(T/60));
  if(!CF.i)INF_LAST_MIN=0;
  else if(im===0)INF_LAST_MIN=0;
  const infRate=CF.i?Math.pow(1.09,im):1;
  const baseGap=Math.max(.1,.85-T/60*.035)/(horde>0?3:1)/MZ[3]*(CF.g==5?3:1)/(CF.g==3?1.5:1)/(PL.length>1?1.5:1);
  const gap=baseGap/Math.min(2.75,Math.pow(infRate,.55));
  if(bk<=0){
    bk=gap;
    const batch=CF.i?Math.max(1,Math.min(8,Math.floor(infRate+.35))):1;
    for(let si=0;si<batch;si++){const[a,b]=edge();spawn(pick(),a,b,T>180&&R()<.03)}
  }
  if(CF.i&&im>0&&im!==INF_LAST_MIN){
    INF_LAST_MIN=im;
    const wanted=Math.max(1,Math.round(16*Math.pow(1.24,im-1)));
    const room=Math.max(0,mobileEnemyCap()-E.length);
    const wave=Math.min(wanted,room);
    if(wave>0){ring(wave);ban('HORDA INFINITA: '+wave+' INIMIGOS — MINUTO '+im);shake=Math.min(18,6+im*.45)}
  }
}`;
s=rep(s,oldLoop,newLoop,'Infinite horde growth');
s=s.replace('Modo infinito: a partida não termina, os bosses se repetem e o bioma muda a cada vitória.','Modo infinito: a partida não termina, os bosses se repetem, o bioma muda a cada vitória e as hordas crescem exponencialmente a cada minuto.');

// ===== same economy rebalance used by current Mobile =====
s=rep(s,"const scoreNow=()=>Math.round((kills*10+RUN.boss*500+Math.floor(T)*3)*MZ[4]);","const scoreNow=()=>Math.round((kills*4+RUN.boss*750+Math.floor(T)*2)*MZ[4]);",'score');
s=rep(s,"pm=1+(S.perm&&S.perm.coin||0)*.1","pm=1+(S.perm&&S.perm.coin||0)*.04",'permanent coin bonus');
s=rep(s,"(kills/6+t/12+(win?400:0))","(kills/14+t/30+(win?120:0))",'run reward');
s=rep(s,"(win?Math.round(2000*MZ[4]):0)","(win?Math.round(1200*MZ[4]):0)",'win reward');
s=rep(s,"bonus=Math.floor(sc/80*rk[2]*pm)","bonus=Math.floor(sc/260*rk[2]*pm)",'score coin bonus');
s=rep(s,"earned+=Math.ceil(v*P.xpm*1.5);","earned+=Math.ceil(v*P.xpm*.35);",'max level xp conversion');
s=s.replace(/earned\+=25/g,'earned+=8');
s=rep(s,"else{earned+=5;sfx('coin')}","else{earned+=2;sfx('coin')}",'coin pickup');
s=rep(s,"if(e.boss){if(e.helper){earned+=60;","if(e.boss){if(e.helper){earned+=20;",'helper boss reward');
s=rep(s,"bossDown();earned+=150;","bossDown();earned+=50;",'boss reward');
s=rep(s,"for(let i=0;i<8;i++)G.push({x:P.x+R()*60-30,y:P.y+R()*60-30,v:1,k:2});","for(let i=0;i<2;i++)G.push({x:P.x+R()*60-30,y:P.y+R()*60-30,v:1,k:2});",'boss coin drops');

// ===== cosmetic arsenal hooks =====
s=s.replace(/\bB\.push\(\{x:/g,'B.push({sk:(P&&P.sk!=null?P.sk:S.skin),wt:CF.w,x:');
s=rep(s,"for(const b of B){const bk=","for(const b of B){if(window.SCArsenal&&SCArsenal.bullet(x,b))continue;const bk=",'projectile skin hook');
s=rep(s,"const a=q.oa+i/q.orb*PI*2;x.fillStyle='#d8e4ff';","const a=q.oa+i/q.orb*PI*2;if(window.SCArsenal&&SCArsenal.orbital(x,q,a))continue;x.fillStyle='#d8e4ff';",'orbital skin hook');

// ===== AI Director hooks: collective/smart AI remains optional until module loads =====
s=rep(s,
  "function bossAI(e,dt){if(e.dv){devAI(e,dt);return}",
  "function bossAI(e,dt){if(window.SCAIDirector&&window.SCAIDirector.boss&&window.SCAIDirector.boss(e,dt,P))return;if(e.dv){devAI(e,dt);return}",
  'boss AI director hook');
s=rep(s,
  "const ddx=P.x-e.x,ddy=P.y-e.y,d=Math.hypot(ddx,ddy)||1,ux=ddx/d,uy=ddy/d;let v=e.sp*rm,ai=e.ai;",
  "const ddx=P.x-e.x,ddy=P.y-e.y,d=Math.hypot(ddx,ddy)||1,ux=ddx/d,uy=ddy/d;let v=e.sp*rm,ai=e.ai;if(window.SCAIDirector&&window.SCAIDirector.enemy&&window.SCAIDirector.enemy(e,dt,P,d,ux,uy,rm))continue;",
  'enemy AI director hook');

const el=document.createElement('script');
el.text=s+'\n//# sourceURL=game.web-parity.js';
document.head.appendChild(el);
console.log('[Web Parity] Core Mobile gameplay parity 3.0 aplicado ao game.js');
})();
