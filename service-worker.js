// Nombre del cache
const CACHE_NAME = 'printworks-cache-v1';

// Archivos que se cachearán
const urlsToCache = [
  '/PrintWorks/',
  '/PrintWorks/index.html',
  '/PrintWorks/pages/galery.html',
  '/PrintWorks/pages/login.html',
  '/PrintWorks/pages/admin.html',
  '/PrintWorks/pages/historial.html',
  '/PrintWorks/pages/pedido.html',
  '/PrintWorks/pages/sobre.html',
  '/PrintWorks/images/1.jfif',
  '/PrintWorks/images/2.jfif',
  '/PrintWorks/images/3.jfif',
  '/PrintWorks/images/4.jfif',
  '/PrintWorks/images/5.jfif',
  '/PrintWorks/images/6.jfif',
  '/PrintWorks/images/Logo PrintWorks.png',
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
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
    caches.match(event.request).then(response => {
      // Devuelve la respuesta del cache si existe, o hace la petición a la red
      return response || fetch(event.request);
    })
  );
});

// Manejar eventos de Push
self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'Notificación de PrintWorks';
  const options = {
    body: data.body || 'Tienes una nueva notificación de PrintWorks.',
    icon: '/PrintWorks/images/Logo PrintWorks.png',
    badge: '/PrintWorks/images/Logo PrintWorks.png',
    actions: [
      { action: 'explore', title: 'Ver ahora' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Manejo de interacciones con las notificaciones
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Título de la Notificación';
  const options = {
      body: data.body || 'Cuerpo de la notificación',
      icon: 'icon.png', // Ruta a tu icono
      badge: 'badge.png' // Ruta a tu icono de badge
  };

  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});
