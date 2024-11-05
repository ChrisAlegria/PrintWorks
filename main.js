document.getElementById('enable-notifications').addEventListener('click', function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
                askPermission();
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    }
});

function askPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Permiso para notificaciones otorgado');
            subscribeUserToPush();
        } else {
            console.error('Permiso para notificaciones no otorgado');
        }
    });
}

function subscribeUserToPush() {
    navigator.serviceWorker.ready.then(registration => {
        const applicationServerKey = urlBase64ToUint8Array('BFZwHplXUs2__ZRLEu81Wi9HKLjeeiufgQOBaRSyT-P0MyqPBPqgwewhSYIjBHPjRN3mfGju9vnRaRl6kprtBow');
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        .then(subscription => {
            console.log('Usuario suscrito a Push Notifications:', subscription);
            // Aquí puedes enviar la suscripción a tu servidor
            // fetch('/save-subscription', { method: 'POST', body: JSON.stringify(subscription) });
        })
        .catch(err => {
            console.error('Error al suscribirse a Push Notifications:', err);
        });
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
