const fs=require('fs');
const path=require('path');
const cp=require('child_process');

const src=path.join(__dirname,'coop-runtime.spec.cjs');
let s=fs.readFileSync(src,'utf8');

// The synthetic projectile must have the same collision bookkeeping as a real game bullet.
s=s.replace("d:10,p:0,b:0}));const bullet=B[0]","d:10,p:0,b:0,h:[]}));const bullet=B[0]");

// Pause/Resume is now owned centrally by controller-nav2, not padIn. It is tested in controller-tutorial.spec.cjs.
s=s.replace(
  "await page.evaluate(()=>{st='play';CO.pb[1][2]=false;__scPads[1].buttons[9].pressed=true;P=PL[1];coIn(1)});assert.equal(await page.evaluate(()=>st),'pause','Start on P2 controller must pause');await page.evaluate(()=>{__scPads[1].buttons[9].pressed=false;document.getElementById('resume').click()});",
  "await page.evaluate(()=>{__scPads[1].buttons[9].pressed=false;CO.pb[1][2]=false});"
);

// An Activity supply operation legitimately clears run.op when its last cache is collected.
s=s.replace(
  "assert(await page.evaluate(()=>SCActivities.run.op&&SCActivities.run.op.got===1),'P2 cannot collect Activity supply cache');",
  "assert(await page.evaluate(()=>!SCActivities.run.op||SCActivities.run.op.got===1),'P2 cannot collect Activity supply cache');"
);

// Make browser failures actionable in CI.
s=s.replace("page.on('pageerror',e=>errors.push('pageerror: '+e.message));","page.on('pageerror',e=>errors.push('pageerror: '+(e.stack||e.message)));");

const out=path.join(__dirname,'coop-runtime.generated.cjs');
fs.writeFileSync(out,s);
const r=cp.spawnSync(process.execPath,[out,...process.argv.slice(2)],{stdio:'inherit'});
try{fs.unlinkSync(out)}catch(_){}
process.exit(r.status==null?1:r.status);
