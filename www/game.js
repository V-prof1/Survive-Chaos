/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
const $=i=>document.getElementById(i),cv=$('c'),x=cv.getContext('2d'),R=Math.random,PI=Math.PI;
let W,H,D,Z=1,ZB=1,ZM=1,DC=1.75,LQ=0,LW=0,HF=0;function rs(){D=Math.min(devicePixelRatio||1,DC);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;ZB=Z=Math.min(W,H)/520}
addEventListener('resize',rs);addEventListener('orientationchange',()=>setTimeout(rs,150));rs();
let S={coins:0,own:[0],skin:0,best:0};
try{Object.assign(S,JSON.parse(localStorage.getItem('nsf')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('nsf',JSON.stringify(S))}catch(e){}};const _z1=0x5f3a91c7;
// ---------- dados ----------
const SK=[['Clássico','#e8c39e',1,0],['Camuflado','#7d8f4e',5,500],['Lenhador','#c0583a',1,500],['Astronauta','#e9eef5',5,800],['Pirata','#4b5a7a',6,800],['Ninja','#2d2f3a',6,1500],['Cavaleiro','#aab4c4',5,1500],['Cowboy','#c99a5b',1,1500],['Mago Azul','#4d79ff',10,2000],['Samurai','#a33a3a',5,2000],['Zumbi Amigável','#7fbf6a',0,3000],['Viking','#d9b27c',2,3000],['Robô','#8fa3b8',7,3500],['Palhaço Sombrio','#6a3a8a',8,3500],['Esqueleto','#e8e4d4',0,4000],['Anjo','#fff3d0',3,6000],['Demônio','#d23a3a',2,6000],['Dragão','#3fae6a',9,8000],['Cyber Neon','#2de2e6',7,8000],['Ceifador Dourado','#ffc94a',4,12000]];
const EN=[['Zumbi',22,42,11,8,1,'#6fa35b',0,10,'c'],['Corredor',12,95,9,6,1,'#d1a23a',2,6,'c'],['Arqueiro',16,38,10,7,2,'#cfd4de',2,4,'a'],['Morcego',10,85,8,5,1,'#8a5ad1',4,5,'b'],['Slime',34,36,14,8,2,'#4fd1a0',5,4,'s'],['Exploder',18,80,10,0,2,'#ff5a3c',7,4,'x'],['Bruxa',24,34,10,7,3,'#c05bd1',7,3,'a'],['Fantasma',30,55,11,10,3,'#9fd8ff',12,4,'g'],['Lobisomem',60,60,13,12,4,'#b07a4a',12,4,'w'],['Golem',160,28,18,18,8,'#8c8f9c',16,3,'h'],['Necromante',70,34,12,8,6,'#5b4a8a',16,2,'n']];
const BS=[[['Guardião Podre',3500,'#5a7a3a',34,'🌳'],['Rainha Aranha',5500,'#8a3a7a',38,'🕷️'],['Colosso de Pedra',9000,'#6c6f7d',46,'🗿'],['Ceifador da Meia-Noite',14000,'#3b2a5a',40,'💀']],
[['Coveiro Maldito',4000,'#6a5a4a',34,'⚰️'],['Banshee Lamentosa',6000,'#8fb4e8',36,'👻'],['Cavaleiro Sem Cabeça',9500,'#e07a2a',42,'🎃'],['Lich Imperador',15000,'#7a3acd',42,'☠️']],
[['Sapo Anciã',4200,'#3f9a4a',36,'🐸'],['Hidra do Lodo',6200,'#5a8a3a',40,'🐍'],['Bruxa do Brejo',9500,'#8a3acd',38,'🧙'],['Leviatã Podre',15500,'#4a6a3a',48,'🐊']],
[['Yeti Furioso',4400,'#cfe8ff',38,'🦣'],['Dama do Gelo',6400,'#7ac8ff',36,'🥶'],['Golem de Cristal',10000,'#5ad0ff',46,'💎'],['Dragão Glacial',16000,'#4a9aff',50,'🐉']],
[['Sentinela Enferrujada',4600,'#b0703a',38,'🤖'],['Fornalha Viva',6600,'#ff6a1a',40,'🔥'],['Torre Tesla',10500,'#4fe0ff',42,'⚡'],['Núcleo Mestre',17000,'#ff3a6a',46,'👾']]];
const U=[['dmg','Dano','+15% de dano',8,p=>p.dmg*=1.15],['rate','Cadência','Atira 12% mais rápido',8,p=>p.rate*=.88],['multi','Tiro extra','+1 projétil',4,p=>p.cnt++],['pierce','Perfuração','Atravessa +1 inimigo',4,p=>p.pierce++],['bounce','Ricochete','Rebate em +1 inimigo',3,p=>p.bounce++],['crit','Crítico','+8% de chance de crítico',6,p=>p.crit+=.08],['mhp','Vida máxima','+25 de vida e cura',8,p=>{p.mhp+=25;p.hp+=25}],['regen','Regeneração','+0,6 de vida por segundo',5,p=>p.regen+=.6],['spd','Botas','+8% de velocidade',5,p=>p.sp*=1.08],['mag','Ímã','Atrai cristais de mais longe',5,p=>p.mag*=1.3],['xp','Sabedoria','+15% de XP',5,p=>p.xpm*=1.15],['orb','Lâminas orbitais','+1 lâmina girando',5,p=>p.orb++],['aura','Aura de fogo','Queima inimigos próximos e o raio cresce a cada nível',5,p=>p.aura++],['light','Relâmpago','Raios caem periodicamente',5,p=>p.light++],['exp','Explosão','Inimigos podem explodir ao morrer',5,p=>p.exp++],['vamp','Vampirismo','Cura ao acertar e ao abater inimigos',4,p=>p.vamp++],['shield','Escudo','+1 carga que recarrega',3,p=>{p.shM++;p.sh++}],['dash','Dash veloz','Recarga do dash 20% menor',3,p=>p.dashCd*=.8],['armor','Armadura','-8% de dano recebido',5,p=>p.armor+=.08]];
let EV=[[60,()=>ring(30),'Horda!'],[180,()=>elite(1),'Elite se aproxima'],[270,0,'Boss em 30 segundos'],[300,()=>boss(0)],[360,()=>{rain=90},'Chuva: inimigos mais rápidos'],[480,()=>ring(45),'Cerco!'],[540,()=>elite(2),'Elites!'],[570,0,'Boss em 30 segundos'],[600,()=>boss(1)],[660,()=>{dark=60},'Noite escura'],[840,()=>{horde=40},'Horda sangrenta: XP em dobro'],[870,0,'Boss em 30 segundos'],[900,()=>boss(2)],[1020,()=>ring(70),'Cerco!'],[1140,()=>{silence=10},'Silêncio...'],[1170,0,'Boss em 30 segundos'],[1200,()=>boss(3)]];
// ---------- estado ----------
const auraR=n=>Math.min(380,60+n*22);
const CL={on:0,u:[],s:[],t:40};let VT=0,BMB=0,cullR=900;
// grade espacial: consultas de colisão em O(1) em vez de varrer todos os inimigos
const GCS=64,GMAP=new Map(),QB=[],QO=[],QA=[];let GBIG=[];
function gbuild(){for(const a of GMAP.values())a.length=0;GBIG.length=0;if(GMAP.size>1500)GMAP.clear();
for(const e of E){if(e.dead)continue;if(e.r>28){GBIG.push(e);continue}const k=(Math.floor(e.x/GCS)+4096)*8192+Math.floor(e.y/GCS)+4096;let a=GMAP.get(k);if(!a){a=[];GMAP.set(k,a)}a.push(e)}}
function qry(px,py,r,out){out.length=0;const x0=Math.floor((px-r-28)/GCS),x1=Math.floor((px+r+28)/GCS),y0=Math.floor((py-r-28)/GCS),y1=Math.floor((py+r+28)/GCS);
for(let cx=x0;cx<=x1;cx++)for(let cy=y0;cy<=y1;cy++){const a=GMAP.get((cx+4096)*8192+cy+4096);if(a)for(let i=0;i<a.length;i++)out.push(a[i])}
for(let i=0;i<GBIG.length;i++)out.push(GBIG[i]);return out}
const cmp=(a,f)=>{let j=0;for(let i=0;i<a.length;i++){const v=a[i];if(f(v))a[j++]=v}a.length=j;return a};let DS=[],st='menu',T=0,P,cam={x:0,y:0},E=[],B=[],EB=[],G=[],PA=[],TX=[],RG=[],MK=[],FX=[],kills=0,lvl=1,xp=0,xpn=8,pend=0,earned=0,rr=2,shake=0,ts=1,ei=0,rain=0,dark=0,horde=0,silence=0,rndT=90,god=0,dx=1,dbg=0,adm=0,bossE=null,fps=60,bk=0;
const keys={},joy={on:0,id:-1,x:0,y:0,dx:0,dy:0,kx:0,ky:0};
const show=id=>$(id).classList.add('on'),hide=id=>$(id).classList.remove('on');
function hs(a,b){let h=(a*374761393+b*668265263)|0;h=(h^(h>>>13))*1274126177|0;return(h^(h>>>16))>>>0}
function ban(t){const b=$('ban');b.textContent=t;b.classList.remove('s');void b.offsetWidth;b.classList.add('s')}
// ---------- desenho do herói ----------
function hero(c,px,py,r,sk,a,z,q){if(sk[0]=='ADMIN'&&!z)return glitch(c,px,py,r,sk,a);const[,col,acc]=sk;c.save();c.translate(px,py);
c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,r*.9,r*.9,r*.35,0,0,7);c.fill();{const fx=SF[SK.indexOf(sk)];if(fx)skfx(c,r,fx)}
if(SPR.hero(c,r,a,SK.indexOf(sk),q)){c.restore();return}c.save();c.rotate(a);c.fillStyle='#2b2f3a';c.fillRect(r*.5,-r*.18,r*1.1,r*.36);c.fillStyle='#ffb340';c.fillRect(r*1.4,-r*.12,r*.2,r*.24);c.fillStyle='#f2cfa4';c.beginPath();c.arc(r*.7,0,r*.22,0,7);c.fill();c.restore();
const w=Math.sin(tm*14)*mv;c.fillStyle='#2a2d38';for(const s of[-1,1])c.fillRect(s*r*.38-r*.18,r*.4+w*s*r*.18,r*.36,r*.6);
c.fillStyle=col;c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=r*.1;c.beginPath();c.roundRect(-r*.75,-r*.3,r*1.5,r*.95,r*.35);c.fill();c.stroke();
c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-r*.7,r*.25,r*1.4,r*.1);c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.roundRect(-r*.6,-r*.22,r*.5,r*.7,r*.22);c.fill();c.fillStyle='#ffb340';c.fillRect(-r*.1,r*.22,r*.2,r*.16);
c.fillStyle='#f2cfa4';c.beginPath();c.arc(0,-r*.55,r*.62,0,7);c.fill();c.stroke();
c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.arc(-r*.22,-r*.8,r*.22,0,7);c.fill();c.fillStyle='#fff';for(const s of[-1,1]){c.beginPath();c.arc(Math.cos(a)*r*.2-Math.sin(a)*r*.22*s,-r*.55+Math.sin(a)*r*.2+Math.cos(a)*r*.22*s,r*.15,0,7);c.fill()}
c.fillStyle='#111';for(const s of[-1,1]){c.beginPath();c.arc(Math.cos(a)*r*.28-Math.sin(a)*r*.22*s,-r*.55+Math.sin(a)*r*.28+Math.cos(a)*r*.22*s,r*.07,0,7);c.fill()}
c.translate(0,-r*.55);r*=.64;
const t=-r*.75;c.lineWidth=r*.08;
if(acc==1){c.fillStyle='#d9404a';c.beginPath();c.arc(0,-r*.2,r*.95,PI,0);c.fill();c.fillRect(-r*.2,-r*.35,r*1.2,r*.16)}
else if(acc==2){c.fillStyle='#d8d4c8';for(const s of[-1,1]){c.beginPath();c.moveTo(s*r*.5,-r*.6);c.lineTo(s*r*.95,-r*1.5);c.lineTo(s*r*.85,-r*.4);c.fill()}}
else if(acc==3){c.strokeStyle='#ffd45a';c.lineWidth=r*.14;c.beginPath();c.ellipse(0,-r*1.25,r*.6,r*.2,0,0,7);c.stroke()}
else if(acc==4){c.fillStyle='#ffc94a';c.beginPath();c.moveTo(-r*.7,t);c.lineTo(-r*.7,-r*1.5);c.lineTo(-r*.3,-r*1.1);c.lineTo(0,-r*1.6);c.lineTo(r*.3,-r*1.1);c.lineTo(r*.7,-r*1.5);c.lineTo(r*.7,t);c.fill()}
else if(acc==5){c.fillStyle='#8a93a6';c.beginPath();c.arc(0,-r*.15,r*1.02,PI,0);c.fill();c.fillStyle='#c9d0de';c.fillRect(-r*.1,-r*1.15,r*.2,r*.5)}
else if(acc==6){c.fillStyle='#d9404a';c.fillRect(-r,-r*.55,r*2,r*.28)}
else if(acc==7){c.strokeStyle='#aab';c.beginPath();c.moveTo(0,-r);c.lineTo(0,-r*1.5);c.stroke();c.fillStyle='#ff4d5e';c.beginPath();c.arc(0,-r*1.55,r*.17,0,7);c.fill()}
else if(acc==8){c.fillStyle='#ff4d9a';for(let i=-2;i<3;i++){c.beginPath();c.moveTo(i*r*.2-r*.1,-r*.9);c.lineTo(i*r*.2,-r*1.5+Math.abs(i)*r*.15);c.lineTo(i*r*.2+r*.1,-r*.9);c.fill()}}
else if(acc==9){c.fillStyle='#ff8a2a';for(let i=-1;i<2;i++){c.beginPath();c.moveTo(i*r*.35-r*.18,-r*.8);c.lineTo(i*r*.35,-r*1.5);c.lineTo(i*r*.35+r*.18,-r*.8);c.fill()}}
else if(acc==10){c.fillStyle='#3a4fd0';c.beginPath();c.moveTo(-r*.9,-r*.55);c.lineTo(0,-r*1.9);c.lineTo(r*.9,-r*.55);c.fill();c.fillRect(-r*1.1,-r*.65,r*2.2,r*.18)}
c.restore()}
// ---------- UI: menu e loja ----------
function ref(){$('mc').textContent=S.coins.toLocaleString('pt-BR');$('sc').textContent=S.coins.toLocaleString('pt-BR');$('bst').textContent=S.best?'🏁 Melhor: '+fmt(S.best):''}
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.floor(s%60)).padStart(2,'0');
function shopUI(){const g=$('sg');g.innerHTML='';SPR.q=[];SK.forEach((s,i)=>{if(i==20&&!S.own.includes(20))return;const d=document.createElement('div'),own=S.own.includes(i);d.className='sk '+rar(s[3])+(S.skin==i?' sel':'');
const c=document.createElement('canvas');c.width=c.height=120;const cx2=c.getContext('2d'),dr=()=>{cx2.clearRect(0,0,120,120);hero(cx2,60,70,28,s,.6)};dr();SPR.q.push(dr);d.appendChild(c);
d.insertAdjacentHTML('beforeend','<div>'+s[0]+'</div>');const b=document.createElement('button');
b.textContent=S.skin==i?'Em uso':own?'Usar':s[3]+' moedas';if(own)b.className='o';
b.onclick=()=>{if(own)S.skin=i;else if(S.coins>=s[3]){S.coins-=s[3];S.own.push(i);S.skin=i}else{b.textContent='Faltam '+(s[3]-S.coins);return}sv();ref();shopUI()};d.appendChild(b);g.appendChild(d)});}
$('shopb').onclick=()=>{hide('menu');show('shop');st='shop';ref();shopUI()};
$('sback').onclick=()=>{hide('shop');show('menu');st='menu'};
$('play').onclick=()=>{hide('menu');show('setup');st='setup';setupUI();sfx('ui')};$('again').onclick=()=>{hide('over');start()};$('home').onclick=()=>toMenu();
$('resume').onclick=()=>{hide('pause');st='play'};$('quit').onclick=()=>{hide('pause');end(0)};
$('pz').onclick=()=>{if(st=='play'){st='pause';show('pause')}};
addEventListener('visibilitychange',()=>{if(document.hidden&&st=='play'){st='pause';show('pause')}});
function toMenu(){hide('over');hide('pause');$('hud').classList.remove('on');show('menu');st='menu';ref()}
// ---------- partida ----------
function start(){hide('menu');hide('setup');au();fixCF();if(CF.g==6&&!clsOk())CF.g=0;if(CF.m==3&&CF.g==3)ach('s_maso');if(CF.i)ach('u_play');TN=[];SH=[];BH=[];RUN={boss:0,bio:{},hit:0,mc:0};BR=[];TR=[];MI=null;lastHit=0;WV={n:0,t:3};cz=20;if(AB.mxOn)ts=1;POOL=[];AB={fa:0};DG=[];PW={fr:0};cmb=0;cmbT=0;ult=0;hz=8;fz=0;AP={met:0,st:0,ls:0,la:0};E=[];B=[];EB=[];G=[];PA=[];TX=[];RG=[];MK=[];FX=[];DS=[];devReset();bossE=null;$('boss').style.display='none';
P={x:0,y:0,r:12,hp:100,mhp:100,sp:150,dmg:10,rate:.5,cnt:1,pierce:0,bounce:0,crit:.05,mag:1,xpm:1,orb:0,aura:0,light:0,exp:0,vamp:0,shM:0,sh:0,shT:0,regen:0,armor:0,dashCd:3,dc:0,dT:0,ddx:1,ddy:0,cd:0,a:0,iv:0,oa:0,at:0,lt:2,lv:{}};
Object.assign(P,WP[CF.w][2]);applyPerm();MZ=MD[CF.m];diffP();if(CF.g==3){P.mhp=P.hp=30;P.dmg*=3}P.id=0;P.sk=S.skin;PL=[P];ZM=1;if(CF.co){PL.push(Object.assign({},P,{id:1,x:70,sk:CF.s2!=null?CF.s2:S.skin}));setCO()}else{CO.on=0;setBtn()}MZ=MD[CF.m];bi=CF.b;bc=0;CL.on=CF.g==6;CL.u=CL.on?CF.cl.u.slice():[];CL.s=CL.on?CF.cl.s.slice():[];CL.t=35;if(CL.on){CL.u.forEach(id=>{const u=U.find(q=>q[0]==id);for(let i=0;i<u[3];i++)giveUp(u)});CL.s.forEach(id=>giveUp(SUP.find(q=>q[0]==id)))}nb=CF.g==5?20:300;nh=CF.g==5?9e9:60;EVc=CF.g==2?[]:INF()?EV.filter(v=>!String(v[1]).includes('boss(')&&!(v[2]||'').includes('Boss')):EV;T=0;kills=0;lvl=1;xp=0;xpn=xpNeed(1);pend=0;earned=0;rr=2;ei=0;rain=dark=horde=silence=0;rndT=90;cam.x=cam.y=0;
st='intro';$('hud').classList.add('on');showIntro()}
const RK=[[0,'D',1],[2000,'C',1],[6000,'B',1.1],[15000,'A',1.25],[35000,'S',1.5],[80000,'SS',2]];
const scoreNow=()=>Math.round((kills*10+RUN.boss*500+Math.floor(T)*3)*MZ[4]);
function end(win){if(st=='over')return;st='over';const t=Math.floor(T),pm=1+(S.perm&&S.perm.coin||0)*.1,c0=Math.floor((kills/6+t/12+(win?400:0))*MZ[4]*pm)+earned;
const sc=scoreNow()+(win?Math.round(2000*MZ[4]):0);let rk=RK[0];for(const q of RK)if(sc>=q[0])rk=q;const bonus=Math.floor(sc/80*rk[2]*pm),c=c0+bonus,nr=sc>(S.bs||0);if(nr)S.bs=sc;
S.coins+=c;if(t>S.best)S.best=t;recordEnd(win,c,t);if(S.hist[0])S.hist[0].s=sc;sv();sfx(win?'win':'die');
$('hud').classList.remove('on');$('boss').style.display='none';$('skl').innerHTML=SPR.ui(win?'ui_trofeu':'ui_caveira','big');$('ot').textContent=win?'Amanheceu!':'Você caiu';$('om').textContent=win?'Sobreviveu. Estamos tão surpresos quanto você.':DM[Math.floor(R()*DM.length)];
$('os').innerHTML='<div class="who">'+_nm(0)+' · '+MN[CF.g||0]+' · '+MD[CF.m][0]+'</div><div class="stats"><div><b>'+fmt(T)+'</b><span>Tempo</span></div><div><b>'+lvl+'</b><span>Nível</span></div><div><b>'+kills+'</b><span>Abates</span></div></div><div class="scoreb"><div><span>SCORE</span><b>'+sc.toLocaleString('pt-BR')+'</b></div><div class="rk r'+rk[1]+'"><span>RANK</span><b>'+rk[1]+'</b></div></div>'+(nr?'<div class="nr">Novo recorde de score!</div>':'')+'<div class="sbd">Abates ×10 · Bosses ×500 · Tempo ×3 · Dificuldade ×'+String(MZ[4]).replace('.',',')+(win?' · Vitória +2000':'')+'</div><div class="gain">+'+c.toLocaleString('pt-BR')+' 🪙</div><div class="sbd">Base '+c0.toLocaleString('pt-BR')+' + bônus de score '+bonus.toLocaleString('pt-BR')+'</div>';show('over')}
function hurt(d){if(d>=1e6)d=P.mhp*1.05;else{d*=MZ[2];if(CF.m==3)d*=Math.max(1,lvl)}if(P.dead||P.iv>0||P.dT>0||god||AB.peace>0||AB.ghost>0)return;if(P.sh>0){P.sh--;P.iv=.6;if(P.shk)boom(P.x,P.y,100,P.dmg*P.shk*dx,380);return}P.hp-=d*(1-Math.min(.7,P.armor));P.iv=.5;if(P.thn)boom(P.x,P.y,80,P.dmg*P.thn*dx,250);shake=7;flash=.7;lastHit=T;RUN.hit=1;buzz();sfx('hurt');if(P.hp<=0)down()}
function xpAdd(v){if(maxed()||lvl>=LVC){earned+=Math.ceil(v*P.xpm*1.5);xp=xpn;if(!P.cv){P.cv=1;ban('Tudo no máximo! XP vira moedas')}sfx('coin');return}xp+=v*P.xpm*MZ[6];while(xp>=xpn&&lvl<LVC){xp-=xpn;lvl++;xpn=xpNeed(lvl);pend++;for(const q of PL)if(q.lvh)q.hp=Math.min(q.mhp,q.hp+q.mhp*q.lvh);sfx('lvl');FX.push({x:P.x,y:P.y,r:130,t:.25,ring:1})}if(pend&&st=='play')cardsOpen()}
function lvUp(n=1){pend+=n;if(st=='play')cardsOpen()}
function cardsOpen(){while(pend>0&&maxed()){pend--;earned+=25}if(!pend){if(st=='cards')st='play';return}pend--;st='cards';rollCards();if(!cur.length){hide('cards');st='play';earned+=25;if(pend)cardsOpen();return}show('cards')}
const maxed=()=>CL.on?CL.u.every(k=>(P.lv[k]||0)>=UM[k])&&CL.s.every(k=>P.lv[k]):U.every(u=>(P.lv[u[0]]||0)>=u[3])&&SUP.every(u=>P.lv[u[0]]);
let cur=[];
function rollCards(){const sup=SUP.filter(u=>(!CL.on||CL.s.includes(u[0]))&&!P.lv[u[0]]&&(P.lv[u[5]]||0)>=UM[u[5]]&&(P.lv[u[6]]||0)>=UM[u[6]]);
let a=U.filter(u=>(!CL.on||CL.u.includes(u[0]))&&(P.lv[u[0]]||0)<u[3]).sort(()=>R()-.5).slice(0,3-Math.min(1,sup.length));if(sup.length){a=[sup[Math.floor(R()*sup.length)],...a];sfx('boss2')}
cur=a;const l=$('cl');l.innerHTML='';
a.forEach(u=>{const d=document.createElement('div'),sp=u.length>5;d.className='card'+(sp?' sup':'');d.innerHTML='<div class="ic">'+(ICN[u[0]]?SPR.ui(ICN[u[0]]):(u[7]||IC[u[0]]))+'</div><b>'+u[1]+'</b><p>'+u[2]+'</p>'+(!sp&&U2D[u[0]]?'<p class="b2">'+((P.lv[u[0]]||0)>=1?'✔ ':'')+U2D[u[0]]+'</p>':'')+'<small>'+(sp?'✨ SUPREMA':'Nível '+((P.lv[u[0]]||0)+1)+' de '+u[3])+'</small>';
d.onclick=()=>{giveUp(u);if(sp){flash=.5;FX.push({x:P.x,y:P.y,r:200,t:.25,ring:1})}hide('cards');if(pend)cardsOpen();else st='play'};l.appendChild(d)});$('rr').textContent='Rerrolar ('+rr+')'}
function giveUp(u){const l=P.lv[u[0]]=(P.lv[u[0]]||0)+1;for(const q of PL){u[4](q);if(l>=2&&U2[u[0]])U2[u[0]](q,l)}}
$('rr').onclick=()=>{if(rr>0){rr--;rollCards()}};
// ---------- inimigos ----------
function spawn(k,px,py,el){const d=EN[k],m=T/60;if(E.length>300)return;const e={k,x:px,y:py,vx:0,vy:0,hp:d[1]*(1+m*.22)*HM()*(el?5:1),r:d[3]*(el?1.4:1),sp:d[2],dmg:d[4]*(1+m*.04),xp:d[5]*(el?5:1),col:d[6],ai:d[9],el,t1:R()*2,t2:0,oc:0,fl:0};e.mh=e.hp;E.push(e);return e}
function edge(){const a=R()*PI*2,d=Math.max(W,H)/2/Z+70;return[P.x+Math.cos(a)*d,P.y+Math.sin(a)*d]}
function pick(){const m=T/60,a=EN.map((d,i)=>[i,d]).filter(([i,d])=>d[7]<=m),tot=a.reduce((s,[,d])=>s+d[8],0);let r=R()*tot;for(const[i,d]of a){r-=d[8];if(r<=0)return i}return 0}
function ring(n){const d=Math.max(W,H)/2/Z+60;for(let i=0;i<n;i++){const a=i/n*PI*2;spawn(pick(),P.x+Math.cos(a)*d,P.y+Math.sin(a)*d)}}
function elite(n){for(let i=0;i<n;i++){const[a,b]=edge();spawn(pick(),a,b,1)}}
function boss(i){const d=BS[bi][i%4],a=R()*7,hp=d[1]*MZ[1]*(PL.length>1?1.7:1)*(1+Math.floor(bc/4)*.8),e={boss:i%4+1,k:-1,em:d[4],sn:SPR.slug(d[0]),nm:d[0],x:P.x+Math.cos(a)*420,y:P.y+Math.sin(a)*420,vx:0,vy:0,hp,mh:hp,r:d[3]*2.3,sp:[38,70,30,60][i%4],dmg:20,xp:60,col:d[2],ai:'B',t1:2,t2:3,t3:5,s:0,jt:0,fl:0,oc:0,cd:2.5};e.bm=MZ[7]*(1+Math.floor(bc/4)*.4);e.dmg=20*e.bm;E.push(e);bossE=e;ban('BOSS: '+d[0]);$('bn').textContent=d[0];$('boss').style.display='block';shake=12;flash=.6;sfx('boss')}
function radial(e,n,sp,off=0,col='#ff8a5e'){for(let i=0;i<n;i++){const a=off+i/n*PI*2;EB.push({x:e.x,y:e.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:6,l:6,d:12,col})}}
function aim(e,sp,off=0,d=10,r=5,col='#ffd45a'){const a=Math.atan2(P.y-e.y,P.x-e.x)+off;EB.push({ar:e.k==2,x:e.x,y:e.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r,l:5,d,col})}
function summon(e,k,n){for(let i=0;i<n;i++)spawn(k,e.x+R()*80-40,e.y+R()*80-40)}
function hit(e,d,sx,sy,crit){if(e.inv>0)return;if(e.boss&&P.bdm)d*=1+P.bdm;e.hp-=d;if(P&&P.vamp&&!P.dead&&T-VT>.05){VT=T;P.hp=Math.min(P.mhp,P.hp+.1*P.vamp*(1+(P.vlow&&P.hp<P.mhp*.5?P.vlow:0)))}e.fl=.08;if(!LQ)puff(e.x,e.y,'#fff',2,90);sfx('hit');const a=Math.atan2(e.y-sy,e.x-sx),k=e.boss?0:90;e.vx+=Math.cos(a)*k;e.vy+=Math.sin(a)*k;
if(TX.length<40)TX.push({x:e.x,y:e.y-e.r,t:.6,s:Math.round(d),c:crit?'#ffd45a':'#fff'});if(e.hp<=0&&!e.dead)kill(e)}
function puff(px,py,col,n,sp=120){for(let i=0;i<n&&PA.length<400;i++){const a=R()*7,s=R()*sp;PA.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t:.4+R()*.4,c:col,r:2+R()*3})}}
function boom(px,py,rad,d,kb){BMB++;sfx('boom');puff(px,py,'#ff9a3a',LQ?6:14,180);FX.push({x:px,y:py,r:rad,t:.25,ring:1});
const c=qry(px,py,rad,[]);for(let i=0;i<c.length;i++){const e=c[i];if(e.dead)continue;const ax=e.x-px,ay=e.y-py,rr=rad+e.r;if(ax*ax+ay*ay<rr*rr){hit(e,d,px,py);if(kb&&!e.boss&&!e.dead){const a=Math.atan2(ay,ax);e.vx+=Math.cos(a)*kb;e.vy+=Math.sin(a)*kb}}}
for(const q of BR)if(!q.d&&q.f===undefined&&(q.x-px)*(q.x-px)+(q.y-py)*(q.y-py)<(rad+16)*(rad+16))q.f=.12}
function kill(e){if(e.dv&&devNext(e))return;e.dead=1;if(DS.length<60)DS.push({x:e.x,y:e.y,r:e.r,t:0,fl:P&&P.x<e.x?1:0,sn:e.boss&&!e.noSpr?e.sn:0,nm:e.sm?'slime_mini':SPR.EN[e.k],br:e.sm?EN[4][3]*.6:(EN[e.k]||[0,0,0,1])[3]});kills++;cmb++;RUN.mc=Math.max(RUN.mc,cmb);cmbT=3;if(cmb%50==0){ban('🔥 COMBO '+cmb+'!');G.push({x:P.x,y:P.y-30,v:1,k:4})}ult=Math.min(100,ult+(e.boss?30:1.3));sfx('kill');if(R()<.03)G.push({x:e.x,y:e.y,v:1,k:3,pw:Math.floor(R()*7)});puff(e.x,e.y,e.col,e.boss?40:8);
if(e.boss){if(e.helper){earned+=60;for(let i=0;i<5;i++)G.push({x:e.x+R()*60-30,y:e.y+R()*60-30,v:6,k:0});shake=8;sfx('boss2');return}if(e.dv)devWin(e);else AUD.sf('efeito_boss_derrotado');bossDown();earned+=150;if(!DV.e){EB=[];RG=[];MK=[]}E.forEach(o=>{if(!o.boss)o.hp=0,o.dead=1});{const ob=E.find(o=>o.boss&&!o.dead&&o!==e&&!o.dv);bossE=ob||null;$('boss').style.display=ob&&!DV.e?'block':'none';if(ob)$('bn').textContent=ob.nm||''}shake=18;
for(let i=0;i<14;i++)G.push({x:e.x+R()*60-30,y:e.y+R()*60-30,v:12,k:0});if(INF()){if(CF.g==5)PL.forEach(q=>{q.hp=q.mhp;q.dead=0});bc++;nb=T+(CF.g==5?100:240);bi=(bi+1+Math.floor(R()*4))%5;flash=.5;ban('Boss derrotado! Bioma: '+BI[bi][0])}else{if(e.boss==4){end(1);return}ban('Boss derrotado!')}sfx('boss2');lvUp(2);return}
G.push({x:e.x,y:e.y,v:e.xp*(horde>0?2:1)*cm(),k:0});if(R()<.05)G.push({x:e.x+6,y:e.y,v:1,k:2});
if(e.el){G.push({x:e.x,y:e.y+8,v:1,k:4});G.push({x:e.x+10,y:e.y+8,v:1,k:1});for(let i=0;i<4;i++)G.push({x:e.x+R()*30-15,y:e.y+R()*30-15,v:1,k:2})}
if(e.ai=='s'&&!e.sm)for(let i=0;i<2;i++){const c=spawn(4,e.x+R()*20-10,e.y+R()*20-10);if(c){c.hp=c.mh=e.mh*.35;c.r=e.r*.6;c.sm=1;c.xp=1}}
if(P.vamp)P.hp=Math.min(P.mhp,P.hp+.35*P.vamp*(1+(P.vlow&&P.hp<P.mhp*.5?P.vlow:0)));if(P.exp&&BMB<8&&R()<.1*P.exp)boom(e.x,e.y,55*(1+(P.exr||0)),P.dmg*1.5)}
function rndEv(){const k=Math.floor(R()*3);if(k==0){ban('Chuva de meteoros');for(let i=0;i<9;i++)MK.push({x:P.x+R()*500-250,y:P.y+R()*500-250,t:.8+i*.35,rad:55,d:30})}
else if(k==1){ban('Caixa de suprimentos');const a=R()*7,px=P.x+Math.cos(a)*150,py=P.y+Math.sin(a)*150;G.push({x:px,y:py,v:1,k:1});for(let i=0;i<6;i++)G.push({x:px+R()*50-25,y:py+R()*50-25,v:1,k:2})}
else{ban('Elite espelhada');elite(1)}}
// ---------- IA de bosses ----------
const mkC=(a,b,rad,d,t)=>MK.push({x:a,y:b,t,t0:t,rad,d}),mkL=(e,a,len,w,d,t,dash)=>MK.push({x:e.x,y:e.y,a,len,w,d,t,t0:t,L:1,dash:dash?e:0}),aimA=e=>Math.atan2(P.y-e.y,P.x-e.x);
const AT={meteor:(e,k)=>{for(let i=0;i<5+k*2;i++)mkC(P.x+R()*420-210,P.y+R()*420-210,60+R()*20,32,.9+i*.16)},slam:e=>mkC(e.x,e.y,e.r*1.8+60,40,1.1),beam:e=>mkL(e,aimA(e),800,64,38,1),
cross:e=>{const a=R()*3;for(let i=0;i<4;i++)mkL(e,a+i*PI/2,700,52,34,1.2)},fan:e=>{const a=aimA(e);for(let i=-2;i<=2;i++)mkL(e,a+i*.34,700,46,30,1.1)},charge:e=>mkL(e,aimA(e),560,e.r*1.4,40,1,1),
around:e=>{for(let i=0;i<8;i++){const a=i/8*PI*2;mkC(P.x+Math.cos(a)*130,P.y+Math.sin(a)*130,55,30,1+i*.1)}},rings:e=>RG.push({x:e.x,y:e.y,r:0,m:380,sp:230,h:0}),radial:e=>radial(e,18,140,R()*7),
aimed:e=>{for(let i=-3;i<=3;i++)aim(e,210,i*.16,12,6,'#ffd45a')},summon:e=>summon(e,Math.floor(R()*3),6)};
const BL=[['meteor','slam','radial','summon','beam'],['charge','fan','aimed','summon','around'],['slam','rings','meteor','cross','charge'],['cross','fan','around','beam','radial','rings']];
function bossAI(e,dt){if(e.dv){devAI(e,dt);return}if(e.helper)dt*=.5;const L=BL[e.boss-1],d=Math.hypot(P.x-e.x,P.y-e.y)||1,a=aimA(e),f=e.hp/e.mh,ph=f<.5?1:0,p3=f<.25?1:0;
e.at=Math.max(0,(e.at||0)-dt);e.pt=Math.max(0,(e.pt||0)-dt);if(ph&&!e.p2){e.p2=1;e.pt=.9}
e.cd-=dt;if(e.cd<=0){e.at=.6;e.ak=1+Math.floor(R()*3);e.cd=(p3?1.1:ph?1.5:2.1)*(MZ[3]>1.5?.8:1);const n=1+ph+p3;{const n0=EB.length,m0=MK.length,r0=RG.length;for(let i=0;i<n;i++)AT[L[Math.floor(R()*L.length)]](e,ph+p3);for(let i=n0;i<EB.length;i++)EB[i].d*=e.bm;for(let i=m0;i<MK.length;i++)if(MK[i].d)MK[i].d*=e.bm;for(let i=r0;i<RG.length;i++)RG[i].d=18*e.bm}shake=6}
if(ph&&(e.boss==1||e.boss==4)){e.s+=dt*3;e.t3-=dt;if(e.t3<=0){e.t3=.12;EB.push({x:e.x,y:e.y,vx:Math.cos(e.s*2)*150,vy:Math.sin(e.s*2)*150,r:5,l:6,d:10*e.bm,col:'#c58bff'})}}
const sp=e.sp*(p3?1.4:1);if(d>e.r*1.1){e.x+=Math.cos(a)*sp*dt;e.y+=Math.sin(a)*sp*dt}if(d<e.r*.9+P.r)hurt(e.dmg)}
function drawMK(){for(const m of MK){m.t0=m.t0||m.t;const p=1-m.t/m.t0,al=.14+.12*Math.sin(T*20);x.save();x.translate(m.x,m.y);
if(m.L){x.rotate(m.a);x.fillStyle='rgba(255,40,60,'+al+')';x.fillRect(0,-m.w/2,m.len,m.w);x.fillStyle='rgba(255,60,80,.4)';x.fillRect(0,-m.w/2*p,m.len,m.w*p);x.strokeStyle='rgba(255,90,100,.9)';x.lineWidth=2;x.strokeRect(0,-m.w/2,m.len,m.w)}
else if(m.rad){const r=m.rad;x.fillStyle='rgba(255,40,60,'+al+')';x.beginPath();x.arc(0,0,r,0,7);x.fill();x.fillStyle='rgba(255,60,80,.4)';x.beginPath();x.arc(0,0,r*p,0,7);x.fill();x.strokeStyle='rgba(255,90,100,.9)';x.lineWidth=2;x.beginPath();x.arc(0,0,r,0,7);x.stroke()}
x.restore()}}
// ---------- atualização ----------
function nearest(mx,sk){let b=null,bd=mx*mx;for(const e of E){if(e.dead||(sk&&sk.includes(e)))continue;const ax=e.x-P.x,ay=e.y-P.y,d=ax*ax+ay*ay;if(d<bd){bd=d;b=e}}return b}
function upd(dt){gbuild();BMB=0;devUpd(dt);T+=dt*(CF.g==1?2:1);modes(dt);powers(dt);skinTrail();if(INF()){if(CF.g==6){CL.t-=dt;if(CL.t<=0){CL.t=20;if(R()<.5)boss(Math.floor(R()*4))}}else if(T>=nb&&!bossE){boss(bc%4);nb=T+(CF.g==5?100:300)}if(T>=nh){nh=T+45;ring(25+Math.floor(T/60)*3)}}while(ei<EVc.length&&T>=EVc[ei][0]){const v=EVc[ei++];v[1]&&v[1]();v[2]&&ban(v[2])}
if(rain>0)rain-=dt;if(dark>0)dark-=dt;if(horde>0)horde-=dt;if(silence>0){silence-=dt;if(silence<=0)ring(80)}
rndT-=dt;if(rndT<=0){rndT=95+R()*30;rndEv()}
for(const q of PL){if(q.dead)continue;P=q;{const IN=PIN();let mx=IN.mx,my=IN.my;const l=Math.hypot(mx,my);if(l>1){mx/=l;my/=l}
if(l>.1){P.ddx=mx/Math.max(l,1);P.ddy=my/Math.max(l,1)}
let sp=P.sp*(DV.frz>0?.4:1);if(P.dT>0){P.dT-=dt;P.x+=P.ddx*650*dt;P.y+=P.ddy*650*dt}else{P.x+=mx*sp*dt;P.y+=my*sp*dt}
P.dc=Math.max(0,P.dc-dt);P.iv-=dt;if(P.regen)P.hp=Math.min(P.mhp,P.hp+P.regen*dt*(1+(l<.1?(P.rst||0):0)));if(P.sh<P.shM){P.shT+=dt;if(P.shT>(P.shr||10)){P.shT=0;P.sh++}}

// tiro
P.cd-=dt;const tg=nearest(380);if(IN.am)P.a=IN.aa;else if(tg)P.a=Math.atan2(tg.y-P.y,tg.x-P.x);else if(l>.1)P.a=Math.atan2(my,mx);
if(P.cd<=0&&(IN.am?IN.af:tg)){P.cd=P.rate*(PW.fr>0?.5:1);sfx('shoot');puff(P.x+Math.cos(P.a)*18,P.y+Math.sin(P.a)*18,'#ffe9a0',3,90);for(let i=0;i<P.cnt;i++){const a=P.a+(i-(P.cnt-1)/2)*(P.sprd||.16),c=R()<P.crit,v=P.spd||430;B.push({x:P.x,y:P.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,d:P.dmg*dx*(c?(P.cdm||2):1)*(1+(l>.1?(P.mvd||0):0)),c,p:P.pierce,bn:P.bounce,h:[],l:P.life||1.2,pd:P.pdm||0,br:P.br||220})}
for(let i=0;i<(P.back||0);i++){const a=P.a+PI+(i-(P.back-1)/2)*.3,v=P.spd||430;B.push({x:P.x,y:P.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,d:P.dmg*dx*.7,c:0,p:P.pierce,bn:P.bounce,h:[],l:P.life||1.2,pd:P.pdm||0,br:P.br||220})}}
}}P=PL[0];camUpd(dt);
for(const b of B){b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;if(b.l>0){const QC=qry(b.x,b.y,4,QB);for(let qi=0;qi<QC.length;qi++){const e=QC[qi];if(e.dead||b.l<=0)continue;if(b.h.includes(e))continue;{const ddx=e.x-b.x,ddy=e.y-b.y,rr=e.r+4;if(ddx*ddx+ddy*ddy<rr*rr){b.h.push(e);hit(e,b.d,b.x-b.vx,b.y-b.vy,b.c);if(P.bx)boom(b.x,b.y,48,b.d*.5);
if(b.bn>0){const n=nearest2(b,b.br||220);if(n){b.bn--;const a=Math.atan2(n.y-b.y,n.x-b.x);b.vx=Math.cos(a)*430;b.vy=Math.sin(a)*430;break}}
if(b.p>0){b.p--;if(b.pd)b.d*=1+b.pd}else b.l=0;break}}}}}
cmp(B,b=>b.l>0);
// orbitais, aura, raios
for(const q of PL){if(q.dead)continue;P=q;{P.oa+=dt*3*(1+(P.ors||0));for(let i=0;i<P.orb;i++){const a=P.oa+i/P.orb*PI*2,or_=52+(P.orr||0),ox=P.x+Math.cos(a)*or_,oy=P.y+Math.sin(a)*or_;{const oc=qry(ox,oy,9,QO);for(let qk=0;qk<oc.length;qk++){const e=oc[qk];if(e.dead||e.oc>0)continue;const ddx=e.x-ox,ddy=e.y-oy,rr=e.r+9;if(ddx*ddx+ddy*ddy<rr*rr){e.oc=.35;hit(e,P.dmg*.8*dx,P.x,P.y)}}}}
if(P.aura){P.at-=dt;if(P.at<=0){P.at=.5;const rad=auraR(P.aura);{const ac=qry(P.x,P.y,rad,QA);for(let qk=0;qk<ac.length;qk++){const e=ac[qk];if(e.dead)continue;const ddx=e.x-P.x,ddy=e.y-P.y,rr=rad+e.r;if(ddx*ddx+ddy*ddy<rr*rr){hit(e,(3+P.aura*3)*(P.dmg/10)*dx,P.x,P.y);if(P.burn){e.bn=2;e.bd=P.dmg*.15*P.burn}}}}}}
if(P.light){P.lt-=dt;if(P.lt<=0){P.lt=Math.max(1,3.4-.3*P.light);const c=qry(P.x,P.y,340,[]).filter(e=>!e.dead&&Math.hypot(e.x-P.x,e.y-P.y)<340);for(let i=0;i<P.light&&c.length;i++){const e=c.splice(Math.floor(R()*c.length),1)[0];FX.push({x:e.x,y:e.y,x0:e.x,y0:e.y-260,t:.2,bolt:1});hit(e,45*(P.dmg/10)*dx,e.x,e.y-50);if(P.lch){let cu=e;const jd=[e];for(let k=0;k<P.lch;k++){const n=qry(cu.x,cu.y,150,[]).find(o=>!o.dead&&!jd.includes(o));if(!n)break;jd.push(n);FX.push({x:n.x,y:n.y,x0:cu.x,y0:cu.y-20,t:.15,bolt:1});hit(n,30*(P.dmg/10)*dx,n.x,n.y-50);cu=n}}}}}
}}P=PL[0];
// inimigos
const rm=rain>0?1.15:1;
for(const e of E){if(e.dead)continue;P=tgt(e);if(fz>0){e.fl-=dt;continue}e.oc-=dt;e.fl-=dt;if(e.bn>0){e.bn-=dt;e.bt=(e.bt||0)-dt;if(e.bt<=0){e.bt=.5;e.hp-=e.bd*dx;e.fl=.05;if(!LQ)puff(e.x,e.y,'#ff8a2a',2,60);if(e.hp<=0&&!e.dead){kill(e);continue}}}e.x+=e.vx*dt;e.y+=e.vy*dt;e.vx*=.88;e.vy*=.88;
if(e.boss){bossAI(e,dt);continue}
const ddx=P.x-e.x,ddy=P.y-e.y,d=Math.hypot(ddx,ddy)||1,ux=ddx/d,uy=ddy/d;let v=e.sp*rm,ai=e.ai;
if(ai=='a'){if(d<130)v=-v*.8;else if(d<200)v=0;e.t1-=dt;if(e.t1<=0&&d<320){e.t1=2.2;aim(e,150,0,e.dmg,5,e.k==6?'#d38aff':'#ffd45a')}}
else if(ai=='b'){e.t2+=dt*6;e.x+=-uy*Math.sin(e.t2)*60*dt;e.y+=ux*Math.sin(e.t2)*60*dt}
else if(ai=='w'){e.t1-=dt;if(e.t1<=0){e.t1=3;e.t2=.6}if(e.t2>0){e.t2-=dt;v=e.t2>.35?0:e.sp*4}}
else if(ai=='n'){if(d<200)v=-v;e.t1-=dt;if(e.t1<=0){e.t1=4;summon(e,0,2)}}
else if(ai=='x'&&d<e.r+P.r+8){e.dead=1;boom(e.x,e.y,62,0);if(Math.hypot(P.x-e.x,P.y-e.y)<62+P.r)hurt(28);continue}
e.x+=ux*v*dt;e.y+=uy*v*dt;if(d<e.r+P.r*.8)hurt(e.dmg)}
P=PL[0];// separação leve
for(let i=0;i<E.length;i+=2){const a=E[i],b=E[(i*7+3)%E.length];if(a===b||a.dead||b.dead||a.boss||b.boss)continue;const dx2=a.x-b.x,dy2=a.y-b.y,dd=Math.hypot(dx2,dy2);if(dd>0&&dd<a.r+b.r){const k=(a.r+b.r-dd)*.4;a.x+=dx2/dd*k;a.y+=dy2/dd*k;b.x-=dx2/dd*k;b.y-=dy2/dd*k}}
cmp(E,e=>!e.dead);
if(bossE&&bossE.dead)bossE=null;
// spawn
if(silence<=0&&CF.g!=2){bk-=dt;const gap=Math.max(.1,.85-T/60*.035)/(horde>0?3:1)/MZ[3]*(CF.g==5?3:1)/(CF.g==3?1.5:1)/(PL.length>1?1.5:1);if(bk<=0){bk=gap;const[a,b]=edge();spawn(pick(),a,b,T>180&&R()<.03)}}
// tiros inimigos, anéis, marcadores
for(const b of EB){b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;for(const q of PL){if(q.dead)continue;P=q;if(Math.hypot(b.x-P.x,b.y-P.y)<b.r+P.r*.8){hurt(b.d);b.l=0}}P=PL[0]}if(EB.length>500)EB.splice(0,EB.length-500);cmp(EB,b=>b.l>0);
for(const r of RG){r.r+=r.sp*dt;for(const q of PL){if(q.dead||(r.h&&r.h[q.id]))continue;P=q;if(Math.abs(Math.hypot(P.x-r.x,P.y-r.y)-r.r)<12){r.h=r.h||{};r.h[q.id]=1;hurt(r.d||18)}}P=PL[0]}cmp(RG,r=>r.r<r.m);
for(const m of MK){m.t-=dt;if(m.t<=0){if(m.L){const ux=Math.cos(m.a),uy=Math.sin(m.a);for(const q of PL){if(q.dead)continue;P=q;const px=P.x-m.x,py=P.y-m.y,pr=Math.max(0,Math.min(m.len,px*ux+py*uy));if(Math.hypot(px-ux*pr,py-uy*pr)<m.w/2+P.r)hurt(m.d)}P=PL[0];FX.push({beam:1,x:m.x,y:m.y,a:m.a,w:m.w,len:m.len,t:.2});for(let i=0;i<10;i++)puff(m.x+ux*m.len*R(),m.y+uy*m.len*R(),'#ff6a5a',2,120);shake=9;sfx('boom');if(m.dash){m.dash.vx=ux*2800;m.dash.vy=uy*2800}}else if(m.rad){puff(m.x,m.y,m.dv?'#ff1a1a':'#ff8a3a',16,200);FX.push({x:m.x,y:m.y,r:m.rad,t:.25,ring:1});for(const q of PL){if(q.dead)continue;P=q;if(Math.hypot(P.x-m.x,P.y-m.y)<m.rad+P.r)hurt(m.d)}P=PL[0];shake=5}}}cmp(MK,m=>m.t>0);
// cristais
for(const g of G){P=np(g.x,g.y);const d=Math.hypot(P.x-g.x,P.y-g.y);if(d<70*P.mag||g.m){g.m=1;const s=260+(g.k?0:200),a=Math.atan2(P.y-g.y,P.x-g.x);g.x+=Math.cos(a)*s*dt;g.y+=Math.sin(a)*s*dt}
if(d<P.r+8){const v=g.v;g.v=-1;if(g.k==0){xpAdd(v);if(P.gh)P.hp=Math.min(P.mhp,P.hp+P.gh)}else if(g.k==1)P.hp=Math.min(P.mhp,P.hp+30);else if(g.k==3)usePW(g.pw);else if(g.k==4){lvUp(1);sfx('boss2');ban('Baú aberto!');ach('e_bau')}else{earned+=5;sfx('coin')}}}
P=PL[0];cmp(G,g=>g.v>=0);
for(const p of PA){p.x+=p.vx*dt;p.y+=p.vy*dt;p.t-=dt}cmp(PA,p=>p.t>0);for(const t of TX)t.t-=dt;cmp(TX,t=>t.t>0);for(const f of FX)f.t-=dt;cmp(FX,f=>f.t>0);for(const d of DS)d.t+=dt;cmp(DS,d=>d.t<1.3);
shake*=.9}
function nearest2(b,mx){let r=null,bd=mx*mx;for(const e of E){if(e.dead||b.h.includes(e))continue;const ax=e.x-b.x,ay=e.y-b.y,d=ax*ax+ay*ay;if(d<bd){bd=d;r=e}}return r}
// ---------- desenho ----------
const bg=()=>{x.fillStyle=BI[bi][1];x.fillRect(0,0,W,H)};
function world(cx,cy){const K=BI[bi],hw=W/2/Z,hh=H/2/Z,c=140,x0=Math.floor((cx-hw)/c)-1,x1=Math.floor((cx+hw)/c)+1,y0=Math.floor((cy-hh)/c)-1,y1=Math.floor((cy+hh)/c)+1;x.fillStyle=gp();x.fillRect(cx-hw-2,cy-hh-2,hw*2+4,hh*2+4);
for(let gx=x0;gx<=x1;gx++)for(let gy=y0;gy<=y1;gy++){const h=hs(gx,gy),px=gx*c+(h%100)*1.2,py=gy*c+((h>>7)%100)*1.2;
if(h%5==0){x.fillStyle=K[2];x.beginPath();x.arc(px,py,5+h%4,0,7);x.fill()}
if(h%13==0)prop(K[3],px,py);else if(h%17==0){if(SPR.rock(bi,px,py))continue;x.fillStyle=K[4];x.beginPath();x.ellipse(px,py,16,11,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.ellipse(px-3,py-3,9,6,0,0,7);x.fill()}}}
function prop(k,px,py){x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(px+5,py+14,25,9,0,0,7);x.fill();if(SPR.prop(k,px,py))return;if(k==0){x.fillStyle='#0c1511';x.beginPath();x.arc(px,py,22,0,7);x.fill();x.fillStyle='#1f3a2a';x.beginPath();x.arc(px-3,py-4,19,0,7);x.fill();x.fillStyle='#2a4d37';x.beginPath();x.arc(px-6,py-8,10,0,7);x.fill();x.fillStyle='rgba(150,255,170,.12)';x.beginPath();x.arc(px-9,py-12,6,0,7);x.fill()}
else if(k==1){x.fillStyle='#2d3140';x.beginPath();x.roundRect(px-11,py-16,22,30,[11,11,2,2]);x.fill();x.fillStyle='#4a5066';x.fillRect(px-2,py-11,4,14);x.fillRect(px-6,py-7,12,4)}
else if(k==2){x.fillStyle='#1b3a2a';x.beginPath();x.ellipse(px,py,30,16,0,0,7);x.fill();x.fillStyle='#2f6b44';x.beginPath();x.ellipse(px-6,py-3,12,5,0,0,7);x.fill();x.strokeStyle='#4a8a50';x.lineWidth=2;for(let i=0;i<3;i++){x.beginPath();x.moveTo(px+12+i*5,py-6);x.lineTo(px+14+i*5,py-24);x.stroke()}}
else if(k==3){x.fillStyle='rgba(160,215,255,.85)';for(let i=-1;i<2;i++){x.beginPath();x.moveTo(px+i*10-6,py+10);x.lineTo(px+i*10,py-18+Math.abs(i)*9);x.lineTo(px+i*10+6,py+10);x.fill()}}
else{x.fillStyle='#3a3f47';x.beginPath();x.arc(px,py,18,0,7);x.fill();x.strokeStyle='#59606b';x.lineWidth=5;for(let i=0;i<8;i++){const a=i*PI/4;x.beginPath();x.moveTo(px+Math.cos(a)*16,py+Math.sin(a)*16);x.lineTo(px+Math.cos(a)*24,py+Math.sin(a)*24);x.stroke()}x.fillStyle='#17151a';x.beginPath();x.arc(px,py,7,0,7);x.fill()}}
const SP={};function spr(em,res){const k=em+res;if(!SP[k]){const c=document.createElement('canvas');c.width=c.height=res;const q=c.getContext('2d');q.font=(res*.76)+'px serif';q.textAlign='center';q.textBaseline='middle';q.shadowColor='rgba(0,0,0,.95)';for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){q.shadowOffsetX=a*res*.03;q.shadowOffsetY=b*res*.03;q.fillText(em,res/2,res*.54)}q.shadowColor='transparent';q.fillText(em,res/2,res*.54);SP[k]=c}return SP[k]}
function drawE(e){if(e.dv){devDraw(e);return}const em=AB.clown>0?'🤡':e.em||EM[e.k],bob=Math.sin(T*8+e.x)*.07,sz=e.r*(e.boss?1.45:1.35);x.save();x.translate(e.x,e.y);
if(e.ai=='g')x.globalAlpha=.65;x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(0,e.r*.85,e.r*.9,e.r*.3,0,0,7);x.fill();
if(e.boss){const g=x.createRadialGradient(0,0,e.r*.4,0,0,e.r*2.2);g.addColorStop(0,e.col+'aa');g.addColorStop(1,e.col+'00');x.fillStyle=g;x.beginPath();x.arc(0,0,e.r*2.2,0,7);x.fill()}
const spOk=!(AB.clown>0)&&SPR.enemy(x,e);if(!spOk){x.rotate(bob+(e.ai=='b'?Math.sin(T*20)*.2:0));const sq=Math.sin(T*10+e.x*.1)*.07;x.scale(1+sq,1-sq);const res=Math.min(160,Math.ceil(sz*2*Z*D/16)*16);x.drawImage(spr(em,res),-sz,-sz,sz*2,sz*2);
if(e.fl>0){x.globalCompositeOperation='lighter';x.globalAlpha=.7;x.drawImage(spr(em,res),-sz,-sz,sz*2,sz*2);x.globalAlpha=1;x.globalCompositeOperation='source-over'}x.rotate(-bob)}x.globalAlpha=1;
if(e.ai=='w'&&e.t2>.35){x.strokeStyle='#ff4d5e';x.lineWidth=2;x.beginPath();x.arc(0,0,e.r+5,0,7);x.stroke()}
if(e.el){x.strokeStyle='#ffc94a';x.lineWidth=3;x.beginPath();x.arc(0,0,e.r+4,0,7);x.stroke()}
if(!e.boss&&e.hp<e.mh){x.fillStyle='rgba(0,0,0,.6)';x.fillRect(-e.r,-e.r-9,e.r*2,4);x.fillStyle='#ff4d5e';x.fillRect(-e.r,-e.r-9,e.r*2*e.hp/e.mh,4)}
x.restore()}
function draw(t){x.setTransform(D,0,0,D,0,0);x.imageSmoothingEnabled=false;tm=t/1000;mv=st=='play'&&Math.hypot(joy.dx+joy.kx,joy.dy+joy.ky)>.1?1:0;bg();
if(st=='menu'||st=='shop'||st=='setup'||st=='ach'||st=='hist'||st=='cls'){const c=t/1000;x.save();x.translate(W/2,H/2);x.scale(Z,Z);x.translate(-c*20,-c*10);world(c*20,c*10);x.restore();
x.save();x.translate(W/2,H*.62);gl(0,0,Math.min(W,H)*.35,'#ffb340',.35);hero(x,0,Math.sin(c*2)*4,Math.min(W,H)*.09,SK[S.skin],Math.sin(c)*.6);x.restore();vig();return}
if(!P)return;cullR=Math.max(W,H)/2/Z+110;x.save();x.translate(W/2+(R()-.5)*shake,H/2+(R()-.5)*shake);x.rotate(AB.fa||0);x.scale(Z,Z);x.translate(-cam.x,-cam.y);
world(cam.x,cam.y);
drawMK();
for(const r of RG){x.strokeStyle=r.dv?'rgba(255,26,26,.95)':'rgba(255,150,90,.9)';x.lineWidth=8;x.beginPath();x.arc(r.x,r.y,r.r,0,7);x.stroke()}
for(const g of G){if(g.k>=3||g.em){const em=g.em||(g.k==4?'🎁':['⚡','🧲','💣','🛡️','🔫','⏰','⭐'][g.pw]);gl(g.x,g.y,24,'#ffd45a',.6);if(!SPR.itm(x,g,T,g.y+Math.sin(T*5+g.x)*3))x.drawImage(spr(em,64),g.x-14,g.y-14+Math.sin(T*5+g.x)*3,28,28);continue}gl(g.x,g.y,16,g.k==0?'#4fe0e8':g.k==1?'#ff6a7a':'#ffc94a',.7);if(SPR.itm(x,g,T,g.y))continue;x.fillStyle=g.k==0?'#4fe0e8':g.k==1?'#ff6a7a':'#ffc94a';x.beginPath();if(g.k==0){x.moveTo(g.x,g.y-6);x.lineTo(g.x+5,g.y);x.lineTo(g.x,g.y+6);x.lineTo(g.x-5,g.y)}else x.arc(g.x,g.y,g.k==1?7:5,0,7);x.fill()}
for(const d of DS)SPR.death(x,d);for(const e of E)if(Math.abs(e.x-cam.x)<cullR+e.r&&Math.abs(e.y-cam.y)<cullR+e.r)drawE(e);drawPW();devFX();
if(P.aura){const ar=auraR(P.aura),g2=x.createRadialGradient(P.x,P.y,ar*.35,P.x,P.y,ar);g2.addColorStop(0,'rgba(255,120,40,.04)');g2.addColorStop(.8,'rgba(255,120,40,.16)');g2.addColorStop(1,'rgba(255,170,60,.34)');x.fillStyle=g2;x.beginPath();x.arc(P.x,P.y,ar,0,7);x.fill();x.strokeStyle='rgba(255,170,60,.75)';x.lineWidth=3;x.setLineDash([14,10]);x.lineDashOffset=-T*40;x.beginPath();x.arc(P.x,P.y,ar,0,7);x.stroke();x.setLineDash([])}
for(const q of PL){P=q;drawPlayer()}P=PL[0];
for(const b of B){const bk=CF.w==3?'virote_1f':CF.w==4?'orbe_cajado_4f':b.c?'bala_critica_4f':'bala_4f',bsp=SPR.at(x,'items',bk,T,b.x,b.y,CF.w==3?.5:.55,0,Math.atan2(b.vy,b.vx));gl(b.x,b.y,b.c?18:13,AB.rb>0?'hsl('+(Math.floor((T*6+b.x/40)%12)*30)+',100%,60%)':b.c?'#ffd45a':'#ffc860',.9);if(!bsp){x.strokeStyle='rgba(255,220,140,.4)';x.lineWidth=3;x.beginPath();x.moveTo(b.x-b.vx*.04,b.y-b.vy*.04);x.lineTo(b.x,b.y);x.stroke();x.fillStyle=b.c?'#ffd45a':'#fff6c8';x.beginPath();x.arc(b.x,b.y,b.c?5:4,0,7);x.fill()}}
for(const b of EB){gl(b.x,b.y,b.r*3.2,b.col,.85);const ang=Math.atan2(b.vy,b.vx),eo=b.dv?0:b.ar?SPR.at(x,'items','inimigo_flecha_1f',T,b.x,b.y,.4,0,ang+PI):SPR.at(x,'items',/ff8a5e|ff6a5a|ff4d/i.test(b.col)?'inimigo_orbe_espiral_laranja_4f':/c58bff|d38aff|b03cff/i.test(b.col)?'inimigo_orbe_espiral_roxo_4f':'inimigo_orbe_espiral_dourado_4f',T,b.x,b.y,b.r*3.6/48);if(!eo){x.fillStyle=b.col;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.fill()}}
for(const f of FX){if(f.bolt){x.strokeStyle='#bfe9ff';x.lineWidth=3;x.beginPath();x.moveTo(f.x0,f.y0);x.lineTo(f.x+8,f.y-130);x.lineTo(f.x-8,f.y-60);x.lineTo(f.x,f.y);x.stroke()}else if(f.beam){x.save();x.globalCompositeOperation='lighter';x.translate(f.x,f.y);x.rotate(f.a);x.fillStyle='rgba('+(f.c||'255,235,235')+','+f.t*5+')';x.fillRect(0,-f.w/2,f.len,f.w);x.restore()}else if(f.sk){if(f.fol){f.x=P.x;f.y=P.y+14}SPR.at(x,'fx',f.sk,1-f.t/f.t0,f.x,f.y,f.sc,0,0,1)}else if(f.ring){x.strokeStyle='rgba(255,170,70,'+f.t*4+')';x.lineWidth=4;x.beginPath();x.arc(f.x,f.y,f.r*(1-f.t*2),0,7);x.stroke()}}
for(const p of PA){if(!LQ)gl(p.x,p.y,p.r*4,p.c,Math.min(.8,p.t*1.6));x.globalAlpha=Math.min(1,p.t*2);x.fillStyle='#fff';x.beginPath();x.arc(p.x,p.y,p.r*.5,0,7);x.fill()}x.globalAlpha=1;
x.textAlign='center';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.85)';for(const q of TX){x.font='700 '+13*(1+Math.max(0,q.t-.45)*3)+'px Nunito';const yy=q.y-(.6-q.t)*30;x.strokeText(q.s,q.x,yy);x.fillStyle=q.c;x.fillText(q.s,q.x,yy)}
x.restore();
x.fillStyle=AMC[bi];for(const m of AM){m.y+=AMV[bi]*(.5+m.s%1);m.x+=Math.sin(t/1000+m.s)*.0004;if(m.y>1)m.y-=1;if(m.y<0)m.y+=1;x.globalAlpha=.5;x.beginPath();x.arc((((m.x%1)+1)%1)*W,m.y*H,1.5+m.s%2,0,7);x.fill()}x.globalAlpha=1;
if(rain>0){x.strokeStyle='rgba(160,190,255,.3)';x.lineWidth=1;x.beginPath();for(let i=0;i<60;i++){const rx=(hs(i,Math.floor(t/60))%W),ry=(hs(Math.floor(t/60),i)%H);x.moveTo(rx,ry);x.lineTo(rx-4,ry+14)}x.stroke()}
const dk=.12+.28*Math.sin(PI*Math.min(1,T/1200));x.fillStyle='rgba(8,6,28,'+dk+')';x.fillRect(0,0,W,H);x.fillStyle=BT[bi];x.fillRect(0,0,W,H);vig();if(AB.disco>0){x.globalCompositeOperation='lighter';x.fillStyle='hsla('+(Math.floor(T*4)%12*30)+',100%,50%,.2)';x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over'}
if(dark>0){const g=x.createRadialGradient(W/2,H/2,40*Z,W/2,H/2,200*Z);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.93)');x.fillStyle=g;x.fillRect(0,0,W,H)}
if(P.hp<P.mhp*.3){const g=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,'rgba(255,0,40,0)');g.addColorStop(1,'rgba(255,0,40,.35)');x.fillStyle=g;x.fillRect(0,0,W,H)}
for(const joy of JL)if(joy.on){x.fillStyle='rgba(255,255,255,.06)';x.strokeStyle='rgba(255,179,64,.55)';x.lineWidth=3;x.beginPath();x.arc(joy.x,joy.y,52,0,7);x.fill();x.stroke();gl(joy.x+joy.dx*50,joy.y+joy.dy*50,46,'#ffb340',.55);x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(joy.x+joy.dx*50,joy.y+joy.dy*50,20,0,7);x.fill()}
if(fz>0){x.fillStyle='rgba(120,200,255,.18)';x.fillRect(0,0,W,H)}
if(flash>0){x.fillStyle='rgba(255,40,60,'+flash*.45+')';x.fillRect(0,0,W,H);flash=Math.max(0,flash-.035)}
if(MS.use&&!AIM.pad&&st=='play'){x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.arc(MS.x,MS.y,10,0,7);x.moveTo(MS.x-16,MS.y);x.lineTo(MS.x+16,MS.y);x.moveTo(MS.x,MS.y-16);x.lineTo(MS.x,MS.y+16);x.stroke()}
if(dbg){x.fillStyle='#0f0';x.font='12px monospace';x.textAlign='left';x.fillText('FPS '+fps+' ini '+E.length+' tiros '+B.length+'/'+EB.length+' part '+PA.length,10,H-10)}
if((++HF)%4==0){$('hpf').style.width=Math.max(0,P.hp/P.mhp*100)+'%';$('hpt').textContent=(PL.length>1?nickOf(0)+'  ':'')+Math.ceil(Math.max(0,P.hp))+' / '+Math.ceil(P.mhp);{const q=PL[1];$('hp2w').style.display=q?'block':'none';if(q){$('hpf2').style.width=Math.max(0,q.hp/q.mhp*100)+'%';$('hpt2').textContent=nickOf(1)+'  '+Math.ceil(Math.max(0,q.hp))+' / '+Math.ceil(q.mhp)}}$('xpf').style.width=xp/xpn*100+'%';$('tm').textContent=CF.g==2?'🌊 Onda '+WV.n:INF()?fmt(T)+' ∞':fmt(Math.max(0,1200-T));
$('lv').innerHTML=_nm(0)+' · '+(lvl>=LVC?'Nível MÁX':'Nível '+lvl)+' · '+MN[CF.g||0]+(CF.i?' ♾️':'');if(MI)$('ms').textContent='🎯 '+MI.t+' ('+Math.min(MI.g,Math.floor(miP()))+'/'+MI.g+')';$('kl').textContent='ABATES '+kills+' · '+scoreNow().toLocaleString('pt-BR')+' PTS'+(cmb>=5?' · combo ×'+cm().toFixed(2):'');$('gc').textContent=earned.toLocaleString('pt-BR');$('dsh').style.height=(PL[CO.on&&CO.tr>=0?CO.tr:0]||P).dc/P.dashCd*100+'%';$('uli').style.height=(100-ult)+'%';$('ult').classList[ult>=100?'add':'remove']('rdy');
if(DV.e)devHud();if(bossE)$('bf').style.width=Math.max(0,bossE.hp/bossE.mh*100)+'%'}} let last=0,fa=0,fn=0;
function loop(t){requestAnimationFrame(loop);let dt=Math.min((t-last)/1000,.05);last=t;fa+=dt;fn++;if(fa>.5){fps=Math.round(fn/fa);fa=fn=0;if(st=='play'&&!document.hidden){if(fps<40)LW++;else LW=0;if(LW>=3){LW=0;if(LQ<3){LQ++;if(LQ==2)DC=1.25;if(LQ==3)DC=1;if(LQ>=2)rs()}}}}
inp(dt);if(st=='play')upd(dt*ts);draw(t)}
requestAnimationFrame(loop);
// ---------- controle ----------
cv.addEventListener('pointerdown',e=>{if(e.pointerType=='mouse'){MS.use=1;MS.x=e.clientX;MS.y=e.clientY;if(e.button==2)dash();else MS.on=1;return}if(st!='play'||joy.on||CO.on)return;joy.on=1;joy.id=e.pointerId;joy.x=e.clientX;joy.y=e.clientY;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(!joy.on||e.pointerId!=joy.id)return;let a=(e.clientX-joy.x)/50,b=(e.clientY-joy.y)/50;const l=Math.hypot(a,b);if(l>1){a/=l;b/=l;joy.x=e.clientX-a*50;joy.y=e.clientY-b*50}joy.dx=a;joy.dy=b});
const up=e=>{if(e.pointerId==joy.id){joy.on=0;joy.dx=joy.dy=0;joy.id=-1}};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
function dash(){if(st=='play'&&!P.dead&&P.dc<=0){P.dc=P.dashCd;P.dT=.18*(1+(P.dtx||0));sfx('dash');ach('e_dash')}}
$('dash').addEventListener('pointerdown',e=>{e.stopPropagation();withP(PL[CO.on&&CO.tr>=0?CO.tr:0],dash)});
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(!CO.on){if(k==' ')dash();if(k=='q')fireUlt()}if(k=='escape'&&st=='play'){st='pause';show('pause')}
if(k=='a'||k=='arrowleft')joy.kx=-1;if(k=='d'||k=='arrowright')joy.kx=1;if(k=='w'||k=='arrowup')joy.ky=-1;if(k=='s'||k=='arrowdown')joy.ky=1});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();if('ad'.includes(k)||k.startsWith('arrowl')||k.startsWith('arrowr'))joy.kx=0;if('ws'.includes(k)||k.startsWith('arrowu')||k.startsWith('arrowd'))joy.ky=0});
// ---------- painel de administrador (oculto) ----------
const hash=s=>{let h=5381;for(const c of s)h=(h*33+c.charCodeAt(0))>>>0;return h};const _y=s=>(hash(s)^_z1)>>>0;
let taps=0,tt=0,prev='menu';
function tapSecret(){const n=Date.now();taps=n-tt<1800?taps+1:1;tt=n;if(taps>=7){taps=0;openAdm()}}
$('logo').addEventListener('click',tapSecret);$('tm').addEventListener('click',tapSecret);
function openAdm(){prev=st;if(st=='play')st='adm';$('pin').value='';showMenu();$('pinb').style.display=adm?'none':'flex';$('apan').style.display=adm?'block':'none';show('adm')}
$('pok').onclick=()=>{if(hash($('pin').value)===2088324368){adm=1;$('qa').style.display='block';$('pinb').style.display='none';$('apan').style.display='block'}else $('pin').value=''};
$('aclose').onclick=()=>{hide('adm');if(prev=='play')st='play'};
const need=f=>()=>{if(P&&st!='menu'&&st!='shop'&&st!='over')f()};
const AD=[['Invencível',need(()=>god=!god)],['Dano ×10',need(()=>dx=dx>1?1:10)],['+10.000 moedas',()=>{S.coins+=1e4;sv();ref()}],['Liberar todas as skins',()=>{S.own=SK.map((_,i)=>i);sv();shopUI()}],
['Subir 1 nível',need(()=>{prev='play';if(lvl<LVC){lvl++;xpn=xpNeed(lvl);pend++}})],['+10 níveis',need(()=>{const n=Math.min(10,LVC-lvl);lvl+=n;xpn=xpNeed(lvl);pend+=n})],['Pular +1 minuto',need(()=>T+=60)],['Pular +5 minutos',need(()=>T+=300)],
['Boss 1',need(()=>boss(0))],['Boss 2',need(()=>boss(1))],['Boss 3',need(()=>boss(2))],['Boss 4 (final)',need(()=>boss(3))],
['Horda (40)',need(()=>ring(40))],['Elite',need(()=>elite(1))],['Noite escura',need(()=>dark=60)],['Chuva',need(()=>rain=60)],['Evento aleatório',need(()=>rndEv())],
['Limpar inimigos',need(()=>{E.forEach(e=>{if(!e.boss)e.dead=1});EB=[]})],['Curar tudo',need(()=>P.hp=P.mhp)],['Todos os upgrades',need(()=>U.forEach(u=>{while((P.lv[u[0]]||0)<u[3])giveUp(u)}))],
['Velocidade do jogo',()=>{ts=ts>=4?.5:ts*2;ba.textContent=''}],['Mostrar debug',()=>dbg=!dbg],['Resetar progresso',()=>{S={coins:0,own:[0],skin:0,best:0};sv();ref();shopUI()}]];
AD.push(['🌪️ Tornados de tubarões laser',TG(()=>TN.length>0,()=>{TN=[];SH=[]},()=>{TN=[0,1,2].map(i=>({a:i*2.1,life:DU(25),s:0,x:P.x,y:P.y}))})],['☄️ Chuva de meteoros',TG(()=>AP.met>0,()=>AP.met=0,()=>AP.met=DU(10))],['⚡ Tempestade de raios',TG(()=>AP.st>0,()=>AP.st=0,()=>AP.st=DU(10))],['🕳️ Buraco negro',TG(()=>BH.length>0,()=>BH=[],()=>BH.push({x:P.x+Math.cos(P.a)*170,y:P.y+Math.sin(P.a)*170,life:DU(8)}))],['🧊 Congelar tudo',TG(()=>fz>0,()=>fz=0,()=>fz=DU(8))],['🔆 Lasers giratórios',TG(()=>AP.ls>0,()=>AP.ls=0,()=>AP.ls=DU(10))],['🔥 Aura do apocalipse',need(()=>P.aura=P.aura>10?0:25)],['🔫 Metralhadora absurda',need(()=>{P.rate=.03;P.cnt=5;P.pierce=20;P.sprd=.1})],['🛸 12 lâminas orbitais',need(()=>P.orb=12)],['💀 Apocalipse (mata tudo)',need(()=>{flash=1;E.forEach(e=>hit(e,e.boss?e.mh*.3:1e9,P.x,P.y))})],['👑 Matar boss',need(()=>bossE&&hit(bossE,1e9,P.x,P.y))],['👁️ Boss secreto DEV',need(()=>{if(!DV.e)devSpawn()})],['🌍 Terremoto global',need(()=>{boom(P.x,P.y,600,400*dx);shake=20})],['💎 Chuva de XP',need(()=>{for(let i=0;i<60;i++)G.push({x:P.x+R()*300-150,y:P.y+R()*300-150,v:5,k:0})})],['🌌 Trocar bioma',()=>{bi=(bi+1)%5}]);
AD.push(['✨ Todos os upgrades supremos',need(()=>SUP.forEach(u=>{if(!P.lv[u[0]])giveUp(u)}))],['🕶️ Skin ADMIN (glitch)',()=>{if(!S.own.includes(20))S.own.push(20);S.skin=20;sv();shopUI()}]);
AD.push(['🍕 Chuva de pizzas',need(()=>{for(let i=0;i<25;i++)G.push({x:P.x+R()*500-250,y:P.y+R()*350-175,v:1,k:1,em:'🍕'});ban('🍕 Pizza para todos!')})],
['💸 Chuva de dinheiro',need(()=>{for(let i=0;i<60;i++)G.push({x:P.x+R()*500-250,y:P.y+R()*350-175,v:1,k:2,em:'💸'});ban('💸 Tá chovendo!')})],
['🐔 Invasão de galinhas',need(()=>{mob(40,'🐔',3,130,1,1);ban('🐔 Có có có!')})],
['🦆 Patos kamikazes',need(()=>{mob(12,'🦆',10,95,5,2);ban('🦆 Quack... BOOM')})],
['🦖 Dinossauros no recreio',need(()=>{mob(8,'🦖',300,45,9,10,0,1);ban('🦖 Rawr!')})],
['🧍 Modo gigante',TG(()=>AB.big>0,()=>{AB.big=0},()=>{AB.big=DU(15);ban('🧍 Você é um gigante!')})],
['🐜 Modo formiga',TG(()=>AB.ant>0,()=>{AB.ant=0},()=>{AB.ant=DU(15);ban('🐜 Tamanho de formiga!')})],
['🪩 Discoteca',TG(()=>AB.disco>0,()=>{AB.disco=0},()=>{AB.disco=DU(12);ban('🪩 Todo mundo dançando!')})],
['🌈 Tiros arco-íris',TG(()=>AB.rb>0,()=>{AB.rb=0},()=>{AB.rb=DU(15);ban('🌈 Arco-íris da morte!')})],
['🐄 Chuva de vacas',TG(()=>AB.cow>0,()=>{AB.cow=0},()=>{AB.cow=DU(8);ban('🐄 Cuidado com as vacas!')})],
['💖 Paz e amor',TG(()=>AB.peace>0,()=>{AB.peace=0},()=>{AB.peace=DU(12);ban('💖 Ninguém te machuca!')})],
['🙃 Mundo de cabeça pra baixo',TG(()=>AB.flip>0,()=>{AB.flip=0},()=>{AB.flip=DU(12);ban('🙃 Tudo de ponta-cabeça!')})],
['🐢 Matrix (câmera lenta)',TG(()=>AB.mxOn,()=>{AB.mx=0;AB.mxOn=0;ts=1},()=>{ts=.3;AB.mx=DU(3.2);AB.mxOn=1;ban('🐢 Bullet time!')})],
['🎰 Caça-níquel de upgrades',need(()=>{for(let i=0;i<3;i++){const a=U.filter(u=>(P.lv[u[0]]||0)<u[3]);if(a.length){const u=a[Math.floor(R()*a.length)];giveUp(u);emo(P.x,P.y-20*i,'🎰');ban('🎰 Jackpot: '+u[1])}}})],
['🤡 Circo (todos viram palhaços)',TG(()=>AB.clown>0,()=>{AB.clown=0},()=>{AB.clown=DU(20);ban('🤡 Bem-vindo ao circo!')})],
['👻 Modo fantasma',TG(()=>AB.ghost>0,()=>{AB.ghost=0},()=>{AB.ghost=DU(10);ban('👻 Intangível!')})],
['🍌 Casca de banana geral',need(()=>{E.forEach(e=>{if(!e.boss){e.vx=R()*1400-700;e.vy=R()*1400-700;emo(e.x,e.y,'🍌')}});ban('🍌 Todo mundo escorregou!')})],
['🪅 Piñata gigante',need(()=>{AB.pin=3;AB.pinOn=1;ban('🪅 Juntando os inimigos...')})],
['🎆 Fogos de artifício',TG(()=>AB.fw>0,()=>{AB.fw=0},()=>{AB.fw=DU(8);ban('🎆 Feliz ano novo!')})],
['🐕 Matilha de cachorros',TG(()=>AB.dogT>0,()=>{AB.dogT=0},()=>{DG=[0,1,2,3,4,5].map(i=>({x:P.x+R()*60,y:P.y+R()*60,cd:0}));AB.dogT=DU(20);ban('🐕 Au au! Soltem os cães!')})],
['🛸 Abdução em massa',need(()=>{E.filter(e=>!e.dead&&!e.boss).sort(()=>R()-.5).slice(0,15).forEach(e=>{FX.push({x:e.x,y:e.y,x0:e.x,y0:e.y-400,t:.3,bolt:1});emo(e.x,e.y,'🛸');hit(e,1e9,e.x,e.y)});ban('🛸 Eles levaram todo mundo!')})],
['🔥 O chão é lava',TG(()=>POOL.some(q=>q.s),()=>{POOL=POOL.filter(q=>!q.s)},()=>{for(let i=0;i<12;i++)POOL.push({x:P.x+R()*600-300,y:P.y+R()*400-200,r:90,t:DU(10),c:'#ff5a2a',s:1});ban('🔥 O chão é lava (pros inimigos)!')})],
['🎤 Show do cantor',TG(()=>AB.sing>0,()=>{AB.sing=0},()=>{AB.sing=DU(8);ban('🎤 Uma nota que mata!')})],
['🧨 Modo Bomberman',TG(()=>AB.bomb>0,()=>{AB.bomb=0},()=>{AB.ob=P.bx;AB.bomb=DU(15);AB.bOn=1;ban('🧨 Tudo explode!')})],
['🧬 Evolução suprema aleatória',need(()=>{const a=SUP.filter(u=>!P.lv[u[0]]);if(a.length){const u=a[Math.floor(R()*a.length)];giveUp(u);ban('✨ '+u[1]+'!');flash=.5}})],
['🥳 Festa do chefão',need(()=>{boss(Math.floor(R()*4));ban('🥳 O chefão chegou pra festa!')})]);
let ba;const ag=$('ag');AD.forEach(([n,f])=>{const b=document.createElement('button');b.className='btn g s';b.textContent=n;b.onclick=()=>{ba=b;f();if(n=='Velocidade do jogo')b.textContent='Velocidade: '+ts+'×'};$(catId(n)).appendChild(b)});
EN.forEach((e,i)=>$('asp').insertAdjacentHTML('beforeend','<option value="'+i+'">'+e[0]+'</option>'));U.forEach((u,i)=>$('aup').insertAdjacentHTML('beforeend','<option value="'+i+'">'+u[1]+'</option>'));
const sp2=n=>need(()=>{for(let i=0;i<n;i++){const[a,b]=edge();spawn(+$('asp').value,a,b)}})();
$('as1').onclick=()=>sp2(1);$('as10').onclick=()=>sp2(10);$('aug').onclick=need(()=>giveUp(U[+$('aup').value]));
document.addEventListener('contextmenu',e=>e.preventDefault());
// admin: abre cartas pendentes ao fechar o painel
$('aclose').addEventListener('click',()=>{if(prev=='play'&&pend)cardsOpen()});
// ===== v2: biomas, modos, armas, audio =====
// [nome, vida dos mobs, dano dos mobs, quantidade de mobs, moedas, SEU dano, XP ganho]
const MD=[['Fácil',.75,.6,.75,1.2,1.25,1.3,1.1],['Médio',1,1,1,1,1,1,1.3],['Difícil',1.5,1.4,1.35,1.6,.9,.85,1.6],['Pesadelo',2.3,1.9,1.9,2.5,.8,.7,1.6],['Baby',.2,.08,1.5,.6,4,3,1]];
const BI=[['Floresta Maldita','#10151c','#16241d',0,'#2a303b'],['Cemitério Sombrio','#14121c','#1f1a2e',1,'#3a3548'],['Pântano Tóxico','#0f1a14','#1c3322',2,'#2b3a2a'],['Ruínas Geladas','#131c26','#223446',3,'#6a8aa6'],['Fábrica Abandonada','#17151a','#2a262d',4,'#4a4048']];
const WP=[['Pistola','🔫',{}],['Escopeta','💥',{cnt:5,dmg:6,rate:1,life:.5,sprd:.14}],['Rifle','🎯',{dmg:6,rate:.2,spd:560}],['Besta','🏹',{dmg:28,rate:.95,pierce:3,spd:520}],['Cajado','🔮',{dmg:12,rate:.8,bx:1,spd:340}]];
const EM=['🧟','👹','💀','🦇','🦠','💣','🧙‍♀️','👻','🐺','🗿','☠️'];
const ICN={dmg:'melhoria_dano',rate:'melhoria_cadencia',multi:'melhoria_tiro_extra',pierce:'melhoria_perfuracao',bounce:'melhoria_ricochete',crit:'melhoria_critico',mhp:'melhoria_vida_maxima',regen:'melhoria_regeneracao',spd:'melhoria_botas',mag:'melhoria_ima',xp:'melhoria_sabiduria',orb:'melhoria_laminas_orbitais',aura:'melhoria_aura_de_fogo',light:'melhoria_relampago',exp:'melhoria_explosao',vamp:'melhoria_vampirismo',shield:'melhoria_escudo',dash:'melhoria_dash_veloz',armor:'melhoria_armadura',s_fury:'suprema_furia',s_rain:'suprema_chuva_perfurante',s_sun:'suprema_sol_ardente',s_storm:'suprema_tempestade_apocaliptica',s_immortal:'suprema_imortal',s_wraith:'suprema_vulto',s_eagle:'suprema_olho_de_aguia',s_sage:'suprema_sabio_supremo',s_blood:'suprema_sede_de_sangue'};
const IC={dmg:'💥',rate:'⏩',multi:'🔱',pierce:'🏹',bounce:'🎱',crit:'🎯',mhp:'❤️',regen:'🩹',spd:'👟',mag:'🧲',xp:'📘',orb:'🌀',aura:'🔥',light:'⚡',exp:'💣',vamp:'🧛',shield:'🛡️',dash:'💨',armor:'🪖'};
const DM=['Parabéns! Você descobriu que o chão é mais forte que você.','Era só andar para longe. Mas tudo bem, a gente entende.','Os inimigos agradecem a refeição.','Talvez o jogo seja difícil. Ou talvez seja você.','Seu dedo estava de folga, né?','Aquele upgrade foi ótimo... para os inimigos.','Sobreviver 20 minutos? Que ambição.','A tela de morte já está com o seu nome gravado.','Dizem que o dash serve para fugir. Dizem.','Foi uma performance memorável. Pelos motivos errados.','Até o tutorial teria te avisado.','Os zumbis estão ensaiando a dança da vitória.','Não se preocupe, ninguém viu. Só o jogo inteiro.','Você morreu com muita dignidade. Quer dizer, nenhuma.','Aquele monstro era só um pouquinho mais forte que o seu plano.','Descanse em pixels.','Andar para trás não é estratégia, é rendição.','A vida é curta. A sua foi mais ainda.','Se fosse fácil, você não teria perdido. Ah, espere.','Seu jogo foi tão rápido que o carregamento durou mais.','O mapa já está com saudade da sua cara de susto.','Boa tentativa! Digo isso a todos que perdem.'];
let CF=Object.assign({m:1,b:0,w:0,i:0},S.cf||{}),MZ=MD[CF.m],bi=CF.b,bc=0,nb=300,nh=60,flash=0,EVc=EV,tm=0,mv=0;
const HM=()=>MZ[1]*(1+bc*.3);
const AM=Array.from({length:50},()=>({x:R(),y:R(),s:R()*6})),AMC=['#d9ff7a','#b9a6ff','#7aff9a','#ffffff','#ff9a3a'],AMV=[.0004,.0003,.0005,.0012,-.001];
function setupUI(){fixCF();const s=$('setup');s.innerHTML='';const pn=document.createElement('div');pn.className='panel setup';pn.innerHTML='<h2>⚙️ Preparar partida</h2>';
const MDESC=['20 minutos, 4 bosses e o amanhecer.','10 minutos: tudo acontece no dobro da velocidade.','Ondas numeradas, com um boss a cada 5.','Só 30 de vida, mas dano triplicado.','Um evento maluco a cada 25 segundos.','Um boss atrás do outro, sem descanso.','Só em Difícil e Pesadelo: monte uma classe com 6 melhorias e 2 supremas, que você já começa no nível máximo. Aguente o máximo; bosses surgem ao acaso.']; const sec=(t,arr,key,desc,cls,dis)=>{const d=document.createElement('div');d.className='sec';d.innerHTML='<div class="lbl">'+t+'</div>';const sg=document.createElement('div');sg.className='seg';
arr.forEach((a,i)=>{const b=document.createElement('button');b.className='opt'+(CF[key]==i?' on':'')+(cls?' '+cls+i:'');b.innerHTML=a;if(dis&&dis(i))b.className+=' dis';b.onclick=()=>{if(dis&&dis(i)){sfx('hurt');if(key=='m')secHook('baby',i);return}secHook(key,i);CF[key]=i;if(key=='b')bi=i;S.cf=CF;sv();sfx('ui');setupUI()};sg.appendChild(b)});d.appendChild(sg);
if(desc){const q=document.createElement('div');q.className='desc';q.textContent=desc[CF[key]]||'';d.appendChild(q)}pn.appendChild(d)};
players(pn);sec('Modo de jogo',['modo_classico','modo_rapido','modo_ondas','modo_vidro','modo_caos','modo_boss_rush','suprema_furia'].map((n,i)=>SPR.ui(n)+'<b>'+['Clássico','Rápido','Ondas','Vidro','Caos','Boss Rush','Classes'][i]+'</b>'),'g',MDESC,0,i=>i==6&&!(CF.m==2||CF.m==3));if(CF.g==6)classSec(pn);
sec('Dificuldade',MD.map((m,i)=>SPR.ui('dificuldade_'+['facil','medio','dificil','pesadelo','baby'][i])+'<b>'+m[0]+'</b>'),'m',DDESC,'df',i=>(i==4&&!(CF.g==1||CF.i))||(CF.g==6&&i!=2&&i!=3));
sec('Bioma inicial',BI.map((b,i)=>SPR.ui('bioma_'+['floresta','cemiterio','pantano','ruinas_geladas','fabrica'][i])+'<b>'+b[0]+'</b>'),'b');
sec('Arma inicial',WP.map((w,i)=>SPR.ui('arma_'+SPR.WEAPON[i])+'<b>'+w[0]+'</b>'),'w');
const t=document.createElement('button');t.className='tog'+(CF.i?' on':'');t.innerHTML='<span>♾️ Modo infinito</span><i></i>';t.onclick=()=>{secHook('inf');CF.i=CF.i?0:1;S.cf=CF;sv();sfx('ui');setupUI()};pn.appendChild(t);
const f=document.createElement('div');f.className='row';const k=document.createElement('button');k.id='bk';k.className='btn g';k.textContent='← Voltar';k.onclick=()=>{hide('setup');show('menu');st='menu'};
const g=document.createElement('button');g.id='go';g.className='btn';g.textContent='▶ Começar';g.onclick=()=>{sfx('ui');if(CF.g==6&&!clsOk()){openCls();return}start()};f.appendChild(k);f.appendChild(g);pn.appendChild(f);s.appendChild(pn)}
const rar=p=>p<1000?'r0':p<2500?'r1':p<5000?'r2':p<10000?'r3':'r4';
// áudio procedural
let AC,GM,GS,NB,mtt=0,mst=0;const lastS={};
function au(){try{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();GM=AC.createGain();GS=AC.createGain();GM.connect(AC.destination);GS.connect(AC.destination);vol()}if(AC.state=='suspended')AC.resume()}catch(e){}}
function vol(){if(AC){GM.gain.value=S.mute?0:.28;GS.gain.value=S.mute?0:.6}$('snd').textContent=S.mute?'🔇 Som desligado':'🔊 Som ligado'}
function tn(f,d,ty,v,sl,t,g){const o=AC.createOscillator(),a=AC.createGain();t=t||AC.currentTime;o.type=ty;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(25,f+sl),t+d);a.gain.setValueAtTime(v,t);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(a);a.connect(g||GS);o.start(t);o.stop(t+d+.02)}
function ns(d,v,t,g,hp){if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const q=NB.getChannelData(0);for(let i=0;i<q.length;i++)q[i]=R()*2-1}const o=AC.createBufferSource(),a=AC.createGain(),f=AC.createBiquadFilter();o.buffer=NB;f.type=hp?'highpass':'lowpass';f.frequency.value=hp||1200;t=t||AC.currentTime;a.gain.setValueAtTime(v,t);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(f);f.connect(a);a.connect(g||GS);o.start(t);o.stop(t+d)}
function sfx(n){if(!AC||S.mute)return;const now=AC.currentTime,th={shoot:.07,hit:.05,kill:.05,boom:.1,coin:.05}[n];if(th){if(lastS[n]&&now-lastS[n]<th)return;lastS[n]=now}
const arp=(a,ty,v,dd,gap)=>a.forEach((f,i)=>tn(f,dd,ty,v,0,now+i*gap));
switch(n){case'shoot':tn(620,.07,'square',.035,-380);break;case'hit':tn(220,.05,'sawtooth',.04,-100);break;case'kill':ns(.1,.08);tn(160,.1,'triangle',.05,-100);break;case'hurt':tn(140,.3,'sawtooth',.14,-90);ns(.2,.1);break;case'lvl':arp([523,659,784,1047],'triangle',.08,.18,.07);break;case'dash':ns(.2,.1,0,0,2000);tn(300,.2,'sine',.06,400);break;case'boom':ns(.35,.2);tn(80,.3,'sine',.2,-50);break;case'coin':tn(988,.05,'square',.04);tn(1319,.12,'square',.04,0,now+.05);break;case'boss':tn(70,1.2,'sawtooth',.16,-30);tn(105,1.2,'square',.07,-40);ns(.8,.12);break;case'boss2':arp([392,523,659,784,1047],'triangle',.09,.3,.09);break;case'die':arp([330,247,196,147],'sawtooth',.1,.45,.28);break;case'win':arp([523,659,784,1047,1319],'triangle',.1,.4,.12);break;case'ui':tn(700,.05,'square',.04)}}
const SC=[[0,3,5,7,10],[0,2,3,7,8],[0,1,5,7,8],[0,2,5,7,9],[0,3,5,6,10]],RT=[82.4,73.4,69.3,87.3,65.4];
const TB=[[0,2],[1,5],[2,0],[4,1],[5,3]];
function pickSong(play){if(!play)return CALM;if(S.trk)return SG[S.trk-1];if(bossE)return SG[3];return SG[TB[bi][(mst>>7)&1]]}
function mus(t,s,play,g,spb){const i=s%16,bar=(s>>4)%4,rt=g.r*Math.pow(2,g.pg[bar]/12),dr=g.dr,N=k=>g.r*2*Math.pow(2,(g.sc[k%g.sc.length]+g.pg[bar])/12);
if(dr<3){if((dr==0&&i%4==0)||(dr==1&&(i==0||i==10))||(dr==2&&(i%4==0||i==14)))tn(120,.14,'sine',.3,-90,t,GM);
if((dr==1&&(i==4||i==12))||(dr==2&&i==8))ns(.12,.12,t,GM,1500);
if((dr==0&&i%4==2)||(dr==1&&i%2==1)||(dr==2&&i%2==0))ns(.04,.05,t,GM,7000)}
const bs=dr==3?i%8==0:dr==1?(i%3==0||i==10):i%2==0;if(bs)tn(rt,spb*(dr==3?8:1.6),'sawtooth',dr==3?.05:.06,0,t,GM);
const l=g.ld[i];if(l>=0){tn(N(l),spb*1.8,play?'square':'triangle',play?.03:.04,0,t,GM);if(play&&bossE)tn(N(l)*2,spb,'sawtooth',.02,0,t,GM)}
if(i==0)tn(rt*2,spb*16,'sine',.03,0,t,GM)}
setInterval(()=>{if(!AC||AC.state!='running'||S.mute||AUD.auto())return;const play=st=='play'||st=='cards'||st=='pause'||st=='adm';if(mtt<AC.currentTime)mtt=AC.currentTime+.05;while(mtt<AC.currentTime+.25){const g=pickSong(play),spb=60/g.bpm/4;mus(mtt,mst++,play,g,spb);mtt+=spb}},60);
addEventListener('pointerdown',au);addEventListener('keydown',au);
$('snd').onclick=()=>{S.mute=S.mute?0:1;sv();au();vol();sfx('ui')};$('snd').textContent=S.mute?'🔇 Som desligado':'🔊 Som ligado';

