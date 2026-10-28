const fs=require('fs');
const assert=require('assert');
const cp=require('child_process');
const read=p=>fs.readFileSync(p,'utf8');
const game=read('www/game.js');
const dev=read('www/dev.js');
const index=read('www/index.html');
const root=read('index.html');
const core=read('www/web-core-loader.js');
const devLoader=read('www/web-dev-loader.js');
const parity=read('www/web-parity.js');
const bridge=read('www/web-ui-bridge.js');

for(const f of ['www/web-core-loader.js','www/web-dev-loader.js','www/web-parity.js','www/web-ui-bridge.js'])cp.execFileSync(process.execPath,['--check',f],{stdio:'inherit'});

assert(index.includes('web-core-loader.js?v=3'),'Web core loader v3 is not injected');
assert(index.includes('web-dev-loader.js?v=3'),'Web DEV loader v3 is not injected');
assert(index.includes('web-parity.js?v=4'),'Web parity fixed cache-buster v4 is not injected');
assert(root.includes("build','web-parity-3"),'Root Pages bridge changed unexpectedly');
assert(!index.includes('<script src="game.js"></script>'),'Raw game.js must be replaced by the Web core loader');
assert(!index.includes('<script src="dev.js"></script>'),'Raw dev.js must be replaced by the Web DEV loader');

// The base game must remain playable even if jsDelivr is slow/unavailable.
assert(parity.includes("version:'3.1'"),'Web parity 3.1 startup fix missing');
assert(parity.includes('function forcePlayReady()'),'Play readiness guard missing');
assert(parity.includes("play.disabled=false"),'Play button is not explicitly kept enabled');
assert(!parity.includes('play.disabled=true'),'Web parity must never disable Play while remote modules load');
assert(parity.includes("why==='timeout'"),'Remote module timeout protection missing');
assert(parity.includes('webStartRescue'),'Local Play navigation rescue missing');

// Upstream signatures are intentionally kept in the source and transformed at runtime.
assert(game.includes("const scoreNow=()=>Math.round((kills*10+RUN.boss*500+Math.floor(T)*3)*MZ[4]);"),'score signature changed');
assert(game.includes("pm=1+(S.perm&&S.perm.coin||0)*.1"),'permanent coin signature changed');
assert(game.includes("bossDown();earned+=150;"),'boss reward signature changed');
assert(dev.includes('earned+=25000'),'DEV reward signature changed');

// Core parity patches.
assert(core.includes('mobileEnemyCap'),'Infinite adaptive enemy cap missing');
assert(core.includes('HORDA INFINITA'),'Infinite exponential horde patch missing');
assert(core.includes('kills*4+RUN.boss*750'),'Web score rebalance missing');
assert(core.includes('SCArsenal.bullet'),'Skin projectile hook missing');
assert(core.includes('SCAIDirector.boss'),'Boss AI Director hook missing');
assert(core.includes('SCAIDirector.enemy'),'Enemy AI Director hook missing');
assert(devLoader.includes('earned+=2500'),'DEV reward nerf missing');

// Shared Mobile systems that are safe on Web.
for(const file of [
  'mobile-pro.js','mobile-economy.js','mobile-content.js','mobile-legacy.js','mobile-admin-plus.js',
  'mobile-arsenal-skins.js','mobile-rebalance.js','mobile-difficulty-plus.js','mobile-hud-responsive.js',
  'mobile-skin-ults.js','mobile-menu-refine.js','mobile-hud-editor.js','mobile-ai-director.js',
  'mobile-xp-balance.js','mobile-hud-editor-fix.js','mobile-dev-baby-intro.js','mobile-activities-pack.js',
  'mobile-modes-pack2.js','mobile-replay-pack-v2.js','mobile-squad-ai.js','mobile-defense-mobility.js',
  'mobile-reality-break.js','mobile-uiux-overhaul.js'
])assert(parity.includes(file),`Web parity missing ${file}`);

for(const css of ['mobile-main-menu.css','mobile-activities-pack.css','mobile-modes-pack2.css','mobile-replay-pack.css','mobile-uiux-overhaul.css','mobile-uiux-red-theme.css'])assert(parity.includes(css),`Web parity missing ${css}`);

assert(parity.includes("REV='113ba05ad505f1cc2687f3d4f0ba7748fc4af038'"),'Web parity is not pinned to the approved Mobile revision');
assert(parity.includes("skipped:['android-online','cordova','portrait-lock','rotate-easteregg','kaneki']"),'Web-only exclusion list missing');
assert(!parity.includes("'mobile-online.js'"),'Android online layer must not load on Web');
assert(!parity.includes("'mobile-rotate-easteregg.js'"),'Portrait easter egg must not load on Web');
assert(!parity.includes("'mobile-main-menu.js'"),'Mobile orientation-lock runtime must not load on Web');
assert(bridge.includes("content:'WEB BUILD'"),'Web menu identity bridge missing');
assert(bridge.includes("menu.classList.add('scMenuV2')"),'Web responsive menu bridge missing');

console.log('Survive Chaos Web parity 3.1 regression checks passed.');
