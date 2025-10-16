// cardapio_sw.js - versão corrigida
// Atualize a versão do cache quando quiser forçar atualização (ex: 'cardapio-cache-v4' no futuro)
const CACHE_NAME = 'cardapio-cache-v3';

const URLS_TO_CACHE = [
  '/',                         // garante a página inicial
  '/index.html',               // caso exista index.html
  '/cardapio_casa_pwa.html',   // seu HTML específico (mantive conforme seu arquivo)
  '/cardapio_manifest.json',   // manifest (ajuste o nome se mudou)
  '/cardapio_sw.js',           // opcional: cache do próprio SW
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: cria/atualiza cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting()) // força o SW a pular para 'installed'
  );
});

// Activate: remove caches antigos que não batem com CACHE_NAME
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        // se for igual, retorna undefined (ok)
      })
    ))
    .then(() => self.clients.claim()) // passa a controlar as páginas imediatamente
  );
});

// Fetch: responde do cache primeiro, se não busca na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