// ===== poderes de administrador =====
let TN=[],SH=[],BH=[],fz=0,AP={met:0,st:0,ls:0,la:0};
function nearTo(px,py,mx){let r=null,bd=mx;for(const e of E){if(e.dead)continue;const d=Math.hypot(e.x-px,e.y-py);if(d<bd){bd=d;r=e}}return r}
function bExp(q){if(q.d)return;q.d=1;boom(q.x,q.y,100,Math.max(150,P.dmg*14)*dx,300);emo(q.x,q.y,'💥');ach('e_barril');for(let i=0;i<2;i++)G.push({x:q.x+R()*30-15,y:q.y+R()*30-15,v:2,k:0});if(R()<.25)G.push({x:q.x,y:q.y,v:1,k:1})}
function powers(dt){if(fz>0)fz-=dt;ext(dt);
for(const t of TN){t.a+=dt*1.3;t.life-=dt;t.x=P.x+Math.cos(t.a)*170;t.y=P.y+Math.sin(t.a)*170;
for(const e of E){if(e.dead)continue;const d=Math.hypot(t.x-e.x,t.y-e.y)||1;if(d<240){const k=e.boss?.15:1;e.x+=(t.x-e.x)/d*150*k*dt;e.y+=(t.y-e.y)/d*150*k*dt;if(d<60&&e.oc<=0){e.oc=.2;hit(e,30*dx,t.x,t.y)}}}
t.s-=dt;if(t.s<=0){t.s=.35;const n=nearTo(t.x,t.y,520);SH.push({x:t.x,y:t.y,a:n?Math.atan2(n.y-t.y,n.x-t.x):R()*7,l:2.2,ls:0})}}
TN=TN.filter(t=>t.life>0);
for(const s of SH){s.x+=Math.cos(s.a)*380*dt;s.y+=Math.sin(s.a)*380*dt;s.l-=dt;s.ls-=dt;
if(s.ls<=0){s.ls=.2;const n=nearTo(s.x,s.y,420);if(n){FX.push({beam:1,x:s.x,y:s.y,a:Math.atan2(n.y-s.y,n.x-s.x),w:7,len:Math.hypot(n.x-s.x,n.y-s.y),t:.18,c:'255,70,255'});hit(n,60*dx,s.x,s.y);puff(n.x,n.y,'#ff4dff',6,150)}}
for(const e of E)if(!e.dead&&Math.hypot(e.x-s.x,e.y-s.y)<e.r+14){boom(s.x,s.y,70,80*dx);s.l=0;break}}
SH=SH.filter(s=>s.l>0);
if(AP.met>0){AP.met-=dt;if(R()<dt*14)boom(P.x+R()*600-300,P.y+R()*400-200,80,300*dx)}
if(AP.st>0){AP.st-=dt;if(R()<dt*12){const c=E.filter(e=>!e.dead);if(c.length){const e=c[Math.floor(R()*c.length)];FX.push({x:e.x,y:e.y,x0:e.x,y0:e.y-300,t:.2,bolt:1});hit(e,150*dx,e.x,e.y-50)}}}
if(AP.ls>0){AP.ls-=dt;AP.la+=dt*1.8;for(let k=0;k<4;k++){const a=AP.la+k*PI/2,ux=Math.cos(a),uy=Math.sin(a);for(const e of E){if(e.dead||e.lo>T)continue;const px=e.x-P.x,py=e.y-P.y,pr=px*ux+py*uy;if(pr>0&&pr<700&&Math.abs(px*uy-py*ux)<e.r+22){e.lo=T+.12;hit(e,40*dx,P.x,P.y)}}}}
for(const b of BH){b.life-=dt;for(const e of E){if(e.dead)continue;const dd=Math.hypot(b.x-e.x,b.y-e.y)||1;if(dd<430){const k=e.boss?.2:1;e.x+=(b.x-e.x)/dd*260*k*dt;e.y+=(b.y-e.y)/dd*260*k*dt;if(dd<40+e.r*.3&&e.oc<=0){e.oc=.15;hit(e,e.boss?200:9999,b.x,b.y)}}}}BH=BH.filter(b=>b.life>0)}
function drawPW(){if(CF.g==2){x.strokeStyle='rgba(255,77,94,.7)';x.lineWidth=6;x.setLineDash([18,12]);x.beginPath();x.arc(0,0,650,0,7);x.stroke();x.setLineDash([])}for(const q of BR){if(q.f>=0)gl(q.x,q.y,36,'#ff6a3a',.5+.5*Math.sin(T*40));if(!SPR.at(x,'items','barril_explosivo_2f',T,q.x,q.y+14,.45))x.drawImage(spr('🛢️',64),q.x-15,q.y-15,30,30)}for(const t of TR){gl(t.x,t.y,26,'#ffd45a',.5);if(!SPR.at(x,'fx','torreta_idle_4f',T,t.x,t.y+14,.4))x.drawImage(spr('🔫',64),t.x-14,t.y-14,28,28)}for(const d of DG)if(!SPR.at(x,'fx','cachorro_aliado_andar_6f',T,d.x,d.y+14,.4,P.x<d.x))x.drawImage(spr('🐕',64),d.x-16,d.y-16,32,32);for(const q of POOL){x.fillStyle=q.c+'44';x.beginPath();x.arc(q.x,q.y,q.r,0,7);x.fill();x.strokeStyle=q.c;x.lineWidth=3;x.stroke();for(let i=0;i<5;i++){x.fillStyle=q.c+'99';x.beginPath();x.arc(q.x+Math.sin(T*2+i*2)*q.r*.6,q.y+Math.cos(T*1.6+i*3)*q.r*.5,3+i%3,0,7);x.fill()}}for(const b of BH){x.save();x.translate(b.x,b.y);x.fillStyle='#000';x.beginPath();x.arc(0,0,34,0,7);x.fill();for(let i=0;i<5;i++){x.strokeStyle='rgba(170,90,255,'+(.8-i*.14)+')';x.lineWidth=3;x.beginPath();x.ellipse(0,0,44+i*22,(44+i*22)*.5,T*4-i,0,7);x.stroke()}x.restore()}
if(AP.ls>0)for(let k=0;k<4;k++){x.save();x.translate(P.x,P.y);x.rotate(AP.la+k*PI/2);x.fillStyle='rgba(255,70,255,.5)';x.fillRect(0,-20,700,40);x.fillStyle='rgba(255,255,255,.85)';x.fillRect(0,-5,700,10);x.restore()}
for(const t of TN){x.save();x.translate(t.x,t.y);for(let i=0;i<7;i++){const w=16+i*8;x.strokeStyle='rgba(190,230,255,'+(.85-i*.09)+')';x.lineWidth=3;x.beginPath();x.ellipse(Math.sin(T*8+i)*6,-i*14,w,w*.28,T*3+i,0,7);x.stroke()}x.restore()}
for(const s of SH){x.save();x.translate(s.x,s.y);x.restore();if(!SPR.at(x,'fx','tubarao_voador_6f',T,s.x,s.y,.3,Math.cos(s.a)<0,Math.cos(s.a)<0?s.a+PI:s.a)){x.save();x.translate(s.x,s.y);x.rotate(s.a+PI);x.drawImage(spr('🦈',64),-20,-20,40,40);x.restore()}}}

