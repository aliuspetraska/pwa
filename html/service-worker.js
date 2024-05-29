self.addEventListener('install', event => {
    console.log('sw install');

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

    const channel = new BroadcastChannel('messages');
    
    setInterval(() => {
        console.log('update');

        channel.postMessage('update');

        if ("geolocation" in navigator) {
            console.log('ok');
        } else {
            console.log('not ok');
        }
    }, 1000);
});

self.addEventListener('activate', event => {
    console.log('sw activate');

    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
    console.log('sw message');

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