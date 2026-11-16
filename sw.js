const C='stickers-v3';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','fonts/Bangers.woff2','fonts/LilitaOne.woff2','fonts/PermanentMarker.woff2','fonts/Bungee.woff2','fonts/LuckiestGuy.woff2','fonts/Caveat.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok&&(new URL(r.url).origin===location.origin||/jsdelivr/.test(r.url))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})))});
