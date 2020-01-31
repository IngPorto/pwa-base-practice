const staticCacheName = 'site-static-v1';
const assets = [
    '/pwa-ninja/',
    '/pwa-ninja/index.html',
    '/pwa-ninja/js/app.js',
    'https://code.jquery.com/jquery-3.4.1.min.js'
]

// install service worker
// NOTA: Aquí ponemos todo los que se quiere hacer mientras
// se está instalando el SW. Para hacer algo justo depués de
// la instalación se debe usar el event.waitUntil()
self.addEventListener('install', event =>{
    
    // event es un ExtendableEvent. Cuando se termine 
    // (cuando se termine de instalar el SW) se va a 
    // guardar en el caché los assets
    event.waitUntil(
        caches.open(staticCacheName).then(cache =>{
            console.log('Cacheando los assets')
            cache.addAll(assets)

            console.log("El service worker ha sido instalado")
        })
    )

    self.skipWaiting();  // Take control immediately
});

// activate service worker
// Este evento se realiza cuando el SW es usado por el navegador
self.addEventListener('activate', event =>{
    event.waitUntil(
        // Se eliminan las versiones antigüas de la cache. 
        // Se llaman todos los keys y los que no son igual al 
        // último se eliminan y se devuelve un array de un solo key
        caches.keys().then( keys => {
            //console.log(keys)
            console.log("El service worker ha sido activado")
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName )
                    .map ( key => caches.delete(key) )
            )
        })
    )

    self.clients.claim(); // Take control immediately
})

// fetch event
self.addEventListener('fetch', event => {
    // console.log('Se ha realizado un fetch', event)
    
    // Aquí se responde con los assets del catch si existen,
    // sino, se realiza el fetch
    event.respondWith(
        caches.match( event.request ).then ( cacheRes => {
            return cacheRes || fetch( event.request )
        })
    )
})


/*
let deferredPrompt;
// to know if app is installed on phone
self.addEventListener('beforeinstallprompt', event => {
    deferredPrompt = event;

    // Update UI notify the user they can add to home screen
    showInstallPromotion();
})
*/