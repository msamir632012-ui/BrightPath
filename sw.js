const CACHE_NAME = 'brightpath-v1';
const URLS_TO_CACHE = [
    '/BrightPath/',
    '/BrightPath/index.html',
    '/BrightPath/styles.css',
    '/BrightPath/app.js',
    '/BrightPath/qrcode.js',
    '/BrightPath/manifest.webmanifest'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE).catch(err => {
                console.warn('Failed to cache some assets:', err);
                return cache.addAll(URLS_TO_CACHE.filter(url => url !== '/BrightPath/'));
            });
        })
    );
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then(response => response || new Response('Offline - Page not available', { status: 503 }));
            })
    );
});