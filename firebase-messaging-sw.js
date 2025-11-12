// Importamos las versiones compat de Firebase para SW
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Configuración igual que en app.js
firebase.initializeApp({
    apiKey: "AIzaSyBQD6_ItvBA51dhLYzWBH_lDrEn9JglW9o",
    authDomain: "pwa-firebase-kdrz.firebaseapp.com",
    projectId: "pwa-firebase-kdrz",
    storageBucket: "pwa-firebase-kdrz.firebasestorage.app",
    messagingSenderId: "89260580573",
    appId: "1:89260580573:web:78aa0be483a34b12438534"
});

const messaging = firebase.messaging();

// Evento cuando llega un mensaje en segundo plano
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "Notificación";
    const options = {
        body: payload.notification?.body || "",
        icon: "/icon-192.png"
    };
    self.registration.showNotification(title, options);
});

// Manejar clics en la notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});