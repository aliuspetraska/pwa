self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.js',
                '/manifest.json',
                '/icon.png'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    const channel = new BroadcastChannel('messages');

    event.waitUntil(self.clients.claim());

    setInterval(() => {
        channel.postMessage('update');
    }, 1000);
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'LOCATION_UPDATE') {
        const { latitude, longitude } = event.data;
        sendLocationToAPI(latitude, longitude);
    }
});

function sendLocationToAPI(lat, long) {
    console.log(lat, long);
    /*
    fetch('/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: lat, longitude: long })
    })
    .then(response => response.json())
    .then(data => console.log('Location sent:', data))
    .catch(error => console.error('Error sending location:', error));
    */
}