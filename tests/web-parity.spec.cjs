const fs=require('fs');
const assert=require('assert');
const cp=require('child_process');
const read=p=>fs.readFileSync(p,'utf8');
const game=read('www/game.js');
const dev=read('www/dev.js');
const index=read('www/index.html');
const root=read('index.html');
const modes=read('www/web-modern-modes.js');
const modernCss=read('www/web-modern.css');

for(const f of ['www/game.js','www/dev.js','www/audio.js','www/ui.js','www/polish.js','www/web-modern-modes.js'])cp.execFileSync(process.execPath,['--check',f],{stdio:'inherit'});

// Stable local bootstrap remains untouched: native Web handlers are still the source of truth.
assert(index.includes('game.js?v=stable-web-1'),'Direct local game.js bootstrap missing');
assert(index.includes('dev.js?v=stable-web-1'),'Direct local dev.js bootstrap missing');
assert(!index.includes('web-core-loader.js'),'Web core loader must not return');
assert(!index.includes('web-dev-loader.js'),'Web DEV loader must not return');
assert(!index.includes('web-parity.js'),'Old Web parity injection must not return');
assert(!index.includes('cdn.jsdelivr.net'),'Web runtime must not depend on jsDelivr');

// Root injects only Web-native visual/mode layers after the stable iframe finished loading.
assert(root.includes("build','modern-web-2'"),'Modern Web cache-buster missing');
assert(root.includes('web-modern.css?v=2'),'Modern Web CSS is not injected');
assert(root.includes('web-modern-modes.js?v=2'),'Advanced Web modes are not injected');
assert(root.includes("f.addEventListener('load',injectModernWeb)"),'Modern layer must load only after the stable iframe');

// Native menu handlers must remain intact.
assert(game.includes("$('play').onclick=()=>{hide('menu');show('setup');st='setup';setupUI();sfx('ui')}"),'Native Play handler missing');
assert(game.includes("$('shopb').onclick=()=>{hide('menu');show('shop');st='shop';ref();shopUI()}"),'Native Skins handler missing');
assert(game.includes("$('achb').onclick"),'Native Achievements handler missing');
assert(game.includes("$('histb').onclick"),'Native History handler missing');

// Advanced mode catalog and difficulty gating.
for(const name of ['World Shift','Expedição','Escape','Horde Defense','Boss Marathon','Mirror','Randomizer Total','Hybrid World','Chaos Draft','New Game+','Bullet Hell','Reality Roulette'])assert(modes.includes(name),`Missing advanced Web mode: ${name}`);
assert(modes.includes('const BABY=new Set([0,1,2,3,4,9])'),'Baby compatibility matrix missing');
assert(modes.includes('const EASY=new Set([0,1,2,3,4,8,9])'),'Easy compatibility matrix missing');
assert(modes.includes('const baseModes=modes;modes=function(dt)'),'Advanced mode update hook missing');
assert(modes.includes("document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('#go')"),'Run-start mode reset hook missing');

// Modern visual layer must remain CSS-only and must not block pointer interaction.
assert(modernCss.includes('Modern Crimson UI 2.0'),'Modern Web theme marker missing');
assert(modernCss.includes('#scWebAdvancedModes'),'Advanced mode card styling missing');
assert(!modernCss.includes('pointer-events:none!important'),'Modern CSS must not globally kill pointer interaction');
assert(dev.length>1000,'DEV gameplay source unexpectedly empty');

console.log('Survive Chaos Modern Web 2.0 regression checks passed.');
