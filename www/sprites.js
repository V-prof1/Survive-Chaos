/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
// ---------- Survive Chaos: sistema de sprites (pixel art 3x; bosses em 1x) ----------
// Cada "sheet" é um PNG com uma animação por linha. Carregados sob demanda; se algo
// ainda não carregou, o jogo cai no desenho antigo (emoji/vetor), então nunca trava.
const SPR={
q:[],M:typeof SPR_ATLAS!='undefined'?SPR_ATLAS:null,S:{},G:{},
EN:['zumbi','corredor','arqueiro','morcego','slime','exploder','bruxa','fantasma','lobisomem','golem','necromante'],
GN:['floresta','cemiterio','pantano','ruinas_geladas','fabrica'],
PROP:['floresta_arvore_1f','cemiterio_lapide_1f','pantano_juncos_4f','ruinas_geladas_cristal_de_gelo_1f','fabrica_engrenagem_4f'],
PS:[.55,.5,.5,.5,.45],
ROCK:['floresta_pedra_1f','cemiterio_pedra_1f','pantano_poca_de_lama_4f','ruinas_geladas_pedra_gelada_1f','fabrica_pedra_enferrujada_1f'],
WEAPON:['pistola','escopeta','rifle','besta','cajado'],
PWR:['poder_raio_4f','poder_ima_4f','poder_bomba_4f','poder_escudo_4f','poder_torreta_4f','poder_relogio_4f','poder_estrela_4f'],
url(f){return(typeof SPR_DATA!='undefined'&&SPR_DATA[f])||'sprites/'+f},
slug(n){return String(n).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')},
init(){if(!SPR.M)return;['items','fx','elite'].forEach(n=>SPR.sheet(n));Object.keys(SPR.M).filter(k=>k.startsWith('en_')).forEach(n=>SPR.sheet(n))},
sheet(n){let s=SPR.S[n];if(s)return s.ok?s:null;if(!SPR.M||!SPR.M[n])return null;const im=new Image();s=SPR.S[n]={im,ok:0,m:SPR.M[n].anims,u:SPR.M[n].u||1};im.onload=()=>{s.ok=1;SPR.q.forEach(f=>f())};im.src=SPR.url(SPR.M[n].file);return null},
// desenha um quadro com a âncora (pés/centro) em (x,y). once: t = progresso 0..1
at(c,sh,k,t,x,y,s,flip,rot,once){const S=SPR.sheet(sh);if(!S)return 0;const a=S.m[k];if(!a)return 0;
const f=once?Math.min(a.n-1,Math.max(0,Math.floor(t*a.n))):(a.n>1&&a.dt?Math.floor(Math.max(0,t)/a.dt)%a.n:0);s*=S.u;
if(c.imageSmoothingEnabled)c.imageSmoothingEnabled=false;
if(!flip&&!rot){c.drawImage(S.im,f*a.w,a.y,a.w,a.h,x-a.ax*s,y-a.ay*s,a.w*s,a.h*s);return 1}
c.save();c.translate(x,y);if(rot)c.rotate(rot);if(flip)c.scale(-1,1);c.drawImage(S.im,f*a.w,a.y,a.w,a.h,-a.ax*s,-a.ay*s,a.w*s,a.h*s);c.restore();return 1},
frames(sh,k){const S=SPR.sheet(sh);return S&&S.m[k]?S.m[k]:null},
hero(c,r,a,si,q){const sh='hero_'+si;if(!SPR.sheet(sh))return 0;
const ca=Math.cos(a),sa=Math.sin(a);let d='side',fl=0;if(Math.abs(sa)>Math.abs(ca)*1.1)d=sa>0?'down':'up';else fl=ca<0;
const s=r*4.2/96,gy=r*.9,mvg=mv?1:0;let k=(mvg?'walk_':'idle_')+d,t=tm,once=0;
if(q&&q.dT>0){k='dash_'+d;t=1-q.dT/.18;once=1}
const wp=q?SPR.WEAPON[CF.w||0]:null,drawW=()=>{const px=ca*r*.35,py=-r*.3+sa*r*.3;c.save();c.translate(px,py);c.rotate(a);if(ca<0)c.scale(1,-1);
SPR.at(c,'items',wp+'_1f',0,0,0,s);
const full=q.rate*(PW.fr>0?.5:1),el=full-q.cd;if(q.cd>0&&el>=0&&el<.08)SPR.at(c,'items',wp+'_flash_4f',el/.08,0,0,s,0,0,1);c.restore()};
if(wp&&d=='up')drawW();
SPR.at(c,sh,k,t,0,gy,s,fl,0,once);
if(wp&&d!='up')drawW();return 1},
enemy(c,e){if(e.noSpr)return 0;const boss=!!e.boss,nm=boss?'bo_'+e.sn:'en_'+(e.sm?'slime_mini':SPR.EN[e.k]);if(!SPR.sheet(nm))return 0;
e.ph=e.ph||Math.random()*3;const fl=(typeof P!='undefined'&&P&&P.x<e.x)?1:0,t=T+e.ph;let s,gy,k='walk',once=0,tt=t;
if(boss){s=e.r*3.4/192;gy=e.r*.9;if(e.pt>0){k='phase2';tt=1-e.pt/.9;once=1}else if(e.at>0){k='attack'+(e.ak||1);tt=1-e.at/.6;once=1}}
else{const base=e.sm?EN[4][3]*.6:EN[e.k][3];s=.42*e.r/base;gy=e.r*.85;
if(e.fl>0)k='hurt';else if(e.ai=='w'&&e.t2>0)k='charge';else if((e.ai=='a'&&e.t1>2)||(e.ai=='n'&&e.t1>3.6)){k='attack';tt=1-(e.ai=='n'?(4-e.t1)/.4:(2.2-e.t1)/.2);once=1}}
if(!boss&&e.el)SPR.at(c,'elite',e.k==9?'a72':'a48',T,0,gy,s);
return SPR.at(c,nm,k,tt,0,gy,s,fl,0,once)},
death(c,d){const nm=d.sn?'bo_'+d.sn:'en_'+d.nm;const a=SPR.frames(nm,'death');if(!a)return 0;const dur=a.n*(d.sn?.083:.1),p=Math.min(1,d.t/dur);
let s,gy;if(d.sn){s=d.r*3.4/192;gy=d.r*.9}else{s=.42*d.r/d.br;gy=d.r*.85}
c.save();c.globalAlpha=p>.8?(1-p)*5:1;c.translate(d.x,d.y);const ok=SPR.at(c,nm,'death',p,0,gy,s,d.fl,0,1);c.restore();return ok},
itm(c,g,t,y){if(g.em)return 0;let k,s=.45,yo=0;
if(g.k==0){k=g.v<3?'cristal_xp_pequeno_4f':g.v<8?'cristal_xp_medio_4f':'cristal_xp_grande_4f';s=g.v<3?.5:.45}
else if(g.k==1){k='pizza_4f';s=.42}else if(g.k==2){k='moeda_6f';s=.45}
else if(g.k==3){k=SPR.PWR[g.pw];s=.5}else if(g.k==4){k='bau_fechado_1f';s=.55;yo=10}else return 0;
return SPR.at(c,'items',k,t+g.x*.01,g.x,y+yo,s)},
prop(){return 0},
rock(){return 0},
ground(){return null},
ui(n,c){return '<img class="oi'+(c?' '+c:'')+'" src="'+SPR.url('ui/'+n+'.png')+'" alt="">'}
};
SPR.init();
