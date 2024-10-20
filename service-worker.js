// Nombre del cache
const CACHE_NAME = 'printworks-cache-v1';

// Archivos que se cachearán
const urlsToCache = [
  '/PrintWorks/',
  '/PrintWorks/index.html',
  '/PrintWorks/galery.html',
  '/PrintWorks/contacto.html',
  '/PrintWorks/sobre.html',
  '/PrintWorks/img/1.jfif',
  '/PrintWorks/img/2.jfif',
  '/PrintWorks/img/3.jfif',
  '/PrintWorks/img/4.jfif',
  '/PrintWorks/img/5.jfif',
  '/PrintWorks/img/6.jfif',
  '/PrintWorks/img/Logo PrintWorks.png',
];


// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar el Service Worker y limpiar viejos caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepción de las peticiones de la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta del cache si existe, o hace la petición a la red
        return response || fetch(event.request);
      })
  );
});
