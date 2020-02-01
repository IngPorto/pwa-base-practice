# pwa-base-practice
Scaffold PWA application 

## Guía para desarrollar un PWA básico
Los siguientes archivo componen la estructura tradicional de una PWA. No es estrictamente requerida la siguiente estructura de archivos:
│
├ _app.js_
├ _index.html_
├ _manifest.json_
└ _serviceworker.js_

### Paso 1: Verificar el soporte del Service Worker en el navegador
Sobre el archivo **_app.js_** agregar:

```javascript
if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register( **<ruta raíz de la página>** + 'serviceworker.js')
        .then( ( reg ) => console.log('service worker registered', reg ))
        .catch( ( err ) => console.log('service worker not registered', err ));
}
```

### Paso 2: Crear el _manifest.json_
En este documento se define las características de la aplicación, nombre, orientación, iconos entre otras características para Android y Web. Para iOS las configuraciones de iconos, color de la barra de status entre otros se definen en el _index.html_:

```json
{
    "name": "<nombre de la aplicación>",
    "short_name": "<nombre corto>",
    "start_url": "<ruta del index.html desde la raiz>",
    "display": "standalone",
    "background_color": "#fcba03",
    "theme_color": "#0377fc",
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "img/icon-72x72.png",
            "type": "image/png",
            "sizes": "72x72"
        },
        {
            "src": "img/icon-96x96.png",
            "type": "image/png",
            "sizes": "96x96"
        },
        {
            "src": "img/icon-128x128.png",
            "type": "image/png",
            "sizes": "128x128"
        },
        {
            "src": "img/icon-144x144.png",
            "type": "image/png",
            "sizes": "144x144"
        },
        {
            "src": "img/icon-152x152.png",
            "type": "image/png",
            "sizes": "152x152"
        },
        {
            "src": "img/icon-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "img/icon-184x184.png",
            "type": "image/png",
            "sizes": "184x184"
        },
        {
            "src": "img/icon-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ]
}
```
> https://developers.google.com/web/fundamentals/web-app-manifest/

### Paso 3: Crear el _serviceworker.js_
En este archivo se definen y configuran características como la caché, trafico de datos entre otros.

```javascript
// install service worker
self.addEventListener('install', event =>{
    console.log("El service worker ha sido instalado")

});

// activate service worker
self.addEventListener('activate', event =>{
    console.log("El service worker ha sido activado")

})

// fetch event
self.addEventListener('fetch', event => {
    console.log('Se ha realizado un fetch', event)
})
```

### Paso 4: Declarar los componentes en el _index.html_
Aquí de declara el _manifest_, el _service worker_ por medio del archivo _app.js_ y en el caso de iOS, se define lo necesario para que funcione la aplicación.

```html
[...]
    <link rel="manifest" href="manifest.json">
</head>
<body>
[...]
    <!-- Si el sistema detecta que la aplicación ya fue instalada muestra una de los siguientes elementos-->
    <button id="btn-install" >Instala la app</button>
    <div id="installed-label">La app ya está instalada</div>

    <script>
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            console.log('Coomunity puede ser instalada');
            document.getElementById('btn-install').style.display = 'block'
            document.getElementById('installed-label').style.display = 'none'
        });

        window.addEventListener('appinstalled', (evt) => {
            console.log('Coomunity ha sido instalada');
            document.getElementById('btn-install').style.display = 'none'
            document.getElementById('installed-label').style.display = 'block'
        });
    </script>
    <script src="js/app.js"></script>
</body>
</html>
```
> https://developers.google.com/web/fundamentals/app-install-banners

### Nota: Etiquetas en el index.html para iOS
<link rel="manifest" href="/manifest" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="#aa7700" />
<meta name="apple-mobile-web-app-title" content="Nombre_de_mi_App" />
<meta name="theme-color" content="#9c27b0" />
