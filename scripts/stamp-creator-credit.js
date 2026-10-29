const fs=require('fs');
const path=require('path');
const MARK='©criado por Vitor Ag/Nyx - 2026';
const roots=['www'];
const files=[];
function walk(p){if(!fs.existsSync(p))return;const st=fs.statSync(p);if(st.isDirectory()){for(const n of fs.readdirSync(p))walk(path.join(p,n));return}if(/\.(?:js|css|html)$/i.test(p))files.push(p)}
for(const r of roots)walk(r);if(fs.existsSync('index.html'))files.push('index.html');
for(const file of files){let s=fs.readFileSync(file,'utf8');const head=s.slice(0,1200);if((head.match(/©criado por Vitor Ag\/Nyx - 2026/g)||[]).length>=3)continue;let c;if(/\.html$/i.test(file))c=`<!-- ${MARK} -->\n<!-- ${MARK} -->\n<!-- ${MARK} -->\n`;else c=`/* ${MARK} */\n/* ${MARK} */\n/* ${MARK} */\n`;s=s.replace(/^(?:\s*(?:\/\*\s*©criado por Vitor Ag\/Nyx - 2026\s*\*\/|<!--\s*©criado por Vitor Ag\/Nyx - 2026\s*-->)\s*)+/,'');fs.writeFileSync(file,c+s)}
console.log(`Creator credit stamped in ${files.length} eligible Web files.`);
