// Importamos los módulos de Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken, onMessage, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQD6_ItvBA51dhLYzWBH_lDrEn9JglW9o",
    authDomain: "pwa-firebase-kdrz.firebaseapp.com",
    projectId: "pwa-firebase-kdrz",
    storageBucket: "pwa-firebase-kdrz.firebasestorage.app",
    messagingSenderId: "89260580573",
    appId: "1:89260580573:web:78aa0be483a34b12438534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Utilidades para manipular el DOM
const $ = (sel) => document.querySelector(sel);
const log = (m) => ($("#log").textContent += (($("#log").textContent === "—" ? "" : "\n") + m));

// Mostramos el estado inicial del permiso
$("#perm").textContent = Notification.permission;

// Registramos el Service Worker que manejará las notificaciones en segundo plano
let swReg;
if ('serviceWorker' in navigator) {
    swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('SW registrado:', swReg.scope);
}

// Verificamos si el navegador soporta FCM
const supported = await isSupported();
let messaging = null;

if (supported) {
    messaging = getMessaging(app);
} else {
    log("Este navegador no soporta FCM en la Web.");
}

// Clave pública VAPID (de Cloud Messaging)
const VAPID_KEY = "BFMUVM-rTWrhN2dnVcr6gmGoZw_ODuFg0juopTRZRvdmnospojKqLo6qtE_bhAg2wgeDr9RLY4C3LY7ZvSMeu_c";

// Función para pedir permiso al usuario y obtener token
async function requestPermissionAndGetToken() {
    try {
        const permission = await Notification.requestPermission();
        $("#perm").textContent = permission;

        if (permission !== 'granted') {
            log("Permiso denegado por el usuario.");
            return;
        }

        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: swReg,
        });

        if (token) {
            $("#token").textContent = token;
            log("Token obtenido. Usa este token en Firebase Console → Cloud Messaging.");
        } else {
            log("No se pudo obtener el token.");
        }
    } catch (err) {
        console.error(err);
        log("Error al obtener token: " + err.message);
    }
}

// Escuchamos mensajes cuando la pestaña está abierta
if (messaging) {
    onMessage(messaging, (payload) => {
        log("Mensaje en primer plano:\n" + JSON.stringify(payload, null, 2));
    });
}

// Vinculamos la función al botón de permiso
$("#btn-permission").addEventListener("click", requestPermissionAndGetToken);