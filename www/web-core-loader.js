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

// ===== mesmo rebalanceamento econômico usado pela versão Mobile =====
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

// ===== arsenal visual por skin: sem bônus de atributo =====
s=s.replace(/\bB\.push\(\{x:/g,'B.push({sk:(P&&P.sk!=null?P.sk:S.skin),wt:CF.w,x:');
s=rep(s,"for(const b of B){const bk=","for(const b of B){if(window.SCArsenal&&SCArsenal.bullet(x,b))continue;const bk=",'projectile skin hook');
s=rep(s,"const a=q.oa+i/q.orb*PI*2;x.fillStyle='#d8e4ff';","const a=q.oa+i/q.orb*PI*2;if(window.SCArsenal&&SCArsenal.orbital(x,q,a))continue;x.fillStyle='#d8e4ff';",'orbital skin hook');

const el=document.createElement('script');
el.text=s+'\n//# sourceURL=game.web-parity.js';
document.head.appendChild(el);
console.log('[Web Parity] Core rebalance aplicado ao game.js');
})();
