'use strict';

const CACHE_NAME = 'static-cache-v20200130-01'; // Update cache names any time any of the cached files change

const FILES_TO_CACHE = [ // Add list of files to cache here
    '/offline'
];

self.addEventListener('install', (evt) => {

    console.log('[ServiceWorker] Install');

    evt.waitUntil( // Precache static resources
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();  // Take control immediately

});

self.addEventListener('activate', (evt) => {

    console.log('[ServiceWorker] Activate');
    
    evt.waitUntil( // Remove previous cached data from disk
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim(); // Take control immediately

});

self.addEventListener('fetch', (evt) => {

    console.log('[ServiceWorker] Fetch', evt.request.url);

    if (evt.request.mode !== 'navigate') {
        return; // Not a page navigation, bail1
    }

    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match('/offline');
            });
        })
    );

});