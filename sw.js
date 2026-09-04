/**
 * Service Worker - Catálogo Virtual Oxapampa
 * Caching estático con estrategia Network-First para asegurar actualizaciones inmediatas.
 */

const CACHE_NAME = 'oxapampa-catalog-v11';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './data/products.json',
  './assets/wallpaper/header.webp',
  './assets/wallpaper/fondo1.jpg',
  './assets/wallpaper/fondo2.jpg',
  './assets/wallpaper/fondo3.jpg'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-cargando shell estático y datos');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Limpiando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate strategy for ultra-fast loading with background updates
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch((err) => {
          console.log('[ServiceWorker] Network error, returning cached fallback:', err);
          return cachedResponse;
        });

      // Retornar caché inmediatamente si existe, de lo contrario esperar la red
      return cachedResponse || fetchPromise;
    })
  );
});