// ===== gráficos v3 =====
const LVC=9999,BT=['rgba(40,120,60,.07)','rgba(120,60,180,.1)','rgba(60,160,80,.1)','rgba(100,170,255,.1)','rgba(255,140,60,.08)'];
const GP={};function gp(){const gg=SPR.ground(bi);if(gg)return gg;if(!GP[bi]){const K=BI[bi],c=document.createElement('canvas');c.width=c.height=256;const q=c.getContext('2d');q.fillStyle=K[1];q.fillRect(0,0,256,256);
for(let i=0;i<260;i++){q.fillStyle=['rgba(255,255,255,.04)','rgba(0,0,0,.2)',K[2]][i%3];q.beginPath();q.arc(hs(i,bi)%256,hs(bi,i+9)%256,1+hs(i,3)%3,0,7);q.fill()}
q.strokeStyle=K[2];q.lineWidth=1.5;for(let i=0;i<110;i++){const px=hs(i,21)%250,py=hs(21,i)%250,a=-1.3+(hs(i,5)%10)*.07;q.beginPath();q.moveTo(px,py);q.lineTo(px+Math.cos(a)*7,py+Math.sin(a)*7);q.stroke()}
GP[bi]=x.createPattern(c,'repeat')}return GP[bi]}
const GW={};function glw(col){if(!GW[col]){const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d'),g=q.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');q.fillStyle=g;q.fillRect(0,0,64,64);GW[col]=c}return GW[col]}
function gl(px,py,r,col,a){x.globalCompositeOperation='lighter';x.globalAlpha=a;x.imageSmoothingEnabled=true;x.drawImage(glw(col),px-r,py-r,r*2,r*2);x.imageSmoothingEnabled=false;x.globalAlpha=1;x.globalCompositeOperation='source-over'}
let VG=null;function vig(){const w=Math.ceil(W/2),h=Math.ceil(H/2);if(!VG||VG.width!=w||VG.height!=h){VG=document.createElement('canvas');VG.width=w;VG.height=h;const q=VG.getContext('2d'),g=q.createRadialGradient(w/2,h/2,Math.min(w,h)*.35,w/2,h/2,Math.max(w,h)*.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');q.fillStyle=g;q.fillRect(0,0,w,h)}x.imageSmoothingEnabled=true;x.drawImage(VG,0,0,W,H);x.imageSmoothingEnabled=false}
$('qa').onclick=()=>{sfx('ui');openAdm()};

// ===== upgrades supremos e efeitos de skin =====
const UM=Object.fromEntries(U.map(u=>[u[0],u[3]]));
// Cada melhoria ganha um 2º efeito a partir do nível 2 (continua crescendo a cada nível seguinte)
const U2={dmg:q=>{q.bdm=(q.bdm||0)+.08},rate:q=>{q.spd=(q.spd||430)*1.06},multi:(q,l)=>{q.back=Math.floor(l/2)},pierce:q=>{q.pdm=(q.pdm||0)+.08},bounce:q=>{q.br=(q.br||220)+50},crit:q=>{q.cdm=(q.cdm||2)+.25},
mhp:q=>{q.lvh=(q.lvh||0)+.05},regen:q=>{q.rst=(q.rst||0)+.5},spd:q=>{q.mvd=(q.mvd||0)+.06},mag:q=>{q.gh=(q.gh||0)+.15},xp:q=>{if(q===PL[0])rr++},orb:q=>{q.ors=(q.ors||0)+.12;q.orr=(q.orr||0)+6},
aura:q=>{q.burn=(q.burn||0)+1},light:q=>{q.lch=(q.lch||0)+1},exp:q=>{q.exr=(q.exr||0)+.12},vamp:q=>{q.vlow=(q.vlow||0)+.3},shield:q=>{q.shk=(q.shk||0)+1;q.shr=Math.max(4,(q.shr||10)*.9)},dash:q=>{q.dtx=(q.dtx||0)+.15},armor:q=>{q.thn=(q.thn||0)+1}};
const U2D={dmg:'Nv 2+: +8% de dano contra bosses por nível',rate:'Nv 2+: projéteis 6% mais rápidos por nível',multi:'Nv 2+: também atira para trás (um a mais a cada 2 níveis)',pierce:'Nv 2+: +8% de dano a cada inimigo atravessado',bounce:'Nv 2+: o ricochete alcança +50 de distância',crit:'Nv 2+: dano crítico +25% por nível',
mhp:'Nv 2+: cura 5% da vida ao subir de nível',regen:'Nv 2+: parado, regenera +50% a mais por nível',spd:'Nv 2+: +6% de dano enquanto você se move',mag:'Nv 2+: cada cristal coletado cura 0,15 de vida',xp:'Nv 2+: +1 rerrolagem de cartas por nível',orb:'Nv 2+: lâminas giram 12% mais rápido e orbitam 6 mais longe',
aura:'Nv 2+: inimigos pegam fogo e queimam por 2 s',light:'Nv 2+: o raio salta para +1 inimigo próximo',exp:'Nv 2+: explosões com +12% de raio',vamp:'Nv 2+: cura +30% maior com menos de 50% de vida',shield:'Nv 2+: ao absorver um golpe, solta onda de choque; recarga 10% menor',dash:'Nv 2+: dash 15% mais longo e invulnerável',armor:'Nv 2+: ao ser atingido, solta um pulso que fere os inimigos'};
const cut=(p,n)=>{p.mhp=Math.max(30,p.mhp-n);p.hp=Math.min(p.hp,p.mhp)};
const SUP=[['s_fury','Fúria Suprema','Dano ×2,2 e cadência 40% maior. Preço: −40 de vida máxima',1,p=>{p.dmg*=2.2;p.rate*=.6;cut(p,40)},'dmg','rate','🌋'],
['s_rain','Chuva Perfurante','+3 projéteis e perfuração +8. Preço: dano −25%',1,p=>{p.cnt+=3;p.pierce+=8;p.dmg*=.75},'multi','pierce','🌧️'],
['s_sun','Sol Ardente','+5 lâminas e aura gigante. Preço: velocidade −15%',1,p=>{p.orb+=5;p.aura+=12;p.sp*=.85},'orb','aura','☀️'],
['s_storm','Tempestade Apocalíptica','+8 raios e explosões em cadeia. Preço: cadência 25% mais lenta',1,p=>{p.light+=8;p.exp+=6;p.rate*=1.25},'light','exp','🌩️'],
['s_immortal','Imortal','+250 de vida, regeneração e 3 escudos. Preço: dano −20% e velocidade −15%',1,p=>{p.mhp+=250;p.hp+=250;p.regen+=6;p.shM+=3;p.sh+=3;p.dmg*=.8;p.sp*=.85},'mhp','regen','👼'],
['s_wraith','Vulto','Velocidade ×1,4 e dash quase sem recarga. Preço: −50 de vida máxima e dano −20%',1,p=>{p.sp*=1.4;p.dashCd*=.25;cut(p,50);p.dmg*=.8},'spd','dash','🥷'],
['s_eagle','Olho de Águia','+40% de crítico e +5 ricochetes. Preço: cadência 20% mais lenta',1,p=>{p.crit+=.4;p.bounce+=5;p.rate*=1.2},'crit','bounce','🦅'],
['s_sage','Sábio Supremo','XP ×2 e ímã gigante. Preço: dano −20%',1,p=>{p.xpm*=2;p.mag*=3;p.dmg*=.8},'xp','mag','🔮'],
['s_blood','Sede de Sangue','Vampirismo ×10 (cura a cada acerto e abate) e armadura +30%. Preço: −100 de vida máxima',1,p=>{p.vamp=Math.max(p.vamp,1)*10;p.armor+=.3;cut(p,100)},'vamp','armor','🩸']];
SK.push(['ADMIN','#10101a',8,999999]);
const SF={10:['#9fff7a',1],11:['#ffd27a',1],12:['#7ad8ff',1],13:['#c05bff',1],14:['#e8e4d4',1],15:['#ffe9a0',2],16:['#ff3a3a',3],17:['#3fff8a',3],18:['#2de2e6',4],19:['#ffc94a',5],20:['#ff2bd6',6]};
function skfx(c,r,f){const col=f[0],ty=f[1];c.save();c.globalCompositeOperation='lighter';c.globalAlpha=(.55+.25*Math.sin(tm*3))*(ty==1?.55:.9);c.drawImage(glw(col),-r*2.4,-r*2.7,r*4.8,r*4.8);c.globalAlpha=1;
if(ty>=2&&ty<6){const n=ty==5?7:4;for(let i=0;i<n;i++){const a=tm*(ty==5?2.5:1.6)+i/n*PI*2,rr=r*(1.5+.15*Math.sin(tm*4+i));c.fillStyle=ty==5?'#fff2a0':col;c.beginPath();c.arc(Math.cos(a)*rr,Math.sin(a)*rr*.7-r*.3,r*.1,0,7);c.fill()}}
if(ty==3||ty==5)for(let i=-2;i<=2;i++){const h=r*(.6+.35*Math.abs(Math.sin(tm*9+i*1.7)));c.fillStyle=ty==5?'rgba(255,200,60,.8)':col;c.beginPath();c.moveTo(i*r*.3-r*.15,-r*.95);c.quadraticCurveTo(i*r*.3,-r*.95-h,i*r*.3+r*.15,-r*.95);c.fill()}
if(ty==4||ty==5){c.strokeStyle=col;c.lineWidth=r*.07;c.globalAlpha=.8;c.beginPath();c.ellipse(0,r*.95,r*(1.1+.1*Math.sin(tm*5)),r*.35,0,0,7);c.stroke()}
c.restore()}
const GC=document.createElement('canvas'),TC=document.createElement('canvas');GC.width=GC.height=TC.width=TC.height=160;
function glitch(c,px,py,r,sk,a){const g=GC.getContext('2d'),t=TC.getContext('2d'),ph=Math.floor(tm*12);g.clearRect(0,0,160,160);hero(g,80,100,20,sk,a,1);
c.save();c.translate(px,py);c.scale(r/20,r/20);c.translate(-80,-100);
c.globalCompositeOperation='lighter';for(const[col,dx]of[['#ff0040',-4],['#00ffe5',4]]){t.globalCompositeOperation='source-over';t.clearRect(0,0,160,160);t.drawImage(GC,0,0);t.globalCompositeOperation='source-in';t.fillStyle=col;t.fillRect(0,0,160,160);c.globalAlpha=.75;c.drawImage(TC,dx*(hs(ph,1)%3==0?3:1),0)}
c.globalCompositeOperation='source-over';c.globalAlpha=1;
for(let y=0;y<160;y+=8){const o=hs(ph,y)%9==0?(hs(ph,y+3)%21-10):0;c.drawImage(GC,0,y,160,8,o,y,160,8)}
c.fillStyle='#00ffe5';for(let i=0;i<6;i++){const h=hs(ph,i+50);if(h%3==0)c.fillRect(40+h%80,50+(h>>5)%80,4+h%12,2)}
c.fillStyle='#ff0040';for(let i=0;i<4;i++){const h=hs(ph,i+90);if(h%4==0)c.fillRect(30+h%90,50+(h>>6)%80,3,3+h%8)}
c.restore()}
function skinTrail(){const f=SF[S.skin];if(!f||!mv||PA.length>350)return;if(R()<.6)PA.push({x:P.x+R()*10-5,y:P.y+8,vx:R()*30-15,vy:-R()*40,t:.5,c:f[1]==6?(R()<.5?'#00ffe5':'#ff0040'):f[0],r:2+R()*2})}

// ===== novas mecânicas e músicas =====
const SG=[{n:'Sangue Neon',bpm:160,r:110,sc:[0,3,5,7,10,12,15],pg:[0,0,-4,-2],ld:[0,-1,2,-1,3,2,-1,4,5,-1,4,3,2,-1,1,-1],dr:0},
{n:'Noite de Caça',bpm:148,r:98,sc:[0,2,3,5,7,8,10],pg:[0,3,-2,-4],ld:[4,-1,2,4,-1,5,4,2,-1,2,3,-1,5,6,5,-1],dr:0},
{n:'Perseguição',bpm:172,r:87.3,sc:[0,2,3,5,7,8,10],pg:[0,0,-3,-5],ld:[0,2,-1,4,0,-1,5,4,2,-1,0,2,4,-1,6,-1],dr:1},
{n:'Fúria do Boss',bpm:176,r:73.4,sc:[0,1,3,5,7,8,10],pg:[0,1,0,-2],ld:[0,0,1,0,3,-1,1,0,4,-1,3,1,0,-1,1,3],dr:2},
{n:'Último Amanhecer',bpm:140,r:82.4,sc:[0,2,4,7,9,12,14],pg:[0,-3,-5,-7],ld:[0,2,4,-1,5,4,2,-1,4,5,6,-1,5,4,2,1],dr:0},
{n:'Pulso Industrial',bpm:156,r:65.4,sc:[0,3,5,6,7,10,12],pg:[0,0,3,-2],ld:[0,-1,0,3,-1,0,4,-1,2,-1,3,-1,4,5,4,-1],dr:2}];
const CALM={n:'Calmaria',bpm:92,r:82.4,sc:[0,3,5,7,10],pg:[0,-4,-2,-5],ld:[0,-1,-1,2,-1,-1,3,-1,-1,4,-1,-1,2,-1,-1,-1],dr:3};
let POOL=[],PW={fr:0},cmb=0,cmbT=0,ult=0,hz=8;
const cm=()=>1+Math.min(4,Math.floor(cmb/10))*.25;
function fireUlt(){if(st!='play'||ult<100)return;ult=0;ach('e_ult');boom(P.x,P.y,320,P.dmg*14*dx);for(let i=0;i<3;i++)FX.push({x:P.x,y:P.y,r:120+i*90,t:.25+i*.05,ring:1});EB=[];fz=1.5;shake=18;flash=.5;sfx('boss2')}
$('ult').addEventListener('pointerdown',e=>{e.stopPropagation();withP(PL[CO.on&&CO.tr>=0?CO.tr:0],fireUlt)});
function ext(dt){abu(dt);ext2(dt);cmbT-=dt;if(cmbT<=0)cmb=0;PW.fr=Math.max(0,PW.fr-dt);
if(P.dT>0){puff(P.x,P.y,'#4fe0e8',1,30);for(const e of E)if(!e.dead&&e.oc<=0&&Math.hypot(e.x-P.x,e.y-P.y)<e.r+26){e.oc=.25;hit(e,P.dmg*3*dx,P.x,P.y)}}
hz-=dt;if(hz<=0){hz=9+R()*5;hazard()}
for(const q of POOL){q.t-=dt;for(const pq of PL){if(pq.dead||q.s||Math.hypot(pq.x-q.x,pq.y-q.y)>=q.r)continue;if(!god&&pq.dT<=0)pq.hp-=6*dt*MZ[2]*(CF.m==3?Math.max(1,lvl):1);if(pq.hp<=0){P=pq;down();P=PL[0]}}for(const e of E)if(!e.dead&&!e.boss&&Math.hypot(e.x-q.x,e.y-q.y)<q.r){e.hp-=10*dt*(q.s?6:1);if(e.hp<=0)kill(e)}}POOL=POOL.filter(q=>q.t>0)}
function hazard(){if(bi==1||bi==2){POOL.push({x:P.x+R()*400-200,y:P.y+R()*400-200,r:75,t:14,c:bi==2?'#46d65a':'#b45cff'});ban(bi==2?'Poça tóxica!':'Maldição no chão!')}
else if(bi==4){const a=Math.atan2(R()-.5,R()-.5);mkL({x:P.x-Math.cos(a)*400,y:P.y-Math.sin(a)*400},a,900,60,25,1.4);ban('Laser da fábrica!')}
else if(bi==3){for(let i=0;i<7;i++)mkC(P.x+R()*360-180,P.y+R()*360-180,50,25,1+i*.18);ban('Estacas de gelo!')}
else{for(let i=0;i<10;i++){const[a,b]=edge();spawn(3,a,b)}ban('Revoada de morcegos!')}}
const trk=()=>{$('trk').textContent='🎵 '+(S.trk?SG[S.trk-1].n:'Música automática')};
$('trk').onclick=()=>{S.trk=((S.trk||0)+1)%(SG.length+1);mst=0;sv();au();trk();sfx('ui')};trk();

// ===== eventos de admin abuse =====
let AB={fa:0},DG=[];
function emo(px,py,e){if(TX.length<60)TX.push({x:px,y:py,t:.9,s:e,c:'#fff'})}
function mob(n,em,hp,sp,k,xp,ai,el){for(let i=0;i<n;i++){const[a,b]=edge(),e=spawn(k,a,b);if(e){e.em=em;e.hp=e.mh=hp;e.sp=sp;e.xp=xp||1;if(el){e.el=1;e.r=30}}}}
function abu(dt){const A=AB;for(const k of['big','ant','disco','rb','cow','peace','flip','ghost','pin','fw','sing','bomb','dogT','mx','clown'])if(A[k]>0)A[k]-=dt;
A.fa=(A.fa||0)+((A.flip>0?PI:0)-(A.fa||0))*Math.min(1,dt*4);
if(A.big>0){P.r=31;for(const e of E)if(!e.dead&&!e.boss&&e.oc<=0&&Math.hypot(e.x-P.x,e.y-P.y)<e.r+P.r+6){e.oc=.2;hit(e,60*dx,P.x,P.y)}}else P.r=A.ant>0?5:12;
if(A.rb>0)PW.fr=Math.max(PW.fr,.5);
if(A.cow>0&&R()<dt*3.5){const px=P.x+R()*500-250,py=P.y+R()*340-170;boom(px,py,70,200*dx);emo(px,py,'🐄')}
if(A.fw>0&&R()<dt*5){const px=P.x+R()*600-300,py=P.y+R()*400-200;for(const c of['#ff4d5e','#ffd45a','#4fe0e8','#b45cff','#7aff9a'])puff(px,py,c,6,220);FX.push({x:px,y:py,r:80,t:.25,ring:1});for(const e of E)if(!e.dead&&Math.hypot(e.x-px,e.y-py)<90)hit(e,80*dx,px,py);sfx('boom')}
if(A.sing>0&&((A.sg=(A.sg||0)-dt)<=0)){A.sg=.5;boom(P.x,P.y,230,45*dx);FX.push({x:P.x,y:P.y,r:230,t:.25,ring:1});emo(P.x,P.y-30,'🎤')}
if(A.pin>0){for(const e of E)if(!e.dead&&!e.boss){e.x+=(P.x-e.x)*dt*3;e.y+=(P.y-e.y)*dt*3}}else if(A.pinOn){A.pinOn=0;boom(P.x,P.y,260,1e9);for(let i=0;i<30;i++)G.push({x:P.x+R()*80-40,y:P.y+R()*80-40,v:1,k:2,em:'🍬'});emo(P.x,P.y,'🎉');ban('🎉 A piñata estourou!')}
if(A.peace>0&&R()<dt*8)emo(P.x+R()*400-200,P.y+R()*300-150,'💖');
if(A.disco>0){fz=Math.max(fz,.2);if((A.dg=(A.dg||0)-dt)<=0){A.dg=.5;for(const e of E)if(!e.dead)hit(e,25*dx,e.x,e.y+1);emo(P.x+R()*200-100,P.y-40,'🕺')}}
if(A.bomb>0)P.bx=1;else if(A.bOn){A.bOn=0;P.bx=A.ob}
if(A.mxOn&&A.mx<=0){A.mxOn=0;ts=1}
if(A.dogT>0){for(const d of DG){const t=nearTo(d.x,d.y,420)||P,dd=Math.hypot(t.x-d.x,t.y-d.y)||1,sp=t===P?160:340;d.x+=(t.x-d.x)/dd*sp*dt;d.y+=(t.y-d.y)/dd*sp*dt;d.cd-=dt;if(t!==P&&dd<t.r+14&&d.cd<=0){d.cd=.3;hit(t,30*dx,d.x,d.y)}}}else DG=[]}

// ===== painel de admin em 3 telas =====
function catId(n){const U_=['Subir 1 nível','+10 níveis','Todos os upgrades','✨ Todos os upgrades supremos'],C_=['Invencível','Dano ×10','+10.000 moedas','Liberar todas as skins','Pular +1 minuto','Pular +5 minutos','Velocidade do jogo','Mostrar debug','Resetar progresso','🕶️ Skin ADMIN (glitch)','🌌 Trocar bioma','Curar tudo'];return U_.includes(n)?'ag_u':C_.includes(n)?'ag_c':'ag_a'}
function showMenu(){$('amenu').style.display='flex';['u','a','c'].forEach(k=>$('s_'+k).classList.remove('on'))}
['u','a','c'].forEach(k=>{$('m_'+k).onclick=()=>{sfx('ui');$('amenu').style.display='none';$('s_'+k).classList.add('on')};$('b_'+k).onclick=()=>{sfx('ui');showMenu()}});

// ===== v5: entrada (mouse/teclado/controle), modos e mecânicas =====
CF.g=CF.g||0;
const INF=()=>CF.i||CF.g==5||CF.g==6;
const MS={x:0,y:0,on:0,use:0},AIM={m:0,a:0,f:0,pad:0},PD={prev:[],cs:0,cc:null};let PAD=null,lastHit=0,WV={n:0,t:3},cz=20,BR=[],TR=[],MI=null;
function buzz(){try{navigator.vibrate&&navigator.vibrate(40)}catch(e){}try{PAD&&PAD.vibrationActuator&&PAD.vibrationActuator.playEffect('dual-rumble',{duration:120,strongMagnitude:.6,weakMagnitude:.3})}catch(e){}}
function inp(dt){const g=navigator.getGamepads?[...navigator.getGamepads()].find(q=>q&&q.connected):null;PAD=g||null;joy.px=joy.py=0;AIM.m=0;AIM.f=0;AIM.pad=0;
if(MS.use&&st=='play'&&P){AIM.m=1;AIM.f=MS.on;AIM.a=Math.atan2(MS.y-(H/2+(P.y-cam.y)*Z),MS.x-(W/2+(P.x-cam.x)*Z))}
if(g){const ax=i=>Math.abs(g.axes[i])>.22?g.axes[i]:0,b=i=>g.buttons[i]&&g.buttons[i].pressed,pr=i=>b(i)&&!PD.prev[i];
joy.px=ax(0)+(b(15)?1:0)-(b(14)?1:0);joy.py=ax(1)+(b(13)?1:0)-(b(12)?1:0);
const rx=ax(2),ry=ax(3);if(Math.hypot(rx,ry)>.3){AIM.m=1;AIM.pad=1;AIM.a=Math.atan2(ry,rx);AIM.f=1;MS.use=0}
if(st=='play'){if(!CO.on){if(pr(0)||pr(5))dash();if(pr(1)||pr(2)||pr(4))fireUlt()}if(pr(9))$('pz').click()}
else if(st=='pause'){if(pr(0)||pr(9))$('resume').click();if(pr(1))$('quit').click()}
else if(st=='menu'){if(pr(0))$('play').click();if(pr(2))$('shopb').click()}
else if(st=='setup'){if(pr(0))$('go').click();if(pr(1))$('bk').click()}else if(st=='intro'){if(pr(0))$('intro_b').click()}
else if(st=='shop'){if(pr(1))$('sback').click()}else if(st=='ach'){if(pr(1))$('ach_back').click()}else if(st=='hist'){if(pr(1))$('hist_back').click()}
else if(st=='over'){if(pr(0))$('again').click();if(pr(1))$('home').click()}
else if(st=='cards'){const ch=$('cl').children||[];if(PD.cc!==cur){PD.cc=cur;PD.cs=0}if(pr(14)||pr(4))PD.cs=Math.max(0,PD.cs-1);if(pr(15)||pr(5))PD.cs=Math.min(ch.length-1,PD.cs+1);for(let i=0;i<ch.length;i++)ch[i].classList[i==PD.cs?'add':'remove']('sel');if(pr(0)&&ch[PD.cs])ch[PD.cs].click();if(pr(3))$('rr').click()}
PD.prev=g.buttons.map(q=>q.pressed)}
cv.style.cursor=MS.use&&st=='play'?'none':'default'}
cv.addEventListener('pointermove',e=>{if(e.pointerType=='mouse'){MS.use=1;MS.x=e.clientX;MS.y=e.clientY}});
addEventListener('pointerup',e=>{if(e.pointerType=='mouse')MS.on=0});
addEventListener('touchstart',()=>{MS.use=0},{passive:true});
addEventListener('keydown',e=>{const k=e.key;if(k=='Enter'){if(st=='menu')$('play').click();else if(st=='setup')$('go').click();else if(st=='intro')$('intro_b').click();else if(st=='over')$('again').click()}
if(st=='cards'&&'123'.includes(k)){const c=($('cl').children||[])[k-1];c&&c.click()}if(!CO.on){if(k=='e'||k=='E')fireUlt();if(k=='Shift')dash()}});
const CHAOS=()=>AD.filter(([n])=>catId(n)=='ag_a'&&!/Apocalipse|Matar boss|Limpar|Boss|Festa|Evento|Dano|Congelar/.test(n));
function modes(dt){if(CF.g==2&&!bossE&&!E.some(e=>!e.dead)){WV.t-=dt;if(WV.t<=0){WV.n++;WV.t=3;ban('🌊 Onda '+WV.n);PL.forEach(q=>{if(!q.dead)q.hp=Math.min(q.mhp,q.hp+q.mhp*.2)});if(WV.n%3==0)G.push({x:P.x,y:P.y-30,v:1,k:4});if(WV.n%5==0)boss((WV.n/5-1)%4);else ring(8+WV.n*4)}}
if(CF.g==4){cz-=dt;if(cz<=0){cz=20;const a=CHAOS();if(a.length){const v=a[Math.floor(R()*a.length)];CZR=1;v[1]();CZR=0;sfx('boss2')}}}}
function newMi(){const k=Math.floor(R()*3);MI=k==0?{t:'Mate 40 inimigos',g:40,b:kills}:k==1?{t:'Chegue a combo 25',g:25}:{t:'Fique 30s sem dano',g:30};MI.k=k}
const miP=()=>MI.k==0?kills-MI.b:MI.k==1?cmb:T-lastHit;
function ext2(dt){revive(dt);chkT-=dt;if(chkT<=0){chkT=.5;chk()}if(!MI)newMi();if(miP()>=MI.g){G.push({x:P.x,y:P.y-30,v:1,k:4});for(let i=0;i<8;i++)G.push({x:P.x+R()*60-30,y:P.y+R()*60-30,v:1,k:2});ban('✅ Missão cumprida!');sfx('boss2');S.st.missions=(S.st.missions||0)+1;newMi()}
if(BR.length<4+Math.min(3,Math.floor(T/300))&&R()<dt*.3){const a=R()*7,d=220+R()*160;let bx=P.x+Math.cos(a)*d,by=P.y+Math.sin(a)*d;const ne=E.length?E[Math.floor(R()*E.length)]:null;if(ne&&!ne.dead&&!ne.boss&&R()<.6){bx=(bx+ne.x)/2;by=(by+ne.y)/2}BR.push({x:bx,y:by})}
for(const q of BR){if(q.d)continue;if(q.f!==undefined){q.f-=dt;if(q.f<=0){bExp(q);continue}}else for(const b of B){if(b.l<=0)continue;const ax=b.x-q.x,ay=b.y-q.y;if(ax*ax+ay*ay<324){b.l=0;bExp(q);break}}}
cmp(BR,q=>!q.d&&(q.x-P.x)*(q.x-P.x)+(q.y-P.y)*(q.y-P.y)<1e6);
for(const t of TR){t.life-=dt;t.cd-=dt;if(t.cd<=0){const n=nearTo(t.x,t.y,420);if(n){t.cd=.25;const a=Math.atan2(n.y-t.y,n.x-t.x);B.push({x:t.x,y:t.y,vx:Math.cos(a)*430,vy:Math.sin(a)*430,d:P.dmg*dx*.8,c:0,p:0,bn:0,h:[],l:1})}}}
TR=TR.filter(t=>t.life>0)}
function usePW(n){ach('e_item');if(n==0){PW.fr=8;ban('⚡ Frenesi!')}else if(n==1){G.forEach(g=>g.m=1);ban('🧲 Ímã global!')}else if(n==2){boom(P.x,P.y,420,300*dx);flash=.5;ban('💣 Bomba!')}else if(n==3){P.sh+=2;ban('🛡️ Escudo!')}else if(n==4){TR.push({x:P.x,y:P.y,life:20,cd:0});ban('🔫 Torreta!')}else if(n==5){fz=3;ban('⏰ Tempo parado!')}else{AB.ghost=6;ban('⭐ Estrela!')}sfx('boss2')}

// ===== XP difícil e upgrades permanentes de admin =====
const xpNeed=l=>Math.floor((12+l*9+l*l*1.8)*[.85,1.15,1.5,2.2,.3][CF.m]);
const PERM=[['mhp','❤️ Vida base +25',p=>{p.mhp+=25;p.hp+=25}],['dmg','💥 Dano base +10%',p=>p.dmg*=1.1],['rate','⏩ Cadência +8%',p=>p.rate*=.92],['spd','👟 Velocidade +5%',p=>p.sp*=1.05],['mag','🧲 Ímã +20%',p=>p.mag*=1.2],['xpm','📘 XP +10%',p=>p.xpm*=1.1],['armor','🛡️ Armadura +4%',p=>p.armor+=.04],['regen','🩹 Regeneração +0,5',p=>p.regen+=.5],['crit','🎯 Crítico +3%',p=>p.crit+=.03],['coin','💰 Moedas +10%',()=>{}],['cnt','🔱 Projétil extra',p=>p.cnt++],['dash','💨 Dash −5% de recarga',p=>p.dashCd*=.95]];
let PRUN={};
const PINV={mhp:p=>{p.mhp=Math.max(10,p.mhp-25);p.hp=Math.min(p.hp,p.mhp)},dmg:p=>{p.dmg/=1.1},rate:p=>{p.rate/=.92},spd:p=>{p.sp/=1.05},mag:p=>{p.mag/=1.2},xpm:p=>{p.xpm/=1.1},armor:p=>{p.armor=Math.max(0,p.armor-.04)},regen:p=>{p.regen=Math.max(0,p.regen-.5)},crit:p=>{p.crit=Math.max(0,p.crit-.03)},coin:()=>{},cnt:p=>{p.cnt=Math.max(1,p.cnt-1)},dash:p=>{p.dashCd/=.95}};
function applyPerm(){const q=S.perm||{};PRUN={};PERM.forEach(([k,,f])=>{for(let i=0;i<(q[k]||0);i++){f(P);PRUN[k]=(PRUN[k]||0)+1}})}
function zeroPerm(){if(typeof PL!='undefined'&&PL&&PL.length)for(const k in PRUN){const inv=PINV[k];if(inv)for(const q of PL)for(let i=0;i<PRUN[k];i++)inv(q)}PRUN={}}
function permUI(){const g=$('ag_p');g.innerHTML='';PERM.forEach(([k,n,f])=>{const b=document.createElement('button');b.className='btn g s';b.textContent=n+' (nv '+((S.perm&&S.perm[k])||0)+')';b.onclick=()=>{S.perm=S.perm||{};S.perm[k]=(S.perm[k]||0)+1;sv();if(P&&st=='adm'){PL.forEach(q=>f(q));PRUN[k]=(PRUN[k]||0)+1}sfx('coin');permUI()};g.appendChild(b)});
const z=document.createElement('button');z.className='btn g s';z.textContent='🗑️ Zerar permanentes';z.onclick=()=>{S.perm={};sv();zeroPerm();sfx('coin');permUI()};g.appendChild(z)}
permUI();

// ===== eventos sem tempo: só o admin desliga =====
let CZR=0;
function DU(n){return CZR?n:1e9}
function TG(act,off,on){return need(()=>{if(!CZR&&act())off();else on()})}
function stopAll(){for(const k of['big','ant','disco','rb','cow','peace','flip','ghost','fw','sing','bomb','dogT','mx','clown'])AB[k]=0;AB.mxOn=0;ts=1;DG=[];TN=[];SH=[];BH=[];POOL=POOL.filter(q=>!q.s);fz=0;AP.met=AP.st=AP.ls=0;PW.fr=0}
$('stopall').onclick=()=>{if(P)stopAll();sfx('ui')};

// ===== CO-OP LOCAL (2 jogadores): toque, WASD, setas e controle em qualquer combinação =====
let PL=[],CO={on:0,sch:[0,0],nt:0,tl:-1,tr:-1,tj:[null,null],pb:[[],[]]};
CF.co=CF.co||0;CF.c1=CF.c1||0;CF.c2=CF.c2||0;
const J2={on:0,id:-1,x:0,y:0,dx:0,dy:0},JL=[joy,J2],KC={};
const withP=(q,f)=>{if(!q)return;const o=P;P=q;f();P=o};
const tgt=e=>{let b=PL[0],bd=1e9;for(const q of PL){if(q.dead)continue;const d=Math.hypot(q.x-e.x,q.y-e.y);if(d<bd){bd=d;b=q}}return b};
const np=(px,py)=>{let b=PL[0],bd=1e9;for(const q of PL){if(q.dead)continue;const d=Math.hypot(q.x-px,q.y-py);if(d<bd){bd=d;b=q}}return b};
function down(){P.hp=0;P.dead=1;P.dT=0;P.rv=0;if(PL.every(q=>q.dead))end(0);else{ban('💀 Jogador '+(P.id+1)+' caiu! Fique perto para reviver')}}
function revive(dt){for(const q of PL)if(q.dead){const near=PL.some(o=>!o.dead&&Math.hypot(o.x-q.x,o.y-q.y)<60);q.rv=near?(q.rv||0)+dt:Math.max(0,(q.rv||0)-dt);if(q.rv>=3){q.dead=0;q.hp=q.mhp*.5;q.iv=2;q.rv=0;ban('✨ Jogador '+(q.id+1)+' voltou!');ach('e_revive');sfx('boss2')}}}
function setBtn(){const co=CO.on;$('dash').style.display=co&&CO.tr<0?'none':'';$('ult').style.display=co&&CO.tr<0?'none':'';$('dash1').style.display=co&&CO.tl>=0?'flex':'none';$('ult1').style.display=co&&CO.tl>=0?'flex':'none'}
function setCO(){CO.on=1;CO.sch=[CF.c1,CF.c2];if(CO.sch[0]==CO.sch[1]&&CO.sch[0]==1)CO.sch[1]=2;else if(CO.sch[0]==CO.sch[1]&&CO.sch[0]==2)CO.sch[1]=1;
const ts=[0,1].filter(i=>CO.sch[i]==0);CO.nt=ts.length;CO.tj=[null,null];ts.forEach((sl_,k)=>CO.tj[sl_]=k==0?joy:J2);CO.tl=ts.length==2?ts[0]:-1;CO.tr=ts.length?ts[ts.length-1]:-1;CO.pb=[[],[]];setBtn()}
function padIn(i,o){let n=0;for(let k=0;k<i;k++)if(CO.sch[k]==3)n++;const g=(navigator.getGamepads?[...navigator.getGamepads()].filter(q=>q&&q.connected):[])[n];if(!g)return;
const ax=k=>Math.abs(g.axes[k])>.22?g.axes[k]:0,b=k=>g.buttons[k]&&g.buttons[k].pressed,pb=CO.pb[i];
o.mx=ax(0)+(b(15)?1:0)-(b(14)?1:0);o.my=ax(1)+(b(13)?1:0)-(b(12)?1:0);const rx=ax(2),ry=ax(3);if(Math.hypot(rx,ry)>.3){o.am=1;o.aa=Math.atan2(ry,rx);o.af=1}
if((b(0)||b(5))&&!pb[0])dash();if((b(1)||b(2)||b(4))&&!pb[1])fireUlt();pb[0]=b(0)||b(5);pb[1]=b(1)||b(2)||b(4)}
function coIn(i){const sc=CO.sch[i],o={mx:0,my:0,am:0,aa:0,af:0};
if(sc==1){o.mx=(KC.KeyD?1:0)-(KC.KeyA?1:0);o.my=(KC.KeyS?1:0)-(KC.KeyW?1:0)}
else if(sc==2){o.mx=(KC.ArrowRight?1:0)-(KC.ArrowLeft?1:0);o.my=(KC.ArrowDown?1:0)-(KC.ArrowUp?1:0)}
else if(sc==3)padIn(i,o);else{const j=CO.tj[i];if(j){o.mx=j.dx;o.my=j.dy}}
const fl=(AB.fa||0)>1.5?-1:1;o.mx*=fl;o.my*=fl;return o}
function PIN(){if(CO.on)return coIn(P.id);const fl=(AB.fa||0)>1.5?-1:1;return{mx:(joy.dx+joy.kx+(joy.px||0))*fl,my:(joy.dy+joy.ky+(joy.py||0))*fl,am:AIM.m,aa:AIM.a,af:AIM.f}}
function camUpd(dt){const al=PL.filter(q=>!q.dead),a=al.length?al:PL;let cx=0,cy=0;a.forEach(q=>{cx+=q.x;cy+=q.y});cx/=a.length;cy/=a.length;
cam.x+=(cx-cam.x)*Math.min(1,dt*8);cam.y+=(cy-cam.y)*Math.min(1,dt*8);let d=0;
if(PL.length>1){const A=PL[0],B_=PL[1];d=Math.hypot(A.x-B_.x,A.y-B_.y);if(d>700&&!A.dead&&!B_.dead){const k=(d-700)/d*.5,dx=B_.x-A.x,dy=B_.y-A.y;A.x+=dx*k;A.y+=dy*k;B_.x-=dx*k;B_.y-=dy*k}}
if(CF.g==2)for(const q of PL){const r_=Math.hypot(q.x,q.y);if(r_>640){q.x*=640/r_;q.y*=640/r_}}
const tz=PL.length>1?Math.min(1,Math.max(.6,520/(d+300))):1;ZM+=(tz-ZM)*Math.min(1,dt*3);Z=ZB*ZM}
function drawPlayer(){const q=P;if(q.dead){if(!SPR.at(x,'fx','lapide_4f',T,q.x,q.y+14,.45))x.drawImage(spr('🪦',64),q.x-16,q.y-18,32,32);if(q.rv>0){x.strokeStyle='#7aff9a';x.lineWidth=4;x.beginPath();x.arc(q.x,q.y,26,-PI/2,-PI/2+q.rv/3*PI*2);x.stroke()}x.fillStyle='#fff';x.font='700 11px Nunito';x.textAlign='center';x.fillText('Reviver',q.x,q.y+34);return}
gl(q.x,q.y,120,'#ffd9a0',.25);if(PW.fr>0)gl(q.x,q.y,80,'#ff8a2a',.7);
if(PL.length>1){const c=q.id?'#4fe0e8':'#ffb340';x.strokeStyle=c;x.lineWidth=3;x.beginPath();x.ellipse(q.x,q.y+14,18,7,0,0,7);x.stroke();}const _d=!q.id&&_f&&_f.on;x.fillStyle=q.id?'#7af0f7':_d?'#ff2a2a':'#ffd27a';x.font=(_d?'700 13px':'700 11px')+' Nunito';x.textAlign='center';x.lineWidth=_d?5:3;x.strokeStyle=_d?'#000':'rgba(0,0,0,.75)';x.lineJoin='round';x.strokeText(nickOf(q.id),q.x,q.y-28);x.fillText(nickOf(q.id),q.x,q.y-28);
x.globalAlpha=AB.ghost>0?.3:q.iv>0?.55:1;hero(x,q.x,q.y,15*(AB.big>0?2.6:AB.ant>0?.45:1),SK[q.sk!=null?q.sk:S.skin],q.a,0,q);x.globalAlpha=1;
if(q.sh>0){x.strokeStyle='rgba(79,224,232,.8)';x.lineWidth=2;x.beginPath();x.arc(q.x,q.y,q.r+6,0,7);x.stroke()}
for(let i=0;i<q.orb;i++){const a=q.oa+i/q.orb*PI*2;x.fillStyle='#d8e4ff';x.save();x.translate(q.x+Math.cos(a)*(52+(q.orr||0)),q.y+Math.sin(a)*(52+(q.orr||0)));x.rotate(a*3);x.fillRect(-9,-3,18,6);x.restore()}}
cv.addEventListener('pointerdown',e=>{if(!CO.on||st!='play'||e.pointerType=='mouse'||!CO.nt)return;const j=CO.nt==2?(e.clientX<W/2?joy:J2):joy;if(j.on)return;j.on=1;j.id=e.pointerId;j.x=e.clientX;j.y=e.clientY;try{cv.setPointerCapture(e.pointerId)}catch(_){}});
cv.addEventListener('pointermove',e=>{for(const j of JL){if(!j.on||j.id!=e.pointerId)continue;let a=(e.clientX-j.x)/50,b=(e.clientY-j.y)/50;const l=Math.hypot(a,b);if(l>1){a/=l;b/=l;j.x=e.clientX-a*50;j.y=e.clientY-b*50}j.dx=a;j.dy=b}});
const up2=e=>{for(const j of JL)if(j.id==e.pointerId){j.on=0;j.dx=j.dy=0;j.id=-1}};cv.addEventListener('pointerup',up2);cv.addEventListener('pointercancel',up2);
$('dash1').addEventListener('pointerdown',e=>{e.stopPropagation();withP(PL[CO.tl],dash)});$('ult1').addEventListener('pointerdown',e=>{e.stopPropagation();withP(PL[CO.tl],fireUlt)});
addEventListener('keydown',e=>{KC[e.code]=1;if(!CO.on||st!='play'||e.repeat)return;for(let i=0;i<2;i++){const sc=CO.sch[i],q=PL[i];if(!q)continue;if((sc==1&&e.code=='Space')||(sc==2&&e.code=='Enter'))withP(q,dash);if((sc==1&&e.code=='KeyQ')||(sc==2&&e.code=='Slash'))withP(q,fireUlt)}});
addEventListener('keyup',e=>{KC[e.code]=0});addEventListener('blur',()=>{for(const k in KC)KC[k]=0});
// lobby de jogadores
const CTL=['📱<b>Toque</b>','⌨️<b>WASD</b>','⌨️<b>Setas</b>','🎮<b>Controle</b>'];
function fixCtl(){if(CF.c1==CF.c2&&CF.c1==1)CF.c2=2;else if(CF.c1==CF.c2&&CF.c1==2)CF.c2=1}
function players(pn){const d=document.createElement('div');d.className='sec';d.innerHTML='<div class="lbl">Jogadores</div>';const sg=document.createElement('div');sg.className='seg';
['👤<b>Solo</b>','👥<b>Co-op local</b>'].forEach((a,i)=>{const b=document.createElement('button');b.className='opt'+((CF.co||0)==i?' on':'');b.innerHTML=a;b.onclick=()=>{CF.co=i;S.cf=CF;sv();sfx('ui');setupUI()};sg.appendChild(b)});d.appendChild(sg);
if(CF.co){const pc=document.createElement('div');pc.className='pcs';for(let k=0;k<2;k++){const key=k?'c2':'c1',sk_=k&&CF.s2!=null?CF.s2:S.skin,c=document.createElement('div');c.className='pc p'+k;
const av=document.createElement('canvas');av.width=av.height=96;av.className='av';hero(av.getContext('2d'),48,56,20,SK[sk_],.6);c.appendChild(av);
const m=document.createElement('div');m.className='pm';m.innerHTML='<div class="pt">Jogador '+(k+1)+'</div>';{const ni=document.createElement('input');ni.className='ni';ni.maxLength=14;ni.placeholder='Nick';ni.value=k?(S.nick2||''):(S.nick||'');ni.oninput=()=>{const v=cleanNick(ni.value);if(k)S.nick2=v;else S.nick=v;sv();if(!k)_dvChk(v)};ni.addEventListener('keydown',e=>e.stopPropagation());m.appendChild(ni)}const r=document.createElement('div');r.className='cs';
CTL.forEach((a,i)=>{const b=document.createElement('button');b.className='opt s'+((CF[key]||0)==i?' on':'');b.innerHTML=a;b.onclick=()=>{CF[key]=i;fixCtl();S.cf=CF;sv();sfx('ui');setupUI()};r.appendChild(b)});m.appendChild(r);
if(k){const b=document.createElement('button');b.className='btn g s';b.textContent='Skin: '+SK[sk_][0]+' ▶';b.onclick=()=>{const o=S.own,cu=o.indexOf(sk_);CF.s2=o[(cu+1)%o.length];S.cf=CF;sv();sfx('ui');setupUI()};m.appendChild(b)}
c.appendChild(m);pc.appendChild(c)}d.appendChild(pc);const h=document.createElement('div');h.className='desc';h.textContent='WASD: Espaço dash, Q ultimate · Setas: Enter dash, / ultimate · Controle: A dash, B ultimate · Toque: botões na tela';d.appendChild(h)}pn.appendChild(d)}
// fundo animado do menu
{const f=document.createElement('div');f.className='fl';['🧟','🔫','💀','🔥','👻','🦇','💣','🐺','⚡','🦠','☠️','🧙'].forEach((e,i)=>{const sp=document.createElement('span');sp.textContent=e;sp.style.left=(i*8.5+2)+'%';sp.style.animationDelay=(-i*1.3)+'s';sp.style.animationDuration=(12+i%5*3)+'s';f.appendChild(sp)});if($('menu').prepend)$('menu').prepend(f)}

// ===== dificuldades, modos e apresentação =====
const MN=['🏆 Clássico','⚡ Rápido','🌊 Ondas','🥂 Vidro','🌀 Caos','👑 Boss Rush','🎓 Classes']; const DDESC=['Mobs mais fracos (vida ×0,75, dano ×0,6). Seu dano ×1,25, XP ×1,3 e moedas ×1,2.','Equilíbrio padrão: tudo ×1.','Mobs mais fortes (vida ×1,5, dano ×1,4) e mais numerosos. Seu dano ×0,9 e XP ×0,85. Moedas ×1,6.','Mobs com vida ×2,3 e dano ×1,9 — e o dano deles é multiplicado pelo seu nível. Seu dano ×0,8, XP ×0,7. Moedas ×2,5.','👶 Hiperativo e super fácil: você é rápido, atira 2× mais e causa 4× dano; mobs quase inofensivos. Só nos modos Rápido ou Infinito.'];
const MINFO=[['🏆','Clássico','Sobreviva 20 minutos enfrentando eventos, hordas e 4 bosses até o amanhecer.'],['⚡','Rápido','Tudo acontece no dobro da velocidade: 10 minutos, bosses mais cedo e você ganha um pouco de velocidade.'],['🌊','Ondas','Fique dentro da arena. Elimine cada onda inteira para liberar a próxima. Você cura entre as ondas, ganha baú a cada 3 e enfrenta um boss a cada 5.'],['🥂','Vidro','Só 30 de vida, mas você causa 3× mais dano e tem muito mais crítico. Qualquer erro dói.'],['🌀','Caos','A cada 20 segundos acontece um evento maluco: tornados, vacas, discoteca, gravidade e muito mais.'],['👑','Boss Rush','Um boss atrás do outro, em um bioma diferente a cada vitória. Você recupera toda a vida depois de cada um.'],['🎓','Classes','Você já começa com as 6 melhorias da sua classe no nível máximo e com as 2 supremas ativas. Não há cartas de upgrade durante a partida, nem de boss. Também não há hora marcada para bosses: a cada 20 segundos há 50% de chance de um surgir, e podem vir vários ao mesmo tempo. Dura até você cair.']];
function diffP(){P.dmg*=MZ[5];if(CF.m==4){P.rate*=.5;P.sp*=1.25;P.mhp*=3;P.hp=P.mhp;P.regen+=2}if(CF.g==1)P.sp*=1.12;if(CF.g==3)P.crit+=.25}
function fixCF(){if(CF.g==6&&CF.m!=2&&CF.m!=3)CF.m=2;if(CF.m==4&&!(CF.g==1||CF.i))CF.m=1}
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const _z3=6e8+60601456;const cleanNick=v=>String(v).replace(/[^\p{L}\p{N} _.\-]/gu,'').slice(0,14);
const nickOf=i=>i?(S.nick2||'Jogador 2'):(_f&&_f.on?'Dev':(S.nick||'Jogador'));const _nm=i=>(!i&&_f&&_f.on)?'<span class="dv">Dev</span>':esc(nickOf(i));
function showIntro(){const m=MINFO[CF.g||0],cn=['Toque','WASD','Setas','Controle'];$('intro_e').innerHTML=SPR.ui(['modo_classico','modo_rapido','modo_ondas','modo_vidro','modo_caos','modo_boss_rush','suprema_furia'][CF.g||0],'big');$('intro_n').textContent='Modo '+m[1];
let t=m[2];if(CF.i)t+=' ♾️ Modo infinito: a partida não termina, os bosses se repetem e o bioma muda a cada vitória.';$('intro_d').textContent=t;
const c=$('intro_c');c.innerHTML='';[['😊😐😠💀👶'[CF.m*2]||'⭐',MD[CF.m][0]],['🗺️',BI[CF.b][0]],[WP[CF.w][1],WP[CF.w][0]],...(CF.co?[['👥',cn[CF.c1]+' + '+cn[CF.c2]]]:[])].forEach(([a,b])=>{const e=document.createElement('span');e.className='chip';e.textContent=a+' '+b;c.appendChild(e)});
$('intro_g').textContent=DDESC[CF.m]+(CF.m==3?' (dano = base × nível)':'');show('intro')}
function beginGame(){hide('intro');if(st!='intro')return;st='play';ban('Boa sorte, '+nickOf(0)+'!')}
$('intro_b').onclick=beginGame;$('intro').addEventListener('click',e=>{if(e.target===$('intro'))beginGame()});
{const n=$('nick');n.value=S.nick||'';n.oninput=()=>{const v=cleanNick(n.value);if(v!==n.value)n.value=v;S.nick=v;sv();_dvChk(v)};n.addEventListener('keydown',e=>e.stopPropagation())}

// ===== CONQUISTAS (100) e HISTÓRICO =====
S.ach=S.ach||{};S.st=S.st||{};S.hist=S.hist||[];S.wg=S.wg||{};S.wd=S.wd||{};S.bb=S.bb||{};
let RUN={boss:0,bio:{},hit:0,mc:0},chkT=0;const SCH={nx:0,chg:0,baby:0,inf:0,w:{},zt:0};
const gs=k=>S.st[k]||0,inR=()=>!!P&&['play','cards','over','intro','pause','adm','devi'].includes(st);
const ACH=[];
const GR=(pre,names,vals,lo,hi,df,tf)=>vals.forEach((v,i)=>ACH.push({id:pre+'_'+v,n:names[i],d:df(v),r:lo+(hi-lo)*(vals.length>1?i/(vals.length-1):0),f:()=>tf(v)}));
const A1=(id,n,d,r,f,sec)=>ACH.push({id,n,d,r,f,s:!!sec});
GR('k',['Primeiro sangue','Dedo ágil','Centurião','Massacre','Exterminador','Apocalipse Zumbi'],[10,50,100,250,500,1000],1,7,v=>'Derrote '+v+' inimigos em uma única partida.',v=>inR()&&kills>=v);
GR('kt',['Caçador de monstros','Veterano de guerra','Lenda viva','Flagelo do caos'],[100,1000,5000,20000],2,9,v=>'Derrote '+v.toLocaleString('pt-BR')+' inimigos no total.',v=>gs('kills')+(inR()&&st!='over'?kills:0)>=v);
GR('tm',['Aquecendo','Pegando o ritmo','Cinco minutos de pânico','Fôlego de gato','Meia-vida','Maratonista','Amanheceu!'],[1,3,5,8,10,15,20],1,8,v=>'Sobreviva '+v+' minuto'+(v>1?'s':'')+' em uma partida.',v=>inR()&&T>=v*60);
GR('lv',['Subiu!','Pegando o jeito','Dez de dez','Poderoso','Quase lá','Nível máximo'],[2,5,10,15,20,30],1,9,v=>'Chegue ao nível '+v+'.',v=>inR()&&lvl>=v);
GR('cb',['Embalo','Sequência','Imparável','Tsunami','Máquina de combos'],[5,15,30,60,100],2,8,v=>'Faça um combo de '+v+' abates.',v=>RUN.mc>=v);
GR('gm',['Bem-vindo!','Viciando','Rotina','Habitué','Sem vida social'],[1,5,10,25,100],1,8,v=>'Jogue '+v+' partida'+(v>1?'s':'')+'.',v=>gs('games')>=v);
GR('wn',['Primeira vitória','Vencedor','Campeão','Lenda do amanhecer'],[1,3,5,10],3,9,v=>'Vença '+v+' partida'+(v>1?'s':'')+'.',v=>gs('wins')>=v);
GR('bs',['Caçador de chefes','Matador de gigantes','Terror dos bosses','Genocida de chefões'],[1,5,15,50],2,9,v=>'Derrote '+v+' boss'+(v>1?'es':'')+' no total.',v=>gs('bosses')>=v);
GR('br',['Dupla de ouro','Chefes demais','Rush total'],[2,4,8],4,9,v=>'Derrote '+v+' bosses em uma única partida.',v=>RUN.boss>=v);
GR('cn',['Trocados','Cofrinho','Magnata'],[500,5000,50000],2,8,v=>'Ganhe '+v.toLocaleString('pt-BR')+' moedas no total.',v=>gs('coins')>=v);
GR('ms',['Missão dada','Agente','Mercenário'],[1,10,40],2,8,v=>'Cumpra '+v+' missão'+(v>1?'ões':'')+' durante as partidas.',v=>gs('missions')>=v);
GR('sk',['Visual novo','Guarda-roupa','Fashionista','Colecionador total'],[2,6,12,20],2,9,v=>'Tenha '+v+' skins.',v=>S.own.filter(i=>i!=20).length>=v);
GR('wv',['Primeiras ondas','Surfista','Rei das ondas'],[5,10,20],3,9,v=>'Chegue à onda '+v+' no modo Ondas.',v=>CF.g==2&&inR()&&WV.n>=v);
[['Vitória Clássica',0,'Clássico',3],['Relâmpago',1,'Rápido',5],['Vidraça de aço',3,'Vidro',8],['Domador do caos',4,'Caos',7]].forEach(([n,g,m,r])=>A1('gw'+g,n,'Vença uma partida no modo '+m+'.',r,()=>!!S.wg[g]));
A1('gw5','Rei do Rush','Derrote 4 bosses em uma partida do modo Boss Rush.',7,()=>CF.g==5&&RUN.boss>=4);
[['Moleza',0,'Fácil',2],['Na medida',1,'Médio',3.5],['Sem dó',2,'Difícil',6.5],['Sobrevivente do Pesadelo',3,'Pesadelo',9.4],['Bebê campeão',4,'Baby',2.5]].forEach(([n,m,d,r])=>A1('df'+m,n,'Vença uma partida na dificuldade '+d+'.',r,()=>!!S.wd[m]));
['Floresta Maldita','Cemitério Sombrio','Pântano Tóxico','Ruínas Geladas','Fábrica Abandonada'].forEach((b,i)=>A1('bi'+i,'Senhor: '+b,'Derrote um boss no bioma '+b+'.',3+i*.8,()=>!!S.bb[i]));
A1('g_dev','Assassino de Deuses','Derrote o boss DEV: Clássico ou Rápido, modo infinito, pistola e dificuldade Baby, Difícil ou Pesadelo, após 9.999 abates.',10,null,1);A1('co1','Dupla dinâmica','Jogue uma partida em co-op local.',2,()=>gs('coop')>=1);
A1('co2','Time perfeito','Vença uma partida em co-op local.',7,()=>gs('coopw')>=1);
A1('e_revive','Ressuscitador','Reviva seu parceiro no co-op.',3.5,null);
A1('up1','Maximizado','Deixe uma melhoria no nível máximo.',3.5,()=>inR()&&U.some(u=>(P.lv[u[0]]||0)>=u[3]));
A1('up2','Supremo!','Pegue uma melhoria suprema.',5,()=>inR()&&SUP.some(u=>P.lv[u[0]]));
A1('up3','Panteão supremo','Pegue todas as melhorias supremas.',8.5,()=>inR()&&SUP.every(u=>P.lv[u[0]]));
A1('up4','Arsenal completo','Deixe TODAS as melhorias e supremas no máximo.',9,()=>inR()&&maxed());
A1('e_item','Que item é esse?','Use um item que cai dos inimigos.',1.5,null);
A1('e_bau','Abre-te, sésamo','Abra um baú.',2,null);
A1('e_barril','Barril explosivo','Exploda um barril atirando nele.',2,null);
A1('e_dash','Zoom!','Use o dash.',1,null);
A1('e_ult','Poder máximo','Solte o ultimate.',2,null);
A1('u_play','Sem fim','Comece uma partida no modo infinito.',2.5,null);
A1('u_3','Viajante de biomas','Derrote 3 bosses no modo infinito.',6,()=>CF.i&&RUN.boss>=3);
A1('u_30','Maratonista infinito','Sobreviva 30 minutos no modo infinito.',9,()=>CF.i&&inR()&&T>=1800);
A1('v_gold','Colecionador de ouro','Ganhe 500 moedas em uma única partida.',5.5,()=>inR()&&earned>=500);
A1('v_baby','Bebê gigante','Derrote 500 inimigos em uma partida Baby.',4,()=>CF.m==4&&inR()&&kills>=500,1);
A1('v_duo','Duo dinâmico','Sobreviva 10 minutos no co-op.',6,()=>PL.length>1&&inR()&&T>=600,1);
A1('v_int','Intocável','???',8,()=>inR()&&T>=300&&!RUN.hit,1);
A1('v_pes','Veterano do Pesadelo','???',9.2,()=>CF.m==3&&inR()&&lvl>=10,1);
A1('s_indeciso','Indeciso','Troque de modo de jogo 15 vezes na tela de preparação.',8.6,null,1);
A1('s_ordem','Fã de ordem','Escolha os 6 modos de jogo em ordem, do primeiro ao último.',9.1,null,1);
A1('s_baby','Mãos de bebê','Insista no botão Baby bloqueado.',8.7,null,1);
A1('s_inter','Interruptor','Ligue e desligue o modo infinito 10 vezes.',8.8,null,1);
A1('s_armeiro','Armeiro','Clique em todas as armas iniciais.',8.9,null,1);
A1('s_konami','Código antigo','↑ ↑ ↓ ↓ ← → ← → B A',9.6,null,1);
A1('s_maso','Masoquista','Comece uma partida no modo Vidro com dificuldade Pesadelo.',9.7,null,1);
A1('s_zen','Zen','Fique 1 minuto parado na tela de preparação.',9.8,null,1);
const ACM=Object.fromEntries(ACH.map(a=>[a.id,a])),ACS=[...ACH].sort((a,b)=>a.r-b.r);
const rl=a=>a.r>=10?['ad','Administrador']:a.s?['sc','Secreta']:a.r<3?['e1','Fácil']:a.r<5.5?['e2','Média']:a.r<8?['e3','Difícil']:['e4','Extrema'];
function ach(id){if(S.ach[id])return;const a=ACM[id];if(!a)return;S.ach[id]=Date.now();sv();toast(a)}
function chk(){for(const a of ACH)if(a.f&&!S.ach[a.id]&&a.f())ach(a.id)}
const TQ=[];let tb=0;
function toast(a){TQ.push(a);if(!tb)nextToast()}
function nextToast(){const a=TQ.shift();if(!a){tb=0;return}tb=1;const d=document.createElement('div');d.className='tt'+(a.r>=10?' ad':'');d.innerHTML='<i>🏆</i><div><b>'+(a.r>=10?'Conquista nível Administrador':'Conquista desbloqueada')+'</b><span>'+esc(a.n)+'</span></div>';$('toast').appendChild(d);sfx('lvl');setTimeout(()=>{if(d.remove)d.remove();nextToast()},3300)}
function bossDown(){RUN.boss++;RUN.bio[bi]=1;S.st.bosses=gs('bosses')+1;S.bb[bi]=1;chk()}
function recordEnd(win,c,t){const q=S.st;q.games=gs('games')+1;q.kills=gs('kills')+kills;q.coins=gs('coins')+c;if(win){q.wins=gs('wins')+1;S.wg[CF.g||0]=1;S.wd[CF.m]=1;if(CF.co)q.coopw=gs('coopw')+1}if(CF.co)q.coop=gs('coop')+1;
S.hist.unshift({d:Date.now(),g:CF.g||0,m:CF.m,i:CF.i?1:0,co:CF.co?1:0,b:CF.b,t,k:kills,l:lvl,v:win?1:0});S.hist=S.hist.slice(0,300);chk()}
function secHook(k,i){if(k=='g'){if(CF.g!=i)SCH.chg++;if(SCH.chg>=15)ach('s_indeciso');SCH.nx=(i==SCH.nx)?SCH.nx+1:(i==0?1:0);if(SCH.nx>=6)ach('s_ordem')}
else if(k=='baby'){if(++SCH.baby>=5)ach('s_baby')}else if(k=='inf'){if(++SCH.inf>=10)ach('s_inter')}else if(k=='w'){SCH.w[i]=1;if(Object.keys(SCH.w).length>=5)ach('s_armeiro')}}
{const K=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];let kp=0;addEventListener('keydown',e=>{if(!['menu','setup','ach','hist','shop'].includes(st))return;kp=e.code==K[kp]?kp+1:(e.code==K[0]?1:0);if(kp==K.length){kp=0;ach('s_konami')}})}
setInterval(()=>{if(st=='setup'){if(++SCH.zt>=60)ach('s_zen')}else SCH.zt=0},1000);
let achF=0;
function achUI(f){achF=f==null?achF:f;const l=$('ach_l');l.innerHTML='';const n=Object.keys(S.ach).filter(k=>ACM[k]).length;$('ach_c').textContent=n+' / '+ACH.length;$('ach_b').style.width=n/ACH.length*100+'%';
ACS.filter(a=>achF==1?S.ach[a.id]:achF==2?!S.ach[a.id]:1).forEach(a=>{const u=S.ach[a.id],h=a.s&&!u,r=rl(a),d=document.createElement('div');d.className='ac '+r[0]+(u?' on':'')+(h?' sec':'');
d.innerHTML='<div class="ai">'+(u?'🏆':h?'🔒':'🎖️')+'</div><div class="at"><b>'+(h?'???':esc(a.n))+'</b><span>'+(h?(a.r>=10?'Conquista nível Administrador. Só os melhores descobrem como.':'Conquista secreta — descubra como desbloquear.'):esc(a.d))+'</span></div><div class="ar">'+(u?'✔':r[1])+'</div>';l.appendChild(d)})}
function histUI(){const l=$('hist_l');l.innerHTML='';const H=S.hist,tt=H.reduce((a,h)=>a+h.t,0);$('hist_s').textContent=H.length?H.length+' partida'+(H.length>1?'s':'')+' · melhor tempo '+fmt(S.best)+' · '+Math.floor(tt/60)+' min jogados':'Nenhuma partida ainda. Vá jogar!';
H.forEach(h=>{const d=document.createElement('div');d.className='hi'+(h.v?' win':'');const dt=new Date(h.d).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
d.innerHTML='<div><b>'+MN[h.g]+(h.i?' ♾️':'')+(h.co?' 👥':'')+'</b><span>'+MD[h.m][0]+' · '+BI[h.b][0]+'<br>'+dt+' · Nível '+h.l+' · '+h.k+' abates'+(h.s?' · '+h.s.toLocaleString('pt-BR')+' pts':'')+' · '+(h.v?'✅ Vitória':'💀 Derrota')+'</span></div><div class="ht">'+fmt(h.t)+'<small>sobrevivido</small></div>';l.appendChild(d)})}
const toMenu2=()=>{['ach','hist'].forEach(hide);show('menu');st='menu';ref()};
$('achb').onclick=()=>{hide('menu');show('ach');st='ach';achUI(0);sfx('ui')};$('histb').onclick=()=>{hide('menu');show('hist');st='hist';histUI();sfx('ui')};
$('ach_back').onclick=toMenu2;$('hist_back').onclick=toMenu2;
document.querySelectorAll&&document.querySelectorAll('#ach .tabs .opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('#ach .tabs .opt').forEach(o=>o.classList.remove('on'));b.classList.add('on');achUI(+b.dataset.f);sfx('ui')});
let hc=0;$('hist_clear').onclick=()=>{if(!hc){hc=1;$('hist_clear').textContent='⚠️ Confirmar';setTimeout(()=>{hc=0;$('hist_clear').textContent='🗑️ Limpar'},2500);return}S.hist=[];sv();hc=0;$('hist_clear').textContent='🗑️ Limpar';histUI()};
chk();

ref();

// botões sem emoji (visual pixel limpo)
typeof MutationObserver!='undefined'&&(()=>{const re=/^[\s\p{Extended_Pictographic}\uFE0F\u200D▶⏸←]+/u,cl=b=>{const n=b.firstChild;if(n&&n.nodeType==3&&re.test(n.nodeValue)){const v=n.nodeValue.replace(re,'');if(v)n.nodeValue=v}};
const ob=new MutationObserver(ms=>{for(const m of ms){const el=m.target.nodeType==3?m.target.parentElement:m.target;const b=el&&el.closest&&el.closest('button.btn');if(b)cl(b)}});
for(const id of ['menu','setup','pause','over','shop','ach','hist','adm','cards','intro'])ob.observe($(id),{childList:true,subtree:true,characterData:true});
document.querySelectorAll('button.btn').forEach(cl)})();

// ---- modo dev (fragmentos espalhados; nada em texto puro) ----
const _z2=0x2b7e1516,_z4=3e9+658726323,_g=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return(h^_z2)>>>0};
function _vk(v){return typeof v=='string'&&v.length===3*3&&_y(v)===_z3&&_g(v)===_z4}
var _f={on:0,g:0};
function _dvChk(v){const m=_vk(v);if(m&&!_f.on){_f.on=1;if(!adm){adm=1;_f.g=1}$('qa').style.display='block'}else if(!m&&_f.on){_f.on=0;if(_f.g){adm=0;_f.g=0;$('qa').style.display='none'}}}
_dvChk(S.nick||'');

DDESC.forEach((s,i)=>{DDESC[i]=s+' Bosses: dano ×'+String(MD[i][7]).replace('.',',')+'.'});
