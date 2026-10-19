// ===== MODO CLASSES: 6 melhorias + 2 supremas =====
// Você começa com as melhorias escolhidas no máximo e sem cartas durante a partida; bosses surgem ao acaso (50% a cada 20 s).
const CLM={u:6,s:2};
function clsGet(){const c=CF.cl||(CF.cl={u:[],s:[]});c.u=c.u||[];c.s=c.s||[];return c}
function clsOk(){const c=CF.cl;if(!c||!c.u||!c.s||c.u.length!=CLM.u||c.s.length!=CLM.s)return false;
return c.s.every(id=>{const q=SUP.find(z=>z[0]==id);return q&&c.u.includes(q[5])&&c.u.includes(q[6])})}
const clsSave=()=>{S.cf=CF;sv()};
function classSec(pn){const c=clsGet(),d=document.createElement('div');d.className='sec';d.innerHTML='<div class="lbl">Sua classe</div>';
const box=document.createElement('div');box.className='chips';
const all=[...c.u.map(id=>U.find(q=>q[0]==id)),...c.s.map(id=>SUP.find(q=>q[0]==id))].filter(Boolean);
box.innerHTML=all.length?all.map(q=>'<span class="chip'+(q.length>5?' gold':'')+'">'+esc(q[1])+'</span>').join(''):'<span class="sub">Nenhuma melhoria escolhida ainda.</span>';
d.appendChild(box);const b=document.createElement('button');b.className='btn g s';b.style.margin='10px auto 0';b.style.display='block';
b.textContent=clsOk()?'Editar classe':'Montar classe';b.onclick=()=>{sfx('ui');openCls()};d.appendChild(b);
const t=document.createElement('div');t.className='desc';t.textContent=clsOk()?'Classe pronta!':'Escolha 6 melhorias e 2 supremas para começar.';d.appendChild(t);pn.appendChild(d)}
function openCls(){hide('setup');show('cls');st='cls';clsUI()}
function clsClose(){clsSave();hide('cls');show('setup');st='setup';setupUI()}
function clsTog(id){const c=clsGet(),i=c.u.indexOf(id);
if(i>=0){c.u.splice(i,1);c.s=c.s.filter(sid=>{const q=SUP.find(z=>z[0]==sid);return q&&q[5]!=id&&q[6]!=id})}
else if(c.u.length<CLM.u)c.u.push(id);else{sfx('hurt');return}
sfx('ui');clsSave();clsUI()}
function clsTogS(id){const c=clsGet(),q=SUP.find(z=>z[0]==id),i=c.s.indexOf(id);
if(i>=0)c.s.splice(i,1);else if(c.s.length<CLM.s&&c.u.includes(q[5])&&c.u.includes(q[6]))c.s.push(id);else{sfx('hurt');return}
sfx('ui');clsSave();clsUI()}
function clsRandom(){const c=clsGet(),sh=a=>[...a].sort(()=>R()-.5);
for(let t=0;t<50;t++){const ss=sh(SUP).slice(0,CLM.s),need=new Set(ss.flatMap(q=>[q[5],q[6]]));if(need.size>CLM.u)continue;
const rest=sh(U.map(q=>q[0]).filter(id=>!need.has(id)));c.u=[...need,...rest].slice(0,CLM.u);c.s=ss.map(q=>q[0]);break}
sfx('ui');clsSave();clsUI()}
function clsTile(q,sup,c){const b=document.createElement('button');const sel=(sup?c.s:c.u).includes(q[0]);
const nm=id=>(U.find(z=>z[0]==id)||[0,id])[1];let dis=false,sm;
sm=q[2];if(sup)dis=!sel&&!(c.u.includes(q[5])&&c.u.includes(q[6]));
b.className='ct'+(sup?' sup':'')+(sel?' on':'')+(dis?' dis':'');
b.innerHTML=(ICN[q[0]]?SPR.ui(ICN[q[0]]):'')+'<b>'+esc(q[1])+'</b><small>'+esc(sm)+'</small>'+(!sup&&U2D[q[0]]?'<small class="b2">'+esc(U2D[q[0]])+'</small>':'')+(sup?'<i>Requer '+nm(q[5])+' + '+nm(q[6])+'</i>':'<i>até nível '+q[3]+'</i>');
b.onclick=()=>sup?clsTogS(q[0]):clsTog(q[0]);return b}
function clsUI(){const c=clsGet(),r=$('cls'),old=r.querySelector('.lstb'),sc=old?old.scrollTop:0;r.innerHTML='';
const p=document.createElement('div');p.className='panel lst cls';
p.innerHTML='<h2>Monte sua classe</h2><div class="sub">Escolha exatamente 6 melhorias e 2 supremas. Você começa a partida com todas no nível máximo e não ganha mais nenhuma depois. Cada suprema exige as duas melhorias dela.</div>';
const cnt=document.createElement('div');cnt.className='chips';
cnt.innerHTML='<span class="chip'+(c.u.length==CLM.u?' ok':'')+'">Melhorias '+c.u.length+'/'+CLM.u+'</span><span class="chip'+(c.s.length==CLM.s?' ok':'')+'">Supremas '+c.s.length+'/'+CLM.s+'</span>';p.appendChild(cnt);
const body=document.createElement('div');body.className='lstb';
const h1=document.createElement('div');h1.className='lbl';h1.textContent='Melhorias';body.appendChild(h1);
const g1=document.createElement('div');g1.className='cgrid';U.forEach(q=>g1.appendChild(clsTile(q,0,c)));body.appendChild(g1);
const h2=document.createElement('div');h2.className='lbl';h2.textContent='Supremas';h2.style.marginTop='14px';body.appendChild(h2);
const g2=document.createElement('div');g2.className='cgrid';SUP.forEach(q=>g2.appendChild(clsTile(q,1,c)));body.appendChild(g2);p.appendChild(body);
const f=document.createElement('div');f.className='row';
const bk=document.createElement('button');bk.className='btn g s';bk.textContent='Voltar';bk.onclick=()=>{sfx('ui');clsClose()};
const rd=document.createElement('button');rd.className='btn g s';rd.textContent='Aleatória';rd.onclick=clsRandom;
const ok=document.createElement('button');ok.className='btn s';ok.textContent='Confirmar';ok.disabled=!clsOk();ok.onclick=()=>{if(clsOk()){sfx('ui');clsClose()}};
f.appendChild(bk);f.appendChild(rd);f.appendChild(ok);p.appendChild(f);r.appendChild(p);body.scrollTop=sc}
