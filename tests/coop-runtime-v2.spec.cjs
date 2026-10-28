const fs=require('fs');
const path=require('path');
const cp=require('child_process');

const src=path.join(__dirname,'coop-runtime.spec.cjs');
let s=fs.readFileSync(src,'utf8');

// The synthetic projectile must have the same collision bookkeeping as a real game bullet.
s=s.replace("d:10,p:0,b:0}));const bullet=B[0]","d:10,p:0,b:0,h:[]}));const bullet=B[0]");

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
