/* Survive Chaos Web — Local Co-op Integrity 1.0
   Isolated fixes for 2-player local co-op. Solo gameplay is left untouched. */
(() => {
'use strict';
if(window.__SC_COOP_INTEGRITY__)return;window.__SC_COOP_INTEGRITY__=true;
try{
  const party=()=>Array.isArray(PL)&&PL.length?PL:(P?[P]:[]);
  const alive=()=>party().filter(q=>q&&!q.dead);
  const coop=()=>typeof CO!=='undefined'&&CO.on&&party().length>1;
  const anchor=()=>alive()[0]||party()[0]||P;
  const dist=(a,b)=>Math.hypot((a?.x||0)-(b?.x||0),(a?.y||0)-(b?.y||0));
  const withPlayer=(q,fn)=>{if(!q)return;const old=P;P=q;try{return fn()}finally{P=old}};

  // Keep each controller tied to the same player even if another pad disconnects.
  function connectedPads(){try{return navigator.getGamepads?[...navigator.getGamepads()].filter(g=>g&&g.connected):[]}catch(_){return[]}}
  function mapPads(){
    if(!coop())return;
    CO.gp=Array.isArray(CO.gp)?CO.gp:[null,null];
    const pads=connectedPads(),used=new Set();
    for(let i=0;i<2;i++)if(CO.sch[i]===3){
      const old=CO.gp[i],keep=pads.find(g=>g.index===old&&!used.has(g.index));
      if(keep){used.add(keep.index);continue}
      if(old!=null)continue; // preserve a disconnected slot instead of shifting the other player.
      const next=pads.find(g=>!used.has(g.index));CO.gp[i]=next?next.index:null;if(next)used.add(next.index);
    }else CO.gp[i]=null;
  }
  if(typeof setCO==='function'){
    const baseSetCO=setCO;
    setCO=function(){const r=baseSetCO.apply(this,arguments);mapPads();return r};
  }
  if(typeof padIn==='function'){
    padIn=function(i,o){
      CO.gp=Array.isArray(CO.gp)?CO.gp:[null,null];
      if(CO.gp[i]==null)mapPads();
      let g=null;try{const all=navigator.getGamepads?[...navigator.getGamepads()]:[];g=all.find(q=>q&&q.connected&&q.index===CO.gp[i])||null}catch(_){}
      if(!g)return;
      const ax=k=>Math.abs(g.axes[k]||0)>.22?g.axes[k]:0,b=k=>!!(g.buttons[k]&&g.buttons[k].pressed),pb=CO.pb[i]||(CO.pb[i]=[]);
      o.mx=ax(0)+(b(15)?1:0)-(b(14)?1:0);o.my=ax(1)+(b(13)?1:0)-(b(12)?1:0);
      const rx=ax(2),ry=ax(3);if(Math.hypot(rx,ry)>.3){o.am=1;o.aa=Math.atan2(ry,rx);o.af=1}
      if((b(0)||b(5))&&!pb[0])dash();
      if((b(1)||b(2)||b(4))&&!pb[1])fireUlt();
      if(b(9)&&!pb[2]&&st==='play'){const z=document.getElementById('pz');z&&z.click()}
      pb[0]=b(0)||b(5);pb[1]=b(1)||b(2)||b(4);pb[2]=b(9);
    };
  }
  addEventListener('gamepadconnected',mapPads);addEventListener('gamepaddisconnected',()=>setTimeout(mapPads,0));

  // Remember the player that created each projectile. This fixes P2 vampirism,
  // explosions, kill effects and any skin/stat logic that depends on global P.
  function tagBullet(b){
    if(!coop()||!b||b.__scCoopTagged||!P||!party().includes(P))return b;
    const owner=P;let dmg=b.d;
    try{Object.defineProperty(b,'__scCoopTagged',{value:1,configurable:true});Object.defineProperty(b,'__scOwner',{value:owner,configurable:true});
      if(typeof dmg==='number')Object.defineProperty(b,'d',{configurable:true,enumerable:true,get(){if(coop()&&owner)P=owner;return dmg},set(v){dmg=v}});
    }catch(_){b.__scOwner=owner;b.__scCoopTagged=1}
    return b;
  }
  function armBullets(){
    if(!Array.isArray(B)||B.__scCoopPush)return;
    const raw=B.push;try{Object.defineProperty(B,'__scCoopPush',{value:1,configurable:true})}catch(_){B.__scCoopPush=1}
    B.push=function(){for(const b of arguments)tagBullet(b);return raw.apply(this,arguments)};
  }

  // Preserve burn ownership too; a burn kill must belong to the player who applied it.
  let hitDepth=0;
  if(typeof hit==='function'){
    const baseHit=hit;
    hit=function(e){const owner=P;hitDepth++;try{const r=baseHit.apply(this,arguments);if(coop()&&e&&owner&&(owner.burn||0)>0&&e.bn>0)e.__scBurnOwner=owner;return r}finally{hitDepth--}};
  }
  if(typeof kill==='function'){
    const baseKill=kill;
    kill=function(e){if(coop()&&!hitDepth&&e&&e.bn>0&&e.__scBurnOwner)P=e.__scBurnOwner;return baseKill.apply(this,arguments)};
  }

  // Turrets inherit the player who picked them up, instead of silently using P1 stats.
  if(typeof usePW==='function'){
    const baseUsePW=usePW;
    usePW=function(n){const owner=P,before=Array.isArray(TR)?TR.length:0,r=baseUsePW.apply(this,arguments);if(coop()&&n===4&&Array.isArray(TR))for(let i=before;i<TR.length;i++){
      const t=TR[i];if(!t||t.__scOwnerBound)continue;t.__scOwner=owner;t.__scOwnerBound=1;let cd=t.cd;
      try{Object.defineProperty(t,'cd',{configurable:true,enumerable:true,get(){if(owner)P=owner;return cd},set(v){cd=v;if(owner)P=owner}})}catch(_){}
    }return r};
  }

  // The legacy global-effects pass processed offensive dash only for the current P.
  // Keep it once for its normal global timers, then add dash collision for the other player.
  if(typeof ext==='function'){
    const baseExt=ext;
    ext=function(dt){
      const first=P,r=baseExt.apply(this,arguments);
      if(coop())for(const q of party())if(q&&q!==first&&!q.dead&&q.dT>0){
        withPlayer(q,()=>{try{puff(q.x,q.y,'#4fe0e8',1,30)}catch(_){};for(const e of E||[])if(e&&!e.dead&&e.oc<=0&&Math.hypot(e.x-q.x,e.y-q.y)<e.r+26){e.oc=.25;hit(e,q.dmg*3*dx,q.x,q.y)}});
      }
      P=first||anchor();return r;
    };
  }

  // Global systems should follow the surviving teammate when P1 is down.
  if(typeof upd==='function'){
    const baseUpd=upd;
    upd=function(dt){if(coop()&&P&&P.dead){const q=anchor();if(q)P=q}armBullets();const r=baseUpd.apply(this,arguments);P=anchor()||P;return r};
  }
  if(typeof draw==='function'){
    const baseDraw=draw;
    draw=function(){const r=baseDraw.apply(this,arguments);if(coop())P=anchor()||P;return r};
  }

  // Do not keep a huge two-player zoom after one player is dead far away.
  if(typeof camUpd==='function'){
    const baseCam=camUpd;
    camUpd=function(dt){const r=baseCam.apply(this,arguments);if(coop()&&alive().length<2){const f=Math.min(1,Math.max(0,dt||0)*4);ZM+=(1-ZM)*f;Z=ZB*ZM}return r};
  }

  // Web advanced modes originally rewarded/buffed only whichever player happened to be in P.
  function healOthers(fr){if(!coop())return;for(const q of alive())if(q!==P)q.hp=Math.min(q.mhp,q.hp+q.mhp*fr)}
  if(typeof ban==='function'){
    const baseBan=ban;
    ban=function(t){const r=baseBan.apply(this,arguments);if(coop()&&typeof t==='string'){
      if(t.startsWith('SETOR CONCLUÍDO'))healOthers(.14);
      else if(t.startsWith('HORDE DEFENSE'))healOthers(.04);
      else if(t.includes('RANDOMIZER')&&t.toLowerCase().includes('recupera'))healOthers(.18);
      else if(t.includes('REALITY ROULETTE')&&t.includes('RECUPERAÇÃO'))healOthers(.25);
    }return r};
  }

  let webHellAt=0;
  if(typeof modes==='function'){
    const baseModes=modes;
    modes=function(dt){const r=baseModes.apply(this,arguments);if(coop()&&Number(S.webAdvMode)===11&&T>=webHellAt){
      webHellAt=T+2.5;const p0=party()[0];for(const q of alive().slice(1)){
        const pool=(E||[]).filter(e=>e&&!e.dead&&!e.boss&&dist(e,q)<520&&(!p0||dist(e,p0)>430));
        for(let n=0;n<Math.min(CF.m>=3?2:1,pool.length);n++){const e=pool.splice(Math.floor(R()*pool.length),1)[0];try{radial(e,CF.m>=3?8:CF.m>=2?6:5,125+CF.m*8,R()*PI*2,'#ff5169')}catch(_){}}
      }
    }return r};
  }

  if(typeof start==='function'){
    const baseStart=start;
    start=function(){const r=baseStart.apply(this,arguments);armBullets();mapPads();webHellAt=0;if(coop()){
      const m=Number(S.webAdvMode)||0;
      for(const q of party().slice(1)){
        if(m===10&&!q.__scWebNG){q.__scWebNG=1;q.dmg*=1.12;q.xpm*=1.12}
        if(m===3&&!q.__scWebEscape){q.__scWebEscape=1;q.sp*=1.06}
      }
    }return r};
  }

  // Result card should identify the duo, not only P1.
  if(typeof end==='function'){
    const baseEnd=end;
    end=function(win){const wasCoop=!!(CF&&CF.co),r=baseEnd.apply(this,arguments);if(wasCoop){try{const w=document.querySelector('#os .who');if(w)w.innerHTML=(typeof _nm==='function'?_nm(0):'Jogador 1')+' + '+(typeof esc==='function'?esc(typeof nickOf==='function'?nickOf(1):'Jogador 2'):'Jogador 2')+' · '+MN[CF.g]+' · '+MD[CF.m][0]}catch(_){}}return r};
  }

  armBullets();mapPads();
  window.SCCoopIntegrity={version:'1.0',party,alive,mapPads,armBullets};
  console.log('[Co-op] Integrity 1.0 active');
}catch(err){console.error('[Co-op Integrity]',err)}
})();
