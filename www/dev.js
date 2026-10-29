/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
/* ©criado por Vitor Ag/Nyx - 2026 */
// ===== BOSS SECRETO: DEV =====
// Gatilho: Clássico/Rápido + infinito + pistola + dificuldade Baby/Difícil/Pesadelo, ao chegar em 9.999 abates.
// Luta em 5 biomas (um por vez, a partir do bioma atual) x 3 barras de vida = 15 barras. Em cada bioma as barras
// têm 1x, 2x e 4x a vida; cada bioma novo tem 20% mais vida. Ele mantém todas as mecânicas e ganha mini mecânicas aos poucos.
// Todos os golpes dele são "hit kill" (105% da vida máxima, antes da armadura): escudos absorvem o golpe inteiro;
// armadura e vampirismo permitem aguentar de 3 a 5 acertos.
const DV={done:0,e:null,sh:[],bl:null,hole:null,las:null,frz:0,q:[]};
// frases de entrada (sorteadas): 10 para Baby, 5 para Difícil, 5 para Pesadelo
const DVT=[
'9.999 kills no Baby? Você conseguiu transformar covardia em estatística.',
'Tu passou horas no modo mais fácil do jogo e ainda teve coragem de chegar até mim achando que merece respeito?',
'Olha só… o rei do berçário chegou. Matou 9.999 inimigos que quase pedem desculpa antes de atacar.',
'Baby, pistola e infinito. Você literalmente montou a run mais frouxa possível e ainda acha que fez alguma coisa.',
'Você não é bom. O jogo só reduziu tanto a dificuldade que até você conseguiu parecer competente.',
'9.999 monstros mortos e nenhum deles conseguiu te ensinar a ter vergonha na cara.',
'Eu devia ganhar uma conquista por ter esperado você terminar essa porcaria de passeio infantil.',
'Você passou horas fingindo que era forte. Eu precisei de um segundo pra provar o contrário.',
'Vai, tenta desviar. Quero ver quanto tempo dura essa confiança de quem passou a run inteira batendo em saco de pancada.',
'Sabe qual é a diferença entre você e os 9.999 monstros que matou? Eles pelo menos não escolheram o Baby.'];
const DVH=[
'Difícil? Finalmente você parou de jogar com rodinha. Pena que ainda não aprendeu a pedalar.',
'Você matou 9.999 monstros pra chegar até aqui. Eu vou matar você só pra mostrar o quanto isso não significou porra nenhuma.',
'Boa build. Boa run. Bom tempo. Agora assiste tudo virar lixo porque eu quis.',
'Você acha que chegou longe porque joga bem. Eu acho que chegou longe porque eu deixei.',
'Pode ficar orgulhoso das 9.999 kills. Vai ser a única coisa que sobra quando eu apagar essa run.'];
const DVN=[
'9.999 kills no Pesadelo? Impressionante. Finalmente alguém gastou tempo suficiente pra merecer morrer de um jeito humilhante.',
'Você sobreviveu ao modo mais cruel do jogo inteiro só pra descobrir que eu sou mais injusto que ele.',
'Olha essa build toda otimizada… que gracinha. Aposto que você ficou horas pensando nela. Eu vou destruir em segundos.',
'Você chegou até aqui achando que dominou o jogo. Idiota. Você só ficou bom nas regras que eu decidi ignorar.',
'Você venceu monstros, bosses, o Pesadelo e a própria dificuldade. Parabéns. Agora enfrenta alguém que pode simplesmente decidir que você perde.'];
const devReq=()=>CF.i&&(CF.g==0||CF.g==1)&&CF.w==0&&(CF.m==2||CF.m==3||CF.m==4);
const dvN=e=>(e.nb-1)*3+e.bar;
const DVMINI={4:'BLINK: ele teleporta até você',5:'ESPIRAL DUPLA',6:'ELE FICOU MAIS RÁPIDO',7:'RAIOS PASSIVOS',8:'ONDA DE CHOQUE AUTOMÁTICA',10:'+1 PODER POR CICLO',11:'GRAVIDADE: ele puxa você',12:'HORDA AUTOMÁTICA',13:'ESPIRAL TRIPLA',15:'MODO ADMIN DO MAL: 5 PODERES POR CICLO'};
function devReset(){DV.done=0;DV.e=null;DV.sh=[];DV.bl=null;DV.hole=null;DV.las=null;DV.frz=0;DV.q=[];$('dvb').style.display='none';$('devI').classList.remove('on')}
// cada barra do DEV usa uma skin de herói diferente da sua (a última usa a skin ADMIN)
const devSk=n=>{const l=[];for(let i=1;i<=19;i++)if(i!=S.skin)l.push(i);return n>=15&&S.skin!=20?20:l[(n-1)%l.length]};
const devPre=()=>{for(let i=0;i<4;i++)SPR.sheet('bo_'+SPR.slug(BS[bi][i][0]));for(let n=1;n<=15;n++)SPR.sheet('hero_'+devSk(n))};
const devBh=e=>Math.round(e.H0*Math.pow(2,e.bar-1)*Math.pow(1.2,e.nb-1));
function devSpawn(){DV.done=1;
const dps=P.dmg*dx*P.cnt/(P.rate*(PW.fr>0?.5:1)),H=Math.max(15000,Math.round(dps*8));
const e={boss:5,dv:1,k:-1,em:'👁️',sn:'',nm:'DEV',x:P.x,y:P.y-380,vx:0,vy:0,hp:H,mh:H,nb:1,bar:1,bh:H,H0:H,r:70,sp:55,dmg:1e6,xp:500,col:'#ff2a2a',ai:'B',t1:2,t2:3,t3:.5,s:0,jt:0,fl:0,oc:0,cd:3,bm:1,inv:0,at:0,bk:8,lt:3,rg:9,hd:14};
E.push(e);DV.e=e;devPre();
const pool=CF.m==4?DVT:CF.m==3?DVN:DVH,q=pool[Math.floor(R()*pool.length)];
$('devT').textContent=q;$('devI').classList.add('on');$('dvb').style.display='block';devHud();
st='devi';flash=1;AUD.sf('efeito_dev_aviso',1);sfx('boss');setTimeout(()=>sfx('boss2'),450);setTimeout(()=>sfx('boom'),900);ban('DEV');
let k=0;const iv=setInterval(()=>{k++;shake=k<28?24+R()*16:shake*.85;if(k>40){clearInterval(iv);shake=0}},110);
setTimeout(()=>{$('devI').classList.remove('on');if(st=='devi')st='play'},4600)}
function devHud(){const e=DV.e;if(!e)return;for(let j=1;j<=3;j++)$('dv'+j).style.width=(j<e.bar?0:j==e.bar?Math.max(0,e.hp/e.bh)*100:100)+'%';
$('dvbi').textContent='BIOMA '+e.nb+'/5 · '+BI[bi][0].toUpperCase()+' · BARRA '+dvN(e)+'/15'}
function devNext(e){let msg;
if(e.bar<3){e.bar++;msg=e.bar==2?'BARRA 2: AGORA EU ESTOU SÉRIO':'BARRA 3: CHAMEI OS BOSSES DO BIOMA'}
else if(e.nb<5){e.nb++;e.bar=1;bi=(bi+1)%5;devPre();msg='BIOMA '+e.nb+'/5: '+BI[bi][0].toUpperCase()}
else return false;
e.bh=devBh(e);e.hp=e.mh=e.bh;e.inv=1.6;e.cd=1.2;e.fl=.3;e.bk=8;e.lt=3;e.rg=9;e.hd=14;
EB.length=0;MK.length=0;RG.length=0;DV.sh=[];DV.bl=null;DV.hole=null;DV.las=null;DV.q=[];
shake=30;flash=.8;sfx('boss');sfx('boom');if(e.bar==3)devAllBosses();ban(msg);
const n=dvN(e);if(DVMINI[n])DV.q.push({t:1.6,f:()=>{if(DV.e)ban('NOVA MECÂNICA: '+DVMINI[n])}});
devHud();return true}
function devWin(e){DV.e=null;DV.sh=[];DV.bl=null;DV.hole=null;DV.las=null;DV.q=[];DV.frz=0;$('dvb').style.display='none';
for(const o of E)if(o.helper){o.dead=1;puff(o.x,o.y,'#ff1a1a',16,200)}
AUD.sf('efeito_dev_derrotado',1);earned+=25000;S.st.devkills=(S.st.devkills||0)+1;ach('g_dev');shake=40;flash=1;ban('O DEUS CAIU');
for(let i=0;i<10;i++)setTimeout(()=>{if(st=='play')boom(e.x+R()*200-100,e.y+R()*200-100,90,0)},i*120);sv()}
function devHit(px,py,r){for(const q of PL){if(q.dead)continue;if(Math.hypot(q.x-px,q.y-py)<r+q.r*.8){const s=P;P=q;hurt(1e6);P=s}}}
const dvMk=(px,py,t,rad,em)=>MK.push({x:px,y:py,t,rad,d:1e6,em});
function devHelper(b,i){const ob=bi,m=S.mute;bi=b;S.mute=1;boss(i);S.mute=m;bi=ob;const h=E[E.length-1];if(h&&h.boss){h.helper=1;h.hp*=2;h.mh=h.hp}bossE=null;$('boss').style.display='none'}
function devAllBosses(){for(const o of E)if(o.helper)o.dead=1;const b=bi;for(let i=0;i<4;i++)DV.q.push({t:i*.3,f:()=>{if(DV.e)devHelper(b,i)}});
DV.q.push({t:1.3,f:()=>{ban('OS BOSSES DO BIOMA CHEGARAM');shake=20}})}
const DVP={
sharks:e=>{ban('🌪️ TORNADOS DE TUBARÕES LASER');for(let i=0;i<5+e.bar;i++){const a=R()*7;DV.sh.push({x:e.x+Math.cos(a)*60,y:e.y+Math.sin(a)*60,a,l:7})}},
meteors:e=>{ban('☄️ CHUVA DE METEOROS');for(let i=0;i<8;i++){const n=i<3;dvMk(P.x+R()*(n?140:520)-(n?70:260),P.y+R()*(n?140:360)-(n?70:180),.9+i*.28,60,'☄️')}},
lightning:e=>{ban('⚡ TEMPESTADE DE RAIOS');for(let i=0;i<6;i++){const l=.8+i*.22;dvMk(P.x+(P.ddx||0)*P.sp*l*(i%2?.4:.9)+R()*70-35,P.y+(P.ddy||0)*P.sp*l*(i%2?.4:.9)+R()*70-35,l,38,'⚡')}},
cows:e=>{ban('🐄 CHUVA DE VACAS');for(let i=0;i<7;i++)dvMk(P.x+R()*440-220,P.y+R()*320-160,.9+i*.2,70,'🐄')},
fireworks:e=>{ban('🎆 FOGOS DE ARTIFÍCIO');for(let k=0;k<4;k++)DV.q.push({t:k*.45,f:()=>{const px=P.x+R()*500-250,py=P.y+R()*360-180;FX.push({x:px,y:py,r:60,t:.3,ring:1});DV.q.push({t:.5,f:()=>{for(let i=0;i<14;i++){const a=i/14*PI*2;EB.push({x:px,y:py,vx:Math.cos(a)*160,vy:Math.sin(a)*160,r:6,l:5,d:1e6,col:'#ffd45a'})}}})}})},
ducks:e=>{ban('🦆 PATOS KAMIKAZES');summon(e,5,5)},
hole:e=>{ban('🕳️ BURACO NEGRO');const a=R()*7;DV.hole={x:P.x+Math.cos(a)*260,y:P.y+Math.sin(a)*260,t:5.5,r:300,kr:34}},
lasers:e=>{ban('🔆 LASERS GIRATÓRIOS');DV.las={a:R()*7,age:0,t:4.8,dir:R()<.5?-1:1}},
blades:e=>{ban('🛸 12 LÂMINAS ORBITAIS');DV.bl={a:0,age:0,t:6.5}},
flip:e=>{ban('🙃 MUNDO DE CABEÇA PRA BAIXO');AB.flip=5;DVP.meteors(e)},
quake:e=>{ban('🌍 TERREMOTO GLOBAL');shake=24;for(let k=0;k<3;k++)DV.q.push({t:k*.9,f:()=>{if(DV.e)RG.push({x:DV.e.x,y:DV.e.y,r:40,sp:330,m:1100,d:1e6});shake=16}})},
aura:e=>{ban('🔥 AURA DO APOCALIPSE');RG.push({x:e.x,y:e.y,r:40,sp:300,m:1100,d:1e6})},
freeze:e=>{ban('🧊 CONGELAR');DV.frz=2.5;DVP.lightning(e)},
horde:e=>{ban('👹 HORDA DE MONSTROS');const n=8+Math.min(3,e.bar)*3;for(let i=0;i<n;i++){const a=R()*7,d=90+R()*70;spawn(Math.floor(R()*EN.length),e.x+Math.cos(a)*d,e.y+Math.sin(a)*d,R()<.15)}}};
const DVL=[['sharks','meteors','lightning','cows','fireworks','ducks','horde'],['sharks','meteors','lightning','cows','fireworks','ducks','horde','hole','lasers','blades','flip'],['sharks','meteors','lightning','cows','fireworks','ducks','horde','hole','lasers','blades','flip','quake','aura','freeze']];
function devAI(e,dt){e.inv=Math.max(0,e.inv-dt);e.at=Math.max(0,e.at-dt);const n=dvN(e),sp=[0,55,80,115][e.bar]*(n>=6?1.2:1)*(1+.03*(e.nb-1)),ax=P.x-e.x,ay=P.y-e.y,d=Math.hypot(ax,ay)||1;
if(d>240){e.x+=ax/d*sp*dt;e.y+=ay/d*sp*dt}else if(d<150){e.x-=ax/d*sp*.6*dt;e.y-=ay/d*sp*.6*dt}
if(d<e.r*.9+P.r)hurt(1e6);
// ciclo de poderes: 3 por ciclo (4 a partir da barra 10, 5 na última). Cooldown: 2 s na barra 1; depois 1 s e cai aos poucos (mínimo 0,55 s)
e.cd-=dt;if(e.cd<=0){e.cd=n==1?2:Math.max(.55,1-.03*(n-2))*(n==15?.85:1);e.at=.6;const l=DVL[Math.min(3,n)-1],c=n>=15?5:n>=10?4:3;for(let i=0;i<c;i++)DVP[l[Math.floor(R()*l.length)]](e)}
// espiral de balas (a partir da barra 2); mini mecânicas: contra-espiral (5) e espiral tripla (13)
if(n>=2){e.t3-=dt;if(e.t3<=0){e.t3=n==2?.35:.2;e.s+=.55;const arms=n>=13?3:1;for(let k=0;k<arms;k++){const a=e.s+k*PI*2/arms;EB.push({x:e.x,y:e.y,vx:Math.cos(a)*170,vy:Math.sin(a)*170,r:7,l:6,d:1e6,col:'#ff2a2a'})}
if(n>=5){const a=-e.s*1.3;EB.push({x:e.x,y:e.y,vx:Math.cos(a)*170,vy:Math.sin(a)*170,r:7,l:6,d:1e6,col:'#ffd45a'})}}}
if(n>=4&&(e.bk-=dt)<=0){e.bk=8;const a=R()*7,tx=P.x+Math.cos(a)*230,ty=P.y+Math.sin(a)*230;FX.push({x:tx,y:ty,r:70,t:.5,ring:1});DV.q.push({t:.5,f:()=>{if(DV.e&&!DV.e.dead){DV.e.x=tx;DV.e.y=ty;FX.push({x:tx,y:ty,r:90,t:.25,ring:1});shake=8}}})}
if(n>=7&&(e.lt-=dt)<=0){e.lt=3;dvMk(P.x+R()*160-80,P.y+R()*160-80,.9,38,'⚡')}
if(n>=8&&(e.rg-=dt)<=0){e.rg=9;RG.push({x:e.x,y:e.y,r:40,sp:300,m:1100,d:1e6})}
if(n>=11)for(const q of PL){if(q.dead||q.dT>0)continue;const gx=e.x-q.x,gy=e.y-q.y,gd=Math.hypot(gx,gy)||1;if(gd<420){q.x+=gx/gd*38*dt;q.y+=gy/gd*38*dt}}
if(n>=12&&(e.hd-=dt)<=0){e.hd=14;DVP.horde(e)}}
function devUpd(dt){if(!DV.done&&kills>=9999&&devReq()){devSpawn();return}
if(DV.frz>0)DV.frz-=dt;
for(let i=DV.q.length-1;i>=0;i--){const q=DV.q[i];q.t-=dt;if(q.t<=0){DV.q.splice(i,1);q.f()}}
for(const s of DV.sh){const t=np(s.x,s.y);let da=Math.atan2(t.y-s.y,t.x-s.x)-s.a;da=Math.atan2(Math.sin(da),Math.cos(da));s.a+=Math.max(-1.7*dt,Math.min(1.7*dt,da));s.x+=Math.cos(s.a)*230*dt;s.y+=Math.sin(s.a)*230*dt;s.l-=dt;devHit(s.x,s.y,22)}
if(DV.sh.length)cmp(DV.sh,s=>s.l>0);
const e=DV.e;
if(DV.bl){const o=DV.bl;if(!e||(o.t-=dt)<=0)DV.bl=null;else{o.age+=dt;o.a+=2.1*dt;const rad=70+330*Math.min(1,o.age/3);for(let i=0;i<12;i++){const a=o.a+i/12*PI*2;devHit(e.x+Math.cos(a)*rad,e.y+Math.sin(a)*rad,16)}}}
if(DV.hole){const h=DV.hole;if((h.t-=dt)<=0)DV.hole=null;else for(const q of PL){if(q.dead)continue;const dd=Math.hypot(h.x-q.x,h.y-q.y)||1;if(dd<h.r){const pull=40+150*(1-dd/h.r);q.x+=(h.x-q.x)/dd*pull*dt;q.y+=(h.y-q.y)/dd*pull*dt}if(dd<h.kr+q.r*.5){const s=P;P=q;hurt(1e6);P=s}}}
if(DV.las){const l=DV.las;if(!e||(l.t-=dt)<=0)DV.las=null;else{l.age+=dt;l.a+=1.05*dt*l.dir;for(let k=0;k<4;k++){const a=l.a+k*PI/2,ux=Math.cos(a),uy=Math.sin(a);FX.push({beam:1,x:e.x,y:e.y,a,w:l.age<1?3:14,len:1000,t:.05,c:'255,40,40'});
if(l.age>1)for(const q of PL){if(q.dead)continue;const px=q.x-e.x,py=q.y-e.y,pr=px*ux+py*uy;if(pr>0&&pr<1000&&Math.abs(px*uy-py*ux)<10+q.r*.6){const s=P;P=q;hurt(1e6);P=s}}}}}}
function devDraw(e){const r=e.r,t=T,n=dvN(e),col=['','#ff2a2a','#ff8a00','#c800ff'][e.bar];x.save();x.translate(e.x,e.y);
x.globalAlpha=e.inv>0&&Math.floor(t*20)%2?.5:1;
const g=x.createRadialGradient(0,0,r*.3,0,0,r*3);g.addColorStop(0,col+'88');g.addColorStop(1,col+'00');x.fillStyle=g;x.beginPath();x.arc(0,0,r*3,0,7);x.fill();
x.lineWidth=4;x.strokeStyle=col;for(let k=0;k<Math.min(5,2+Math.floor(n/3));k++){const an=t*(k%2?-1:1)*1.5;x.beginPath();x.arc(0,0,r*(1.5+k*.3),an,an+4.2);x.stroke()}
const hr=r*.9,a=Math.atan2(P.y-e.y,P.x-e.x);x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,hr*.9,hr*.9,hr*.3,0,0,7);x.fill();
const om=mv;mv=1;let ok=SPR.hero(x,hr,a,devSk(n),null);if(ok&&e.fl>0){x.globalCompositeOperation='lighter';x.globalAlpha=.6;SPR.hero(x,hr,a,devSk(n),null);x.globalCompositeOperation='source-over';x.globalAlpha=1}mv=om;
if(!ok){x.rotate(Math.sin(t*3)*.06);const w=r*1.7;x.fillStyle=e.fl>0?'#fff':'#14060a';x.strokeStyle=col;x.lineWidth=7;x.fillRect(-w/2,-w/2,w,w);x.strokeRect(-w/2,-w/2,w,w);x.rotate(-Math.sin(t*3)*.06)}
x.font='900 '+Math.round(r*.5)+'px "Lilita One",Impact,sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineWidth=7;x.strokeStyle='#000';x.lineJoin='round';
const ty=-hr*2.55;x.strokeText('DEV',0,ty);x.fillStyle=col;x.fillText('DEV',0,ty);x.fillStyle='#fff';x.globalAlpha*=.35;x.fillText('DEV',0,ty-2);x.globalAlpha=1;
x.font=Math.round(r*.55)+'px sans-serif';x.fillText('👑',0,ty-r*.55);x.restore()}
function devFX(){if(!DV.e&&!DV.sh.length&&!DV.hole&&!DV.bl&&!MK.length)return;
x.save();x.textAlign='center';x.textBaseline='middle';x.font='30px sans-serif';
for(const m of MK)if(m.em&&m.t>0)x.fillText(m.em,m.x,m.y-m.t*320);
x.restore();
for(const s of DV.sh){const fl=Math.cos(s.a)<0;if(!SPR.at(x,'fx','tubarao_voador_6f',T,s.x,s.y,.3,fl,fl?s.a+PI:s.a)){x.fillStyle='#4d8dff';x.beginPath();x.arc(s.x,s.y,14,0,7);x.fill()}}
const e=DV.e;
if(DV.bl&&e){const o=DV.bl,rad=70+330*Math.min(1,o.age/3);for(let i=0;i<12;i++){const a=o.a+i/12*PI*2;x.save();x.translate(e.x+Math.cos(a)*rad,e.y+Math.sin(a)*rad);x.rotate(a+T*8);x.fillStyle='#ff2a2a';x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(-15,0);x.lineTo(0,-7);x.lineTo(15,0);x.lineTo(0,7);x.closePath();x.fill();x.stroke();x.restore()}}
if(DV.hole){const h=DV.hole,g=x.createRadialGradient(h.x,h.y,4,h.x,h.y,h.r);g.addColorStop(0,'rgba(0,0,0,.95)');g.addColorStop(.25,'rgba(60,0,110,.55)');g.addColorStop(1,'rgba(60,0,110,0)');x.fillStyle=g;x.beginPath();x.arc(h.x,h.y,h.r,0,7);x.fill();
x.strokeStyle='#b45cff';x.lineWidth=3;for(let k=0;k<3;k++){const rr=h.kr+((T*60+k*70)%(h.r-h.kr));x.globalAlpha=1-rr/h.r;x.beginPath();x.arc(h.x,h.y,rr,0,7);x.stroke()}x.globalAlpha=1;x.fillStyle='#000';x.beginPath();x.arc(h.x,h.y,h.kr,0,7);x.fill()}}
