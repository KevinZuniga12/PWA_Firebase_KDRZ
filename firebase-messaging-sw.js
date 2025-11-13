// Importar Firebase (versión compat, compatible con Service Worker)
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQD6_ItvBA51dhLYzWBH_lDrEn9JglW9o",
    authDomain: "pwa-firebase-kdrz.firebaseapp.com",
    projectId: "pwa-firebase-kdrz",
    storageBucket: "pwa-firebase-kdrz.firebasestorage.app",
    messagingSenderId: "89260580573",
    appId: "1:89260580573:web:78aa0be483a34b12438534"
};

// Inicializar Firebase en el SW
firebase.initializeApp(firebaseConfig);

// Inicializar el servicio de mensajería
const messaging = firebase.messaging();

// Recibir mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('📨 Mensaje recibido en segundo plano:', payload);

    const notificationTitle = payload.notification?.title || "Notificación";
    const notificationOptions = {
        body: payload.notification?.body || "",
        icon: "192.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('./'));
});