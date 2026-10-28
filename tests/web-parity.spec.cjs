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

for(const f of ['www/web-core-loader.js','www/web-dev-loader.js','www/web-parity.js'])cp.execFileSync(process.execPath,['--check',f],{stdio:'inherit'});

assert(index.includes('web-core-loader.js?v=3'),'Web core loader v3 is not injected');
assert(index.includes('web-dev-loader.js?v=3'),'Web DEV loader v3 is not injected');
assert(index.includes('web-parity.js?v=5'),'Web Safe UI cache-buster v5 is not injected');
assert(root.includes("build','web-parity-5"),'Root Pages bridge must bust the inner Web cache with parity v5');
assert(!index.includes('<script src="game.js"></script>'),'Raw game.js must be replaced by the Web core loader');
assert(!index.includes('<script src="dev.js"></script>'),'Raw dev.js must be replaced by the Web DEV loader');

// Web UI must stay native and independent from raw Mobile DOM/CSS layers.
assert(parity.includes("VERSION='4.0'"),'Web Safe UI 4.0 missing');
assert(parity.includes("status:'safe-ui'"),'Web Safe UI status missing');
assert(parity.includes('function repairBaseButtons()'),'Native button repair guard missing');
assert(parity.includes('webSafeRescue'),'Native Play navigation rescue missing');
assert(!parity.includes('cdn.jsdelivr.net'),'Safe UI must not fetch raw Mobile layers from jsDelivr');
assert(!parity.includes('mobile-menu-refine.js'),'Raw Mobile menu JS must not load on Web');
assert(!parity.includes('mobile-main-menu.css'),'Raw Mobile menu CSS must not load on Web');
assert(!parity.includes('new MutationObserver'),'Safe UI must not add global DOM observers');

// Upstream signatures are intentionally kept in the source and transformed at runtime.
assert(game.includes("const scoreNow=()=>Math.round((kills*10+RUN.boss*500+Math.floor(T)*3)*MZ[4]);"),'score signature changed');
assert(game.includes("pm=1+(S.perm&&S.perm.coin||0)*.1"),'permanent coin signature changed');
assert(game.includes("bossDown();earned+=150;"),'boss reward signature changed');
assert(dev.includes('earned+=25000'),'DEV reward signature changed');

// Core parity patches remain local and safe.
assert(core.includes('mobileEnemyCap'),'Infinite adaptive enemy cap missing');
assert(core.includes('HORDA INFINITA'),'Infinite exponential horde patch missing');
assert(core.includes('kills*4+RUN.boss*750'),'Web score rebalance missing');
assert(core.includes('SCArsenal.bullet'),'Skin projectile hook missing');
assert(core.includes('SCAIDirector.boss'),'Boss AI Director hook missing');
assert(core.includes('SCAIDirector.enemy'),'Enemy AI Director hook missing');
assert(devLoader.includes('earned+=2500'),'DEV reward nerf missing');

console.log('Survive Chaos Web Safe UI 4.0 regression checks passed.');
