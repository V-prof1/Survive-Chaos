// ===== trilha sonora (arquivos MP3) =====
// jogo: menu e partida | boss: qualquer boss normal | DEV: 3 faixas por barra (1-5, 6-10, 11-15)
// Efeitos: aviso do DEV, boss derrotado, DEV derrotado. Respeita o botão de som e a "Música automática".
const AUD={els:{},cur:null,vol:{musica_jogo:.4,musica_boss:.5,musica_dev_1:.55,musica_dev_2:.55,musica_dev_3:.55},bad:0,hush:1,
url:f=>(typeof AUD_DATA!='undefined'&&AUD_DATA[f])||'musicas/'+f,
el(n){let a=AUD.els[n];if(!a){a=AUD.els[n]=new Audio(AUD.url(n+'.mp3'));a.loop=true;a.preload='auto';a.volume=0;a.onerror=()=>{AUD.bad=1}}return a},
auto:()=>!S.trk&&!AUD.bad,
sf(n,v){if(S.mute||AUD.bad)return;try{const a=new Audio(AUD.url(n+'.mp3'));a.volume=v==null?.9:v;a.play().catch(()=>{})}catch(e){}},
pick(){if(S.mute||S.trk||AUD.bad)return null;
const ing=['play','cards','pause','adm','devi'].includes(st)&&!!P;
if(st=='devi')return null;
if(ing&&typeof DV!='undefined'&&DV.e){const n=dvN(DV.e);return n<=5?'musica_dev_1':n<=10?'musica_dev_2':'musica_dev_3'}
if(ing&&E.some(o=>o.boss&&!o.dead&&!o.dv&&!o.helper))return 'musica_boss';
return 'musica_jogo'},
tick(){const w=AUD.pick();if(w!==AUD.cur){AUD.cur=w}
AUD.hush=st=='pause'||st=='cards'?.35:1;
for(const n in AUD.els){const a=AUD.els[n],tv=n===AUD.cur?(AUD.vol[n]||.5)*AUD.hush:0,d=tv-a.volume;
if(Math.abs(d)>.002)a.volume=Math.max(0,Math.min(1,a.volume+Math.sign(d)*Math.min(Math.abs(d),.035)));
if(n===AUD.cur&&a.paused&&AUD.go)a.play().catch(()=>{});
if(n!==AUD.cur&&a.volume<=.003&&!a.paused)a.pause()}
if(AUD.cur&&!AUD.els[AUD.cur])AUD.el(AUD.cur)}};
AUD.go=0;
const audGo=()=>{AUD.go=1};addEventListener('pointerdown',audGo);addEventListener('keydown',audGo);
setInterval(()=>{try{AUD.tick()}catch(e){}},60);
