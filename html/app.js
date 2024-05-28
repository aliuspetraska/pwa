let watchId;
let isTracking = false;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

document.getElementById('start').addEventListener('click', () => {
    if (navigator.geolocation) {
        isTracking = true;
        watchId = navigator.geolocation.watchPosition(sendPositionToServiceWorker, handleError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

document.getElementById('stop').addEventListener('click', () => {
    if (watchId && isTracking) {
        navigator.geolocation.clearWatch(watchId);
        isTracking = false;
    }
});

function sendPositionToServiceWorker(position) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'LOCATION_UPDATE',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }
}

function handleError(error) {
    console.error('Error occurred. Error code: ' + error.code);
    // Handle error based on error.code
}