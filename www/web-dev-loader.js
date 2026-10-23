(() => {
'use strict';
const src='dev.js'+(location.search||'');
const x=new XMLHttpRequest();
let s='';
try{x.open('GET',src,false);x.send(null);if((x.status>=200&&x.status<300)||x.status===0)s=x.responseText}catch(e){console.error('[Web Parity] Falha ao carregar DEV',e)}
if(!s){document.write('<script src="dev.js"><\/script>');return}
if(s.includes('earned+=25000'))s=s.replace('earned+=25000','earned+=2500');
else console.warn('[Web Parity] assinatura da recompensa DEV mudou');
const el=document.createElement('script');
el.text=s+'\n//# sourceURL=dev.web-parity.js';
document.head.appendChild(el);
console.log('[Web Parity] Recompensa bruta do DEV reduzida para 2.500');
})();
