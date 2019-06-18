var CACHE_NAME = "cache-v3";
var urlsToCache = ["/offline.html", "/images/card.png", "/images/no-wifi.png"]
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache => {
      return cache.addAll(urlsToCache);
    }))
  );
});

// hit the network and fallback to cached info
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request)
      // TODO - Add fetched files to the cache
    }).catch(error => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
});
