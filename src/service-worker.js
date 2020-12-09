/* eslint-disable no-undef */
workbox.core.setCacheNameDetails({prefix: "SW"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30
            })
        ],
        method: 'GET',
        cacheableResponse: { statuses: [0, 200]}
    })
)
workbox.routing.registerRoute(
    new RegExp("./js/*"),
    workbox.strategies.cacheFirst({
        cacheName: "applicationstate",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30
            })
        ],
        method: 'GET',
        cacheableResponse: { statuses: [0, 200]}
    })
)
  
self.addEventListener("notificationclick", function (event){
    const notificationData = event.notification.data;
    var url = notificationData.url
    self.clients.openWindow(url);
    event.notification.close();
})

self.addEventListener('push', function (e) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        var msg = e.data.json();
        e.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            vibrate: msg.vibrate,
            data: msg.data
        }));
    }
});