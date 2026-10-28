const fs=require('fs');
const assert=require('assert');
const cp=require('child_process');
const read=p=>fs.readFileSync(p,'utf8');
const game=read('www/game.js');
const dev=read('www/dev.js');
const index=read('www/index.html');
const root=read('index.html');

for(const f of ['www/game.js','www/dev.js','www/audio.js','www/ui.js','www/polish.js'])cp.execFileSync(process.execPath,['--check',f],{stdio:'inherit'});

// Stable Web bootstrap: no runtime patch loader and no raw Mobile parity injection.
assert(index.includes('game.js?v=stable-web-1'),'Direct local game.js bootstrap missing');
assert(index.includes('dev.js?v=stable-web-1'),'Direct local dev.js bootstrap missing');
assert(root.includes("build','stable-web-1"),'Root Pages bridge must force the stable Web bootstrap cache');
assert(!index.includes('web-core-loader.js'),'Web core loader must not be used in stable bootstrap');
assert(!index.includes('web-dev-loader.js'),'Web DEV loader must not be used in stable bootstrap');
assert(!index.includes('web-parity.js'),'Web parity injection must not be used in stable bootstrap');
assert(!index.includes('cdn.jsdelivr.net'),'Stable Web bootstrap must not depend on jsDelivr');

// Core native controls must still exist in the unmodified game source.
assert(game.includes("$('play').onclick=()=>{hide('menu');show('setup');st='setup';setupUI();sfx('ui')}"),'Native Play handler missing');
assert(game.includes("$('shopb').onclick=()=>{hide('menu');show('shop');st='shop';ref();shopUI()}"),'Native Skins handler missing');
assert(game.includes("$('achb').onclick"),'Native Achievements handler missing');
assert(game.includes("$('histb').onclick"),'Native History handler missing');
assert(dev.length>1000,'DEV gameplay source unexpectedly empty');

console.log('Survive Chaos stable local Web bootstrap regression checks passed.');
