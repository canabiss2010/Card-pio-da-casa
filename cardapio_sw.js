self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cardapio-cache').then(cache => {
      return cache.addAll([
        '/',
        '/cardapio_casa_pwa.html',
        '/cardapio_manifest.json',
        '/cardapio_sw.js',
        '/icons/icon-192.png',
        '/icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
